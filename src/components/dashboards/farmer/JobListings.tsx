
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const JobListings = () => {
  return (
    <div className="space-y-4 pt-4">
      <h2 className="text-xl font-semibold mb-4">Available Jobs Nearby</h2>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Paddy Field Harvester</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <MapPin className="h-3 w-3 mr-1" /> Bangalore Rural District, 15 km away
              </CardDescription>
            </div>
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
              ₹650/day
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 mb-4">
            <p>Duration: 2 weeks • Start date: Apr 15, 2025</p>
            <p className="mt-2">Looking for experienced paddy field harvesters for a 50-acre farm.</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm">Apply Now</Button>
            <Button size="sm" variant="outline">Save</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Organic Vegetable Farm Assistant</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <MapPin className="h-3 w-3 mr-1" /> Hosur, 20 km away
              </CardDescription>
            </div>
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
              ₹12,000/month
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 mb-4">
            <p>Duration: 6 months • Start date: May 1, 2025</p>
            <p className="mt-2">Full-time position at an organic vegetable farm. Accommodation provided.</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm">Apply Now</Button>
            <Button size="sm" variant="outline">Save</Button>
          </div>
        </CardContent>
      </Card>
      
      <Button variant="outline" className="w-full">View All Job Listings</Button>
    </div>
  );
};

export default JobListings;
