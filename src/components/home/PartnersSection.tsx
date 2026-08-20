import React from 'react';
import { ExternalLink, Handshake, Globe } from 'lucide-react';

const PartnersSection = () => {
  const partners = [
    {
      name: "World Bank",
      logo: "/lovable-uploads/07bc5a34-26a8-4d14-b24d-ebf582a291a2.png",
      url: "https://www.worldbank.org/ext/en/home",
      description: "International financial institution"
    },
    {
      name: "GIZ - Deutsche Gesellschaft für Internationale Zusammenarbeit",
      logo: "/lovable-uploads/03da2489-b5d9-4ef9-a336-17f5577be107.png",
      url: "https://www.giz.de/en/html/index.html",
      description: "German development cooperation"
    },
    {
      name: "Kingdom of the Netherlands",
      logo: "/lovable-uploads/62fc071f-2296-4662-bb53-8ab59daf1917.png",
      url: "https://www.government.nl/",
      description: "Dutch government partnership"
    },
    {
      name: "Federal Ministry of Environment",
      logo: "/lovable-uploads/ac87a574-7382-4e97-ad0a-a35cbd727447.png",
      url: "https://environment.gov.ng/",
      description: "Nigeria's federal environmental authority"
    },
    {
      name: "UNFCCC - United Nations Framework Convention on Climate Change",
      logo: "/lovable-uploads/cc5f4c51-e9a0-4a5e-b220-dea6b8aa2af6.png",
      url: "https://unfccc.int/",
      description: "UN climate change framework"
    },
    {
      name: "Foreign, Commonwealth & Development Office",
      logo: "/lovable-uploads/eaafbd0d-35ea-43bc-b455-53a0c3170af1.png",
      url: "https://www.gov.uk/government/organisations/foreign-commonwealth-development-office",
      description: "UK development office"
    },
    {
      name: "PACE - Partnership for Agile Governance and Climate Engagement",
      logo: "/lovable-uploads/53e28d02-49a9-4eab-b616-e66dcad85211.png",
      url: "https://www.pacenigeria.org/",
      description: "Climate governance partnership"
    },
    {
      name: "UNIDO - United Nations Industrial Development Organization",
      logo: "/lovable-uploads/e89dbfaa-4478-4c75-ab79-53c592abe20c.png",
      url: "https://www.unido.org/",
      description: "UN industrial development"
    }
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-white to-kano-primary/5 border-t border-slate-200 overflow-hidden">
      {/* Decorative water ripple */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-kano-primary via-kano-secondary to-kano-accent" />
      
      <div className="container-custom relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-kano-primary" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-kano-primary">Strategic Partnerships</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-900 leading-tight mb-4" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
              Strategic Partners for Water Security, Climate Action & Sustainable Development
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Working alongside international and national organizations to deliver sustainable water security, environmental protection and climate resilience for Kano State and Nigeria.
            </p>
          </div>
          <div className="flex items-center gap-4 text-kano-primary">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-kano-primary/10">
              <Handshake className="w-5 h-5 text-kano-primary" />
            </div>
            <div className="text-sm font-semibold">
              <div className="text-slate-900">{partners.length} Active Partners</div>
              <div className="text-slate-500 font-normal">International • National • Bilateral</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <div key={index} className="group">
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-kano-primary/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-20 flex items-center justify-center mb-5">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-slate-900 text-sm mb-2 leading-tight group-hover:text-kano-primary transition-colors line-clamp-2">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                    {partner.description}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-kano-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Visit Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-slate-200">
          <p className="text-slate-600 max-w-3xl mx-auto text-center leading-relaxed">
            These partnerships enable us to leverage international expertise, funding and best practices to address water, environmental and climate challenges, and to implement sustainable development initiatives across all 44 Local Government Areas of Kano State.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
