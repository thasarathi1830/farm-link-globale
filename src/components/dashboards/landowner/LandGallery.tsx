
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Image, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const LandGallery = () => {
  const { toast } = useToast();
  const [landImages, setLandImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 2 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload JPG or PNG files only.",
        variant: "destructive"
      });
      return;
    }

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Maximum file size is 2MB.",
        variant: "destructive"
      });
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    
    setLandImages([...landImages, {
      id: Date.now(),
      name: file.name,
      url: imageUrl
    }]);

    toast({
      title: "Image Uploaded",
      description: `${file.name} has been added to your land gallery.`,
    });
  };

  const openImagePreview = (image) => {
    setPreviewImage(image);
  };

  const deleteImage = (id) => {
    setLandImages(landImages.filter(image => image.id !== id));
    if (previewImage && previewImage.id === id) {
      setPreviewImage(null);
    }
    toast({
      title: "Image Deleted",
      description: "The image has been removed from your gallery.",
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Land Gallery</h2>
        <div>
          <input
            type="file"
            id="land-image-upload"
            className="hidden"
            accept=".jpg,.jpeg,.png"
            onChange={handleImageUpload}
          />
          <label htmlFor="land-image-upload">
            <Button asChild>
              <span><Image className="mr-2 h-4 w-4" /> Add Images</span>
            </Button>
          </label>
        </div>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          {landImages.length > 0 ? (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {landImages.map(image => (
                  <div key={image.id} className="relative group">
                    <div className="aspect-square rounded-md overflow-hidden border">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => openImagePreview(image)}
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-white" 
                              onClick={() => openImagePreview(image)}>
                        <Image className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-white" 
                              onClick={() => deleteImage(image.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs truncate mt-1">{image.name}</p>
                  </div>
                ))}
              </div>
              
              {previewImage && (
                <Dialog open={!!previewImage} onOpenChange={open => !open && setPreviewImage(null)}>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>{previewImage.name}</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center justify-center overflow-hidden max-h-[70vh]">
                      <img
                        src={previewImage.url}
                        alt={previewImage.name}
                        className="max-w-full max-h-[70vh] object-contain"
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="destructive" onClick={() => deleteImage(previewImage.id)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Image
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <Image className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No images yet</h3>
              <p className="text-muted-foreground mb-4">Upload images of your land to showcase its features.</p>
              <input
                type="file"
                id="land-image-upload-empty"
                className="hidden"
                accept=".jpg,.jpeg,.png"
                onChange={handleImageUpload}
              />
              <label htmlFor="land-image-upload-empty">
                <Button variant="outline" asChild>
                  <span>Upload First Image</span>
                </Button>
              </label>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default LandGallery;
