import { useEffect, useState } from "react";
import OrgLayout, { useOrgApp } from "@/components/org/OrgLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sprout, MapPin } from "lucide-react";

export default function OrgPlantings() {
  const { app } = useOrgApp();
  const [rows, setRows] = useState<any[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!app) return;
    (async () => {
      const { data } = await supabase
        .from("tree_planting_logs")
        .select("*, planters(full_name)")
        .eq("application_id", app.id)
        .order("planting_date", { ascending: false });
      setRows(data ?? []);
    })();
  }, [app]);

  const filtered = rows.filter(r => {
    const s = q.toLowerCase();
    return !s || (r.species || "").toLowerCase().includes(s) || (r.district || "").toLowerCase().includes(s) || (r.location_name || "").toLowerCase().includes(s) || (r.planters?.full_name || "").toLowerCase().includes(s);
  });

  return (
    <OrgLayout>
      <header className="mb-6 flex justify-between items-end gap-4 flex-wrap">
        <div>
          <p className="text-emerald-700 text-xs uppercase tracking-widest">Field Logs</p>
          <h1 className="font-serif text-3xl text-slate-900">All planting records</h1>
        </div>
        <Input placeholder="Filter by species, site, planter…" value={q} onChange={e => setQ(e.target.value)} className="max-w-xs" />
      </header>

      {filtered.length === 0 ? (
        <Card><CardContent className="p-10 text-center text-muted-foreground"><Sprout className="w-10 h-10 mx-auto text-emerald-200 mb-2" />No plantings yet.</CardContent></Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(r => (
            <Card key={r.id}>
              {r.photo_url && <img src={r.photo_url} alt="" className="w-full h-44 object-cover rounded-t-lg" />}
              <CardContent className="p-4 space-y-1">
                <div className="font-semibold">{r.trees_planted} × {r.species}</div>
                <div className="text-xs text-muted-foreground">{new Date(r.planting_date).toLocaleString()}</div>
                <div className="text-sm flex items-center gap-1"><MapPin className="w-3 h-3 text-emerald-700" />{r.district || r.location_name || "—"}</div>
                <div className="text-xs text-muted-foreground">Planter: {r.planters?.full_name || "—"}</div>
                <a className="text-xs text-emerald-700 underline" target="_blank" rel="noreferrer" href={`https://maps.google.com/?q=${r.latitude},${r.longitude}`}>View on map ({Number(r.latitude).toFixed(5)}, {Number(r.longitude).toFixed(5)})</a>
                {r.notes && <p className="text-xs text-slate-600 mt-1 italic">{r.notes}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </OrgLayout>
  );
}
