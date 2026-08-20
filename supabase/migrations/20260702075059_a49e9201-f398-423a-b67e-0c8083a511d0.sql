
DO $$
DECLARE
  r RECORD;
  svc TEXT;
  url TEXT := 'https://hczbovadmpnzbejsrxbe.supabase.co/functions/v1/send-transactional-email';
BEGIN
  SELECT decrypted_secret INTO svc FROM vault.decrypted_secrets WHERE name = 'email_queue_service_role_key';
  FOR r IN
    SELECT DISTINCT ON (lower(contact_email)) lower(contact_email) AS email, organization_name AS org
    FROM public.tree_campaign_applications
    WHERE status IN ('approved','seeds_distributed','under_review','completed')
      AND contact_email IS NOT NULL AND contact_email <> ''
    ORDER BY lower(contact_email), created_at DESC
  LOOP
    PERFORM net.http_post(
      url := url,
      headers := jsonb_build_object(
        'Content-Type','application/json',
        'Authorization','Bearer ' || svc,
        'apikey', svc
      ),
      body := jsonb_build_object(
        'templateName','seedling-allocation-invite',
        'recipientEmail', r.email,
        'idempotencyKey', 'seedling-invite-bulk-' || to_char(now(),'YYYYMMDD') || '-' || r.email,
        'templateData', jsonb_build_object('organizationName', COALESCE(r.org,'Organization'))
      )
    );
  END LOOP;
END $$;
