
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Plus, Eye, Edit2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ViewApplicantsModal from './ViewApplicantsModal';
import EditJobPostingModal from './EditJobPostingModal';

interface JobPosting {
  id: number;
  title: string;
  location: string;
  workers_needed: number;
  salary_range: string;
  duration: string;
  start_date: string;
  description: string;
  applicant_count: number;
}

const JobPostings = () => {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewApplicantsOpen, setViewApplicantsOpen] = useState(false);
  const [editJobOpen, setEditJobOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchJobPostings();
  }, []);

  const fetchJobPostings = async () => {
    setIsLoading(true);
    try {
      // Fetch job postings with applicant counts using a join or count query
      const { data, error } = await supabase
        .from('job_postings')
        .select('*, applicant_count:job_applications(count)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to include applicant count
      const formattedData = data?.map(job => ({
        ...job,
        applicant_count: job.applicant_count?.[0]?.count || 0
      })) || [];
      
      setJobPostings(formattedData);
    } catch (error) {
      console.error('Error fetching job postings:', error);
      toast({
        title: 'Error',
        description: 'Could not load job postings.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewApplicants = (jobId: number, jobTitle: string) => {
    setSelectedJobId(jobId);
    setSelectedJobTitle(jobTitle);
    setViewApplicantsOpen(true);
  };

  const handleEditJob = (jobId: number) => {
    setSelectedJobId(jobId);
    setEditJobOpen(true);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Active Job Postings</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Post New Job
        </Button>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4">
          {[1, 2].map((item) => (
            <Card key={item} className="mb-4 animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-gray-200 rounded mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-9 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-9 bg-gray-200 rounded w-1/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : jobPostings.length === 0 ? (
        <Card className="mb-4">
          <CardContent className="pt-6 text-center text-muted-foreground">
            No job postings found. Click "Post New Job" to create one.
          </CardContent>
        </Card>
      ) : (
        jobPostings.map((job) => (
          <Card key={job.id} className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" /> {job.location || 'Location not specified'}
                  </CardDescription>
                </div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
                  {job.applicant_count} {job.applicant_count === 1 ? 'Applicant' : 'Applicants'}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 mb-4">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <span className="text-xs text-muted-foreground">Workers Needed:</span>
                    <p className="font-medium">{job.workers_needed}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Daily Wage:</span>
                    <p className="font-medium">{job.salary_range}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Duration:</span>
                    <p className="font-medium">{job.duration}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Start Date:</span>
                    <p className="font-medium">
                      {job.start_date ? new Date(job.start_date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long', 
                        day: 'numeric'
                      }) : 'Not specified'}
                    </p>
                  </div>
                </div>
                <p className="mt-2">{job.description}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm"
                  onClick={() => handleViewApplicants(job.id, job.title)}
                >
                  <Eye className="mr-2 h-4 w-4" /> View Applicants
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleEditJob(job.id)}
                >
                  <Edit2 className="mr-2 h-4 w-4" /> Edit Posting
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
      
      <Button variant="outline" className="w-full">View All Job Postings</Button>

      <ViewApplicantsModal
        open={viewApplicantsOpen}
        onOpenChange={setViewApplicantsOpen}
        jobId={selectedJobId}
        jobTitle={selectedJobTitle}
      />

      <EditJobPostingModal
        open={editJobOpen}
        onOpenChange={setEditJobOpen}
        jobId={selectedJobId}
        onJobUpdated={fetchJobPostings}
      />
    </>
  );
};

export default JobPostings;
