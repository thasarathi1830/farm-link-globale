
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail } from 'lucide-react';
import FarmerProfileModal from './FarmerProfileModal';
import FarmerContactModal from './FarmerContactModal';

// Sample farmer applications data
const SAMPLE_APPLICATIONS = [
  {
    id: 1,
    name: "Rajesh Kumar",
    position: "Maize Cultivation Worker",
    experience: "5 years",
    location: "Kolar",
    rating: "4.7/5",
    applied: "Today",
    status: "New",
    email: "rajesh@example.com"
  },
  {
    id: 2,
    name: "Lakshmi Devi",
    position: "Farm Manager",
    experience: "8 years",
    location: "Mysore",
    rating: "4.9/5",
    applied: "Yesterday",
    status: "New",
    email: "lakshmi@example.com"
  }
];

const FarmerApplications = () => {
  const [selectedFarmerId, setSelectedFarmerId] = useState<number | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState<{
    name: string;
    email: string;
    id: number;
  } | null>(null);

  const handleViewProfile = (farmerId: number) => {
    setSelectedFarmerId(farmerId);
    setIsProfileModalOpen(true);
  };

  const handleContact = (farmer: { name: string; email: string; id: number }) => {
    setSelectedFarmer(farmer);
    setIsContactModalOpen(true);
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Recent Farmer Applications</h2>
      
      {SAMPLE_APPLICATIONS.map((application) => (
        <Card key={application.id} className="mb-4">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <CardTitle>{application.name}</CardTitle>
                  <CardDescription>Applied for: {application.position}</CardDescription>
                </div>
              </div>
              <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs font-medium">
                {application.status}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600 mb-4">
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <span className="text-xs text-muted-foreground">Experience:</span>
                  <p className="font-medium">{application.experience}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Location:</span>
                  <p className="font-medium">{application.location}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Rating:</span>
                  <p className="font-medium">{application.rating}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Applied:</span>
                  <p className="font-medium">{application.applied}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm"
                onClick={() => handleViewProfile(application.id)}
              >
                <User className="h-4 w-4 mr-1" /> View Profile
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleContact({
                  id: application.id,
                  name: application.name,
                  email: application.email
                })}
              >
                <Mail className="h-4 w-4 mr-1" /> Contact
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Button variant="outline" className="w-full">View All Applications</Button>

      {/* Profile Modal */}
      <FarmerProfileModal
        open={isProfileModalOpen}
        onOpenChange={setIsProfileModalOpen}
        farmerId={selectedFarmerId}
      />

      {/* Contact Modal */}
      {selectedFarmer && (
        <FarmerContactModal
          open={isContactModalOpen}
          onOpenChange={setIsContactModalOpen}
          farmerName={selectedFarmer.name}
          farmerEmail={selectedFarmer.email}
          farmerId={selectedFarmer.id}
        />
      )}
    </>
  );
};

export default FarmerApplications;
