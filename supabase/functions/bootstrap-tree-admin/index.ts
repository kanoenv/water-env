// One-off bootstrap for the 10 Million Trees campaign admin account.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const EMAIL = "ibrahimawesome94@yahoo.com";
const PASSWORD = "Kn10M!Tr33s@2026#Ib";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data: created, error } = await supabase.auth.admin.createUser({
    email: EMAIL,
    password: PASSWORD,
    email_confirm: true,
    user_metadata: { full_name: "10M Trees Campaign Admin" },
  });

  let userId = created?.user?.id;

  if (!userId) {
    const { data: list } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
    const existing = list?.users.find((u) => u.email === EMAIL);
    if (!existing) {
      return new Response(JSON.stringify({ error: error?.message || "could not create user" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    userId = existing.id;
    await supabase.auth.admin.updateUserById(userId, { password: PASSWORD, email_confirm: true });
  }

  // only the limited campaign role — remove any broader roles
  await supabase.from("user_roles").delete().eq("user_id", userId);
  const { error: roleErr } = await supabase
    .from("user_roles")
    .insert({ user_id: userId, role: "tree_admin" });

  return new Response(
    JSON.stringify({ ok: !roleErr, email: EMAIL, user_id: userId, role_error: roleErr?.message ?? null }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
