// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Download, Search, Loader2, Eye, TreePine, CheckCircle, XCircle, Package, ClipboardList } from 'lucide-react';
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
  const [seedForm, setSeedForm] = useState({ species: '', quantity: '', batch_code: '', notes: '' });

  const fetchApps = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tree_campaign_applications')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) toast({ variant: 'destructive', title: 'Load failed', description: error.message });
    setApps(data || []);
    setLoading(false);
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

  const openSeed = (app: any) => {
    setSelected(app);
    setSeedForm({ species: '', quantity: String(app.seedlings_requested || ''), batch_code: '', notes: '' });
    setSeedOpen(true);
  };

  const submitSeedDistribution = async () => {
    if (!selected) return;
    const { data: userData } = await supabase.auth.getUser();
    const { error } = await supabase.from('tree_seed_distributions').insert({
      application_id: selected.id,
      species: seedForm.species,
      quantity: parseInt(seedForm.quantity),
      batch_code: seedForm.batch_code || null,
      notes: seedForm.notes || null,
      distributed_by: userData?.user?.id ?? null,
    });
    if (error) return toast({ variant: 'destructive', title: 'Distribution failed', description: error.message });
    await supabase
      .from('tree_campaign_applications')
      .update({ status: 'seeds_distributed' })
      .eq('id', selected.id);
    toast({ title: 'Seeds distributed', description: `${seedForm.quantity} ${seedForm.species} → ${selected.organization_name}` });
    setSeedOpen(false);
    fetchApps();
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

  const stat = (s: string) => apps.filter((a) => a.status === s).length;

  return (
    <AdminLayout>
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl shadow-lg">
            <TreePine className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">Tree Campaign Applications</h1>
            <p className="text-muted-foreground">Review, approve and dispatch seeds for the 5M (2025) and 10M (2026) campaigns</p>
          </div>
        </div>
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
          <CardTitle className="flex items-center justify-between">
            <span>Applications</span>
            <Button variant="outline" size="sm" onClick={exportCSV}><Download className="w-4 h-4 mr-1" /> Export CSV</Button>
          </CardTitle>
          <CardDescription>Filter by campaign and status; click to view details and distribute seeds</CardDescription>
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
                          <Button variant="ghost" size="sm" onClick={() => { setSelected(a); setViewOpen(true); }}><Eye className="w-4 h-4" /></Button>
                          {a.status === 'pending' && (
                            <>
                              <Button variant="ghost" size="sm" onClick={() => updateStatus(a, 'approved')} title="Approve"><CheckCircle className="w-4 h-4 text-emerald-600" /></Button>
                              <Button variant="ghost" size="sm" onClick={() => updateStatus(a, 'rejected')} title="Reject"><XCircle className="w-4 h-4 text-red-600" /></Button>
                            </>
                          )}
                          {a.status === 'approved' && (
                            <Button variant="ghost" size="sm" onClick={() => openSeed(a)} title="Distribute seeds"><Package className="w-4 h-4 text-purple-700" /></Button>
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application — {selected?.organization_name}</DialogTitle>
            <DialogDescription>{selected?.campaign === '10_million_2026' ? '10 Million Trees · 2026' : '5 Million Trees · 2025'}</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <Field label="Organisation Type" value={selected.organization_type} />
              <Field label="Date Established" value={selected.date_established} />
              <Field label="Address" value={selected.address} />
              <Field label="Contact" value={`${selected.contact_name} (${selected.contact_position || '—'})`} />
              <Field label="Email" value={selected.contact_email} />
              <Field label="Phone" value={selected.contact_phone} />
              <Field label="Planting Sites" value={selected.planting_sites} />
              <Field label="Seedlings Requested" value={selected.seedlings_requested?.toLocaleString()} />
              <Field label="Volunteers" value={selected.volunteers} />
              <Field label="Survival Commitment" value={selected.survival_rate_commitment} />
              <Field label="Locations" value={selected.locations} full />
              <Field label="Previous Experience" value={selected.previous_experience || '—'} full />
              <Field label="Status" value={selected.status} />
              <Field label="Submitted" value={new Date(selected.created_at).toLocaleString()} />
            </div>
          )}
          <DialogFooter className="gap-2">
            {selected?.status === 'pending' && (
              <>
                <Button variant="destructive" onClick={() => { updateStatus(selected, 'rejected'); setViewOpen(false); }}>Reject</Button>
                <Button onClick={() => { updateStatus(selected, 'approved'); setViewOpen(false); }} className="bg-emerald-600 hover:bg-emerald-700">Approve</Button>
              </>
            )}
            {selected?.status === 'approved' && (
              <Button onClick={() => { setViewOpen(false); openSeed(selected); }} className="bg-purple-700 hover:bg-purple-800">
                <Package className="w-4 h-4 mr-1" /> Distribute Seeds
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Seed distribution dialog */}
      <Dialog open={seedOpen} onOpenChange={setSeedOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Distribute Seeds — {selected?.organization_name}</DialogTitle>
            <DialogDescription>Record what was handed over. This unlocks the planting tracker for this organisation.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div><Label>Species</Label><Input value={seedForm.species} onChange={(e) => setSeedForm({ ...seedForm, species: e.target.value })} placeholder="e.g. Mango, Neem, Moringa" /></div>
            <div><Label>Quantity</Label><Input type="number" value={seedForm.quantity} onChange={(e) => setSeedForm({ ...seedForm, quantity: e.target.value })} /></div>
            <div><Label>Batch Code (optional)</Label><Input value={seedForm.batch_code} onChange={(e) => setSeedForm({ ...seedForm, batch_code: e.target.value })} /></div>
            <div><Label>Notes</Label><Textarea value={seedForm.notes} onChange={(e) => setSeedForm({ ...seedForm, notes: e.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSeedOpen(false)}>Cancel</Button>
            <Button onClick={submitSeedDistribution} disabled={!seedForm.species || !seedForm.quantity} className="bg-emerald-700 hover:bg-emerald-800"><ClipboardList className="w-4 h-4 mr-1" /> Confirm</Button>
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
