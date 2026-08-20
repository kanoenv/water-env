import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/layout/PageHero';
import PdfViewer from '@/components/resources/PdfViewer';
import { FileText, Scale, Globe, ShieldCheck, Download, BookMarked, Archive, Users } from 'lucide-react';

const stats = [
  { icon: Archive, value: '5', label: 'Official Documents', code: 'DOC' },
  { icon: Scale, value: '2022–2025', label: 'Coverage Period', code: 'YR' },
  { icon: Globe, value: 'Bilingual', label: 'English & Hausa', code: 'LANG' },
  { icon: ShieldCheck, value: 'Free', label: 'Public Access', code: 'ACC' },
];

const Resources = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <PageHero
          eyebrow="Resources & Legal Framework"
          title="Environmental Resources & Documentation"
          subtitle="Access the official laws, regulations and policy instruments that guide environmental protection and sustainable development across Kano State."
          backgroundImage="/lovable-uploads/0d3d1165-7047-471a-9bcb-114fda7427da.png"
          breadcrumbs={[{ label: 'Resources' }]}
        />

        {/* Stats strip */}
        <section className="bg-white border-b border-slate-200">
          <div className="container-custom py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="flex items-center gap-4 p-5 rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50">
                  <div className="w-12 h-12 rounded-lg bg-kano-primary/10 text-kano-primary flex items-center justify-center flex-shrink-0">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-kano-primary tracking-widest">{s.code}</div>
                    <div className="font-bold text-slate-900 text-lg leading-tight truncate">{s.value}</div>
                    <div className="text-xs text-slate-600">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Framework intro */}
        <section className="py-16 bg-slate-50">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-10 bg-kano-accent" />
                  <span className="text-kano-primary uppercase tracking-[0.2em] text-xs font-semibold">Section 01</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
                  Official Legal Framework
                </h2>
              </div>
              <div className="lg:col-span-2 space-y-4 text-slate-700 leading-relaxed">
                <p className="text-lg">
                  Our archive of environmental legislation, regulations and policy instruments forms the backbone of environmental
                  protection and sustainable development in Kano State.
                </p>
                <p>
                  Every document is published in its authentic, gazetted form — serving as an essential reference for compliance
                  officers, enforcement agencies, investors, researchers, community leaders and the public.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 pt-4">
                  {[
                    { icon: Scale, label: 'Statutory Instruments' },
                    { icon: BookMarked, label: 'Policy Documents' },
                    { icon: Users, label: 'Community Guides (Hausa)' },
                    { icon: ShieldCheck, label: 'Regulations & Standards' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-slate-200">
                      <item.icon className="w-5 h-5 text-kano-primary" />
                      <span className="text-sm font-medium text-slate-800">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Documents */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-10 bg-kano-accent" />
                  <span className="text-kano-primary uppercase tracking-[0.2em] text-xs font-semibold">Section 02</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
                  Environmental Law Documents
                </h2>
                <p className="text-slate-600 mt-2 max-w-2xl">
                  Download official environmental laws, regulations and policy documents. All files are provided in PDF format.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 border border-slate-200 rounded-full px-4 py-2">
                <Download className="w-4 h-4 text-kano-primary" />
                Verified · Government Published
              </div>
            </div>

            <PdfViewer />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-kano-primary to-kano-secondary text-white py-14">
          <div className="container-custom flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-6 h-6 text-kano-accent" />
                <span className="uppercase tracking-[0.2em] text-xs font-semibold text-kano-accent">Need a specific record?</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
                Request archived legislation, policies or reports
              </h3>
              <p className="text-white/85 mt-2">
                Our records office responds to written requests from citizens, researchers and partners.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-kano-accent text-kano-dark font-semibold px-6 py-3 rounded-lg hover:bg-kano-accent/90 transition-colors"
            >
              Contact Records Office
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
