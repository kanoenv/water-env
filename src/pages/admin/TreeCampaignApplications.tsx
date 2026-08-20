// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Download, Search, Loader2, Eye, TreePine, CheckCircle, XCircle, Package, ClipboardList, Printer, Pencil, Trash2, Plus } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  under_review: 'bg-blue-100 text-blue-800 border-blue-200',
  approved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  seeds_distributed: 'bg-purple-100 text-purple-800 border-purple-200',
  completed: 'bg-gray-200 text-gray-800 border-gray-300',
};

const emptySeed = { id: null, species: '', quantity: '', batch_code: '', notes: '' };

const TreeCampaignApplications = () => {
  const { isAuthenticated } = useAdminAuth();
  const { toast } = useToast();
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [campaignFilter, setCampaignFilter] = useState('all');
  const [selected, setSelected] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [seedOpen, setSeedOpen] = useState(false);
  const [seedForm, setSeedForm] = useState<any>(emptySeed);
  const [distributions, setDistributions] = useState<any[]>([]);

  const fetchApps = async () => {
    setLoading(true);
    // Paginate to bypass PostgREST 1000-row default cap
    const pageSize = 1000;
    let from = 0;
    const all: any[] = [];
    while (true) {
      const { data, error } = await supabase
        .from('tree_campaign_applications')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, from + pageSize - 1);
      if (error) {
        toast({ variant: 'destructive', title: 'Load failed', description: error.message });
        break;
      }
      if (!data || data.length === 0) break;
      all.push(...data);
      if (data.length < pageSize) break;
      from += pageSize;
    }
    setApps(all);
    setLoading(false);
  };

  const fetchDistributions = async (appId: string) => {
    const { data } = await supabase
      .from('tree_seed_distributions')
      .select('*')
      .eq('application_id', appId)
      .order('created_at', { ascending: false });
    setDistributions(data || []);
  };

  useEffect(() => { if (isAuthenticated) fetchApps(); }, [isAuthenticated]);

  const filtered = apps.filter((a) => {
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    if (campaignFilter !== 'all' && a.campaign !== campaignFilter) return false;
    if (search) {
      const s = search.toLowerCase();
      return (
        a.organization_name?.toLowerCase().includes(s) ||
        a.contact_name?.toLowerCase().includes(s) ||
        a.contact_email?.toLowerCase().includes(s) ||
        a.locations?.toLowerCase().includes(s)
      );
    }
    return true;
  });

  const updateStatus = async (app: any, newStatus: string) => {
    const { data: userData } = await supabase.auth.getUser();
    const { error } = await supabase
      .from('tree_campaign_applications')
      .update({ status: newStatus, reviewed_at: new Date().toISOString(), reviewed_by: userData?.user?.id ?? null })
      .eq('id', app.id);
    if (error) return toast({ variant: 'destructive', title: 'Update failed', description: error.message });
    toast({ title: 'Status updated', description: `${app.organization_name} → ${newStatus}` });
    fetchApps();
  };

  const openView = async (app: any) => {
    setSelected(app);
    setViewOpen(true);
    await fetchDistributions(app.id);
  };

  const openSeed = (app: any, existing: any = null) => {
    setSelected(app);
    if (existing) {
      setSeedForm({
        id: existing.id,
        species: existing.species || '',
        quantity: String(existing.quantity || ''),
        batch_code: existing.batch_code || '',
        notes: existing.notes || '',
      });
    } else {
      setSeedForm({ ...emptySeed, quantity: String(app.seedlings_requested || '') });
    }
    setSeedOpen(true);
  };

  const submitSeedDistribution = async () => {
    if (!selected) return;
    const { data: userData } = await supabase.auth.getUser();
    const payload = {
      application_id: selected.id,
      species: seedForm.species,
      quantity: parseInt(seedForm.quantity),
      batch_code: seedForm.batch_code || null,
      notes: seedForm.notes || null,
      distributed_by: userData?.user?.id ?? null,
    };
    const { error } = seedForm.id
      ? await supabase.from('tree_seed_distributions').update(payload).eq('id', seedForm.id)
      : await supabase.from('tree_seed_distributions').insert(payload);
    if (error) return toast({ variant: 'destructive', title: 'Save failed', description: error.message });
    if (!seedForm.id && selected.status === 'approved') {
      await supabase.from('tree_campaign_applications').update({ status: 'seeds_distributed' }).eq('id', selected.id);
    }
    toast({ title: seedForm.id ? 'Assignment updated' : 'Seeds assigned', description: `${payload.quantity} ${payload.species} → ${selected.organization_name}` });
    setSeedOpen(false);
    await fetchDistributions(selected.id);
    fetchApps();
  };

  const deleteDistribution = async (id: string) => {
    if (!confirm('Remove this seed assignment?')) return;
    const { error } = await supabase.from('tree_seed_distributions').delete().eq('id', id);
    if (error) return toast({ variant: 'destructive', title: 'Delete failed', description: error.message });
    if (selected) await fetchDistributions(selected.id);
  };

  const printSlip = (app: any, dists: any[]) => {
    const totalSeeds = dists.reduce((s, d) => s + (d.quantity || 0), 0);
    const today = new Date().toLocaleDateString('en-NG', { day: '2-digit', month: 'long', year: 'numeric' });
    const refNo = `KS/MWRECC/${(app.campaign === '10_million_2026' ? '10M' : '5M')}/${String(app.id).slice(0, 8).toUpperCase()}`;
    const campaignTitle = app.campaign === '10_million_2026' ? '10 Million Trees Planting Campaign · 2026' : '5 Million Trees Planting Campaign · 2025';
    const rows = dists.length
      ? dists.map((d, i) => `<tr><td>${i + 1}</td><td>${d.species || ''}</td><td style="text-align:right">${(d.quantity || 0).toLocaleString()}</td><td>${d.batch_code || '—'}</td><td>${d.distribution_date ? new Date(d.distribution_date).toLocaleDateString() : new Date(d.created_at).toLocaleDateString()}</td></tr>`).join('')
      : `<tr><td colspan="5" style="text-align:center;color:#888;padding:18px">No seeds assigned yet</td></tr>`;

    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Seed Assignment Slip — ${app.organization_name}</title>
<style>
  *{box-sizing:border-box} body{font-family:Georgia,'Times New Roman',serif;color:#1a2e1a;margin:0;padding:48px 56px;background:#fff}
  .frame{border:2px solid #15803d;padding:32px 36px;position:relative}
  .frame::before{content:'';position:absolute;inset:6px;border:1px solid #86efac;pointer-events:none}
  header{display:flex;align-items:center;gap:18px;border-bottom:3px double #15803d;padding-bottom:18px;margin-bottom:22px}
  header img{height:84px;width:84px;border-radius:50%;background:#fff;border:2px solid #15803d;object-fit:cover}
  header h1{margin:0;font-size:22px;color:#14532d;letter-spacing:.5px}
  header .sub{font-size:12px;color:#4b5563;margin-top:2px;text-transform:uppercase;letter-spacing:2px}
  .meta{display:grid;grid-template-columns:repeat(2,1fr);gap:6px 24px;font-size:13px;margin-bottom:18px}
  .meta b{color:#14532d;text-transform:uppercase;font-size:11px;letter-spacing:1px;font-family:Arial,sans-serif}
  h2{font-size:14px;text-transform:uppercase;letter-spacing:2px;color:#14532d;border-left:4px solid #15803d;padding-left:10px;margin:22px 0 10px}
  table{width:100%;border-collapse:collapse;font-size:13px;font-family:Arial,sans-serif}
  th{background:#14532d;color:#fff;padding:8px;text-align:left;font-size:11px;letter-spacing:1px}
  td{padding:8px;border-bottom:1px solid #d1fae5}
  tfoot td{font-weight:bold;background:#f0fdf4;border-top:2px solid #15803d}
  .org-box{background:#f0fdf4;border-left:4px solid #15803d;padding:14px 16px;margin-bottom:14px;font-size:13px}
  .org-box .name{font-size:18px;font-weight:bold;color:#14532d;margin-bottom:4px}
  .sign{display:grid;grid-template-columns:1fr 1fr;gap:60px;margin-top:60px;font-size:13px}
  .sign div{border-top:1px solid #1a2e1a;padding-top:6px;text-align:center}
  .sign b{display:block;color:#14532d}
  .ref{position:absolute;top:18px;right:24px;font-size:11px;color:#6b7280;font-family:Arial,sans-serif}
  .stamp{position:absolute;bottom:30px;right:60px;width:140px;height:140px;border:3px double #15803d;border-radius:50%;display:flex;align-items:center;justify-content:center;text-align:center;font-size:10px;color:#15803d;transform:rotate(-12deg);opacity:.5;font-family:Arial;letter-spacing:1px;line-height:1.4;padding:10px}
  footer{margin-top:36px;padding-top:14px;border-top:1px solid #d1d5db;font-size:11px;color:#6b7280;text-align:center;font-family:Arial,sans-serif}
  @media print{body{padding:0} .noprint{display:none} .frame{border:none} .frame::before{display:none}}
  .noprint{position:fixed;top:14px;right:14px}
  .noprint button{background:#15803d;color:#fff;border:0;padding:10px 18px;font-size:13px;border-radius:6px;cursor:pointer;font-family:Arial}
</style></head><body>
<div class="noprint"><button onclick="window.print()">Print / Save as PDF</button></div>
<div class="frame">
  <div class="ref">Ref: ${refNo}<br/>Date: ${today}</div>
  <header>
    <img src="/kano-ministry-seal.png" alt="Kano State Seal"/>
    <div>
      <div class="sub">Kano State Government</div>
      <h1>Ministry of Water Resources, Environment and Climate Change</h1>
      <div class="sub" style="margin-top:6px">Official Seed Assignment Slip</div>
    </div>
  </header>

  <h2>Campaign</h2>
  <div style="font-size:15px;font-weight:bold;color:#14532d;margin-bottom:14px">${campaignTitle}</div>

  <h2>Organisation Information</h2>
  <div class="org-box">
    <div class="name">${app.organization_name || ''}</div>
    <div><b>Type:</b> ${app.organization_type || '—'} &nbsp;·&nbsp; <b>Established:</b> ${app.date_established || '—'}</div>
    <div style="margin-top:4px"><b>Address:</b> ${app.address || '—'}</div>
  </div>

  <div class="meta">
    <div><b>Contact Person</b><br/>${app.contact_name || '—'} (${app.contact_position || '—'})</div>
    <div><b>Email</b><br/>${app.contact_email || '—'}</div>
    <div><b>Phone</b><br/>${app.contact_phone || '—'}</div>
    <div><b>Volunteers</b><br/>${app.volunteers || '—'}</div>
    <div><b>Planting Sites</b><br/>${app.planting_sites || '—'}</div>
    <div><b>Survival Commitment</b><br/>${app.survival_rate_commitment || '—'}</div>
    <div style="grid-column:1/3"><b>Planting Locations</b><br/>${app.locations || '—'}</div>
  </div>

  <h2>Assigned Seedlings</h2>
  <table>
    <thead><tr><th>#</th><th>Species</th><th style="text-align:right">Quantity</th><th>Batch Code</th><th>Date</th></tr></thead>
    <tbody>${rows}</tbody>
    <tfoot><tr><td colspan="2">TOTAL ASSIGNED</td><td style="text-align:right">${totalSeeds.toLocaleString()}</td><td colspan="2">of ${(app.seedlings_requested || 0).toLocaleString()} requested</td></tr></tfoot>
  </table>

  <div class="sign">
    <div><b>Authorised Officer</b><br/>Ministry of Water Resources,<br/>Environment & Climate Change</div>
    <div><b>Recipient</b><br/>${app.contact_name || ''}<br/>${app.organization_name || ''}</div>
  </div>

  <div class="stamp">OFFICIAL<br/>KANO STATE<br/>MINISTRY</div>

  <footer>
    This slip is an official record of seedlings released under the ${campaignTitle}.<br/>
    Recipients are bound by the survival-rate commitment and reporting obligations of the campaign.
  </footer>
</div>
<script>setTimeout(()=>window.focus(),100)</script>
</body></html>`;

    const w = window.open('', '_blank');
    if (!w) return toast({ variant: 'destructive', title: 'Popup blocked', description: 'Allow popups to print the slip' });
    w.document.write(html);
    w.document.close();
  };

  const exportCSV = () => {
    const headers = ['Campaign', 'Organisation', 'Type', 'Contact', 'Email', 'Phone', 'Seedlings', 'Volunteers', 'Locations', 'Status', 'Submitted'];
    const rows = filtered.map((a) => [
      a.campaign, `"${a.organization_name}"`, a.organization_type, `"${a.contact_name}"`,
      a.contact_email, a.contact_phone, a.seedlings_requested, a.volunteers,
      `"${a.locations}"`, a.status, new Date(a.created_at).toLocaleDateString(),
    ].join(','));
    const blob = new Blob([[headers.join(','), ...rows].join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tree_applications_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const normalizePhone = (raw: string) => {
    if (!raw) return '';
    let s = String(raw).replace(/[^\d+]/g, '');
    if (s.startsWith('00')) s = '+' + s.slice(2);
    if (s.startsWith('0') && s.length === 11) s = '+234' + s.slice(1);
    if (!s.startsWith('+') && s.length === 10) s = '+234' + s;
    if (!s.startsWith('+') && s.length === 13 && s.startsWith('234')) s = '+' + s;
    return s;
  };

  const exportPhones = (format: 'csv' | 'txt') => {
    // Bulk SMS export — defaults to 10M campaign, all statuses in current filter
    const source = filtered.filter((a) => a.campaign === '10_million_2026');
    const seen = new Set<string>();
    const records: any[] = [];
    for (const a of source) {
      const phone = normalizePhone(a.contact_phone || '');
      if (!phone || phone.length < 7) continue;
      if (seen.has(phone)) continue;
      seen.add(phone);
      records.push({
        phone,
        name: a.contact_name || '',
        organization: a.organization_name || '',
        status: a.status,
      });
    }
    if (records.length === 0) {
      return toast({ title: 'No phone numbers', description: 'No 10M campaign applicants matched the current filter.' });
    }
    let blob: Blob;
    let ext = format;
    if (format === 'csv') {
      const csv = ['phone,name,organization,status',
        ...records.map(r => `${r.phone},"${r.name.replace(/"/g, '""')}","${r.organization.replace(/"/g, '""')}",${r.status}`)
      ].join('\n');
      blob = new Blob([csv], { type: 'text/csv' });
    } else {
      blob = new Blob([records.map(r => r.phone).join('\n')], { type: 'text/plain' });
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `10m_phones_${new Date().toISOString().split('T')[0]}.${ext}`;
    link.click();
    toast({ title: 'Phone numbers exported', description: `${records.length} unique numbers (deduplicated, E.164 normalized).` });
  };

  const sendSeedlingInviteTest = async () => {
    const email = window.prompt('Send test seedling invitation to which email?', 'hareesabdulkadir@gmail.com');
    if (!email) return;
    toast({ title: 'Sending test email…', description: email });
    const { data, error } = await supabase.functions.invoke('send-seedling-invites', {
      body: { mode: 'test', test_email: email, organization_name: 'Test Organization' },
    });
    if (error) return toast({ variant: 'destructive', title: 'Send failed', description: error.message });
    toast({ title: 'Test email queued', description: `Sent: ${data?.sent ?? 0} · Failed: ${data?.failed ?? 0}` });
  };

  const sendSeedlingInviteAll = async () => {
    if (!confirm('Send the Seedling Allocation Invitation email to ALL approved organizations? This cannot be undone.')) return;
    toast({ title: 'Sending emails…', description: 'This may take a moment.' });
    const { data, error } = await supabase.functions.invoke('send-seedling-invites', {
      body: { mode: 'all' },
    });
    if (error) return toast({ variant: 'destructive', title: 'Send failed', description: error.message });
    toast({ title: 'Emails queued', description: `Recipients: ${data?.total ?? 0} · Sent: ${data?.sent ?? 0} · Failed: ${data?.failed ?? 0}` });
  };

  const approveAllPending = async () => {
    const pendingIds = apps
      .filter((a) => a.status === 'pending' || a.status === 'under_review')
      .map((a) => a.id);
    if (pendingIds.length === 0) {
      return toast({ title: 'Nothing to approve', description: 'No pending or under-review applications.' });
    }
    if (!confirm(`Approve ALL ${pendingIds.length} pending/under-review organizations at once? This cannot be undone.`)) return;
    const { data: userData } = await supabase.auth.getUser();
    toast({ title: 'Approving…', description: `${pendingIds.length} organizations` });
    const { error } = await supabase
      .from('tree_campaign_applications')
      .update({ status: 'approved', reviewed_at: new Date().toISOString(), reviewed_by: userData?.user?.id ?? null })
      .in('id', pendingIds);
    if (error) return toast({ variant: 'destructive', title: 'Bulk approve failed', description: error.message });
    toast({ title: 'All approved', description: `${pendingIds.length} organizations approved.` });
    await fetchApps();
    if (confirm(`Now send the Seedling Allocation Invitation email to ALL approved organizations?`)) {
      await sendSeedlingInviteAll();
    }
  };




  const stat = (s: string) => apps.filter((a) => a.status === s).length;
  const totalAssigned = distributions.reduce((s, d) => s + (d.quantity || 0), 0);

  return (
    <AdminLayout>
      <div className="mb-6">
        <AdminPageHeader
          title="Tree Campaign Applications"
          description="Review, approve, assign and dispatch seedlings for the 5M (2025) and 10M (2026) campaigns."
          breadcrumb={[{ label: 'Admin', to: '/admin/dashboard' }, { label: 'Tree Campaigns' }]}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-5 mb-6">
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Total</div><div className="text-2xl font-bold">{apps.length}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-yellow-700">Pending</div><div className="text-2xl font-bold text-yellow-700">{stat('pending')}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-emerald-700">Approved</div><div className="text-2xl font-bold text-emerald-700">{stat('approved')}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-purple-700">Seeds Given</div><div className="text-2xl font-bold text-purple-700">{stat('seeds_distributed')}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Seedlings Asked</div><div className="text-2xl font-bold">{apps.reduce((s, a) => s + (a.seedlings_requested || 0), 0).toLocaleString()}</div></CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between flex-wrap gap-2">
            <span>Applications</span>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" onClick={exportCSV}><Download className="w-4 h-4 mr-1" /> Export CSV</Button>
              <Button variant="outline" size="sm" onClick={() => exportPhones('csv')} className="border-emerald-600 text-emerald-700 hover:bg-emerald-50">
                <Download className="w-4 h-4 mr-1" /> SMS Phones (CSV)
              </Button>
              <Button variant="outline" size="sm" onClick={() => exportPhones('txt')} className="border-emerald-600 text-emerald-700 hover:bg-emerald-50">
                <Download className="w-4 h-4 mr-1" /> SMS Phones (TXT)
              </Button>
              <Button variant="outline" size="sm" onClick={sendSeedlingInviteTest} className="border-amber-600 text-amber-700 hover:bg-amber-50">
                Send Test Email
              </Button>
              <Button size="sm" onClick={approveAllPending} className="bg-emerald-600 hover:bg-emerald-700">
                <CheckCircle className="w-4 h-4 mr-1" /> Approve All Pending
              </Button>
              <Button size="sm" onClick={sendSeedlingInviteAll} className="bg-emerald-700 hover:bg-emerald-800">
                Email Approved Orgs
              </Button>
            </div>

          </CardTitle>
          <CardDescription>Filter by campaign and status; open an application to manage seed assignments and print the official slip. <strong>SMS Phones</strong> exports E.164-normalized, deduplicated numbers for the 10M campaign (respects current filters) — ready for bulk SMS upload.</CardDescription>

        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
              <Input placeholder="Search organisation, contact, email, location" className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={campaignFilter} onValueChange={setCampaignFilter}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Campaign" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campaigns</SelectItem>
                <SelectItem value="10_million_2026">10M · 2026</SelectItem>
                <SelectItem value="5_million_2025">5M · 2025</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-44"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="seeds_distributed">Seeds Distributed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 border rounded-md bg-gray-50">
              <TreePine className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No applications yet</p>
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Organisation</TableHead>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="hidden md:table-cell">Seedlings</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>
                        <div className="font-medium">{a.organization_name}</div>
                        <div className="text-xs text-gray-500">{a.organization_type}</div>
                      </TableCell>
                      <TableCell><Badge variant="outline">{a.campaign === '10_million_2026' ? '10M · 2026' : '5M · 2025'}</Badge></TableCell>
                      <TableCell>
                        <div className="font-medium">{a.contact_name}</div>
                        <div className="text-xs text-gray-500">{a.contact_email}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{(a.seedlings_requested || 0).toLocaleString()}</TableCell>
                      <TableCell><Badge className={`border ${STATUS_COLORS[a.status] || ''}`}>{a.status}</Badge></TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-gray-600">{new Date(a.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => openView(a)} title="View"><Eye className="w-4 h-4" /></Button>
                          {a.status === 'pending' && (
                            <>
                              <Button variant="ghost" size="sm" onClick={() => updateStatus(a, 'approved')} title="Approve"><CheckCircle className="w-4 h-4 text-emerald-600" /></Button>
                              <Button variant="ghost" size="sm" onClick={() => updateStatus(a, 'rejected')} title="Reject"><XCircle className="w-4 h-4 text-red-600" /></Button>
                            </>
                          )}
                          {(a.status === 'approved' || a.status === 'seeds_distributed') && (
                            <Button variant="ghost" size="sm" onClick={() => openSeed(a)} title="Assign seeds"><Package className="w-4 h-4 text-purple-700" /></Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selected?.organization_name}</DialogTitle>
            <DialogDescription>{selected?.campaign === '10_million_2026' ? '10 Million Trees · 2026' : '5 Million Trees · 2025'}</DialogDescription>
          </DialogHeader>
          {selected && (
            <>
              <div className="grid md:grid-cols-2 gap-4 text-sm bg-gradient-to-br from-emerald-50/50 to-transparent p-4 rounded-lg border">
                <Field label="Organisation Type" value={selected.organization_type} />
                <Field label="Date Established" value={selected.date_established} />
                <Field label="Address" value={selected.address} full />
                <Field label="Contact" value={`${selected.contact_name} (${selected.contact_position || '—'})`} />
                <Field label="Email" value={selected.contact_email} />
                <Field label="Phone" value={selected.contact_phone} />
                <Field label="Planting Sites" value={selected.planting_sites} />
                <Field label="Seedlings Requested" value={selected.seedlings_requested?.toLocaleString()} />
                <Field label="Volunteers" value={selected.volunteers} />
                <Field label="Survival Commitment" value={selected.survival_rate_commitment} />
                <Field label="Locations" value={selected.locations} full />
                <Field label="Previous Experience" value={selected.previous_experience || '—'} full />
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Status</div>
                  <Badge className={`border mt-1 ${STATUS_COLORS[selected.status] || ''}`}>{selected.status?.replace('_', ' ')}</Badge>
                </div>
                <Field label="Submitted" value={new Date(selected.created_at).toLocaleString()} />

              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-emerald-900 flex items-center gap-2"><Package className="w-4 h-4" /> Assigned Seedlings ({totalAssigned.toLocaleString()} of {(selected.seedlings_requested || 0).toLocaleString()})</h3>
                  <Button size="sm" variant="outline" onClick={() => openSeed(selected)}><Plus className="w-4 h-4 mr-1" /> Add</Button>
                </div>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-emerald-50">
                        <TableHead>Species</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead>Batch</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {distributions.length === 0 ? (
                        <TableRow><TableCell colSpan={5} className="text-center text-gray-500 py-6">No seeds assigned yet</TableCell></TableRow>
                      ) : distributions.map((d) => (
                        <TableRow key={d.id}>
                          <TableCell className="font-medium">{d.species}</TableCell>
                          <TableCell className="text-right">{(d.quantity || 0).toLocaleString()}</TableCell>
                          <TableCell>{d.batch_code || '—'}</TableCell>
                          <TableCell className="text-sm text-gray-600">{new Date(d.created_at).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => openSeed(selected, d)}><Pencil className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="sm" onClick={() => deleteDistribution(d.id)}><Trash2 className="w-4 h-4 text-red-600" /></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </>
          )}
          <DialogFooter className="gap-2 flex-wrap">
            <Button variant="outline" onClick={() => selected && printSlip(selected, distributions)}>
              <Printer className="w-4 h-4 mr-1" /> Print Slip
            </Button>
            {selected?.status === 'pending' && (
              <Button variant="outline" onClick={() => { updateStatus(selected, 'under_review'); }}>
                Mark Under Review
              </Button>
            )}
            {(selected?.status === 'pending' || selected?.status === 'under_review') && (
              <>
                <Button variant="destructive" onClick={() => { updateStatus(selected, 'rejected'); setViewOpen(false); }}>Reject</Button>
                <Button onClick={() => { updateStatus(selected, 'approved'); setViewOpen(false); }} className="bg-emerald-600 hover:bg-emerald-700">Approve</Button>
              </>
            )}
            {(selected?.status === 'approved' || selected?.status === 'seeds_distributed') && (
              <Button onClick={() => openSeed(selected)} className="bg-purple-700 hover:bg-purple-800">
                <Package className="w-4 h-4 mr-1" /> Assign / Edit Seeds
              </Button>
            )}
            {(selected?.status === 'approved' || selected?.status === 'seeds_distributed' || selected?.status === 'completed') && (
              <>
                <Button
                  variant="outline"
                  onClick={async () => {
                    if (!selected) return;
                    const { data: { session } } = await supabase.auth.getSession();
                    const res = await fetch(
                      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/invite-org`,
                      {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
                        body: JSON.stringify({ application_id: selected.id, redirect_to: `https://environment.kn.gov.ng/org/setup` }),
                      }
                    );
                    const j = await res.json();
                    if (!res.ok) toast({ title: 'Invite failed', description: j.error, variant: 'destructive' });
                    else toast({ title: 'Email invite sent', description: `Link sent to ${j.email}` });
                  }}
                >
                  Send Email Invite
                </Button>
                <Button
                  className="bg-emerald-700 hover:bg-emerald-800"
                  onClick={async () => {
                    if (!selected) return;
                    const custom = window.prompt(
                      `Set a password for ${selected.contact_email}.\nLeave blank to auto-generate a secure password.`,
                      ''
                    );
                    if (custom === null) return;
                    const { data: { session } } = await supabase.auth.getSession();
                    const res = await fetch(
                      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/invite-org`,
                      {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
                        body: JSON.stringify({ application_id: selected.id, mode: 'direct', password: custom || undefined }),
                      }
                    );
                    const j = await res.json();
                    if (!res.ok) return toast({ title: 'Setup failed', description: j.error, variant: 'destructive' });
                    const creds = `Org Login Credentials\n\nLogin URL: ${j.login_url}\nEmail: ${j.email}\nPassword: ${j.password}\n\nShare these securely with the organization.`;
                    try { await navigator.clipboard.writeText(creds); } catch {}
                    window.alert(creds + '\n\n(Copied to clipboard)');
                    toast({ title: 'Login created', description: 'Credentials copied to clipboard.' });
                  }}
                >
                  Create Login (No Email)
                </Button>
              </>
            )}
            {selected?.status === 'seeds_distributed' && (
              <Button variant="outline" onClick={() => { updateStatus(selected, 'completed'); setViewOpen(false); }}>
                <CheckCircle className="w-4 h-4 mr-1" /> Mark Completed
              </Button>
            )}

          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Seed distribution dialog */}
      <Dialog open={seedOpen} onOpenChange={setSeedOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{seedForm.id ? 'Edit' : 'Assign'} Seeds — {selected?.organization_name}</DialogTitle>
            <DialogDescription>Record the species and quantity handed over. You can edit or remove an assignment at any time.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div><Label>Species</Label><Input value={seedForm.species} onChange={(e) => setSeedForm({ ...seedForm, species: e.target.value })} placeholder="e.g. Mango, Neem, Moringa" /></div>
            <div><Label>Quantity</Label><Input type="number" value={seedForm.quantity} onChange={(e) => setSeedForm({ ...seedForm, quantity: e.target.value })} /></div>
            <div><Label>Batch Code (optional)</Label><Input value={seedForm.batch_code} onChange={(e) => setSeedForm({ ...seedForm, batch_code: e.target.value })} /></div>
            <div><Label>Notes</Label><Textarea value={seedForm.notes} onChange={(e) => setSeedForm({ ...seedForm, notes: e.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSeedOpen(false)}>Cancel</Button>
            <Button onClick={submitSeedDistribution} disabled={!seedForm.species || !seedForm.quantity} className="bg-emerald-700 hover:bg-emerald-800">
              <ClipboardList className="w-4 h-4 mr-1" /> {seedForm.id ? 'Save changes' : 'Confirm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

const Field = ({ label, value, full }: { label: string; value: any; full?: boolean }) => (
  <div className={full ? 'md:col-span-2' : ''}>
    <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
    <div className="font-medium text-gray-900">{value ?? '—'}</div>
  </div>
);

export default TreeCampaignApplications;
