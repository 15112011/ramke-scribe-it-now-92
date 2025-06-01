
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { settings, toggleAdminMode, isAdminMode } = useAdmin();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src={settings.content.logo} 
              alt="Logo" 
              className="h-10 w-10 object-contain"
            />
            <span className={`font-bold text-xl ${
              isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'
            }`}>
              {language === 'ar' ? settings.content.companyName.ar : settings.content.companyName.en}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className={`font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-900 dark:text-white hover:text-emerald-600' 
                  : 'text-white hover:text-emerald-200'
              }`}
            >
              {language === 'ar' ? settings.sectionTitles.home.ar : settings.sectionTitles.home.en}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-900 dark:text-white hover:text-emerald-600' 
                  : 'text-white hover:text-emerald-200'
              }`}
            >
              {language === 'ar' ? settings.sectionTitles.about.ar : settings.sectionTitles.about.en}
            </button>
            <button
              onClick={() => scrollToSection('packages')}
              className={`font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-900 dark:text-white hover:text-emerald-600' 
                  : 'text-white hover:text-emerald-200'
              }`}
            >
              {language === 'ar' ? settings.sectionTitles.packages.ar : settings.sectionTitles.packages.en}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-900 dark:text-white hover:text-emerald-600' 
                  : 'text-white hover:text-emerald-200'
              }`}
            >
              {language === 'ar' ? settings.sectionTitles.contact.ar : settings.sectionTitles.contact.en}
            </button>
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className={`${
                isScrolled 
                  ? 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <Globe className="w-4 h-4 mr-1" />
              {language === 'ar' ? 'EN' : 'ع'}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAdminMode}
              className={`${
                isScrolled 
                  ? 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800' 
                  : 'text-white hover:bg-white/20'
              } ${isAdminMode ? 'bg-emerald-100 dark:bg-emerald-900' : ''}`}
            >
              <Settings className="w-4 h-4 mr-1" />
              {language === 'ar' ? settings.buttons.admin.ar : settings.buttons.admin.en}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden ${
                isScrolled 
                  ? 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <nav className="py-4 space-y-2">
              <button
                onClick={() => scrollToSection('hero')}
                className="block w-full text-left px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {language === 'ar' ? settings.sectionTitles.home.ar : settings.sectionTitles.home.en}
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {language === 'ar' ? settings.sectionTitles.about.ar : settings.sectionTitles.about.en}
              </button>
              <button
                onClick={() => scrollToSection('packages')}
                className="block w-full text-left px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {language === 'ar' ? settings.sectionTitles.packages.ar : settings.sectionTitles.packages.en}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {language === 'ar' ? settings.sectionTitles.contact.ar : settings.sectionTitles.contact.en}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
