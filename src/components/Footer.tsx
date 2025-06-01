
import React from 'react';
import { Heart, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              {language === 'ar' ? 'عمر أشرف' : 'Omar Ashraf'}
            </h3>
            <p className="text-gray-400 mb-4">
              {language === 'ar' 
                ? 'مدربك الشخصي لتحويل جسمك وحياتك'
                : 'Your personal trainer for body and life transformation'
              }
            </p>
            <div className="flex space-x-4">
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">
              {language === 'ar' ? 'الخدمات' : 'Services'}
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">
                {language === 'ar' ? 'التدريب الشخصي' : 'Personal Training'}
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                {language === 'ar' ? 'استشارات التغذية' : 'Nutrition Consulting'}
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                {language === 'ar' ? 'خطط التمرين' : 'Workout Plans'}
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                {language === 'ar' ? 'التدريب الجماعي' : 'Group Training'}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">
              {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  {language === 'ar' ? 'الرئيسية' : 'Home'}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {language === 'ar' ? 'عني' : 'About'}
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  {language === 'ar' ? 'الباقات' : 'Packages'}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  {language === 'ar' ? 'تواصل' : 'Contact'}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">
              {language === 'ar' ? 'تواصل معنا' : 'Contact Info'}
            </h4>
            <div className="space-y-2 text-gray-400">
              <p>+966 50 123 4567</p>
              <p>omar@fitness.com</p>
              <p>{language === 'ar' ? 'الرياض، السعودية' : 'Riyadh, Saudi Arabia'}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="flex items-center justify-center">
            {language === 'ar' ? 'صُنع بـ' : 'Made with'} 
            <Heart className="w-4 h-4 text-red-500 mx-1" /> 
            {language === 'ar' ? 'بواسطة عمر أشرف' : 'by Omar Ashraf'}
          </p>
          <p className="mt-2">
            © 2024 {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}
          </p>
        </div>
      </div>
    </footer>
  );
};
