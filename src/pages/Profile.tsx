import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Upload } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Profile = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [role, setRole] = useState<'farmer' | 'landowner' | 'corporate'>('farmer');

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    }, 1000);
  };

  const renderRoleSpecificFields = () => {
    switch (role) {
      case 'farmer':
        return (
          <>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input id="experience" placeholder="e.g. 5" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferred-crops">Preferred Crops</Label>
                  <Input id="preferred-crops" placeholder="e.g. Rice, Wheat, Cotton" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Agricultural Skills</Label>
                <Textarea 
                  id="skills" 
                  placeholder="List your skills and expertise in farming"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="land-ownership">Land Ownership Status</Label>
                <select 
                  id="land-ownership" 
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select status</option>
                  <option value="own">Own Land</option>
                  <option value="leased">Leased Land</option>
                  <option value="none">No Land (Looking for Work)</option>
                </select>
              </div>
            </div>
          </>
        );
      case 'landowner':
        return (
          <>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="total-land">Total Land Area (acres)</Label>
                  <Input id="total-land" placeholder="e.g. 10" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="land-type">Land Type</Label>
                  <select 
                    id="land-type" 
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select land type</option>
                    <option value="agricultural">Agricultural</option>
                    <option value="orchard">Orchard</option>
                    <option value="mixed">Mixed Use</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="land-description">Land Description</Label>
                <Textarea 
                  id="land-description" 
                  placeholder="Describe your land, its features, and facilities"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lease-preference">Lease Preferences</Label>
                <Textarea 
                  id="lease-preference" 
                  placeholder="Describe your preferences for leasing terms, duration, etc."
                  rows={3}
                />
              </div>
            </div>
          </>
        );
      case 'corporate':
        return (
          <>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-type">Company Type</Label>
                  <select 
                    id="company-type" 
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select company type</option>
                    <option value="mnc">Multinational Corporation</option>
                    <option value="cooperative">Agricultural Cooperative</option>
                    <option value="processor">Food Processor</option>
                    <option value="exporter">Agricultural Exporter</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization-size">Organization Size</Label>
                  <select 
                    id="organization-size" 
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select size</option>
                    <option value="small">Small (1-50 employees)</option>
                    <option value="medium">Medium (51-200 employees)</option>
                    <option value="large">Large (201-1000 employees)</option>
                    <option value="enterprise">Enterprise (1000+ employees)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-description">Business Description</Label>
                <Textarea 
                  id="business-description" 
                  placeholder="Describe your business and agricultural interests"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-interests">Project Interests</Label>
                <Textarea 
                  id="project-interests" 
                  placeholder="Describe the types of agricultural projects you're interested in"
                  rows={3}
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold">Your Profile</h1>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    U
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" className="w-full flex gap-2">
                  <Upload className="h-4 w-4" /> Upload Photo
                </Button>
              </div>
              
              <div className="flex-1 grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" placeholder="Your email" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter your phone number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <RadioGroup value={role} onValueChange={(value: any) => setRole(value)} className="flex space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="farmer" id="role-farmer" />
                        <label htmlFor="role-farmer">Farmer</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="landowner" id="role-landowner" />
                        <label htmlFor="role-landowner">Landowner</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="corporate" id="role-corporate" />
                        <label htmlFor="role-corporate">Corporate</label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea 
                    id="address" 
                    placeholder="Enter your full address"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role-Specific Information</CardTitle>
          </CardHeader>
          <CardContent>
            {renderRoleSpecificFields()}
          </CardContent>
        </Card>

        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="documents" className="space-y-4 pt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Identity Proof</h3>
                      <p className="text-sm text-muted-foreground mb-4">Upload government-issued ID for verification</p>
                      <Button variant="outline" className="w-full flex gap-2">
                        <Upload className="h-4 w-4" /> Upload Document
                      </Button>
                    </div>
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Address Proof</h3>
                      <p className="text-sm text-muted-foreground mb-4">Upload proof of address for verification</p>
                      <Button variant="outline" className="w-full flex gap-2">
                        <Upload className="h-4 w-4" /> Upload Document
                      </Button>
                    </div>
                  </div>
                  
                  {role === 'farmer' && (
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Experience Certificate</h3>
                      <p className="text-sm text-muted-foreground mb-4">Upload any certifications or experience letters</p>
                      <Button variant="outline" className="w-full flex gap-2">
                        <Upload className="h-4 w-4" /> Upload Document
                      </Button>
                    </div>
                  )}
                  
                  {role === 'landowner' && (
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Land Ownership Documents</h3>
                      <p className="text-sm text-muted-foreground mb-4">Upload proof of land ownership</p>
                      <Button variant="outline" className="w-full flex gap-2">
                        <Upload className="h-4 w-4" /> Upload Document
                      </Button>
                    </div>
                  )}
                  
                  {role === 'corporate' && (
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Business Registration</h3>
                      <p className="text-sm text-muted-foreground mb-4">Upload company registration documents</p>
                      <Button variant="outline" className="w-full flex gap-2">
                        <Upload className="h-4 w-4" /> Upload Document
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="preferences" className="space-y-4 pt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="language">Preferred Language</Label>
                    <select 
                      id="language" 
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                      <option value="kannada">Kannada</option>
                      <option value="tamil">Tamil</option>
                      <option value="telugu">Telugu</option>
                      <option value="bengali">Bengali</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Communication Preferences</Label>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="email-notifications" className="rounded" />
                        <label htmlFor="email-notifications">Email notifications</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="sms-notifications" className="rounded" />
                        <label htmlFor="sms-notifications">SMS notifications</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="whatsapp-notifications" className="rounded" />
                        <label htmlFor="whatsapp-notifications">WhatsApp notifications</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Privacy Settings</Label>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="profile-visibility" className="rounded" defaultChecked />
                        <label htmlFor="profile-visibility">Show my profile to other AgriLink users</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="contact-info-visibility" className="rounded" />
                        <label htmlFor="contact-info-visibility">Show my contact information</label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4 pt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Notification Settings</Label>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="job-alerts" className="rounded" defaultChecked />
                        <label htmlFor="job-alerts">Job alerts and opportunities</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="message-notifications" className="rounded" defaultChecked />
                        <label htmlFor="message-notifications">New messages</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="application-updates" className="rounded" defaultChecked />
                        <label htmlFor="application-updates">Application status updates</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="subsidy-alerts" className="rounded" defaultChecked />
                        <label htmlFor="subsidy-alerts">Subsidy and program alerts</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="marketing-emails" className="rounded" />
                        <label htmlFor="marketing-emails">Marketing and promotional emails</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Notification Frequency</Label>
                    <select 
                      id="notification-frequency" 
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="immediately">Immediately</option>
                      <option value="daily">Daily digest</option>
                      <option value="weekly">Weekly digest</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
