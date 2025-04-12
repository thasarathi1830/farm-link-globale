import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/auth';
import DashboardHeader from './landowner/DashboardHeader';
import DashboardStats from './landowner/DashboardStats';
import LandParcelsTabs from './landowner/LandParcelsTabs';
import LandGallery from './landowner/LandGallery';
import LandDetails from './landowner/LandDetails';
import JobPostings from './landowner/JobPostings';
import FarmerApplications from './landowner/FarmerApplications';
import DocumentsSection from './landowner/DocumentsSection';
import RevenueTrackingSection from './landowner/RevenueTrackingSection';
import LandAnalyticsSection from './landowner/LandAnalyticsSection';

const LandownerDashboard = () => {
  const { user } = useAuth();
  
  return (
    <Tabs>
      <TabsList>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="land-parcels">Land Parcels</TabsTrigger>
        <TabsTrigger value="land-gallery">Land Gallery</TabsTrigger>
        <TabsTrigger value="land-details">Land Details</TabsTrigger>
        <TabsTrigger value="job-postings">Job Postings</TabsTrigger>
        <TabsTrigger value="farmer-applications">Farmer Applications</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="revenue-tracking">Revenue Tracking</TabsTrigger>
        <TabsTrigger value="land-analytics">Land Analytics</TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard">
        <DashboardHeader />
        <DashboardStats />
      </TabsContent>
      <TabsContent value="land-parcels">
        <LandParcelsTabs />
      </TabsContent>
      <TabsContent value="land-gallery">
        <LandGallery />
      </TabsContent>
      <TabsContent value="land-details">
        <LandDetails />
      </TabsContent>
      <TabsContent value="job-postings">
        <JobPostings />
      </TabsContent>
      <TabsContent value="farmer-applications">
        <FarmerApplications />
      </TabsContent>
      <TabsContent value="documents">
        <DocumentsSection />
      </TabsContent>
      <TabsContent value="revenue-tracking">
        <RevenueTrackingSection />
      </TabsContent>
      <TabsContent value="land-analytics">
        <LandAnalyticsSection />
      </TabsContent>
    </Tabs>
  );
};

export default LandownerDashboard;
