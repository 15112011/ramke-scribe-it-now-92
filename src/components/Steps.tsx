
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, Target, Dumbbell, Trophy } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/components/AnimatedSection';

export const Steps: React.FC = () => {
  const { language } = useLanguage();

  const steps = [
    {
      icon: UserPlus,
      title: language === 'ar' ? 'التسجيل والتقييم' : 'Registration & Assessment',
      description: language === 'ar' 
        ? 'نبدأ بتقييم شامل لحالتك البدنية وأهدافك'
        : 'We start with a comprehensive assessment of your fitness and goals'
    },
    {
      icon: Target,
      title: language === 'ar' ? 'وضع الخطة' : 'Plan Creation',
      description: language === 'ar'
        ? 'نضع خطة تدريبية وغذائية مخصصة لك'
        : 'We create a personalized training and nutrition plan for you'
    },
    {
      icon: Dumbbell,
      title: language === 'ar' ? 'بداية التدريب' : 'Start Training',
      description: language === 'ar'
        ? 'نبدأ رحلة التحول مع متابعة مستمرة'
        : 'We begin the transformation journey with continuous support'
    },
    {
      icon: Trophy,
      title: language === 'ar' ? 'تحقيق الأهداف' : 'Achieve Goals',
      description: language === 'ar'
        ? 'نحتفل معاً بتحقيق أهدافك وتحول جسمك'
        : 'We celebrate together achieving your goals and body transformation'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              {language === 'ar' ? 'خطوات التحول' : 'Transformation Steps'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {language === 'ar' ? 'رحلتك نحو جسم أفضل في 4 خطوات بسيطة' : 'Your journey to a better body in 4 simple steps'}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
              <Card className="text-center hover:shadow-xl transition-shadow duration-300 relative">
                <CardContent className="p-8">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  
                  <step.icon className="w-16 h-16 text-green-500 mx-auto mb-4 mt-4" />
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
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
