
CREATE TABLE public.borehole_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_user_id uuid,
  tracking_number text NOT NULL,
  full_name text NOT NULL,
  phone_number text NOT NULL,
  community_name text NOT NULL,
  community_leader text,
  ward text NOT NULL,
  lga text NOT NULL,
  beneficiaries_range text NOT NULL,
  working_borehole boolean NOT NULL DEFAULT false,
  declaration boolean NOT NULL DEFAULT false,
  location_photo text,
  status text NOT NULL DEFAULT 'pending',
  admin_remark text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.borehole_applications TO authenticated;
GRANT ALL ON public.borehole_applications TO service_role;
ALTER TABLE public.borehole_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage borehole applications" ON public.borehole_applications FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_borehole_apps_updated BEFORE UPDATE ON public.borehole_applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_borehole_apps_status ON public.borehole_applications(status);
CREATE INDEX idx_borehole_apps_lga ON public.borehole_applications(lga);
CREATE UNIQUE INDEX idx_borehole_apps_tracking ON public.borehole_applications(tracking_number);

CREATE TABLE public.borehole_applicants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_user_id uuid,
  full_name text NOT NULL,
  email text,
  phone text,
  role text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.borehole_applicants TO authenticated;
GRANT ALL ON public.borehole_applicants TO service_role;
ALTER TABLE public.borehole_applicants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage borehole applicants" ON public.borehole_applicants FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE UNIQUE INDEX idx_borehole_applicants_src ON public.borehole_applicants(source_user_id);

CREATE TABLE public.borehole_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_user_id uuid,
  title text NOT NULL,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.borehole_notifications TO authenticated;
GRANT ALL ON public.borehole_notifications TO service_role;
ALTER TABLE public.borehole_notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage borehole notifications" ON public.borehole_notifications FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.borehole_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_admin_id uuid,
  application_id uuid REFERENCES public.borehole_applications(id) ON DELETE SET NULL,
  action text NOT NULL,
  details text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.borehole_audit_logs TO authenticated;
GRANT ALL ON public.borehole_audit_logs TO service_role;
ALTER TABLE public.borehole_audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage borehole audit logs" ON public.borehole_audit_logs FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
