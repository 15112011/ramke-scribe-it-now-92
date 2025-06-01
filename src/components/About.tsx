
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/components/AnimatedSection';

export const About: React.FC = () => {
  const { language } = useLanguage();

  const achievements = [
    language === 'ar' ? 'مدرب شخصي معتمد' : 'Certified Personal Trainer',
    language === 'ar' ? 'أخصائي تغذية رياضية' : 'Sports Nutrition Specialist',
    language === 'ar' ? 'خبير في تحويل الجسم' : 'Body Transformation Expert',
    language === 'ar' ? 'مدرب القوة والتكييف' : 'Strength & Conditioning Coach'
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection animation="fade-right">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
                {language === 'ar' ? 'عن عمر أشرف' : 'About Omar Ashraf'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {language === 'ar' 
                  ? 'مدرب شخصي معتمد مع شغف حقيقي لمساعدة الناس على تحقيق أهدافهم في اللياقة البدنية. مع أكثر من 8 سنوات من الخبرة، ساعدت المئات من العملاء على تحويل أجسامهم وحياتهم.'
                  : 'A certified personal trainer with a genuine passion for helping people achieve their fitness goals. With over 8 years of experience, I have helped hundreds of clients transform their bodies and lives.'
                }
              </p>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-left">
            <Card className="overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <img 
                  src="/lovable-uploads/4fec875e-9e74-4a4f-aedd-29de4c064bc1.png" 
                  alt="Omar Ashraf"
                  className="w-full h-96 object-cover"
                />
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
