
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
    <section className="py-16 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Gift className="w-12 h-12 mr-4 animate-bounce" />
            <h2 className="text-4xl font-bold">
              {language === 'ar' ? 'عرض محدود الوقت!' : 'Limited Time Offer!'}
            </h2>
          </div>
          
          <p className="text-2xl mb-8 opacity-90">
            {language === 'ar' ? 'احصل على خصم 50% على جميع الباقات' : 'Get 50% OFF on all training packages'}
          </p>

          {/* Countdown Timer */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-8">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <Timer className="w-8 h-8 mr-3" />
                <h3 className="text-2xl font-bold">
                  {language === 'ar' ? 'ينتهي العرض خلال:' : 'Offer ends in:'}
                </h3>
              </div>
              
              <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                {[
                  { value: timeLeft.days, label: language === 'ar' ? 'أيام' : 'Days' },
                  { value: timeLeft.hours, label: language === 'ar' ? 'ساعات' : 'Hours' },
                  { value: timeLeft.minutes, label: language === 'ar' ? 'دقائق' : 'Minutes' },
                  { value: timeLeft.seconds, label: language === 'ar' ? 'ثواني' : 'Seconds' }
                ].map((time, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white/20 rounded-lg p-4 mb-2">
                      <div className="text-4xl font-bold">{time.value.toString().padStart(2, '0')}</div>
                    </div>
                    <div className="text-sm opacity-80">{time.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button 
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 text-xl px-12 py-6 transform transition-all duration-300 hover:scale-110 shadow-2xl font-bold rounded-full"
            onClick={() => window.open(settings.socialLinks.whatsapp, '_blank')}
          >
            <Zap className="w-6 h-6 mr-3" />
            {language === 'ar' ? 'احجز الآن واحصل على الخصم' : 'Claim Your 50% Discount Now'}
          </Button>
          
          <p className="mt-4 text-sm opacity-80">
            {language === 'ar' ? '*العرض صالح لأول 100 عميل فقط' : '*Limited to first 100 clients only'}
          </p>
        </div>
      </div>
    </section>
  );
};
