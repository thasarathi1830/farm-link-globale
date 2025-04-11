
import React from 'react';
import { Sprout, Users, Building } from 'lucide-react';
import FeatureCard from './FeatureCard';

interface FeaturesSectionProps {
  openSignupModal: (role: 'farmer' | 'landowner' | 'corporate') => void;
}

const FeaturesSection = ({ openSignupModal }: FeaturesSectionProps) => {
  return (
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Who We Serve
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl mx-auto">
              Our platform caters to the unique needs of each agricultural stakeholder.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <FeatureCard 
            icon={Sprout}
            iconClass="bg-agrilink-green bg-opacity-10 text-agrilink-green"
            title="For Farmers"
            description="Find work opportunities, lease land, showcase your experience, and connect with agricultural corporations."
            buttonText="Join as Farmer"
            onClick={() => openSignupModal('farmer')}
          />
          
          <FeatureCard 
            icon={Users}
            iconClass="bg-agrilink-brown bg-opacity-10 text-agrilink-brown"
            title="For Landowners"
            description="List your land, find reliable farmers, create lease agreements, and maximize your property's potential."
            buttonText="Join as Landowner"
            onClick={() => openSignupModal('landowner')}
          />
          
          <FeatureCard 
            icon={Building}
            iconClass="bg-agrilink-blue bg-opacity-10 text-agrilink-blue"
            title="For Corporations"
            description="Find skilled farmers, lease land, manage agricultural projects, and track performance with powerful analytics."
            buttonText="Join as Corporation"
            onClick={() => openSignupModal('corporate')}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
