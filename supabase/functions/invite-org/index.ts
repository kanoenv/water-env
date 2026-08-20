// Admin endpoint: invite an approved org by email. Creates auth user (or finds existing),
// sets applicant_user_id on the application, sends magic invite link.
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization") || "";
    if (!authHeader.startsWith("Bearer ")) {
      return json({ error: "Unauthorized" }, 401);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const token = authHeader.replace("Bearer ", "");
    const { data: claims, error: cErr } = await supabase.auth.getClaims(token);
    if (cErr || !claims?.claims) return json({ error: "Unauthorized" }, 401);

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // verify admin role
    const { data: roles } = await admin.from("user_roles").select("role").eq("user_id", claims.claims.sub);
    if (!roles?.some((r: any) => r.role === "admin")) {
      return json({ error: "Forbidden" }, 403);
    }

    const { application_id, redirect_to, mode, password } = await req.json();
    if (!application_id) return json({ error: "application_id required" }, 400);

    const { data: app, error: aErr } = await admin
      .from("tree_campaign_applications")
      .select("id, contact_email, organization_name, status, applicant_user_id")
      .eq("id", application_id)
      .single();
    if (aErr || !app) return json({ error: "Application not found" }, 404);
    if (!["approved", "seeds_distributed", "under_review", "completed"].includes(app.status)) {
      return json({ error: "Application must be approved first" }, 400);
    }

    const email = (app.contact_email || "").trim().toLowerCase();
    if (!email) return json({ error: "Application has no contact email" }, 400);

    // Find existing user
    let userId = app.applicant_user_id as string | null;
    if (!userId) {
      const { data: list } = await admin.auth.admin.listUsers();
      const existing = list?.users.find((u) => u.email?.toLowerCase() === email);
      if (existing) userId = existing.id;
    }

    // Direct-password mode: create/update user with password — no email sent
    if (mode === "direct") {
      const newPwd = password && String(password).length >= 8
        ? String(password)
        : generatePassword();
      if (!userId) {
        const { data: created, error: cErr } = await admin.auth.admin.createUser({
          email,
          password: newPwd,
          email_confirm: true,
          user_metadata: { organization_name: app.organization_name, role: "org" },
        });
        if (cErr) return json({ error: cErr.message }, 400);
        userId = created.user?.id ?? null;
      } else {
        const { error: uErr } = await admin.auth.admin.updateUserById(userId, {
          password: newPwd, email_confirm: true,
        });
        if (uErr) return json({ error: uErr.message }, 400);
      }
      if (userId) {
        await admin.from("user_roles").upsert({ user_id: userId, role: "org" }, { onConflict: "user_id,role" });
        if (app.applicant_user_id !== userId) {
          await admin.from("tree_campaign_applications").update({ applicant_user_id: userId }).eq("id", application_id);
        }
      }
      return json({ ok: true, mode: "direct", user_id: userId, email, password: newPwd, login_url: "https://environment.kn.gov.ng/org/login" });
    }

    // Email-link mode (default): invite or recovery
    if (!userId) {
      const { data: invited, error: iErr } = await admin.auth.admin.inviteUserByEmail(email, {
        redirectTo: redirect_to,
        data: { organization_name: app.organization_name, role: "org" },
      });
      if (iErr) return json({ error: iErr.message }, 400);
      userId = invited.user?.id ?? null;
    } else {
      await admin.auth.admin.generateLink({
        type: "recovery", email, options: { redirectTo: redirect_to },
      });
    }

    if (userId && app.applicant_user_id !== userId) {
      await admin.from("tree_campaign_applications")
        .update({ applicant_user_id: userId })
        .eq("id", application_id);
    }
    if (userId) {
      await admin.from("user_roles").upsert({ user_id: userId, role: "org" }, { onConflict: "user_id,role" });
    }

    return json({ ok: true, mode: "link", user_id: userId, email });
  } catch (e) {
    return json({ error: String(e?.message || e) }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status, headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function generatePassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  let p = "";
  const bytes = new Uint8Array(14);
  crypto.getRandomValues(bytes);
  for (const b of bytes) p += chars[b % chars.length];
  return p + "!2";
}
