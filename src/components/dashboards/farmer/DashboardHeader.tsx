
import React from 'react';
import { UserProfile } from '@/hooks/auth/types';

interface DashboardHeaderProps {
  name: string;
}

const DashboardHeader = ({ name }: DashboardHeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold">Welcome, {name}</h1>
      <p className="text-muted-foreground">
        Manage your agricultural activities and appointments
      </p>
    </div>
  );
};

export default DashboardHeader;
