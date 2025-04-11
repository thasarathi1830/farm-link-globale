
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Plus } from 'lucide-react';

const JobPostings = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Active Job Postings</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Post New Job
        </Button>
      </div>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Maize Cultivation Workers</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <MapPin className="h-3 w-3 mr-1" /> Kolar District, Karnataka
              </CardDescription>
            </div>
            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
              10 Applicants
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 mb-4">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <span className="text-xs text-muted-foreground">Workers Needed:</span>
                <p className="font-medium">5</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Daily Wage:</span>
                <p className="font-medium">₹550-600</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Duration:</span>
                <p className="font-medium">3 weeks</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Start Date:</span>
                <p className="font-medium">April 20, 2025</p>
              </div>
            </div>
            <p className="mt-2">Seeking experienced workers for upcoming maize cultivation season.</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm">View Applicants</Button>
            <Button size="sm" variant="outline">Edit Posting</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Farm Manager</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <MapPin className="h-3 w-3 mr-1" /> Mysore District, Karnataka
              </CardDescription>
            </div>
            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
              3 Applicants
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 mb-4">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <span className="text-xs text-muted-foreground">Position:</span>
                <p className="font-medium">Full-time</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Salary:</span>
                <p className="font-medium">₹18,000/month</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Experience:</span>
                <p className="font-medium">3+ years</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Accommodation:</span>
                <p className="font-medium">Provided</p>
              </div>
            </div>
            <p className="mt-2">Looking for an experienced farm manager for coconut plantation.</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm">View Applicants</Button>
            <Button size="sm" variant="outline">Edit Posting</Button>
          </div>
        </CardContent>
      </Card>
      
      <Button variant="outline" className="w-full">View All Job Postings</Button>
    </>
  );
};

export default JobPostings;
