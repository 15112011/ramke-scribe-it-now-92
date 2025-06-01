
import React from 'react';
import { EnhancedNavigation } from '@/components/EnhancedNavigation';
import { SubscriptionPayment } from '@/components/SubscriptionPayment';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Subscription: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedNavigation />
      
      <main className="pt-20">
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-900 dark:to-gray-800 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'ar' ? 'خطط الاشتراك' : 'Subscription Plans'}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {language === 'ar' 
                  ? 'اختر الباقة المناسبة لرحلة التحول الخاصة بك' 
                  : 'Choose the right plan for your transformation journey'
                }
              </p>
            </div>
            
            <SubscriptionPayment />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Subscription;
