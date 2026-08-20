import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LayoutDashboard, Users, Sprout, LogOut, TreePine, TreeDeciduous, Menu } from "lucide-react";

export type OrgApp = {
  id: string;
  organization_name: string;
  contact_email: string;
  seedlings_requested: number;
  status: string;
};

export function useOrgApp() {
  const [app, setApp] = useState<OrgApp | null>(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { nav("/org/login"); return; }
      const { data } = await supabase
        .from("tree_campaign_applications")
        .select("id, organization_name, contact_email, seedlings_requested, status")
        .eq("applicant_user_id", session.user.id)
        .maybeSingle();
      if (!data) { nav("/org/login"); return; }
      setApp(data as OrgApp);
      setLoading(false);
    })();
  }, [nav]);

  return { app, loading };
}

const NAV_ITEMS = [
  { to: "/org/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/org/plant", icon: TreeDeciduous, label: "Plant a Tree" },
  { to: "/org/planters", icon: Users, label: "Planters" },
  { to: "/org/plantings", icon: Sprout, label: "Planting Logs" },
];

function NavList({ app, onNavigate, onSignOut }: { app: OrgApp | null; onNavigate?: () => void; onSignOut: () => void }) {
  const loc = useLocation();
  return (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-emerald-800 flex items-center gap-2">
        <TreePine className="w-6 h-6 text-amber-300" />
        <div>
          <div className="font-serif text-lg leading-tight">Org Portal</div>
          <div className="text-[11px] text-emerald-200">10M Trees Campaign</div>
        </div>
      </div>
      <div className="p-4 border-b border-emerald-800 text-sm">
        <div className="font-semibold truncate">{app?.organization_name}</div>
        <div className="text-emerald-200 text-xs truncate">{app?.contact_email}</div>
      </div>
      <nav className="flex-1 p-2 overflow-y-auto">
        {NAV_ITEMS.map(i => {
          const active = loc.pathname === i.to;
          return (
            <Link key={i.to} to={i.to} onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm mb-1 ${active ? "bg-emerald-700 text-white" : "hover:bg-emerald-800"}`}>
              <i.icon className="w-4 h-4" /> {i.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-emerald-800">
        <Button variant="ghost" className="w-full justify-start text-emerald-50 hover:bg-emerald-800 hover:text-white"
          onClick={onSignOut}>
          <LogOut className="w-4 h-4 mr-2" /> Sign out
        </Button>
      </div>
    </div>
  );
}

export default function OrgLayout({ children }: { children: ReactNode }) {
  const nav = useNavigate();
  const loc = useLocation();
  const { app, loading } = useOrgApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const signOut = async () => { await supabase.auth.signOut(); nav("/org/login"); };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading…</div>;

  const currentLabel = NAV_ITEMS.find(i => i.to === loc.pathname)?.label ?? "Org Portal";

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="w-64 bg-emerald-900 text-emerald-50 hidden md:flex flex-col">
        <NavList app={app} onSignOut={signOut} />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="md:hidden sticky top-0 z-30 bg-emerald-900 text-emerald-50 flex items-center justify-between px-3 py-3 shadow">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-emerald-50 hover:bg-emerald-800 hover:text-white">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 bg-emerald-900 text-emerald-50 border-emerald-800">
              <NavList app={app} onNavigate={() => setMobileOpen(false)} onSignOut={signOut} />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <TreePine className="w-5 h-5 text-amber-300" />
            <span className="font-serif text-base">{currentLabel}</span>
          </div>
          <div className="w-9" />
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-auto pb-24 md:pb-8">{children}</main>

        {/* Mobile bottom tab bar */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t shadow-lg flex justify-around">
          {NAV_ITEMS.map(i => {
            const active = loc.pathname === i.to;
            return (
              <Link key={i.to} to={i.to}
                className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-[11px] ${active ? "text-emerald-700" : "text-slate-500"}`}>
                <i.icon className="w-5 h-5" />
                <span className="leading-tight text-center">{i.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
