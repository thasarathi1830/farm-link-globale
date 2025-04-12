
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
import { Check, Download, FileSpreadsheet, FileText, Printer, AlertCircle, Calendar, DollarSign } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ChartContainer, 
  ChartLegend, 
  ChartLegendContent, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

// Mock data for financial reports
const financialSummary = {
  totalExpenditure: 1250000,
  totalIncome: 1850000,
  totalProfit: 600000,
  budgetUtilization: 82,
  projectCount: 5,
  completedProjects: 2
};

const expenditureByCategory = [
  { name: 'Equipment', value: 380000, percentage: 30.4 },
  { name: 'Manpower', value: 520000, percentage: 41.6 },
  { name: 'Land Lease', value: 150000, percentage: 12 },
  { name: 'Supplies', value: 120000, percentage: 9.6 },
  { name: 'Transportation', value: 80000, percentage: 6.4 }
];

const projectFinancials = [
  { 
    id: 'PRJ001', 
    name: 'Sustainable Cotton Farming', 
    budget: 500000, 
    spent: 420000, 
    income: 750000, 
    profit: 330000, 
    margin: 44, 
    status: 'completed' 
  },
  { 
    id: 'PRJ002', 
    name: 'Organic Rice Production', 
    budget: 350000, 
    spent: 280000, 
    income: 350000, 
    profit: 70000, 
    margin: 20, 
    status: 'in-progress' 
  },
  { 
    id: 'PRJ003', 
    name: 'Agricultural Water Conservation', 
    budget: 450000, 
    spent: 380000, 
    income: 750000, 
    profit: 370000, 
    margin: 49.3, 
    status: 'completed' 
  },
  { 
    id: 'PRJ004', 
    name: 'Community Farming Initiative', 
    budget: 200000, 
    spent: 170000, 
    income: 0, 
    profit: -170000, 
    margin: 0, 
    status: 'in-progress' 
  },
];

const monthlyFinancialData = [
  { name: 'Jan', expenditure: 95000, income: 120000, profit: 25000 },
  { name: 'Feb', expenditure: 105000, income: 135000, profit: 30000 },
  { name: 'Mar', expenditure: 110000, income: 160000, profit: 50000 },
  { name: 'Apr', expenditure: 120000, income: 175000, profit: 55000 },
  { name: 'May', expenditure: 130000, income: 190000, profit: 60000 },
  { name: 'Jun', expenditure: 125000, income: 180000, profit: 55000 },
  { name: 'Jul', expenditure: 145000, income: 215000, profit: 70000 },
  { name: 'Aug', expenditure: 135000, income: 195000, profit: 60000 },
  { name: 'Sep', expenditure: 90000, income: 130000, profit: 40000 },
  { name: 'Oct', expenditure: 95000, income: 150000, profit: 55000 },
  { name: 'Nov', expenditure: 100000, income: 170000, profit: 70000 },
  { name: 'Dec', expenditure: 0, income: 0, profit: 0 }
];

const previousReports = [
  { id: 'RPT-2025-Q1', name: 'Q1 2025 Financial Report', date: '2025-03-31', type: 'quarterly' },
  { id: 'RPT-2025-Q2', name: 'Q2 2025 Financial Report', date: '2025-06-30', type: 'quarterly' },
  { id: 'RPT-JAN-2025', name: 'January 2025 Financial Report', date: '2025-01-31', type: 'monthly' },
  { id: 'RPT-FEB-2025', name: 'February 2025 Financial Report', date: '2025-02-28', type: 'monthly' },
  { id: 'RPT-MAR-2025', name: 'March 2025 Financial Report', date: '2025-03-31', type: 'monthly' },
];

interface FinancialReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FinancialReportModal: React.FC<FinancialReportModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState('monthly');
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  const handleDownloadPDF = () => {
    setGenerating(true);
    
    // Simulate PDF generation delay
    setTimeout(() => {
      setGenerating(false);
      toast({
        title: "Report Downloaded",
        description: "Financial report has been downloaded as PDF.",
        variant: "default",
      });
    }, 2000);
  };

  const handleExportCSV = () => {
    setGenerating(true);
    
    // Simulate CSV generation delay
    setTimeout(() => {
      setGenerating(false);
      toast({
        title: "Data Exported",
        description: "Financial data has been exported as CSV.",
        variant: "default",
      });
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'planning': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto print:shadow-none print:border-none" id="financialReport">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <FileText className="mr-2 h-6 w-6" /> Financial Report
          </DialogTitle>
          <DialogDescription>
            Comprehensive financial overview of projects, expenses, and revenue
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between items-center mb-4">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Report Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
              <SelectItem value="project">By Project</SelectItem>
            </SelectContent>
          </Select>

          <div className="space-x-2 print:hidden">
            <Button variant="outline" size="sm" onClick={handlePrint} disabled={generating}>
              <Printer className="h-4 w-4 mr-1" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportCSV} disabled={generating}>
              <FileSpreadsheet className="h-4 w-4 mr-1" />
              Export CSV
            </Button>
            <Button size="sm" onClick={handleDownloadPDF} disabled={generating}>
              <Download className="h-4 w-4 mr-1" />
              Download PDF
            </Button>
          </div>
        </div>

        {generating ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p>Generating your report...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="border rounded-lg p-4 shadow-sm">
                <p className="text-sm text-muted-foreground">Total Income</p>
                <p className="text-2xl font-medium text-green-600">${financialSummary.totalIncome.toLocaleString()}</p>
              </div>
              <div className="border rounded-lg p-4 shadow-sm">
                <p className="text-sm text-muted-foreground">Total Expenditure</p>
                <p className="text-2xl font-medium text-red-600">${financialSummary.totalExpenditure.toLocaleString()}</p>
              </div>
              <div className="border rounded-lg p-4 shadow-sm">
                <p className="text-sm text-muted-foreground">Net Profit</p>
                <p className="text-2xl font-medium text-blue-600">${financialSummary.totalProfit.toLocaleString()}</p>
              </div>
            </div>

            <Tabs defaultValue="summary">
              <TabsList className="mb-4 print:hidden">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="archive">Previous Reports</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary">
                <div className="space-y-6">
                  <div className="border rounded-lg p-4 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Expenditure by Category</h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={expenditureByCategory}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value) => `$${Number(value).toLocaleString()}`}
                            labelFormatter={(label) => `Category: ${label}`}
                          />
                          <Bar dataKey="value" fill="#8884d8" name="Amount ($)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Expenditure Breakdown</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Category</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead className="text-right">Percentage</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {expenditureByCategory.map((category) => (
                          <TableRow key={category.name}>
                            <TableCell>{category.name}</TableCell>
                            <TableCell className="text-right">${category.value.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{category.percentage}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="projects">
                <div className="border rounded-lg p-4 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Project Financial Performance</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Budget</TableHead>
                        <TableHead className="text-right">Spent</TableHead>
                        <TableHead className="text-right">Income</TableHead>
                        <TableHead className="text-right">Profit/Loss</TableHead>
                        <TableHead className="text-right">Margin</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projectFinancials.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell>{project.name}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadgeColor(project.status)}>
                              {project.status.replace('-', ' ').toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">${project.budget.toLocaleString()}</TableCell>
                          <TableCell className="text-right">${project.spent.toLocaleString()}</TableCell>
                          <TableCell className="text-right">${project.income.toLocaleString()}</TableCell>
                          <TableCell className="text-right" style={{ color: project.profit >= 0 ? 'green' : 'red' }}>
                            ${Math.abs(project.profit).toLocaleString()}{project.profit < 0 && ' (Loss)'}
                          </TableCell>
                          <TableCell className="text-right">{project.margin}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="trends">
                <div className="border rounded-lg p-4 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Monthly Financial Trends</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={monthlyFinancialData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => `$${Number(value).toLocaleString()}`}
                          labelFormatter={(label) => `Month: ${label}`}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="expenditure" stroke="#ff7300" name="Expenditure" />
                        <Line type="monotone" dataKey="income" stroke="#387908" name="Income" />
                        <Line type="monotone" dataKey="profit" stroke="#0ea5e9" name="Profit" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="archive">
                <div className="border rounded-lg p-4 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Previous Financial Reports</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previousReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>{report.id}</TableCell>
                          <TableCell>{report.name}</TableCell>
                          <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                          <TableCell className="capitalize">{report.type}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" className="mr-2">
                              <FileText className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}

        <DialogFooter className="mt-6 print:hidden">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FinancialReportModal;
