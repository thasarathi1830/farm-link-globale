
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Edit } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const LandDetails = () => {
  const { toast } = useToast();
  const [isEditingLand, setIsEditingLand] = useState(false);
  const [landDetails, setLandDetails] = useState({
    size: "5",
    type: "agricultural",
    soil: "Red Loamy",
    water: "Borewell, Canal",
    location: "Kolar District, Karnataka",
    cropHistory: "Rice, Maize, Vegetables"
  });

  const handleLandDetailsUpdate = () => {
    setIsEditingLand(false);
    toast({
      title: "Land details updated",
      description: "Your land details have been updated successfully.",
    });
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Agricultural Field ({landDetails.size} acres)</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-3 w-3 mr-1" /> {landDetails.location}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditingLand(true)}>
              <Edit className="h-4 w-4 mr-1" /> Edit Details
            </Button>
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
              Available for Lease
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!isEditingLand ? (
          <div className="text-sm text-gray-600 mb-4">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <span className="text-xs text-muted-foreground">Soil Type:</span>
                <p className="font-medium">{landDetails.soil}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Water Source:</span>
                <p className="font-medium">{landDetails.water}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Crop History:</span>
                <p className="font-medium">{landDetails.cropHistory}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Land Type:</span>
                <p className="font-medium">{landDetails.type === "agricultural" ? "Agricultural" : 
                                            landDetails.type === "orchard" ? "Orchard" : "Mixed Use"}</p>
              </div>
            </div>
            <p className="mt-2">Well-maintained field with irrigation facilities, suitable for multiple crops.</p>
          </div>
        ) : (
          <div className="space-y-4 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="land-size">Land Size (acres)</Label>
                <Input 
                  id="land-size" 
                  value={landDetails.size} 
                  onChange={(e) => setLandDetails({...landDetails, size: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="land-type">Land Type</Label>
                <Select 
                  value={landDetails.type} 
                  onValueChange={(value) => setLandDetails({...landDetails, type: value})}
                >
                  <SelectTrigger id="land-type">
                    <SelectValue placeholder="Select land type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agricultural">Agricultural</SelectItem>
                    <SelectItem value="orchard">Orchard</SelectItem>
                    <SelectItem value="mixed">Mixed Use</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="soil-type">Soil Type</Label>
                <Input 
                  id="soil-type" 
                  value={landDetails.soil} 
                  onChange={(e) => setLandDetails({...landDetails, soil: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="water-source">Water Source</Label>
                <Input 
                  id="water-source" 
                  value={landDetails.water} 
                  onChange={(e) => setLandDetails({...landDetails, water: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  value={landDetails.location} 
                  onChange={(e) => setLandDetails({...landDetails, location: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="crop-history">Crop History</Label>
                <Input 
                  id="crop-history" 
                  value={landDetails.cropHistory} 
                  onChange={(e) => setLandDetails({...landDetails, cropHistory: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditingLand(false)}>Cancel</Button>
              <Button onClick={handleLandDetailsUpdate}>Save Changes</Button>
            </div>
          </div>
        )}
        
        {!isEditingLand && (
          <div className="flex gap-2">
            <Button size="sm">View Map</Button>
            <Button size="sm" variant="outline">View Inquiries (4)</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LandDetails;
