
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Download, FilterX } from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface RevenueReportsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Sample data - in a real app, this would come from Supabase
const monthlyData = [
  { name: 'Jan', revenue: 12000 },
  { name: 'Feb', revenue: 15000 },
  { name: 'Mar', revenue: 18000 },
  { name: 'Apr', revenue: 14000 },
  { name: 'May', revenue: 21000 },
  { name: 'Jun', revenue: 25000 },
  { name: 'Jul', revenue: 28000 },
  { name: 'Aug', revenue: 30000 },
  { name: 'Sep', revenue: 27000 },
  { name: 'Oct', revenue: 23000 },
  { name: 'Nov', revenue: 19000 },
  { name: 'Dec', revenue: 22000 }
];

const landDistributionData = [
  { name: 'Rice Field', value: 35000 },
  { name: 'Vegetable Garden', value: 25000 },
  { name: 'Orchard', value: 18000 },
  { name: 'Wheat Field', value: 22000 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RevenueReportsModal: React.FC<RevenueReportsModalProps> = ({ open, onOpenChange }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [filterVisible, setFilterVisible] = useState(false);

  const handleDownloadReport = () => {
    // In a real implementation, this would generate and download a PDF report
    // You could use libraries like jsPDF or call a Supabase Edge Function
    alert("This would download a PDF report in a real implementation");
  };

  // Chart config
  const chartConfig = {
    revenue: {
      label: "Revenue",
      theme: {
        light: "#3b82f6",
        dark: "#60a5fa",
      },
    },
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detailed Revenue Reports</DialogTitle>
          <DialogDescription>
            Analyze your revenue trends, distribution by land, and seasonal patterns.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between items-center my-4">
          <Tabs defaultValue="monthly" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="lands">By Land</TabsTrigger>
                <TabsTrigger value="tenants">By Tenant</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <Popover open={filterVisible} onOpenChange={setFilterVisible}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex gap-2 items-center h-9 px-3"
                    >
                      <CalendarIcon className="h-4 w-4" />
                      {date ? format(date, 'PP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <Button variant="ghost" size="icon" onClick={() => setDate(new Date())}>
                  <FilterX className="h-4 w-4" />
                </Button>
                
                <Button onClick={handleDownloadReport} className="flex items-center gap-2">
                  <Download className="h-4 w-4" /> Download PDF
                </Button>
              </div>
            </div>

            <TabsContent value="monthly" className="pt-4">
              <div className="bg-card rounded-lg p-4 border">
                <h3 className="text-lg font-medium mb-4">Monthly Revenue (2023)</h3>
                <div className="h-80">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                        <YAxis
                          tickFormatter={(value) => `₹${value.toLocaleString()}`}
                        />
                        <ChartTooltip 
                          content={({active, payload}) => 
                            active && payload?.length ? (
                              <div className="rounded-lg border bg-background p-2 shadow-sm">
                                <div className="text-sm font-semibold">
                                  {payload[0].payload.name}
                                </div>
                                <div className="text-xs font-semibold">
                                  ₹{payload[0].value?.toLocaleString()}
                                </div>
                              </div>
                            ) : null
                          }
                        />
                        <Bar 
                          dataKey="revenue" 
                          name="Revenue" 
                          fill="var(--color-revenue)" 
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-medium mb-2">Summary</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Revenue</p>
                      <p className="font-semibold">₹254,000</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Average Monthly</p>
                      <p className="font-semibold">₹21,167</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Highest Month</p>
                      <p className="font-semibold">August (₹30,000)</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="lands" className="pt-4">
              <div className="bg-card rounded-lg p-4 border">
                <h3 className="text-lg font-medium mb-4">Revenue by Land</h3>
                <div className="h-80 flex">
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={landDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={90}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {landDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-52">
                    <h4 className="font-medium mb-2">Land Distribution</h4>
                    <div className="space-y-2">
                      {landDistributionData.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-sm" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <div className="text-sm flex justify-between w-full">
                            <span>{item.name}</span>
                            <span className="font-medium">₹{item.value.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tenants" className="pt-4">
              <div className="bg-card rounded-lg p-4 border">
                <h3 className="text-lg font-medium mb-4">Revenue by Tenant</h3>
                <div className="text-center py-10 text-muted-foreground">
                  <p>No tenant data available for the selected period.</p>
                  <p>Add tenant information to see this report.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RevenueReportsModal;
