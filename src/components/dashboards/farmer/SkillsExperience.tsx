
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart4 } from 'lucide-react';

const SkillsExperience = () => {
  return (
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
  );
};

export default SkillsExperience;
