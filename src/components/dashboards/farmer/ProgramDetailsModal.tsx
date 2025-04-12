
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Calendar, MapPin, Users, CheckCircle, Clock, DollarSign, Info } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Program {
  id: string;
  title: string;
  company: string;
  description: string;
  type: string;
  duration: string;
  start_date?: string;
  end_date?: string;
  location: string;
  is_remote: boolean;
  eligibility: string;
  compensation: string;
  terms: string;
}

interface ProgramDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  programId: string | null;
  onExpressInterest: (programId: string) => Promise<boolean>;
  hasExpressedInterest: boolean;
}

const ProgramDetailsModal = ({ 
  isOpen, 
  onClose, 
  programId, 
  onExpressInterest,
  hasExpressedInterest
}: ProgramDetailsModalProps) => {
  const [program, setProgram] = React.useState<Program | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (isOpen && programId) {
      fetchProgramDetails(programId);
    } else {
      setProgram(null);
    }
  }, [isOpen, programId]);

  const fetchProgramDetails = async (id: string) => {
    setLoading(true);
    try {
      // In a real app, this would fetch from Supabase
      // const { data, error } = await supabase
      //   .from('mnc_programs')
      //   .select('*')
      //   .eq('id', id)
      //   .single();
      
      // if (error) throw error;
      // setProgram(data);

      // Mock data for demonstration
      setTimeout(() => {
        setProgram({
          id,
          title: id === '1' ? 'Sustainable Cotton Farming Program' : 'Organic Rice Cultivation Program',
          company: id === '1' ? 'Global Textiles Inc.' : 'FoodCorp International',
          description: id === '1' 
            ? 'Join our sustainable cotton farming initiative aimed at promoting environmentally friendly farming practices while ensuring premium pricing for your produce through guaranteed purchase agreements.'
            : 'This program focuses on training farmers in organic rice cultivation methods, providing certification support, and connecting them with international markets for higher profit margins.',
          type: id === '1' ? 'Field Collaboration' : 'Skill Training & Certification',
          duration: id === '1' ? '12 months' : '6 months',
          start_date: id === '1' ? '2025-06-01' : '2025-05-15',
          end_date: id === '1' ? '2026-05-31' : '2025-11-15',
          location: id === '1' ? 'Tamil Nadu' : 'Punjab',
          is_remote: id === '1' ? false : false,
          eligibility: id === '1' 
            ? 'Farmers with at least 2 acres of land suitable for cotton cultivation and 2+ years of farming experience.'
            : 'Farmers with access to rice fields and basic understanding of rice cultivation.',
          compensation: id === '1' 
            ? 'Guaranteed purchase at 15% above market rate, free training, and agricultural input support.'
            : 'Certification cost coverage, 10% premium on organic rice, and free access to organic fertilizers.',
          terms: id === '1' 
            ? 'Farmers must comply with sustainability guidelines provided during the training phase. Regular monitoring visits will be conducted.'
            : 'Participants must adhere to strict organic farming practices and submit to regular quality checks.'
        });
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching program details:', error);
      toast({
        title: "Error",
        description: "Failed to load program details. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const handleExpressInterest = async () => {
    if (!program || !programId) return;
    
    setSubmitting(true);
    try {
      const success = await onExpressInterest(programId);
      if (success) {
        toast({
          title: "Success!",
          description: `You've successfully expressed interest in ${program.title}!`,
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Error expressing interest:', error);
      toast({
        title: "Error",
        description: "Failed to express interest. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading program details...</p>
          </div>
        ) : program ? (
          <>
            <DialogHeader>
              <div className="flex justify-between items-start">
                <div>
                  <DialogTitle className="text-xl font-bold">{program.title}</DialogTitle>
                  <DialogDescription className="text-base mt-1">{program.company}</DialogDescription>
                </div>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  Long-term
                </Badge>
              </div>
            </DialogHeader>
            
            <div className="space-y-6 my-4">
              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" /> Program Description
                </h3>
                <p className="text-muted-foreground">{program.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1 flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" /> Program Type
                    </h4>
                    <p>{program.type}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" /> Duration
                    </h4>
                    <p>{program.duration}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" /> Timeline
                    </h4>
                    <p>Start: {program.start_date || 'TBD'}</p>
                    <p>End: {program.end_date || 'TBD'}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" /> Location
                    </h4>
                    <p>{program.location} {program.is_remote ? '(Remote Available)' : '(On-site)'}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" /> Eligibility
                    </h4>
                    <p className="text-sm">{program.eligibility}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1 flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" /> Compensation
                    </h4>
                    <p className="text-sm">{program.compensation}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                  Terms & Conditions
                </h3>
                <p className="text-sm text-muted-foreground">{program.terms}</p>
              </div>
            </div>
            
            <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button 
                onClick={handleExpressInterest} 
                disabled={hasExpressedInterest || submitting}
                className={hasExpressedInterest ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : hasExpressedInterest ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Interest Expressed
                  </>
                ) : (
                  "Express Interest"
                )}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">Program details not found.</p>
            <Button variant="outline" onClick={onClose} className="mt-4">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProgramDetailsModal;
