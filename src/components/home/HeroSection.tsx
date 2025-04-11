
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';

interface HeroSectionProps {
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  aboutRef: React.RefObject<HTMLDivElement>;
}

const HeroSection = ({ scrollToSection, aboutRef }: HeroSectionProps) => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-green-50">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            Connecting Farmers, Landowners, and Corporations
          </h1>
          <p className="max-w-[700px] text-gray-600 md:text-xl mx-auto">
            AgriLink is a comprehensive platform revolutionizing how agricultural stakeholders connect, collaborate, and grow together.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link to="/register">Get Started</Link>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => scrollToSection(aboutRef)}
            className="flex items-center gap-1"
          >
            <Info className="h-4 w-4" />
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
