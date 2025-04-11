
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sprout, Users, Building, ArrowRight, Info, ChevronDown, ChevronUp, Mail, Phone, MapPin } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

type UserRole = 'farmer' | 'landowner' | 'corporate';

// Schema for signup form
const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['farmer', 'landowner', 'corporate']),
});

// Schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type SignupFormData = z.infer<typeof signupSchema>;
type ContactFormData = z.infer<typeof contactSchema>;

const Home = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isMissionExpanded, setIsMissionExpanded] = useState(false);
  
  // Create refs for scrolling
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  // Form for signup
  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'farmer',
    },
  });
  
  // Form for login
  const loginForm = useForm<{ email: string; password: string }>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  // Form for contact
  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });
  
  const openSignupModal = (role: UserRole) => {
    setSelectedRole(role);
    signupForm.setValue('role', role);
    setIsSignupModalOpen(true);
  };
  
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };
  
  const onSignupSubmit = (data: SignupFormData) => {
    console.log('Signup submitted:', data);
    // Here you would handle form submission (signup)
    toast.success("Account created successfully! Please check your email.");
    setIsSignupModalOpen(false);
  };
  
  const onLoginSubmit = (data: { email: string; password: string }) => {
    console.log('Login submitted:', data);
    // Here you would handle form submission (login)
    toast.success("Logged in successfully!");
    setIsLoginModalOpen(false);
  };
  
  const onContactSubmit = (data: ContactFormData) => {
    console.log('Contact form submitted:', data);
    // Here you would handle form submission (contact)
    toast.success("Message sent! We'll get back to you soon.");
    contactForm.reset();
  };
  
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
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
              onClick={() => scrollToSection(aboutRef)}
              className="flex items-center gap-1"
            >
              <Info className="h-4 w-4" />
              Learn More
            </Button>
          </div>
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
            <Card className="flex flex-col h-full">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-agrilink-green bg-opacity-10 rounded-full">
                  <Sprout className="w-10 h-10 text-agrilink-green" />
                </div>
                <CardTitle className="mt-4">For Farmers</CardTitle>
                <CardDescription>
                  Find work opportunities, lease land, showcase your experience, and connect with agricultural corporations.
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-0 mt-auto">
                <Button 
                  className="w-full"
                  onClick={() => openSignupModal('farmer')}
                >
                  Join as Farmer
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="flex flex-col h-full">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-agrilink-brown bg-opacity-10 rounded-full">
                  <Users className="w-10 h-10 text-agrilink-brown" />
                </div>
                <CardTitle className="mt-4">For Landowners</CardTitle>
                <CardDescription>
                  List your land, find reliable farmers, create lease agreements, and maximize your property's potential.
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-0 mt-auto">
                <Button 
                  className="w-full"
                  onClick={() => openSignupModal('landowner')}
                >
                  Join as Landowner
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="flex flex-col h-full">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-agrilink-blue bg-opacity-10 rounded-full">
                  <Building className="w-10 h-10 text-agrilink-blue" />
                </div>
                <CardTitle className="mt-4">For Corporations</CardTitle>
                <CardDescription>
                  Find skilled farmers, lease land, manage agricultural projects, and track performance with powerful analytics.
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-0 mt-auto">
                <Button 
                  className="w-full"
                  onClick={() => openSignupModal('corporate')}
                >
                  Join as Corporation
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="w-full py-12 md:py-24 bg-green-50" id="about">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              About AgriLink
            </h2>
            <p className="text-gray-600 md:text-lg">
              AgriLink is a digital bridge connecting farmers, landowners, and corporations to enable transparent, fair, and efficient agricultural collaboration. Our mission is to empower farmers, help landowners utilize land effectively, and assist corporations in managing agricultural projects. We provide verified profiles, project dashboards, and smart matching between stakeholders to revolutionize agriculture.
            </p>
            <div className="space-y-4 w-full">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
                <p className="text-gray-600">
                  To create a transparent, efficient, and accessible platform that empowers agricultural stakeholders to connect, collaborate, and thrive in a sustainable ecosystem.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
                <p className="text-gray-600">
                  A world where agricultural collaboration is seamless, profitable, and environmentally responsible, ensuring food security for future generations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="w-full py-12 md:py-24 bg-white" id="contact">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Contact Us
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-lg mx-auto">
              Have questions? Want to learn more? Get in touch with us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-agrilink-green" />
                <div>
                  <h3 className="font-medium text-lg">Our Address</h3>
                  <p className="text-gray-600">AgriLink HQ, 42 Greenfield Avenue, Chennai, Tamil Nadu</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-agrilink-green" />
                <div>
                  <h3 className="font-medium text-lg">Email</h3>
                  <p className="text-gray-600">support@agrilink.io</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-agrilink-green" />
                <div>
                  <h3 className="font-medium text-lg">Phone</h3>
                  <p className="text-gray-600">+91-98765-43210</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
              
              <Form {...contactForm}>
                <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-4">
                  <FormField
                    control={contactForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={contactForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={contactForm.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">Submit Message</Button>
                </form>
              </Form>
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
          <Button size="lg" className="bg-white text-agrilink-green hover:bg-gray-100" onClick={() => openSignupModal('farmer')}>
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Signup Modal */}
      <Dialog open={isSignupModalOpen} onOpenChange={setIsSignupModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create an Account</DialogTitle>
            <DialogDescription>
              Join AgriLink to connect with agricultural stakeholders
            </DialogDescription>
          </DialogHeader>
          
          <Form {...signupForm}>
            <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
              <FormField
                control={signupForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={signupForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signupForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>I am a...</FormLabel>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="farmer"
                          value="farmer"
                          checked={field.value === 'farmer'}
                          onChange={() => field.onChange('farmer')}
                          className="peer h-4 w-4 text-agrilink-green"
                        />
                        <Label htmlFor="farmer" className="flex items-center">
                          <Sprout className="mr-2 h-4 w-4 text-agrilink-green" />
                          Farmer
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="landowner"
                          value="landowner"
                          checked={field.value === 'landowner'}
                          onChange={() => field.onChange('landowner')}
                          className="peer h-4 w-4 text-agrilink-brown"
                        />
                        <Label htmlFor="landowner" className="flex items-center">
                          <Users className="mr-2 h-4 w-4 text-agrilink-brown" />
                          Landowner
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="corporate"
                          value="corporate"
                          checked={field.value === 'corporate'}
                          onChange={() => field.onChange('corporate')}
                          className="peer h-4 w-4 text-agrilink-blue"
                        />
                        <Label htmlFor="corporate" className="flex items-center">
                          <Building className="mr-2 h-4 w-4 text-agrilink-blue" />
                          Corporation
                        </Label>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="sm:justify-between flex flex-col sm:flex-row gap-2">
                <Button type="button" variant="outline" onClick={() => {
                  setIsSignupModalOpen(false);
                  openLoginModal();
                }}>
                  Log In Instead
                </Button>
                <Button type="submit">
                  Sign Up
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Login Modal */}
      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Log In to AgriLink</DialogTitle>
            <DialogDescription>
              Access your AgriLink account
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input 
                id="login-email" 
                type="email" 
                placeholder="your@email.com" 
                {...loginForm.register('email', { required: true })} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input 
                id="login-password" 
                type="password" 
                placeholder="••••••••" 
                {...loginForm.register('password', { required: true })} 
              />
            </div>

            <DialogFooter className="sm:justify-between flex flex-col sm:flex-row gap-2">
              <Button type="button" variant="outline" onClick={() => {
                setIsLoginModalOpen(false);
                openSignupModal(selectedRole || 'farmer');
              }}>
                Create Account
              </Button>
              <Button type="submit">
                Log In
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
