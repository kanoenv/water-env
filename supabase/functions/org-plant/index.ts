// Org endpoint: authenticated org user logs a planting (photo + GPS).
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization") || "";
    if (!authHeader.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);

    const userClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: claims, error: cErr } = await userClient.auth.getClaims(authHeader.replace("Bearer ", ""));
    if (cErr || !claims?.claims) return json({ error: "Unauthorized" }, 401);
    const userId = claims.claims.sub as string;

    const body = await req.json();
    const { species, trees_planted, latitude, longitude, location_name, district, notes, photo_base64, photo_mime } = body;
    if (!species || !trees_planted || latitude == null || longitude == null) {
      return json({ error: "species, trees_planted, latitude, longitude required" }, 400);
    }

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Find this user's approved org application
    const { data: app, error: aErr } = await admin
      .from("tree_campaign_applications")
      .select("id, organization_name, status")
      .eq("applicant_user_id", userId)
      .maybeSingle();
    if (aErr || !app) return json({ error: "No org application linked to this account" }, 403);

    let photo_url: string | null = null;
    if (photo_base64) {
      const bin = Uint8Array.from(atob(photo_base64), (c) => c.charCodeAt(0));
      const ext = (photo_mime || "image/jpeg").split("/")[1] || "jpg";
      const path = `${app.id}/org/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await admin.storage.from("planting-photos").upload(path, bin, {
        contentType: photo_mime || "image/jpeg", upsert: false,
      });
      if (upErr) return json({ error: "Upload failed: " + upErr.message }, 400);
      const { data: signed } = await admin.storage.from("planting-photos").createSignedUrl(path, 60 * 60 * 24 * 365 * 5);
      photo_url = signed?.signedUrl || path;
    }

    const { data, error } = await admin.from("tree_planting_logs").insert({
      application_id: app.id,
      planter_id: null,
      species, trees_planted: Number(trees_planted),
      planting_date: new Date().toISOString().slice(0, 10),
      latitude, longitude,
      location_name: location_name || null,
      district: district || null,
      notes: (notes ? notes + " " : "") + `[logged by org admin: ${app.organization_name}]`,
      photo_url,
    }).select("id").single();
    if (error) return json({ error: error.message }, 400);

    return json({ ok: true, id: data.id, photo_url });
  } catch (e) {
    return json({ error: String((e as Error)?.message || e) }, 500);
  }
});

function json(b: unknown, s = 200) {
  return new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
