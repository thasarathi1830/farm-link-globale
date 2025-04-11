
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { FileText, Upload, X, FileCheck, File } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';

const DocumentUploader = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Aadhaar Card.pdf', size: '2.4 MB', type: 'Identity', status: 'verified' },
    { id: 2, name: 'PAN Card.pdf', size: '1.8 MB', type: 'Identity', status: 'pending' },
  ]);
  const [activeDocument, setActiveDocument] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type and size
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a PDF, JPEG, or PNG file.",
      });
      return;
    }

    if (file.size > maxSize) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Maximum file size is 5MB.",
      });
      return;
    }

    // Simulate upload
    setIsUploading(true);
    setUploadProgress(0);
    
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          
          // Add new document
          const newDoc = {
            id: Date.now(),
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            type: 'Certification',
            status: 'pending'
          };
          
          setDocuments([...documents, newDoc]);
          
          toast({
            title: "Document uploaded",
            description: "Your document has been uploaded successfully and is pending verification.",
          });
          
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const deleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast({
      title: "Document deleted",
      description: "The document has been removed from your profile.",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'text-green-500';
      case 'pending':
        return 'text-amber-500';
      case 'rejected':
        return 'text-red-500';
      default:
        return '';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <FileCheck className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <FileText className="h-4 w-4 text-amber-500" />;
      case 'rejected':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Documents</CardTitle>
        <CardDescription>
          Upload and manage important documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isUploading && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        <div className="space-y-4">
          {documents.map((doc) => (
            <div 
              key={doc.id} 
              className="flex items-center justify-between p-2 border rounded hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(doc.status)}
                <div>
                  <p className="text-sm font-medium">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {doc.size} · {doc.type} · 
                    <span className={`ml-1 ${getStatusColor(doc.status)}`}>
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={() => setActiveDocument(doc)}
                    >
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">View document</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{activeDocument?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center py-4">
                      <File className="h-16 w-16 text-muted-foreground mb-2" />
                      <p className="text-sm text-center text-muted-foreground">
                        Document preview not available. Please download to view.
                      </p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" className="w-full">Download</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-500"
                        onClick={() => deleteDocument(doc.id)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Delete document</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete document</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="flex justify-center">
          <input 
            type="file" 
            id="document-upload" 
            className="hidden" 
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          <label htmlFor="document-upload">
            <Button 
              variant="outline" 
              className="w-full"
              disabled={isUploading}
              asChild
            >
              <span>
                <Upload className="mr-2 h-4 w-4" />
                Upload New Document
              </span>
            </Button>
          </label>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUploader;
