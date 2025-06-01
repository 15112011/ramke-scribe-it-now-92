
import React, { useState } from 'react';
import { MessageCircle, Phone, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';

export const FloatingActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const { settings } = useAdmin();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Action Buttons */}
      <div className={`flex flex-col gap-3 mb-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <Button
          onClick={() => window.open(settings.socialLinks.whatsapp, '_blank')}
          className="bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 rounded-full w-14 h-14 p-0"
          title={language === 'ar' ? 'واتساب' : 'WhatsApp'}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        
        <Button
          onClick={() => window.open(`tel:${settings.socialLinks.phone}`, '_blank')}
          className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 rounded-full w-14 h-14 p-0"
          title={language === 'ar' ? 'اتصل بي' : 'Call Me'}
        >
          <Phone className="w-6 h-6" />
        </Button>
      </div>

      {/* Main Toggle Button */}
      <Button
        onClick={toggleMenu}
        className={`bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-2xl transform transition-all duration-300 hover:scale-110 rounded-full w-16 h-16 p-0 ${isOpen ? 'rotate-45' : ''}`}
      >
        {isOpen ? <X className="w-8 h-8" /> : <Zap className="w-8 h-8" />}
      </Button>

      {/* Pulse Animation */}
      {!isOpen && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-ping opacity-20"></div>
      )}
    </div>
  );
};
