
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import QuickLinks from '@/components/home/QuickLinks';
import KeyFigures from '@/components/home/KeyFigures';
import MissionVision from '@/components/home/MissionVision';
import Messages from '@/components/home/Messages';
import RecentNews from '@/components/home/RecentNews';
// SuccessStories removed
import EventsSection from '@/components/home/EventsSection';
import VideoSection from '@/components/home/VideoSection';
import ReportBanner from '@/components/ui/ReportBanner';
import PartnersSection from '@/components/home/PartnersSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section - Enhanced for desktop/tablet */}
        <div className="w-full">
          <HeroSection />
        </div>

        {/* Key figures strip */}
        <div className="w-full">
          <KeyFigures />
        </div>

        {/* Quick Links - Professional spacing for larger screens */}
        <div className="w-full">
          <QuickLinks />
        </div>

        
        {/* Mission & Vision - Better layout for desktop */}
        <div className="w-full">
          <MissionVision />
        </div>
        
        {/* Governor & Commissioner Messages - Enhanced for larger screens */}
        <div className="w-full">
          <Messages />
        </div>
        
        {/* Latest News - replaces Our Impact / Recent Programs */}
        <div className="w-full">
          <RecentNews />
        </div>

        {/* Video Section - Optimized for all screens */}
        <div className="w-full">
          <VideoSection />
        </div>

        {/* Events Section - Enhanced for desktop */}
        <div className="w-full">
          <EventsSection />
        </div>
        
        {/* Partners Section - Better spacing */}
        <div className="w-full">
          <PartnersSection />
        </div>
        
        {/* Report Banner - Consistent width */}
        <div className="w-full">
          <ReportBanner />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
