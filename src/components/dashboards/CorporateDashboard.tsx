
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Building, FileSpreadsheet, Users, Calendar, DollarSign, Clock } from 'lucide-react';
import { useAuth } from '@/hooks/auth';
import ProjectDetailsModal from './corporate/ProjectDetailsModal';
import TeamManagementModal from './corporate/TeamManagementModal';
import AgreementViewerModal from './corporate/AgreementViewerModal';
import { Badge } from '@/components/ui/badge';

// Mock data for the dashboard
const projectsData = [
  {
    id: '1',
    title: 'Sustainable Cotton Farming Initiative',
    description: 'Implementing sustainable practices in cotton farming to reduce environmental impact.',
    status: 'in-progress'
  },
  {
    id: '2',
    title: 'Organic Rice Production',
    description: 'Transitioning rice fields to certified organic production methods.',
    status: 'planning'
  },
  {
    id: '3',
    title: 'Agricultural Water Conservation',
    description: 'Implementing efficient irrigation systems to reduce water usage across multiple farms.',
    status: 'completed'
  }
];

const teamsData = [
  {
    id: '1',
    name: 'Cotton Project Team',
    memberCount: 12,
    activeMemberCount: 10,
    location: 'Eastern Region'
  },
  {
    id: '2',
    name: 'Rice Production Team',
    memberCount: 8,
    activeMemberCount: 7,
    location: 'Southern Region'
  },
  {
    id: '3',
    name: 'Irrigation Specialists',
    memberCount: 5,
    activeMemberCount: 5,
    location: 'Western Region'
  }
];

const agreementsData = [
  {
    id: '1',
    title: 'Land Lease Agreement - Cotton Farm Project',
    type: 'Lease Agreement',
    parties: ['AgriCorp International', 'James Thompson', 'Maria Rodriguez'],
    date: '2025-01-15',
    status: 'active'
  },
  {
    id: '2',
    title: 'Organic Certification Agreement - Rice Fields',
    type: 'Certification Agreement',
    parties: ['AgriCorp International', 'Organic Certification Body', 'Local Farmers Cooperative'],
    date: '2025-02-10',
    status: 'pending'
  },
  {
    id: '3',
    title: 'Water Rights Agreement - Irrigation Project',
    type: 'Resource Access Agreement',
    parties: ['AgriCorp International', 'Regional Water Authority', 'Multiple Landowners'],
    date: '2024-12-05',
    status: 'active'
  }
];

const CorporateDashboard = () => {
  const { profile } = useAuth();
  
  // State for modals
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isAgreementModalOpen, setIsAgreementModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [selectedAgreementId, setSelectedAgreementId] = useState<string | null>(null);

  // Functions to open modals
  const openProjectDetails = (projectId: string) => {
    setSelectedProjectId(projectId);
    setIsProjectModalOpen(true);
  };

  const openTeamManagement = (teamId: string) => {
    setSelectedTeamId(teamId);
    setIsTeamModalOpen(true);
  };

  const openAgreementViewer = (agreementId: string) => {
    setSelectedAgreementId(agreementId);
    setIsAgreementModalOpen(true);
  };

  // Helper function for status badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <Badge className="bg-yellow-500">In Progress</Badge>;
      case 'planning':
        return <Badge className="bg-blue-500">Planning</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome, {profile?.name || 'Corporate User'}!
          </h1>
          <p className="text-muted-foreground">
            Manage your agricultural projects and team efficiently.
          </p>
        </div>
        <Button>New Project</Button>
      </div>

      <Tabs defaultValue="projects" className="w-full space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="agreements">Agreements</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectsData.map((project) => (
              <Card key={project.id} className="h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{project.title}</CardTitle>
                    {getStatusBadge(project.status)}
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>Jan - Dec 2025</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => openProjectDetails(project.id)}>View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Team Tab */}
        <TabsContent value="team" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamsData.map((team) => (
              <Card key={team.id} className="h-full">
                <CardHeader>
                  <CardTitle>{team.name}</CardTitle>
                  <CardDescription>Located in {team.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Team Members:</span>
                      <span className="font-medium">{team.memberCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Active Members:</span>
                      <span className="font-medium">{team.activeMemberCount}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => openTeamManagement(team.id)}>Manage Team</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Agreements Tab */}
        <TabsContent value="agreements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agreementsData.map((agreement) => (
              <Card key={agreement.id} className="h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{agreement.title}</CardTitle>
                    {getStatusBadge(agreement.status)}
                  </div>
                  <CardDescription>{agreement.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">
                        {agreement.parties.length} parties involved
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">
                        Signed: {new Date(agreement.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => openAgreementViewer(agreement.id)}>View Agreement</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Financials Tab */}
        <TabsContent value="financials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Track budget utilization and revenue generation.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Financial reports and analytics will be displayed here.</p>
            </CardContent>
            <CardFooter>
              <Button>Generate Report</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Analysis</CardTitle>
              <CardDescription>Analyze resource consumption and efficiency.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Resource analysis tools and insights will be here.</p>
            </CardContent>
            <CardFooter>
              <Button>Analyze Resources</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Modals */}
      <ProjectDetailsModal 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)} 
        projectId={selectedProjectId}
      />
      
      <TeamManagementModal 
        isOpen={isTeamModalOpen} 
        onClose={() => setIsTeamModalOpen(false)} 
        teamId={selectedTeamId}
      />
      
      <AgreementViewerModal 
        isOpen={isAgreementModalOpen} 
        onClose={() => setIsAgreementModalOpen(false)} 
        agreementId={selectedAgreementId}
      />
    </div>
  );
};

export default CorporateDashboard;
