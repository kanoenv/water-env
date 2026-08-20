import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Droplets, Users, CheckCircle2, Clock, Download } from 'lucide-react';

type App = {
  id: string;
  tracking_number: string;
  full_name: string;
  phone_number: string;
  community_name: string;
  community_leader: string | null;
  ward: string;
  lga: string;
  beneficiaries_range: string;
  working_borehole: boolean;
  status: string;
  admin_remark: string | null;
  created_at: string;
};

const PAGE_SIZE = 50;

const statusTone = (s: string) => {
  const v = s.toLowerCase();
  if (v.includes('approv')) return 'bg-primary/10 text-primary border-primary/30';
  if (v.includes('reject')) return 'bg-destructive/10 text-destructive border-destructive/30';
  if (v.includes('complet')) return 'bg-accent/15 text-accent-foreground border-accent/40';
  return 'bg-muted text-muted-foreground border-border';
};

const BoreholeApplications = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [lga, setLga] = useState('all');
  const [page, setPage] = useState(1);
  const [applicants, setApplicants] = useState(0);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const all: App[] = [];
      for (let from = 0; ; from += 1000) {
        const { data, error } = await supabase
          .from('borehole_applications')
          .select('id,tracking_number,full_name,phone_number,community_name,community_leader,ward,lga,beneficiaries_range,working_borehole,status,admin_remark,created_at')
          .order('created_at', { ascending: false })
          .range(from, from + 999);
        if (error) {
          toast({ title: 'Load failed', description: error.message, variant: 'destructive' });
          break;
        }
        all.push(...((data || []) as App[]));
        if (!data || data.length < 1000) break;
      }
      setRows(all);
      const { count } = await supabase.from('borehole_applicants').select('id', { count: 'exact', head: true });
      setApplicants(count || 0);
      setLoading(false);
    })();
  }, [toast]);

  const lgas = useMemo(() => Array.from(new Set(rows.map((r) => r.lga).filter(Boolean))).sort(), [rows]);
  const statuses = useMemo(() => Array.from(new Set(rows.map((r) => r.status).filter(Boolean))).sort(), [rows]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (status !== 'all' && r.status !== status) return false;
      if (lga !== 'all' && r.lga !== lga) return false;
      if (!q) return true;
      return [r.tracking_number, r.full_name, r.phone_number, r.community_name, r.ward, r.lga]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    });
  }, [rows, search, status, lga]);

  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const approved = rows.filter((r) => r.status.toLowerCase().includes('approv')).length;
  const pending = rows.filter((r) => r.status.toLowerCase().includes('pend')).length;

  const exportCsv = () => {
    const head = ['Tracking', 'Applicant', 'Phone', 'Community', 'Ward', 'LGA', 'Beneficiaries', 'Working borehole', 'Status', 'Submitted'];
    const body = filtered.map((r) => [
      r.tracking_number, r.full_name, r.phone_number, r.community_name, r.ward, r.lga,
      r.beneficiaries_range, r.working_borehole ? 'Yes' : 'No', r.status, new Date(r.created_at).toLocaleDateString(),
    ]);
    const csv = [head, ...body].map((l) => l.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `borehole-applications-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = [
    { label: 'Total applications', value: rows.length, icon: Droplets },
    { label: 'Registered applicants', value: applicants, icon: Users },
    { label: 'Approved', value: approved, icon: CheckCircle2 },
    { label: 'Pending review', value: pending, icon: Clock },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="Water Resources"
          title="Borehole Applications"
          description="Community borehole requests imported from the Kano Water Project portal."
          breadcrumb={[{ label: 'Admin', to: '/admin/dashboard' }, { label: 'Borehole Applications' }]}
          actions={
            <Button variant="outline" onClick={exportCsv}>
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label}>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-semibold tracking-tight">{s.value.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-base">
              {loading ? 'Loading records…' : `${filtered.length.toLocaleString()} record(s)`}
            </CardTitle>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                placeholder="Search tracking no, name, community…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="sm:w-72"
              />
              <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
                <SelectTrigger className="sm:w-40"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={lga} onValueChange={(v) => { setLga(v); setPage(1); }}>
                <SelectTrigger className="sm:w-44"><SelectValue placeholder="LGA" /></SelectTrigger>
                <SelectContent className="max-h-72">
                  <SelectItem value="all">All LGAs</SelectItem>
                  {lgas.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Community</TableHead>
                    <TableHead>Ward / LGA</TableHead>
                    <TableHead>Beneficiaries</TableHead>
                    <TableHead>Existing borehole</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageRows.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-mono text-xs">{r.tracking_number}</TableCell>
                      <TableCell>
                        <div className="font-medium">{r.full_name}</div>
                        <div className="text-xs text-muted-foreground">{r.phone_number}</div>
                      </TableCell>
                      <TableCell>
                        <div>{r.community_name}</div>
                        {r.community_leader && <div className="text-xs text-muted-foreground">{r.community_leader}</div>}
                      </TableCell>
                      <TableCell className="text-sm">{r.ward} / {r.lga}</TableCell>
                      <TableCell className="text-sm">{r.beneficiaries_range}</TableCell>
                      <TableCell className="text-sm">{r.working_borehole ? 'Yes' : 'No'}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusTone(r.status)}>{r.status}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(r.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                  {!loading && pageRows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                        No applications match your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Page {page} of {pages}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
                <Button variant="outline" size="sm" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default BoreholeApplications;
