
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Upload, UserPlus, BarChart4, Briefcase, Sprout, Plus, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const LandownerDashboard = () => {
  const { user } = useAuth();

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
                  <CardTitle>Agricultural Field (5 acres)</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" /> Kolar District, Karnataka
                  </CardDescription>
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                  Available for Lease
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 mb-4">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <span className="text-xs text-muted-foreground">Soil Type:</span>
                    <p className="font-medium">Red Loamy</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Water Source:</span>
                    <p className="font-medium">Borewell, Canal</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Expected Rent:</span>
                    <p className="font-medium">₹12,000/month</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Lease Term:</span>
                    <p className="font-medium">1-3 years</p>
                  </div>
                </div>
                <p className="mt-2">Well-maintained field with irrigation facilities, suitable for multiple crops.</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm">Edit Details</Button>
                <Button size="sm" variant="outline">View Inquiries (4)</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Coconut Farm (2.5 acres)</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" /> Mysore District, Karnataka
                  </CardDescription>
                </div>
                <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded-md text-xs font-medium">
                  Leased until May 2026
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 mb-4">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <span className="text-xs text-muted-foreground">Current Lessee:</span>
                    <p className="font-medium">Krishna Farmers Group</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Monthly Rent:</span>
                    <p className="font-medium">₹8,500</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Lease Start:</span>
                    <p className="font-medium">May 2023</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Lease End:</span>
                    <p className="font-medium">May 2026</p>
                  </div>
                </div>
                <p className="mt-2">Mature coconut plantation with 120 trees and a small farmhouse.</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm">View Contract</Button>
                <Button size="sm" variant="outline">Contact Lessee</Button>
              </div>
            </CardContent>
          </Card>
          
          <Button variant="outline" className="w-full">View All Land Parcels</Button>
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
                <Button size="sm" variant="outline">Upload</Button>
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
                <Button size="sm" variant="outline">Upload</Button>
              </div>
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
