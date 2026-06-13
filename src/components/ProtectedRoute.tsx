import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";

export function ProtectedRoute({ children, adminOnly = false, userOnly = false }: { children: ReactNode; adminOnly?: boolean; userOnly?: boolean }) {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Loading…</div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/dashboard" replace />;
  if (userOnly && isAdmin) return <Navigate to="/admin" replace />;
  return <>{children}</>;
}
