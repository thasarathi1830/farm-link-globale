
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
              <Button type="button" variant="outline" onClick={onLoginInstead}>
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
  );
};

export default SignupModal;
