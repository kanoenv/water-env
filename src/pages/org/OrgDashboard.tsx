import { useEffect, useMemo, useState } from "react";
import OrgLayout, { useOrgApp } from "@/components/org/OrgLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sprout, Package, Users, MapPin, TrendingUp } from "lucide-react";

type Dist = { id: string; species: string; quantity: number; distribution_date: string; batch_code: string | null };
type Log = { id: string; species: string; trees_planted: number; district: string | null; location_name: string | null; planting_date: string; latitude: number; longitude: number; photo_url: string | null };

export default function OrgDashboard() {
  const { app } = useOrgApp();
  const [dists, setDists] = useState<Dist[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [planters, setPlanters] = useState(0);

  useEffect(() => {
    if (!app) return;
    (async () => {
      const [{ data: d }, { data: l }, { count }] = await Promise.all([
        supabase.from("tree_seed_distributions").select("*").eq("application_id", app.id).order("distribution_date", { ascending: false }),
        supabase.from("tree_planting_logs").select("*").eq("application_id", app.id).order("planting_date", { ascending: false }),
        supabase.from("planters").select("id", { count: "exact", head: true }).eq("application_id", app.id),
      ]);
      setDists((d ?? []) as Dist[]);
      setLogs((l ?? []) as Log[]);
      setPlanters(count ?? 0);
    })();
  }, [app]);

  const totalSeeds = useMemo(() => dists.reduce((s, d) => s + (d.quantity || 0), 0), [dists]);
  const totalPlanted = useMemo(() => logs.reduce((s, l) => s + (l.trees_planted || 0), 0), [logs]);
  const pct = totalSeeds ? Math.min(100, Math.round((totalPlanted / totalSeeds) * 100)) : 0;

  const bySpecies = group(logs, l => l.species, l => l.trees_planted);
  const byDistrict = group(logs, l => l.district || l.location_name || "Unassigned", l => l.trees_planted);

  return (
    <OrgLayout>
      <header className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 p-6 text-white sm:p-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #FFC107 1px, transparent 0)', backgroundSize: '24px 24px' }}
        />
        <div className="relative">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300">Organisation Dashboard</span>
          <h1 className="mt-2 break-words font-serif text-2xl sm:text-3xl">{app?.organization_name}</h1>
          <p className="mt-1.5 text-xs text-emerald-100/70 sm:text-sm">
            10 Million Trees Planting Campaign · Kano State Ministry of Water Resources, Environment and Climate Change
          </p>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Kpi icon={Package} label="Seedlings Assigned" value={totalSeeds.toLocaleString()} tint="bg-emerald-50 text-emerald-700" />
        <Kpi icon={Sprout} label="Trees Planted" value={totalPlanted.toLocaleString()} tint="bg-amber-50 text-amber-700" />
        <Kpi icon={TrendingUp} label="Completion" value={`${pct}%`} tint="bg-sky-50 text-sky-700" />
        <Kpi icon={Users} label="Registered Planters" value={planters.toLocaleString()} tint="bg-purple-50 text-purple-700" />
      </div>

      <Card className="mb-6 border-slate-200">
        <CardHeader className="pb-3"><CardTitle className="text-base">Overall progress</CardTitle></CardHeader>
        <CardContent>
          <div className="mb-2 flex items-end justify-between">
            <span className="text-2xl font-bold text-emerald-900">{totalPlanted.toLocaleString()}<span className="ml-1.5 text-sm font-medium text-slate-500">planted</span></span>
            <span className="text-sm text-slate-500">of {totalSeeds.toLocaleString()} assigned</span>
          </div>
          <Progress value={pct} className="h-2.5" />
          <p className="mt-2 text-xs text-slate-400">{pct}% of your allocated seedlings have been logged in the tracker.</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <BreakdownCard title="By species" rows={bySpecies} total={totalPlanted} />
        <BreakdownCard title="By district / site" rows={byDistrict} total={totalPlanted} />
      </div>

      <Card>
        <CardHeader><CardTitle>Recent plantings</CardTitle></CardHeader>
        <CardContent>
          {logs.length === 0 ? <p className="text-sm text-muted-foreground">No plantings logged yet.</p> : (
            <div className="space-y-2">
              {logs.slice(0, 8).map(l => (
                <div key={l.id} className="flex items-center gap-3 p-2 rounded border bg-slate-50">
                  {l.photo_url ? <img src={l.photo_url} alt="" className="w-12 h-12 object-cover rounded" /> : <div className="w-12 h-12 rounded bg-emerald-100 flex items-center justify-center"><Sprout className="w-5 h-5 text-emerald-700"/></div>}
                  <div className="flex-1 text-sm">
                    <div className="font-semibold">{l.trees_planted} × {l.species}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{l.district || l.location_name || "—"} · {new Date(l.planting_date).toLocaleDateString()}</div>
                  </div>
                  <a className="text-xs text-emerald-700 underline" href={`https://maps.google.com/?q=${l.latitude},${l.longitude}`} target="_blank" rel="noreferrer">Map</a>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </OrgLayout>
  );
}

function Kpi({ icon: Icon, label, value, tint }: any) {
  return (
    <Card><CardContent className="p-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${tint}`}><Icon className="w-5 h-5"/></div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent></Card>
  );
}

function group<T>(arr: T[], keyFn: (x: T) => string, valFn: (x: T) => number) {
  const m = new Map<string, number>();
  arr.forEach(x => m.set(keyFn(x), (m.get(keyFn(x)) || 0) + (valFn(x) || 0)));
  return Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
}

function BreakdownCard({ title, rows, total }: { title: string; rows: [string, number][]; total: number }) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">{title}</CardTitle></CardHeader>
      <CardContent>
        {rows.length === 0 ? <p className="text-sm text-muted-foreground">No data yet.</p> : (
          <div className="space-y-3">
            {rows.map(([k, v]) => (
              <div key={k}>
                <div className="flex justify-between text-sm"><span>{k}</span><span className="font-semibold">{v.toLocaleString()}</span></div>
                <Progress value={total ? (v / total) * 100 : 0} className="h-2 mt-1" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
