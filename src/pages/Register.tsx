
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sprout, Users, Building } from 'lucide-react';
import { useAuth } from '@/hooks/auth';
import { UserRole } from '@/hooks/auth/types';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('farmer');
  const { register, isLoading } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    await register(name, email, password, role);
  };

  return (
    <div className="container flex h-full py-12 w-full flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex justify-center">
            <Sprout className="h-10 w-10 text-agrilink-green" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your details to create your AgriLink account
          </p>
        </div>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name"
              placeholder="Your name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              placeholder="Your email" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password"
              placeholder="Your password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              id="confirmPassword"
              placeholder="Confirm your password" 
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-3">
            <Label>I am a:</Label>
            <RadioGroup 
              defaultValue="farmer" 
              className="flex flex-col space-y-2"
              value={role}
              onValueChange={(value) => setRole(value as UserRole)}
            >
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-green-50 cursor-pointer">
                <RadioGroupItem value="farmer" id="farmer" />
                <Sprout className="h-4 w-4 text-agrilink-green" />
                <label htmlFor="farmer" className="cursor-pointer flex-1">Farmer</label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-green-50 cursor-pointer">
                <RadioGroupItem value="landowner" id="landowner" />
                <Users className="h-4 w-4 text-agrilink-brown" />
                <label htmlFor="landowner" className="cursor-pointer flex-1">Landowner</label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-green-50 cursor-pointer">
                <RadioGroupItem value="corporate" id="corporate" />
                <Building className="h-4 w-4 text-agrilink-blue" />
                <label htmlFor="corporate" className="cursor-pointer flex-1">Corporate/MNC</label>
              </div>
            </RadioGroup>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>
        
        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
