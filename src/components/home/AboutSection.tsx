
import React from 'react';
import { BookOpen, Users, Handshake, Award, Check, BarChart, Search } from 'lucide-react';

interface AboutSectionProps {
  aboutRef: React.RefObject<HTMLDivElement>;
}

const AboutSection = ({ aboutRef }: AboutSectionProps) => {
  return (
    <section ref={aboutRef} className="w-full py-12 md:py-24 bg-agrilink-beige" id="about">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-agrilink-green">
            About AgriLink
          </h2>
          <p className="text-agrilink-charcoal md:text-lg">
            AgriLink is a smart agricultural platform connecting Farmers, Landowners, and Corporations. Our goal is to eliminate intermediaries, enable direct collaboration, and empower agricultural stakeholders through technology. With our intelligent matchmaking system and verified user base, we ensure transparency and growth across the agriculture ecosystem.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-agrilink-green bg-opacity-10 p-2 rounded-full">
                  <BookOpen className="h-6 w-6 text-agrilink-green" />
                </div>
                <h3 className="text-xl font-semibold text-agrilink-charcoal">Our Mission</h3>
              </div>
              <p className="text-agrilink-charcoal">
                To create a transparent, efficient, and accessible platform that empowers agricultural stakeholders to connect, collaborate, and thrive in a sustainable ecosystem.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-agrilink-green bg-opacity-10 p-2 rounded-full">
                  <Handshake className="h-6 w-6 text-agrilink-green" />
                </div>
                <h3 className="text-xl font-semibold text-agrilink-charcoal">Our Vision</h3>
              </div>
              <p className="text-agrilink-charcoal">
                A world where agricultural collaboration is seamless, profitable, and environmentally responsible, ensuring food security for future generations.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
            <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="bg-agrilink-green bg-opacity-10 p-3 rounded-full mb-4">
                <Check className="h-5 w-5 text-agrilink-green" />
              </div>
              <h4 className="font-medium mb-2 text-agrilink-charcoal">Verified Profiles</h4>
              <p className="text-agrilink-charcoal text-sm">
                Trust through transparency with our verification system
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="bg-agrilink-green bg-opacity-10 p-3 rounded-full mb-4">
                <BarChart className="h-5 w-5 text-agrilink-green" />
              </div>
              <h4 className="font-medium mb-2 text-agrilink-charcoal">Project Dashboards</h4>
              <p className="text-agrilink-charcoal text-sm">
                Track and manage agricultural projects with ease
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="bg-agrilink-green bg-opacity-10 p-3 rounded-full mb-4">
                <Search className="h-5 w-5 text-agrilink-green" />
              </div>
              <h4 className="font-medium mb-2 text-agrilink-charcoal">Smart Matching</h4>
              <p className="text-agrilink-charcoal text-sm">
                Connect with ideal partners through our intelligent algorithm
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
