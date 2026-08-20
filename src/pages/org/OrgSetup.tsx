import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Building2, Mail, ShieldCheck, ArrowRight, KeyRound } from "lucide-react";

type Org = {
  organization_name: string;
  organization_type: string;
  contact_name: string;
  contact_phone: string | null;
  campaign: string;
  status: string;
  seedlings_requested: number;
  locations: string;
  has_account: boolean;
};

export default function OrgSetup() {
  const [mode, setMode] = useState<"email" | "review" | "password" | "tokenReady">("email");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState<Org | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();
  const nav = useNavigate();

  // Only switch to token mode if the user arrived from an email recovery/invite link
  // (URL contains the supabase auth hash). Otherwise always start at the email lookup
  // so the org can fetch their info and set a password.
  useEffect(() => {
    const hash = window.location.hash || "";
    const hasRecoveryToken = hash.includes("access_token") && (hash.includes("type=recovery") || hash.includes("type=invite") || hash.includes("type=signup"));
    if (!hasRecoveryToken) return;
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setMode("tokenReady");
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const lookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("org-self-setup", { body: { email } });
      if (error) throw error;
      if (!data?.ok) throw new Error(data?.error || "Lookup failed");
      setOrg(data.organization);
      setMode("review");
    } catch (err: any) {
      toast({ title: "Cannot find approved application", description: err.message || String(err), variant: "destructive" });
    } finally { setBusy(false); }
  };

  const setupPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return toast({ title: "Password too short (min 8)", variant: "destructive" });
    if (password !== confirm) return toast({ title: "Passwords do not match", variant: "destructive" });
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("org-self-setup", { body: { email, password, confirm: true } });
      if (error) throw error;
      if (!data?.ok) throw new Error(data?.error || "Setup failed");
      toast({ title: "Account ready", description: "Signing you in…" });
      const { error: sErr } = await supabase.auth.signInWithPassword({ email, password });
      if (sErr) throw sErr;
      nav("/org/dashboard");
    } catch (err: any) {
      toast({ title: "Setup failed", description: err.message || String(err), variant: "destructive" });
    } finally { setBusy(false); }
  };

  const setTokenPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return toast({ title: "Password too short", variant: "destructive" });
    if (password !== confirm) return toast({ title: "Passwords do not match", variant: "destructive" });
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    toast({ title: "Password set" });
    nav("/org/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-emerald-200">
        <CardHeader className="text-center border-b bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="mx-auto w-16 h-16 rounded-full bg-white border-2 border-emerald-600 flex items-center justify-center mb-2 overflow-hidden">
            <img src="/kano-ministry-seal.png" alt="Kano State Seal" className="w-full h-full object-cover" />
          </div>
          <CardTitle className="text-2xl text-emerald-900">Organization Portal Setup</CardTitle>
          <CardDescription>10 Million Trees Planting Campaign · 2026</CardDescription>
        </CardHeader>

        <CardContent className="p-8">
          {mode === "email" && (
            <form onSubmit={lookup} className="space-y-5">
              <div className="text-sm text-muted-foreground text-center">
                Enter the email address you used on your approved application to retrieve your organisation profile.
              </div>
              <div>
                <Label className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Application Email</Label>
                <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="organization@example.com" className="mt-1.5" />
              </div>
              <Button type="submit" disabled={busy} className="w-full bg-emerald-700 hover:bg-emerald-800 h-11">
                {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : (<>Continue <ArrowRight className="w-4 h-4" /></>)}
              </Button>
              <p className="text-xs text-center text-muted-foreground pt-3 border-t">
                Already signed in via email invite? It will load automatically.
              </p>
            </form>
          )}

          {mode === "review" && org && (
            <div className="space-y-5">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-5">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-emerald-700 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-wide text-emerald-700 font-semibold">Verified Organisation</div>
                    <div className="text-xl font-bold text-emerald-900 mt-0.5">{org.organization_name}</div>
                    <div className="text-sm text-muted-foreground">{org.organization_type}</div>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-emerald-600 text-white text-[10px] uppercase tracking-wider font-semibold">{org.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                  <Info label="Contact" value={org.contact_name} />
                  <Info label="Phone" value={org.contact_phone || '—'} />
                  <Info label="Seedlings" value={org.seedlings_requested?.toLocaleString()} />
                  <Info label="Campaign" value="10M · 2026" />
                  <div className="col-span-2"><Info label="Locations" value={org.locations} /></div>
                </div>
                {org.has_account && (
                  <div className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded p-2">
                    An account already exists for this email. Setting a password will reset it.
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => { setOrg(null); setMode("email"); }} className="flex-1">Use different email</Button>
                <Button onClick={() => setMode("password")} className="flex-1 bg-emerald-700 hover:bg-emerald-800">
                  This is correct <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {mode === "password" && (
            <form onSubmit={setupPassword} className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-emerald-800 bg-emerald-50 p-3 rounded-md border border-emerald-200">
                <ShieldCheck className="w-4 h-4" /> Create a secure password for <strong className="ml-1">{email}</strong>
              </div>
              <div>
                <Label className="flex items-center gap-1.5"><KeyRound className="w-3.5 h-3.5" /> New Password</Label>
                <Input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" placeholder="At least 8 characters" />
              </div>
              <div>
                <Label>Confirm Password</Label>
                <Input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} className="mt-1.5" />
              </div>
              <div className="flex gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setMode("review")} className="flex-1">Back</Button>
                <Button type="submit" disabled={busy} className="flex-1 bg-emerald-700 hover:bg-emerald-800">
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create account & sign in"}
                </Button>
              </div>
            </form>
          )}

          {mode === "tokenReady" && (
            <form onSubmit={setTokenPassword} className="space-y-4">
              <div className="text-sm text-emerald-800 bg-emerald-50 p-3 rounded-md border border-emerald-200">
                Welcome — set your portal password to continue.
              </div>
              <div><Label>New password</Label><Input type="password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)} className="mt-1.5" /></div>
              <div><Label>Confirm</Label><Input type="password" required value={confirm} onChange={e => setConfirm(e.target.value)} className="mt-1.5" /></div>
              <Button type="submit" disabled={busy} className="w-full bg-emerald-700 hover:bg-emerald-800">
                {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save & enter portal"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

const Info = ({ label, value }: { label: string; value: any }) => (
  <div>
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</div>
    <div className="text-sm font-medium text-foreground">{value ?? '—'}</div>
  </div>
);
