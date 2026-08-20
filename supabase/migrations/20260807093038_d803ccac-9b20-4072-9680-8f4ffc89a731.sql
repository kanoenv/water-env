CREATE OR REPLACE FUNCTION public.is_tree_admin(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role::text = 'tree_admin');
$$;
REVOKE EXECUTE ON FUNCTION public.is_tree_admin(uuid) FROM anon;

CREATE OR REPLACE FUNCTION public.is_10m_application(_app_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.tree_campaign_applications WHERE id = _app_id AND campaign::text = '10_million_2026');
$$;
REVOKE EXECUTE ON FUNCTION public.is_10m_application(uuid) FROM anon;

CREATE POLICY "Tree admins view 10M applications" ON public.tree_campaign_applications
FOR SELECT TO authenticated
USING (public.is_tree_admin(auth.uid()) AND campaign::text = '10_million_2026');

CREATE POLICY "Tree admins update 10M applications" ON public.tree_campaign_applications
FOR UPDATE TO authenticated
USING (public.is_tree_admin(auth.uid()) AND campaign::text = '10_million_2026')
WITH CHECK (public.is_tree_admin(auth.uid()) AND campaign::text = '10_million_2026');

CREATE POLICY "Tree admins manage 10M distributions" ON public.tree_seed_distributions
FOR ALL TO authenticated
USING (public.is_tree_admin(auth.uid()) AND public.is_10m_application(application_id))
WITH CHECK (public.is_tree_admin(auth.uid()) AND public.is_10m_application(application_id));