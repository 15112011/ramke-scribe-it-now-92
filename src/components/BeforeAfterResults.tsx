import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Calendar, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/components/AnimatedSection';
interface BeforeAfterResult {
  id: number;
  name: string;
  beforeImage: string;
  afterImage: string;
  duration: string;
  achievement: string;
  story: string;
  rating: number;
}
export const BeforeAfterResults: React.FC = () => {
  const {
    language
  } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const results: BeforeAfterResult[] = [{
    id: 1,
    name: "Ahmed Hassan",
    beforeImage: "/lovable-uploads/4fec875e-9e74-4a4f-aedd-29de4c064bc1.png",
    afterImage: "/lovable-uploads/78c7f92d-29b1-4699-9511-9e5848c5892e.png",
    duration: "4 months",
    achievement: "Lost 25kg",
    story: "Started at 95kg with no exercise experience. Through consistent training and proper nutrition, achieved my dream physique.",
    rating: 5
  }, {
    id: 2,
    name: "Sarah Mohamed",
    beforeImage: "/lovable-uploads/8fb7f786-bdcb-4dac-a303-8405af22960b.png",
    afterImage: "/lovable-uploads/4fec875e-9e74-4a4f-aedd-29de4c064bc1.png",
    duration: "6 months",
    achievement: "Gained 8kg muscle",
    story: "Wanted to build strength and confidence. The transformation exceeded my expectations.",
    rating: 5
  }, {
    id: 3,
    name: "Mahmoud Ali",
    beforeImage: "/lovable-uploads/78c7f92d-29b1-4699-9511-9e5848c5892e.png",
    afterImage: "/lovable-uploads/8fb7f786-bdcb-4dac-a303-8405af22960b.png",
    duration: "8 months",
    achievement: "Competition Ready",
    story: "Prepared for my first fitness competition and won first place! Omar's expertise is unmatched.",
    rating: 5
  }];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % results.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [results.length]);
  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % results.length);
  };
  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + results.length) % results.length);
  };
  return <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">
              {language === 'ar' ? 'نتائج حقيقية مذهلة' : 'Amazing Real Results'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {language === 'ar' ? 'شاهد التحولات الحقيقية لعملائنا' : 'Witness real transformations from our amazing clients'}
            </p>
          </div>
        </AnimatedSection>

        {/* Results Grid */}
        

        {/* Featured Result Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <div className="flex transition-transform duration-500 ease-in-out" style={{
            transform: `translateX(-${currentIndex * 100}%)`
          }}>
              {results.map(result => <div key={`featured-${result.id}`} className="w-full flex-shrink-0">
                  <Card className="bg-white dark:bg-gray-800 shadow-2xl border-0 mx-4">
                    <CardContent className="p-8">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <h4 className="text-lg font-bold text-gray-600 dark:text-gray-300 mb-2">
                              {language === 'ar' ? 'قبل' : 'Before'}
                            </h4>
                            <img src={result.beforeImage} alt={`${result.name} before`} className="w-full h-48 object-cover rounded-xl" />
                          </div>
                          <div className="text-center">
                            <h4 className="text-lg font-bold text-emerald-600 mb-2">
                              {language === 'ar' ? 'بعد' : 'After'}
                            </h4>
                            <img src={result.afterImage} alt={`${result.name} after`} className="w-full h-48 object-cover rounded-xl" />
                          </div>
                        </div>

                        <div className="text-center md:text-left">
                          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                            {result.name}
                          </h3>
                          <div className="flex items-center justify-center md:justify-start mb-4">
                            {Array.from({
                          length: result.rating
                        }, (_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {result.story}
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center justify-center md:justify-start">
                              <Calendar className="w-5 h-5 text-emerald-500 mr-2" />
                              <span>{result.duration}</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start">
                              <Award className="w-5 h-5 text-emerald-500 mr-2" />
                              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                                {result.achievement}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>)}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button onClick={prevSlide} variant="outline" size="lg" className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full w-12 h-12 p-0 bg-white/90 dark:bg-gray-800/90">
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button onClick={nextSlide} variant="outline" size="lg" className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full w-12 h-12 p-0 bg-white/90 dark:bg-gray-800/90">
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {results.map((_, index) => <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-emerald-500 w-8' : 'bg-gray-300 dark:bg-gray-600 hover:bg-emerald-300'}`} />)}
        </div>
      </div>
    </section>;
};