// @ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { TreePine, Search, Loader2, Package, Printer, LogOut, Trash2, Pencil } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  under_review: "bg-blue-100 text-blue-800 border-blue-200",
  approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  seeds_distributed: "bg-purple-100 text-purple-800 border-purple-200",
  completed: "bg-gray-200 text-gray-800 border-gray-300",
};

const emptySeed = { id: null, species: "", quantity: "", batch_code: "", notes: "" };

export default function TreeAdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [checking, setChecking] = useState(true);
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<any>(null);
  const [distributions, setDistributions] = useState<any[]>([]);
  const [seedOpen, setSeedOpen] = useState(false);
  const [seedForm, setSeedForm] = useState<any>(emptySeed);
  const [totals, setTotals] = useState<Record<string, number>>({});
  const [page, setPage] = useState(1);
  const PER_PAGE = 25;


  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return navigate("/tree-admin-login", { replace: true });
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id);
      if (!roles?.some((r: any) => r.role === "tree_admin")) {
        await supabase.auth.signOut();
        return navigate("/tree-admin-login", { replace: true });
      }
      setChecking(false);
      fetchApps();
    })();
  }, []);

  const fetchApps = async () => {
    setLoading(true);
    const pageSize = 1000;
    let from = 0;
    const all: any[] = [];
    while (true) {
      const { data, error } = await supabase
        .from("tree_campaign_applications")
        .select("*")
        .eq("campaign", "10_million_2026")
        .order("created_at", { ascending: false })
        .range(from, from + pageSize - 1);
      if (error) { toast({ variant: "destructive", title: "Load failed", description: error.message }); break; }
      if (!data?.length) break;
      all.push(...data);
      if (data.length < pageSize) break;
      from += pageSize;
    }
    setApps(all);
    await fetchTotals();
    setLoading(false);
  };

  const fetchTotals = async () => {
    const pageSize = 1000;
    let from = 0;
    const map: Record<string, number> = {};
    while (true) {
      const { data, error } = await supabase
        .from("tree_seed_distributions")
        .select("application_id,quantity")
        .range(from, from + pageSize - 1);
      if (error || !data?.length) break;
      data.forEach((d: any) => { map[d.application_id] = (map[d.application_id] || 0) + (d.quantity || 0); });
      if (data.length < pageSize) break;
      from += pageSize;
    }
    setTotals(map);
  };


  const fetchDistributions = async (appId: string) => {
    const { data } = await supabase
      .from("tree_seed_distributions")
      .select("*")
      .eq("application_id", appId)
      .order("created_at", { ascending: false });
    setDistributions(data || []);
    return data || [];
  };

  const openSeed = async (app: any, existing: any = null) => {
    setSelected(app);
    await fetchDistributions(app.id);
    setSeedForm(existing
      ? { id: existing.id, species: existing.species || "", quantity: String(existing.quantity || ""), batch_code: existing.batch_code || "", notes: existing.notes || "" }
      : { ...emptySeed, quantity: String(app.seedlings_requested || "") });
    setSeedOpen(true);
  };

  const submitSeed = async () => {
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
    if (!payload.species || !payload.quantity) {
      return toast({ variant: "destructive", title: "Species and quantity are required" });
    }
    const { error } = seedForm.id
      ? await supabase.from("tree_seed_distributions").update(payload).eq("id", seedForm.id)
      : await supabase.from("tree_seed_distributions").insert(payload);
    if (error) return toast({ variant: "destructive", title: "Save failed", description: error.message });
    if (!seedForm.id && selected.status === "approved") {
      await supabase.from("tree_campaign_applications").update({ status: "seeds_distributed" }).eq("id", selected.id);
    }
    toast({ title: "Seeds assigned", description: `${payload.quantity} ${payload.species} → ${selected.organization_name}` });
    setSeedForm(emptySeed);
    await fetchDistributions(selected.id);
    fetchApps();
  };

  const deleteDistribution = async (id: string) => {
    if (!confirm("Remove this seed assignment?")) return;
    const { error } = await supabase.from("tree_seed_distributions").delete().eq("id", id);
    if (error) return toast({ variant: "destructive", title: "Delete failed", description: error.message });
    if (selected) await fetchDistributions(selected.id);
  };

  const printSlip = async (app: any) => {
    const dists = await fetchDistributions(app.id);
    const totalSeeds = dists.reduce((s: number, d: any) => s + (d.quantity || 0), 0);
    const today = new Date().toLocaleDateString("en-NG", { day: "2-digit", month: "long", year: "numeric" });
    const refNo = `KS/MWRECC/10M/${String(app.id).slice(0, 8).toUpperCase()}`;
    const campaignTitle = "10 Million Trees Planting Campaign · 2026";
    const rows = dists.length
      ? dists.map((d: any, i: number) => `<tr><td>${i + 1}</td><td>${d.species || ""}</td><td class="num">${(d.quantity || 0).toLocaleString()}</td><td>${d.batch_code || "—"}</td><td>${new Date(d.distribution_date || d.created_at).toLocaleDateString()}</td></tr>`).join("")
      : `<tr><td colspan="5" style="text-align:center;color:#888;padding:18px">No seeds assigned yet</td></tr>`;

    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Seed Assignment Slip — ${app.organization_name}</title>
<style>
  @page { size: A4 portrait; margin: 12mm; }
  *{box-sizing:border-box}
  html,body{margin:0;padding:0;background:#f1f5f9}
  body{font-family:Georgia,'Times New Roman',serif;color:#14261a;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .sheet{width:210mm;min-height:297mm;margin:16px auto;background:#fff;padding:12mm;box-shadow:0 6px 24px rgba(0,0,0,.12)}
  .frame{border:2px solid #15803d;padding:10mm;position:relative;min-height:100%}
  .frame::before{content:'';position:absolute;inset:3mm;border:1px solid #86efac;pointer-events:none}
  header{display:flex;align-items:center;gap:16px;border-bottom:3px double #15803d;padding-bottom:14px;margin-bottom:16px}
  header img{height:78px;width:78px;border-radius:50%;background:#fff;border:2px solid #15803d;object-fit:cover}
  header h1{margin:0;font-size:19px;color:#14532d;letter-spacing:.3px;line-height:1.25}
  header .sub{font-size:10.5px;color:#4b5563;margin-top:3px;text-transform:uppercase;letter-spacing:2px;font-family:Arial,sans-serif}
  .ref{position:absolute;top:6mm;right:8mm;font-size:10px;color:#6b7280;font-family:Arial,sans-serif;text-align:right;line-height:1.5}
  h2{font-size:11.5px;text-transform:uppercase;letter-spacing:2px;color:#14532d;border-left:4px solid #15803d;padding-left:9px;margin:16px 0 8px;font-family:Arial,sans-serif}
  .meta{display:grid;grid-template-columns:repeat(2,1fr);gap:8px 22px;font-size:12px;margin-bottom:6px}
  .meta b{display:block;color:#14532d;text-transform:uppercase;font-size:9.5px;letter-spacing:1px;font-family:Arial,sans-serif;margin-bottom:2px}
  table{width:100%;border-collapse:collapse;font-size:12px;font-family:Arial,sans-serif;border:1px solid #bbf7d0}
  th{background:#14532d;color:#fff;padding:7px 8px;text-align:left;font-size:10px;letter-spacing:1px;text-transform:uppercase}
  td{padding:7px 8px;border-bottom:1px solid #d1fae5;border-right:1px solid #ecfdf5}
  td.num,th.num{text-align:right}
  tfoot td{font-weight:bold;background:#f0fdf4;border-top:2px solid #15803d}
  .org-box{background:#f0fdf4;border:1px solid #bbf7d0;border-left:4px solid #15803d;padding:12px 14px;margin-bottom:10px;font-size:12px}
  .org-box .name{font-size:17px;font-weight:bold;color:#14532d;margin-bottom:4px}
  .sign{display:grid;grid-template-columns:1fr 1fr;gap:50px;margin-top:26mm;font-size:12px}
  .sign div{border-top:1px solid #14261a;padding-top:6px;text-align:center}
  .sign b{display:block;color:#14532d}
  .stamp{position:absolute;bottom:22mm;right:18mm;width:36mm;height:36mm;border:3px double #15803d;border-radius:50%;display:flex;align-items:center;justify-content:center;text-align:center;font-size:9px;color:#15803d;transform:rotate(-12deg);opacity:.45;font-family:Arial;letter-spacing:1px;line-height:1.5;padding:8px}
  footer{margin-top:14px;padding-top:10px;border-top:1px solid #d1d5db;font-size:9.5px;color:#6b7280;text-align:center;font-family:Arial,sans-serif}
  .noprint{position:fixed;top:14px;right:14px;display:flex;gap:8px}
  .noprint button{background:#15803d;color:#fff;border:0;padding:10px 18px;font-size:13px;border-radius:6px;cursor:pointer;font-family:Arial}
  .noprint button.alt{background:#334155}
  @media print{
    html,body{background:#fff}
    .sheet{width:auto;min-height:0;margin:0;padding:0;box-shadow:none}
    .frame{min-height:calc(297mm - 24mm - 4px)}
    .noprint{display:none}
    tr{page-break-inside:avoid}
  }
</style></head><body>
<div class="noprint"><button onclick="window.print()">Print / Save as PDF</button><button class="alt" onclick="window.close()">Close</button></div>
<div class="sheet"><div class="frame">
  <div class="ref">Ref: ${refNo}<br/>Date: ${today}</div>
  <header>
    <img src="/kano-ministry-seal.png" alt="Kano State Seal"/>
    <div>
      <div class="sub">Kano State Government</div>
      <h1>Ministry of Water Resources, Environment and Climate Change</h1>
      <div class="sub" style="margin-top:5px">Official Seed Assignment Slip</div>
    </div>
  </header>
  <h2>Campaign</h2>
  <div style="font-size:14px;font-weight:bold;color:#14532d">${campaignTitle}</div>
  <h2>Organisation Information</h2>
  <div class="org-box">
    <div class="name">${app.organization_name || ""}</div>
    <div><b style="display:inline">Type:</b> ${app.organization_type || "—"} &nbsp;·&nbsp; <b style="display:inline">Established:</b> ${app.date_established || "—"}</div>
    <div style="margin-top:4px"><b style="display:inline">Address:</b> ${app.address || "—"}</div>
  </div>
  <div class="meta">
    <div><b>Contact Person</b>${app.contact_name || "—"} (${app.contact_position || "—"})</div>
    <div><b>Email</b>${app.contact_email || "—"}</div>
    <div><b>Phone</b>${app.contact_phone || "—"}</div>
    <div><b>Volunteers</b>${app.volunteers || "—"}</div>
    <div><b>Planting Sites</b>${app.planting_sites || "—"}</div>
    <div><b>Survival Commitment</b>${app.survival_rate_commitment || "—"}</div>
    <div style="grid-column:1/3"><b>Planting Locations</b>${app.locations || "—"}</div>
  </div>
  <h2>Assigned Seedlings</h2>
  <table>
    <thead><tr><th>#</th><th>Species</th><th class="num">Quantity</th><th>Batch Code</th><th>Date</th></tr></thead>
    <tbody>${rows}</tbody>
    <tfoot><tr><td colspan="2">TOTAL ASSIGNED</td><td class="num">${totalSeeds.toLocaleString()}</td><td colspan="2">of ${(app.seedlings_requested || 0).toLocaleString()} requested</td></tr></tfoot>
  </table>
  <div class="sign">
    <div><b>Authorised Officer</b>Ministry of Water Resources,<br/>Environment &amp; Climate Change</div>
    <div><b>Recipient</b>${app.contact_name || ""}<br/>${app.organization_name || ""}</div>
  </div>
  <div class="stamp">OFFICIAL<br/>KANO STATE<br/>MINISTRY</div>
  <footer>This slip is an official record of seedlings released under the ${campaignTitle}. · Ref ${refNo}</footer>
</div></div>
</body></html>`;

    const w = window.open("", "_blank");
    if (!w) return toast({ variant: "destructive", title: "Popup blocked", description: "Allow popups to print the slip" });
    w.document.write(html);
    w.document.close();
  };


  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/tree-admin-login", { replace: true });
  };

  const filtered = apps.filter((a) => {
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    if (!search) return true;
    const s = search.toLowerCase();
    return a.organization_name?.toLowerCase().includes(s)
      || a.contact_name?.toLowerCase().includes(s)
      || a.contact_email?.toLowerCase().includes(s)
      || a.locations?.toLowerCase().includes(s);
  });

  const totalRequested = apps.reduce((s, a) => s + (a.seedlings_requested || 0), 0);
  const totalAssigned = Object.values(totals).reduce((s: number, v: number) => s + v, 0);
  const assignedOrgs = Object.keys(totals).length;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);


  if (checking) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-emerald-900 text-white">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-white/10 ring-1 ring-white/20 flex items-center justify-center">
              <TreePine className="h-6 w-6 text-amber-300" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">10 Million Trees · 2026</h1>
              <p className="text-xs text-white/70">Seedling assignment &amp; slip issuance console</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={logout} className="bg-transparent text-white border-white/30 hover:bg-white/10">
            <LogOut className="h-4 w-4 mr-1.5" /> Sign out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Applications", value: apps.length.toLocaleString() },
            { label: "Seedlings requested", value: totalRequested.toLocaleString() },
            { label: "Seedlings assigned", value: totalAssigned.toLocaleString() },
            { label: "Orgs with seeds", value: assignedOrgs.toLocaleString() },
          ].map((s) => (
            <Card key={s.label} className="border-emerald-100">
              <CardContent className="p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold text-emerald-800 mt-1">{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div>
              <CardTitle className="text-base">10 Million Trees applications</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">{filtered.length.toLocaleString()} matching · page {safePage} of {totalPages}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search name, contact, email, location…" className="pl-8 w-64" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
              </div>
              <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
                <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="under_review">Under review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="seeds_distributed">Seeds distributed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              {(search || statusFilter !== "all") && (
                <Button variant="ghost" size="sm" onClick={() => { setSearch(""); setStatusFilter("all"); setPage(1); }}>Clear</Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-16 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-emerald-700" /></div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Organisation</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead className="text-right">Requested</TableHead>
                      <TableHead className="text-right">Assigned</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pageRows.map((a) => {
                      const assigned = totals[a.id] || 0;
                      return (
                        <TableRow key={a.id} className="hover:bg-emerald-50/50">
                          <TableCell>
                            <div className="font-medium">{a.organization_name}</div>
                            <div className="text-xs text-muted-foreground">{a.locations}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">{a.contact_name}</div>
                            <div className="text-xs text-muted-foreground">{a.contact_phone}</div>
                          </TableCell>
                          <TableCell className="text-right">{(a.seedlings_requested || 0).toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <span className={assigned ? "font-semibold text-emerald-700" : "text-muted-foreground"}>{assigned.toLocaleString()}</span>
                          </TableCell>
                          <TableCell><Badge variant="outline" className={STATUS_COLORS[a.status]}>{a.status?.replace(/_/g, " ")}</Badge></TableCell>
                          <TableCell className="text-right whitespace-nowrap">
                            <Button size="sm" variant="outline" className="mr-2" onClick={() => openSeed(a)}>
                              <Package className="h-4 w-4 mr-1" /> Assign seeds
                            </Button>
                            <Button size="sm" className="bg-emerald-700 hover:bg-emerald-800" onClick={() => printSlip(a)}>
                              <Printer className="h-4 w-4 mr-1" /> Print slip
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {!filtered.length && (
                      <TableRow><TableCell colSpan={6} className="text-center py-10 text-muted-foreground">No applications found</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-xs text-muted-foreground">
                      Showing {((safePage - 1) * PER_PAGE + 1).toLocaleString()}–{Math.min(safePage * PER_PAGE, filtered.length).toLocaleString()} of {filtered.length.toLocaleString()}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" disabled={safePage <= 1} onClick={() => setPage(safePage - 1)}>Previous</Button>
                      <Button size="sm" variant="outline" disabled={safePage >= totalPages} onClick={() => setPage(safePage + 1)}>Next</Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>


      <Dialog open={seedOpen} onOpenChange={setSeedOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Assign seedlings</DialogTitle>
            <DialogDescription>{selected?.organization_name} · requested {(selected?.seedlings_requested || 0).toLocaleString()}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 sm:grid-cols-2">
            <div><Label>Species</Label><Input value={seedForm.species} onChange={(e) => setSeedForm({ ...seedForm, species: e.target.value })} placeholder="e.g. Neem" /></div>
            <div><Label>Quantity</Label><Input type="number" min={1} value={seedForm.quantity} onChange={(e) => setSeedForm({ ...seedForm, quantity: e.target.value })} /></div>
            <div><Label>Batch code</Label><Input value={seedForm.batch_code} onChange={(e) => setSeedForm({ ...seedForm, batch_code: e.target.value })} /></div>
            <div className="sm:col-span-2"><Label>Notes</Label><Textarea rows={2} value={seedForm.notes} onChange={(e) => setSeedForm({ ...seedForm, notes: e.target.value })} /></div>
          </div>

          {!!distributions.length && (
            <div className="rounded-md border mt-2">
              <Table>
                <TableHeader><TableRow><TableHead>Species</TableHead><TableHead className="text-right">Qty</TableHead><TableHead>Batch</TableHead><TableHead /></TableRow></TableHeader>
                <TableBody>
                  {distributions.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell>{d.species}</TableCell>
                      <TableCell className="text-right">{(d.quantity || 0).toLocaleString()}</TableCell>
                      <TableCell>{d.batch_code || "—"}</TableCell>
                      <TableCell className="text-right">
                        <Button size="icon" variant="ghost" onClick={() => setSeedForm({ id: d.id, species: d.species || "", quantity: String(d.quantity || ""), batch_code: d.batch_code || "", notes: d.notes || "" })}><Pencil className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => deleteDistribution(d.id)}><Trash2 className="h-4 w-4 text-red-600" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => selected && printSlip(selected)}><Printer className="h-4 w-4 mr-1" /> Print slip</Button>
            <Button className="bg-emerald-700 hover:bg-emerald-800" onClick={submitSeed}>{seedForm.id ? "Update assignment" : "Assign seeds"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
