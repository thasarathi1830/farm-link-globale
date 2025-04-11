
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

const DashboardHeader = () => {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
      <h1 className="text-3xl font-bold">Landowner Dashboard</h1>
      <div className="flex items-center gap-4">
        <Button className="w-full md:w-auto">
          <UserPlus className="mr-2 h-4 w-4" /> Complete Profile
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
