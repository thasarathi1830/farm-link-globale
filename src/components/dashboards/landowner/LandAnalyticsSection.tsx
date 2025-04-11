
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sprout } from 'lucide-react';

const LandAnalyticsSection = () => {
  return (
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
  );
};

export default LandAnalyticsSection;
