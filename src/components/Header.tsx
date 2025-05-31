
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Globe, Moon, Sun, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAdmin } from '@/contexts/AdminContext';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { isAdminMode, toggleAdminMode } = useAdmin();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/8d1f7dd8-67c5-4ab2-8ea3-d655ef1cb613.png" 
            alt="Omar Ashraf Logo"
            className="w-12 h-12"
          />
        </div>
        
        <nav className="hidden md:flex space-x-reverse space-x-6">
          <a href="#home" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
            {t('home')}
          </a>
          <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
            {t('about')}
          </a>
          <a href="#packages" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
            {t('packages')}
          </a>
          <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
            {t('contact')}
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
              className="text-sm"
            >
              {language === 'ar' ? 'EN' : 'ع'}
            </Button>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center gap-2">
            {theme === 'light' ? (
              <Sun className="w-4 h-4 text-gray-600" />
            ) : (
              <Moon className="w-4 h-4 text-gray-400" />
            )}
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
          </div>

          {/* Admin Toggle */}
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <Switch
              checked={isAdminMode}
              onCheckedChange={toggleAdminMode}
            />
          </div>

          <Button className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">
            {t('contact')}
          </Button>
        </div>
      </div>
    </header>
  );
};
