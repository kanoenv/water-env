import { useEffect, useState } from "react";
import OrgLayout, { useOrgApp } from "@/components/org/OrgLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Copy } from "lucide-react";

type Planter = { id: string; full_name: string; phone: string; assigned_site: string | null; assigned_district: string | null; active: boolean };

export default function OrgPlanters() {
  const { app } = useOrgApp();
  const { toast } = useToast();
  const [rows, setRows] = useState<Planter[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Planter | null>(null);
  const [form, setForm] = useState({ full_name: "", phone: "", assigned_site: "", assigned_district: "", pin: "" });
  const [newPin, setNewPin] = useState<{ phone: string; pin: string } | null>(null);

  const reload = async () => {
    if (!app) return;
    const { data } = await supabase.from("planters").select("*").eq("application_id", app.id).order("created_at", { ascending: false });
    setRows((data ?? []) as Planter[]);
  };
  useEffect(() => { reload(); }, [app]);

  const openNew = () => {
    setEditing(null);
    const pin = String(Math.floor(1000 + Math.random() * 9000));
    setForm({ full_name: "", phone: "", assigned_site: "", assigned_district: "", pin });
    setOpen(true);
  };
  const openEdit = (p: Planter) => {
    setEditing(p);
    setForm({ full_name: p.full_name, phone: p.phone, assigned_site: p.assigned_site || "", assigned_district: p.assigned_district || "", pin: "" });
    setOpen(true);
  };

  const save = async () => {
    if (!app) return;
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-planter`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token}` },
      body: JSON.stringify({ ...form, application_id: app.id, id: editing?.id }),
    });
    const j = await res.json();
    if (!res.ok) return toast({ title: "Failed", description: j.error, variant: "destructive" });
    toast({ title: editing ? "Planter updated" : "Planter added" });
    if (!editing) setNewPin({ phone: form.phone, pin: form.pin });
    setOpen(false); reload();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this planter?")) return;
    await supabase.from("planters").delete().eq("id", id);
    reload();
  };

  return (
    <OrgLayout>
      <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
        <div>
          <p className="text-emerald-700 text-xs uppercase tracking-widest">Field Team</p>
          <h1 className="font-serif text-2xl sm:text-3xl text-slate-900">Planters</h1>
        </div>
        <Button onClick={openNew} className="bg-emerald-700 hover:bg-emerald-800"><Plus className="w-4 h-4 mr-1" /> Add planter</Button>
      </div>

      {/* Mobile: cards */}
      <div className="grid gap-3 sm:hidden">
        {rows.length === 0 && (
          <Card><CardContent className="p-6 text-center text-muted-foreground text-sm">No planters yet. Tap “Add planter”.</CardContent></Card>
        )}
        {rows.map(p => (
          <Card key={p.id}>
            <CardContent className="p-4 space-y-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="font-semibold truncate">{p.full_name}</div>
                  <div className="text-sm text-slate-600">{p.phone}</div>
                </div>
                <div className="flex shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(p)}><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => remove(p.id)}><Trash2 className="w-4 h-4 text-red-600" /></Button>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Site: {p.assigned_site || "—"} · District: {p.assigned_district || "—"}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop: table */}
      <Card className="hidden sm:block">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Phone</TableHead><TableHead>Site</TableHead><TableHead>District</TableHead><TableHead></TableHead></TableRow></TableHeader>
            <TableBody>
              {rows.length === 0 && <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No planters yet.</TableCell></TableRow>}
              {rows.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.full_name}</TableCell>
                  <TableCell>{p.phone}</TableCell>
                  <TableCell>{p.assigned_site || "—"}</TableCell>
                  <TableCell>{p.assigned_district || "—"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(p)}><Edit className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => remove(p.id)}><Trash2 className="w-4 h-4 text-red-600" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit planter" : "Add planter"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Full name</Label><Input value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} /></div>
            <div><Label>Phone</Label><Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-2">
              <div><Label>Site</Label><Input value={form.assigned_site} onChange={e => setForm({ ...form, assigned_site: e.target.value })} /></div>
              <div><Label>District / LGA</Label><Input value={form.assigned_district} onChange={e => setForm({ ...form, assigned_district: e.target.value })} /></div>
            </div>
            <div>
              <Label>{editing ? "Reset PIN (leave blank to keep)" : "PIN (share with planter)"}</Label>
              <Input value={form.pin} onChange={e => setForm({ ...form, pin: e.target.value.replace(/\D/g, "").slice(0, 6) })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save} className="bg-emerald-700 hover:bg-emerald-800">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!newPin} onOpenChange={() => setNewPin(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Planter credentials</DialogTitle></DialogHeader>
          <div className="p-4 bg-emerald-50 rounded">
            <p className="text-sm text-slate-600 mb-2">Share these with the planter — the PIN will not be shown again.</p>
            <div className="text-lg font-mono">Phone: {newPin?.phone}</div>
            <div className="text-lg font-mono">PIN: <span className="text-emerald-800 font-bold">{newPin?.pin}</span></div>
            <p className="text-xs text-slate-600 mt-3">They log in at <code>/planter</code> on any phone.</p>
            <Button size="sm" variant="outline" className="mt-3" onClick={() => { navigator.clipboard.writeText(`Phone: ${newPin?.phone}\nPIN: ${newPin?.pin}\nURL: https://environment.kn.gov.ng/planter`); toast({ title: "Copied" }); }}>
              <Copy className="w-4 h-4 mr-1" /> Copy
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </OrgLayout>
  );
}
