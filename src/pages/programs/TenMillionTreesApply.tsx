import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FiveMillionTreesStepForm from '@/components/forms/FiveMillionTreesStepForm';
import { TreePine, ArrowLeft } from 'lucide-react';

const TenMillionTreesApply = () => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <main>
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-8 sm:py-12">
        <div className="container-custom max-w-4xl px-4">
          <Link to="/programs/ten-million-trees" className="inline-flex items-center text-sm sm:text-base text-emerald-700 hover:text-emerald-800 mb-5 sm:mb-6 group">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Campaign Overview
          </Link>
          <div className="mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-700 rounded-full flex items-center justify-center mb-4">
              <TreePine className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-gray-900">Organisation Application</h1>
            <p className="text-lg sm:text-xl text-gray-600 mt-2">10 Million Trees Planting Campaign · 2026</p>
          </div>
          <p className="text-base sm:text-lg leading-relaxed text-gray-700 max-w-3xl">
            Submit your organisation's application below. After review, approved organisations receive free seedlings and access to the digital planting tracker.
          </p>
        </div>
      </section>
      <section className="py-8 sm:py-16">
        <div className="container-custom px-4">
          <FiveMillionTreesStepForm campaign="10_million_2026" successRoute="/programs/five-million-trees/success" />
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default TenMillionTreesApply;
