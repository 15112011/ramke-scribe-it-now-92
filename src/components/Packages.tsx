
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/components/AnimatedSection';

export const Packages: React.FC = () => {
  const { language } = useLanguage();

  const packages = [
    {
      name: language === 'ar' ? 'الباقة الأساسية' : 'Basic Package',
      price: language === 'ar' ? '500 ريال/شهر' : '$150/month',
      features: [
        language === 'ar' ? '3 جلسات في الأسبوع' : '3 sessions per week',
        language === 'ar' ? 'برنامج تدريبي مخصص' : 'Custom workout plan',
        language === 'ar' ? 'إرشادات التغذية الأساسية' : 'Basic nutrition guidance',
        language === 'ar' ? 'دعم عبر الواتساب' : 'WhatsApp support'
      ],
      popular: false
    },
    {
      name: language === 'ar' ? 'الباقة المتقدمة' : 'Premium Package',
      price: language === 'ar' ? '800 ريال/شهر' : '$250/month',
      features: [
        language === 'ar' ? '5 جلسات في الأسبوع' : '5 sessions per week',
        language === 'ar' ? 'برنامج تدريبي وتغذوي مفصل' : 'Detailed workout & nutrition plan',
        language === 'ar' ? 'متابعة يومية' : 'Daily follow-up',
        language === 'ar' ? 'تحليل تركيب الجسم' : 'Body composition analysis',
        language === 'ar' ? 'خطة المكملات الغذائية' : 'Supplement plan'
      ],
      popular: true
    },
    {
      name: language === 'ar' ? 'باقة التحول الكامل' : 'Transformation Package',
      price: language === 'ar' ? '1200 ريال/شهر' : '$350/month',
      features: [
        language === 'ar' ? 'تدريب يومي' : 'Daily training',
        language === 'ar' ? 'خطة تغذية شاملة' : 'Comprehensive nutrition plan',
        language === 'ar' ? 'متابعة 24/7' : '24/7 support',
        language === 'ar' ? 'جلسات تحفيزية' : 'Motivational sessions',
        language === 'ar' ? 'ضمان النتائج' : 'Results guarantee'
      ],
      popular: false
    }
  ];

  return (
    <section id="packages" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              {language === 'ar' ? 'باقات التدريب' : 'Training Packages'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {language === 'ar' ? 'اختر الباقة المناسبة لأهدافك' : 'Choose the package that fits your goals'}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
              <Card className={`relative ${pkg.popular ? 'ring-2 ring-green-500 scale-105' : ''} hover:shadow-xl transition-all duration-300`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      {language === 'ar' ? 'الأكثر شعبية' : 'Most Popular'}
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                    {pkg.name}
                  </CardTitle>
                  <div className="text-3xl font-bold text-green-500 mt-4">
                    {pkg.price}
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${pkg.popular ? 'bg-green-500 hover:bg-green-600' : ''}`}
                    variant={pkg.popular ? 'default' : 'outline'}
                  >
                    {language === 'ar' ? 'اختر هذه الباقة' : 'Choose This Package'}
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
