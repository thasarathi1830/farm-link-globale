
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateAccountInstead: () => void;
}

type LoginFormData = {
  email: string;
  password: string;
};

const LoginModal = ({ isOpen, onOpenChange, onCreateAccountInstead }: LoginModalProps) => {
  const loginForm = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onLoginSubmit = (data: LoginFormData) => {
    console.log('Login submitted:', data);
    // Here you would handle form submission (login)
    toast.success("Logged in successfully!");
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
            <Button type="button" variant="outline" onClick={onCreateAccountInstead}>
              Create Account
            </Button>
            <Button type="submit">
              Log In
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
