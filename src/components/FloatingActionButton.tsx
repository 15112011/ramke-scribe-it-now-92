import React, { useState } from 'react';
import { MessageCircle, Phone, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
export const FloatingActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    language
  } = useLanguage();
  const {
    settings
  } = useAdmin();
  const toggleMenu = () => setIsOpen(!isOpen);
  return;
};