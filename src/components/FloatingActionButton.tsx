
import React, { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';

export const FloatingActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const { settings } = useAdmin();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Buttons */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-fade-in">
          <Button
            onClick={() => window.open(settings.socialLinks.whatsapp, '_blank')}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
          
          <Button
            onClick={() => window.open(`tel:${settings.socialLinks.phone}`, '_blank')}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110"
          >
            <Phone className="w-6 h-6" />
          </Button>
        </div>
      )}

      {/* Main FAB */}
      <Button
        onClick={toggleMenu}
        className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>
    </div>
  );
};
