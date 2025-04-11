
import React from 'react';
import DashboardHeader from './DashboardHeader';
import ProfileStats from './ProfileStats';
import DashboardTabs from './DashboardTabs';
import ProfileCards from './ProfileCards';

const FarmerDashboardContent = () => {
  return (
    <div className="container py-10">
      <DashboardHeader />
      <ProfileStats />
      <DashboardTabs />
      <ProfileCards />
    </div>
  );
};

export default FarmerDashboardContent;
