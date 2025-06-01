
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/components/AnimatedSection';

export const Gallery: React.FC = () => {
  const { language } = useLanguage();

  const images = [
    '/lovable-uploads/4fec875e-9e74-4a4f-aedd-29de4c064bc1.png',
    '/lovable-uploads/78c7f92d-29b1-4699-9511-9e5848c5892e.png',
    '/lovable-uploads/8fb7f786-bdcb-4dac-a303-8405af22960b.png',
    '/lovable-uploads/114a82f4-a26e-4679-88b7-b5840aad6fe8.png',
    '/lovable-uploads/1ceb2b84-4db5-4e10-8be0-bf7e46cb4a37.png',
    '/lovable-uploads/37b67d4e-4f06-4346-b807-2caeee7427eb.png'
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              {language === 'ar' ? 'معرض الصور' : 'Training Gallery'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {language === 'ar' ? 'لحظات من التدريب والإنجازات' : 'Moments from training and achievements'}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <AnimatedSection key={index} animation="scale" delay={index * 100}>
              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <img 
                    src={image} 
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
