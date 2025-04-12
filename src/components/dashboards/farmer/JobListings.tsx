
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, FileText, Bookmark, BookmarkCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/auth/useAuth';
import JobApplicationForm from './JobApplicationForm';
import { useJobApplications } from '@/hooks/useJobApplications';

interface JobListing {
  id: number;
  title: string;
  location: string;
  distance: string;
  salary: string;
  duration: string;
  startDate: string;
  description: string;
  company: string;
}

const JobListings = () => {
  const { toast } = useToast();
  const { profile } = useAuth();
  const [openJobId, setOpenJobId] = useState<number | null>(null);
  
  // Use the custom hook for job applications
  const { 
    savedJobs, 
    appliedJobs, 
    toggleSaveJob, 
    isJobSaved, 
    isJobApplied,
    applyForJob
  } = useJobApplications({ userId: profile?.id });
  
  // Mock job listings - in a real app, these would come from the database
  const jobListings: JobListing[] = [
    {
      id: 1,
      title: 'Paddy Field Harvester',
      location: 'Bangalore Rural District',
      distance: '15 km away',
      salary: '₹650/day',
      duration: '2 weeks',
      startDate: 'Apr 15, 2025',
      description: 'Looking for experienced paddy field harvesters for a 50-acre farm.',
      company: 'Paddy Farms Ltd'
    },
    {
      id: 2,
      title: 'Organic Vegetable Farm Assistant',
      location: 'Hosur',
      distance: '20 km away',
      salary: '₹12,000/month',
      duration: '6 months',
      startDate: 'May 1, 2025',
      description: 'Full-time position at an organic vegetable farm. Accommodation provided.',
      company: 'Organic Greens Co.'
    }
  ];

  const openApplicationForm = (jobId: number) => {
    setOpenJobId(jobId);
  };

  const closeApplicationForm = () => {
    setOpenJobId(null);
  };

  const handleApplicationSuccess = (jobId: number) => {
    closeApplicationForm();
    toast({
      title: "Application submitted",
      description: "Your job application has been submitted successfully!"
    });
  };

  const handleToggleSaveJob = (job: JobListing) => {
    toggleSaveJob(job.id, job.title, job.company);
  };

  return (
    <div className="space-y-4 pt-4">
      <h2 className="text-xl font-semibold mb-4">Available Jobs Nearby</h2>
      
      {jobListings.map(job => (
        <Card key={job.id} className="mb-4">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <MapPin className="h-3 w-3 mr-1" /> {job.location}, {job.distance}
                </CardDescription>
              </div>
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                {job.salary}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600 mb-4">
              <p>Duration: {job.duration} • Start date: {job.startDate}</p>
              <p className="mt-2">{job.description}</p>
            </div>
            <div className="flex gap-2">
              {isJobApplied(job.id) ? (
                <Button size="sm" variant="outline" disabled>
                  <FileText className="mr-2 h-4 w-4" /> Applied
                </Button>
              ) : (
                <Button size="sm" onClick={() => openApplicationForm(job.id)}>
                  <FileText className="mr-2 h-4 w-4" /> Apply Now
                </Button>
              )}
              
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleToggleSaveJob(job)}
              >
                {isJobSaved(job.id) ? (
                  <>
                    <BookmarkCheck className="mr-2 h-4 w-4" /> Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="mr-2 h-4 w-4" /> Save
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Button variant="outline" className="w-full">View All Job Listings</Button>

      {/* Job Application Form Dialog */}
      {openJobId && (
        <JobApplicationForm
          jobId={openJobId}
          job={jobListings.find(job => job.id === openJobId)!}
          isOpen={openJobId !== null}
          onClose={closeApplicationForm}
          onSuccess={() => handleApplicationSuccess(openJobId)}
          onSubmit={(data) => applyForJob(openJobId, data)}
        />
      )}
    </div>
  );
};

export default JobListings;
