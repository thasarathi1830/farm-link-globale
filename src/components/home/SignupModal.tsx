
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sprout, Users, Building } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

interface SignupModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRole: 'farmer' | 'landowner' | 'corporate' | null;
  onLoginInstead: () => void;
}

// Schema for signup form
const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['farmer', 'landowner', 'corporate']),
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupModal = ({ isOpen, onOpenChange, selectedRole, onLoginInstead }: SignupModalProps) => {
  const navigate = useNavigate();
  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      role: selectedRole || 'farmer',
    },
  });

  // Update form when selectedRole changes
  React.useEffect(() => {
    if (selectedRole) {
      signupForm.setValue('role', selectedRole);
    }
  }, [selectedRole, signupForm]);

  const onSignupSubmit = (data: SignupFormData) => {
    console.log('Signup submitted:', data);
    // Here you would handle form submission (signup)
    toast.success("Account created successfully! Please check your email.");
    onOpenChange(false);
    navigate('/dashboard');
  };

  const handleGoogleSignup = () => {
    if (selectedRole) {
      toast.success("Signed up with Google!");
      onOpenChange(false);
      navigate('/dashboard');
    } else {
      toast.error("Please select a role first");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create an Account</DialogTitle>
          <DialogDescription>
            Join AgriLink to connect with agricultural stakeholders
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col space-y-4">
          <Button 
            variant="outline" 
            type="button" 
            onClick={handleGoogleSignup}
            className="flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-5 w-5">
              <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7181818,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
              <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
              <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1272727,9.90909091 L12,9.90909091 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
              <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
            </svg>
            Sign up with Google
          </Button>
          
          <div className="flex items-center gap-2">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">OR</span>
            <Separator className="flex-1" />
          </div>
          
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
                          Corporate
                        </Label>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="sm:justify-between flex flex-col sm:flex-row gap-2">
                <Button type="button" variant="outline" onClick={onLoginInstead}>
                  Log In Instead
                </Button>
                <Button type="submit">
                  Sign Up
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
