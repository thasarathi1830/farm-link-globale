
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart4 } from 'lucide-react';
import EditSkillsModal from './EditSkillsModal';

type Skill = {
  name: string;
  level: 'Basic' | 'Intermediate' | 'Expert';
  value: number;
};

const SkillsExperience = () => {
  // Initial skills data - this would ideally come from your backend
  const [skills, setSkills] = useState<Skill[]>([
    { name: 'Rice Cultivation', level: 'Expert', value: 90 },
    { name: 'Vegetable Farming', level: 'Intermediate', value: 65 },
    { name: 'Irrigation Systems', level: 'Basic', value: 40 },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleUpdateSkills = (updatedSkills: Skill[]) => {
    setSkills(updatedSkills);
    // Here you would also update the backend with the new skills
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart4 className="h-5 w-5" /> Skills & Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="mb-1 text-sm font-medium flex justify-between">
                  <span>{skill.name}</span>
                  <span>{skill.level}</span>
                </div>
                <Progress value={skill.value} className="h-2" />
              </div>
            ))}
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full mt-2"
              onClick={() => setIsEditModalOpen(true)}
            >
              Update Skills
            </Button>
          </div>
        </CardContent>
      </Card>

      <EditSkillsModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        skills={skills}
        onSave={handleUpdateSkills}
      />
    </>
  );
};

export default SkillsExperience;
