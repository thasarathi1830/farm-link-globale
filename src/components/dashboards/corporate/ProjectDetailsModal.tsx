import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, FileText, DollarSign } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Define project type
interface ProjectMember {
  id: string;
  name: string;
  role: string;
  email: string;
}

interface ProjectMilestone {
  id: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue' | 'in-progress';
}

interface Project {
  id: string;
  title: string;
  objective: string;
  description: string;
  startDate: string;
  endDate: string;
  members: ProjectMember[];
  resources: string[];
  budget: number;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  milestones: ProjectMilestone[];
}

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string | null;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ isOpen, onClose, projectId }) => {
  const [project, setProject] = React.useState<Project | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen && projectId) {
      fetchProjectDetails(projectId);
    }
  }, [isOpen, projectId]);

  const fetchProjectDetails = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      // For now, let's use mock data
      setTimeout(() => {
        setProject({
          id,
          title: 'Sustainable Cotton Farming Initiative',
          objective: 'Implement sustainable farming practices for cotton production',
          description: 'A comprehensive project to transform traditional cotton farming by introducing sustainable practices that reduce water usage and eliminate harmful pesticides while improving yield and quality.',
          startDate: '2025-01-15',
          endDate: '2025-12-31',
          status: 'in-progress',
          budget: 250000,
          members: [
            { id: '1', name: 'John Smith', role: 'Project Manager', email: 'john@example.com' },
            { id: '2', name: 'Maria Garcia', role: 'Field Supervisor', email: 'maria@example.com' },
            { id: '3', name: 'Raj Patel', role: 'Agronomist', email: 'raj@example.com' }
          ],
          resources: ['Irrigation equipment', 'Organic pesticides', 'Farming tools', 'Seeds'],
          milestones: [
            { id: 'm1', title: 'Land preparation', dueDate: '2025-02-15', status: 'completed' },
            { id: 'm2', title: 'Planting phase', dueDate: '2025-03-30', status: 'completed' },
            { id: 'm3', title: 'Growth monitoring', dueDate: '2025-07-15', status: 'in-progress' },
            { id: 'm4', title: 'Harvesting', dueDate: '2025-11-30', status: 'pending' }
          ]
        });
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error('Error fetching project:', err);
      setError('Failed to load project details. Please try again.');
      setLoading(false);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      case 'on-hold': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'overdue': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
            <span className="ml-2">Loading project details...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            <p>{error}</p>
            <Button onClick={() => projectId && fetchProjectDetails(projectId)} className="mt-4">
              Retry
            </Button>
          </div>
        ) : project ? (
          <>
            <DialogHeader>
              <div className="flex justify-between items-start">
                <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
                <Badge className={getStatusBadgeColor(project.status)}>
                  {project.status.replace('-', ' ').toUpperCase()}
                </Badge>
              </div>
              <DialogDescription className="text-lg">{project.objective}</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold flex items-center">
                    <Calendar className="mr-2 h-5 w-5" /> Timeline
                  </h3>
                  <p className="mt-1">
                    Start: {formatDate(project.startDate)} <br />
                    End: {formatDate(project.endDate)}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold flex items-center">
                    <Users className="mr-2 h-5 w-5" /> Team Members
                  </h3>
                  <ul className="mt-1 space-y-1">
                    {project.members.map(member => (
                      <li key={member.id}>
                        <strong>{member.name}</strong> - {member.role}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold flex items-center">
                    <FileText className="mr-2 h-5 w-5" /> Resources
                  </h3>
                  <ul className="mt-1 list-disc pl-5">
                    {project.resources.map((resource, index) => (
                      <li key={index}>{resource}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" /> Budget
                  </h3>
                  <p className="mt-1">${project.budget.toLocaleString()}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold flex items-center">
                    <Clock className="mr-2 h-5 w-5" /> Milestones
                  </h3>
                  <div className="mt-2 border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Milestone</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {project.milestones.map(milestone => (
                          <TableRow key={milestone.id}>
                            <TableCell>{milestone.title}</TableCell>
                            <TableCell>{formatDate(milestone.dueDate)}</TableCell>
                            <TableCell>
                              <Badge className={getMilestoneStatusColor(milestone.status)}>
                                {milestone.status.toUpperCase()}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="mt-2">{project.description}</p>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={onClose}>Close</Button>
              <Button>Edit Project</Button>
            </DialogFooter>
          </>
        ) : (
          <div className="text-center py-8">
            <p>This project is in draft or under review</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsModal;
