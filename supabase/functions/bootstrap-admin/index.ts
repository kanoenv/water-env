// One-off bootstrap to create the super-admin account.
// Call: POST { secret: "<BOOTSTRAP_SECRET>" }
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_EMAIL = "hareesabdulkadir@gmail.com";
const ADMIN_PASSWORD = "6qk@4qJfBsW5RWVk";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Try to create
  const { data: created, error } = await supabase.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    email_confirm: true,
    user_metadata: { full_name: "Super Admin" },
  });

  let userId = created?.user?.id;

  if (error && !userId) {
    // user may already exist — find them
    const { data: list } = await supabase.auth.admin.listUsers();
    const existing = list.users.find((u) => u.email === ADMIN_EMAIL);
    if (existing) {
      userId = existing.id;
      // reset password
      await supabase.auth.admin.updateUserById(existing.id, {
        password: ADMIN_PASSWORD,
        email_confirm: true,
      });
    } else {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  // Ensure admin role
  await supabase.from("user_roles").upsert(
    { user_id: userId!, role: "admin" },
    { onConflict: "user_id,role" }
  );

  return new Response(
    JSON.stringify({ ok: true, email: ADMIN_EMAIL, user_id: userId }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});
