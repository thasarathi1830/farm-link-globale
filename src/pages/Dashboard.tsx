
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import FarmerDashboard from '@/components/dashboards/FarmerDashboard';
import LandownerDashboard from '@/components/dashboards/LandownerDashboard';
import CorporateDashboard from '@/components/dashboards/CorporateDashboard';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">
          <Skeleton className="h-10 w-1/3" />
        </h1>
        <div className="grid gap-6">
          {Array(3).fill(null).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  switch (user.role) {
    case 'farmer':
      return <FarmerDashboard />;
    case 'landowner':
      return <LandownerDashboard />;
    case 'corporate':
      return <CorporateDashboard />;
    default:
      return <Navigate to="/" />;
  }
};

export default Dashboard;
