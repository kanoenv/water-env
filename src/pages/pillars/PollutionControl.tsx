import React from 'react';
import { Shield } from 'lucide-react';
import PillarPage from '@/components/pillars/PillarPage';

const PollutionControl = () => (
  <PillarPage
    code="POL"
    number="05"
    title="Pollution Control"
    tagline="Clean air, clean water and clean soil — enforced through modern laboratories and transparent standards."
    heroImage="/lovable-uploads/3535207a-22a2-4c6f-927f-fe7c22998e18.png"
    intro="The Ministry regulates industrial emissions, effluents and hazardous waste to protect public health and the environment. Through accredited laboratories and continuous monitoring, we hold polluters accountable and publish results openly."
    gradient="from-rose-600 to-red-700"
    accent="text-rose-700"
    chipBg="bg-rose-50"
    border="border-rose-200"
    icon={Shield}
    mission="Prevent, reduce and remediate pollution across air, water and land through science-based regulation and enforcement."
    approach="Operate accredited monitoring laboratories, license and inspect regulated facilities, issue enforceable notices, and publish real-time data to the public."
    stats={[
      { value: '12', label: 'AQ Monitoring Stations' },
      { value: '500+', label: 'Facilities Licensed' },
      { value: 'ISO', label: 'Lab Standards' },
      { value: 'Live', label: 'AQI Data' },
    ]}
    focusAreas={[
      { title: 'Air Quality Monitoring', text: 'Real-time AQI network across Kano metropolis with public dashboards and alerts.' },
      { title: 'Industrial Effluent Control', text: 'Permitting and inspection of tannery, textile and food-processing effluents.' },
      { title: 'Pollution Laboratory', text: 'Accredited testing of water, air, soil and effluent samples for regulatory use.' },
      { title: 'Hazardous Waste', text: 'Tracking, storage and safe disposal of hazardous and medical waste.' },
      { title: 'Noise & Nuisance', text: 'Regulation of noise pollution in residential and mixed-use zones.' },
      { title: 'Enforcement', text: 'Compliance notices, penalties and remediation orders against violators.' },
    ]}
    programs={[
      { title: 'Pollution Control Laboratory', text: 'Accredited laboratory serving regulatory and public-interest testing.', href: '/programs/pollution-lab' },
      { title: 'Air Quality Dashboard', text: 'Live AQI readings across Kano metropolitan monitoring stations.', href: '/air-quality' },
      { title: 'Report Pollution', text: 'Citizen channel to report emissions, effluents, dumping or noise pollution.', href: '/report-issue' },
    ]}
    legalBasis={[
      'Kano State Environmental Protection Law',
      'National Environmental Standards (NESREA)',
      'ISO 17025 (Laboratory Accreditation)',
    ]}
  />
);

export default PollutionControl;
