
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ensureStorageBucket } from '@/utils/storage-utils';

interface UseJobApplicationsProps {
  userId?: string | null;
}

export const useJobApplications = ({ userId }: UseJobApplicationsProps) => {
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (userId) {
      fetchSavedJobs();
      fetchAppliedJobs();
      ensureStorageBucket('job-applications');
    }
  }, [userId]);

  const fetchSavedJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('saved_jobs')
        .select('job_id')
        .eq('farmer_id', userId ? Number(userId) : 0);

      if (error) throw error;
      
      if (data) {
        setSavedJobs(data.map(item => item.job_id));
      }
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('job_id')
        .eq('farmer_id', userId ? Number(userId) : 0);

      if (error) throw error;
      
      if (data) {
        setAppliedJobs(data.map(item => item.job_id));
      }
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
    }
  };

  const saveJob = async (jobId: number, jobTitle: string, companyName: string) => {
    if (!userId) {
      toast({
        title: "Authentication required",
        description: "Please log in to save jobs",
        variant: "destructive"
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('saved_jobs')
        .insert({
          job_id: jobId,
          farmer_id: Number(userId),
          title: jobTitle,
          company_name: companyName,
        });
        
      if (error) throw error;
      
      setSavedJobs([...savedJobs, jobId]);
      
      toast({
        title: "Job saved",
        description: "Job added to your saved list"
      });
      
      return true;
    } catch (error) {
      console.error('Error saving job:', error);
      toast({
        title: "Error",
        description: "Failed to save job. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  const unsaveJob = async (jobId: number) => {
    if (!userId) return false;

    try {
      const { error } = await supabase
        .from('saved_jobs')
        .delete()
        .eq('job_id', jobId)
        .eq('farmer_id', Number(userId));
        
      if (error) throw error;
      
      setSavedJobs(savedJobs.filter(id => id !== jobId));
      
      toast({
        title: "Job removed",
        description: "Job removed from your saved list"
      });
      
      return true;
    } catch (error) {
      console.error('Error unsaving job:', error);
      toast({
        title: "Error",
        description: "Failed to remove job. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  const toggleSaveJob = async (jobId: number, jobTitle: string, companyName: string) => {
    if (savedJobs.includes(jobId)) {
      return unsaveJob(jobId);
    } else {
      return saveJob(jobId, jobTitle, companyName);
    }
  };

  const isJobSaved = (jobId: number) => {
    return savedJobs.includes(jobId);
  };

  const isJobApplied = (jobId: number) => {
    return appliedJobs.includes(jobId);
  };

  const applyForJob = async (jobId: number, application: {
    name: string;
    email: string;
    message?: string;
    file?: File;
  }) => {
    if (!userId) {
      toast({
        title: "Authentication required",
        description: "Please log in to apply for jobs",
        variant: "destructive"
      });
      return false;
    }
    
    try {
      let fileUrl = null;
      
      // Upload file if provided
      if (application.file) {
        // Ensure the bucket exists
        await ensureStorageBucket('job-applications');
        
        const fileExt = application.file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${userId}/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('job-applications')
          .upload(filePath, application.file);
          
        if (uploadError) throw uploadError;
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('job-applications')
          .getPublicUrl(filePath);
          
        fileUrl = publicUrl;
      }
      
      // Save application to database
      const { error: insertError } = await supabase
        .from('job_applications')
        .insert({
          job_id: jobId,
          farmer_id: Number(userId),
          name: application.name,
          email: application.email,
          message: application.message || null,
          file_url: fileUrl
        });
        
      if (insertError) throw insertError;
      
      setAppliedJobs([...appliedJobs, jobId]);
      
      toast({
        title: "Application submitted",
        description: "Your job application has been submitted successfully!"
      });
      
      return true;
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    savedJobs,
    appliedJobs,
    isLoading,
    saveJob,
    unsaveJob,
    toggleSaveJob,
    isJobSaved,
    isJobApplied,
    applyForJob
  };
};
