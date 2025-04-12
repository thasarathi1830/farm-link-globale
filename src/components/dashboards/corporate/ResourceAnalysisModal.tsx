
import React, { useState } from 'react';
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
import { BarChart3, Droplet, PieChart, FileSpreadsheet, TractorIcon, Users, Leaf, AreaChart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ChartContainer, 
  ChartLegend, 
  ChartLegendContent, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart as PieChartComponent, Pie } from 'recharts';

// Mock data for the resources analysis
const resourceCategories = [
  {
    name: 'Equipment',
    icon: TractorIcon,
    total: 48,
    allocated: 32,
    availability: 'medium',
    efficiency: 78,
    items: [
      { name: 'Tractors', quantity: 12, allocated: 10, efficiency: 85 },
      { name: 'Harvesters', quantity: 8, allocated: 5, efficiency: 62 },
      { name: 'Irrigation Systems', quantity: 20, allocated: 15, efficiency: 75 },
      { name: 'Drones', quantity: 8, allocated: 2, efficiency: 90 }
    ]
  },
  {
    name: 'Manpower',
    icon: Users,
    total: 120,
    allocated: 95,
    availability: 'low',
    efficiency: 92,
    items: [
      { name: 'Field Workers', quantity: 80, allocated: 72, efficiency: 90 },
      { name: 'Supervisors', quantity: 15, allocated: 12, efficiency: 95 },
      { name: 'Technicians', quantity: 20, allocated: 8, efficiency: 88 },
      { name: 'Analysts', quantity: 5, allocated: 3, efficiency: 95 }
    ]
  },
  {
    name: 'Supplies',
    icon: Leaf,
    total: 5000,
    allocated: 2800,
    availability: 'high',
    efficiency: 65,
    items: [
      { name: 'Seeds (kg)', quantity: 2000, allocated: 1200, efficiency: 95 },
      { name: 'Fertilizers (kg)', quantity: 1500, allocated: 800, efficiency: 82 },
      { name: 'Pesticides (L)', quantity: 800, allocated: 500, efficiency: 40 },
      { name: 'Soil Additives (kg)', quantity: 700, allocated: 300, efficiency: 75 }
    ]
  },
  {
    name: 'Water Resources',
    icon: Droplet,
    total: 150000,
    allocated: 98000,
    availability: 'medium',
    efficiency: 88,
    items: [
      { name: 'Irrigation Water (kL)', quantity: 120000, allocated: 85000, efficiency: 90 },
      { name: 'Drinking Water (kL)', quantity: 20000, allocated: 12000, efficiency: 95 },
      { name: 'Process Water (kL)', quantity: 10000, allocated: 1000, efficiency: 80 }
    ]
  }
];

const resourceDistributionData = [
  { name: 'Cotton Project', equipment: 40, manpower: 35, supplies: 25, water: 45 },
  { name: 'Rice Project', equipment: 25, manpower: 30, supplies: 35, water: 20 },
  { name: 'Water Conservation', equipment: 35, manpower: 35, supplies: 40, water: 35 }
];

const resourceEfficiencyData = [
  { name: 'Equipment', value: 78, color: '#7E69AB' },
  { name: 'Manpower', value: 92, color: '#33C3F0' },
  { name: 'Supplies', value: 65, color: '#F97316' },
  { name: 'Water', value: 88, color: '#0EA5E9' }
];

interface ResourceAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResourceAnalysisModal: React.FC<ResourceAnalysisModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 80) return 'text-green-500';
    if (efficiency >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const filteredCategories = selectedCategory === 'all' 
    ? resourceCategories 
    : resourceCategories.filter(cat => cat.name.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <BarChart3 className="mr-2 h-6 w-6" /> Resource Analysis
          </DialogTitle>
          <DialogDescription>
            Comprehensive overview of all resources, their allocation, and efficiency metrics
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between items-center mb-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Resource Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {resourceCategories.map(category => (
                <SelectItem key={category.name} value={category.name.toLowerCase()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading resource data...</p>
          </div>
        ) : (
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="distribution">Distribution</TabsTrigger>
              <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
              <TabsTrigger value="details">Detailed Breakdown</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCategories.map((category) => (
                  <div key={category.name} className="border rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <category.icon className="h-5 w-5 mr-2" />
                        <h3 className="font-semibold text-lg">{category.name}</h3>
                      </div>
                      <Badge className={getAvailabilityColor(category.availability)}>
                        {category.availability === 'high' ? 'High Availability' : 
                         category.availability === 'medium' ? 'Medium Availability' : 
                         'Low Availability'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-xl font-medium">{category.total.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Allocated</p>
                        <p className="text-xl font-medium">{category.allocated.toLocaleString()} ({Math.round((category.allocated / category.total) * 100)}%)</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-muted-foreground">Efficiency</p>
                        <p className={`text-xl font-medium ${getEfficiencyColor(category.efficiency)}`}>
                          {category.efficiency}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="distribution">
              <div className="border rounded-lg p-4 shadow-sm h-80">
                <h3 className="text-lg font-semibold mb-4">Resource Distribution by Project</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={resourceDistributionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="equipment" fill="#7E69AB" name="Equipment" />
                    <Bar dataKey="manpower" fill="#33C3F0" name="Manpower" />
                    <Bar dataKey="supplies" fill="#F97316" name="Supplies" />
                    <Bar dataKey="water" fill="#0EA5E9" name="Water" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="efficiency">
              <div className="border rounded-lg p-4 shadow-sm h-80">
                <h3 className="text-lg font-semibold mb-4">Resource Efficiency Metrics</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChartComponent>
                    <Pie
                      data={resourceEfficiencyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {resourceEfficiencyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChartComponent>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="details">
              <div className="space-y-6">
                {filteredCategories.map((category) => (
                  <div key={category.name} className="border rounded-lg p-4 shadow-sm">
                    <h3 className="font-semibold text-lg mb-3 flex items-center">
                      <category.icon className="h-5 w-5 mr-2" />
                      {category.name} Details
                    </h3>
                    
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Item</th>
                          <th className="text-right py-2">Total</th>
                          <th className="text-right py-2">Allocated</th>
                          <th className="text-right py-2">Efficiency</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.items.map((item, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2">{item.name}</td>
                            <td className="text-right py-2">{item.quantity.toLocaleString()}</td>
                            <td className="text-right py-2">
                              {item.allocated.toLocaleString()} ({Math.round((item.allocated / item.quantity) * 100)}%)
                            </td>
                            <td className={`text-right py-2 ${getEfficiencyColor(item.efficiency)}`}>
                              {item.efficiency}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}

        <DialogFooter className="mt-6 space-x-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export Analysis
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceAnalysisModal;
