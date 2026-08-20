import React from 'react';
import { FileText } from 'lucide-react';
import PillarPage from '@/components/pillars/PillarPage';

const PolicyGovernance = () => (
  <PillarPage
    code="PGV"
    number="03"
    title="Policy & Governance"
    tagline="Coordinated water, environment and climate policy aligned with national strategy and global commitments."
    heroImage="/lovable-uploads/3535207a-22a2-4c6f-927f-fe7c22998e18.png"
    intro="The Ministry sets the policy, regulatory and institutional framework that governs water, environment and climate action across Kano State — ensuring alignment with Federal law, the Paris Agreement and Nigeria's Nationally Determined Contributions."
    gradient="from-slate-700 to-slate-900"
    accent="text-slate-800"
    chipBg="bg-slate-50"
    border="border-slate-300"
    icon={FileText}
    mission="Provide the legal, regulatory and coordination architecture that enables every other pillar to deliver at scale."
    approach="Draft and review legislation, coordinate agencies and MDAs, mainstream climate and environment into state planning, and enforce compliance through transparent processes."
    stats={[
      { value: '10+', label: 'Active Statutes' },
      { value: '7', label: 'Agencies Coordinated' },
      { value: '44', label: 'LGA Focal Officers' },
      { value: 'NDC', label: 'Aligned' },
    ]}
    focusAreas={[
      { title: 'Legislation & Regulation', text: 'Drafting, review and enforcement of state environmental, water and climate statutes.' },
      { title: 'Institutional Coordination', text: 'Oversight of parastatals including REMASAB, KNAP, WECCMA, SKP and RUWASSA.' },
      { title: 'Planning & Budgeting', text: 'Mainstreaming environmental and climate priorities into the State Development Plan.' },
      { title: 'Standards & Compliance', text: 'Effluent, emissions and abstraction standards backed by enforceable penalties.' },
      { title: 'Public Participation', text: 'Stakeholder consultation, freedom of information and citizen reporting channels.' },
      { title: 'International Reporting', text: 'Contributions to Nigeria\u2019s NDC, National Communications and SDG reviews.' },
    ]}
    programs={[
      { title: 'Kano Climate Action Plan', text: 'Statewide policy framework for mitigation, adaptation and just-transition action.', href: '/programs/climate-action-plan' },
      { title: 'Climate Actor Registry', text: 'Registration of NGOs, businesses and communities delivering climate action in Kano.', href: '/climate-actor-registry' },
      { title: 'Laws & Guidelines', text: 'Public library of environmental laws, regulations and technical guidelines.', href: '/resources/laws' },
      { title: 'Public Reports', text: 'Annual reports and sectoral performance reviews.', href: '/resources' },
    ]}
    legalBasis={[
      'Kano State Environmental Protection Law',
      'National Climate Change Act (2021)',
      'Paris Agreement & Nigeria NDC',
    ]}
  />
);

export default PolicyGovernance;
