
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Globe, Moon, Sun, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from 'next-themes';
import { useAdmin } from '@/contexts/AdminContext';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { isAdminMode, toggleAdminMode, settings } = useAdmin();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm transition-colors duration-300 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src={settings.content.logo} 
            alt="Omar Ashraf Logo"
            className="w-12 h-12 transform transition-transform duration-300 hover:scale-110"
          />
        </div>
        
        <nav className="hidden md:flex space-x-reverse space-x-6">
          <a href="#home" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-green-600 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            {settings.sectionTitles.home}
          </a>
          <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-green-600 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            {settings.sectionTitles.about}
          </a>
          <a href="#packages" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-green-600 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            {settings.sectionTitles.packages}
          </a>
          <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-green-600 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            {settings.sectionTitles.contact}
          </a>
        </nav>

        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <div className="flex items-center gap-2">
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
          <div className="flex items-center gap-2">
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
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform duration-300 hover:rotate-90" />
            <Switch
              checked={isAdminMode}
              onCheckedChange={toggleAdminMode}
            />
          </div>

          {/* Admin Panel Button - Only show if admin mode is enabled */}
          {isAdminMode && (
            <Button 
              onClick={() => navigate('/admin')}
              variant="outline"
              size="sm"
              className="border-green-500 text-green-600 hover:bg-green-500 hover:text-white dark:border-green-400 dark:text-green-400 transform transition-all duration-300 hover:scale-105"
            >
              <Settings className="w-4 h-4 mr-2" />
              {settings.buttons.admin}
            </Button>
          )}

          <Button className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            {settings.sectionTitles.contact}
          </Button>
        </div>
      </div>
    </header>
  );
};
