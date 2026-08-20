// One-off bulk sender for the seedling allocation invitation.
// Renders the template once, then enqueues directly into the email queue
// (no per-recipient function invocation, so no chained-invoke rate limits).
import * as React from 'npm:react@18.3.1'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { TEMPLATES } from '../_shared/transactional-email-templates/registry.ts'

const TEMPLATE_NAME = 'seedling-allocation-invite'
const RUN_KEY = 'seedling-invite-2026-08'
const SITE_NAME = 'Kano State Ministry of Environment'
const SENDER_DOMAIN = 'notify.kanowaterproject.com'
const FROM_DOMAIN = 'kanowaterproject.com'
const PAGE = 200

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
}

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const url = Deno.env.get('SUPABASE_URL')!
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(url, serviceKey)

  const body = await req.json().catch(() => ({}))
  let offset = Number(body.offset ?? 0)
  const maxBatches = Number(body.maxBatches ?? 3)

  const template = TEMPLATES[TEMPLATE_NAME]
  const html = await renderAsync(React.createElement(template.component, {}))
  const text = await renderAsync(React.createElement(template.component, {}), { plainText: true })
  const subject = typeof template.subject === 'function' ? template.subject({}) : template.subject

  let enqueued = 0
  let skipped = 0
  let done = false

  for (let b = 0; b < maxBatches; b++) {
    const { data: apps, error } = await supabase
      .from('tree_campaign_applications')
      .select('contact_email')
      .in('status', ['approved', 'seeds_distributed', 'under_review', 'completed'])
      .not('contact_email', 'is', null)
      .order('created_at', { ascending: true })
      .range(offset, offset + PAGE - 1)

    if (error) return json({ error: error.message, offset }, 500)
    if (!apps || apps.length === 0) { done = true; break }
    offset += apps.length

    const emails = Array.from(new Set(
      apps.map((a: any) => (a.contact_email || '').trim().toLowerCase())
        .filter((e: string) => e.includes('@') && !e.includes(' ')),
    ))
    if (emails.length === 0) continue

    // Suppression list
    const { data: supp } = await supabase
      .from('suppressed_emails').select('email').in('email', emails)
    const suppressed = new Set((supp || []).map((s: any) => s.email))

    // Already sent in this run
    const { data: already } = await supabase
      .from('email_send_log')
      .select('recipient_email')
      .eq('template_name', TEMPLATE_NAME)
      .in('recipient_email', emails)
    const sentAlready = new Set((already || []).map((r: any) => (r.recipient_email || '').toLowerCase()))

    const targets = emails.filter((e) => !suppressed.has(e) && !sentAlready.has(e))
    skipped += emails.length - targets.length
    if (targets.length === 0) continue

    // Unsubscribe tokens
    const { data: existing } = await supabase
      .from('email_unsubscribe_tokens').select('token, email, used_at').in('email', targets)
    const tokenMap = new Map<string, string>()
    for (const t of existing || []) if (!t.used_at) tokenMap.set(t.email, t.token)

    const missing = targets.filter((e) => !tokenMap.has(e))
    if (missing.length) {
      const rows = missing.map((email) => ({ email, token: generateToken() }))
      await supabase.from('email_unsubscribe_tokens')
        .upsert(rows, { onConflict: 'email', ignoreDuplicates: true })
      const { data: reread } = await supabase
        .from('email_unsubscribe_tokens').select('token, email').in('email', missing)
      for (const t of reread || []) tokenMap.set(t.email, t.token)
    }

    const logRows: any[] = []
    for (const email of targets) {
      const messageId = crypto.randomUUID()
      logRows.push({
        message_id: messageId,
        template_name: TEMPLATE_NAME,
        recipient_email: email,
        status: 'pending',
      })
      const { error: qErr } = await supabase.rpc('enqueue_email', {
        queue_name: 'transactional_emails',
        payload: {
          message_id: messageId,
          to: email,
          from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
          sender_domain: SENDER_DOMAIN,
          subject,
          html,
          text,
          purpose: 'transactional',
          label: TEMPLATE_NAME,
          idempotency_key: `${RUN_KEY}-${email}`,
          unsubscribe_token: tokenMap.get(email),
          queued_at: new Date().toISOString(),
        },
      })
      if (qErr) console.log('enqueue failed', email, qErr.message)
      else enqueued++
    }
    if (logRows.length) await supabase.from('email_send_log').insert(logRows)
  }

  return json({ ok: true, enqueued, skipped, nextOffset: offset, done })
})

function json(b: unknown, status = 200) {
  return new Response(JSON.stringify(b), {
    status, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
