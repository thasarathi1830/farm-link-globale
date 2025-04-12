
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Printer, File, Calendar, Users, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Agreement {
  id: string;
  title: string;
  type: string;
  status: 'active' | 'expired' | 'pending' | 'draft';
  parties: {
    name: string;
    role: string;
    email?: string;
  }[];
  dateCreated: string;
  dateSigned?: string;
  expiryDate?: string;
  fileUrl?: string;
  fileType?: 'pdf' | 'doc' | 'text';
  content?: string;
}

interface AgreementViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  agreementId: string | null;
}

const AgreementViewerModal: React.FC<AgreementViewerModalProps> = ({ isOpen, onClose, agreementId }) => {
  const [agreement, setAgreement] = useState<Agreement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && agreementId) {
      fetchAgreementDetails(agreementId);
    }
  }, [isOpen, agreementId]);

  const fetchAgreementDetails = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      // In a real app, we would fetch from Supabase
      // const { data, error } = await supabase
      //   .from('agreements')
      //   .select('*')
      //   .eq('id', id)
      //   .single();
      
      // if (error) throw error;
      // setAgreement(data);
      
      // Using mock data for now
      setTimeout(() => {
        setAgreement({
          id,
          title: 'Land Lease Agreement - Cotton Farm Project',
          type: 'Lease Agreement',
          status: 'active',
          parties: [
            { name: 'AgriCorp International', role: 'Corporate Entity', email: 'contracts@agricorp.com' },
            { name: 'James Thompson', role: 'Landowner', email: 'james.t@example.com' },
            { name: 'Maria Rodriguez', role: 'Farmer', email: 'maria.r@example.com' }
          ],
          dateCreated: '2025-01-10',
          dateSigned: '2025-01-15',
          expiryDate: '2026-01-14',
          fileUrl: 'https://example.com/agreements/land-lease.pdf',
          fileType: 'pdf',
          content: `This LAND LEASE AGREEMENT (the "Agreement") is entered into as of January 15, 2025 (the "Effective Date"), by and between James Thompson ("Landowner"), Maria Rodriguez ("Farmer"), and AgriCorp International ("Corporate Entity").

WHEREAS, Landowner owns certain real property suitable for agricultural purposes; and

WHEREAS, Farmer desires to lease such property for the purpose of conducting farming operations; and

WHEREAS, Corporate Entity desires to sponsor and oversee the agricultural project;

NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the parties agree as follows:

1. PROPERTY DESCRIPTION
   The Landowner hereby leases to the Farmer, and the Farmer hereby leases from the Landowner, that certain parcel of land consisting of approximately 50 acres located at 123 Farmland Road, Rural County, State (the "Property").

2. LEASE TERM
   The term of this Agreement shall be for a period of one (1) year, commencing on January 15, 2025, and ending on January 14, 2026, unless earlier terminated in accordance with the provisions hereof.

3. RENT
   The Farmer shall pay rent to the Landowner in the amount of $X per acre per year, for a total annual rent of $X, payable in equal monthly installments of $X on the first day of each month.

4. USE OF PROPERTY
   The Farmer shall use the Property for the purpose of growing cotton crops in accordance with the Sustainable Cotton Farming Initiative guidelines provided by the Corporate Entity. The Farmer shall not use the Property for any other purpose without the prior written consent of the Landowner and Corporate Entity.

...`
        });
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error('Error fetching agreement:', err);
      setError('Failed to load agreement details. Please try again.');
      setLoading(false);
    }
  };

  const handleDownload = () => {
    // In a real app, we would download the file from Supabase Storage
    // const { data, error } = await supabase.storage
    //   .from('agreements')
    //   .download(agreement.fileUrl);
    
    toast({
      title: 'Download Started',
      description: 'Your agreement is being downloaded.',
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'expired':
        return <Badge className="bg-red-500">Expired</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending Signature</Badge>;
      case 'draft':
        return <Badge className="bg-blue-500">Draft</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
            <span className="ml-2">Loading agreement...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            <AlertCircle className="mx-auto h-12 w-12 mb-2" />
            <p>{error}</p>
            <Button onClick={() => agreementId && fetchAgreementDetails(agreementId)} className="mt-4">
              Retry
            </Button>
          </div>
        ) : agreement ? (
          <>
            <DialogHeader>
              <div className="flex justify-between items-start">
                <DialogTitle className="text-2xl font-bold">{agreement.title}</DialogTitle>
                {getStatusBadge(agreement.status)}
              </div>
              <div className="text-sm text-muted-foreground">{agreement.type}</div>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold flex items-center">
                    <Calendar className="mr-2 h-5 w-5" /> Timeline
                  </h3>
                  <p className="mt-1">
                    Created: {formatDate(agreement.dateCreated)} <br />
                    Signed: {formatDate(agreement.dateSigned)} <br />
                    Expires: {formatDate(agreement.expiryDate)}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold flex items-center">
                    <Users className="mr-2 h-5 w-5" /> Parties Involved
                  </h3>
                  <ul className="mt-1 space-y-2">
                    {agreement.parties.map((party, index) => (
                      <li key={index} className="flex flex-col">
                        <span className="font-medium">{party.name}</span>
                        <span className="text-sm text-muted-foreground">{party.role}</span>
                        {party.email && <span className="text-sm">{party.email}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-end space-x-2">
                  <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button variant="outline" onClick={handlePrint}>
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                </div>

                <div className="border rounded-md p-4 bg-gray-50 flex items-center justify-center h-32">
                  {agreement.fileUrl ? (
                    <div className="text-center">
                      <File className="h-12 w-12 mx-auto mb-2" />
                      <p>Agreement document available</p>
                      <Button variant="link" onClick={handleDownload}>
                        View full document
                      </Button>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No document attached</p>
                  )}
                </div>
              </div>
            </div>

            {agreement.content && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Agreement Preview</h3>
                <div className="border rounded-md p-4 max-h-96 overflow-y-auto whitespace-pre-line">
                  {agreement.content}
                </div>
              </div>
            )}

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={onClose}>Close</Button>
            </DialogFooter>
          </>
        ) : (
          <div className="text-center py-8">
            <p>No agreement found</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AgreementViewerModal;
