
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import FarmerDashboardContent from './farmer/index';

const FarmerDashboard = () => {
  const { user } = useAuth();
  
  return <FarmerDashboardContent />;
};

export default FarmerDashboard;
