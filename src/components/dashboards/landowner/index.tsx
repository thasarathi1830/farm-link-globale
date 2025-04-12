
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/auth';
import DashboardHeader from './DashboardHeader';
import DashboardStats from './DashboardStats';
import LandParcelsTabs from './LandParcelsTabs';
import LandGallery from './LandGallery';
import LandDetails from './LandDetails';
import JobPostings from './JobPostings';
import FarmerApplications from './FarmerApplications';
import RevenueTrackingSection from './RevenueTrackingSection';
import LandAnalyticsSection from './LandAnalyticsSection';

const LandownerDashboard = () => {
  const { profile } = useAuth();

  return (
    <div className="container py-10">
      <DashboardHeader name={profile?.name || 'Landowner'} />
      <DashboardStats />

      <Tabs defaultValue="landParcels" className="w-full mt-6">
        <TabsList>
          <TabsTrigger value="landParcels">Land Parcels</TabsTrigger>
          <TabsTrigger value="landDetails">Land Details</TabsTrigger>
          <TabsTrigger value="landGallery">Land Gallery</TabsTrigger>
          <TabsTrigger value="jobPostings">Job Postings</TabsTrigger>
          <TabsTrigger value="farmerApplications">Farmer Applications</TabsTrigger>
          <TabsTrigger value="revenueTracking">Revenue Tracking</TabsTrigger>
          <TabsTrigger value="landAnalytics">Land Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="landParcels" className="mt-2">
          <LandParcelsTabs />
        </TabsContent>
        <TabsContent value="landDetails" className="mt-2">
          <LandDetails />
        </TabsContent>
        <TabsContent value="landGallery" className="mt-2">
          <LandGallery />
        </TabsContent>
        <TabsContent value="jobPostings" className="mt-2">
          <JobPostings />
        </TabsContent>
        <TabsContent value="farmerApplications" className="mt-2">
          <FarmerApplications />
        </TabsContent>
        <TabsContent value="revenueTracking" className="mt-2">
          <RevenueTrackingSection />
        </TabsContent>
        <TabsContent value="landAnalytics" className="mt-2">
          <LandAnalyticsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LandownerDashboard;
