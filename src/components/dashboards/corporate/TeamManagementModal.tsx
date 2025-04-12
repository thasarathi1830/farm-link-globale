
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, UserPlus, X, Mail, Edit, UserMinus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  project: string;
}

interface TeamManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamId: string | null;
}

const TeamManagementModal: React.FC<TeamManagementModalProps> = ({ isOpen, onClose, teamId }) => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: '',
    project: '',
  });
  
  // Role options for the dropdown
  const roleOptions = [
    'Project Manager',
    'Field Supervisor',
    'Agronomist',
    'Data Analyst',
    'Finance Officer',
    'Administrative Support'
  ];

  // Fetch team members when modal opens
  useEffect(() => {
    if (isOpen && teamId) {
      fetchTeamMembers();
    }
  }, [isOpen, teamId]);

  const fetchTeamMembers = async () => {
    setLoading(true);
    
    try {
      // In a real app, we would fetch from Supabase
      // const { data, error } = await supabase
      //   .from('team_members')
      //   .select('*')
      //   .eq('team_id', teamId);
      
      // if (error) throw error;
      // setMembers(data);
      
      // Using mock data for now
      setTimeout(() => {
        setMembers([
          { id: '1', name: 'Emma Johnson', email: 'emma@example.com', role: 'Project Manager', status: 'active', project: 'Sustainable Cotton Farming Initiative' },
          { id: '2', name: 'Michael Chen', email: 'michael@example.com', role: 'Field Supervisor', status: 'active', project: 'Sustainable Cotton Farming Initiative' },
          { id: '3', name: 'Sophia Rodriguez', email: 'sophia@example.com', role: 'Agronomist', status: 'active', project: 'Sustainable Cotton Farming Initiative' },
          { id: '4', name: 'James Wilson', email: 'james@example.com', role: 'Data Analyst', status: 'pending', project: 'Organic Rice Production' },
          { id: '5', name: 'Olivia Brown', email: 'olivia@example.com', role: 'Finance Officer', status: 'inactive', project: 'Sustainable Cotton Farming Initiative' },
        ]);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error('Error fetching team members:', err);
      toast({
        title: 'Error',
        description: 'Failed to load team members. Please try again.',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  const filteredMembers = members.filter(member => {
    const search = searchTerm.toLowerCase();
    return (
      member.name.toLowerCase().includes(search) ||
      member.email.toLowerCase().includes(search) ||
      member.role.toLowerCase().includes(search) ||
      member.status.toLowerCase().includes(search)
    );
  });

  const handleAddMember = async () => {
    if (!newMember.name || !newMember.email || !newMember.role) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newMember.email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      return;
    }

    try {
      // In a real app, we would add to Supabase
      // const { data, error } = await supabase
      //   .from('team_members')
      //   .insert([{ 
      //     team_id: teamId,
      //     name: newMember.name,
      //     email: newMember.email,
      //     role: newMember.role,
      //     status: 'pending'
      //   }]);
      
      // if (error) throw error;
      
      // Mock adding a member
      const newMemberData: TeamMember = {
        id: Date.now().toString(),
        name: newMember.name,
        email: newMember.email,
        role: newMember.role,
        status: 'pending',
        project: newMember.project || 'Unassigned',
      };
      
      setMembers([...members, newMemberData]);
      setNewMember({ name: '', email: '', role: '', project: '' });
      setShowAddMember(false);
      
      toast({
        title: 'Success',
        description: 'Team member added successfully',
      });
    } catch (err) {
      console.error('Error adding team member:', err);
      toast({
        title: 'Error',
        description: 'Failed to add team member. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleRemoveMember = async (id: string) => {
    try {
      // In a real app, we would remove from Supabase
      // const { error } = await supabase
      //   .from('team_members')
      //   .delete()
      //   .eq('id', id);
      
      // if (error) throw error;
      
      // Mock removing a member
      setMembers(members.filter(member => member.id !== id));
      
      toast({
        title: 'Success',
        description: 'Team member removed successfully',
      });
    } catch (err) {
      console.error('Error removing team member:', err);
      toast({
        title: 'Error',
        description: 'Failed to remove team member. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleSendInvite = (email: string) => {
    toast({
      title: 'Invite Sent',
      description: `An invitation has been sent to ${email}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-500">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Team Management</DialogTitle>
        </DialogHeader>

        <div className="flex justify-between items-center my-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search team members..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => setShowAddMember(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
            <span className="ml-2">Loading team members...</span>
          </div>
        ) : filteredMembers.length > 0 ? (
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>{getStatusBadge(member.status)}</TableCell>
                    <TableCell>{member.project}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        {member.status === 'pending' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleSendInvite(member.email)}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleRemoveMember(member.id)}
                        >
                          <UserMinus className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p>No team members found. {searchTerm ? 'Try a different search term.' : 'Add team members to get started.'}</p>
          </div>
        )}

        {showAddMember && (
          <div className="mt-6 border rounded-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Team Member</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowAddMember(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                  placeholder="Email Address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newMember.role}
                  onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                >
                  <option value="">Select a Role</option>
                  {roleOptions.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Project (Optional)</label>
                <Input
                  value={newMember.project}
                  onChange={(e) => setNewMember({...newMember, project: e.target.value})}
                  placeholder="Project Name"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" className="mr-2" onClick={() => setShowAddMember(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMember}>
                Add Member
              </Button>
            </div>
          </div>
        )}

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeamManagementModal;
