
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, Zap, Gift } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';

export const CountdownTimer: React.FC = () => {
  const { language } = useLanguage();
  const { settings } = useAdmin();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-emerald-500 to-green-500 dark:from-emerald-700 dark:to-green-700">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Gift className="w-8 h-8 text-white mr-3" />
            <h2 className="text-4xl font-bold text-white">
              {language === 'ar' ? 'عرض خاص محدود!' : 'Limited Time Special Offer!'}
            </h2>
          </div>
          
          <p className="text-xl text-emerald-100 mb-8">
            {language === 'ar' ? 'احصل على خصم 30% على جميع الباقات' : 'Get 30% off all packages'}
          </p>

          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-2xl max-w-2xl mx-auto mb-8">
            <CardContent className="p-8">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">{timeLeft.days}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                    {language === 'ar' ? 'أيام' : 'Days'}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">{timeLeft.hours}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                    {language === 'ar' ? 'ساعات' : 'Hours'}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">{timeLeft.minutes}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                    {language === 'ar' ? 'دقائق' : 'Minutes'}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">{timeLeft.seconds}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                    {language === 'ar' ? 'ثواني' : 'Seconds'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            size="lg" 
            className="bg-white text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 text-xl px-10 py-6 rounded-full font-bold shadow-xl"
            onClick={() => window.open(settings.socialLinks.whatsapp, '_blank')}
          >
            <Zap className="w-6 h-6 mr-3" />
            {language === 'ar' ? 'احجز الآن!' : 'Claim Offer Now!'}
          </Button>
        </div>
      </div>
    </section>
  );
};
