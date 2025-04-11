
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import LandownerDashboardContent from './landowner/index';

const LandownerDashboard = () => {
  const { user } = useAuth();
  
  return <LandownerDashboardContent />;
};

export default LandownerDashboard;
