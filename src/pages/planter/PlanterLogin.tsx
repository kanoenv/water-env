import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogIn, Smartphone } from "lucide-react";
import PortalAuthShell from "@/components/auth/PortalAuthShell";

const KEY = "planter_session";
export const getPlanterSession = () => {
  try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; }
};
export const clearPlanterSession = () => localStorage.removeItem(KEY);

export default function PlanterLogin() {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();
  const nav = useNavigate();

  useEffect(() => { if (getPlanterSession()) nav("/planter/log"); }, [nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/planter-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
        body: JSON.stringify({ phone, pin }),
      });
      const j = await res.json();
      if (!res.ok) return toast({ title: "Login failed", description: j.error, variant: "destructive" });
      localStorage.setItem(KEY, JSON.stringify({ token: j.token, planter: j.planter }));
      nav("/planter/log");
    } finally {
      setBusy(false);
    }
  };

  return (
    <PortalAuthShell
      eyebrow="Field Planter App"
      headline="Every tree counted."
      intro="Registered field planters log plantings directly from the field — species, quantity, GPS coordinates and a photograph, submitted straight to the Ministry tracker."
      highlights={[
        "Works on any mobile phone browser",
        "Automatic GPS tagging of each site",
        "Instant sync with your organisation",
      ]}
    >
      <div className="mb-8 space-y-2">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
          <Smartphone className="h-3.5 w-3.5" /> Registered planters
        </span>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900">Planter sign-in</h2>
        <p className="text-sm text-slate-500">Enter the phone number and PIN issued by your organisation coordinator.</p>
      </div>

      <form onSubmit={submit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="pl-phone" className="text-sm font-medium">Phone number</Label>
          <Input id="pl-phone" type="tel" inputMode="tel" required value={phone}
            onChange={e => setPhone(e.target.value)} placeholder="0803 000 0000"
            className="h-12 border-slate-200 focus-visible:ring-emerald-600/25" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pl-pin" className="text-sm font-medium">PIN</Label>
          <Input id="pl-pin" type="password" inputMode="numeric" required maxLength={6} value={pin}
            onChange={e => setPin(e.target.value)} placeholder="••••"
            className="h-12 tracking-[0.4em] border-slate-200 focus-visible:ring-emerald-600/25" />
        </div>

        <Button type="submit" disabled={busy || !phone || !pin}
          className="h-12 w-full bg-emerald-800 text-base font-semibold tracking-wide hover:bg-emerald-900">
          {busy ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Signing in…</> : <><LogIn className="mr-2 h-5 w-5" /> Sign in</>}
        </Button>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
          No credentials yet? Your organisation coordinator registers planters from the Organisation Portal and issues your PIN.
        </div>
      </form>
    </PortalAuthShell>
  );
}
