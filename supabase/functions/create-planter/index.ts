// Org endpoint: create a planter with hashed PIN.
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

async function sha256(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization") || "";
    if (!authHeader.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const token = authHeader.replace("Bearer ", "");
    const { data: claims, error } = await supabase.auth.getClaims(token);
    if (error || !claims?.claims) return json({ error: "Unauthorized" }, 401);

    const body = await req.json();
    const { application_id, full_name, phone, pin, assigned_site, assigned_district, id } = body;
    if (!application_id || !full_name || !phone || (!id && !pin)) {
      return json({ error: "Missing fields" }, 400);
    }

    // Validate org ownership via RPC-equivalent
    const { data: app } = await supabase
      .from("tree_campaign_applications")
      .select("id, applicant_user_id")
      .eq("id", application_id)
      .single();
    if (!app || app.applicant_user_id !== claims.claims.sub) {
      // Admins also allowed
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", claims.claims.sub);
      if (!roles?.some((r: any) => r.role === "admin")) return json({ error: "Forbidden" }, 403);
    }

    const cleanPhone = String(phone).replace(/\D/g, "");
    const update: any = { full_name, phone: cleanPhone, assigned_site, assigned_district };
    if (pin) update.pin_hash = await sha256(`${cleanPhone}:${pin}`);

    if (id) {
      const { error: uErr } = await supabase.from("planters").update(update).eq("id", id);
      if (uErr) return json({ error: uErr.message }, 400);
      return json({ ok: true, id });
    } else {
      update.application_id = application_id;
      const { data, error: iErr } = await supabase.from("planters").insert(update).select("id").single();
      if (iErr) return json({ error: iErr.message }, 400);
      return json({ ok: true, id: data.id });
    }
  } catch (e) {
    return json({ error: String(e?.message || e) }, 500);
  }
});

function json(b: unknown, s = 200) {
  return new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
