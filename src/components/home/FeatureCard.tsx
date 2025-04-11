
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  iconClass: string;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

const FeatureCard = ({ 
  icon: Icon, 
  iconClass, 
  title, 
  description, 
  buttonText, 
  onClick 
}: FeatureCardProps) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="text-center">
        <div className={`mx-auto p-3 ${iconClass} rounded-full`}>
          <Icon className="w-10 h-10" />
        </div>
        <CardTitle className="mt-4">{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-0 mt-auto">
        <Button 
          className="w-full"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;
