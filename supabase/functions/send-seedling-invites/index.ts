// Admin-only: send the "Seedling Allocation Invitation" email to a single test
// address or to every approved 10M Trees organization.
import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const authHeader = req.headers.get('Authorization') || ''
    if (!authHeader.startsWith('Bearer ')) return json({ error: 'Unauthorized' }, 401)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } },
    )
    const token = authHeader.replace('Bearer ', '')
    const { data: claims, error: cErr } = await supabase.auth.getClaims(token)
    if (cErr || !claims?.claims) return json({ error: 'Unauthorized' }, 401)

    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )
    const { data: roles } = await admin
      .from('user_roles').select('role').eq('user_id', claims.claims.sub)
    if (!roles?.some((r: any) => r.role === 'admin')) return json({ error: 'Forbidden' }, 403)

    const body = await req.json().catch(() => ({}))
    const mode: 'test' | 'all' = body.mode === 'all' ? 'all' : 'test'
    const testEmail: string | undefined = body.test_email

    // Build recipient list
    type Rec = { email: string; org: string }
    let recipients: Rec[] = []

    if (mode === 'test') {
      if (!testEmail) return json({ error: 'test_email required' }, 400)
      recipients = [{ email: testEmail, org: body.organization_name || 'Test Organization' }]
    } else {
      const { data: apps, error: aErr } = await admin
        .from('tree_campaign_applications')
        .select('contact_email, organization_name, status')
        .in('status', ['approved', 'seeds_distributed', 'under_review', 'completed'])
      if (aErr) return json({ error: aErr.message }, 500)
      const seen = new Set<string>()
      for (const a of apps || []) {
        const em = (a.contact_email || '').trim().toLowerCase()
        if (!em || seen.has(em)) continue
        seen.add(em)
        recipients.push({ email: em, org: a.organization_name || 'Organization' })
      }
    }

    // Invoke send-transactional-email for each recipient using service role
    const sendUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/send-transactional-email`
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    let sent = 0
    const failures: { email: string; error: string }[] = []

    for (const r of recipients) {
      try {
        const res = await fetch(sendUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${serviceKey}`,
            apikey: serviceKey,
          },
          body: JSON.stringify({
            templateName: 'seedling-allocation-invite',
            recipientEmail: r.email,
            idempotencyKey: `seedling-invite-${Date.now()}-${r.email}`,
            templateData: { organizationName: r.org },
          }),
        })
        if (!res.ok) {
          const t = await res.text()
          failures.push({ email: r.email, error: `${res.status} ${t.slice(0, 200)}` })
        } else {
          sent++
        }
      } catch (e) {
        failures.push({ email: r.email, error: String(e?.message || e) })
      }
    }

    return json({ ok: true, mode, total: recipients.length, sent, failed: failures.length, failures })
  } catch (e) {
    return json({ error: String(e?.message || e) }, 500)
  }
})

function json(b: unknown, status = 200) {
  return new Response(JSON.stringify(b), {
    status, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
