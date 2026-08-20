import React from 'react';
import { Droplets } from 'lucide-react';
import PillarPage from '@/components/pillars/PillarPage';
import waterAsset from '@/assets/pillars/water-treatment-basins.jpg.asset.json';

const WaterSupplySanitation = () => (
  <PillarPage
    code="WSS"
    number="01"
    title="Water Supply & Sanitation"
    tagline="Reliable potable water and dignified sanitation for every household across all 44 Local Government Areas."
    heroImage={waterAsset.url}
    intro="The Ministry delivers safe, affordable and reliable water services from source to tap. Working with the Kano State Water Board, RUWASSA and development partners, we expand treatment capacity, rehabilitate distribution networks and extend sanitation to under-served communities in line with SDG 6."
    gradient="from-sky-500 to-cyan-600"
    accent="text-sky-700"
    chipBg="bg-sky-50"
    border="border-sky-200"
    icon={Droplets}
    mission="Guarantee universal access to safely-managed drinking water and sanitation services, prioritising equity, affordability and public health."
    approach="Rehabilitate and expand treatment plants, meter and reduce non-revenue water, extend rural boreholes, and enforce sanitation standards through integrated urban-rural planning."
    stats={[
      { value: '44', label: 'LGAs Covered' },
      { value: '150M', label: 'Litres / Day Capacity' },
      { value: '1,200+', label: 'Rural Boreholes' },
      { value: 'SDG 6', label: 'Aligned Mandate' },
    ]}
    focusAreas={[
      { title: 'Urban Water Treatment', text: 'Modernisation of Tamburawa, Challawa and Watari treatment plants with continuous quality assurance.' },
      { title: 'Rural Water Supply', text: 'Solar-powered boreholes and hand-pumps managed by community WASHCOMs in partnership with RUWASSA.' },
      { title: 'Network Rehabilitation', text: 'Zoning, metering and leak-reduction across the Kano metropolitan distribution grid.' },
      { title: 'Sanitation & Hygiene', text: 'Household latrine subsidies, school WASH facilities and Community-Led Total Sanitation (CLTS) roll-out.' },
      { title: 'Water Quality Surveillance', text: 'Routine microbiological and chemical testing at source, treatment and consumer points.' },
      { title: 'Tariff & Cost Recovery', text: 'Pro-poor tariff design and billing modernisation to sustain service delivery.' },
    ]}
    programs={[
      { title: 'Kano Urban Water Reform', text: 'Multi-year investment programme upgrading treatment, storage and distribution across the metropolis.' },
      { title: 'RUWASSA Rural Access', text: 'Community-managed rural water and sanitation services across the 44 LGAs.', href: '/agencies' },
      { title: 'Water Quality Dashboard', text: 'Public reporting of raw-water and treated-water quality parameters.', href: '/monitoring/water-quality' },
      { title: 'Report a Leak or Outage', text: 'Citizen reporting channel for burst mains, illegal connections and service interruptions.', href: '/report-issue' },
    ]}
    legalBasis={[
      'Kano State Water Board Edict',
      'National Water Resources Policy (2016)',
      'Sustainable Development Goal 6',
    ]}
  />
);

export default WaterSupplySanitation;
