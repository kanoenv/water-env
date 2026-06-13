import { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import SiteHeader from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/Footer";
import applyBanner from "@/assets/apply-banner.jpg";
import emblem from "@/assets/brand-emblem.png";
import {
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Sprout,
  FileText,
  ShieldCheck,
  Leaf,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const schema = z.object({
  applicant_type: z.enum(["individual", "organization"]),
  full_name: z.string().trim().min(2, "Full name is required").max(120),
  org_name: z.string().trim().max(150).optional(),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  lga: z.string().trim().min(2, "LGA is required").max(80),
  address: z.string().trim().min(5, "Address is required").max(300),
  planting_site: z.string().trim().min(5, "Describe the planting site").max(300),
  site_size_hectares: z.coerce.number().min(0).max(100000).optional(),
  preferred_species: z.string().trim().max(200).optional(),
  seeds_requested: z.coerce.number().int().min(1, "Request at least 1 seed").max(1000000),
  purpose: z.string().trim().min(10, "Tell us your planting plan (min 10 chars)").max(1000),
});

export default function Apply() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [type, setType] = useState<"individual" | "organization">("individual");
  const [busy, setBusy] = useState(false);

  // Admins shouldn't apply for seeds — redirect to admin console
  if (!loading && isAdmin) return <Navigate to="/admin" replace />;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = schema.safeParse({ ...fd, applicant_type: type });
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setBusy(true);
    const d = parsed.data;

    let organization_id: string | null = null;
    if (d.applicant_type === "organization" && d.org_name) {
      const { data: org, error: oerr } = await supabase.from("organizations").insert({
        name: d.org_name, org_type: "applicant", contact_email: d.email, contact_phone: d.phone,
        address: d.address, lga: d.lga, owner_id: user?.id ?? null,
      }).select("id").single();
      if (oerr) { toast.error(oerr.message); setBusy(false); return; }
      organization_id = org.id;
    }

    const { error } = await supabase.from("applications").insert({
      applicant_type: d.applicant_type,
      applicant_user_id: user?.id ?? null,
      organization_id,
      full_name: d.full_name,
      email: d.email,
      phone: d.phone,
      lga: d.lga,
      address: d.address,
      planting_site: d.planting_site,
      site_size_hectares: d.site_size_hectares ?? null,
      preferred_species: d.preferred_species ?? null,
      seeds_requested: d.seeds_requested,
      purpose: d.purpose,
    });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Application submitted! Our team will review and contact you soon.");
    navigate(user ? "/dashboard" : "/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-secondary/30 to-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-accent/20">
        <img
          src={applyBanner}
          alt="Tree seedlings prepared for distribution"
          className="absolute inset-0 h-full w-full object-cover"
          width={1536}
          height={768}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(152_75%_10%/0.95)] via-[hsl(152_70%_15%/0.85)] to-[hsl(152_55%_22%/0.55)]" />
        <div className="relative container mx-auto px-4 py-14 md:py-20 text-white">
          <div className="flex items-start gap-6 max-w-3xl">
            <img src={emblem} alt="Kano State Government official seal" className="hidden sm:block h-20 w-20 rounded-full bg-white/95 p-1 shadow-gold ring-2 ring-accent/60" />
            <div>
              <span className="inline-flex items-center gap-2 rounded-sm border border-accent/40 bg-white/10 backdrop-blur px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                <Leaf className="h-3 w-3" /> 10 Million Seeds Campaign · 2026
              </span>
              <h1 className="mt-4 font-serif text-4xl md:text-5xl font-bold leading-[1.05]">
                Seed Application Form
              </h1>
              <div className="mt-2 h-px w-24 bg-accent" />
              <p className="mt-4 text-white/85 max-w-xl text-[15px] leading-relaxed">
                Apply to receive free tree seedlings from the Kano State Ministry of Water Resources, Environment and Climate Change
                & Climate Change. All fields marked with <span className="text-accent">*</span> are required.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/90 font-display tracking-wide">
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-accent" /> Free of charge</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-accent" /> Reviewed within 7 days</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-accent" /> Open to all 44 LGAs</span>
              </div>
              <div className="mt-5 hidden md:flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-white/70">
                <span>UN SDG 13 · 15</span>
                <span className="opacity-50">|</span>
                <span>Great Green Wall</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 container mx-auto px-4 py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* FORM */}
          <Card className="shadow-elegant border-primary/10">
            <CardContent className="p-6 md:p-10">
              <form onSubmit={onSubmit} className="space-y-10">
                {/* Section: Applicant type */}
                <Section
                  step="01"
                  icon={ShieldCheck}
                  title="Applicant type"
                  description="Tell us whether you are applying as an individual or on behalf of an organization."
                >
                  <RadioGroup
                    value={type}
                    onValueChange={(v) => setType(v as any)}
                    className="grid gap-3 sm:grid-cols-2"
                  >
                    <TypeOption value="individual" current={type} icon={User} label="Individual" hint="Citizen, farmer or household" />
                    <TypeOption value="organization" current={type} icon={Building2} label="Organization" hint="School, NGO, company or institution" />
                  </RadioGroup>

                  {type === "organization" && (
                    <div className="mt-5">
                      <Label htmlFor="org_name">Organization name <span className="text-destructive">*</span></Label>
                      <Input id="org_name" name="org_name" required maxLength={150} placeholder="e.g. Greenfields Academy" className="mt-1.5" />
                    </div>
                  )}
                </Section>

                {/* Section: Contact details */}
                <Section
                  step="02"
                  icon={User}
                  title="Contact details"
                  description="The person we will reach out to about this application."
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Full name (contact person)" required>
                      <Input name="full_name" required maxLength={120} placeholder="e.g. Aisha Yusuf" />
                    </Field>
                    <Field label="Email address" required icon={Mail}>
                      <Input name="email" type="email" required placeholder="you@example.com" />
                    </Field>
                    <Field label="Phone number" required icon={Phone}>
                      <Input name="phone" required maxLength={20} placeholder="+234 ..." />
                    </Field>
                    <Field label="Local Government Area" required icon={MapPin}>
                      <Input name="lga" required maxLength={80} placeholder="e.g. Tarauni" />
                    </Field>
                  </div>

                  <div className="mt-4">
                    <Field label="Address" required>
                      <Input name="address" required maxLength={300} placeholder="Street, ward, city" />
                    </Field>
                  </div>
                </Section>

                {/* Section: Planting site */}
                <Section
                  step="03"
                  icon={MapPin}
                  title="Planting site"
                  description="Where the trees will be planted and how much land is available."
                >
                  <Field label="Planting site description" required>
                    <Input
                      name="planting_site"
                      required
                      maxLength={300}
                      placeholder="e.g. School compound at Tarauni Primary"
                    />
                  </Field>
                  <div className="grid gap-4 md:grid-cols-2 mt-4">
                    <Field label="Site size (hectares)" hint="Optional. 1 hectare ≈ 2.47 acres.">
                      <Input name="site_size_hectares" type="number" step="0.01" min="0" placeholder="e.g. 0.5" />
                    </Field>
                    <Field label="Preferred species" hint="Optional. We may substitute based on availability.">
                      <Input name="preferred_species" maxLength={200} placeholder="Neem, Mahogany, Mango..." />
                    </Field>
                  </div>
                </Section>

                {/* Section: Request */}
                <Section
                  step="04"
                  icon={Sprout}
                  title="Seed request"
                  description="How many seeds do you need and what is your planting plan?"
                >
                  <Field label="Seeds requested" required hint="Enter a realistic quantity for your site size.">
                    <Input name="seeds_requested" type="number" min="1" required placeholder="e.g. 200" />
                  </Field>

                  <div className="mt-4">
                    <Field label="Purpose / planting plan" required>
                      <Textarea
                        name="purpose"
                        required
                        minLength={10}
                        maxLength={1000}
                        rows={5}
                        placeholder="Briefly describe why you are planting, who will care for the trees, and how progress will be tracked."
                      />
                    </Field>
                  </div>
                </Section>

                <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    By submitting, you confirm the information above is accurate and consent to be
                    contacted by the Ministry regarding this application.
                  </p>
                  <Button
                    type="submit"
                    disabled={busy}
                    size="lg"
                    className="hero-gradient text-primary-foreground shadow-elegant"
                  >
                    {busy ? "Submitting…" : "Submit application"}
                    {!busy && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* SIDEBAR */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Card className="border-primary/10 shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-serif text-lg font-bold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" /> What happens next
                </h3>
                <ol className="mt-4 space-y-4 text-sm">
                  {[
                    { t: "Submit form", d: "We confirm receipt by email immediately." },
                    { t: "Ministry review", d: "Our team reviews within 7 working days." },
                    { t: "Seed assignment", d: "Approved applicants are scheduled for pickup." },
                    { t: "Plant & report", d: "Track progress from your dashboard." },
                  ].map((s, i) => (
                    <li key={s.t} className="flex gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                        {i + 1}
                      </span>
                      <div>
                        <div className="font-semibold">{s.t}</div>
                        <div className="text-muted-foreground">{s.d}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card className="border-primary/10 bg-gradient-to-br from-primary/8 to-accent/10 shadow-soft">
              <CardContent className="p-6">
                <Leaf className="h-6 w-6 text-primary" />
                <h3 className="mt-2 font-serif font-bold">Need help?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Contact the Ministry directly if you have questions before applying.
                </p>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <Link to="/">Back to home</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

/* ---------- Sub-components ---------- */

function Section({
  step, icon: Icon, title, description, children,
}: { step: string; icon: any; title: string; description: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-start gap-4 border-b pb-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-primary/70">
            Step {step}
          </div>
          <h2 className="font-serif text-xl font-bold leading-tight">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="pt-5">{children}</div>
    </section>
  );
}

function Field({
  label, required, hint, icon: Icon, children,
}: { label: string; required?: boolean; hint?: string; icon?: any; children: React.ReactNode }) {
  return (
    <div>
      <Label className="flex items-center gap-1.5">
        {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground" />}
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="mt-1.5">{children}</div>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function TypeOption({
  value, current, icon: Icon, label, hint,
}: { value: string; current: string; icon: any; label: string; hint: string }) {
  const active = value === current;
  return (
    <Label
      htmlFor={value}
      className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition ${
        active ? "border-primary bg-primary/5 shadow-soft" : "border-border hover:border-primary/40 hover:bg-secondary/50"
      }`}
    >
      <RadioGroupItem value={value} id={value} className="mt-0.5" />
      <div className="flex-1">
        <div className="flex items-center gap-2 font-semibold">
          <Icon className="h-4 w-4 text-primary" /> {label}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">{hint}</div>
      </div>
    </Label>
  );
}
