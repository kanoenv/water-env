import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPlanterSession } from "./PlanterLogin";
import { ArrowLeft, MapPin, Camera, History } from "lucide-react";

export default function PlanterHistory() {
  const session = getPlanterSession();
  const nav = useNavigate();
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    if (!session) { nav("/planter"); return; }
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/planter-history`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
        body: JSON.stringify({ token: session.token }),
      });
      const j = await res.json();
      if (res.ok) setRows(j.logs || []);
    })();
  }, [nav, session]);

  return (
    <div className="min-h-screen bg-slate-100 pb-24">
      <header className="bg-emerald-800 text-white p-4 flex items-center gap-3 sticky top-0 z-10 shadow">
        <Link to="/planter/log"><Button variant="ghost" size="sm" className="text-white hover:bg-emerald-700"><ArrowLeft className="w-4 h-4" /></Button></Link>
        <div className="font-serif">My planting history</div>
      </header>
      <div className="p-4 max-w-md mx-auto space-y-3">
        {rows.length === 0 && <p className="text-center text-muted-foreground py-10">No plantings yet.</p>}
        {rows.map(r => (
          <Card key={r.id}>
            {r.photo_url && <img src={r.photo_url} alt="" className="w-full h-40 object-cover rounded-t-lg" />}
            <CardContent className="p-3 text-sm">
              <div className="font-semibold">{r.trees_planted} × {r.species}</div>
              <div className="text-xs text-muted-foreground">{new Date(r.planting_date).toLocaleDateString()}</div>
              <div className="text-xs flex items-center gap-1 mt-1"><MapPin className="w-3 h-3 text-emerald-700" />{r.district || r.location_name || `${Number(r.latitude).toFixed(4)}, ${Number(r.longitude).toFixed(4)}`}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <nav className="fixed bottom-0 inset-x-0 z-20 bg-white border-t shadow-lg flex">
        <Link to="/planter/log" className="flex-1 flex flex-col items-center gap-0.5 py-2 text-xs text-slate-500">
          <Camera className="w-5 h-5" /> Log planting
        </Link>
        <Link to="/planter/history" className="flex-1 flex flex-col items-center gap-0.5 py-2 text-xs text-emerald-700 font-semibold">
          <History className="w-5 h-5" /> My history
        </Link>
      </nav>
    </div>
  );
}
