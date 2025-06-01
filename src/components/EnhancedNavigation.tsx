
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Globe, Moon, Sun, Settings, Menu, X, Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAdmin } from '@/contexts/AdminContext';
import { useNavigate } from 'react-router-dom';

export const EnhancedNavigation: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
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
    { href: '#contact', label: language === 'ar' ? settings.sectionTitles.contact : 'Contact' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-xl' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src={settings.content.logo} 
                alt="Omar Ashraf Logo"
                className="w-12 h-12 transform transition-transform duration-300 hover:scale-110"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {language === 'ar' ? 'عمر أشرف' : 'Omar Ashraf'}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'ar' ? 'مدرب شخصي معتمد' : 'Certified Personal Trainer'}
                </p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-reverse space-x-8">
              {navigationItems.map((item, index) => (
                <a 
                  key={index}
                  href={item.href} 
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 relative font-medium after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-green-600 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <div className="hidden sm:flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                  className="text-sm transform transition-transform duration-200 hover:scale-105"
                >
                  {language === 'ar' ? 'EN' : 'ع'}
                </Button>
              </div>

              {/* Theme Toggle */}
              <div className="hidden sm:flex items-center gap-2">
                {theme === 'light' ? (
                  <Sun className="w-4 h-4 text-gray-600 transition-transform duration-300 hover:rotate-12" />
                ) : (
                  <Moon className="w-4 h-4 text-gray-400 transition-transform duration-300 hover:rotate-12" />
                )}
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>

              {/* Admin Toggle */}
              {isAdminMode && (
                <div className="hidden sm:flex items-center gap-2">
                  <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform duration-300 hover:rotate-90" />
                  <Switch
                    checked={isAdminMode}
                    onCheckedChange={toggleAdminMode}
                  />
                </div>
              )}

              {/* Admin Panel Button */}
              {isAdminMode && (
                <Button 
                  onClick={() => navigate('/admin')}
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex border-green-500 text-green-600 hover:bg-green-500 hover:text-white dark:border-green-400 dark:text-green-400 transform transition-all duration-300 hover:scale-105"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {language === 'ar' ? settings.buttons.admin : 'Admin'}
                </Button>
              )}

              {/* CTA Button */}
              <Button 
                className="hidden md:flex bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={() => window.open(settings.socialLinks.whatsapp, '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {language === 'ar' ? 'تواصل معي' : 'Contact Me'}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 w-80 h-full bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300">
            <div className="p-6 pt-20">
              {/* Mobile Navigation */}
              <nav className="space-y-6">
                {navigationItems.map((item, index) => (
                  <a 
                    key={index}
                    href={item.href} 
                    className="block text-xl font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Mobile Controls */}
              <div className="mt-8 space-y-6">
                {/* Language Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'اللغة' : 'Language'}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                  >
                    {language === 'ar' ? 'EN' : 'العربية'}
                  </Button>
                </div>

                {/* Theme Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'الوضع المظلم' : 'Dark Mode'}
                  </span>
                  <Switch
                    checked={theme === 'dark'}
                    onCheckedChange={toggleTheme}
                  />
                </div>

                {/* Admin Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'وضع الإدارة' : 'Admin Mode'}
                  </span>
                  <Switch
                    checked={isAdminMode}
                    onCheckedChange={toggleAdminMode}
                  />
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="mt-8 space-y-4">
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => {
                    window.open(settings.socialLinks.whatsapp, '_blank');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {language === 'ar' ? 'واتساب' : 'WhatsApp'}
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    window.open(`tel:${settings.socialLinks.phone}`, '_blank');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Phone className="w-4 h-4 mr-2" />
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
