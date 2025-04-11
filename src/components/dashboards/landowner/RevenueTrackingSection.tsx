
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart4, Briefcase } from 'lucide-react';

const RevenueTrackingSection = () => {
  return (
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
  );
};

export default RevenueTrackingSection;
