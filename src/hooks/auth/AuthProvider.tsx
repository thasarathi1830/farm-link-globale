
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { AuthContextType, UserProfile, UserRole } from './types';
import { fetchUserProfile } from './auth-utils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // First set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession?.user) {
          setIsLoading(true);
          const userProfile = await fetchUserProfile(newSession.user.id);
          setProfile(userProfile);
          setIsLoading(false);
        } else {
          setProfile(null);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        const userProfile = await fetchUserProfile(currentSession.user.id);
        setProfile(userProfile);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      if (data.user) {
        const userProfile = await fetchUserProfile(data.user.id);
        setProfile(userProfile);
        
        toast({
          title: "Login successful",
          description: `Welcome back!`,
        });
        
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Invalid email or password.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      setIsLoading(true);
      
      // Register the user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role
          }
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        // The trigger we created in the database will handle creating the user profile
        toast({
          title: "Registration successful",
          description: "Your account has been created.",
        });
        
        // In a real app, you might want to wait for email confirmation here
        // But for the demo, we'll just redirect to the dashboard
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message || "Failed to create account. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) throw error;
      
      // The redirect happens automatically, so we don't need to do anything else here
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Google login failed",
        description: error.message || "Failed to log in with Google. Please try again.",
      });
      setIsLoading(false);
    }
  };

  const signupWithGoogle = async (role: UserRole) => {
    try {
      setIsLoading(true);
      
      // For Google sign-up, we'll use the same OAuth flow but store the desired role in localStorage
      // We'll set it in the user metadata after the OAuth flow completes
      localStorage.setItem('signup_role', role || 'farmer');
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) throw error;
      
      // The redirect happens automatically
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Google signup failed",
        description: error.message || "Failed to sign up with Google. Please try again.",
      });
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: error.message || "Failed to log out. Please try again.",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        loginWithGoogle,
        signupWithGoogle
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
