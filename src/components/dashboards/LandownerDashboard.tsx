import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Upload, UserPlus, BarChart4, Briefcase, Sprout, Plus, Users, Image, Map, Edit, Trash2, FileText, PieChart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const LandownerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [isEditingLand, setIsEditingLand] = useState(false);
  const [landDetails, setLandDetails] = useState({
    size: "5",
    type: "agricultural",
    soil: "Red Loamy",
    water: "Borewell, Canal",
    location: "Kolar District, Karnataka",
    cropHistory: "Rice, Maize, Vegetables"
  });

  const [documentUploading, setDocumentUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [landImages, setLandImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  
  const revenueData = [
    { month: 'Jan', revenue: 10500 },
    { month: 'Feb', revenue: 12000 },
    { month: 'Mar', revenue: 10800 },
    { month: 'Apr', revenue: 11500 },
    { month: 'May', revenue: 15000 },
    { month: 'Jun', revenue: 14200 },
    { month: 'Jul', revenue: 16500 },
    { month: 'Aug', revenue: 17800 },
    { month: 'Sep', revenue: 19200 },
    { month: 'Oct', revenue: 18500 },
    { month: 'Nov', revenue: 17000 },
    { month: 'Dec', revenue: 16800 },
  ];
  
  const cropRevenueData = [
    { name: 'Rice', value: 45000 },
    { name: 'Coconut', value: 30500 },
    { name: 'Vegetables', value: 12000 },
    { name: 'Fruits', value: 8500 },
  ];

  const handleLandDetailsUpdate = () => {
    setIsEditingLand(false);
    toast({
      title: "Land details updated",
      description: "Your land details have been updated successfully.",
    });
  };

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
    <div className="container py-10">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold">Landowner Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button className="w-full md:w-auto">
            <UserPlus className="mr-2 h-4 w-4" /> Complete Profile
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Profile Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45%</div>
            <Progress value={45} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Complete your profile to attract more farmers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Land Parcels Listed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-2">Of 3 total parcels</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Job Postings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-2">Getting farmer interest</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">MNC Interest</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-2">Corporations interested in your land</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="land" className="mb-6">
        <TabsList>
          <TabsTrigger value="land">My Land Parcels</TabsTrigger>
          <TabsTrigger value="jobs">Job Postings</TabsTrigger>
          <TabsTrigger value="farmers">Farmer Applications</TabsTrigger>
          <TabsTrigger value="gallery">Land Gallery</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="land" className="space-y-4 pt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Land Parcels</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Parcel
            </Button>
          </div>
          
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Agricultural Field ({landDetails.size} acres)</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" /> {landDetails.location}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsEditingLand(true)}>
                    <Edit className="h-4 w-4 mr-1" /> Edit Details
                  </Button>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                    Available for Lease
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {!isEditingLand ? (
                <div className="text-sm text-gray-600 mb-4">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <span className="text-xs text-muted-foreground">Soil Type:</span>
                      <p className="font-medium">{landDetails.soil}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Water Source:</span>
                      <p className="font-medium">{landDetails.water}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Crop History:</span>
                      <p className="font-medium">{landDetails.cropHistory}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Land Type:</span>
                      <p className="font-medium">{landDetails.type === "agricultural" ? "Agricultural" : 
                                                  landDetails.type === "orchard" ? "Orchard" : "Mixed Use"}</p>
                    </div>
                  </div>
                  <p className="mt-2">Well-maintained field with irrigation facilities, suitable for multiple crops.</p>
                </div>
              ) : (
                <div className="space-y-4 mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="land-size">Land Size (acres)</Label>
                      <Input 
                        id="land-size" 
                        value={landDetails.size} 
                        onChange={(e) => setLandDetails({...landDetails, size: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="land-type">Land Type</Label>
                      <Select 
                        value={landDetails.type} 
                        onValueChange={(value) => setLandDetails({...landDetails, type: value})}
                      >
                        <SelectTrigger id="land-type">
                          <SelectValue placeholder="Select land type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="agricultural">Agricultural</SelectItem>
                          <SelectItem value="orchard">Orchard</SelectItem>
                          <SelectItem value="mixed">Mixed Use</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="soil-type">Soil Type</Label>
                      <Input 
                        id="soil-type" 
                        value={landDetails.soil} 
                        onChange={(e) => setLandDetails({...landDetails, soil: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="water-source">Water Source</Label>
                      <Input 
                        id="water-source" 
                        value={landDetails.water} 
                        onChange={(e) => setLandDetails({...landDetails, water: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        value={landDetails.location} 
                        onChange={(e) => setLandDetails({...landDetails, location: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="crop-history">Crop History</Label>
                      <Input 
                        id="crop-history" 
                        value={landDetails.cropHistory} 
                        onChange={(e) => setLandDetails({...landDetails, cropHistory: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsEditingLand(false)}>Cancel</Button>
                    <Button onClick={handleLandDetailsUpdate}>Save Changes</Button>
                  </div>
                </div>
              )}
              
              {!isEditingLand && (
                <div className="flex gap-2">
                  <Button size="sm">View Map</Button>
                  <Button size="sm" variant="outline">View Inquiries (4)</Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Button variant="outline" className="w-full">View All Land Parcels</Button>
        </TabsContent>
        
        <TabsContent value="gallery" className="space-y-4 pt-4">
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
        </TabsContent>
        
        <TabsContent value="revenue" className="space-y-4 pt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Revenue Analytics</h2>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" /> Export Report
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Monthly Revenue (2025)</CardTitle>
                <CardDescription>Revenue generated from all land parcels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eee' }}
                        formatter={(value) => [`₹${value}`, 'Revenue']}
                        labelStyle={{ fontWeight: 'bold' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#2E7D32" 
                        fill="#A4C63950" 
                        activeDot={{ r: 6 }} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div className="border rounded-md p-2">
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-lg font-semibold">₹1,75,800</p>
                  </div>
                  <div className="border rounded-md p-2">
                    <p className="text-sm text-muted-foreground">Avg Monthly</p>
                    <p className="text-lg font-semibold">₹14,650</p>
                  </div>
                  <div className="border rounded-md p-2">
                    <p className="text-sm text-muted-foreground">YOY Growth</p>
                    <p className="text-lg font-semibold text-green-600">+12%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Revenue by Crop Type</CardTitle>
                <CardDescription>Distribution of income across different crops</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cropRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eee' }}
                        formatter={(value) => [`₹${value}`, 'Revenue']}
                        labelStyle={{ fontWeight: 'bold' }}
                      />
                      <Legend />
                      <Bar dataKey="value" name="Revenue" fill="#2E7D32" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4">
                  <Button className="w-full">
                    <PieChart className="mr-2 h-4 w-4" /> Detailed Crop Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Revenue Projections</CardTitle>
                <CardDescription>Expected yield value based on current farming activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-3">Rice Cultivation</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Est. Yield:</span>
                        <span>4.5 tons/acre</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Current Price:</span>
                        <span>₹20,000/ton</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Land Area:</span>
                        <span>3 acres</span>
                      </div>
                      <div className="h-px bg-muted my-2" />
                      <div className="flex justify-between font-semibold">
                        <span>Projected Revenue:</span>
                        <span className="text-green-600">₹2,70,000</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-3">Coconut Plantation</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Est. Yield:</span>
                        <span>80 nuts/tree</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Trees:</span>
                        <span>120 trees</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Current Price:</span>
                        <span>₹25/nut</span>
                      </div>
                      <div className="h-px bg-muted my-2" />
                      <div className="flex justify-between font-semibold">
                        <span>Projected Revenue:</span>
                        <span className="text-green-600">₹2,40,000</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-3">Vegetable Farming</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Est. Yield:</span>
                        <span>2.2 tons/acre</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Current Price:</span>
                        <span>₹25,000/ton</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Land Area:</span>
                        <span>1 acre</span>
                      </div>
                      <div className="h-px bg-muted my-2" />
                      <div className="flex justify-between font-semibold">
                        <span>Projected Revenue:</span>
                        <span className="text-green-600">₹55,000</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Projected Revenue</p>
                      <p className="text-2xl font-bold text-green-600">₹5,65,000</p>
                    </div>
                    <Button>
                      <BarChart4 className="mr-2 h-4 w-4" /> Customize Projections
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="jobs" className="space-y-4 pt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Active Job Postings</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Post New Job
            </Button>
          </div>
          
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Maize Cultivation Workers</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" /> Kolar District, Karnataka
                  </CardDescription>
                </div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
                  10 Applicants
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 mb-4">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <span className="text-xs text-muted-foreground">Workers Needed:</span>
                    <p className="font-medium">5</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Daily Wage:</span>
                    <p className="font-medium">₹550-600</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Duration:</span>
                    <p className="font-medium">3 weeks</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Start Date:</span>
                    <p className="font-medium">April 20, 2025</p>
                  </div>
                </div>
                <p className="mt-2">Seeking experienced workers for upcoming maize cultivation season.</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm">View Applicants</Button>
                <Button size="sm" variant="outline">Edit Posting</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Farm Manager</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" /> Mysore District, Karnataka
                  </CardDescription>
                </div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
                  3 Applicants
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 mb-4">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <span className="text-xs text-muted-foreground">Position:</span>
                    <p className="font-medium">Full-time</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Salary:</span>
                    <p className="font-medium">₹18,000/month</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Experience:</span>
                    <p className="font-medium">3+ years</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Accommodation:</span>
                    <p className="font-medium">Provided</p>
                  </div>
                </div>
                <p className="mt-2">Looking for an experienced farm manager for coconut plantation.</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm">View Applicants</Button>
                <Button size="sm" variant="outline">Edit Posting</Button>
              </div>
            </CardContent>
          </Card>
          
          <Button variant="outline" className="w-full">View All Job Postings</Button>
        </TabsContent>
        
        <TabsContent value="farmers" className="space-y-4 pt-4">
          <h2 className="text-xl font-semibold mb-4">Recent Farmer Applications</h2>
          
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <CardTitle>Rajesh Kumar</CardTitle>
                    <CardDescription>Applied for: Maize Cultivation Worker</CardDescription>
                  </div>
                </div>
                <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs font-medium">
                  New
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 mb-4">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <span className="text-xs text-muted-foreground">Experience:</span>
                    <p className="font-medium">5 years</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Location:</span>
                    <p className="font-medium">Kolar</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Rating:</span>
                    <p className="font-medium">4.7/5</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Applied:</span>
                    <p className="font-medium">Today</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm">View Profile</Button>
                <Button size="sm" variant="outline">Contact</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <CardTitle>Lakshmi Devi</CardTitle>
                    <CardDescription>Applied for: Farm Manager</CardDescription>
                  </div>
                </div>
                <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs font-medium">
                  New
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 mb-4">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <span className="text-xs text-muted-foreground">Experience:</span>
                    <p className="font-medium">8 years</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Location:</span>
                    <p className="font-medium">Mysore</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Rating:</span>
                    <p className="font-medium">4.9/5</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Applied:</span>
                    <p className="font-medium">Yesterday</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm">View Profile</Button>
                <Button size="sm" variant="outline">Contact</Button>
              </div>
            </CardContent>
          </Card>
          
          <Button variant="outline" className="w-full">View All Applications</Button>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5" /> Land Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-1 text-sm font-medium">Land Use Efficiency</div>
                <div className="flex items-center gap-2">
                  <Progress value={75} className="h-2" />
                  <span className="text-sm font-medium">75%</span>
                </div>
              </div>
              <div>
                <div className="mb-1 text-sm font-medium">Revenue Generation</div>
                <div className="flex items-center gap-2">
                  <Progress value={60} className="h-2" />
                  <span className="text-sm font-medium">60%</span>
                </div>
              </div>
              <div>
                <div className="mb-1 text-sm font-medium">Lease Optimization</div>
                <div className="flex items-center gap-2">
                  <Progress value={80} className="h-2" />
                  <span className="text-sm font-medium">80%</span>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full mt-2">
                Full Land Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" /> Revenue Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">₹78,500</div>
            <p className="text-sm text-muted-foreground mb-4">Total earnings this year</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Current month</span>
                <span className="font-medium">₹20,500</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Previous month</span>
                <span className="font-medium">₹20,500</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Year-on-year growth</span>
                <span className="font-medium">+12%</span>
              </div>
            </div>
            
            <Button size="sm" variant="outline" className="w-full mt-4">
              <BarChart4 className="mr-2 h-4 w-4" /> Detailed Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandownerDashboard;
