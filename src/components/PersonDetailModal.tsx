
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Award, Target, Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PersonDetail {
  id: number;
  name: string;
  beforeImage: string;
  afterImage: string;
  duration: string;
  achievement: string;
  story: string;
  rating: number;
  age: number;
  profession: string;
  goals: string[];
  challenges: string[];
  coachingPoints: string[];
  startWeight: string;
  endWeight: string;
  lifestyle: string;
  motivation: string;
}

interface PersonDetailModalProps {
  person: PersonDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PersonDetailModal: React.FC<PersonDetailModalProps> = ({
  person,
  isOpen,
  onClose,
}) => {
  if (!person) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">{person.name}'s Transformation Journey</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Before/After Images */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-3 text-center">Before</h3>
                <img 
                  src={person.beforeImage} 
                  alt={`${person.name} before`}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="mt-2 text-center">
                  <Badge variant="outline">{person.startWeight}</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-3 text-center text-emerald-600">After</h3>
                <img 
                  src={person.afterImage} 
                  alt={`${person.name} after`}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="mt-2 text-center">
                  <Badge className="bg-emerald-500">{person.endWeight}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Personal Info */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-500" />
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Age:</strong> {person.age} years old</p>
                  <p><strong>Profession:</strong> {person.profession}</p>
                  <p><strong>Lifestyle:</strong> {person.lifestyle}</p>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-emerald-500" />
                  <span><strong>Duration:</strong> {person.duration}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Goals & Challenges */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-500" />
                  Goals
                </h3>
                <ul className="space-y-2">
                  {person.goals.map((goal, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm">{goal}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-orange-500" />
                  Challenges Overcome
                </h3>
                <ul className="space-y-2">
                  {person.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Transformation Story */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Transformation Story</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {person.story}
              </p>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
                  Motivation
                </h4>
                <p className="text-emerald-700 dark:text-emerald-300 italic">
                  "{person.motivation}"
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Coach's Approach */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">How Omar Helped</h3>
              <div className="space-y-3">
                {person.coachingPoints.map((point, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{point}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievement Badge */}
          <div className="text-center">
            <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-2 text-lg">
              {person.achievement}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
