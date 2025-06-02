import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Globe, Moon, Sun, Settings, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { useTheme } from 'next-themes';
import { useNavigate, useLocation } from 'react-router-dom';
import { subscriptionStorage } from '@/utils/subscriptionStorage';

export const EnhancedNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { settings } = useAdmin();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMemberLoggedIn, setIsMemberLoggedIn] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  // Check if user is logged into members area
  useEffect(() => {
    const memberAuth = localStorage.getItem('memberAuth');
    setIsMemberLoggedIn(!!memberAuth);
  }, []);

  const navigationItems = [
    { id: 'home', label: language === 'ar' ? settings.sectionTitles.home.ar : settings.sectionTitles.home.en, href: '/#home' },
    { id: 'about', label: language === 'ar' ? settings.sectionTitles.about.ar : settings.sectionTitles.about.en, href: '/#about' },
    { id: 'packages', label: language === 'ar' ? settings.sectionTitles.packages.ar : settings.sectionTitles.packages.en, href: '/#packages' },
    { id: 'contact', label: language === 'ar' ? settings.sectionTitles.contact.ar : settings.sectionTitles.contact.en, href: '/#contact' },
  ];

  const handleScroll = (elementId: string) => {
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavigation('/')}>
            <img 
              src={settings.content.logo} 
              alt="Logo" 
              className="h-10 w-10 rounded-lg object-cover"
            />
            <span className="font-bold text-xl text-gray-800 dark:text-white">
              {language === 'ar' ? settings.content.companyName.ar : settings.content.companyName.en}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
            
            {/* Members Link */}
            <button
              onClick={() => handleNavigation('/members')}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
            >
              <Users className="w-4 h-4" />
              {language === 'ar' ? 'منطقة الأعضاء' : 'Members'}
              {isMemberLoggedIn && (
                <Badge className="bg-emerald-100 text-emerald-800 text-xs">
                  {language === 'ar' ? 'متصل' : 'Active'}
                </Badge>
              )}
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex"
            >
              <Globe className="w-4 h-4 mr-1" />
              {language === 'ar' ? 'EN' : 'AR'}
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hidden sm:flex"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Admin Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNavigation('/admin')}
              className="hidden sm:flex bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50"
            >
              <Settings className="w-4 h-4 mr-1" />
              {language === 'ar' ? settings.buttons.admin.ar : settings.buttons.admin.en}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScroll(item.id)}
                  className="text-left text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Members Link */}
              <button
                onClick={() => handleNavigation('/members')}
                className="flex items-center gap-2 text-left text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium py-2"
              >
                <Users className="w-4 h-4" />
                {language === 'ar' ? 'منطقة الأعضاء' : 'Members'}
                {isMemberLoggedIn && (
                  <Badge className="bg-emerald-100 text-emerald-800 text-xs">
                    {language === 'ar' ? 'متصل' : 'Active'}
                  </Badge>
                )}
              </button>
              
              <div className="flex items-center space-x-2 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                >
                  <Globe className="w-4 h-4 mr-1" />
                  {language === 'ar' ? 'EN' : 'AR'}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigation('/admin')}
                  className="bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300"
                >
                  <Settings className="w-4 h-4 mr-1" />
                  {language === 'ar' ? settings.buttons.admin.ar : settings.buttons.admin.en}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
