UPDATE auth.users
SET encrypted_password = crypt('Admin@12345', gen_salt('bf')),
    updated_at = now()
WHERE email IN (
  'admin.kano01@environment.kn.gov.ng',
  'admin.kano02@environment.kn.gov.ng',
  'admin.kano03@environment.kn.gov.ng'
);