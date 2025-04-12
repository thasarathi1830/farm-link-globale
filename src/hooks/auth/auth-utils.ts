
import { UserProfile, UserRole } from './types';

// Mock data for demonstration
const mockUsers = [
  {
    id: "1",
    name: "John Farmer",
    email: "farmer@example.com",
    role: "farmer" as UserRole,
    phone: "555-123-4567",
  },
  {
    id: "2",
    name: "Mary Landowner",
    email: "landowner@example.com",
    role: "landowner" as UserRole,
    phone: "555-987-6543",
  },
  {
    id: "3",
    name: "Corporate Inc",
    email: "corporate@example.com",
    role: "corporate" as UserRole,
    phone: "555-555-5555",
  }
];

export async function fetchUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find the user in mock data
    const user = mockUsers.find(u => u.id === userId);
    
    if (user) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        photoUrl: null
      };
    }
    return null;
  } catch (error) {
    console.error('Error in fetchUserProfile:', error);
    return null;
  }
}
