
import React from 'react';
import { useAuth } from '@/hooks/auth';
import DashboardHeader from './DashboardHeader';
import ProfileStats from './ProfileStats';
import DashboardTabs from './DashboardTabs';
import ProfileCards from './ProfileCards';

const FarmerDashboardContent = () => {
  const { profile } = useAuth();
  
  return (
    <div className="container py-10">
      <DashboardHeader name={profile?.name || 'Farmer'} />
      <ProfileStats />
      <DashboardTabs />
      <ProfileCards />
    </div>
  );
};

export default FarmerDashboardContent;
