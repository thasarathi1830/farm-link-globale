
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const DocumentUploader = () => {
  const { toast } = useToast();
  const [documentUploading, setDocumentUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF, JPG, or PNG files only.",
        variant: "destructive"
      });
      return;
    }

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB.",
        variant: "destructive"
      });
      return;
    }

    setDocumentUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDocumentUploading(false);
          toast({
            title: "Document Uploaded",
            description: `${file.name} has been uploaded successfully.`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" /> Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-gray-100 flex items-center justify-center">
                <Upload className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium">ID Proof</p>
                <p className="text-xs text-muted-foreground">Upload your identity document</p>
              </div>
            </div>
            <div>
              <input
                type="file"
                id="id-proof-upload"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleDocumentUpload}
              />
              <label htmlFor="id-proof-upload">
                <Button size="sm" variant="outline" className={documentUploading ? "pointer-events-none" : ""} asChild>
                  <span>Upload</span>
                </Button>
              </label>
            </div>
          </div>
          
          {documentUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-1" />
            </div>
          )}
          
          <Dialog>
            <Button size="sm" variant="outline" className="w-full mt-2" asChild>
              <DialogTrigger>Document Guidelines</DialogTrigger>
            </Button>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Document Upload Guidelines</DialogTitle>
                <DialogDescription>
                  Please ensure all documents meet the following requirements.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="text-sm">
                  <h4 className="font-medium mb-1">Accepted File Types</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>PDF documents</li>
                    <li>JPEG/JPG images</li>
                    <li>PNG images</li>
                  </ul>
                </div>
                <div className="text-sm">
                  <h4 className="font-medium mb-1">File Requirements</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Maximum file size: 5MB</li>
                    <li>Must be clearly legible</li>
                    <li>Should not be expired documents</li>
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUploader;
