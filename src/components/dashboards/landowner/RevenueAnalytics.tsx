
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, BarChart4, PieChart } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const RevenueAnalytics = () => {
  const revenueData = [
    { month: 'Jan', revenue: 10500 },
    { month: 'Feb', revenue: 12000 },
    { month: 'Mar', revenue: 10800 },
    { month: 'Apr', revenue: 11500 },
    { month: 'May', revenue: 15000 },
    { month: 'Jun', revenue: 14200 },
    { month: 'Jul', revenue: 16500 },
    { month: 'Aug', revenue: 17800 },
    { month: 'Sep', revenue: 19200 },
    { month: 'Oct', revenue: 18500 },
    { month: 'Nov', revenue: 17000 },
    { month: 'Dec', revenue: 16800 },
  ];
  
  const cropRevenueData = [
    { name: 'Rice', value: 45000 },
    { name: 'Coconut', value: 30500 },
    { name: 'Vegetables', value: 12000 },
    { name: 'Fruits', value: 8500 },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Revenue Analytics</h2>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly Revenue (2025)</CardTitle>
            <CardDescription>Revenue generated from all land parcels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eee' }}
                    formatter={(value) => [`₹${value}`, 'Revenue']}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#2E7D32" 
                    fill="#A4C63950" 
                    activeDot={{ r: 6 }} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div className="border rounded-md p-2">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-lg font-semibold">₹1,75,800</p>
              </div>
              <div className="border rounded-md p-2">
                <p className="text-sm text-muted-foreground">Avg Monthly</p>
                <p className="text-lg font-semibold">₹14,650</p>
              </div>
              <div className="border rounded-md p-2">
                <p className="text-sm text-muted-foreground">YOY Growth</p>
                <p className="text-lg font-semibold text-green-600">+12%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Revenue by Crop Type</CardTitle>
            <CardDescription>Distribution of income across different crops</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cropRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eee' }}
                    formatter={(value) => [`₹${value}`, 'Revenue']}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Legend />
                  <Bar dataKey="value" name="Revenue" fill="#2E7D32" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4">
              <Button className="w-full">
                <PieChart className="mr-2 h-4 w-4" /> Detailed Crop Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Revenue Projections</CardTitle>
            <CardDescription>Expected yield value based on current farming activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-3">Rice Cultivation</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Est. Yield:</span>
                    <span>4.5 tons/acre</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Current Price:</span>
                    <span>₹20,000/ton</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Land Area:</span>
                    <span>3 acres</span>
                  </div>
                  <div className="h-px bg-muted my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Projected Revenue:</span>
                    <span className="text-green-600">₹2,70,000</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-3">Coconut Plantation</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Est. Yield:</span>
                    <span>80 nuts/tree</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Trees:</span>
                    <span>120 trees</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Current Price:</span>
                    <span>₹25/nut</span>
                  </div>
                  <div className="h-px bg-muted my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Projected Revenue:</span>
                    <span className="text-green-600">₹2,40,000</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-3">Vegetable Farming</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Est. Yield:</span>
                    <span>2.2 tons/acre</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Current Price:</span>
                    <span>₹25,000/ton</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Land Area:</span>
                    <span>1 acre</span>
                  </div>
                  <div className="h-px bg-muted my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Projected Revenue:</span>
                    <span className="text-green-600">₹55,000</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Projected Revenue</p>
                  <p className="text-2xl font-bold text-green-600">₹5,65,000</p>
                </div>
                <Button>
                  <BarChart4 className="mr-2 h-4 w-4" /> Customize Projections
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default RevenueAnalytics;
