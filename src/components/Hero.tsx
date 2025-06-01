
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { AnimatedSection } from '@/components/AnimatedSection';

export const Hero: React.FC = () => {
  const { language } = useLanguage();
  const { settings } = useAdmin();

  const handleStartJourney = () => {
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewResults = () => {
    // Navigate to results page or section
    console.log('Navigate to results');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="absolute inset-0 bg-black/20 z-10"></div>
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${settings.heroImage})` }}
      ></div>

      <div className="relative z-20 container mx-auto px-4 text-center">
        <AnimatedSection animation="fade-up">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {language === 'ar' ? settings.content.heroTitle.ar : settings.content.heroTitle.en}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {language === 'ar' ? settings.content.heroSubtitle.ar : settings.content.heroSubtitle.en}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={handleStartJourney}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {language === 'ar' ? settings.buttons.startJourney.ar : settings.buttons.startJourney.en}
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleViewResults}
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Play className="mr-2 w-5 h-5" />
                {language === 'ar' ? settings.buttons.viewResults.ar : settings.buttons.viewResults.en}
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
