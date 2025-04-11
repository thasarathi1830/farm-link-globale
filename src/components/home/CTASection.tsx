
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  openSignupModal: (role: 'farmer' | 'landowner' | 'corporate') => void;
}

const CTASection = ({ openSignupModal }: CTASectionProps) => {
  return (
    <section className="w-full py-12 md:py-24 bg-agrilink-green">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
        <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
          Ready to Join the Agricultural Revolution?
        </h2>
        <p className="max-w-[700px] text-white/90 md:text-xl mx-auto">
          Sign up today and start connecting with agricultural stakeholders across the ecosystem.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            size="lg" 
            className="bg-white text-agrilink-green hover:bg-gray-100" 
            onClick={() => openSignupModal('farmer')}
          >
            Get Started Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white text-white hover:bg-white/10" 
            onClick={() => openSignupModal('corporate')}
          >
            Enterprise Solutions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
