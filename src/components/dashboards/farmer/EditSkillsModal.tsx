
import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Skill = {
  name: string;
  level: 'Basic' | 'Intermediate' | 'Expert';
  value: number;
};

type EditSkillsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  skills: Skill[];
  onSave: (skills: Skill[]) => void;
};

const skillLevelToValue = {
  'Basic': 40,
  'Intermediate': 65,
  'Expert': 90
};

const EditSkillsModal = ({ isOpen, onClose, skills, onSave }: EditSkillsModalProps) => {
  const [editedSkills, setEditedSkills] = useState<Skill[]>(skills);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<'Basic' | 'Intermediate' | 'Expert'>('Basic');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleAddSkill = () => {
    if (!newSkillName.trim()) {
      toast({
        title: "Skill name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    // Check for duplicates
    if (editedSkills.some(skill => skill.name.toLowerCase() === newSkillName.trim().toLowerCase())) {
      toast({
        title: "Skill already exists",
        variant: "destructive"
      });
      return;
    }

    // Add new skill
    setEditedSkills([
      ...editedSkills,
      {
        name: newSkillName.trim(),
        level: newSkillLevel,
        value: skillLevelToValue[newSkillLevel]
      }
    ]);

    // Clear input fields
    setNewSkillName('');
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = [...editedSkills];
    updatedSkills.splice(index, 1);
    setEditedSkills(updatedSkills);
  };

  const handleChangeSkillLevel = (index: number, level: 'Basic' | 'Intermediate' | 'Expert') => {
    const updatedSkills = [...editedSkills];
    updatedSkills[index].level = level;
    updatedSkills[index].value = skillLevelToValue[level];
    setEditedSkills(updatedSkills);
  };

  const handleSaveSkills = async () => {
    setIsSaving(true);
    try {
      // Here you would add the Supabase integration to save to the backend
      // const { error } = await supabase
      //   .from('farmer_profiles')
      //   .update({ skills: editedSkills })
      //   .eq('user_id', userId);
      // 
      // if (error) throw error;
      
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Call the onSave callback with the updated skills
      onSave(editedSkills);

      toast({
        title: "Skills updated successfully",
      });

      onClose();
    } catch (error) {
      console.error('Error saving skills:', error);
      toast({
        title: "Failed to update skills",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Your Skills</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">Add your agricultural skills and expertise below.</p>
            
            {/* Add new skill form */}
            <div className="flex flex-wrap gap-2">
              <Input 
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Enter a skill"
                className="flex-1 min-w-[150px]"
              />
              <Select 
                value={newSkillLevel} 
                onValueChange={(value) => setNewSkillLevel(value as 'Basic' | 'Intermediate' | 'Expert')}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Skill level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
              <Button type="button" onClick={handleAddSkill} className="shrink-0">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>

            {/* Current skills list */}
            <div className="border rounded-md p-3 min-h-[150px]">
              <h3 className="text-sm font-medium mb-2">Current Skills</h3>
              {editedSkills.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">No skills added yet</p>
              ) : (
                <div className="space-y-2">
                  {editedSkills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between text-sm bg-muted p-2 rounded-md">
                      <div className="flex items-center gap-2">
                        <Badge variant={skill.level === 'Expert' ? 'default' : skill.level === 'Intermediate' ? 'secondary' : 'outline'}>
                          {skill.name}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select 
                          value={skill.level} 
                          onValueChange={(value) => handleChangeSkillLevel(index, value as 'Basic' | 'Intermediate' | 'Expert')}
                        >
                          <SelectTrigger className="h-7 w-[110px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Basic">Basic</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Expert">Expert</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleRemoveSkill(index)}
                          className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleSaveSkills}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditSkillsModal;
