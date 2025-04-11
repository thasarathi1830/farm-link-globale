
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const MNCPrograms = () => {
  return (
    <div className="space-y-4 pt-4">
      <h2 className="text-xl font-semibold mb-4">MNC Partnership Programs</h2>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Sustainable Cotton Farming Program</CardTitle>
              <CardDescription>By Global Textiles Inc.</CardDescription>
            </div>
            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
              Long-term
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 mb-4">
            <p>Join our sustainable cotton farming initiative with guaranteed purchase agreements.</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">Cotton</span>
              <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">Sustainable</span>
              <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">Training Provided</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm">View Details</Button>
            <Button size="sm" variant="outline">Express Interest</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Organic Rice Cultivation Program</CardTitle>
              <CardDescription>By FoodCorp International</CardDescription>
            </div>
            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
              Long-term
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 mb-4">
            <p>Premium pricing for certified organic rice with export opportunities.</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">Rice</span>
              <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">Organic</span>
              <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">Certification</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm">View Details</Button>
            <Button size="sm" variant="outline">Express Interest</Button>
          </div>
        </CardContent>
      </Card>
      
      <Button variant="outline" className="w-full">View All Programs</Button>
    </div>
  );
};

export default MNCPrograms;
