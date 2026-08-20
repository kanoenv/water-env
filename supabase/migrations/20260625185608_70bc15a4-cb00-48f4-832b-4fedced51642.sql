
-- Add 'org' role to app_role enum
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel='org' AND enumtypid='public.app_role'::regtype) THEN
    ALTER TYPE public.app_role ADD VALUE 'org';
  END IF;
END $$;
