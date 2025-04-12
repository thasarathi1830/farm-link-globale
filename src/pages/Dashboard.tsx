
import React from 'react';
import FarmerDashboard from '@/components/dashboards/FarmerDashboard';
import LandownerDashboard from '@/components/dashboards/LandownerDashboard';
import CorporateDashboard from '@/components/dashboards/CorporateDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <Tabs defaultValue="farmer" className="w-full">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="farmer">Farmer</TabsTrigger>
          <TabsTrigger value="landowner">Landowner</TabsTrigger>
          <TabsTrigger value="corporate">Corporate</TabsTrigger>
        </TabsList>
        
        <TabsContent value="farmer">
          <FarmerDashboard />
        </TabsContent>
        
        <TabsContent value="landowner">
          <LandownerDashboard />
        </TabsContent>
        
        <TabsContent value="corporate">
          <CorporateDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
