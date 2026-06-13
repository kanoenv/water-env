-- ============ ENUMS ============
CREATE TYPE public.app_role AS ENUM ('admin', 'user');
CREATE TYPE public.applicant_type AS ENUM ('individual', 'organization');
CREATE TYPE public.application_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.report_status AS ENUM ('planted', 'growing', 'mature', 'failed');

-- ============ PROFILES ============
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ============ USER ROLES (separate table — security best practice) ============
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- ============ ORGANIZATIONS ============
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  org_type TEXT NOT NULL,
  registration_number TEXT,
  address TEXT,
  lga TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- ============ APPLICATIONS ============
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  applicant_type public.applicant_type NOT NULL,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  lga TEXT NOT NULL,
  address TEXT NOT NULL,
  planting_site TEXT NOT NULL,
  site_size_hectares NUMERIC,
  preferred_species TEXT,
  seeds_requested INTEGER NOT NULL CHECK (seeds_requested > 0),
  purpose TEXT NOT NULL,
  status public.application_status NOT NULL DEFAULT 'pending',
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- ============ SEED ASSIGNMENTS ============
CREATE TABLE public.seed_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  recipient_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_by UUID NOT NULL REFERENCES auth.users(id),
  species TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.seed_assignments ENABLE ROW LEVEL SECURITY;

-- ============ PLANTING REPORTS ============
CREATE TABLE public.planting_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES public.seed_assignments(id) ON DELETE CASCADE,
  reporter_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  trees_planted INTEGER NOT NULL CHECK (trees_planted >= 0),
  survival_rate NUMERIC CHECK (survival_rate >= 0 AND survival_rate <= 100),
  status public.report_status NOT NULL DEFAULT 'planted',
  latitude NUMERIC,
  longitude NUMERIC,
  location_name TEXT,
  photo_url TEXT,
  notes TEXT,
  reported_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.planting_reports ENABLE ROW LEVEL SECURITY;

-- ============ TIMESTAMP TRIGGER ============
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_applications_updated BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ AUTO PROFILE + AUTO ADMIN PROMOTION ============
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  );

  -- Auto-promote designated super-admin
  IF NEW.email = 'hareesabdulkadir@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT DO NOTHING;
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user')
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ RLS POLICIES ============

-- profiles
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins view all profiles" ON public.profiles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- user_roles
CREATE POLICY "Users view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins view all roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage roles" ON public.user_roles FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete roles" ON public.user_roles FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- organizations
CREATE POLICY "Anyone can view organizations" ON public.organizations FOR SELECT USING (true);
CREATE POLICY "Authenticated create organizations" ON public.organizations FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Owners update orgs" ON public.organizations FOR UPDATE USING (auth.uid() = owner_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete orgs" ON public.organizations FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- applications  (PUBLIC submission allowed)
CREATE POLICY "Anyone can submit application" ON public.applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Users view own applications" ON public.applications FOR SELECT USING (auth.uid() = applicant_user_id);
CREATE POLICY "Admins view all applications" ON public.applications FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update applications" ON public.applications FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete applications" ON public.applications FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- seed_assignments
CREATE POLICY "Recipients view assignments" ON public.seed_assignments FOR SELECT USING (auth.uid() = recipient_user_id);
CREATE POLICY "Admins view assignments" ON public.seed_assignments FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins create assignments" ON public.seed_assignments FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update assignments" ON public.seed_assignments FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete assignments" ON public.seed_assignments FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- planting_reports
CREATE POLICY "Reporters view own reports" ON public.planting_reports FOR SELECT USING (auth.uid() = reporter_user_id);
CREATE POLICY "Admins view all reports" ON public.planting_reports FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Reporters create reports" ON public.planting_reports FOR INSERT WITH CHECK (auth.uid() = reporter_user_id);
CREATE POLICY "Reporters update own reports" ON public.planting_reports FOR UPDATE USING (auth.uid() = reporter_user_id);

-- ============ STORAGE: tree photos ============
INSERT INTO storage.buckets (id, name, public) VALUES ('tree-photos', 'tree-photos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Tree photos publicly viewable" ON storage.objects FOR SELECT USING (bucket_id = 'tree-photos');
CREATE POLICY "Authenticated upload tree photos" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'tree-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users update own tree photos" ON storage.objects FOR UPDATE
  USING (bucket_id = 'tree-photos' AND auth.uid()::text = (storage.foldername(name))[1]);