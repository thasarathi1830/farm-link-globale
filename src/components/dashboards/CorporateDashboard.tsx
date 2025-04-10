
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Search, UserPlus, BarChart4, FileText, Briefcase, Plus, Building, ArrowUpRight, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const CorporateDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold">Corporate Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button className="w-full md:w-auto">
            <UserPlus className="mr-2 h-4 w-4" /> Complete Profile
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground mt-2">Across 3 regions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Farmers Engaged</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground mt-2">+5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Land Under Contract</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground mt-2">Acres</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Projected Yield</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground mt-2">Of target</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="mb-6">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="farmers">Find Farmers</TabsTrigger>
          <TabsTrigger value="land">Find Land</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects" className="space-y-4 pt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Active Projects</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </div>
          
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Organic Cotton Initiative</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" /> Dharwad Region, Karnataka
                  </CardDescription>
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                  On Track
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 mb-4">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <span className="text-xs text-muted-foreground">Farmers Engaged:</span>
                    <p className="font-medium">12</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Land Area:</span>
                    <p className="font-medium">45 acres</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Project Timeline:</span>
                    <p className="font-medium">Feb 2025 - Jan 2026</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Completion:</span>
                    <p className="font-medium">35%</p>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xs text-muted-foreground block mb-1">Progress:</span>
                  <Progress value={35} className="h-2" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm">View Details</Button>
                <Button size="sm" variant="outline">Manage Team</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Sustainable Rice Production</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" /> Mandya District, Karnataka
                  </CardDescription>
                </div>
                <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs font-medium">
                  Attention Needed
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 mb-4">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <span className="text-xs text-muted-foreground">Farmers Engaged:</span>
                    <p className="font-medium">8</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Land Area:</span>
                    <p className="font-medium">65 acres</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Project Timeline:</span>
                    <p className="font-medium">Jan 2025 - Dec 2025</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Completion:</span>
                    <p className="font-medium">28%</p>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xs text-muted-foreground block mb-1">Progress:</span>
                  <Progress value={28} className="h-2" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm">View Details</Button>
                <Button size="sm" variant="outline">Manage Team</Button>
              </div>
            </CardContent>
          </Card>
          
          <Button variant="outline" className="w-full">View All Projects</Button>
        </TabsContent>
        
        <TabsContent value="farmers" className="space-y-4 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <h2 className="text-xl font-semibold">Find Skilled Farmers</h2>
            <div className="w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by crop, region, or skill..."
                  className="w-full md:w-[300px] pl-8 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
          
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <CardTitle>Rajesh Kumar</CardTitle>
                    <CardDescription>Expert in Organic Cotton Farming</CardDescription>
                  </div>
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                  Top Rated
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 mb-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                  <div>
                    <span className="text-xs text-muted-foreground">Experience:</span>
                    <p className="font-medium">8 years</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Rating:</span>
                    <p className="font-medium">4.8/5</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Location:</span>
                    <p className="font-medium">Dharwad, Karnataka</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Availability:</span>
                    <p className="font-medium">Immediate</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">Organic Farming</span>
                  <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">Cotton</span>
                  <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">Sustainable</span>
                  <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">Team Management</span>
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
                    <CardTitle>Lakshmi Farmers Group</CardTitle>
                    <CardDescription>Rice and Wheat Specialists</CardDescription>
                  </div>
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                  Group (15 members)
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 mb-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                  <div>
                    <span className="text-xs text-muted-foreground">Group Experience:</span>
                    <p className="font-medium">12+ years</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Rating:</span>
                    <p className="font-medium">4.6/5</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Location:</span>
                    <p className="font-medium">Mandya, Karnataka</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Availability:</span>
                    <p className="font-medium">From May 2025</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">Rice</span>
                  <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">Wheat</span>
                  <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">Large Scale</span>
                  <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">Water Management</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm">View Profile</Button>
                <Button size="sm" variant="outline">Contact</Button>
              </div>
            </CardContent>
          </Card>
          
          <Button variant="outline" className="w-full">View All Farmers</Button>
        </TabsContent>
        
        <TabsContent value="land" className="space-y-4 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <h2 className="text-xl font-semibold">Available Land Parcels</h2>
            <div className="w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by region, soil type, or size..."
                  className="w-full md:w-[300px] pl-8 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
          
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Premium Agricultural Land (50 acres)</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" /> Hassan District, Karnataka
                  </CardDescription>
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                  Verified
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 mb-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                  <div>
                    <span className="text-xs text-muted-foreground">Soil Type:</span>
                    <p className="font-medium">Black Cotton Soil</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Water Source:</span>
                    <p className="font-medium">Canal Irrigation</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Lease Rate:</span>
                    <p className="font-medium">₹45,000/acre/year</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Min. Lease Period:</span>
                    <p className="font-medium">3 years</p>
                  </div>
                </div>
                <p className="mt-2">High-quality agricultural land with excellent infrastructure, suitable for multiple crops.</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm">View Details</Button>
                <Button size="sm" variant="outline">Contact Owner</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Irrigated Farm Land (35 acres)</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" /> Mysore District, Karnataka
                  </CardDescription>
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                  Verified
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 mb-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                  <div>
                    <span className="text-xs text-muted-foreground">Soil Type:</span>
                    <p className="font-medium">Red Loamy Soil</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Water Source:</span>
                    <p className="font-medium">Borewells, River</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Lease Rate:</span>
                    <p className="font-medium">₹40,000/acre/year</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Min. Lease Period:</span>
                    <p className="font-medium">2 years</p>
                  </div>
                </div>
                <p className="mt-2">Well-maintained farmland with consistent water supply, ideal for multiple harvests.</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm">View Details</Button>
                <Button size="sm" variant="outline">Contact Owner</Button>
              </div>
            </CardContent>
          </Card>
          
          <Button variant="outline" className="w-full">View All Land Listings</Button>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4 pt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Project Analytics</h2>
            <Button variant="outline">
              Download Report <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                  <div className="text-center">
                    <BarChart4 className="h-10 w-10 mx-auto text-gray-400 mb-4" />
                    <p className="text-muted-foreground">Performance analytics chart will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Yield Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                  <div className="text-center">
                    <BarChart4 className="h-10 w-10 mx-auto text-gray-400 mb-4" />
                    <p className="text-muted-foreground">Yield prediction chart will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" /> Agreements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-blue-50 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Farmer Contracts</p>
                    <p className="text-xs text-muted-foreground">28 active agreements</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Manage</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-green-50 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Land Lease Agreements</p>
                    <p className="text-xs text-muted-foreground">15 active leases</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Manage</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-orange-50 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Agreement Templates</p>
                    <p className="text-xs text-muted-foreground">Create and manage templates</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" /> Resource Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-1 text-sm font-medium">Budget Utilization</div>
                <div className="flex items-center gap-2">
                  <Progress value={65} className="h-2" />
                  <span className="text-sm font-medium">65%</span>
                </div>
              </div>
              <div>
                <div className="mb-1 text-sm font-medium">Equipment Allocation</div>
                <div className="flex items-center gap-2">
                  <Progress value={80} className="h-2" />
                  <span className="text-sm font-medium">80%</span>
                </div>
              </div>
              <div>
                <div className="mb-1 text-sm font-medium">Technical Support</div>
                <div className="flex items-center gap-2">
                  <Progress value={45} className="h-2" />
                  <span className="text-sm font-medium">45%</span>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full mt-2">
                Resource Management
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" /> Financial Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">₹1.2 Cr</div>
            <p className="text-sm text-muted-foreground mb-4">Total project investments</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Current quarter expense</span>
                <span className="font-medium">₹32 Lakhs</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Budget remaining</span>
                <span className="font-medium">₹68 Lakhs</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>ROI (projected)</span>
                <span className="font-medium">24%</span>
              </div>
            </div>
            
            <Button size="sm" variant="outline" className="w-full mt-4">
              <BarChart4 className="mr-2 h-4 w-4" /> Financial Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CorporateDashboard;
