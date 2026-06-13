
-- Enums
DO $$ BEGIN
  CREATE TYPE public.tree_campaign AS ENUM ('5_million_2025', '10_million_2026');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.tree_app_status AS ENUM ('pending','under_review','approved','rejected','seeds_distributed','completed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Applications table
CREATE TABLE public.tree_campaign_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign tree_campaign NOT NULL DEFAULT '10_million_2026',
  organization_name text NOT NULL,
  address text NOT NULL,
  date_established date,
  organization_type text NOT NULL,
  other_type text,
  contact_name text NOT NULL,
  contact_position text,
  contact_phone text NOT NULL,
  contact_email text NOT NULL,
  planting_sites integer NOT NULL DEFAULT 1 CHECK (planting_sites >= 0),
  seedlings_requested integer NOT NULL CHECK (seedlings_requested > 0),
  locations text NOT NULL,
  volunteers integer NOT NULL DEFAULT 0 CHECK (volunteers >= 0),
  previous_experience text,
  survival_rate_commitment text,
  training_commitment boolean NOT NULL DEFAULT false,
  tracking_tool_commitment boolean NOT NULL DEFAULT false,
  coordinator_commitment boolean NOT NULL DEFAULT false,
  representative_name text,
  representative_position text,
  submission_date date NOT NULL DEFAULT (now()::date),
  status tree_app_status NOT NULL DEFAULT 'pending',
  admin_notes text,
  reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at timestamptz,
  applicant_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.tree_campaign_applications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tree_campaign_applications TO authenticated;
GRANT ALL ON public.tree_campaign_applications TO service_role;
ALTER TABLE public.tree_campaign_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit tree application" ON public.tree_campaign_applications
  FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'pending' AND reviewed_by IS NULL AND reviewed_at IS NULL);

CREATE POLICY "Admins view all tree applications" ON public.tree_campaign_applications
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users view own tree application" ON public.tree_campaign_applications
  FOR SELECT USING (auth.uid() IS NOT NULL AND auth.uid() = applicant_user_id);

CREATE POLICY "Admins update tree applications" ON public.tree_campaign_applications
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete tree applications" ON public.tree_campaign_applications
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_tree_apps_updated BEFORE UPDATE ON public.tree_campaign_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed distributions
CREATE TABLE public.tree_seed_distributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.tree_campaign_applications(id) ON DELETE CASCADE,
  species text NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  distribution_date date NOT NULL DEFAULT (now()::date),
  batch_code text,
  distributed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.tree_seed_distributions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tree_seed_distributions TO authenticated;
GRANT ALL ON public.tree_seed_distributions TO service_role;
ALTER TABLE public.tree_seed_distributions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone view distributions" ON public.tree_seed_distributions FOR SELECT USING (true);
CREATE POLICY "Admins manage distributions" ON public.tree_seed_distributions FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_tree_dist_updated BEFORE UPDATE ON public.tree_seed_distributions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Planting logs (tracker)
CREATE TABLE public.tree_planting_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.tree_campaign_applications(id) ON DELETE CASCADE,
  distribution_id uuid REFERENCES public.tree_seed_distributions(id) ON DELETE SET NULL,
  trees_planted integer NOT NULL CHECK (trees_planted >= 0),
  species text,
  planting_date date NOT NULL DEFAULT (now()::date),
  location_name text,
  latitude numeric,
  longitude numeric,
  survival_rate numeric CHECK (survival_rate IS NULL OR (survival_rate >= 0 AND survival_rate <= 100)),
  photo_url text,
  notes text,
  logged_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.tree_planting_logs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tree_planting_logs TO authenticated;
GRANT ALL ON public.tree_planting_logs TO service_role;
ALTER TABLE public.tree_planting_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone view planting logs" ON public.tree_planting_logs FOR SELECT USING (true);
CREATE POLICY "Admins manage planting logs" ON public.tree_planting_logs FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_tree_logs_updated BEFORE UPDATE ON public.tree_planting_logs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_tree_apps_campaign_status ON public.tree_campaign_applications(campaign, status);
CREATE INDEX idx_tree_dist_app ON public.tree_seed_distributions(application_id);
CREATE INDEX idx_tree_logs_app ON public.tree_planting_logs(application_id);
