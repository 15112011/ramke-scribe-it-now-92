
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/components/AnimatedSection';

export const Hero: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-20">
        <AnimatedSection animation="fade-up">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-white mb-6">
              {language === 'ar' ? 'حول جسمك، غير حياتك' : 'Transform Your Body, Change Your Life'}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              {language === 'ar' 
                ? 'مدرب شخصي معتمد مع أكثر من 8 سنوات خبرة في تحويل الأجسام والحياة'
                : 'Certified Personal Trainer with 8+ years of experience transforming bodies and lives'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg">
                {language === 'ar' ? 'ابدأ رحلتك' : 'Start Your Journey'}
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                {language === 'ar' ? 'شاهد النتائج' : 'View Results'}
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
