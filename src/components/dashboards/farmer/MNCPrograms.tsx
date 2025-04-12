
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Calendar, Building, ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProgramDetailsModal from './ProgramDetailsModal';
import { supabase } from '@/integrations/supabase/client';

interface Program {
  id: string;
  title: string;
  company: string;
  description: string;
  type: string;
  tags: string[];
  duration: string;
}

const MNCPrograms = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [programType, setProgramType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expressedInterests, setExpressedInterests] = useState<string[]>([]);

  useEffect(() => {
    fetchPrograms();
    fetchExpressedInterests();
  }, []);

  useEffect(() => {
    filterPrograms();
  }, [searchQuery, programType, programs]);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      // In a real app, this would fetch from Supabase
      // const { data, error } = await supabase
      //   .from('mnc_programs')
      //   .select('*');
      
      // if (error) throw error;
      // setPrograms(data || []);

      // Mock data for demonstration
      setTimeout(() => {
        setPrograms([
          {
            id: '1',
            title: 'Sustainable Cotton Farming Program',
            company: 'Global Textiles Inc.',
            description: 'Join our sustainable cotton farming initiative with guaranteed purchase agreements.',
            type: 'Field Collaboration',
            tags: ['Cotton', 'Sustainable', 'Training Provided'],
            duration: 'Long-term',
          },
          {
            id: '2',
            title: 'Organic Rice Cultivation Program',
            company: 'FoodCorp International',
            description: 'Premium pricing for certified organic rice with export opportunities.',
            type: 'Skill Training',
            tags: ['Rice', 'Organic', 'Certification'],
            duration: 'Long-term',
          },
          {
            id: '3',
            title: 'Agricultural Tech Implementation',
            company: 'AgriTech Solutions',
            description: 'Learn and implement modern farming technologies with equipment provided.',
            type: 'Technology Training',
            tags: ['Technology', 'Equipment', 'Modern Farming'],
            duration: 'Short-term',
          },
          {
            id: '4',
            title: 'Sustainable Irrigation Methods',
            company: 'WaterWise Global',
            description: 'Training on water-efficient irrigation techniques with subsidized equipment.',
            type: 'Skill Training',
            tags: ['Irrigation', 'Water Conservation', 'Subsidies'],
            duration: 'Medium-term',
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching programs:', error);
      toast({
        title: "Error",
        description: "Failed to load MNC programs. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const fetchExpressedInterests = async () => {
    try {
      // In a real app, this would fetch from Supabase
      // Assuming the user is authenticated and we have their ID
      // const user = supabase.auth.user();
      // if (!user) return;
      
      // const { data, error } = await supabase
      //   .from('farmer_interests')
      //   .select('program_id')
      //   .eq('farmer_id', user.id);
      
      // if (error) throw error;
      // setExpressedInterests(data ? data.map(item => item.program_id) : []);

      // Mock data for demonstration
      setExpressedInterests(['3']);
    } catch (error) {
      console.error('Error fetching expressed interests:', error);
    }
  };

  const filterPrograms = () => {
    let filtered = [...programs];
    
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        program => 
          program.title.toLowerCase().includes(query) || 
          program.company.toLowerCase().includes(query) ||
          program.description.toLowerCase().includes(query)
      );
    }
    
    if (programType !== 'all') {
      filtered = filtered.filter(program => program.type === programType);
    }
    
    setFilteredPrograms(filtered);
  };

  const handleViewDetails = (programId: string) => {
    setSelectedProgramId(programId);
    setIsModalOpen(true);
  };

  const handleExpressInterest = async (programId: string): Promise<boolean> => {
    try {
      // In a real app, this would save to Supabase
      // Assuming the user is authenticated and we have their ID
      // const user = supabase.auth.user();
      // if (!user) {
      //   toast({
      //     title: "Authentication Required",
      //     description: "Please log in to express interest in programs.",
      //     variant: "destructive"
      //   });
      //   return false;
      // }
      
      // const { error } = await supabase
      //   .from('farmer_interests')
      //   .insert({
      //     farmer_id: user.id,
      //     program_id: programId,
      //     expressed_at: new Date().toISOString()
      //   });
      
      // if (error) throw error;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state to reflect the interest
      setExpressedInterests(prev => [...prev, programId]);
      
      return true;
    } catch (error) {
      console.error('Error expressing interest:', error);
      return false;
    }
  };

  const isInterestExpressed = (programId: string) => {
    return expressedInterests.includes(programId);
  };

  const getProgramTypeOptions = () => {
    const types = programs.map(program => program.type);
    const uniqueTypes = ['all', ...Array.from(new Set(types))];
    
    return uniqueTypes.map(type => (
      <SelectItem key={type} value={type}>
        {type === 'all' ? 'All Types' : type}
      </SelectItem>
    ));
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">MNC Partnership Programs</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters {showFilters ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
        </Button>
      </div>
      
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 bg-gray-50 p-4 rounded-md">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search programs..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>
          <Select value={programType} onValueChange={setProgramType}>
            <SelectTrigger>
              <SelectValue placeholder="Program Type" />
            </SelectTrigger>
            <SelectContent>
              {getProgramTypeOptions()}
            </SelectContent>
          </Select>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 rounded-md w-[250px]"></div>
            <div className="h-40 bg-gray-200 rounded-md w-full"></div>
            <div className="h-40 bg-gray-200 rounded-md w-full"></div>
          </div>
        </div>
      ) : filteredPrograms.length > 0 ? (
        <div className="space-y-4">
          {filteredPrograms.map((program) => (
            <Card key={program.id} className="mb-4">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{program.title}</CardTitle>
                    <CardDescription className="flex items-center">
                      <Building className="h-4 w-4 mr-1" /> {program.company}
                    </CardDescription>
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
                    {program.duration}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 mb-4">
                  <p>{program.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {program.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 px-2 py-1 rounded-md text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleViewDetails(program.id)}
                  >
                    <Eye className="mr-2 h-4 w-4" /> View Details
                  </Button>
                  <Button 
                    size="sm" 
                    variant={isInterestExpressed(program.id) ? "outline" : "default"} 
                    onClick={() => handleExpressInterest(program.id)}
                    disabled={isInterestExpressed(program.id)}
                    className={isInterestExpressed(program.id) ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                  >
                    {isInterestExpressed(program.id) ? "Interest Expressed" : "Express Interest"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium mb-2">No programs found</h3>
          <p className="text-gray-500 mb-4">
            {searchQuery || programType !== 'all' 
              ? "Try adjusting your filters to see more results" 
              : "There are no MNC programs available at the moment"}
          </p>
          {(searchQuery || programType !== 'all') && (
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setProgramType('all');
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      )}
      
      <ProgramDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        programId={selectedProgramId}
        onExpressInterest={handleExpressInterest}
        hasExpressedInterest={selectedProgramId ? isInterestExpressed(selectedProgramId) : false}
      />
    </div>
  );
};

export default MNCPrograms;
