
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import DashboardHeader from './DashboardHeader';
import DashboardStats from './DashboardStats';
import LandParcelsTabs from './LandParcelsTabs';
import DocumentsSection from './DocumentsSection';
import LandAnalyticsSection from './LandAnalyticsSection';
import RevenueTrackingSection from './RevenueTrackingSection';

const LandownerDashboardContent = () => {
  const { user } = useAuth();
  
  return (
    <div className="container py-10">
      <DashboardHeader />
      <DashboardStats />
      <LandParcelsTabs />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DocumentsSection />
        <LandAnalyticsSection />
        <RevenueTrackingSection />
      </div>
    </div>
  );
};

export default LandownerDashboardContent;
