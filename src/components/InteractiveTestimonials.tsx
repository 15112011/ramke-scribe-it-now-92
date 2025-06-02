
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/components/AnimatedSection';

export const InteractiveTestimonials: React.FC = () => {
  const { settings } = useAdmin();
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = settings.testimonials;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextTestimonial();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  const nextTestimonial = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const prevTestimonial = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const goToTestimonial = (index: number) => {
    if (index !== currentIndex) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsAnimating(false);
      }, 300);
    }
  };

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              {language === 'ar' ? settings.content.testimonialsTitle.ar : settings.content.testimonialsTitle.en}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {language === 'ar' ? 'تجارب حقيقية من عملائنا' : 'Real experiences from our clients'}
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main testimonial card */}
            <AnimatedSection animation="fade-up" delay={200}>
              <Card className={`bg-white dark:bg-gray-800 shadow-2xl border-0 transition-all duration-300 ${
                isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
              }`}>
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col items-center text-center">
                    {/* Quote icon */}
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
                      <Quote className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    </div>

                    {/* Rating stars */}
                    <div className="flex items-center mb-6">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Testimonial text */}
                    <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 italic">
                      "{language === 'ar' ? currentTestimonial.content.ar : currentTestimonial.content.en}"
                    </blockquote>

                    {/* Client info */}
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-lg">
                          {currentTestimonial.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">
                          {currentTestimonial.name}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {language === 'ar' ? 'عميل سابق' : 'Former Client'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Navigation arrows */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isAnimating}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isAnimating}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-emerald-500 scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                disabled={isAnimating}
              />
            ))}
          </div>
        </div>

        {/* All testimonials preview */}
        <AnimatedSection animation="fade-up" delay={400}>
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  index === currentIndex 
                    ? 'ring-2 ring-emerald-500 shadow-lg' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => goToTestimonial(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold">
                        {testimonial.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                    {language === 'ar' ? testimonial.content.ar : testimonial.content.en}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
