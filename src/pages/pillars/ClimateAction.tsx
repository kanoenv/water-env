import React from 'react';
import { ThermometerSnowflake } from 'lucide-react';
import PillarPage from '@/components/pillars/PillarPage';
import heroAsset from '@/assets/hero/hero-greening.jpg.asset.json';

const ClimateAction = () => (
  <PillarPage
    code="CLA"
    number="04"
    title="Climate Action"
    tagline="Adapting Kano to a changing climate — from flood defence to desert-edge reforestation."
    heroImage={heroAsset.url}
    intro="Kano sits on the frontline of the Sahel, facing floods, drought and encroaching desertification. The Ministry delivers the Kano Climate Action Plan (KNCAP) with programmes spanning ecosystem restoration, low-carbon energy, and community resilience."
    gradient="from-amber-500 to-orange-600"
    accent="text-amber-700"
    chipBg="bg-amber-50"
    border="border-amber-200"
    icon={ThermometerSnowflake}
    mission="Reduce climate risk to lives, livelihoods and infrastructure while transitioning Kano to a low-carbon, climate-resilient economy."
    approach="Combine large-scale afforestation, renewable-energy deployment, flood-risk management and community-based adaptation, guided by the KNCAP and Nigeria\u2019s NDC."
    stats={[
      { value: '20M', label: 'Trees Target' },
      { value: '44', label: 'LGA Adaptation Plans' },
      { value: 'KNCAP', label: 'State Framework' },
      { value: 'NDC', label: 'National Alignment' },
    ]}
    focusAreas={[
      { title: 'Afforestation & Greening', text: 'Ten- and twenty-million tree planting campaigns and urban greening corridors.' },
      { title: 'Flood Risk Management', text: 'Drainage upgrades, floodplain zoning and early-warning systems for at-risk communities.' },
      { title: 'Drought & Food Security', text: 'Drought-resilient agriculture, small-scale irrigation and pastoral corridor management.' },
      { title: 'Renewable Energy', text: 'Solar mini-grids, solar-powered water and clean cooking to displace diesel and biomass.' },
      { title: 'Climate Education', text: 'School curricula, youth ambassadors and mass sensitisation campaigns.' },
      { title: 'Climate Finance', text: 'Access to Green Climate Fund, GEF and bilateral instruments for state projects.' },
    ]}
    programs={[
      { title: 'Kano Climate Action Plan', text: 'The overarching statewide framework for mitigation and adaptation.', href: '/programs/climate-action-plan' },
      { title: '20 Million Trees Campaign', text: 'Flagship afforestation campaign under KNCAP.', href: '/programs/ten-million-trees' },
      { title: 'Urban Greening', text: 'Parks, green corridors and shade cover in Kano metropolis.', href: '/programs/urban-greening' },
      { title: 'Climate Actor Registry', text: 'Register your organisation to contribute to Kano\u2019s climate response.', href: '/climate-actor-register' },
    ]}
    legalBasis={[
      'National Climate Change Act (2021)',
      'Paris Agreement',
      'Kano Climate Action Plan (KNCAP)',
    ]}
  />
);

export default ClimateAction;
