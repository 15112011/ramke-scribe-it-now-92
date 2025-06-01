
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp, Calendar, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { AnimatedSection } from '@/components/AnimatedSection';

export const Results: React.FC = () => {
  const { language } = useLanguage();
  const { settings } = useAdmin();

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              {language === 'ar' ? settings.resultsPage.title.ar : settings.resultsPage.title.en}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {language === 'ar' ? settings.resultsPage.subtitle.ar : settings.resultsPage.subtitle.en}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {settings.resultsPage.cards.map((result, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
              <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white dark:bg-gray-900 border-0 shadow-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src={result.image} 
                    alt={language === 'ar' ? result.title.ar : result.title.en}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <Badge className="bg-emerald-500 text-white mb-2">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {language === 'ar' ? 'نتائج مؤكدة' : 'Proven Results'}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {language === 'ar' ? result.title.ar : result.title.en}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-emerald-500 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {language === 'ar' ? result.description.ar : result.description.en}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="text-lg font-bold text-red-600 dark:text-red-400">
                        {result.stats.before}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {language === 'ar' ? 'قبل' : 'Before'}
                      </div>
                    </div>
                    
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">
                        {result.stats.after}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {language === 'ar' ? 'بعد' : 'After'}
                      </div>
                    </div>
                    
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        {language === 'ar' ? result.stats.duration.ar : result.stats.duration.en}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Target className="w-4 h-4 mr-2" />
                      {language === 'ar' ? 'هدف محقق بنجاح' : 'Goal achieved successfully'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="fade-up" delay={600}>
          <div className="text-center mt-16">
            <div className="inline-flex items-center justify-center p-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl text-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">
                  {language === 'ar' ? 'هل أنت مستعد للتحول؟' : 'Ready for Your Transformation?'}
                </h3>
                <p className="text-emerald-100">
                  {language === 'ar' 
                    ? 'انضم إلى مئات العملاء الذين حققوا أهدافهم معنا' 
                    : 'Join hundreds of clients who achieved their goals with us'
                  }
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
