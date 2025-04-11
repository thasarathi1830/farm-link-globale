import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ClipboardList, UserPlus, TrendingUp, MapPin, BarChart4, Briefcase, Upload, Info, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

const FarmerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [availabilityType, setAvailabilityType] = useState("");
  const [availabilityDetails, setAvailabilityDetails] = useState("");
  const [documentUploading, setDocumentUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const availabilityExamples = {
    "full-time": "Available for full-time work anywhere in Karnataka region.",
    "part-time": "Available for part-time assistance in Bangalore area, 3 days per week.",
    "seasonal": "Available for paddy sowing in Mysore from June to August."
  };

  const handleAvailabilityTypeChange = (value) => {
    setAvailabilityType(value);
    setAvailabilityDetails(availabilityExamples[value] || "");
  };

  const handleSaveAvailability = () => {
    toast({
      title: "Availability Updated",
      description: "Your availability has been saved successfully.",
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

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
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
            <div className="text-2xl font-bold">65%</div>
            <Progress value={65} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Complete your profile to unlock all features</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">New Job Openings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-2">In your area</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available MNC Programs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-2">Matching your skills</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground mt-2">Based on your past work</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="jobs" className="mb-6">
        <TabsList>
          <TabsTrigger value="jobs">Job Listings</TabsTrigger>
          <TabsTrigger value="mnc">MNC Programs</TabsTrigger>
          <TabsTrigger value="calendar">Availability</TabsTrigger>
        </TabsList>
        <TabsContent value="jobs" className="space-y-4 pt-4">
          <h2 className="text-xl font-semibold mb-4">Available Jobs Nearby</h2>
          
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Paddy Field Harvester</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" /> Bangalore Rural District, 15 km away
                  </CardDescription>
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                  ₹650/day
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 mb-4">
                <p>Duration: 2 weeks • Start date: Apr 15, 2025</p>
                <p className="mt-2">Looking for experienced paddy field harvesters for a 50-acre farm.</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm">Apply Now</Button>
                <Button size="sm" variant="outline">Save</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Organic Vegetable Farm Assistant</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" /> Hosur, 20 km away
                  </CardDescription>
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                  ₹12,000/month
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 mb-4">
                <p>Duration: 6 months • Start date: May 1, 2025</p>
                <p className="mt-2">Full-time position at an organic vegetable farm. Accommodation provided.</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm">Apply Now</Button>
                <Button size="sm" variant="outline">Save</Button>
              </div>
            </CardContent>
          </Card>
          
          <Button variant="outline" className="w-full">View All Job Listings</Button>
        </TabsContent>
        
        <TabsContent value="mnc" className="space-y-4 pt-4">
          <h2 className="text-xl font-semibold mb-4">MNC Partnership Programs</h2>
          
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Sustainable Cotton Farming Program</CardTitle>
                  <CardDescription>By Global Textiles Inc.</CardDescription>
                </div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
                  Long-term
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 mb-4">
                <p>Join our sustainable cotton farming initiative with guaranteed purchase agreements.</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">Cotton</span>
                  <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">Sustainable</span>
                  <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">Training Provided</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm">View Details</Button>
                <Button size="sm" variant="outline">Express Interest</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Organic Rice Cultivation Program</CardTitle>
                  <CardDescription>By FoodCorp International</CardDescription>
                </div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
                  Long-term
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 mb-4">
                <p>Premium pricing for certified organic rice with export opportunities.</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">Rice</span>
                  <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">Organic</span>
                  <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">Certification</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm">View Details</Button>
                <Button size="sm" variant="outline">Express Interest</Button>
              </div>
            </CardContent>
          </Card>
          
          <Button variant="outline" className="w-full">View All Programs</Button>
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-4 pt-4">
          <h2 className="text-xl font-semibold mb-4">Set Your Availability</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="availability-type">Availability Type</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm">
                          <p>Select your availability type and customize the message to help employers find you for suitable work opportunities.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select value={availabilityType} onValueChange={handleAvailabilityTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="seasonal">Seasonal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="availability-details">Availability Details</Label>
                  <Textarea 
                    id="availability-details" 
                    placeholder="Describe your availability in detail"
                    value={availabilityDetails}
                    onChange={(e) => setAvailabilityDetails(e.target.value)}
                    rows={4}
                  />
                  <p className="text-sm text-muted-foreground">
                    Be specific about location, time period, and type of work you're available for.
                  </p>
                </div>
                
                <div className="border rounded-md p-4 bg-muted/50">
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                    Examples
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>"Available for paddy sowing in Thanjavur from June to August."</p>
                    <p>"Part-time assistance for greenhouse setup in Coimbatore."</p>
                    <p>"Full-time farm manager available in Bangalore Rural District."</p>
                  </div>
                </div>
                
                <Button onClick={handleSaveAvailability}>Save Availability</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" /> Documents
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
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" className="w-full mt-2">
                    Document Guidelines
                  </Button>
                </DialogTrigger>
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
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart4 className="h-5 w-5" /> Skills & Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-1 text-sm font-medium flex justify-between">
                  <span>Rice Cultivation</span>
                  <span>Expert</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
              <div>
                <div className="mb-1 text-sm font-medium flex justify-between">
                  <span>Vegetable Farming</span>
                  <span>Intermediate</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="mb-1 text-sm font-medium flex justify-between">
                  <span>Irrigation Systems</span>
                  <span>Basic</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
              <Button size="sm" variant="outline" className="w-full mt-2">Update Skills</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" /> Income Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">₹32,400</div>
            <p className="text-sm text-muted-foreground mb-4">Total earnings this year</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Current month</span>
                <span className="font-medium">₹8,500</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Previous month</span>
                <span className="font-medium">₹7,800</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Growth</span>
                <span className="font-medium">+9%</span>
              </div>
            </div>
            
            <Button size="sm" variant="outline" className="w-full mt-4">
              <Briefcase className="mr-2 h-4 w-4" /> View Work History
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerDashboard;
