import React from 'react';
import { Waves } from 'lucide-react';
import PillarPage from '@/components/pillars/PillarPage';
import heroAsset from '@/assets/hero/hero-water-infrastructure.jpg.asset.json';

const IntegratedWaterResources = () => (
  <PillarPage
    code="IWR"
    number="02"
    title="Integrated Water Resources"
    tagline="Basin-wide stewardship of rivers, dams, watersheds and groundwater — protecting the source of life."
    heroImage={heroAsset.url}
    intro="Kano's water future depends on the integrated management of the Hadejia-Jama'are and Komadugu-Yobe basins. The Ministry coordinates allocation between drinking water, agriculture, industry and ecosystems, and safeguards recharge zones through science-based planning."
    gradient="from-blue-600 to-indigo-700"
    accent="text-blue-700"
    chipBg="bg-blue-50"
    border="border-blue-200"
    icon={Waves}
    mission="Manage surface and groundwater as a shared, finite resource — balancing human, economic and ecological needs across sub-basins."
    approach="Deploy hydrological monitoring, catchment protection, dam safety oversight and transboundary coordination with Federal and neighbouring-state authorities."
    stats={[
      { value: '3', label: 'Major Dams' },
      { value: '2', label: 'River Basins' },
      { value: '18', label: 'Monitoring Stations' },
      { value: '24/7', label: 'Flow Telemetry' },
    ]}
    focusAreas={[
      { title: 'Dam Safety & Operations', text: 'Structural monitoring of Tiga, Challawa Gorge and Watari dams with routine bathymetric surveys.' },
      { title: 'Groundwater Governance', text: 'Aquifer mapping, borehole permitting and abstraction controls in over-drafted zones.' },
      { title: 'Watershed Protection', text: 'Reforestation and land-use control in critical recharge and catchment areas.' },
      { title: 'Hydrological Monitoring', text: 'Real-time rainfall, river-level and reservoir telemetry feeding early-warning systems.' },
      { title: 'Water Allocation Planning', text: 'Sub-basin allocation between domestic supply, irrigation, industry and environment.' },
      { title: 'Transboundary Coordination', text: 'Joint planning with the Hadejia-Jama\u2019are River Basin Development Authority.' },
    ]}
    programs={[
      { title: 'Basin Master Plan', text: 'Long-range water balance and allocation plan for the Kano portion of the Komadugu-Yobe basin.' },
      { title: 'Water Quality Monitoring', text: 'Public reporting of river, dam and groundwater quality parameters.', href: '/monitoring/water-quality' },
      { title: 'Erosion & Watershed Maps', text: 'Geospatial mapping of erosion-prone catchments and degraded watersheds.', href: '/monitoring/erosion-maps' },
    ]}
    legalBasis={[
      'National Water Resources Act',
      'Kano State Environmental Protection Law',
      'IWRM Principles (Dublin, 1992)',
    ]}
  />
);

export default IntegratedWaterResources;
