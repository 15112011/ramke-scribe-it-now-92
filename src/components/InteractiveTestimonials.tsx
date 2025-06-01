
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Users, ChevronLeft, ChevronRight, Quote, Trophy } from 'lucide-react';
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
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials: Testimonial[] = language === 'ar' ? settings.testimonials : [
    {
      name: "Ahmed Hassan",
      content: "Omar transformed my life completely! I lost 25kg in 4 months and gained incredible strength. His personalized approach and constant support made all the difference. Highly recommend!",
      rating: 5,
      image: "/lovable-uploads/4fec875e-9e74-4a4f-aedd-29de4c064bc1.png",
      achievement: "Lost 25kg in 4 months"
    },
    {
      name: "Sarah Mohamed",
      content: "Best investment I ever made! Omar's nutrition and training plans are amazing. I've never felt stronger or more confident. The results speak for themselves!",
      rating: 5,
      image: "/lovable-uploads/78c7f92d-29b1-4699-9511-9e5848c5892e.png",
      achievement: "Gained 8kg muscle mass"
    },
    {
      name: "Mahmoud Ali",
      content: "Professional, knowledgeable, and genuinely cares about his clients. Omar helped me prepare for my fitness competition and I won first place! Thank you!",
      rating: 5,
      image: "/lovable-uploads/8fb7f786-bdcb-4dac-a303-8405af22960b.png",
      achievement: "Won fitness competition"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTest = testimonials[currentTestimonial];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">
              {language === 'ar' ? settings.content.testimonialsTitle : 'Success Stories That Inspire'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {language === 'ar' ? 'قصص نجاح حقيقية من عملائنا المتميزين' : 'Real transformation stories from our amazing clients who achieved their dreams'}
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="scale" delay={200}>
            <Card className="bg-white dark:bg-gray-900 shadow-2xl border-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10"></div>
                  
                  <div className="relative p-12">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                      <div className="lg:w-1/3">
                        <div className="relative">
                          <img 
                            src={currentTest.image || "/lovable-uploads/4fec875e-9e74-4a4f-aedd-29de4c064bc1.png"}
                            alt={currentTest.name}
                            className="w-48 h-48 object-cover rounded-full mx-auto shadow-2xl"
                          />
                          <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white p-3 rounded-full shadow-xl">
                            <Trophy className="w-6 h-6" />
                          </div>
                        </div>
                      </div>

                      <div className="lg:w-2/3 text-center lg:text-left">
                        <Quote className="w-12 h-12 text-emerald-500 mb-6 mx-auto lg:mx-0" />
                        
                        <blockquote className="text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
                          "{currentTest.content}"
                        </blockquote>

                        <div className="flex items-center justify-center lg:justify-start mb-4">
                          {Array.from({ length: currentTest.rating }, (_, star) => (
                            <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
                          ))}
                        </div>

                        <div className="mb-4">
                          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                            {currentTest.name}
                          </h3>
                          {currentTest.achievement && (
                            <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
                              {currentTest.achievement}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 gap-4">
            <Button
              onClick={prevTestimonial}
              variant="outline"
              size="lg"
              className="rounded-full w-14 h-14 p-0 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-emerald-500 w-8' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-emerald-300'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextTestimonial}
              variant="outline"
              size="lg"
              className="rounded-full w-14 h-14 p-0 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {testimonials.map((testimonial, i) => (
            <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
              <Card className="bg-white dark:bg-gray-800 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                    onClick={() => setCurrentTestimonial(i)}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</div>
                      <div className="flex text-yellow-400">
                        {Array.from({ length: testimonial.rating }, (_, star) => (
                          <Star key={star} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                    {testimonial.content}
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
