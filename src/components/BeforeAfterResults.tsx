
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Calendar, Award, Eye } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/components/AnimatedSection';
import { PersonDetailModal } from '@/components/PersonDetailModal';

interface BeforeAfterResult {
  id: number;
  name: string;
  beforeImage: string;
  afterImage: string;
  duration: string;
  achievement: string;
  story: string;
  rating: number;
  age: number;
  profession: string;
  goals: string[];
  challenges: string[];
  coachingPoints: string[];
  startWeight: string;
  endWeight: string;
  lifestyle: string;
  motivation: string;
}

export const BeforeAfterResults: React.FC = () => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPerson, setSelectedPerson] = useState<BeforeAfterResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const results: BeforeAfterResult[] = [
    {
      id: 1,
      name: "Ahmed Hassan",
      beforeImage: "/lovable-uploads/4fec875e-9e74-4a4f-aedd-29de4c064bc1.png",
      afterImage: "/lovable-uploads/78c7f92d-29b1-4699-9511-9e5848c5892e.png",
      duration: "4 months",
      achievement: "Lost 25kg",
      story: "Started at 95kg with no exercise experience. Through consistent training and proper nutrition, achieved my dream physique.",
      rating: 5,
      age: 28,
      profession: "Software Engineer",
      goals: [
        "Lose excess weight and improve overall health",
        "Build lean muscle mass and strength",
        "Develop sustainable healthy habits",
        "Boost confidence and self-esteem"
      ],
      challenges: [
        "Sedentary lifestyle due to office work",
        "Poor eating habits and late-night snacking",
        "Lack of exercise experience",
        "Low energy and motivation"
      ],
      coachingPoints: [
        "Created a personalized workout routine that fit his busy schedule",
        "Developed a flexible nutrition plan that didn't feel restrictive",
        "Provided constant motivation and accountability through weekly check-ins",
        "Taught proper form and progressive overload principles",
        "Helped establish sustainable lifestyle changes rather than quick fixes"
      ],
      startWeight: "95kg",
      endWeight: "70kg",
      lifestyle: "Sedentary office worker",
      motivation: "I wanted to feel confident in my own skin again and set a good example for my children."
    },
    {
      id: 2,
      name: "Sarah Mohamed",
      beforeImage: "/lovable-uploads/8fb7f786-bdcb-4dac-a303-8405af22960b.png",
      afterImage: "/lovable-uploads/4fec875e-9e74-4a4f-aedd-29de4c064bc1.png",
      duration: "6 months",
      achievement: "Gained 8kg muscle",
      story: "Wanted to build strength and confidence. The transformation exceeded my expectations.",
      rating: 5,
      age: 24,
      profession: "Medical Student",
      goals: [
        "Build lean muscle mass and strength",
        "Improve athletic performance",
        "Enhance body composition",
        "Develop discipline and mental toughness"
      ],
      challenges: [
        "Irregular schedule due to medical studies",
        "Limited gym experience",
        "Difficulty gaining weight and muscle",
        "High stress levels from academic pressure"
      ],
      coachingPoints: [
        "Designed a strength-focused program that maximized her limited gym time",
        "Created a high-protein nutrition plan to support muscle growth",
        "Provided stress management techniques to balance studies and training",
        "Taught progressive overload and proper recovery protocols",
        "Offered flexible scheduling options during exam periods"
      ],
      startWeight: "52kg",
      endWeight: "60kg",
      lifestyle: "Student with irregular schedule",
      motivation: "I wanted to prove to myself that I could be strong both mentally and physically."
    },
    {
      id: 3,
      name: "Mahmoud Ali",
      beforeImage: "/lovable-uploads/78c7f92d-29b1-4699-9511-9e5848c5892e.png",
      afterImage: "/lovable-uploads/8fb7f786-bdcb-4dac-a303-8405af22960b.png",
      duration: "8 months",
      achievement: "Competition Ready",
      story: "Prepared for my first fitness competition and won first place! Omar's expertise is unmatched.",
      rating: 5,
      age: 32,
      profession: "Business Owner",
      goals: [
        "Prepare for first fitness competition",
        "Achieve competition-level conditioning",
        "Learn advanced training techniques",
        "Master nutrition timing and supplementation"
      ],
      challenges: [
        "No previous competition experience",
        "Managing business while training intensively",
        "Learning complex nutrition protocols",
        "Dealing with pre-competition anxiety"
      ],
      coachingPoints: [
        "Developed a periodized training program specific to competition prep",
        "Created detailed nutrition and supplementation protocols",
        "Provided posing coaching and stage presentation tips",
        "Offered mental preparation and confidence-building strategies",
        "Guided through the entire competition process from start to finish"
      ],
      startWeight: "85kg",
      endWeight: "78kg (stage weight)",
      lifestyle: "Busy entrepreneur",
      motivation: "I wanted to challenge myself to achieve something I never thought was possible."
    }
  ];

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

  const handlePersonClick = (person: BeforeAfterResult) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
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

          {/* Featured Result Slider */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-3xl">
              <div className="flex transition-transform duration-500 ease-in-out" style={{
                transform: `translateX(-${currentIndex * 100}%)`
              }}>
                {results.map(result => (
                  <div key={`featured-${result.id}`} className="w-full flex-shrink-0">
                    <Card className="bg-white dark:bg-gray-800 shadow-2xl border-0 mx-4 cursor-pointer hover:shadow-3xl transition-all duration-300 group"
                          onClick={() => handlePersonClick(result)}>
                      <CardContent className="p-8">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center relative">
                              <h4 className="text-lg font-bold text-gray-600 dark:text-gray-300 mb-2">
                                {language === 'ar' ? 'قبل' : 'Before'}
                              </h4>
                              <div className="relative overflow-hidden rounded-xl">
                                <img src={result.beforeImage} alt={`${result.name} before`} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                  <Eye className="w-8 h-8 text-white" />
                                </div>
                              </div>
                            </div>
                            <div className="text-center relative">
                              <h4 className="text-lg font-bold text-emerald-600 mb-2">
                                {language === 'ar' ? 'بعد' : 'After'}
                              </h4>
                              <div className="relative overflow-hidden rounded-xl">
                                <img src={result.afterImage} alt={`${result.name} after`} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                  <Eye className="w-8 h-8 text-white" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                              {result.name}
                            </h3>
                            <div className="flex items-center justify-center md:justify-start mb-4">
                              {Array.from({ length: result.rating }, (_, i) => (
                                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              {result.story}
                            </p>
                            <div className="space-y-2 mb-4">
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
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePersonClick(result);
                              }}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Full Story
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
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
            {results.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrentIndex(index)} 
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-emerald-500 w-8' : 'bg-gray-300 dark:bg-gray-600 hover:bg-emerald-300'
                }`} 
              />
            ))}
          </div>
        </div>
      </section>

      <PersonDetailModal 
        person={selectedPerson}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
