
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

const FarmerApplications = () => {
  return (
    <>
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
    </>
  );
};

export default FarmerApplications;
