
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/auth/useAuth';
import { Loader2 } from 'lucide-react';

interface JobApplicationFormProps {
  jobId: number;
  job: {
    title: string;
    company: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormValues {
  name: string;
  email: string;
  message: string;
  file?: FileList;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({
  jobId,
  job,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      name: profile?.name || '',
      email: profile?.email || '',
      message: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    if (!profile) {
      toast({
        title: "Authentication required",
        description: "Please log in to apply for jobs",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let fileUrl = null;
      
      // Upload file if provided
      if (data.file && data.file.length > 0) {
        const file = data.file[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `job-applications/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('job-applications')
          .upload(filePath, file);
          
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
          farmer_id: Number(profile.id),
          name: data.name,
          email: data.email,
          message: data.message,
          file_url: fileUrl
        });
        
      if (insertError) throw insertError;
      
      onSuccess();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Apply for: {job.title}</DialogTitle>
          <DialogDescription>
            Fill out this form to apply for the position at {job.company}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Cover Message</Label>
              <Textarea
                id="message"
                placeholder="Why are you interested in this position?"
                rows={4}
                {...register("message")}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="file">Upload Document (Resume, proof of eligibility, etc.)</Label>
              <Input
                id="file"
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                {...register("file")}
              />
              <p className="text-xs text-gray-500">
                Accepted file types: PDF, DOC, DOCX, JPG, JPEG, PNG
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationForm;
