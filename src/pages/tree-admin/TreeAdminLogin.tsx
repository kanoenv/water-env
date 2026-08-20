// @ts-nocheck
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Loader2, LogIn, Shield } from "lucide-react";
import PortalAuthShell from "@/components/auth/PortalAuthShell";

export default function TreeAdminLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (error || !data.user) throw new Error(error?.message || "Invalid email or password");

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id);
      if (!roles?.some((r: any) => r.role === "tree_admin")) {
        await supabase.auth.signOut();
        throw new Error("This account is not a 10 Million Trees campaign officer.");
      }
      toast({ title: "Welcome back", description: "10 Million Trees campaign console" });
      navigate("/tree-admin");
    } catch (err: any) {
      toast({ title: "Login failed", description: err.message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <PortalAuthShell
      eyebrow="Campaign Console"
      headline="Allocate. Issue. Verify."
      intro="The campaign officer console for the 10 Million Trees Planting Campaign — assign seedling allocations to approved organisations and issue official collection slips."
      highlights={[
        "Role-restricted government access",
        "Seedling allocation and slip issuance",
        "Every action recorded in the audit trail",
      ]}
    >
      <div className="mb-8 space-y-2">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
          <Shield className="h-3.5 w-3.5" /> Authorised officers only
        </span>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900">Campaign officer sign-in</h2>
        <p className="text-sm text-slate-500">Seedling assignment and slip issuance console.</p>
      </div>

      <form onSubmit={submit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="tae" className="text-sm font-medium">Email address</Label>
          <Input id="tae" type="email" value={email} required autoComplete="email"
            onChange={(e) => setEmail(e.target.value)} placeholder="officer@environment.kn.gov.ng"
            className="h-12 border-slate-200 focus-visible:ring-emerald-600/25" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tap" className="text-sm font-medium">Password</Label>
          <div className="relative">
            <Input id="tap" type={show ? "text" : "password"} value={password} required autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
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

        <p className="pt-1 text-center text-[11px] uppercase tracking-widest text-slate-400">
          Restricted government access
        </p>
      </form>
    </PortalAuthShell>
  );
}
