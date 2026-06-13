
import React from 'react';
import { Link } from 'react-router-dom';
import { HandHelping, Users, Briefcase, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/layout/PageHero';

const GetInvolved = () => {
  const opportunities = [
    {
      title: "Volunteer Programs",
      description: "Join community environmental initiatives and conservation projects",
      icon: <HandHelping className="h-8 w-8" />,
      link: "/get-involved/volunteer",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Career Opportunities",
      description: "Explore job openings and build a career in environmental protection",
      icon: <Briefcase className="h-8 w-8" />,
      link: "/careers/forest-guard",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Public-Private Partnership",
      description: "Partner with us to create sustainable environmental solutions",
      icon: <Building2 className="h-8 w-8" />,
      link: "/get-involved/ppp",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <PageHero
          eyebrow="Join the movement"
          title="Get Involved"
          subtitle="Join us in protecting Kano State's environment and building a sustainable future. Volunteer, partner, or champion change in your community."
          backgroundImage="/lovable-uploads/c3464663-d555-4682-8f93-fa2041b570cd.png"
          breadcrumbs={[{ label: 'Get Involved' }]}
        />

        {/* Opportunities Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">Ways to Get Involved</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {opportunities.map((opportunity, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className={`w-16 h-16 ${opportunity.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                      <div className={opportunity.color}>
                        {opportunity.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                    <CardDescription>{opportunity.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link to={opportunity.link}>Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default GetInvolved;
