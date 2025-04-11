
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const DocumentsSection = () => {
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
          <Upload className="h-5 w-5" /> Land Documents
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
                <p className="text-sm font-medium">Land Ownership Documents</p>
                <p className="text-xs text-muted-foreground">Required to verify ownership</p>
              </div>
            </div>
            <div>
              <input
                type="file"
                id="land-doc-upload"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleDocumentUpload}
              />
              <label htmlFor="land-doc-upload">
                <Button size="sm" variant="outline" className={documentUploading ? "pointer-events-none" : ""} asChild>
                  <span>Upload</span>
                </Button>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-gray-100 flex items-center justify-center">
                <Upload className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Tax Records</p>
                <p className="text-xs text-muted-foreground">For verification purposes</p>
              </div>
            </div>
            <div>
              <input
                type="file"
                id="tax-doc-upload"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleDocumentUpload}
              />
              <label htmlFor="tax-doc-upload">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsSection;
