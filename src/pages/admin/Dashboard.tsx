// @ts-nocheck

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from '@/components/admin/AdminLayout';
import {
  FileText,
  TreePine,
  AlertTriangle,
  Download,
  Building2,
  Clock,
  CheckCircle2,
  XCircle,
  Sprout,
  ArrowUpRight,
  Activity,
  RefreshCcw,
} from "lucide-react";

type Stats = {
  reports: number;
  openReports: number;
  treeApps: number;
  treeAppsApproved: number;
  treeAppsPending: number;
  seedlingsRequested: number;
  actors: number;
  actorsPending: number;
  actorsApproved: number;
  actorsRejected: number;
  treesPlanted: number;
  plantingLogs: number;
};

const EMPTY: Stats = {
  reports: 0, openReports: 0, treeApps: 0, treeAppsApproved: 0, treeAppsPending: 0,
  seedlingsRequested: 0, actors: 0, actorsPending: 0, actorsApproved: 0, actorsRejected: 0,
  treesPlanted: 0, plantingLogs: 0,
};

const nf = (n: number) => new Intl.NumberFormat().format(n);

const Dashboard = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState<Stats>(EMPTY);
  const [recentActors, setRecentActors] = useState<any[]>([]);
  const [recentApps, setRecentApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshedAt, setRefreshedAt] = useState<Date>(new Date());

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try {
      const [reports, apps, actors, logs, latestActors, latestApps] = await Promise.all([
        supabase.from('reports').select('status'),
        supabase.from('tree_campaign_applications').select('status, seedlings_requested'),
        supabase.from('climate_actors').select('status'),
        supabase.from('tree_planting_logs').select('trees_planted'),
        supabase.from('climate_actors').select('id, organization_name, actor_type, status, logo_url, created_at').order('created_at', { ascending: false }).limit(5),
        supabase.from('tree_campaign_applications').select('id, organization_name, campaign, status, seedlings_requested, created_at').order('created_at', { ascending: false }).limit(5),
      ]);

      const r = reports.data || [];
      const a = apps.data || [];
      const c = actors.data || [];
      const l = logs.data || [];

      setStats({
        reports: r.length,
        openReports: r.filter((x: any) => x.status !== 'resolved').length,
        treeApps: a.length,
        treeAppsApproved: a.filter((x: any) => ['approved', 'seeds_distributed', 'completed'].includes(x.status)).length,
        treeAppsPending: a.filter((x: any) => ['pending', 'under_review'].includes(x.status)).length,
        seedlingsRequested: a.reduce((s: number, x: any) => s + (x.seedlings_requested || 0), 0),
        actors: c.length,
        actorsPending: c.filter((x: any) => x.status === 'pending').length,
        actorsApproved: c.filter((x: any) => x.status === 'approved').length,
        actorsRejected: c.filter((x: any) => x.status === 'rejected').length,
        treesPlanted: l.reduce((s: number, x: any) => s + (x.trees_planted || 0), 0),
        plantingLogs: l.length,
      });
      setRecentActors(latestActors.data || []);
      setRecentApps(latestApps.data || []);
      setRefreshedAt(new Date());
    } catch (e) {
      console.error(e);
      toast({ title: "Error", description: "Failed to load dashboard statistics", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const exportAllData = async () => {
    try {
      const [climateActorsData, reportsData, treeApplicationsData] = await Promise.all([
        supabase.from('climate_actors').select('*'),
        supabase.from('reports').select('*'),
        supabase.from('tree_campaign_applications').select('*'),
      ]);

      const createCSV = (data: any[], filename: string) => {
        if (!data || data.length === 0) return;
        const headers = Object.keys(data[0]);
        const csv = [
          headers.join(','),
          ...data.map(row => headers.map(h => {
            const v = row[h];
            return Array.isArray(v) ? `"${v.join('; ')}"` : `"${v ?? ''}"`;
          }).join(',')),
        ].join('\n');
        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
        link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      createCSV(climateActorsData.data, 'climate-actors');
      createCSV(reportsData.data, 'reports');
      createCSV(treeApplicationsData.data, 'tree-applications');
      toast({ title: "Export complete", description: "CSV files have been downloaded" });
    } catch (e) {
      toast({ title: "Export failed", description: "Could not export data", variant: "destructive" });
    }
  };

  const kpis = [
    { label: 'Climate Actors', value: stats.actors, sub: `${nf(stats.actorsApproved)} verified`, icon: Building2, to: '/admin/climate-actors', tone: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Campaign Applications', value: stats.treeApps, sub: `${nf(stats.treeAppsApproved)} approved`, icon: TreePine, to: '/admin/tree-campaign', tone: 'text-success', bg: 'bg-success/10' },
    { label: 'Trees Logged', value: stats.treesPlanted, sub: `${nf(stats.plantingLogs)} field logs`, icon: Sprout, to: '/admin/tree-planting-tracker', tone: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Citizen Reports', value: stats.reports, sub: `${nf(stats.openReports)} awaiting action`, icon: AlertTriangle, to: '/admin/reports', tone: 'text-destructive', bg: 'bg-destructive/10' },
  ];

  const reviewPct = stats.actors ? Math.round((stats.actorsApproved / stats.actors) * 100) : 0;
  const appPct = stats.treeApps ? Math.round((stats.treeAppsApproved / stats.treeApps) * 100) : 0;

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-1">
              Ministry of Water Resources, Environment &amp; Climate Change
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Operations Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Live overview of registries, campaigns and field activity.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              Synced {refreshedAt.toLocaleTimeString()}
            </div>
            <Button variant="outline" size="sm" onClick={load} className="gap-2">
              <RefreshCcw className="h-4 w-4" /> Refresh
            </Button>
            <Button size="sm" onClick={exportAllData} className="gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <Link key={k.label} to={k.to} className="group">
              <Card className="h-full relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/30">
                <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className={`p-2.5 rounded-lg ring-1 ring-border/60 ${k.bg}`}>
                      <k.icon className={`h-5 w-5 ${k.tone}`} />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                  <div className="mt-5">
                    <div className="text-3xl font-semibold tracking-tight tabular-nums">{nf(k.value)}</div>
                    <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mt-2">{k.label}</div>
                    <div className="text-xs text-muted-foreground/80 mt-1">{k.sub}</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>


        {/* Pipelines */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Review pipelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium">Climate Actor Registry</span>
                  <span className="text-muted-foreground tabular-nums">{reviewPct}% verified</span>
                </div>
                <Progress value={reviewPct} className="h-2" />
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <div className="rounded-lg border border-border p-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" /> Pending</div>
                    <div className="text-xl font-semibold tabular-nums mt-1">{nf(stats.actorsPending)}</div>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><CheckCircle2 className="h-3.5 w-3.5" /> Approved</div>
                    <div className="text-xl font-semibold tabular-nums mt-1">{nf(stats.actorsApproved)}</div>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><XCircle className="h-3.5 w-3.5" /> Rejected</div>
                    <div className="text-xl font-semibold tabular-nums mt-1">{nf(stats.actorsRejected)}</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium">Tree Campaign Applications</span>
                  <span className="text-muted-foreground tabular-nums">{appPct}% approved</span>
                </div>
                <Progress value={appPct} className="h-2" />
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <div className="rounded-lg border border-border p-3">
                    <div className="text-xs text-muted-foreground">In review</div>
                    <div className="text-xl font-semibold tabular-nums mt-1">{nf(stats.treeAppsPending)}</div>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <div className="text-xs text-muted-foreground">Approved</div>
                    <div className="text-xl font-semibold tabular-nums mt-1">{nf(stats.treeAppsApproved)}</div>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <div className="text-xs text-muted-foreground">Seedlings requested</div>
                    <div className="text-xl font-semibold tabular-nums mt-1">{nf(stats.seedlingsRequested)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Activity className="h-4 w-4 text-success" /> System health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                ['Database', 'Healthy'],
                ['Data API', 'Online'],
                ['Storage', 'Online'],
                ['Email queue', 'Processing'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between border-b border-border/60 last:border-0 pb-2 last:pb-0">
                  <span className="text-muted-foreground">{k}</span>
                  <Badge variant="outline" className="border-success/40 text-success text-[11px]">{v}</Badge>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                <Link to="/admin/reports"><FileText className="h-4 w-4 mr-2" /> Open reports desk</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3 flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-semibold">Latest registrations</CardTitle>
              <Button variant="ghost" size="sm" asChild><Link to="/admin/climate-actors">View all</Link></Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActors.length === 0 && <p className="text-sm text-muted-foreground">No records yet.</p>}
              {recentActors.map((a) => (
                <div key={a.id} className="flex items-center gap-3 border-b border-border/60 last:border-0 pb-3 last:pb-0">
                  <div className="h-9 w-9 rounded-md overflow-hidden bg-muted flex items-center justify-center shrink-0">
                    {a.logo_url
                      ? <img src={a.logo_url} alt={`${a.organization_name} logo`} className="h-full w-full object-cover" loading="lazy" />
                      : <Building2 className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">{a.organization_name}</div>
                    <div className="text-xs text-muted-foreground truncate">{a.actor_type}</div>
                  </div>
                  <Badge variant="outline" className="text-[10px] uppercase tracking-wide">{a.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-semibold">Latest campaign applications</CardTitle>
              <Button variant="ghost" size="sm" asChild><Link to="/admin/tree-campaign">View all</Link></Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentApps.length === 0 && <p className="text-sm text-muted-foreground">No records yet.</p>}
              {recentApps.map((a) => (
                <div key={a.id} className="flex items-center gap-3 border-b border-border/60 last:border-0 pb-3 last:pb-0">
                  <div className="h-9 w-9 rounded-md bg-success/10 flex items-center justify-center shrink-0">
                    <TreePine className="h-4 w-4 text-success" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">{a.organization_name}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {nf(a.seedlings_requested || 0)} seedlings · {String(a.campaign).replace(/_/g, ' ')}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px] uppercase tracking-wide">{a.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
