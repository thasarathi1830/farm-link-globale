
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Download, Filter, X, Calendar, DollarSign, MapPin, Briefcase } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';

interface WorkHistoryEntry {
  id: string;
  projectTitle: string;
  projectType: string;
  startDate: Date;
  endDate: Date;
  dailyWage: number;
  totalIncome: number;
  clientName: string;
  location: string;
  status: 'completed' | 'in-review' | 'pending-payment';
}

interface WorkHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  farmerId: string | number;
}

const ITEMS_PER_PAGE = 5;

// Mock data - replace with actual Supabase fetch in production
const mockWorkHistory: WorkHistoryEntry[] = [
  {
    id: '1',
    projectTitle: 'Rice Field Harvesting',
    projectType: 'Crop Harvesting',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-02-15'),
    dailyWage: 580,
    totalIncome: 8700,
    clientName: 'Green Fields Corp',
    location: 'Western District',
    status: 'completed'
  },
  {
    id: '2',
    projectTitle: 'Wheat Plantation',
    projectType: 'Soil Preparation',
    startDate: new Date('2024-01-10'),
    endDate: new Date('2024-01-25'),
    dailyWage: 550,
    totalIncome: 8250,
    clientName: 'Harvest Holdings',
    location: 'Northern Fields',
    status: 'completed'
  },
  {
    id: '3',
    projectTitle: 'Organic Vegetable Garden',
    projectType: 'Irrigation',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-03-10'),
    dailyWage: 600,
    totalIncome: 6000,
    clientName: 'Farm Fresh Ltd',
    location: 'Southern Acres',
    status: 'in-review'
  },
  {
    id: '4',
    projectTitle: 'Corn Field Maintenance',
    projectType: 'Crop Maintenance',
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-03-30'),
    dailyWage: 520,
    totalIncome: 7800,
    clientName: 'AgriGrow Inc',
    location: 'Eastern Plains',
    status: 'pending-payment'
  },
  {
    id: '5',
    projectTitle: 'Mango Orchard Harvesting',
    projectType: 'Fruit Harvesting',
    startDate: new Date('2023-12-01'),
    endDate: new Date('2023-12-15'),
    dailyWage: 650,
    totalIncome: 9750,
    clientName: 'Fruit Valley',
    location: 'Hillside Gardens',
    status: 'completed'
  },
  {
    id: '6',
    projectTitle: 'Sugarcane Harvesting',
    projectType: 'Crop Harvesting',
    startDate: new Date('2023-11-15'),
    endDate: new Date('2023-11-30'),
    dailyWage: 570,
    totalIncome: 8550,
    clientName: 'Sweet Fields Ltd',
    location: 'Riverside Plantations',
    status: 'completed'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in-review':
      return 'bg-yellow-100 text-yellow-800';
    case 'pending-payment':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const formatStatusText = (status: string) => {
  return status.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

const WorkHistoryModal: React.FC<WorkHistoryModalProps> = ({ isOpen, onClose, farmerId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [projectTypeFilter, setProjectTypeFilter] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<WorkHistoryEntry | null>(null);

  // This would be replaced with an actual Supabase query
  /*
  const { data: workHistory, isLoading, error } = useQuery({
    queryKey: ['workHistory', farmerId, dateRange, projectTypeFilter],
    queryFn: async () => {
      let query = supabase
        .from('work_history')
        .select('*')
        .eq('farmer_id', farmerId);
      
      if (dateRange.from) {
        query = query.gte('start_date', dateRange.from.toISOString());
      }
      
      if (dateRange.to) {
        query = query.lte('end_date', dateRange.to.toISOString());
      }
      
      if (projectTypeFilter) {
        query = query.eq('project_type', projectTypeFilter);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    }
  });
  */

  // Using mock data instead of actual query for this example
  const filteredHistory = mockWorkHistory.filter(entry => {
    let matchesDateRange = true;
    let matchesProjectType = true;
    
    if (dateRange.from) {
      matchesDateRange = entry.startDate >= dateRange.from;
    }
    
    if (dateRange.to && matchesDateRange) {
      matchesDateRange = entry.endDate <= dateRange.to;
    }
    
    if (projectTypeFilter) {
      matchesProjectType = entry.projectType === projectTypeFilter;
    }
    
    return matchesDateRange && matchesProjectType;
  });

  const totalPages = Math.ceil(filteredHistory.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedHistory = filteredHistory.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const projectTypes = Array.from(new Set(mockWorkHistory.map(entry => entry.projectType)));

  const handleDownloadHistory = () => {
    // In a real implementation, this would generate a CSV or PDF file
    console.log('Downloading work history...');
    alert('Work history download started');
  };

  const handleRowClick = (entry: WorkHistoryEntry) => {
    setSelectedEntry(entry);
  };

  const closeDetailView = () => {
    setSelectedEntry(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <Briefcase className="w-6 h-6 mr-2" /> Work History
          </DialogTitle>
          <DialogClose className="absolute right-4 top-4" />
        </DialogHeader>
        
        {selectedEntry ? (
          <div className="flex-1 overflow-y-auto p-4">
            <Button onClick={closeDetailView} variant="outline" className="mb-4">
              <X className="w-4 h-4 mr-2" /> Close Details
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">{selectedEntry.projectTitle}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Briefcase className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>{selectedEntry.projectType}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>
                        {format(selectedEntry.startDate, 'MMM dd, yyyy')} - {format(selectedEntry.endDate, 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>{selectedEntry.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-2">Financial Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Daily Wage:</span>
                      <span className="font-medium">₹{selectedEntry.dailyWage}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Earned:</span>
                      <span className="font-medium">₹{selectedEntry.totalIncome}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedEntry.status)}`}>
                        {formatStatusText(selectedEntry.status)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-2">Client Information</h3>
                  <p className="text-sm">
                    This project was managed by <span className="font-medium">{selectedEntry.clientName}</span>.
                    The work involved {selectedEntry.projectType.toLowerCase()} activities and was conducted at {selectedEntry.location}.
                  </p>
                  <div className="mt-4">
                    <h4 className="text-md font-medium mb-2">Detailed Tasks:</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Initial field assessment and preparation</li>
                      <li>Equipment management and maintenance</li>
                      <li>Quality control and yield optimization</li>
                      <li>Final harvest and collection management</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between mb-4 gap-2">
              <div className="flex flex-wrap gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Date Range
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="range"
                      selected={{
                        from: dateRange.from,
                        to: dateRange.to
                      }}
                      onSelect={range => setDateRange({ from: range?.from, to: range?.to })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Project Type
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="space-y-2">
                      <Button 
                        variant={projectTypeFilter === null ? "default" : "outline"} 
                        size="sm" 
                        className="w-full"
                        onClick={() => setProjectTypeFilter(null)}
                      >
                        All Types
                      </Button>
                      {projectTypes.map(type => (
                        <Button
                          key={type}
                          variant={projectTypeFilter === type ? "default" : "outline"}
                          size="sm"
                          className="w-full"
                          onClick={() => setProjectTypeFilter(type)}
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                
                {(dateRange.from || projectTypeFilter) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setDateRange({ from: undefined, to: undefined });
                      setProjectTypeFilter(null);
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>

              <Button size="sm" onClick={handleDownloadHistory}>
                <Download className="w-4 h-4 mr-2" /> Download History
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Briefcase className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium">No work history available</h3>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    {dateRange.from || projectTypeFilter 
                      ? "No records match your current filters. Try adjusting your search criteria."
                      : "You don't have any work history recorded yet. When you complete jobs, they will appear here."}
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Wage</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedHistory.map(entry => (
                      <TableRow 
                        key={entry.id} 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleRowClick(entry)}
                      >
                        <TableCell className="font-medium">{entry.projectTitle}</TableCell>
                        <TableCell>{entry.projectType}</TableCell>
                        <TableCell>
                          {format(entry.startDate, 'MMM d')} - {format(entry.endDate, 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>₹{entry.dailyWage}/day</TableCell>
                        <TableCell>₹{entry.totalIncome}</TableCell>
                        <TableCell>{entry.clientName}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(entry.status)}`}>
                            {formatStatusText(entry.status)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
            
            {filteredHistory.length > 0 && (
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WorkHistoryModal;
