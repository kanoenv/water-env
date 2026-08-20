import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type AdminRole = 'admin';

type AdminUser = {
  id: string;
  email: string;
  full_name: string;
  role: AdminRole;
  is_active: boolean;
};

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string, role: AdminRole) => Promise<void>;
  logout: () => Promise<void>;
  canCreateAdmins: () => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  return ctx;
};

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const hydrateFromSession = async (userId: string, email: string) => {
    const { data: isAdminData } = await supabase.rpc('has_role', {
      _user_id: userId,
      _role: 'admin',
    });
    if (!isAdminData) return null;
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('user_id', userId)
      .maybeSingle();
    const u: AdminUser = {
      id: userId,
      email,
      full_name: profile?.full_name || email,
      role: 'admin',
      is_active: true,
    };
    setAdminUser(u);
    return u;
  };

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setTimeout(() => {
          hydrateFromSession(session.user.id, session.user.email || '');
        }, 0);
      } else {
        setAdminUser(null);
      }
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        await hydrateFromSession(session.user.id, session.user.email || '');
      }
      setIsLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const { data, error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
      if (error || !data.user) throw new Error(error?.message || 'Invalid email or password');

      const admin = await hydrateFromSession(data.user.id, data.user.email || normalizedEmail);
      if (!admin) {
        await supabase.auth.signOut();
        throw new Error('This account does not have admin access.');
      }

      toast({ title: 'Login Successful', description: 'Welcome back to the admin console' });
      navigate('/admin/dashboard');

    } catch (err) {
      toast({
        title: 'Login Failed',
        description: err instanceof Error ? err.message : 'Invalid credentials',
        variant: 'destructive',
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `https://environment.kn.gov.ng/admin-login`,
          data: { full_name: fullName },
        },
      });
      if (error) throw error;
      if (data.user) {
        await supabase.from('user_roles').insert({ user_id: data.user.id, role: 'admin' });
      }
      toast({ title: 'Account Created', description: 'Admin account created successfully' });
    } catch (err) {
      toast({
        title: 'Registration Failed',
        description: err instanceof Error ? err.message : 'Failed to create admin account',
        variant: 'destructive',
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setAdminUser(null);
    toast({ title: 'Logged Out', description: 'You have been logged out' });
    navigate('/admin-login');
  };

  const canCreateAdmins = () => adminUser?.role === 'admin';

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isAuthenticated: !!adminUser,
        isLoading,
        login,
        register,
        logout,
        canCreateAdmins,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
