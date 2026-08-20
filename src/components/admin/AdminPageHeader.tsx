import React from 'react';
import { Link } from 'react-router-dom';
import ministrySeal from '@/assets/kano-ministry-seal.png.asset.json';
import { ChevronRight } from 'lucide-react';

interface AdminPageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumb?: { label: string; to?: string }[];
}

const AdminPageHeader = ({ eyebrow = 'Administrative Console', title, description, actions, breadcrumb }: AdminPageHeaderProps) => (
  <section className="relative overflow-hidden rounded-xl border border-border bg-card">
    <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
    <div className="flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between md:p-6">
      <div className="flex items-start gap-4 min-w-0">
        <div className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
          <img src={ministrySeal.url} alt="Ministry seal" className="h-11 w-11 object-contain" />
        </div>
        <div className="min-w-0">
          {breadcrumb && breadcrumb.length > 0 && (
            <nav className="mb-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
              {breadcrumb.map((c, i) => (
                <span key={c.label} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="h-3 w-3 opacity-60" />}
                  {c.to ? (
                    <Link to={c.to} className="hover:text-foreground transition-colors">{c.label}</Link>
                  ) : (
                    <span>{c.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</div>
          <h1 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight truncate">{title}</h1>
          {description && (
            <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">{description}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div>}
    </div>
  </section>
);

export default AdminPageHeader;
