
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Globe, Moon, Sun, Settings, Menu, X, Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAdmin } from '@/contexts/AdminContext';
import { useNavigate } from 'react-router-dom';

export const EnhancedNavigation: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { isAdminMode, toggleAdminMode, settings } = useAdmin();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { href: '#home', label: language === 'ar' ? settings.sectionTitles.home : 'Home' },
    { href: '#about', label: language === 'ar' ? settings.sectionTitles.about : 'About' },
    { href: '#packages', label: language === 'ar' ? settings.sectionTitles.packages : 'Packages' },
    { href: '#contact', label: language === 'ar' ? settings.sectionTitles.contact : 'Contact' }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-xl border-b border-gray-200/20 dark:border-gray-700/20' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Logo - Mobile Optimized */}
            <div className="flex items-center gap-2 sm:gap-3">
              <img 
                src={settings.content.logo} 
                alt="Omar Ashraf Logo" 
                className="w-10 h-10 sm:w-12 sm:h-12 transform transition-transform duration-300 hover:scale-110" 
              />
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {language === 'ar' ? 'عمر أشرف' : 'Omar Ashraf'}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {language === 'ar' ? 'مدرب شخصي معتمد' : 'Certified Personal Trainer'}
                </p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-reverse space-x-6 xl:space-x-8">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 relative font-medium text-sm xl:text-base after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-green-600 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Controls - Mobile Optimized */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Toggle - Hidden on small screens */}
              <div className="hidden sm:flex items-center gap-1 sm:gap-2">
                <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                  className="text-xs sm:text-sm transform transition-transform duration-200 hover:scale-105 px-2 py-1"
                >
                  {language === 'ar' ? 'EN' : 'ع'}
                </Button>
              </div>

              {/* Theme Toggle - Mobile Optimized */}
              <div className="flex items-center gap-1 sm:gap-2">
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                  className="scale-75 sm:scale-100"
                />
              </div>

              {/* Admin Toggle - Hidden on mobile unless admin mode */}
              {isAdminMode && (
                <div className="hidden sm:flex items-center gap-2">
                  <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform duration-300 hover:rotate-90" />
                  <Switch
                    checked={isAdminMode}
                    onCheckedChange={toggleAdminMode}
                    className="scale-75 sm:scale-100"
                  />
                </div>
              )}

              {/* Admin Panel Button - Mobile Optimized */}
              {isAdminMode && (
                <Button 
                  onClick={() => navigate('/admin')}
                  variant="outline"
                  size="sm"
                  className="hidden md:flex border-green-500 text-green-600 hover:bg-green-500 hover:text-white dark:border-green-400 dark:text-green-400 transform transition-all duration-300 hover:scale-105 text-xs px-2 py-1"
                >
                  <Settings className="w-3 h-3 mr-1" />
                  {language === 'ar' ? 'إدارة' : 'Admin'}
                </Button>
              )}

              {/* CTA Button - Mobile Optimized */}
              <Button 
                className="hidden sm:flex bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-xs sm:text-sm px-3 sm:px-4 py-2"
                onClick={() => window.open(settings.socialLinks.whatsapp, '_blank')}
              >
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden md:inline">
                  {language === 'ar' ? 'تواصل معي' : 'Contact'}
                </span>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          <div className="fixed top-0 right-0 w-full max-w-sm h-full bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 overflow-y-auto">
            <div className="p-6 pt-20">
              {/* Mobile Navigation */}
              <nav className="space-y-6 mb-8">
                {navigationItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="block text-xl font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300 py-2 border-b border-gray-100 dark:border-gray-800"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Mobile Controls */}
              <div className="space-y-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                {/* Language Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {language === 'ar' ? 'اللغة' : 'Language'}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                    className="px-4 py-2"
                  >
                    {language === 'ar' ? 'English' : 'العربية'}
                  </Button>
                </div>

                {/* Theme Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {language === 'ar' ? 'الوضع المظلم' : 'Dark Mode'}
                  </span>
                  <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
                </div>

                {/* Admin Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {language === 'ar' ? 'وضع الإدارة' : 'Admin Mode'}
                  </span>
                  <Switch checked={isAdminMode} onCheckedChange={toggleAdminMode} />
                </div>
              </div>

              {/* Mobile Contact Buttons */}
              <div className="space-y-4 mt-8">
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg font-semibold shadow-lg"
                  onClick={() => {
                    window.open(settings.socialLinks.whatsapp, '_blank');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <MessageCircle className="w-5 h-5 mr-3" />
                  {language === 'ar' ? 'واتساب' : 'WhatsApp'}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full py-3 text-lg font-semibold"
                  onClick={() => {
                    window.open(`tel:${settings.socialLinks.phone}`, '_blank');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Phone className="w-5 h-5 mr-3" />
                  {language === 'ar' ? 'اتصل بي' : 'Call Me'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
