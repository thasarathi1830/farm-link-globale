
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

interface EditJobPostingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: number | null;
  onJobUpdated: () => void;
}

interface JobFormValues {
  title: string;
  location: string;
  description: string;
  requiredSkills: string;
  duration: string;
  salary: string;
  workers: number;
  startDate: string;
}

// Sample job data - this would normally be fetched from the database
const SAMPLE_JOB_DATA = {
  1: {
    title: 'Farm Workers Needed for Harvest Season',
    location: 'Bangalore Rural',
    description: 'Looking for experienced farm workers for the upcoming harvest season. Work includes harvesting crops, operating basic equipment, and packaging produce.',
    required_skills: 'Experience with harvesting crops, ability to work long hours outdoors',
    duration: '3 weeks',
    salary_range: '₹500-600/day',
    workers_needed: 5,
    start_date: '2025-05-15',
  },
  2: {
    title: 'Seasonal Rice Field Workers',
    location: 'Mysore District',
    description: 'Rice field workers needed for planting season. Experience in paddy field work preferred. Accommodation can be provided for workers from distant locations.',
    required_skills: 'Experience with rice cultivation, teamwork',
    duration: '1 month',
    salary_range: '₹450-550/day',
    workers_needed: 8,
    start_date: '2025-06-01',
  }
};

const EditJobPostingModal = ({ 
  open, 
  onOpenChange, 
  jobId, 
  onJobUpdated 
}: EditJobPostingModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<JobFormValues>({
    defaultValues: {
      title: '',
      location: '',
      description: '',
      requiredSkills: '',
      duration: '',
      salary: '',
      workers: 1,
      startDate: '',
    }
  });

  useEffect(() => {
    if (open && jobId !== null) {
      fetchJobDetails();
    }
  }, [open, jobId]);

  const fetchJobDetails = async () => {
    setIsLoading(true);
    try {
      // This would be replaced with actual API call once job_postings table exists
      setTimeout(() => {
        // Get the sample job data based on jobId
        const data = SAMPLE_JOB_DATA[jobId as keyof typeof SAMPLE_JOB_DATA];
        
        if (data) {
          form.reset({
            title: data.title || '',
            location: data.location || '',
            description: data.description || '',
            requiredSkills: data.required_skills || '',
            duration: data.duration || '',
            salary: data.salary_range || '',
            workers: data.workers_needed || 1,
            startDate: data.start_date ? data.start_date.split('T')[0] : '',
          });
        }
        
        setIsLoading(false);
      }, 500);
      
      // Once you have a job_postings table in your database, use this:
      // const { data, error } = await supabase
      //   .from('job_postings')
      //   .select('*')
      //   .eq('id', jobId)
      //   .single();

      // if (error) throw error;
      
      // if (data) {
      //   form.reset({
      //     title: data.title || '',
      //     location: data.location || '',
      //     description: data.description || '',
      //     requiredSkills: data.required_skills || '',
      //     duration: data.duration || '',
      //     salary: data.salary_range || '',
      //     workers: data.workers_needed || 1,
      //     startDate: data.start_date ? data.start_date.split('T')[0] : '',
      //   });
      // }
    } catch (error) {
      console.error('Error fetching job details:', error);
      toast({
        title: 'Error',
        description: 'Could not load job details.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: JobFormValues) => {
    if (!jobId) return;
    
    setIsSaving(true);
    try {
      // Simulate API call for updating the job posting
      setTimeout(() => {
        toast({
          title: 'Success',
          description: 'Job posting updated successfully.',
        });
        
        onJobUpdated();
        onOpenChange(false);
        setIsSaving(false);
      }, 1000);
      
      // Once you have a job_postings table in your database, use this:
      // const { error } = await supabase
      //   .from('job_postings')
      //   .update({
      //     title: values.title,
      //     location: values.location,
      //     description: values.description,
      //     required_skills: values.requiredSkills,
      //     duration: values.duration,
      //     salary_range: values.salary,
      //     workers_needed: values.workers,
      //     start_date: values.startDate,
      //     updated_at: new Date().toISOString(),
      //   })
      //   .eq('id', jobId);

      // if (error) throw error;
      
      // toast({
      //   title: 'Success',
      //   description: 'Job posting updated successfully.',
      // });
      
      // onJobUpdated();
      // onOpenChange(false);
    } catch (error) {
      console.error('Error updating job posting:', error);
      toast({
        title: 'Error',
        description: 'Failed to update job posting.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Job Posting</DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Job Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 3 weeks, 2 months" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary/Pay Rate</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., ₹500-600/day" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="workers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workers Needed</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the job responsibilities and requirements" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="requiredSkills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required Skills</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="List the skills required for this job" 
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditJobPostingModal;
