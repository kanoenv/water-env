// @ts-nocheck
import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { TreePine, Plus, Sprout, Activity, MapPin, Download, Loader2 } from 'lucide-react';

const TreePlantingTracker = () => {
  const { toast } = useToast();
  const [logs, setLogs] = useState<any[]>([]);
  const [apps, setApps] = useState<any[]>([]);
  const [distributions, setDistributions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [campaignFilter, setCampaignFilter] = useState('all');
  const [form, setForm] = useState({
    application_id: '',
    distribution_id: '',
    trees_planted: '',
    species: '',
    location_name: '',
    latitude: '',
    longitude: '',
    survival_rate: '',
    notes: '',
  });

  const load = async () => {
    setLoading(true);
    const [logsR, appsR, distR] = await Promise.all([
      supabase.from('tree_planting_logs').select('*, tree_campaign_applications(organization_name, campaign)').order('planting_date', { ascending: false }),
      supabase.from('tree_campaign_applications').select('id, organization_name, campaign, status').in('status', ['approved', 'seeds_distributed', 'completed']),
      supabase.from('tree_seed_distributions').select('*'),
    ]);
    setLogs(logsR.data || []);
    setApps(appsR.data || []);
    setDistributions(distR.data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const totalTrees = logs.reduce((s, l) => s + (l.trees_planted || 0), 0);
  const avgSurvival = (() => {
    const withRate = logs.filter((l) => l.survival_rate != null);
    if (!withRate.length) return null;
    return (withRate.reduce((s, l) => s + Number(l.survival_rate), 0) / withRate.length).toFixed(1);
  })();

  const filtered = logs.filter((l) => campaignFilter === 'all' || l.tree_campaign_applications?.campaign === campaignFilter);

  const submitLog = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const { error } = await supabase.from('tree_planting_logs').insert({
      application_id: form.application_id,
      distribution_id: form.distribution_id || null,
      trees_planted: parseInt(form.trees_planted),
      species: form.species || null,
      location_name: form.location_name || null,
      latitude: form.latitude ? Number(form.latitude) : null,
      longitude: form.longitude ? Number(form.longitude) : null,
      survival_rate: form.survival_rate ? Number(form.survival_rate) : null,
      notes: form.notes || null,
      logged_by: userData?.user?.id ?? null,
    });
    if (error) return toast({ variant: 'destructive', title: 'Save failed', description: error.message });
    toast({ title: 'Planting logged', description: `${form.trees_planted} trees recorded` });
    setOpen(false);
    setForm({ application_id: '', distribution_id: '', trees_planted: '', species: '', location_name: '', latitude: '', longitude: '', survival_rate: '', notes: '' });
    load();
  };

  const exportCSV = () => {
    const headers = ['Date', 'Organisation', 'Campaign', 'Species', 'Trees', 'Location', 'Survival %'];
    const rows = filtered.map((l) => [
      l.planting_date, `"${l.tree_campaign_applications?.organization_name || ''}"`,
      l.tree_campaign_applications?.campaign || '', l.species || '',
      l.trees_planted, `"${l.location_name || ''}"`, l.survival_rate ?? '',
    ].join(','));
    const blob = new Blob([[headers.join(','), ...rows].join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `planting_logs_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <AdminLayout>
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl shadow-lg">
              <TreePine className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">Planting Tracker</h1>
              <p className="text-muted-foreground">Every tree planted by approved organisations — logged with location, species and survival rate</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="bg-emerald-700 hover:bg-emerald-800"><Plus className="w-4 h-4 mr-1" /> Log Planting</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card><CardContent className="p-4"><Sprout className="w-5 h-5 text-emerald-700 mb-1" /><div className="text-xs text-muted-foreground">Total Trees Planted</div><div className="text-2xl font-bold">{totalTrees.toLocaleString()}</div></CardContent></Card>
        <Card><CardContent className="p-4"><Activity className="w-5 h-5 text-blue-700 mb-1" /><div className="text-xs text-muted-foreground">Logs Recorded</div><div className="text-2xl font-bold">{logs.length}</div></CardContent></Card>
        <Card><CardContent className="p-4"><MapPin className="w-5 h-5 text-purple-700 mb-1" /><div className="text-xs text-muted-foreground">Active Orgs</div><div className="text-2xl font-bold">{new Set(logs.map((l) => l.application_id)).size}</div></CardContent></Card>
        <Card><CardContent className="p-4"><TreePine className="w-5 h-5 text-amber-700 mb-1" /><div className="text-xs text-muted-foreground">Avg Survival</div><div className="text-2xl font-bold">{avgSurvival ? `${avgSurvival}%` : '—'}</div></CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Planting Logs</span>
            <div className="flex gap-2">
              <Select value={campaignFilter} onValueChange={setCampaignFilter}>
                <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campaigns</SelectItem>
                  <SelectItem value="10_million_2026">10M · 2026</SelectItem>
                  <SelectItem value="5_million_2025">5M · 2025</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={exportCSV}><Download className="w-4 h-4 mr-1" /> CSV</Button>
            </div>
          </CardTitle>
          <CardDescription>Field reports from approved organisations</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 border rounded-md bg-gray-50">
              <TreePine className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No planting logs yet. Approve organisations and distribute seeds to begin tracking.</p>
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Date</TableHead>
                    <TableHead>Organisation</TableHead>
                    <TableHead>Species</TableHead>
                    <TableHead>Trees</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Survival</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((l) => (
                    <TableRow key={l.id}>
                      <TableCell className="text-sm">{l.planting_date}</TableCell>
                      <TableCell>
                        <div className="font-medium">{l.tree_campaign_applications?.organization_name || '—'}</div>
                        <Badge variant="outline" className="text-xs mt-1">{l.tree_campaign_applications?.campaign === '10_million_2026' ? '10M · 2026' : '5M · 2025'}</Badge>
                      </TableCell>
                      <TableCell>{l.species || '—'}</TableCell>
                      <TableCell className="font-semibold">{l.trees_planted?.toLocaleString()}</TableCell>
                      <TableCell className="text-sm">{l.location_name || (l.latitude ? `${l.latitude}, ${l.longitude}` : '—')}</TableCell>
                      <TableCell>{l.survival_rate != null ? `${l.survival_rate}%` : '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Log a Planting</DialogTitle>
            <DialogDescription>Record what was planted by an approved organisation</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Organisation (approved only)</Label>
              <Select value={form.application_id} onValueChange={(v) => setForm({ ...form, application_id: v, distribution_id: '' })}>
                <SelectTrigger><SelectValue placeholder="Select organisation" /></SelectTrigger>
                <SelectContent>
                  {apps.map((a) => <SelectItem key={a.id} value={a.id}>{a.organization_name} ({a.campaign === '10_million_2026' ? '10M' : '5M'})</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {form.application_id && (
              <div>
                <Label>Seed Distribution (optional)</Label>
                <Select value={form.distribution_id} onValueChange={(v) => setForm({ ...form, distribution_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Link to a distribution batch" /></SelectTrigger>
                  <SelectContent>
                    {distributions.filter((d) => d.application_id === form.application_id).map((d) => (
                      <SelectItem key={d.id} value={d.id}>{d.species} — {d.quantity} ({d.batch_code || d.distribution_date})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Trees Planted *</Label><Input type="number" value={form.trees_planted} onChange={(e) => setForm({ ...form, trees_planted: e.target.value })} /></div>
              <div><Label>Species</Label><Input value={form.species} onChange={(e) => setForm({ ...form, species: e.target.value })} /></div>
            </div>
            <div><Label>Location Name</Label><Input value={form.location_name} onChange={(e) => setForm({ ...form, location_name: e.target.value })} placeholder="e.g. Dorayi LGA — Site A" /></div>
            <div className="grid grid-cols-3 gap-3">
              <div><Label>Lat</Label><Input value={form.latitude} onChange={(e) => setForm({ ...form, latitude: e.target.value })} /></div>
              <div><Label>Lng</Label><Input value={form.longitude} onChange={(e) => setForm({ ...form, longitude: e.target.value })} /></div>
              <div><Label>Survival %</Label><Input type="number" min="0" max="100" value={form.survival_rate} onChange={(e) => setForm({ ...form, survival_rate: e.target.value })} /></div>
            </div>
            <div><Label>Notes</Label><Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={submitLog} disabled={!form.application_id || !form.trees_planted} className="bg-emerald-700 hover:bg-emerald-800">Save Log</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default TreePlantingTracker;
