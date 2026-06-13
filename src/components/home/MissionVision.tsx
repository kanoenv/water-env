
import React from 'react';
import { Droplets, Leaf, FileText, Shield, ThermometerSnowflake, Recycle, Target, Globe, Waves, Building2 } from 'lucide-react';

const MissionVision = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-white via-gray-50/50 to-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/6 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-white/90 backdrop-blur-lg border border-emerald-200/50 text-emerald-700 rounded-full text-xs sm:text-sm font-bold mb-6 sm:mb-8 shadow-lg">
            <Target className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Our Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
            Mission, Vision &amp;
            <span className="block bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Strategic Mandate
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium px-4 mt-4">
            The guiding framework of the Kano State Ministry of Water Resources, Environment and Climate Change.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 mb-16 sm:mb-20 lg:mb-24">
          {/* Mission */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-emerald-700/10 rounded-2xl sm:rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
            <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-emerald-200/50 shadow-2xl hover:shadow-3xl transition-all duration-500 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 md:p-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg sm:rounded-xl shadow-lg">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 md:w-5 md:h-5 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-emerald-700 text-xl sm:text-2xl lg:text-3xl font-black">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg font-medium">
                To deliver safe, sustainable and equitable water supply; protect surface and groundwater
                resources; manage land, air and water pollution; advance climate adaptation and
                mitigation; and safeguard ecosystems and public health through evidence-based policy,
                modern infrastructure and inclusive community partnerships.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-2xl sm:rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500"></div>
            <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-blue-200/50 shadow-2xl hover:shadow-3xl transition-all duration-500 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 md:p-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg sm:rounded-xl shadow-lg">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 md:w-5 md:h-5 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-blue-700 text-xl sm:text-2xl lg:text-3xl font-black">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg font-medium">
                A water-secure, clean and climate-resilient Kano where every citizen enjoys reliable
                access to potable water, a healthy environment and sustainable livelihoods — setting
                the benchmark for integrated water, environment and climate governance in West Africa.
              </p>
            </div>
          </div>
        </div>

        {/* Strategic Mandate */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 sm:mb-8 px-4">
              Strategic <span className="text-blue-700">Mandate</span>
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium px-4">
              Six integrated pillars driving water security, environmental protection and climate resilience across Kano State.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Water Supply & Sanitation */}
            <div className="group bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-blue-300/50 transform hover:-translate-y-1 sm:hover:-translate-y-2">
              <div className="flex items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-2 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Droplets className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4" strokeWidth={2} />
                </div>
                <h4 className="font-black text-lg sm:text-xl text-gray-900">Water Supply &amp; Sanitation</h4>
              </div>
              <p className="text-gray-700 leading-relaxed font-medium text-sm sm:text-base">
                Expand reliable potable water supply, rehabilitate networks and deliver safe sanitation
                services to urban and rural communities across all 44 LGAs.
              </p>
            </div>

            {/* Water Resources Management */}
            <div className="group bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-cyan-300/50 transform hover:-translate-y-1 sm:hover:-translate-y-2">
              <div className="flex items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-2 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Waves className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4" strokeWidth={2} />
                </div>
                <h4 className="font-black text-lg sm:text-xl text-gray-900">Integrated Water Resources</h4>
              </div>
              <p className="text-gray-700 leading-relaxed font-medium text-sm sm:text-base">
                Protect rivers, dams, watersheds and groundwater through integrated planning,
                allocation, quality monitoring and basin-wide cooperation.
              </p>
            </div>

            {/* Policy & Governance */}
            <div className="group bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-emerald-300/50 transform hover:-translate-y-1 sm:hover:-translate-y-2">
              <div className="flex items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-2 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4" strokeWidth={2} />
                </div>
                <h4 className="font-black text-lg sm:text-xl text-gray-900">Policy &amp; Governance</h4>
              </div>
              <p className="text-gray-700 leading-relaxed font-medium text-sm sm:text-base">
                Develop, coordinate and oversee implementation of water, environment and climate
                policies aligned with national strategy and global commitments.
              </p>
            </div>

            {/* Climate Action */}
            <div className="group bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-teal-300/50 transform hover:-translate-y-1 sm:hover:-translate-y-2">
              <div className="flex items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
                <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-2 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <ThermometerSnowflake className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4" strokeWidth={2} />
                </div>
                <h4 className="font-black text-lg sm:text-xl text-gray-900">Climate Action &amp; Resilience</h4>
              </div>
              <p className="text-gray-700 leading-relaxed font-medium text-sm sm:text-base">
                Drive flood, drought and desertification mitigation, low-carbon transition and
                community-level adaptation under the Kano Climate Action Plan.
              </p>
            </div>

            {/* Pollution Control */}
            <div className="group bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-red-300/50 transform hover:-translate-y-1 sm:hover:-translate-y-2">
              <div className="flex items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
                <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-2 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4" strokeWidth={2} />
                </div>
                <h4 className="font-black text-lg sm:text-xl text-gray-900">Pollution Control</h4>
              </div>
              <p className="text-gray-700 leading-relaxed font-medium text-sm sm:text-base">
                Regulate industrial effluents, air emissions and sewage, with modern monitoring
                laboratories and enforcement of environmental standards.
              </p>
            </div>

            {/* Waste & Sanitation */}
            <div className="group bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-amber-300/50 transform hover:-translate-y-1 sm:hover:-translate-y-2">
              <div className="flex items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
                <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-2 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Recycle className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4" strokeWidth={2} />
                </div>
                <h4 className="font-black text-lg sm:text-xl text-gray-900">Waste &amp; Circular Economy</h4>
              </div>
              <p className="text-gray-700 leading-relaxed font-medium text-sm sm:text-base">
                Deliver efficient solid waste management, composting and recycling programs that
                advance a clean, healthy and circular Kano economy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
