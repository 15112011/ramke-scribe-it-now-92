
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useNavigate } from 'react-router-dom';

export const Packages: React.FC = () => {
  const { language } = useLanguage();
  const { settings } = useAdmin();
  const navigate = useNavigate();

  const packages = [
    {
      id: 'basic',
      name: language === 'ar' ? settings.packages.basic.name.ar : settings.packages.basic.name.en,
      price: settings.packages.basic.price,
      features: settings.packages.basic.features.map(f => language === 'ar' ? f.ar : f.en),
      popular: false
    },
    {
      id: 'professional',
      name: language === 'ar' ? settings.packages.professional.name.ar : settings.packages.professional.name.en,
      price: settings.packages.professional.price,
      features: settings.packages.professional.features.map(f => language === 'ar' ? f.ar : f.en),
      popular: true
    },
    {
      id: 'premium',
      name: language === 'ar' ? settings.packages.premium.name.ar : settings.packages.premium.name.en,
      price: settings.packages.premium.price,
      features: settings.packages.premium.features.map(f => language === 'ar' ? f.ar : f.en),
      popular: false
    }
  ];

  const handlePackageSelect = (packageId: string) => {
    navigate('/subscription', { state: { selectedPackage: packageId } });
  };

  return (
    <section id="packages" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              {language === 'ar' ? settings.content.packagesTitle.ar : settings.content.packagesTitle.en}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {language === 'ar' ? 'اختر الباقة المناسبة لأهدافك' : 'Choose the package that fits your goals'}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
              <Card className={`relative ${pkg.popular ? 'ring-2 ring-green-500 scale-105' : ''} hover:shadow-xl transition-all duration-300 cursor-pointer`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      {language === 'ar' ? settings.packageLabels.mostPopular.ar : settings.packageLabels.mostPopular.en}
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                    {pkg.name}
                  </CardTitle>
                  <div className="text-3xl font-bold text-green-500 mt-4">
                    {pkg.price} {language === 'ar' ? 'جنيه' : 'EGP'}
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
                    onClick={() => handlePackageSelect(pkg.id)}
                    className={`w-full ${pkg.popular ? 'bg-green-500 hover:bg-green-600' : ''}`}
                    variant={pkg.popular ? 'default' : 'outline'}
                  >
                    {language === 'ar' ? settings.buttons.choosePackage.ar : settings.buttons.choosePackage.en}
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
