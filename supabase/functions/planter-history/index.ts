// Planter endpoint: returns this planter's own logs.
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

async function verify(token: string, secret: string): Promise<any | null> {
  try {
    const [data, sig] = token.split(".");
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
    const sigBytes = Uint8Array.from(atob(sig), c => c.charCodeAt(0));
    const ok = await crypto.subtle.verify("HMAC", key, sigBytes, new TextEncoder().encode(data));
    if (!ok) return null;
    const payload = JSON.parse(atob(data));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch { return null; }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const { token } = await req.json().catch(() => ({}));
  if (!token) return j({ error: "token required" }, 401);
  const payload = await verify(token, Deno.env.get("PLANTER_TOKEN_SECRET")!);
  if (!payload) return j({ error: "Invalid token" }, 401);
  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { data, error } = await admin.from("tree_planting_logs")
    .select("*").eq("planter_id", payload.pid).order("planting_date", { ascending: false });
  if (error) return j({ error: error.message }, 400);
  return j({ ok: true, logs: data });
});
function j(b: unknown, s = 200) {
  return new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
