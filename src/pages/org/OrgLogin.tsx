import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import PortalAuthShell from "@/components/auth/PortalAuthShell";

export default function OrgLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(), password,
    });
    setBusy(false);
    if (error) return toast({ title: "Login failed", description: error.message, variant: "destructive" });
    nav("/org/dashboard");
  };

  return (
    <PortalAuthShell
      eyebrow="Organisation Portal"
      headline="Plant. Record. Prove."
      intro="Approved organisations manage seedling allocations, enrol field planters and log every tree planted with GPS coordinates and verified field photographs."
      highlights={[
        "Live seedling allocation ledger",
        "GPS-verified planting records",
        "Quarterly survival reporting",
      ]}
    >
      <div className="mb-8 space-y-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">Approved organisations</span>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900">Sign in to your portal</h2>
        <p className="text-sm text-slate-500">Use the email address on your approved campaign application.</p>
      </div>

      <form onSubmit={submit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="org-email" className="text-sm font-medium">Email address</Label>
          <Input id="org-email" type="email" required autoComplete="email" value={email}
            onChange={e => setEmail(e.target.value)} placeholder="organisation@example.com"
            className="h-12 border-slate-200 focus-visible:ring-emerald-600/25" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="org-pass" className="text-sm font-medium">Password</Label>
          <div className="relative">
            <Input id="org-pass" type={show ? "text" : "password"} required autoComplete="current-password"
              value={password} onChange={e => setPassword(e.target.value)}
              className="h-12 pr-12 border-slate-200 focus-visible:ring-emerald-600/25" />
            <button type="button" onClick={() => setShow(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button type="submit" disabled={busy || !email || !password}
          className="h-12 w-full bg-emerald-800 text-base font-semibold tracking-wide hover:bg-emerald-900">
          {busy ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Signing in…</> : <><LogIn className="mr-2 h-5 w-5" /> Sign in securely</>}
        </Button>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
          First time here? Check your email for the Ministry invitation, then{" "}
          <Link to="/org/setup" className="font-medium text-emerald-700 underline underline-offset-2">set your password</Link>.
          Field planters sign in separately at{" "}
          <Link to="/planter" className="font-medium text-emerald-700 underline underline-offset-2">the planter app</Link>.
        </div>
      </form>
    </PortalAuthShell>
  );
}
