// Public endpoint: lets an approved org self-create their login.
// Step 1: lookup — POST { email } → returns masked org info if an approved application exists.
// Step 2: setup  — POST { email, password, confirm: true } → creates/updates the auth user
//                  with that password, assigns 'org' role, links applicant_user_id.
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const body = await req.json().catch(() => ({}));
    const email = String(body.email || "").trim().toLowerCase();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ error: "Valid email required" }, 400);
    }

    const { data: app, error: aErr } = await admin
      .from("tree_campaign_applications")
      .select("id, contact_email, contact_name, contact_phone, organization_name, organization_type, status, applicant_user_id, campaign, seedlings_requested, locations")
      .ilike("contact_email", email)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (aErr) return json({ error: aErr.message }, 500);
    if (!app) return json({ error: "No application found for this email" }, 404);
    if (!["approved", "seeds_distributed", "under_review", "completed"].includes(app.status)) {
      return json({ error: `Application is ${app.status}. It must be approved before login can be created.` }, 403);
    }

    // Lookup mode
    if (!body.password) {
      return json({
        ok: true,
        organization: {
          id: app.id,
          organization_name: app.organization_name,
          organization_type: app.organization_type,
          contact_name: app.contact_name,
          contact_phone: maskPhone(app.contact_phone),
          campaign: app.campaign,
          status: app.status,
          seedlings_requested: app.seedlings_requested,
          locations: app.locations,
          has_account: !!app.applicant_user_id,
        },
      });
    }

    // Setup mode
    const password = String(body.password);
    if (password.length < 8) return json({ error: "Password must be at least 8 characters" }, 400);

    let userId = app.applicant_user_id as string | null;
    if (!userId) {
      const { data: list } = await admin.auth.admin.listUsers();
      const existing = list?.users.find((u) => u.email?.toLowerCase() === email);
      if (existing) userId = existing.id;
    }

    if (!userId) {
      const { data: created, error: cErr } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { organization_name: app.organization_name, role: "org" },
      });
      if (cErr) return json({ error: cErr.message }, 400);
      userId = created.user?.id ?? null;
    } else {
      const { error: uErr } = await admin.auth.admin.updateUserById(userId, {
        password, email_confirm: true,
      });
      if (uErr) return json({ error: uErr.message }, 400);
    }

    if (userId) {
      await admin.from("user_roles").upsert({ user_id: userId, role: "org" }, { onConflict: "user_id,role" });
      if (app.applicant_user_id !== userId) {
        await admin.from("tree_campaign_applications").update({ applicant_user_id: userId }).eq("id", app.id);
      }
    }

    return json({ ok: true, message: "Account ready. You can sign in now.", email });
  } catch (e) {
    return json({ error: String((e as Error)?.message || e) }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status, headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function maskPhone(p?: string | null) {
  if (!p) return null;
  const s = String(p).replace(/\s+/g, "");
  if (s.length < 4) return "•".repeat(s.length);
  return s.slice(0, 3) + "•".repeat(Math.max(0, s.length - 5)) + s.slice(-2);
}
