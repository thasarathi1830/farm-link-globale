
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Info } from 'lucide-react';

const AvailabilitySettings = () => {
  const { toast } = useToast();
  const [availabilityType, setAvailabilityType] = useState("");
  const [availabilityDetails, setAvailabilityDetails] = useState("");
  
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
  
  return (
    <div className="space-y-4 pt-4">
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
    </div>
  );
};

export default AvailabilitySettings;
