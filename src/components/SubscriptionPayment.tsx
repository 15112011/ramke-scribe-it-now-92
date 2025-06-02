
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SubscriptionFlow } from '@/components/SubscriptionFlow';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { useNavigate } from 'react-router-dom';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
}

export const SubscriptionPayment: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [showCustomFlow, setShowCustomFlow] = useState(false);
  const [selectedPlanData, setSelectedPlanData] = useState<{
    id: string;
    name: string;
    price: string;
  } | null>(null);
  const { toast } = useToast();
  const { language } = useLanguage();
  const { settings } = useAdmin();
  const navigate = useNavigate();

  const plans: Plan[] = [
    {
      id: 'basic',
      name: language === 'ar' ? settings.packages.basic.name.ar : settings.packages.basic.name.en,
      price: parseInt(settings.packages.basic.price),
      interval: 'month',
      icon: <Zap className="w-6 h-6" />,
      features: settings.packages.basic.features.map(f => language === 'ar' ? f.ar : f.en)
    },
    {
      id: 'professional',
      name: language === 'ar' ? settings.packages.professional.name.ar : settings.packages.professional.name.en,
      price: parseInt(settings.packages.professional.price),
      interval: 'month',
      icon: <Star className="w-6 h-6" />,
      popular: true,
      features: settings.packages.professional.features.map(f => language === 'ar' ? f.ar : f.en)
    },
    {
      id: 'premium',
      name: language === 'ar' ? settings.packages.premium.name.ar : settings.packages.premium.name.en,
      price: parseInt(settings.packages.premium.price),
      interval: 'month',
      icon: <Crown className="w-6 h-6" />,
      features: settings.packages.premium.features.map(f => language === 'ar' ? f.ar : f.en)
    }
  ];

  const handleSubscribe = async (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (!plan) return;

    setSelectedPlanData({
      id: plan.id,
      name: plan.name,
      price: `${plan.price} ${language === 'ar' ? 'جنيه' : 'EGP'}`
    });
    setShowCustomFlow(true);
  };

  // Show custom subscription flow if requested
  if (showCustomFlow && selectedPlanData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowCustomFlow(false);
                setSelectedPlanData(null);
              }}
              className="mb-4"
            >
              ← {language === 'ar' ? 'العودة للباقات' : 'Back to Plans'}
            </Button>
            <h1 className="text-4xl font-bold mb-4">
              {language === 'ar' ? 'أكمل طلبك' : 'Complete Your Order'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ar' 
                ? `تقديم طلب للحصول على باقة ${selectedPlanData.name}` 
                : `Apply for ${selectedPlanData.name} package`
              }
            </p>
          </div>
          <SubscriptionFlow 
            selectedPlan={selectedPlanData.id}
            planName={selectedPlanData.name}
            planPrice={selectedPlanData.price}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {language === 'ar' ? 'اختر باقتك' : 'Choose Your Plan'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'ar' 
            ? 'اختر الباقة التي تناسب أهدافك' 
            : 'Choose the package that fits your goals'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${
              plan.popular 
                ? 'border-2 border-blue-500 shadow-lg scale-105' 
                : 'border border-gray-200 dark:border-gray-700'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white px-3 py-1">
                  {language === 'ar' ? 'الأكثر شعبية' : 'Most Popular'}
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-2">
                <div className={`p-3 rounded-full ${
                  plan.popular 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {plan.icon}
                </div>
              </div>
              <CardTitle className="text-xl font-bold">
                {plan.name}
              </CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">
                  {plan.price} {language === 'ar' ? 'جنيه' : 'EGP'}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  /{language === 'ar' ? 'شهر' : 'month'}
                </span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Button
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading === plan.id}
                className={`w-full ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-800 hover:bg-gray-900'
                }`}
              >
                {loading === plan.id 
                  ? (language === 'ar' ? 'جاري التحميل...' : 'Loading...') 
                  : (language === 'ar' ? 'اختر هذه الباقة' : 'Choose Package')
                }
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center space-y-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {language === 'ar' 
            ? 'جميع الباقات تشمل ضمان الجودة والمتابعة الكاملة' 
            : 'All packages include quality guarantee and full follow-up'
          }
        </p>
        
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            onClick={() => navigate('/members')}
            className="bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700"
          >
            <LogIn className="w-4 h-4 mr-2" />
            {language === 'ar' ? 'هل أنت مشترك بالفعل؟' : 'Are you subscribed already?'}
          </Button>
        </div>
      </div>
    </div>
  );
};
