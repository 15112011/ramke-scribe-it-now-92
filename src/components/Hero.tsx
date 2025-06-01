
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { AnimatedSection } from '@/components/AnimatedSection';

export const Hero: React.FC = () => {
  const { language } = useLanguage();
  const { settings } = useAdmin();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <AnimatedSection animation="fade-up">
            <div className="text-center lg:text-right max-w-2xl mx-auto lg:mx-0">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
                {language === 'ar' ? settings.content.heroTitle : 'Transform Your Body, Change Your Life'}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {language === 'ar' 
                  ? settings.content.heroSubtitle
                  : 'Certified Personal Trainer with 8+ years of experience transforming bodies and lives'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg transform transition-all duration-300 hover:scale-105 shadow-lg">
                  {language === 'ar' ? settings.buttons.startJourney : 'Start Your Journey'}
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2 border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300">
                  {language === 'ar' ? settings.buttons.viewResults : 'View Results'}
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* Coach Image */}
          <AnimatedSection animation="fade-left" delay={200}>
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative group">
                {/* Main coach image with professional styling */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 group-hover:scale-105">
                  <img
                    src={settings.heroImage || "/lovable-uploads/1ceb2b84-4db5-4e10-8be0-bf7e46cb4a37.png"}
                    alt={language === 'ar' ? 'المدرب عمر أشرف' : 'Coach Omar Ashraf'}
                    className="w-full h-[500px] lg:h-[600px] object-cover"
                  />
                  {/* Gradient overlay for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>

                {/* Floating elements for visual appeal */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-emerald-400 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                {/* Achievement badge */}
                <div className="absolute top-6 left-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg transform transition-all duration-300 hover:scale-105">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{settings.stats.experience}+</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                      {language === 'ar' ? 'سنوات خبرة' : 'Years Exp'}
                    </div>
                  </div>
                </div>

                {/* Success rate badge */}
                <div className="absolute bottom-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg transform transition-all duration-300 hover:scale-105">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{settings.stats.successRate}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                      {language === 'ar' ? 'نسبة النجاح' : 'Success Rate'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
