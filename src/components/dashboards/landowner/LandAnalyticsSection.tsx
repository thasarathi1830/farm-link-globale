
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sprout, BarChart3, Droplet } from 'lucide-react';
import FullLandAnalysisModal from './FullLandAnalysisModal';

const LandAnalyticsSection = () => {
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const [selectedLandId, setSelectedLandId] = useState<string | undefined>(undefined);

  const handleOpenAnalysis = (landId: string) => {
    setSelectedLandId(landId);
    setIsAnalysisOpen(true);
  };

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
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
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full mt-2 gap-2"
              onClick={() => handleOpenAnalysis("land-123")}
            >
              <BarChart3 className="h-4 w-4" /> Full Land Analysis
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Additional Land Parcels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Droplet className="h-4 w-4" /> North Field (12 acres)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Soil Health</div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Water Management</div>
                <Progress value={70} className="h-2" />
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full mt-2 text-xs"
                onClick={() => handleOpenAnalysis("land-456")}
              >
                Full Land Analysis
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Droplet className="h-4 w-4" /> South Field (8 acres)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Soil Health</div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Water Management</div>
                <Progress value={90} className="h-2" />
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full mt-2 text-xs"
                onClick={() => handleOpenAnalysis("land-789")}
              >
                Full Land Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Modal */}
      <FullLandAnalysisModal 
        open={isAnalysisOpen} 
        onOpenChange={setIsAnalysisOpen}
        landId={selectedLandId}
      />
    </div>
  );
};

export default LandAnalyticsSection;
