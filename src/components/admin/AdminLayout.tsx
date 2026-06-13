import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Settings,
  Wind,
  Users,
  UserCheck,
  TreePine,
  Building2,
  LogOut,
  Clock,
  FolderOpen,
  Briefcase,
  Image,
  Shield,
  Bell,
  Search,
  Database,
  ExternalLink,
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

type MenuItem = {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  category: 'main' | 'monitoring' | 'content' | 'management';
};

const menuItems: MenuItem[] = [
  { path: '/admin/database', label: 'Database', icon: Database, description: 'Records & tables', category: 'main' },
  { path: '/admin/reports', label: 'Reports', icon: FileText, description: 'Environmental reports', category: 'main' },
  { path: '/admin/climate-actors', label: 'Climate Actors', icon: Building2, description: 'Organizations', category: 'main' },
  { path: '/admin/tree-campaign', label: 'Tree Campaigns', icon: TreePine, description: '5M & 10M applications', category: 'main' },
  { path: '/admin/forest-guard-applications', label: 'Forest Guard', icon: UserCheck, description: 'Applications', category: 'main' },
  { path: '/admin/tree-planting-tracker', label: 'Planting Tracker', icon: TreePine, description: 'Field monitoring', category: 'monitoring' },
  { path: '/admin/air-quality', label: 'Air Quality', icon: Wind, description: 'Sensor data', category: 'monitoring' },
  { path: '/admin/banners', label: 'Banners', icon: Image, description: 'Home banners', category: 'content' },
  { path: '/admin/programs', label: 'Programs', icon: FolderOpen, description: 'Programs', category: 'content' },
  { path: '/admin/content', label: 'Content', icon: Settings, description: 'Site content', category: 'content' },
  { path: '/admin/careers', label: 'Careers', icon: Briefcase, description: 'Job listings', category: 'management' },
  { path: '/admin/recruitment', label: 'Recruitment', icon: UserCheck, description: 'HR pipeline', category: 'management' },
  { path: '/admin/users', label: 'Admin Users', icon: Users, description: 'Roles & access', category: 'management' },
];

const groups: { key: MenuItem['category']; label: string }[] = [
  { key: 'main', label: 'Operations' },
  { key: 'monitoring', label: 'Monitoring' },
  { key: 'content', label: 'Content' },
  { key: 'management', label: 'Management' },
];

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, adminUser } = useAdminAuth();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const tick = () => {
      const t = localStorage.getItem('adminLoginTime');
      if (!t) return setTimeRemaining(0);
      setTimeRemaining(Math.max(0, 10 * 60 * 1000 - (Date.now() - parseInt(t))));
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/admin-login');
  };

  const formatTime = (ms: number) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const isActive = (p: string) => location.pathname === p;

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarContent className="bg-sidebar text-sidebar-foreground">
        {/* Brand */}
        <div className="px-4 py-5 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-lg flex items-center justify-center ring-1 ring-sidebar-border shrink-0"
              style={{ background: 'var(--gradient-gold)' }}
            >
              <Shield className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <h2 className="text-sm font-semibold tracking-wide truncate">Admin Console</h2>
                <p className="text-[11px] text-sidebar-foreground/60 truncate">Ministry of Water Resources, Environment and Climate Change</p>
              </div>
            )}
          </div>

          {!collapsed && adminUser && (
            <div className="mt-4 rounded-md border border-sidebar-border/60 bg-sidebar-accent/40 px-3 py-2">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-sidebar-foreground/60">
                <Clock className="h-3 w-3" /> Session expires in
              </div>
              <div className="font-mono text-sm font-semibold text-accent">
                {formatTime(timeRemaining)}
              </div>
            </div>
          )}
        </div>

        {groups.map(({ key, label }) => {
          const items = menuItems.filter((m) => m.category === key);
          return (
            <SidebarGroup key={key}>
              {!collapsed && (
                <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sidebar-foreground/50">
                  {label}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                          asChild
                          className={`group/item relative h-auto py-2.5 rounded-md transition-colors ${
                            active
                              ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                              : 'hover:bg-sidebar-accent/60'
                          }`}
                        >
                          <Link to={item.path} className="flex items-center gap-3">
                            {active && (
                              <span className="absolute left-0 top-1 bottom-1 w-0.5 rounded-r bg-accent" />
                            )}
                            <Icon
                              className={`h-4 w-4 shrink-0 ${
                                active ? 'text-accent' : 'text-sidebar-foreground/70 group-hover/item:text-sidebar-foreground'
                              }`}
                            />
                            {!collapsed && (
                              <div className="min-w-0">
                                <div className="text-sm font-medium leading-tight truncate">{item.label}</div>
                                <div className="text-[11px] text-sidebar-foreground/55 truncate">
                                  {item.description}
                                </div>
                              </div>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}

        <div className="mt-auto p-3 border-t border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                className="text-destructive-foreground/90 hover:bg-destructive/15 hover:text-destructive-foreground"
              >
                <LogOut className="h-4 w-4" />
                {!collapsed && <span>Sign Out</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { adminUser } = useAdminAuth();
  const location = useLocation();
  const current = menuItems.find((m) => m.path === location.pathname);

  return (
    <div className="admin-theme">
      <SidebarProvider defaultOpen>
        <div className="min-h-screen flex w-full bg-background text-foreground">
          <AdminSidebar />

          <div className="flex-1 flex flex-col min-w-0">
            <header className="bg-card border-b border-border sticky top-0 z-30">
              <div className="flex items-center justify-between gap-4 px-4 md:px-6 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <SidebarTrigger />
                  <div className="hidden md:block min-w-0">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      Admin · {current?.description ?? 'Console'}
                    </div>
                    <div className="text-sm font-semibold truncate">
                      {current?.label ?? 'Dashboard'}
                    </div>
                  </div>
                </div>

                <div className="hidden lg:flex items-center relative flex-1 max-w-md">
                  <Search className="h-4 w-4 absolute left-3 text-muted-foreground" />
                  <Input
                    placeholder="Search records, applications, users…"
                    className="pl-10 h-10 bg-muted/40 border-border focus-visible:ring-secondary/30"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-accent" />
                  </Button>

                  {adminUser && (
                    <div className="flex items-center gap-3 pl-3 ml-1 border-l border-border">
                      <Avatar className="h-9 w-9 ring-1 ring-border">
                        <AvatarFallback
                          className="text-sm font-semibold text-primary-foreground"
                          style={{ background: 'var(--gradient-emerald)' }}
                        >
                          {adminUser.full_name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden md:block leading-tight">
                        <div className="text-sm font-medium truncate max-w-[160px]">
                          {adminUser.full_name}
                        </div>
                        <Badge
                          variant="outline"
                          className="h-5 mt-0.5 text-[10px] tracking-wider border-accent/40 text-accent"
                        >
                          {adminUser.role.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  )}

                  <Button variant="outline" size="sm" asChild className="gap-2 ml-1">
                    <Link to="/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      <span className="hidden sm:inline">View site</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </header>

            <main className="flex-1 overflow-auto">
              <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">{children}</div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
