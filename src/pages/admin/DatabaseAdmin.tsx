// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { Loader2, Plus, Pencil, Trash2, LogOut, RefreshCw, Database } from "lucide-react";

type ColSpec = { name: string; type?: "text" | "number" | "uuid" | "json" | "bool"; readOnly?: boolean };
type TableSpec = {
  key: string;
  label: string;
  pk: string;
  orderBy?: string;
  columns: ColSpec[];
  editable: string[];
};

const SPECS: TableSpec[] = [
  {
    key: "profiles",
    label: "Profiles",
    pk: "id",
    orderBy: "created_at",
    columns: [
      { name: "id", readOnly: true },
      { name: "user_id", type: "uuid" },
      { name: "full_name" },
      { name: "email" },
      { name: "phone" },
      { name: "created_at", readOnly: true },
      { name: "updated_at", readOnly: true },
    ],
    editable: ["full_name", "email", "phone"],
  },
  {
    key: "applications",
    label: "Applications",
    pk: "id",
    orderBy: "created_at",
    columns: [
      { name: "id", readOnly: true },
      { name: "full_name" },
      { name: "email" },
      { name: "phone" },
      { name: "applicant_type" },
      { name: "lga" },
      { name: "address" },
      { name: "planting_site" },
      { name: "site_size_hectares", type: "number" },
      { name: "preferred_species" },
      { name: "seeds_requested", type: "number" },
      { name: "purpose" },
      { name: "status" },
      { name: "admin_notes" },
      { name: "organization_id", type: "uuid" },
      { name: "applicant_user_id", type: "uuid" },
      { name: "created_at", readOnly: true },
    ],
    editable: [
      "full_name","email","phone","applicant_type","lga","address","planting_site",
      "site_size_hectares","preferred_species","seeds_requested","purpose","status","admin_notes",
      "organization_id","applicant_user_id",
    ],
  },
  {
    key: "organizations",
    label: "Organizations",
    pk: "id",
    orderBy: "created_at",
    columns: [
      { name: "id", readOnly: true },
      { name: "name" },
      { name: "org_type" },
      { name: "registration_number" },
      { name: "owner_id", type: "uuid" },
      { name: "address" },
      { name: "lga" },
      { name: "contact_email" },
      { name: "contact_phone" },
      { name: "created_at", readOnly: true },
    ],
    editable: ["name","org_type","registration_number","owner_id","address","lga","contact_email","contact_phone"],
  },
  {
    key: "planting_reports",
    label: "Planting Reports",
    pk: "id",
    orderBy: "reported_at",
    columns: [
      { name: "id", readOnly: true },
      { name: "assignment_id", type: "uuid" },
      { name: "reporter_user_id", type: "uuid" },
      { name: "trees_planted", type: "number" },
      { name: "survival_rate", type: "number" },
      { name: "status" },
      { name: "latitude", type: "number" },
      { name: "longitude", type: "number" },
      { name: "location_name" },
      { name: "photo_url" },
      { name: "notes" },
      { name: "reported_at", readOnly: true },
    ],
    editable: ["assignment_id","reporter_user_id","trees_planted","survival_rate","status","latitude","longitude","location_name","photo_url","notes"],
  },
  {
    key: "seed_assignments",
    label: "Seed Assignments",
    pk: "id",
    orderBy: "created_at",
    columns: [
      { name: "id", readOnly: true },
      { name: "application_id", type: "uuid" },
      { name: "organization_id", type: "uuid" },
      { name: "recipient_user_id", type: "uuid" },
      { name: "assigned_by", type: "uuid" },
      { name: "species" },
      { name: "quantity", type: "number" },
      { name: "notes" },
      { name: "created_at", readOnly: true },
    ],
    editable: ["application_id","organization_id","recipient_user_id","assigned_by","species","quantity","notes"],
  },
  {
    key: "user_roles",
    label: "User Roles",
    pk: "id",
    orderBy: "created_at",
    columns: [
      { name: "id", readOnly: true },
      { name: "user_id", type: "uuid" },
      { name: "role" },
      { name: "created_at", readOnly: true },
    ],
    editable: ["user_id","role"],
  },
];

function LoginGate({ onAuthed }: { onAuthed: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
      return;
    }
    onAuthed();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" /> Database Admin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
            </Button>
            <p className="text-xs text-muted-foreground">
              Use a database admin account (admin01/admin2/admin03@environment.kn.gov.ng).
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function CrudTable({ spec }: { spec: TableSpec }) {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const q = supabase.from(spec.key as any).select("*");
    if (spec.orderBy) q.order(spec.orderBy, { ascending: false });
    const { data, error } = await q.limit(500);
    setLoading(false);
    if (error) {
      toast({ title: `Load ${spec.label} failed`, description: error.message, variant: "destructive" });
      return;
    }
    setRows(data || []);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [spec.key]);

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.toLowerCase();
    return rows.filter((r) => JSON.stringify(r).toLowerCase().includes(q));
  }, [rows, query]);

  const openCreate = () => {
    const empty: Record<string, any> = {};
    spec.editable.forEach((k) => (empty[k] = ""));
    setForm(empty);
    setEditing(null);
    setCreating(true);
  };

  const openEdit = (row: any) => {
    const init: Record<string, any> = {};
    spec.editable.forEach((k) => (init[k] = row[k] ?? ""));
    setForm(init);
    setEditing(row);
    setCreating(false);
  };

  const coerce = (k: string, v: any) => {
    const col = spec.columns.find((c) => c.name === k);
    if (v === "" || v === null || v === undefined) return null;
    if (col?.type === "number") return Number(v);
    return v;
  };

  const save = async () => {
    setSaving(true);
    const payload: Record<string, any> = {};
    Object.keys(form).forEach((k) => (payload[k] = coerce(k, form[k])));
    let resp;
    if (editing) {
      resp = await supabase.from(spec.key as any).update(payload).eq(spec.pk, editing[spec.pk]);
    } else {
      resp = await supabase.from(spec.key as any).insert(payload);
    }
    setSaving(false);
    if (resp.error) {
      toast({ title: "Save failed", description: resp.error.message, variant: "destructive" });
      return;
    }
    toast({ title: editing ? "Updated" : "Created" });
    setEditing(null);
    setCreating(false);
    load();
  };

  const remove = async (row: any) => {
    if (!confirm(`Delete this ${spec.label} row?`)) return;
    const { error } = await supabase.from(spec.key as any).delete().eq(spec.pk, row[spec.pk]);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Deleted" });
    load();
  };

  const dialogOpen = creating || !!editing;
  const closeDialog = () => { setCreating(false); setEditing(null); };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Input placeholder={`Search ${spec.label}…`} value={query} onChange={(e) => setQuery(e.target.value)} className="max-w-xs" />
        <Button variant="outline" size="icon" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
        <div className="flex-1" />
        <Button onClick={openCreate}><Plus className="h-4 w-4 mr-1" /> New</Button>
      </div>

      <div className="border rounded-md overflow-auto max-h-[65vh]">
        <Table>
          <TableHeader>
            <TableRow>
              {spec.columns.map((c) => <TableHead key={c.name}>{c.name}</TableHead>)}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={spec.columns.length + 1} className="text-center py-8"><Loader2 className="h-5 w-5 animate-spin inline" /></TableCell></TableRow>
            ) : filtered.length === 0 ? (
              <TableRow><TableCell colSpan={spec.columns.length + 1} className="text-center py-8 text-muted-foreground">No rows</TableCell></TableRow>
            ) : filtered.map((row) => (
              <TableRow key={row[spec.pk]}>
                {spec.columns.map((c) => (
                  <TableCell key={c.name} className="max-w-[220px] truncate text-xs">
                    {row[c.name] == null ? <span className="text-muted-foreground">—</span> : String(row[c.name])}
                  </TableCell>
                ))}
                <TableCell className="text-right whitespace-nowrap">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(row)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => remove(row)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="text-xs text-muted-foreground">{filtered.length} row(s)</p>

      <Dialog open={dialogOpen} onOpenChange={(o) => !o && closeDialog()}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? `Edit ${spec.label}` : `New ${spec.label}`}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {spec.editable.map((k) => {
              const col = spec.columns.find((c) => c.name === k);
              const isLong = ["address","admin_notes","notes","purpose","preferred_species","photo_url"].includes(k);
              return (
                <div key={k} className={isLong ? "md:col-span-2" : ""}>
                  <Label className="text-xs">{k}</Label>
                  {isLong ? (
                    <Textarea value={form[k] ?? ""} onChange={(e) => setForm({ ...form, [k]: e.target.value })} rows={2} />
                  ) : (
                    <Input
                      type={col?.type === "number" ? "number" : "text"}
                      value={form[k] ?? ""}
                      onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>Cancel</Button>
            <Button onClick={save} disabled={saving}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function DatabaseAdmin() {
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState(SPECS[0].key);

  const checkRole = async (userId: string) => {
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
    setIsAdmin(!!data?.some((r: any) => r.role === "admin"));
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session?.user) checkRole(data.session.user.id);
      else setIsAdmin(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (s?.user) checkRole(s.user.id);
      else setIsAdmin(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signOut = async () => { await supabase.auth.signOut(); };

  if (!session) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>;
  if (isAdmin === null) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
        <Database className="h-10 w-10 text-muted-foreground" />
        <h1 className="text-xl font-semibold">Not authorized</h1>
        <p className="text-muted-foreground max-w-md">
          Your account ({session.user.email}) is signed in but does not have the <code>admin</code> role.
        </p>
        <Button variant="outline" onClick={signOut}><LogOut className="h-4 w-4 mr-1" /> Sign out</Button>
      </div>
    );
  }

  return (
    <AdminLayout>
      <main className="py-6">
        <div className="mb-6 flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-semibold">Database Admin</h1>
        </div>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="flex flex-wrap h-auto">
            {SPECS.map((s) => <TabsTrigger key={s.key} value={s.key}>{s.label}</TabsTrigger>)}
          </TabsList>
          {SPECS.map((s) => (
            <TabsContent key={s.key} value={s.key} className="mt-4">
              <CrudTable spec={s} />
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </AdminLayout>
  );
}
