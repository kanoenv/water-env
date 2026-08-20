import React from 'react';
import { Droplets, TreePine, Globe, ShieldCheck } from 'lucide-react';

const figures = [
  { icon: Droplets, value: '24/7', label: 'Water Supply Target', note: 'Kano Water Project' },
  { icon: TreePine, value: '20M', label: 'Trees by 2030', note: '10M in the 2026 drive' },
  { icon: Globe, value: '44', label: 'Local Governments', note: 'Statewide coverage' },
  { icon: ShieldCheck, value: '6', label: 'Strategic Pillars', note: 'Ministry mandate' },
];

const KeyFigures = () => {
  return (
    <section className="bg-slate-50 border-y border-slate-200">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-x divide-slate-200 lg:divide-y-0">
          {figures.map(({ icon: Icon, value, label, note }) => (
            <div key={label} className="flex items-start gap-4 p-6 lg:p-8 first:border-l-0">
              <div className="w-11 h-11 rounded-xl bg-kano-primary/10 border border-kano-primary/20 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-kano-primary" />
              </div>
              <div className="min-w-0">
                <div className="text-2xl lg:text-3xl font-bold text-slate-900 leading-none tracking-tight">{value}</div>
                <div className="text-[13px] font-semibold text-slate-700 mt-2">{label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFigures;
