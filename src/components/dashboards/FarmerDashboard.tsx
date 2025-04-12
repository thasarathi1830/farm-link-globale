
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileCards from './farmer/ProfileCards';
import SkillsExperience from './farmer/SkillsExperience';
import DashboardHeader from './farmer/DashboardHeader';
import AvailabilitySettings from './farmer/AvailabilitySettings';
import JobListings from './farmer/JobListings';
import IncomeTracking from './farmer/IncomeTracking';
import DocumentUploader from './farmer/DocumentUploader';
import MNCPrograms from './farmer/MNCPrograms';
import ProfileStats from './farmer/ProfileStats';

const FarmerDashboard = () => {
  return (
    <div className="container py-10">
      <DashboardHeader name="Farmer" />

      <Tabs defaultValue="profile" className="w-full space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="jobs">Job Listings</TabsTrigger>
          <TabsTrigger value="income">Income Tracking</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="mnc">MNC Programs</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-2">
          <ProfileStats />
          <ProfileCards />
          <SkillsExperience />
        </TabsContent>
        <TabsContent value="availability" className="space-y-2">
          <AvailabilitySettings />
        </TabsContent>
        <TabsContent value="jobs" className="space-y-2">
          <JobListings />
        </TabsContent>
        <TabsContent value="income" className="space-y-2">
          <IncomeTracking />
        </TabsContent>
        <TabsContent value="documents" className="space-y-2">
          <DocumentUploader />
        </TabsContent>
        <TabsContent value="mnc" className="space-y-2">
          <MNCPrograms />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FarmerDashboard;
