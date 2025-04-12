
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface LandImageUploaderProps {
  landId: string | number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImagesUploaded?: (imageUrls: string[]) => void;
}

const LandImageUploader: React.FC<LandImageUploaderProps> = ({ 
  landId, 
  open, 
  onOpenChange,
  onImagesUploaded 
}) => {
  const { toast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const newFiles: File[] = [];
    const newPreviews: string[] = [];
    
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an image file`,
          variant: "destructive"
        });
        continue;
      }
      
      // Check file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the 2MB size limit`,
          variant: "destructive"
        });
        continue;
      }
      
      newFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    }
    
    setSelectedFiles([...selectedFiles, ...newFiles]);
    setPreviews([...previews, ...newPreviews]);
  };

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles];
    const newPreviews = [...previews];
    
    // Release the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviews[index]);
    
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) return;
    
    setIsUploading(true);
    const uploadedUrls: string[] = [];
    
    try {
      for (const file of selectedFiles) {
        const fileName = `${landId}/${Date.now()}-${file.name}`;
        
        // In a real implementation, you would upload to Supabase Storage
        // For now, let's simulate success
        // Example of actual Supabase upload code:
        /*
        const { data, error } = await supabase.storage
          .from('land-images')
          .upload(fileName, file);
        
        if (error) throw error;
        
        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('land-images')
          .getPublicUrl(fileName);
          
        uploadedUrls.push(publicUrlData.publicUrl);
        */
        
        // Simulating upload success
        uploadedUrls.push(URL.createObjectURL(file));
      }
      
      toast({
        title: "Upload successful",
        description: `${selectedFiles.length} images uploaded successfully`
      });
      
      if (onImagesUploaded) {
        onImagesUploaded(uploadedUrls);
      }
      
      // Close dialog and reset state
      onOpenChange(false);
      setSelectedFiles([]);
      setPreviews([]);
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your images",
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
          <DialogTitle>Upload Land Images</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg border border-dashed border-muted-foreground/25 p-10">
            <div className="flex flex-col items-center justify-center text-center">
              <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="font-medium mb-1">Drag and drop your images</h3>
              <p className="text-sm text-muted-foreground mb-3">PNG, JPG up to 2MB</p>
              
              <input
                type="file"
                id="land-images"
                multiple
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
                onChange={handleFileChange}
              />
              <label htmlFor="land-images">
                <Button variant="secondary" className="cursor-pointer" asChild>
                  <span><Upload className="h-4 w-4 mr-2" /> Choose Files</span>
                </Button>
              </label>
            </div>
          </div>
          
          {previews.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Selected Images ({previews.length})</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {previews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-md overflow-hidden border">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full h-6 w-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
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
            {isUploading ? 'Uploading...' : 'Upload Images'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LandImageUploader;
