
import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle, 
} from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FileDown, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

interface ViewApplicantsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: number | null;
  jobTitle: string;
}

type Applicant = {
  id: string;
  name: string;
  email: string;
  file_url: string | null;
  status: string;
  created_at: string;
}

// Sample applicant data - replace with actual data from your database
const SAMPLE_APPLICANTS: Record<number, Applicant[]> = {
  1: [
    {
      id: "a1b2c3",
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      file_url: "https://example.com/resume.pdf",
      status: "pending",
      created_at: "2025-04-01T10:30:00Z"
    },
    {
      id: "d4e5f6",
      name: "Priya Singh",
      email: "priya@example.com",
      file_url: "https://example.com/priya-resume.pdf",
      status: "reviewed",
      created_at: "2025-04-02T14:15:00Z"
    },
    {
      id: "g7h8i9",
      name: "Amit Patel",
      email: "amit@example.com",
      file_url: null,
      status: "shortlisted",
      created_at: "2025-04-03T09:45:00Z"
    }
  ],
  2: [] // No applicants for job ID 2
};

const ViewApplicantsModal = ({ open, onOpenChange, jobId, jobTitle }: ViewApplicantsModalProps) => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (open && jobId !== null) {
      fetchApplicants();
    }
  }, [open, jobId]);

  const fetchApplicants = async () => {
    setIsLoading(true);
    try {
      // Simulate API call with sample data
      setTimeout(() => {
        const applicantData = jobId ? SAMPLE_APPLICANTS[jobId] || [] : [];
        setApplicants(applicantData);
        setIsLoading(false);
      }, 500);
      
      // Once job_applications table is properly set up in your database, use this:
      // const { data, error } = await supabase
      //   .from('job_applications')
      //   .select('*')
      //   .eq('job_id', jobId)
      //   .order('created_at', { ascending: false });

      // if (error) throw error;
      
      // setApplicants(data || []);
    } catch (error) {
      console.error('Error fetching applicants:', error);
      toast({
        title: 'Error',
        description: 'Could not load applicants.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (applicantId: string, newStatus: string) => {
    setIsUpdating(applicantId);
    try {
      // Simulate API call to update status
      setTimeout(() => {
        setApplicants(prevApplicants => 
          prevApplicants.map(app => 
            app.id === applicantId ? { ...app, status: newStatus } : app
          )
        );
        
        toast({
          title: 'Status updated',
          description: `Applicant status changed to ${newStatus}.`
        });
        
        setIsUpdating(null);
      }, 500);
      
      // Once job_applications table is properly set up in your database, use this:
      // const { error } = await supabase
      //   .from('job_applications')
      //   .update({ status: newStatus })
      //   .eq('id', applicantId);

      // if (error) throw error;
      
      // setApplicants(prevApplicants => 
      //   prevApplicants.map(app => 
      //     app.id === applicantId ? { ...app, status: newStatus } : app
      //   )
      // );
      
      // toast({
      //   title: 'Status updated',
      //   description: `Applicant status changed to ${newStatus}.`
      // });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update status.',
        variant: 'destructive'
      });
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Applicants for: {jobTitle}</DialogTitle>
          <DialogDescription>
            Review and manage all applications for this job posting
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : applicants.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No applications yet for this job posting.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Application Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Resume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants.map((applicant) => (
                <TableRow key={applicant.id}>
                  <TableCell className="font-medium">{applicant.name}</TableCell>
                  <TableCell>{applicant.email}</TableCell>
                  <TableCell>
                    {format(new Date(applicant.created_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue={applicant.status}
                      onValueChange={(value) => updateStatus(applicant.id, value)}
                      disabled={isUpdating === applicant.id}
                    >
                      <SelectTrigger className="w-32">
                        {isUpdating === applicant.id ? (
                          <div className="flex items-center">
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            <span>Updating</span>
                          </div>
                        ) : (
                          <SelectValue />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="shortlisted">Shortlisted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="hired">Hired</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {applicant.file_url ? (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open(applicant.file_url!, '_blank')}
                      >
                        <FileDown className="h-4 w-4 mr-1" /> Download
                      </Button>
                    ) : (
                      <span className="text-muted-foreground text-sm">No resume</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewApplicantsModal;
