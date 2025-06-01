
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Calendar, Trophy, Activity } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const ProgressTracker: React.FC = () => {
  const { language } = useLanguage();
  const [progress, setProgress] = useState({
    strength: 0,
    endurance: 0,
    flexibility: 0,
    nutrition: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress({
        strength: 85,
        endurance: 92,
        flexibility: 78,
        nutrition: 88
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const metrics = [
    {
      icon: Target,
      label: language === 'ar' ? 'القوة العضلية' : 'Strength',
      value: progress.strength,
      color: 'bg-red-500'
    },
    {
      icon: Activity,
      label: language === 'ar' ? 'القدرة على التحمل' : 'Endurance',
      value: progress.endurance,
      color: 'bg-blue-500'
    },
    {
      icon: Calendar,
      label: language === 'ar' ? 'المرونة' : 'Flexibility',
      value: progress.flexibility,
      color: 'bg-purple-500'
    },
    {
      icon: Trophy,
      label: language === 'ar' ? 'التغذية' : 'Nutrition',
      value: progress.nutrition,
      color: 'bg-green-500'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {language === 'ar' ? 'تتبع التقدم في الوقت الفعلي' : 'Real-Time Progress Tracking'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {language === 'ar' ? 'راقب تطورك في جميع جوانب اللياقة البدنية' : 'Monitor your development across all fitness dimensions'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${metric.color} bg-opacity-20 mr-4`}>
                    <metric.icon className={`w-6 h-6 ${metric.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">{metric.label}</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}%</p>
                  </div>
                </div>
                <Progress value={metric.value} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
