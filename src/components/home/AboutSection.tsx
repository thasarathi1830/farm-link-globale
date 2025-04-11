
import React from 'react';

interface AboutSectionProps {
  aboutRef: React.RefObject<HTMLDivElement>;
}

const AboutSection = ({ aboutRef }: AboutSectionProps) => {
  return (
    <section ref={aboutRef} className="w-full py-12 md:py-24 bg-green-50" id="about">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            About AgriLink
          </h2>
          <p className="text-gray-600 md:text-lg">
            AgriLink is a digital bridge connecting farmers, landowners, and corporations to enable transparent, fair, and efficient agricultural collaboration. Our mission is to empower farmers, help landowners utilize land effectively, and assist corporations in managing agricultural projects. We provide verified profiles, project dashboards, and smart matching between stakeholders to revolutionize agriculture.
          </p>
          <div className="space-y-4 w-full">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To create a transparent, efficient, and accessible platform that empowers agricultural stakeholders to connect, collaborate, and thrive in a sustainable ecosystem.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
              <p className="text-gray-600">
                A world where agricultural collaboration is seamless, profitable, and environmentally responsible, ensuring food security for future generations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
