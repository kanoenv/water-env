// Planter endpoint: accepts a planting log (photo as base64 + GPS) and saves it.
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

async function verify(token: string, secret: string): Promise<any | null> {
  try {
    const [data, sig] = token.split(".");
    if (!data || !sig) return null;
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
    const sigBytes = Uint8Array.from(atob(sig), (c) => c.charCodeAt(0));
    const ok = await crypto.subtle.verify("HMAC", key, sigBytes, new TextEncoder().encode(data));
    if (!ok) return null;
    const payload = JSON.parse(atob(data));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch { return null; }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const body = await req.json();
    const { token, species, trees_planted, latitude, longitude, location_name, district, notes, photo_base64, photo_mime } = body;
    if (!token) return json({ error: "token required" }, 401);
    const payload = await verify(token, Deno.env.get("PLANTER_TOKEN_SECRET")!);
    if (!payload) return json({ error: "Invalid or expired token" }, 401);
    if (!species || !trees_planted || latitude == null || longitude == null) {
      return json({ error: "species, trees_planted, latitude, longitude required" }, 400);
    }

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    let photo_url: string | null = null;
    if (photo_base64) {
      const bin = Uint8Array.from(atob(photo_base64), (c) => c.charCodeAt(0));
      const ext = (photo_mime || "image/jpeg").split("/")[1] || "jpg";
      const path = `${payload.app}/${payload.pid}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await admin.storage.from("planting-photos").upload(path, bin, {
        contentType: photo_mime || "image/jpeg", upsert: false,
      });
      if (upErr) return json({ error: "Upload failed: " + upErr.message }, 400);
      const { data: signed } = await admin.storage.from("planting-photos").createSignedUrl(path, 60 * 60 * 24 * 365 * 5);
      photo_url = signed?.signedUrl || path;
    }

    const { data, error } = await admin.from("tree_planting_logs").insert({
      application_id: payload.app,
      planter_id: payload.pid,
      species, trees_planted: Number(trees_planted),
      planting_date: new Date().toISOString().slice(0, 10),
      latitude, longitude,
      location_name: location_name || null,
      district: district || null,
      notes: notes || null,
      photo_url,
    }).select("id").single();
    if (error) return json({ error: error.message }, 400);

    return json({ ok: true, id: data.id, photo_url });
  } catch (e) {
    return json({ error: String(e?.message || e) }, 500);
  }
});

function json(b: unknown, s = 200) {
  return new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
