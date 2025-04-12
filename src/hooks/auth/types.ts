
export type UserRole = 'farmer' | 'landowner' | 'corporate' | null;

export interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  role: UserRole;
  phone?: string | null;
  photoUrl?: string | null;
}

export interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signupWithGoogle: (role: UserRole) => Promise<void>;
}
