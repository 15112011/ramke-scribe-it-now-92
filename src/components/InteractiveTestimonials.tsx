
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { AnimatedSection } from '@/components/AnimatedSection';

interface Testimonial {
  name: string;
  content: string;
  rating: number;
  image?: string;
  achievement?: string;
}

export const InteractiveTestimonials: React.FC = () => {
  const { language } = useLanguage();
  const { settings } = useAdmin();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Convert multilingual testimonials to current language format
  const testimonials: Testimonial[] = settings.testimonials.map(testimonial => ({
    name: testimonial.name,
    content: language === 'ar' ? testimonial.content.ar : testimonial.content.en,
    rating: testimonial.rating,
    image: "/lovable-uploads/4fec875e-9e74-4a4f-aedd-29de4c064bc1.png",
    achievement: language === 'ar' ? "نتائج مذهلة" : "Amazing Results"
  }));

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              {language === 'ar' ? settings.content.testimonialsTitle.ar : settings.content.testimonialsTitle.en}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {language === 'ar' ? 'اكتشف قصص نجاح عملائنا' : 'Discover our clients\' success stories'}
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade-up" delay={200}>
            <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-800 dark:to-gray-700 border-0 shadow-2xl">
              <div className="absolute top-6 left-6 text-emerald-500 dark:text-emerald-400">
                <Quote className="w-12 h-12 opacity-50" />
              </div>
              
              <CardContent className="p-12">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-1 text-center">
                    <div className="relative mb-6">
                      <Avatar className="w-32 h-32 mx-auto border-4 border-emerald-500 shadow-lg">
                        <AvatarImage src={currentTestimonial.image} alt={currentTestimonial.name} />
                        <AvatarFallback className="text-2xl font-bold bg-emerald-100 text-emerald-700">
                          {currentTestimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {currentTestimonial.achievement}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      {currentTestimonial.name}
                    </h3>
                    
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < currentTestimonial.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
                      "{currentTestimonial.content}"
                    </blockquote>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {testimonials.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              index === currentIndex
                                ? 'bg-emerald-500 scale-125'
                                : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={prevTestimonial}
                          className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={nextTestimonial}
                          className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
