
CREATE OR REPLACE FUNCTION public.is_org_for_application(_app_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.tree_campaign_applications WHERE id = _app_id AND applicant_user_id = auth.uid());
$$;
REVOKE EXECUTE ON FUNCTION public.is_org_for_application(uuid) FROM anon;

CREATE TABLE IF NOT EXISTS public.planters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.tree_campaign_applications(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  phone text NOT NULL,
  pin_hash text NOT NULL,
  assigned_site text,
  assigned_district text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (application_id, phone)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.planters TO authenticated;
GRANT ALL ON public.planters TO service_role;
ALTER TABLE public.planters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage all planters" ON public.planters FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Orgs view own planters" ON public.planters FOR SELECT TO authenticated
  USING (public.is_org_for_application(application_id));
CREATE POLICY "Orgs insert own planters" ON public.planters FOR INSERT TO authenticated
  WITH CHECK (public.is_org_for_application(application_id));
CREATE POLICY "Orgs update own planters" ON public.planters FOR UPDATE TO authenticated
  USING (public.is_org_for_application(application_id)) WITH CHECK (public.is_org_for_application(application_id));
CREATE POLICY "Orgs delete own planters" ON public.planters FOR DELETE TO authenticated
  USING (public.is_org_for_application(application_id));

CREATE TRIGGER planters_updated_at BEFORE UPDATE ON public.planters
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.tree_planting_logs
  ADD COLUMN IF NOT EXISTS planter_id uuid REFERENCES public.planters(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS district text;

DROP POLICY IF EXISTS "Orgs view own application" ON public.tree_campaign_applications;
CREATE POLICY "Orgs view own application" ON public.tree_campaign_applications FOR SELECT TO authenticated
  USING (applicant_user_id = auth.uid());

DROP POLICY IF EXISTS "Orgs view own distributions" ON public.tree_seed_distributions;
CREATE POLICY "Orgs view own distributions" ON public.tree_seed_distributions FOR SELECT TO authenticated
  USING (public.is_org_for_application(application_id));

DROP POLICY IF EXISTS "Orgs view own logs" ON public.tree_planting_logs;
CREATE POLICY "Orgs view own logs" ON public.tree_planting_logs FOR SELECT TO authenticated
  USING (public.is_org_for_application(application_id));

DROP POLICY IF EXISTS "Authed read planting photos" ON storage.objects;
CREATE POLICY "Authed read planting photos" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'planting-photos');
