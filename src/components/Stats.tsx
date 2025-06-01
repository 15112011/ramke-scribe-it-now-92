
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Award, Calendar, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/components/AnimatedSection';

export const Stats: React.FC = () => {
  const { language } = useLanguage();

  const stats = [
    {
      icon: Users,
      number: '500+',
      label: language === 'ar' ? 'عميل راضي' : 'Happy Clients'
    },
    {
      icon: Award,
      number: '8+',
      label: language === 'ar' ? 'سنوات خبرة' : 'Years Experience'
    },
    {
      icon: Calendar,
      number: '2000+',
      label: language === 'ar' ? 'جلسة تدريب' : 'Training Sessions'
    },
    {
      icon: Target,
      number: '95%',
      label: language === 'ar' ? 'معدل النجاح' : 'Success Rate'
    }
  ];

  return (
    <section className="py-20 bg-green-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
              <Card className="text-center bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <stat.icon className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
