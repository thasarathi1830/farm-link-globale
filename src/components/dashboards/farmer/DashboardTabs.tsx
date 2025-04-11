
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import JobListings from './JobListings';
import MNCPrograms from './MNCPrograms';
import AvailabilitySettings from './AvailabilitySettings';

const DashboardTabs = () => {
  return (
    <Tabs defaultValue="jobs" className="mb-6">
      <TabsList>
        <TabsTrigger value="jobs">Job Listings</TabsTrigger>
        <TabsTrigger value="mnc">MNC Programs</TabsTrigger>
        <TabsTrigger value="calendar">Availability</TabsTrigger>
      </TabsList>
      <TabsContent value="jobs">
        <JobListings />
      </TabsContent>
      <TabsContent value="mnc">
        <MNCPrograms />
      </TabsContent>
      <TabsContent value="calendar">
        <AvailabilitySettings />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
