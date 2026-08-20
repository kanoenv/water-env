// @ts-nocheck

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import registryHeroAsset from "@/assets/hero/ministry-field-visit.jpg.asset.json";
const registryHero = registryHeroAsset.url;

import {
  Search,
  Building2,
  MapPin,
  Globe,
  Users,
  CheckCircle2,
  LogIn,
  Plus,
  Shield,
  BarChart3,
  Handshake,
  Zap,
  Leaf,
  Recycle,
  Droplets,
  Wind,
  Trees,
  DollarSign,
  GraduationCap,
  AlertTriangle,
  Flame,
  Mail,
  Phone,
  Calendar,
  ArrowRight,
  SlidersHorizontal,
  Home,
  ChevronRight,
} from "lucide-react";


const SELECT_COLS =
  'id, actor_type, organization_name, focus_areas, year_established, lga_operations, description, contact_name, contact_email, contact_phone, website_url, logo_url, status, created_at, updated_at';

const FOCUS_ICONS: Record<string, any> = {
  'Renewable Energy': Zap,
  'Climate-Smart Agriculture': Leaf,
  'Waste Management': Recycle,
  'Water & Sanitation': Droplets,
  'Air-Quality Monitoring': Wind,
  'Biodiversity Conservation': Trees,
  'Green Finance': DollarSign,
  'Climate Education & Advocacy': GraduationCap,
  'Disaster Risk Reduction': AlertTriangle,
  'Clean Cooking Solutions': Flame,
};

const PAGE_SIZE = 12;

const ClimateActorRegistry = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'state_actor' | 'non_state_actor'>('all');
  const [focusFilter, setFocusFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [climateActors, setClimateActors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('climate_actors')
          .select(SELECT_COLS)
          .order('created_at', { ascending: false });
        if (error) throw error;
        setClimateActors(data || []);
      } catch {
        toast({ title: "Error", description: "Failed to load registry", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const approved = useMemo(
    () => climateActors.filter((a) => a.status === 'approved'),
    [climateActors]
  );

  const focusOptions = useMemo(() => {
    const set = new Set<string>();
    approved.forEach((a) => (a.focus_areas || []).forEach((f: string) => set.add(f)));
    return Array.from(set).sort();
  }, [approved]);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return approved.filter((a) => {
      if (typeFilter !== 'all' && a.actor_type !== typeFilter) return false;
      if (focusFilter !== 'all' && !(a.focus_areas || []).includes(focusFilter)) return false;
      if (!q) return true;
      return (
        (a.organization_name || '').toLowerCase().includes(q) ||
        (a.description || '').toLowerCase().includes(q) ||
        (a.lga_operations || []).join(' ').toLowerCase().includes(q) ||
        (a.focus_areas || []).join(' ').toLowerCase().includes(q)
      );
    });
  }, [approved, searchTerm, typeFilter, focusFilter]);

  useEffect(() => { setPage(1); }, [searchTerm, typeFilter, focusFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const lgaCount = useMemo(() => {
    const set = new Set<string>();
    approved.forEach((a) => (a.lga_operations || []).forEach((l: string) => set.add(l)));
    return set.size;
  }, [approved]);

  const stats = [
    { label: 'Verified actors', value: approved.length, icon: CheckCircle2 },
    { label: 'Focus areas covered', value: focusOptions.length, icon: Leaf },
    { label: 'LGAs with presence', value: lgaCount, icon: MapPin },
    { label: 'Total submissions', value: climateActors.length, icon: Building2 },
  ];

  const initials = (name: string) =>
    (name || '?')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();

  // Colour themes give every organisation card its own identity
  const CARD_THEMES = [
    { bar: 'from-emerald-500 to-teal-500', tint: 'from-emerald-50', ring: 'ring-emerald-200', avatar: 'bg-emerald-100 text-emerald-700', chip: 'bg-emerald-50 text-emerald-700 border-emerald-200', link: 'text-emerald-700' },
    { bar: 'from-sky-500 to-blue-600', tint: 'from-sky-50', ring: 'ring-sky-200', avatar: 'bg-sky-100 text-sky-700', chip: 'bg-sky-50 text-sky-700 border-sky-200', link: 'text-sky-700' },
    { bar: 'from-amber-400 to-orange-500', tint: 'from-amber-50', ring: 'ring-amber-200', avatar: 'bg-amber-100 text-amber-700', chip: 'bg-amber-50 text-amber-700 border-amber-200', link: 'text-amber-700' },
    { bar: 'from-violet-500 to-fuchsia-500', tint: 'from-violet-50', ring: 'ring-violet-200', avatar: 'bg-violet-100 text-violet-700', chip: 'bg-violet-50 text-violet-700 border-violet-200', link: 'text-violet-700' },
    { bar: 'from-rose-500 to-red-500', tint: 'from-rose-50', ring: 'ring-rose-200', avatar: 'bg-rose-100 text-rose-700', chip: 'bg-rose-50 text-rose-700 border-rose-200', link: 'text-rose-700' },
    { bar: 'from-cyan-500 to-emerald-500', tint: 'from-cyan-50', ring: 'ring-cyan-200', avatar: 'bg-cyan-100 text-cyan-700', chip: 'bg-cyan-50 text-cyan-700 border-cyan-200', link: 'text-cyan-700' },
  ];
  const themeFor = (key: string) => {
    let h = 0;
    for (let i = 0; i < (key || '').length; i++) h = (h * 31 + key.charCodeAt(i)) % 997;
    return CARD_THEMES[h % CARD_THEMES.length];
  };


  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero banner — mirrors the home page banner treatment */}
      <section className="relative overflow-hidden bg-kano-dark">
        <img
          src={registryHero}
          alt="Climate actors working across Kano State"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-kano-dark/95 via-kano-dark/85 to-kano-dark/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,193,7,0.20),_transparent_55%)]" />

        <div className="container-custom relative z-10 py-20 lg:py-28">
          <nav className="flex items-center text-sm text-white/70 mb-6 flex-wrap gap-y-1">
            <Link to="/" className="hover:text-kano-accent transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-white/40" />
            <span className="text-white">Climate-Actor Registry</span>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-kano-accent" />
            <span className="text-kano-accent uppercase tracking-[0.2em] text-xs font-semibold">
              Official Public Directory
            </span>
          </div>

          <h1
            className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight max-w-4xl"
            style={{ fontFamily: "'Merriweather', Georgia, serif" }}
          >
            Kano State <span className="text-kano-accent">Climate-Actor</span> Registry
          </h1>
          <p className="text-slate-200/90 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mt-5 font-light">
            A verified directory of government agencies, civil-society organisations, research groups and
            private-sector innovators driving a resilient, low-carbon Kano State.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button
              size="lg"
              onClick={() => navigate('/climate-actor-register')}
              className="bg-kano-primary hover:bg-kano-primary/90 text-white gap-2 shadow-lg"
            >
              <Plus className="h-4 w-4" /> Register Organisation
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/organization-login')}
              className="border-white/40 bg-white/10 text-white hover:bg-white hover:text-kano-dark gap-2 backdrop-blur-sm"
            >
              <LogIn className="h-4 w-4" /> Organisation Login
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-xs text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-kano-accent" /> Ministry-verified entries
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-kano-accent" /> Open to all 44 LGAs
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-kano-accent" /> Updated weekly
            </span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-kano-primary via-kano-accent to-kano-primary" />
      </section>


      {/* Stats strip */}
      <section className="border-b border-border bg-card">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border/70">
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-6 md:px-6 md:py-8">
                <div className="flex items-center gap-2 text-muted-foreground text-[11px] uppercase tracking-[0.18em]">
                  <s.icon className="h-3.5 w-3.5" /> {s.label}
                </div>
                <div className="mt-2 text-3xl md:text-4xl font-semibold tabular-nums tracking-tight">
                  {loading ? '—' : s.value.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directory */}
      <section id="registry-section" className="py-14 md:py-20">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 border-b border-border pb-6 mb-8">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                Section 01 — Registered Organisations
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">The Directory</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Verified weekly by the Ministry of Water Resources, Environment and Climate Change.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" onClick={() => navigate('/organization-login')} className="gap-2">
                <LogIn className="h-4 w-4" /> Organisation Login
              </Button>
              <Button onClick={() => navigate('/climate-actor-register')} className="gap-2">
                <Plus className="h-4 w-4" /> Register Organisation
              </Button>
            </div>
          </div>

          {/* Filter bar */}
          <Card className="mb-8 border-border">
            <CardContent className="p-4 md:p-5 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by organisation, focus area or local government area…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground mr-1">
                  <SlidersHorizontal className="h-3.5 w-3.5" /> Filter
                </span>
                {[
                  { k: 'all', l: 'All actors' },
                  { k: 'state_actor', l: 'State actors' },
                  { k: 'non_state_actor', l: 'Non-state actors' },
                ].map((t) => (
                  <button
                    key={t.k}
                    onClick={() => setTypeFilter(t.k as any)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                      typeFilter === t.k
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                    }`}
                  >
                    {t.l}
                  </button>
                ))}
                <span className="mx-1 hidden md:inline h-4 w-px bg-border" />
                <select
                  value={focusFilter}
                  onChange={(e) => setFocusFilter(e.target.value)}
                  className="text-xs bg-background border border-border rounded-full px-3 py-1.5 text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All focus areas</option>
                  {focusOptions.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between mb-5 text-sm text-muted-foreground">
            <span>
              {loading ? 'Loading registry…' : `${filtered.length.toLocaleString()} verified organisation${filtered.length !== 1 ? 's' : ''}`}
            </span>
            {!loading && pageCount > 1 && <span className="tabular-nums">Page {page} of {pageCount}</span>}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-56 rounded-lg border border-border bg-muted/40 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <Building2 className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-1">No organisations match your filters</h3>
                <p className="text-sm text-muted-foreground mb-5">Adjust your search or clear the filters to view the full directory.</p>
                <Button variant="outline" onClick={() => { setSearchTerm(''); setTypeFilter('all'); setFocusFilter('all'); }}>
                  Clear filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {visible.map((actor) => {
                const theme = themeFor(actor.organization_name || actor.id);
                return (
                <Card
                  key={actor.id}
                  className={`group relative overflow-hidden border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${theme.ring} hover:ring-2`}
                >
                  <span className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${theme.bar}`} />
                  <span className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${theme.tint} to-transparent opacity-60`} />
                  <CardContent className="relative p-5 pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-14 w-14 rounded-xl ring-2 ring-white shadow-md">
                        <AvatarImage src={actor.logo_url || undefined} alt={`${actor.organization_name} logo`} className="object-cover" />
                        <AvatarFallback className={`rounded-xl ${theme.avatar} text-sm font-bold`}>
                          {initials(actor.organization_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold leading-snug line-clamp-2" title={actor.organization_name}>
                          {actor.organization_name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          <Badge className="text-[10px] uppercase tracking-wide bg-emerald-600 hover:bg-emerald-600 text-white gap-1 border-0">
                            <CheckCircle2 className="h-3 w-3" /> Verified
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`text-[10px] uppercase tracking-wide ${
                              actor.actor_type === 'state_actor'
                                ? 'border-blue-300 bg-blue-50 text-blue-700'
                                : 'border-amber-300 bg-amber-50 text-amber-700'
                            }`}
                          >
                            {actor.actor_type === 'state_actor' ? 'State Actor' : 'Non-State Actor'}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {actor.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed mt-4 line-clamp-3">
                        {actor.description}
                      </p>
                    )}

                    <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                      {actor.lga_operations?.length > 0 && (
                        <div className="flex items-start gap-2">
                          <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                          <span className="truncate">
                            {actor.lga_operations.slice(0, 3).join(', ')}
                            {actor.lga_operations.length > 3 && ` +${actor.lga_operations.length - 3}`}
                          </span>
                        </div>
                      )}
                      {actor.year_established && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 shrink-0" /> Established {actor.year_established}
                        </div>
                      )}
                    </div>

                    {actor.focus_areas?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border/70">
                        {actor.focus_areas.slice(0, 3).map((area: string, i: number) => {
                          const Icon = FOCUS_ICONS[area] || Leaf;
                          return (
                            <span key={i} className={`inline-flex items-center gap-1 text-[11px] rounded-full border px-2.5 py-1 ${theme.chip}`}>
                              <Icon className="h-3 w-3" /> {area}
                            </span>
                          );
                        })}
                        {actor.focus_areas.length > 3 && (
                          <span className={`text-[11px] rounded-full border px-2.5 py-1 ${theme.chip}`}>
                            +{actor.focus_areas.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {actor.website_url && (
                      <a
                        href={actor.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold ${theme.link} hover:underline mt-4`}
                      >
                        <Globe className="h-3.5 w-3.5" /> Visit website
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    )}
                  </CardContent>
                </Card>
                );
              })}

            </div>
          )}

          {!loading && pageCount > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                Previous
              </Button>
              <span className="text-sm text-muted-foreground tabular-nums px-3">
                {page} / {pageCount}
              </span>
              <Button variant="outline" size="sm" disabled={page === pageCount} onClick={() => setPage((p) => p + 1)}>
                Next
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Why register */}
      <section className="py-14 md:py-20 bg-muted/40 border-y border-border">
        <div className="container-custom">
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
            Section 02 — Benefits
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-10">Why join the registry</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Shield, title: 'Visibility & credibility', text: 'Appear in the official, publicly accessible state directory.' },
              { icon: Handshake, title: 'Collaboration', text: 'Find partners for projects, grants and joint research.' },
              { icon: Users, title: 'Policy influence', text: 'Receive invitations to consultations and technical working groups.' },
              { icon: BarChart3, title: 'Data insights', text: 'Access aggregated climate-action metrics for Kano State.' },
            ].map((b) => (
              <Card key={b.title} className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <b.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1.5">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 md:py-20">
        <div className="container-custom">
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
            Section 03 — Accreditation Process
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-10">Three steps to listing</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              ['01', 'Submit the form', 'Provide organisation details, verifiable contacts and focus areas.'],
              ['02', 'Ministry verification', 'Our accreditation team reviews submissions within five working days.'],
              ['03', 'Approval & listing', 'Approved actors are published publicly; others receive written feedback.'],
            ].map(([n, t, d]) => (
              <Card key={n} className="border-border">
                <CardContent className="p-6">
                  <div className="text-3xl font-semibold text-primary/25 tabular-nums">{n}</div>
                  <h3 className="font-semibold mt-2 mb-1.5">{t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 rounded-lg border border-border bg-muted/40 p-5 text-sm text-muted-foreground">
            <strong className="text-foreground">Minimum criteria:</strong> operate (or plan to operate) within Kano State, hold a verifiable contact, and work in at least one climate- or environment-related area.
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Mail, label: 'Technical support', value: 'admin@environment.kn.gov.ng' },
              { icon: Building2, label: 'Policy enquiries', value: 'climatechange@environment.kn.gov.ng' },
              { icon: Phone, label: 'Telephone (Mon–Fri, 9am–4pm)', value: '+234 803 071 9901' },
            ].map((c) => (
              <Card key={c.label} className="border-border">
                <CardContent className="p-5 flex items-start gap-3">
                  <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                    <c.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{c.label}</div>
                    <div className="text-sm font-medium break-all mt-0.5">{c.value}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClimateActorRegistry;
