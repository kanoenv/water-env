import React, { useCallback, useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  TreePine,
  Users,
  MapPin,
  Target,
  Calendar,
  TrendingUp,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Search,
  Building2,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

const TREE_TARGET = 10_000_000;
const PAGE_SIZE = 12;

type Stats = {
  registered: number;
  approved: number;
  pending: number;
  seed_records: number;
  total_seeds: number;
  planted: number;
  log_entries: number;
  sites: number;
  survival: number;
};

type DirectoryRow = {
  organization_name: string;
  address: string | null;
  status: string;
  organization_type: string | null;
};

const emptyStats: Stats = {
  registered: 0,
  approved: 0,
  pending: 0,
  seed_records: 0,
  total_seeds: 0,
  planted: 0,
  log_entries: 0,
  sites: 0,
  survival: 0,
};

const galleryImages = [
  { src: '/hero/ministry-nursery-rows.jpg', caption: 'State nursery rows' },
  { src: '/hero/ministry-seedling-beds.jpg', caption: 'Seedling beds' },
  { src: '/hero/ministry-commissioner-planting.jpg', caption: 'Community planting' },
  { src: '/hero/ministry-field-visit.jpg', caption: 'Field monitoring' },
];

const initials = (name: string) =>
  name
    .replace(/[^a-zA-Z ]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('') || 'ORG';

const TYPE_LABELS: Record<string, string> = {
  community: 'Community group',
  ngo: 'NGO / Non-profit',
  school: 'School / Institution',
  corporate: 'Corporate',
  government: 'Government agency',
  other: 'Other',
};

const typeLabel = (v: string) => TYPE_LABELS[v] ?? v.replace(/\b\w/g, (c) => c.toUpperCase());

type Facet = { value: string; count: number };

const TreeCampaignProgress = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>(emptyStats);

  const [dirLoading, setDirLoading] = useState(true);
  const [rows, setRows] = useState<DirectoryRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState<'approved' | 'pending' | 'all'>('approved');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [facets, setFacets] = useState<{ types: Facet[]; locations: Facet[] }>({ types: [], locations: [] });

  useEffect(() => {
    (async () => {
      const { data } = await (supabase as any).rpc('get_tree_campaign_public_stats');
      if (data) setStats({ ...emptyStats, ...(data as Stats) });
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await (supabase as any).rpc('get_tree_campaign_directory_facets', {
        _status: statusFilter,
      });
      if (data) setFacets({ types: data.types || [], locations: data.locations || [] });
    })();
  }, [statusFilter]);

  const loadDirectory = useCallback(async () => {
    setDirLoading(true);
    const args = {
      _search: search || null,
      _status: statusFilter,
      _type: typeFilter,
      _location: locationFilter,
    };
    const [listRes, countRes] = await Promise.all([
      (supabase as any).rpc('get_tree_campaign_directory', {
        ...args,
        _limit: PAGE_SIZE,
        _offset: page * PAGE_SIZE,
      }),
      (supabase as any).rpc('get_tree_campaign_directory_count', args),
    ]);
    setRows((listRes.data as DirectoryRow[]) || []);
    setTotal(Number(countRes.data) || 0);
    setDirLoading(false);
  }, [search, statusFilter, typeFilter, locationFilter, page]);

  useEffect(() => {
    loadDirectory();
  }, [loadDirectory]);

  const progressPercentage = Math.min(100, (stats.planted / TREE_TARGET) * 100);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const activeFilters = [
    search && { key: 'search', label: `“${search}”`, clear: () => { setSearch(''); setSearchInput(''); } },
    typeFilter !== 'all' && { key: 'type', label: typeLabel(typeFilter), clear: () => setTypeFilter('all') },
    locationFilter !== 'all' && { key: 'location', label: locationFilter, clear: () => setLocationFilter('all') },
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[];

  const resetFilters = () => {
    setSearch('');
    setSearchInput('');
    setTypeFilter('all');
    setLocationFilter('all');
    setPage(0);
  };


  const tones = {
    emerald: { ring: 'hover:border-emerald-500/40', bar: 'from-emerald-500 to-emerald-300', icon: 'bg-emerald-500/10 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white', value: 'text-emerald-700', glow: 'bg-emerald-500/10' },
    teal: { ring: 'hover:border-teal-500/40', bar: 'from-teal-500 to-teal-300', icon: 'bg-teal-500/10 text-teal-700 group-hover:bg-teal-600 group-hover:text-white', value: 'text-teal-700', glow: 'bg-teal-500/10' },
    amber: { ring: 'hover:border-amber-500/40', bar: 'from-amber-500 to-amber-300', icon: 'bg-amber-500/10 text-amber-700 group-hover:bg-amber-600 group-hover:text-white', value: 'text-amber-700', glow: 'bg-amber-500/10' },
    sky: { ring: 'hover:border-sky-500/40', bar: 'from-sky-500 to-sky-300', icon: 'bg-sky-500/10 text-sky-700 group-hover:bg-sky-600 group-hover:text-white', value: 'text-sky-700', glow: 'bg-sky-500/10' },
    lime: { ring: 'hover:border-lime-500/40', bar: 'from-lime-500 to-lime-300', icon: 'bg-lime-500/10 text-lime-700 group-hover:bg-lime-600 group-hover:text-white', value: 'text-lime-700', glow: 'bg-lime-500/10' },
    violet: { ring: 'hover:border-violet-500/40', bar: 'from-violet-500 to-violet-300', icon: 'bg-violet-500/10 text-violet-700 group-hover:bg-violet-600 group-hover:text-white', value: 'text-violet-700', glow: 'bg-violet-500/10' },
  } as const;

  const cards = [
    { icon: Users, label: 'Organisations Registered', value: stats.registered, note: 'Applications received statewide', tone: 'emerald' as const },
    { icon: CheckCircle2, label: 'Approved Partners', value: stats.approved, note: 'Cleared for seedling allocation', tone: 'teal' as const },
    { icon: Clock, label: 'Pending Review', value: stats.pending, note: 'Awaiting ministry verification', tone: 'amber' as const },
    { icon: Target, label: 'Seedlings Allocated', value: stats.total_seeds, note: `${stats.seed_records.toLocaleString()} distribution records`, tone: 'sky' as const },
    { icon: TreePine, label: 'Trees Logged', value: stats.planted, note: `${stats.log_entries.toLocaleString()} verified field entries`, tone: 'lime' as const },
    { icon: MapPin, label: 'Active Planting Sites', value: stats.sites, note: 'Across the 44 local government areas', tone: 'violet' as const },
  ];


  return (
    <div className="space-y-14">
      {/* Headline progress panel with imagery */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-8 md:p-10">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Live campaign progress
            </div>

            <div className="mt-6 flex items-end gap-4">
              <div className="font-serif text-5xl font-black leading-none text-primary md:text-6xl">
                {progressPercentage.toFixed(2)}%
              </div>
              <p className="pb-2 text-sm text-muted-foreground">of the 2026 statewide target</p>
            </div>

            <Progress value={progressPercentage} className="mt-6 h-3" />
            <div className="mt-3 flex justify-between text-xs font-medium text-muted-foreground">
              <span>{loading ? '—' : stats.planted.toLocaleString()} trees logged</span>
              <span>{TREE_TARGET.toLocaleString()} target</span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-muted/40 p-5">
                <TrendingUp className="mb-3 h-5 w-5 text-primary" />
                <div className="font-serif text-3xl font-bold text-foreground">{stats.survival}%</div>
                <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">Survival rate</p>
              </div>
              <div className="rounded-xl border border-border bg-muted/40 p-5">
                <ShieldCheck className="mb-3 h-5 w-5 text-primary" />
                <div className="font-serif text-3xl font-bold text-foreground">
                  {loading ? '—' : stats.approved.toLocaleString()}
                </div>
                <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">Verified partners</p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[280px]">
            <img
              src="/hero/ministry-nursery-rows.jpg"
              alt="Seedling rows at the Kano State ministry nursery"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                10 Million Trees · 2026
              </p>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/90">
                Seedlings raised in state nurseries and distributed to verified partner organisations
                across Kano State.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Indicator cards */}
      <div>
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Key indicators
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => {
            const Icon = c.icon;
            const t = tones[c.tone];
            return (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl ${t.ring}`}
              >
                <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${t.bar}`} />
                <span className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl transition-opacity ${t.glow} opacity-70 group-hover:opacity-100`} />
                <div className="relative flex items-start justify-between">
                  <div className={`rounded-xl p-3 ring-1 ring-border/60 transition-colors ${t.icon}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className={`relative mt-6 font-serif text-3xl font-bold tabular-nums ${t.value}`}>
                  {loading ? <Skeleton className="h-8 w-24" /> : c.value.toLocaleString()}
                </div>
                <p className="relative mt-2 text-sm font-semibold text-foreground">{c.label}</p>
                <p className="relative mt-1 text-xs leading-relaxed text-muted-foreground">{c.note}</p>
              </div>
            );
          })}

        </div>
      </div>

      {/* Partner directory */}
      <div>
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
              Participating organisations
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-foreground md:text-3xl">
              Registered & Approved Partner Directory
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Public listing of organisations enrolled in the campaign. Only organisation names and
              addresses are published — contact details remain confidential.
            </p>
          </div>

          <div className="text-left md:text-right">
            <div className="font-serif text-3xl font-bold tabular-nums text-foreground">
              {dirLoading ? '—' : total.toLocaleString()}
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Organisations listed
            </p>
          </div>
        </div>

        {/* Advanced filter panel */}
        <div className="mb-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
            Refine the directory
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setPage(0);
                    setSearch(searchInput.trim());
                  }
                }}
                placeholder="Search organisation name or address"
                className="pl-9"
                aria-label="Search organisation name or address"
              />
            </div>

            <Select
              value={typeFilter}
              onValueChange={(v) => {
                setTypeFilter(v);
                setPage(0);
              }}
            >
              <SelectTrigger aria-label="Filter by organisation type">
                <Building2 className="mr-2 h-4 w-4 shrink-0 text-primary" />
                <SelectValue placeholder="Organisation type" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                <SelectItem value="all">All organisation types</SelectItem>
                {facets.types.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {typeLabel(t.value)} ({t.count.toLocaleString()})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={locationFilter}
              onValueChange={(v) => {
                setLocationFilter(v);
                setPage(0);
              }}
            >
              <SelectTrigger aria-label="Filter by location">
                <MapPin className="mr-2 h-4 w-4 shrink-0 text-primary" />
                <SelectValue placeholder="Location (LGA)" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                <SelectItem value="all">All locations</SelectItem>
                {facets.locations.map((l) => (
                  <SelectItem key={l.value} value={l.value}>
                    {l.value} ({l.count.toLocaleString()})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              className="lg:px-6"
              onClick={() => {
                setPage(0);
                setSearch(searchInput.trim());
              }}
            >
              Apply
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-dashed border-border pt-4">
            {(
              [
                ['approved', 'Approved partners'],
                ['pending', 'Pending review'],
                ['all', 'All registrations'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => {
                  setStatusFilter(key);
                  setPage(0);
                }}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  statusFilter === key
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}

            {activeFilters.length > 0 && (
              <>
                <span className="mx-1 hidden h-5 w-px bg-border sm:block" />
                {activeFilters.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => {
                      f.clear();
                      setPage(0);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                  >
                    {f.label}
                    <X className="h-3 w-3" />
                  </button>
                ))}
                <button
                  onClick={resetFilters}
                  className="text-xs font-semibold uppercase tracking-wide text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Clear all
                </button>
              </>
            )}

            <span className="ml-auto self-center text-xs text-muted-foreground">
              {dirLoading ? 'Loading…' : `${total.toLocaleString()} organisations`}
            </span>
          </div>
        </div>


        {dirLoading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-2xl" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center">
            <Building2 className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-3 text-sm text-muted-foreground">
              No organisations match your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((org, i) => {
              const isApproved = ['approved', 'seeds_distributed', 'completed'].includes(org.status);
              const palette = [
                { av: 'from-emerald-600 to-emerald-400', tint: 'from-emerald-500/10', pin: 'text-emerald-600', edge: 'hover:border-emerald-500/40' },
                { av: 'from-teal-600 to-teal-400', tint: 'from-teal-500/10', pin: 'text-teal-600', edge: 'hover:border-teal-500/40' },
                { av: 'from-sky-600 to-sky-400', tint: 'from-sky-500/10', pin: 'text-sky-600', edge: 'hover:border-sky-500/40' },
                { av: 'from-lime-600 to-lime-400', tint: 'from-lime-500/10', pin: 'text-lime-700', edge: 'hover:border-lime-500/40' },
                { av: 'from-amber-600 to-amber-400', tint: 'from-amber-500/10', pin: 'text-amber-600', edge: 'hover:border-amber-500/40' },
                { av: 'from-violet-600 to-violet-400', tint: 'from-violet-500/10', pin: 'text-violet-600', edge: 'hover:border-violet-500/40' },
              ][i % 6];
              return (
                <article
                  key={`${org.organization_name}-${i}`}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl ${palette.edge}`}
                >
                  <span className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${palette.tint} to-transparent`} />
                  <div className="relative flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${palette.av} text-sm font-bold text-white shadow-sm`}>
                      {initials(org.organization_name)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-serif text-base font-bold leading-snug text-foreground">
                        {org.organization_name}
                      </h3>
                      {org.organization_type && (
                        <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                          {org.organization_type}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="relative mt-5 flex items-start gap-2 border-t border-dashed border-border pt-4 text-sm text-muted-foreground">
                    <MapPin className={`mt-0.5 h-4 w-4 shrink-0 ${palette.pin}`} />
                    <span className="leading-relaxed">{org.address || 'Address not provided'}</span>
                  </div>

                  <div className="relative mt-auto pt-5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 ${
                        isApproved
                          ? 'bg-emerald-500/10 text-emerald-700 ring-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-700 ring-amber-500/20'
                      }`}
                    >
                      {isApproved ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                      {isApproved ? 'Approved partner' : 'Pending review'}
                    </span>
                  </div>
                </article>
              );
            })}

          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page + 1} of {totalPages.toLocaleString()}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page + 1 >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Field gallery */}
      <div>
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            From the field
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {galleryImages.map((img) => (
            <figure key={img.src} className="group relative overflow-hidden rounded-2xl border border-border">
              <img
                src={img.src}
                alt={img.caption}
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/85 to-transparent p-4 text-xs font-medium text-background">
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Campaign status + methodology */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            Campaign status
          </div>
          <dl className="mt-5 space-y-3 text-sm">
            {[
              ['Campaign', '10 Million Trees · 2026'],
              ['Current phase', 'Registration & seedling distribution'],
              ['Verification', 'GPS + photographic evidence'],
              ['Previous milestone', '5M Trees · 75% survival'],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between border-b border-dashed border-border pb-3 last:border-0 last:pb-0"
              >
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-medium text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-2xl border border-border bg-muted/40 p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            How these figures are produced
          </div>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            {[
              'Organisation registrations are captured through the official campaign portal.',
              'Seedling allocations are recorded by ministry officers at distribution points.',
              'Field planters log each planting with GPS coordinates and photographs.',
              'Survival rate is derived from monitoring visits and partner field reports.',
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TreeCampaignProgress;
