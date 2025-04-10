
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sprout, Users, Building, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
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
            <Button asChild variant="outline" size="lg">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
            <div className="flex flex-col items-center space-y-4 p-6 bg-green-50 rounded-lg">
              <div className="p-3 bg-agrilink-green bg-opacity-10 rounded-full">
                <Sprout className="w-10 h-10 text-agrilink-green" />
              </div>
              <h3 className="text-xl font-bold">For Farmers</h3>
              <p className="text-gray-600 text-center">
                Find work opportunities, lease land, showcase your experience, and connect with agricultural corporations.
              </p>
              <Button asChild variant="link">
                <Link to="/register" className="flex items-center">
                  Join as Farmer <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 bg-green-50 rounded-lg">
              <div className="p-3 bg-agrilink-brown bg-opacity-10 rounded-full">
                <Users className="w-10 h-10 text-agrilink-brown" />
              </div>
              <h3 className="text-xl font-bold">For Landowners</h3>
              <p className="text-gray-600 text-center">
                List your land, find reliable farmers, create lease agreements, and maximize your property's potential.
              </p>
              <Button asChild variant="link">
                <Link to="/register" className="flex items-center">
                  Join as Landowner <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 bg-green-50 rounded-lg">
              <div className="p-3 bg-agrilink-blue bg-opacity-10 rounded-full">
                <Building className="w-10 h-10 text-agrilink-blue" />
              </div>
              <h3 className="text-xl font-bold">For Corporations</h3>
              <p className="text-gray-600 text-center">
                Find skilled farmers, lease land, manage agricultural projects, and track performance with powerful analytics.
              </p>
              <Button asChild variant="link">
                <Link to="/register" className="flex items-center">
                  Join as Corporation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-agrilink-green">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
            Ready to Join the Agricultural Revolution?
          </h2>
          <p className="max-w-[700px] text-white/80 md:text-xl mx-auto">
            Sign up today and start connecting with agricultural stakeholders across the ecosystem.
          </p>
          <Button asChild size="lg" className="bg-white text-agrilink-green hover:bg-gray-100">
            <Link to="/register">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
