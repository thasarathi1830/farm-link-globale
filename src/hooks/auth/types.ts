
export type UserRole = 'farmer' | 'landowner' | 'corporate' | null;

export interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  role: UserRole;
  phone?: string | null;
  photoUrl?: string | null;
}
