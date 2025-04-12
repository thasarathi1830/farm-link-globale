
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, X, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface DocumentUploaderProps {
  landId: string | number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDocumentsUploaded?: (documents: {url: string, name: string, type: string}[]) => void;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ 
  landId, 
  open, 
  onOpenChange,
  onDocumentsUploaded 
}) => {
  const { toast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const newFiles: File[] = [];
    
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      
      // Check file type
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type. Please upload PDF, DOCX, JPG or PNG files.`,
          variant: "destructive"
        });
        continue;
      }
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the 5MB size limit`,
          variant: "destructive"
        });
        continue;
      }
      
      newFiles.push(file);
    }
    
    setSelectedFiles([...selectedFiles, ...newFiles]);
  };

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) {
      return '📄';
    } else if (fileType.includes('wordprocessingml')) {
      return '📝';
    } else if (fileType.includes('image')) {
      return '🖼️';
    }
    return '📎';
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) return;
    
    setIsUploading(true);
    const uploadedDocs: {url: string, name: string, type: string}[] = [];
    
    try {
      for (const file of selectedFiles) {
        const fileName = `${landId}/${Date.now()}-${file.name}`;
        
        // In a real implementation, you would upload to Supabase Storage
        // Example:
        /*
        const { data, error } = await supabase.storage
          .from('land-documents')
          .upload(fileName, file);
        
        if (error) throw error;
        
        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('land-documents')
          .getPublicUrl(fileName);
          
        uploadedDocs.push({
          url: publicUrlData.publicUrl,
          name: file.name,
          type: file.type
        });
        */
        
        // Simulating upload success
        uploadedDocs.push({
          url: `https://example.com/${fileName}`,
          name: file.name,
          type: file.type
        });
      }
      
      toast({
        title: "Upload successful",
        description: `${selectedFiles.length} documents uploaded successfully`
      });
      
      if (onDocumentsUploaded) {
        onDocumentsUploaded(uploadedDocs);
      }
      
      // Close dialog and reset state
      onOpenChange(false);
      setSelectedFiles([]);
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your documents",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Land Documents</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg border border-dashed border-muted-foreground/25 p-10">
            <div className="flex flex-col items-center justify-center text-center">
              <FileText className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="font-medium mb-1">Drag and drop your documents</h3>
              <p className="text-sm text-muted-foreground mb-3">PDF, DOCX, PNG, JPG up to 5MB</p>
              
              <input
                type="file"
                id="land-documents"
                multiple
                accept=".pdf,.docx,image/png,image/jpeg"
                className="hidden"
                onChange={handleFileChange}
              />
              <label htmlFor="land-documents">
                <Button variant="secondary" className="cursor-pointer" asChild>
                  <span><Upload className="h-4 w-4 mr-2" /> Choose Files</span>
                </Button>
              </label>
            </div>
          </div>
          
          {selectedFiles.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Selected Documents ({selectedFiles.length})</h4>
              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between rounded-md border p-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getFileIcon(file.type)}</span>
                      <div>
                        <p className="font-medium text-sm">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeFile(index)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!selectedFiles.length || isUploading}>
            {isUploading ? 'Uploading...' : 'Upload Documents'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentUploader;
