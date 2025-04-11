
import React, { useState, useRef } from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import AboutSection from '@/components/home/AboutSection';
import ContactSection from '@/components/home/ContactSection';
import CTASection from '@/components/home/CTASection';
import SignupModal from '@/components/home/SignupModal';
import LoginModal from '@/components/home/LoginModal';

type UserRole = 'farmer' | 'landowner' | 'corporate';

const Home = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  
  // Create refs for scrolling
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  const openSignupModal = (role: UserRole) => {
    setSelectedRole(role);
    setIsSignupModalOpen(true);
  };
  
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };
  
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        scrollToSection={scrollToSection}
        aboutRef={aboutRef}
      />

      {/* Features Section */}
      <FeaturesSection openSignupModal={openSignupModal} />

      {/* About Section */}
      <AboutSection aboutRef={aboutRef} />

      {/* Contact Section */}
      <ContactSection contactRef={contactRef} />

      {/* CTA Section */}
      <CTASection openSignupModal={openSignupModal} />

      {/* Signup Modal */}
      <SignupModal 
        isOpen={isSignupModalOpen}
        onOpenChange={setIsSignupModalOpen}
        selectedRole={selectedRole}
        onLoginInstead={() => {
          setIsSignupModalOpen(false);
          openLoginModal();
        }}
      />

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onOpenChange={setIsLoginModalOpen}
        onCreateAccountInstead={() => {
          setIsLoginModalOpen(false);
          setIsSignupModalOpen(true);
        }}
      />
    </div>
  );
};

export default Home;
