
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  CalendarDays, 
  Star, 
  FileText, 
  MapPin, 
  Phone, 
  Mail,
  Loader2, 
  Download
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FarmerProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  farmerId: number | null;
}

type FarmerProfile = {
  id: number;
  name: string;
  email: string;
  phone: string;
  bio: string | null;
  profile_image: string | null;
  experience_years: number | null;
  skills: string[] | null;
  availability: {
    days: string[];
    hours: string;
  } | null;
  location: string | null;
  certifications: Array<{
    name: string;
    url: string;
  }> | null;
  rating: number | null;
}

// Sample data for testing - replace with actual database calls
const SAMPLE_FARMER_PROFILES: Record<number, FarmerProfile> = {
  1: {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 98765 43210",
    bio: "Experienced farmer with 5 years of expertise in maize cultivation and sustainable farming practices. I specialize in organic farming techniques and have worked on various farm sizes across Karnataka.",
    profile_image: null,
    experience_years: 5,
    skills: ["Organic Farming", "Irrigation Systems", "Crop Rotation", "Maize Cultivation"],
    availability: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      hours: "8 AM - 5 PM"
    },
    location: "Kolar, Karnataka",
    certifications: [
      { name: "Organic Farming Certificate", url: "https://example.com/cert.pdf" },
      { name: "Agricultural Training", url: "https://example.com/training.pdf" }
    ],
    rating: 4.7
  },
  2: {
    id: 2,
    name: "Lakshmi Devi",
    email: "lakshmi@example.com",
    phone: "+91 87654 32109",
    bio: "Farm management professional with 8 years of experience in overseeing agricultural operations. Skilled in team leadership and crop planning. Experienced in managing large farms in the Mysore region.",
    profile_image: null,
    experience_years: 8,
    skills: ["Farm Management", "Team Leadership", "Crop Planning", "Pest Management"],
    availability: {
      days: ["Monday", "Wednesday", "Friday"],
      hours: "9 AM - 6 PM"
    },
    location: "Mysore, Karnataka",
    certifications: [
      { name: "Farm Management Certificate", url: "https://example.com/mgmt.pdf" }
    ],
    rating: 4.9
  }
};

const FarmerProfileModal = ({ open, onOpenChange, farmerId }: FarmerProfileModalProps) => {
  const [profile, setProfile] = useState<FarmerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (open && farmerId !== null) {
      fetchFarmerProfile(farmerId);
    }
  }, [open, farmerId]);

  const fetchFarmerProfile = async (id: number) => {
    setIsLoading(true);
    try {
      // Simulate API call with sample data
      setTimeout(() => {
        const profileData = SAMPLE_FARMER_PROFILES[id] || null;
        setProfile(profileData);
        setIsLoading(false);
      }, 500);
      
      // Once your database is properly set up, use this:
      // const { data, error } = await supabase
      //   .from('farmer_profiles')
      //   .select(`
      //     id, 
      //     users!inner(name, email, phone),
      //     bio, profile_image, experience_years, skills, 
      //     availability, location, certifications, rating
      //   `)
      //   .eq('id', id)
      //   .single();

      // if (error) throw error;
      
      // const formattedProfile = {
      //   id: data.id,
      //   name: data.users.name,
      //   email: data.users.email,
      //   phone: data.users.phone,
      //   bio: data.bio,
      //   profile_image: data.profile_image,
      //   experience_years: data.experience_years,
      //   skills: data.skills,
      //   availability: data.availability,
      //   location: data.location,
      //   certifications: data.certifications,
      //   rating: data.rating
      // };
      
      // setProfile(formattedProfile);
    } catch (error) {
      console.error('Error fetching farmer profile:', error);
      toast({
        title: 'Error',
        description: 'Could not load the farmer profile.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCertificate = (url: string, name: string) => {
    // In a real application, you would handle the download logic here
    // For now, we'll just open the URL in a new tab
    window.open(url, '_blank');
    
    toast({
      title: 'Download started',
      description: `Downloading ${name}...`
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : !profile ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>Profile not found or not yet complete.</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="h-16 w-16 border">
                  {profile.profile_image ? (
                    <AvatarImage src={profile.profile_image} alt={profile.name} />
                  ) : (
                    <AvatarFallback className="text-lg">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <DialogTitle className="text-2xl">{profile.name}</DialogTitle>
                  <DialogDescription className="flex items-center mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    {profile.location || 'Location not specified'}
                    
                    {profile.rating && (
                      <span className="ml-3 flex items-center">
                        <Star className="h-3.5 w-3.5 mr-1 text-amber-500 fill-amber-500" />
                        {profile.rating}/5
                      </span>
                    )}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-2">About</h3>
                <p className="text-muted-foreground">
                  {profile.bio || 'No bio provided.'}
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-2">Experience & Skills</h3>
                {profile.experience_years && (
                  <p className="mb-2">
                    <span className="font-medium">Experience:</span> {profile.experience_years} years
                  </p>
                )}
                
                {profile.skills && profile.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No skills listed.</p>
                )}
                
                <h3 className="text-lg font-medium mt-6 mb-2">Certifications & Documents</h3>
                {profile.certifications && profile.certifications.length > 0 ? (
                  <div className="space-y-2">
                    {profile.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                          <span>{cert.name}</span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => downloadCertificate(cert.url, cert.name)}
                        >
                          <Download className="h-4 w-4 mr-1" /> Download
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No certifications uploaded.</p>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{profile.phone || 'Not provided'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-3">Availability</h3>
                  {profile.availability ? (
                    <div className="space-y-2">
                      <div className="flex items-start text-sm">
                        <CalendarDays className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <div>{profile.availability.days.join(', ')}</div>
                          <div className="text-muted-foreground">{profile.availability.hours}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Availability not specified.</p>
                  )}
                </div>
              </div>
            </div>
            
            <DialogFooter className="mt-6">
              <Button onClick={() => onOpenChange(false)}>Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FarmerProfileModal;
