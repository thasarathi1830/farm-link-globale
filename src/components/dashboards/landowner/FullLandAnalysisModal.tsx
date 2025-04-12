
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Droplet, 
  Sprout, 
  ThermometerSun, 
  Download, 
  Printer, 
  Leaf, 
  BarChart3, 
  CloudRain, 
  Bug, 
  Map, 
  FileText, 
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Types
interface LandAnalysis {
  id: string;
  landId: string;
  soilType: string;
  phLevel: number;
  nutrients: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
  irrigationHistory: {
    date: string;
    amount: number;
  }[];
  cropYields: {
    season: string;
    year: number;
    crop: string;
    yield: number;
  }[];
  weatherTrends: {
    month: string;
    rainfall: number;
    temperature: number;
  }[];
  pestReports: {
    date: string;
    type: string;
    severity: "low" | "medium" | "high";
  }[];
  soilHealthIndex: number;
}

// Example Data - Would be replaced with actual Supabase fetch
const mockLandAnalysis: LandAnalysis = {
  id: "1",
  landId: "land-123",
  soilType: "Clay Loam",
  phLevel: 6.8,
  nutrients: {
    nitrogen: 65,
    phosphorus: 45,
    potassium: 80
  },
  irrigationHistory: [
    { date: "2024-01", amount: 35 },
    { date: "2024-02", amount: 28 },
    { date: "2024-03", amount: 42 },
    { date: "2024-04", amount: 50 }
  ],
  cropYields: [
    { season: "Spring", year: 2023, crop: "Wheat", yield: 32 },
    { season: "Summer", year: 2023, crop: "Corn", yield: 45 },
    { season: "Fall", year: 2023, crop: "Soybeans", yield: 28 },
    { season: "Spring", year: 2024, crop: "Wheat", yield: 35 }
  ],
  weatherTrends: [
    { month: "Jan", rainfall: 62, temperature: 8 },
    { month: "Feb", rainfall: 58, temperature: 12 },
    { month: "Mar", rainfall: 78, temperature: 15 },
    { month: "Apr", rainfall: 95, temperature: 18 }
  ],
  pestReports: [
    { date: "2023-06-15", type: "Aphids", severity: "low" },
    { date: "2023-08-20", type: "Corn Borer", severity: "medium" }
  ],
  soilHealthIndex: 78
};

// Nutrient data for radar chart
const nutrientData = [
  { name: 'Nitrogen', value: 65, fullMark: 100 },
  { name: 'Phosphorus', value: 45, fullMark: 100 },
  { name: 'Potassium', value: 80, fullMark: 100 },
  { name: 'Organic Matter', value: 60, fullMark: 100 },
  { name: 'Microbial Activity', value: 75, fullMark: 100 },
];

// Color config for soil health
const getSoilHealthColor = (value: number) => {
  if (value >= 75) return "bg-green-500";
  if (value >= 50) return "bg-yellow-500";
  return "bg-red-500";
};

const getPestSeverityColor = (severity: string) => {
  switch(severity) {
    case "low": return "bg-green-100 text-green-800";
    case "medium": return "bg-yellow-100 text-yellow-800";
    case "high": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

interface FullLandAnalysisModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  landId?: string;
}

const FullLandAnalysisModal: React.FC<FullLandAnalysisModalProps> = ({
  open,
  onOpenChange,
  landId
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [landAnalysis, setLandAnalysis] = useState<LandAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch land analysis data when modal opens
  React.useEffect(() => {
    if (open && landId) {
      setIsLoading(true);
      setError(null);
      
      // Simulating API call with setTimeout
      setTimeout(() => {
        // In a real implementation, this would be a Supabase fetch
        // const fetchLandAnalysis = async () => {
        //   try {
        //     const { data, error } = await supabase
        //       .from('land_analysis')
        //       .select('*')
        //       .eq('land_id', landId)
        //       .single();
        //
        //     if (error) throw error;
        //     setLandAnalysis(data);
        //   } catch (err) {
        //     setError('Failed to load land analysis data');
        //     console.error('Error fetching land analysis:', err);
        //   } finally {
        //     setIsLoading(false);
        //   }
        // };
        // fetchLandAnalysis();

        // Using mock data for now
        setLandAnalysis(mockLandAnalysis);
        setIsLoading(false);
      }, 1500);
    }
  }, [open, landId]);

  const handleDownloadReport = () => {
    // In a real implementation, this would generate and download a PDF
    console.log('Downloading report for land ID:', landId);
    alert('Report download started');
  };

  const handlePrintAnalysis = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Land Analysis</DialogTitle>
            <DialogDescription>Loading land analysis data...</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <Skeleton className="h-[200px] w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-[150px]" />
              <Skeleton className="h-[150px]" />
            </div>
            <Skeleton className="h-[200px] w-full" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error || !landAnalysis) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Error Loading Analysis
            </DialogTitle>
            <DialogDescription>
              {error || "No analysis data available yet for this land."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sprout className="h-5 w-5" /> Land Analysis Report
          </DialogTitle>
          <DialogDescription>
            Comprehensive analysis for your farmland
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4" id="printable-content">
          {/* Soil Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-1">
                  <Leaf className="h-4 w-4" /> Soil Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-medium text-lg">{landAnalysis.soilType}</div>
                <p className="text-sm text-muted-foreground">Ideal for most crops</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-1">
                  <ThermometerSun className="h-4 w-4" /> pH Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-medium text-lg">{landAnalysis.phLevel}</div>
                <p className="text-sm text-muted-foreground">
                  {landAnalysis.phLevel < 6.5 ? "Acidic" : 
                   landAnalysis.phLevel > 7.5 ? "Alkaline" : "Neutral"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-1">
                  <Sprout className="h-4 w-4" /> Soil Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="font-medium text-lg">{landAnalysis.soilHealthIndex}%</div>
                  <Badge className={getSoilHealthColor(landAnalysis.soilHealthIndex)}>
                    {landAnalysis.soilHealthIndex >= 75 ? "Excellent" : 
                     landAnalysis.soilHealthIndex >= 50 ? "Good" : "Poor"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Overall soil quality</p>
              </CardContent>
            </Card>
          </div>

          {/* Nutrient Levels */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sprout className="h-5 w-5" /> Nutrient Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Nitrogen', value: landAnalysis.nutrients.nitrogen },
                      { name: 'Phosphorus', value: landAnalysis.nutrients.phosphorus },
                      { name: 'Potassium', value: landAnalysis.nutrients.potassium }
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'ppm', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name="Level (ppm)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Crop Yields */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5" /> Crop Yield History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={landAnalysis.cropYields}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="season" />
                    <YAxis label={{ value: 'Yield (bu/acre)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="yield" stroke="#82ca9d" activeDot={{ r: 8 }} name="Crop Yield" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Recent crops: {landAnalysis.cropYields.map(c => c.crop).join(', ')}</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Irrigation History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Droplet className="h-5 w-5" /> Irrigation History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={landAnalysis.irrigationHistory}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis label={{ value: 'mm', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="amount" fill="#3b82f6" name="Water (mm)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Weather Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CloudRain className="h-5 w-5" /> Weather Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={landAnalysis.weatherTrends}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" label={{ value: 'mm', angle: -90, position: 'insideLeft' }} />
                      <YAxis yAxisId="right" orientation="right" label={{ value: '°C', angle: 90, position: 'insideRight' }} />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="rainfall" stroke="#3b82f6" name="Rainfall (mm)" />
                      <Line yAxisId="right" type="monotone" dataKey="temperature" stroke="#ef4444" name="Temp (°C)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pest Reports */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bug className="h-5 w-5" /> Pest Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              {landAnalysis.pestReports.length > 0 ? (
                <div className="space-y-2">
                  {landAnalysis.pestReports.map((report, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <span className="font-medium">{report.type}</span>
                        <div className="text-sm text-muted-foreground">{report.date}</div>
                      </div>
                      <Badge className={getPestSeverityColor(report.severity)}>
                        {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No pest reports for this period.</p>
              )}
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="bg-purple-50 dark:bg-purple-950">
            <CardHeader>
              <CardTitle className="text-lg text-purple-800 dark:text-purple-300">
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-md">
                <p className="font-medium">Ideal Crops</p>
                <p className="text-sm text-muted-foreground">Based on your soil quality and past yield data, consider planting corn, soybeans, or wheat for optimal results.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-md">
                <p className="font-medium">Irrigation Plan</p>
                <p className="text-sm text-muted-foreground">Consider increasing irrigation by 15% in the coming weeks to meet the projected rainfall deficit.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-md">
                <p className="font-medium">Soil Treatment</p>
                <p className="text-sm text-muted-foreground">Add organic compost to boost phosphorus levels which are currently below optimal range.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto" 
            onClick={handlePrintAnalysis}
            size="sm"
          >
            <Printer className="mr-2 h-4 w-4" /> Print Analysis
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto" 
            onClick={handleDownloadReport}
            size="sm"
          >
            <Download className="mr-2 h-4 w-4" /> Download Report
          </Button>
          <Button 
            className="w-full sm:w-auto"
            onClick={() => onOpenChange(false)}
            size="sm"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FullLandAnalysisModal;
