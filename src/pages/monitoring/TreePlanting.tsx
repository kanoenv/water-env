import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TreeCampaignProgress from '@/components/campaigns/TreeCampaignProgress';
import { Button } from '@/components/ui/button';
import { TreePine, ArrowLeft, ArrowRight, Download, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const heroNursery = '/hero/ministry-nursery-rows.jpg';

const TreePlanting = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="admin-theme bg-background pt-16">
        {/* Institutional hero */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `url(${heroNursery})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />

          <div className="container-custom relative py-14 md:py-20">
            <Link
              to="/monitoring"
              className="group inline-flex items-center text-sm font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Monitoring Overview
            </Link>

            <div className="mt-8 max-w-3xl">
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
                <span className="h-px w-8 bg-accent" />
                Monitoring & Evaluation Directorate
              </div>

              <div className="mt-5 flex items-start gap-5">
                <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 sm:flex">
                  <TreePine className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h1 className="font-serif text-3xl font-black leading-tight md:text-5xl">
                    Tree Planting Progress Tracker
                  </h1>
                  <p className="mt-3 text-base text-primary-foreground/85 md:text-lg">
                    Official live reporting for the Kano State 10 Million Trees Planting Campaign —
                    organisation registrations, approvals, seedling distribution and GPS-verified plantings
                    across all 44 local government areas.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" variant="secondary">
                  <Link to="/programs/ten-million-trees">
                    Campaign overview
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link to="/programs/ten-million-trees/apply">Register your organisation</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="relative h-1 w-full bg-accent" />
        </section>

        {/* Live dashboard */}
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <TreeCampaignProgress />
          </div>
        </section>

        {/* Data notice */}
        <section className="border-t border-border bg-muted/40 py-10">
          <div className="container-custom flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-3 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-foreground">
                  Open data & verification
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                  Figures on this page are drawn directly from the ministry campaign database and refresh
                  on every page load. Consolidated reports are published in the Resources centre.
                </p>
              </div>
            </div>
            <Button asChild variant="outline">
              <Link to="/resources">
                <Download className="mr-2 h-4 w-4" />
                Resources & reports
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TreePlanting;
