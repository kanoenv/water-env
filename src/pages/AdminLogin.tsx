import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Loader2,
  LogIn,
  Shield,
  Eye,
  EyeOff,
  ArrowLeft,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const { login, isLoading } = useAdminAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await login(loginEmail.trim(), loginPassword);
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-theme min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
        {/* Left — institutional panel */}
        <aside
          className="relative hidden lg:flex flex-col justify-between p-12 text-primary-foreground overflow-hidden"
          style={{ background: 'var(--gradient-emerald)' }}
        >
          {/* Decorative pattern */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.07]"
               style={{
                 backgroundImage:
                   'radial-gradient(circle at 1px 1px, hsl(var(--accent)) 1px, transparent 0)',
                 backgroundSize: '24px 24px',
               }}
          />
          <div
            className="pointer-events-none absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-30"
            style={{ background: 'var(--gradient-gold)' }}
          />

          <header className="relative z-10 flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary-foreground/10 ring-1 ring-primary-foreground/20 backdrop-blur flex items-center justify-center">
              <img
                src="/lovable-uploads/b2ec0667-1d0a-437a-9129-b3ccdd2291d4.png"
                alt="Ministry logo"
                className="h-8 w-auto"
              />
            </div>
            <div className="text-sm leading-tight">
              <div className="font-semibold tracking-wide">Kano State Government</div>
              <div className="text-primary-foreground/70 text-xs">
                Ministry of Water Resources, Environment & Climate Change
              </div>
            </div>
          </header>

          <div className="relative z-10 max-w-md space-y-6">
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-accent">
              <span className="h-px w-8 bg-accent" /> Administrative Console
            </span>
            <h1 className="font-serif text-4xl xl:text-5xl font-bold leading-tight">
              Govern. Monitor. Protect.
            </h1>
            <p className="text-primary-foreground/75 text-base leading-relaxed">
              Secure access to the official environmental administration platform — manage
              applications, climate actors, planting reports and operational data with confidence.
            </p>

            <ul className="space-y-3 pt-4">
              {[
                'Role-based authentication',
                'Encrypted session management',
                'Audited administrative actions',
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-primary-foreground/85">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <footer className="relative z-10 text-xs text-primary-foreground/60">
            © {new Date().getFullYear()} Kano State Ministry of Water Resources, Environment and Climate Change. All rights reserved.
          </footer>
        </aside>

        {/* Right — login form */}
        <section className="flex flex-col">
          <div className="flex items-center justify-between px-6 sm:px-10 py-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to public site
            </Link>
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              Secured connection
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center px-6 sm:px-10 pb-12">
            <div className="w-full max-w-md">
              <div className="mb-8 lg:hidden flex items-center gap-3">
                <div
                  className="h-11 w-11 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--gradient-emerald)' }}
                >
                  <Shield className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold">Admin Portal</div>
                  <div className="text-xs text-muted-foreground">Ministry of Water Resources, Environment and Climate Change</div>
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] uppercase text-secondary">
                  <Shield className="h-3.5 w-3.5" />
                  Authorised Access
                </span>
                <h2 className="font-serif text-3xl font-bold tracking-tight">
                  Sign in to your console
                </h2>
                <p className="text-sm text-muted-foreground">
                  Enter your administrative credentials to continue.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-sm font-medium">
                    Email address
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="name@environment.kn.gov.ng"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    autoComplete="email"
                    required
                    disabled={isSubmitting || isLoading}
                    className="h-12 bg-card border-border focus-visible:ring-secondary/30"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password" className="text-sm font-medium">
                      Password
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      Contact admin for reset
                    </span>
                  </div>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showLoginPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                      disabled={isSubmitting || isLoading}
                      className="h-12 bg-card border-border focus-visible:ring-secondary/30 pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-10 w-10 p-0 hover:bg-transparent"
                      onClick={() => setShowLoginPassword((s) => !s)}
                    >
                      {showLoginPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 font-semibold tracking-wide text-primary-foreground hover:opacity-95 transition-opacity"
                  style={{
                    background: 'var(--gradient-emerald)',
                    boxShadow: 'var(--shadow-elegant)',
                  }}
                  disabled={isSubmitting || isLoading || !loginEmail || !loginPassword}
                >
                  {isSubmitting || isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Authenticating…
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-5 w-5" />
                      Sign in securely
                    </>
                  )}
                </Button>

                <p className="text-[11px] text-muted-foreground text-center pt-2">
                  By signing in you accept the ministry's administrative usage policy and audit logging.
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminLogin;
