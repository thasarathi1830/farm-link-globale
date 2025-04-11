
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LandDetails from './LandDetails';
import JobPostings from './JobPostings';
import FarmerApplications from './FarmerApplications';
import LandGallery from './LandGallery';
import RevenueAnalytics from './RevenueAnalytics';

const LandParcelsTabs = () => {
  return (
    <Tabs defaultValue="land" className="mb-6">
      <TabsList>
        <TabsTrigger value="land">My Land Parcels</TabsTrigger>
        <TabsTrigger value="jobs">Job Postings</TabsTrigger>
        <TabsTrigger value="farmers">Farmer Applications</TabsTrigger>
        <TabsTrigger value="gallery">Land Gallery</TabsTrigger>
        <TabsTrigger value="revenue">Revenue</TabsTrigger>
      </TabsList>
      
      <TabsContent value="land" className="space-y-4 pt-4">
        <LandDetails />
      </TabsContent>
      
      <TabsContent value="jobs" className="space-y-4 pt-4">
        <JobPostings />
      </TabsContent>
      
      <TabsContent value="farmers" className="space-y-4 pt-4">
        <FarmerApplications />
      </TabsContent>
      
      <TabsContent value="gallery" className="space-y-4 pt-4">
        <LandGallery />
      </TabsContent>
      
      <TabsContent value="revenue" className="space-y-4 pt-4">
        <RevenueAnalytics />
      </TabsContent>
    </Tabs>
  );
};

export default LandParcelsTabs;
