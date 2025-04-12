import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Building, FileSpreadsheet, Users } from 'lucide-react';
import { useAuth } from '@/hooks/auth';

const CorporateDashboard = () => {
  const { profile } = useAuth();

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
        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Projects</CardTitle>
              <CardDescription>Overview of ongoing agricultural projects.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>List of active projects will be displayed here.</p>
            </CardContent>
            <CardFooter>
              <Button>View Details</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>Manage and assign team members to projects.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Team management options will be available here.</p>
            </CardContent>
            <CardFooter>
              <Button>Manage Team</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="agreements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manage Agreements</CardTitle>
              <CardDescription>View and manage land lease and employment agreements.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Agreement details and management tools will be here.</p>
            </CardContent>
            <CardFooter>
              <Button>View Agreements</Button>
            </CardFooter>
          </Card>
        </TabsContent>
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
    </div>
  );
};

export default CorporateDashboard;
