CREATE TABLE public.climate_actors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_type text NOT NULL,
  organization_name text NOT NULL,
  focus_areas text[] NOT NULL DEFAULT '{}',
  year_established integer,
  lga_operations text[] NOT NULL DEFAULT '{}',
  description text,
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text,
  website_url text,
  logo_url text,
  password_hash text,
  status text NOT NULL DEFAULT 'pending',
  rejection_reason text,
  approved_at timestamptz,
  approved_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT (id, actor_type, organization_name, focus_areas, year_established, lga_operations, description, contact_name, contact_email, contact_phone, website_url, logo_url, status, rejection_reason, approved_at, created_at, updated_at) ON public.climate_actors TO anon;
GRANT INSERT ON public.climate_actors TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.climate_actors TO authenticated;
GRANT ALL ON public.climate_actors TO service_role;

ALTER TABLE public.climate_actors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view climate actors"
  ON public.climate_actors FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can register as a climate actor"
  ON public.climate_actors FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can update climate actors"
  ON public.climate_actors FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete climate actors"
  ON public.climate_actors FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_climate_actors_updated BEFORE UPDATE ON public.climate_actors
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_climate_actors_status ON public.climate_actors(status);

CREATE TABLE public.reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  reporter_name text,
  reporter_email text,
  reporter_phone text,
  photos text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'New',
  resolution_notes text,
  resolved_at timestamptz,
  resolved_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.reports TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reports TO authenticated;
GRANT ALL ON public.reports TO service_role;

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a report"
  ON public.reports FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view reports"
  ON public.reports FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update reports"
  ON public.reports FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete reports"
  ON public.reports FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_reports_updated BEFORE UPDATE ON public.reports
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();