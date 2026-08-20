// Public endpoint: planter logs in with phone + PIN, gets an HMAC-signed session token.
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

async function sha256(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function sign(payload: object, secret: string) {
  const data = btoa(JSON.stringify(payload));
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)));
  return `${data}.${sigB64}`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { phone, pin } = await req.json();
    if (!phone || !pin) return json({ error: "phone and pin required" }, 400);

    const cleanPhone = String(phone).replace(/\D/g, "");
    const hash = await sha256(`${cleanPhone}:${pin}`);

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data: planter, error } = await admin
      .from("planters")
      .select("id, application_id, full_name, phone, assigned_site, assigned_district, active")
      .eq("phone", cleanPhone)
      .eq("pin_hash", hash)
      .maybeSingle();
    if (error || !planter) return json({ error: "Invalid phone or PIN" }, 401);
    if (!planter.active) return json({ error: "Planter deactivated" }, 403);

    const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30;
    const token = await sign({ pid: planter.id, app: planter.application_id, exp }, Deno.env.get("PLANTER_TOKEN_SECRET")!);

    return json({ ok: true, token, planter });
  } catch (e) {
    return json({ error: String(e?.message || e) }, 500);
  }
});

function json(b: unknown, s = 200) {
  return new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
