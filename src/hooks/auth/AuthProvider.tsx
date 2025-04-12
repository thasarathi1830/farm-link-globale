
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { AuthContextType, UserProfile, UserRole } from './types';
import { fetchUserProfile } from './auth-utils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulate login - in a real app, this would validate with a backend
      let userId: string;
      if (email === 'farmer@example.com') {
        userId = "1";
      } else if (email === 'landowner@example.com') {
        userId = "2";
      } else if (email === 'corporate@example.com') {
        userId = "3";
      } else {
        throw new Error("Invalid email or password");
      }
      
      // Set the user
      setUser({ id: userId, email });
      
      // Fetch the user profile
      const userProfile = await fetchUserProfile(userId);
      setProfile(userProfile);
      
      toast({
        title: "Login successful",
        description: `Welcome back!`,
      });
      
      navigate('/dashboard');
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
      
      // Simulate registration
      const userId = Math.floor(Math.random() * 1000).toString();
      
      // Set the user
      setUser({ id: userId, email });
      
      // Create a mock profile
      const newProfile: UserProfile = {
        id: userId,
        name,
        email,
        role,
        phone: null,
        photoUrl: null
      };
      
      setProfile(newProfile);
      
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });
      
      navigate('/dashboard');
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
      
      // Simulate OAuth login
      const userId = "1"; // Default to farmer for demonstration
      
      setUser({ id: userId, email: "farmer@example.com" });
      const userProfile = await fetchUserProfile(userId);
      setProfile(userProfile);
      
      toast({
        title: "Google login successful",
        description: "Welcome back!",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Google login failed",
        description: error.message || "Failed to log in with Google. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signupWithGoogle = async (role: UserRole) => {
    try {
      setIsLoading(true);
      
      // Simulate OAuth signup
      const userId = Math.floor(Math.random() * 1000).toString();
      
      setUser({ id: userId, email: "new.user@example.com" });
      
      const newProfile: UserProfile = {
        id: userId,
        name: "New User",
        email: "new.user@example.com",
        role,
        phone: null,
        photoUrl: null
      };
      
      setProfile(newProfile);
      
      toast({
        title: "Google signup successful",
        description: "Your account has been created.",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Google signup failed",
        description: error.message || "Failed to sign up with Google. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Clear user data
      setUser(null);
      setProfile(null);
      
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
