
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sprout } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Login successful!');
    navigate('/dashboard');
  };

  const setDemoAccount = (email: string, password: string) => {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    
    if (emailInput) emailInput.value = email;
    if (passwordInput) passwordInput.value = password;
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex justify-center">
            <Sprout className="h-10 w-10 text-agrilink-green" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              placeholder="Your email" 
              type="email" 
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password"
              placeholder="Your password" 
              type="password" 
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
        
        <div className="text-center text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-primary underline underline-offset-4">
            Sign up
          </Link>
        </div>

        <div className="border-t pt-4">
          <p className="text-xs text-muted-foreground mb-2 text-center">Demo accounts:</p>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setDemoAccount('farmer@example.com', 'password123')}
            >
              Farmer: farmer@example.com
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setDemoAccount('landowner@example.com', 'password123')}
            >
              Landowner: landowner@example.com
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setDemoAccount('corporate@example.com', 'password123')}
            >
              Corporate: corporate@example.com
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
