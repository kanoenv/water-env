import React from 'react';
import { Recycle } from 'lucide-react';
import PillarPage from '@/components/pillars/PillarPage';

const WasteCircular = () => (
  <PillarPage
    code="WCE"
    number="06"
    title="Waste & Circular Economy"
    tagline="From collection to compost — turning Kano's waste into value while keeping our streets clean."
    heroImage="/lovable-uploads/3535207a-22a2-4c6f-927f-fe7c22998e18.png"
    intro="The Ministry leads a citywide shift from linear waste disposal to a circular economy. Through REMASAB collection systems, the Dorayi Compost Plant and partnerships with UNIDO and the EU, we recover organic and recyclable materials and create green jobs."
    gradient="from-emerald-600 to-green-700"
    accent="text-emerald-700"
    chipBg="bg-emerald-50"
    border="border-emerald-200"
    icon={Recycle}
    mission="Deliver reliable waste services and transition Kano toward a circular economy that recovers materials, energy and value."
    approach="Modernise collection, invest in sorting and composting infrastructure, formalise the informal recycling sector, and integrate producers through extended producer responsibility."
    stats={[
      { value: '2,500', label: 'Tonnes / Day Collected' },
      { value: '1', label: 'Compost Plant' },
      { value: 'UNIDO', label: 'Circular Partner' },
      { value: 'EU', label: 'Co-Financier' },
    ]}
    focusAreas={[
      { title: 'Municipal Waste Collection', text: 'REMASAB-led daily collection routes across Kano metropolis and satellite towns.' },
      { title: 'Organic Waste & Compost', text: 'Dorayi Compost Plant processing market and household organic waste into fertiliser.' },
      { title: 'Recycling & Materials Recovery', text: 'Plastic, paper, metal and e-waste recovery through formal and informal partnerships.' },
      { title: 'Landfill Management', text: 'Modernisation of disposal sites with leachate control and gas capture.' },
      { title: 'Circular Economy Policy', text: 'Extended producer responsibility, single-use plastic policy and green procurement.' },
      { title: 'Public Sensitisation', text: 'Source-separation campaigns and school-based waste literacy.' },
    ]}
    programs={[
      { title: 'REMASAB', text: 'Refuse Management and Sanitation Board — the Ministry\u2019s waste operations agency.', href: '/programs/remasab' },
      { title: 'Dorayi Compost Plant', text: 'Flagship organic-waste-to-compost facility for Kano metropolis.', href: '/programs/dorayi-compost-plant' },
      { title: 'Waste Management Programme', text: 'Integrated waste programme covering collection, transport and disposal.', href: '/programs/waste-management' },
      { title: 'UNIDO / EU Circular Economy', text: 'Statewide circular economy transition supported by UNIDO and the European Union.', href: '/news' },
    ]}
    legalBasis={[
      'Kano State Environmental Sanitation Law',
      'REMASAB Establishment Edict',
      'National Policy on Solid Waste Management',
    ]}
  />
);

export default WasteCircular;
