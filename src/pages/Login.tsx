
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { Plant } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const { login, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setError(null);
      await login(values.email, values.password);
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex justify-center">
            <Plant className="h-10 w-10 text-agrilink-green" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your email" 
                      type="email" 
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your password" 
                      type="password" 
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </Form>
        
        <div className="text-center text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-primary underline underline-offset-4">
            Sign up
          </Link>
        </div>

        {/* Demo accounts for testing */}
        <div className="border-t pt-4">
          <p className="text-xs text-muted-foreground mb-2 text-center">Demo accounts:</p>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <Button 
              variant="outline" 
              size="sm" 
              disabled={isLoading}
              onClick={() => form.setValue('email', 'farmer@example.com') && form.setValue('password', 'password123')}
            >
              Farmer: farmer@example.com
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              disabled={isLoading}
              onClick={() => form.setValue('email', 'landowner@example.com') && form.setValue('password', 'password123')}
            >
              Landowner: landowner@example.com
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              disabled={isLoading}
              onClick={() => form.setValue('email', 'corporate@example.com') && form.setValue('password', 'password123')}
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
