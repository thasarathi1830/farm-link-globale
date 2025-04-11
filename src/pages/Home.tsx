
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sprout, Users, Building, ArrowRight, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

type UserRole = 'farmer' | 'landowner' | 'corporate';

interface FormData {
  email: string;
  role: UserRole;
}

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isMissionExpanded, setIsMissionExpanded] = useState(false);
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();
  
  const openModal = (role: UserRole) => {
    setSelectedRole(role);
    setValue('role', role);
    setIsModalOpen(true);
  };
  
  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // Here you would handle form submission (login/register)
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-green-50">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Connecting Farmers, Landowners, and Corporations
            </h1>
            <p className="max-w-[700px] text-gray-600 md:text-xl mx-auto">
              AgriLink is a comprehensive platform revolutionizing how agricultural stakeholders connect, collaborate, and grow together.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => setIsAboutExpanded(!isAboutExpanded)}
              className="flex items-center gap-1"
            >
              <Info className="h-4 w-4" />
              Learn More
              {isAboutExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
          
          {/* Expandable About Section */}
          {isAboutExpanded && (
            <div className="w-full max-w-3xl bg-white rounded-lg p-6 shadow-md mt-4 animate-fade-in">
              <h3 className="text-xl font-bold mb-3">About AgriLink</h3>
              <p className="text-gray-600 mb-4">
                AgriLink was founded with a vision to revolutionize agricultural collaboration. Our platform connects all stakeholders in the agricultural ecosystem—farmers, landowners, and corporations—to create synergistic relationships that benefit everyone involved while promoting sustainable farming practices.
              </p>
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => setIsMissionExpanded(!isMissionExpanded)}
                  className="flex items-center gap-1"
                >
                  Our Mission & Vision
                  {isMissionExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
              
              {/* Nested Expandable Mission Section */}
              {isMissionExpanded && (
                <div className="mt-4 bg-green-50 rounded-lg p-4 animate-fade-in">
                  <h4 className="font-semibold mb-2">Our Mission</h4>
                  <p className="text-gray-600 mb-3">
                    To create a transparent, efficient, and accessible platform that empowers agricultural stakeholders to connect, collaborate, and thrive in a sustainable ecosystem.
                  </p>
                  <h4 className="font-semibold mb-2">Our Vision</h4>
                  <p className="text-gray-600">
                    A world where agricultural collaboration is seamless, profitable, and environmentally responsible, ensuring food security for future generations.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Who We Serve
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl mx-auto">
                Our platform caters to the unique needs of each agricultural stakeholder.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center space-y-4 p-6 bg-green-50 rounded-lg">
              <div className="p-3 bg-agrilink-green bg-opacity-10 rounded-full">
                <Sprout className="w-10 h-10 text-agrilink-green" />
              </div>
              <h3 className="text-xl font-bold">For Farmers</h3>
              <p className="text-gray-600 text-center">
                Find work opportunities, lease land, showcase your experience, and connect with agricultural corporations.
              </p>
              <Button 
                variant="link" 
                className="flex items-center" 
                onClick={() => openModal('farmer')}
              >
                Join as Farmer <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 bg-green-50 rounded-lg">
              <div className="p-3 bg-agrilink-brown bg-opacity-10 rounded-full">
                <Users className="w-10 h-10 text-agrilink-brown" />
              </div>
              <h3 className="text-xl font-bold">For Landowners</h3>
              <p className="text-gray-600 text-center">
                List your land, find reliable farmers, create lease agreements, and maximize your property's potential.
              </p>
              <Button 
                variant="link" 
                className="flex items-center" 
                onClick={() => openModal('landowner')}
              >
                Join as Landowner <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 bg-green-50 rounded-lg">
              <div className="p-3 bg-agrilink-blue bg-opacity-10 rounded-full">
                <Building className="w-10 h-10 text-agrilink-blue" />
              </div>
              <h3 className="text-xl font-bold">For Corporations</h3>
              <p className="text-gray-600 text-center">
                Find skilled farmers, lease land, manage agricultural projects, and track performance with powerful analytics.
              </p>
              <Button 
                variant="link" 
                className="flex items-center" 
                onClick={() => openModal('corporate')}
              >
                Join as Corporation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-agrilink-green">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
            Ready to Join the Agricultural Revolution?
          </h2>
          <p className="max-w-[700px] text-white/80 md:text-xl mx-auto">
            Sign up today and start connecting with agricultural stakeholders across the ecosystem.
          </p>
          <Button asChild size="lg" className="bg-white text-agrilink-green hover:bg-gray-100">
            <Link to="/register">Get Started Now</Link>
          </Button>
        </div>
      </section>

      {/* Modal for Login/Register */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Join AgriLink</DialogTitle>
            <DialogDescription>
              Enter your email to create an account or sign in
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com" 
                {...register('email', { 
                  required: 'Email is required', 
                  pattern: { 
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                    message: 'Invalid email address' 
                  } 
                })} 
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>I am a...</Label>
              <RadioGroup 
                defaultValue={selectedRole || undefined} 
                className="flex flex-col space-y-2"
                {...register('role', { required: 'Please select a role' })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="farmer" id="farmer" />
                  <Label htmlFor="farmer" className="flex items-center">
                    <Sprout className="mr-2 h-4 w-4 text-agrilink-green" />
                    Farmer
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="landowner" id="landowner" />
                  <Label htmlFor="landowner" className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-agrilink-brown" />
                    Landowner
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="corporate" id="corporate" />
                  <Label htmlFor="corporate" className="flex items-center">
                    <Building className="mr-2 h-4 w-4 text-agrilink-blue" />
                    Corporation
                  </Label>
                </div>
              </RadioGroup>
              {errors.role && (
                <p className="text-sm text-red-500">{errors.role.message}</p>
              )}
            </div>

            <DialogFooter className="sm:justify-between flex flex-col sm:flex-row gap-2">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button type="submit" variant="outline">
                  Sign In
                </Button>
                <Button type="submit">
                  Register
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
