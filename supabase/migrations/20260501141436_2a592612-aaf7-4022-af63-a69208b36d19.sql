-- Restrict EXECUTE on SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated;

-- Remove broad listing on tree-photos; keep individual file reads via signed/public URL
DROP POLICY IF EXISTS "Tree photos publicly viewable" ON storage.objects;
CREATE POLICY "Tree photos owner can list"
ON storage.objects FOR SELECT
USING (bucket_id = 'tree-photos' AND (
  auth.uid()::text = (storage.foldername(name))[1]
  OR public.has_role(auth.uid(), 'admin')
));

-- Replace permissive INSERT on applications with explicit allow for anon + authenticated (still no admin spoofing risk)
DROP POLICY IF EXISTS "Anyone can submit application" ON public.applications;
CREATE POLICY "Public can submit application"
ON public.applications FOR INSERT TO anon, authenticated
WITH CHECK (
  status = 'pending'
  AND reviewed_by IS NULL
  AND reviewed_at IS NULL
  AND (applicant_user_id IS NULL OR applicant_user_id = auth.uid())
);