
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe, Settings, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const EnhancedNavigation: React.FC = () => {
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

  const getLocalizedText = (text: string | { ar: string; en: string }): string => {
    if (typeof text === 'string') return text;
    return language === 'ar' ? text.ar : text.en;
  };

  // Convert packages object to array for mapping
  const packagesArray = [
    { id: 'basic', ...settings.packages.basic },
    { id: 'professional', ...settings.packages.professional },
    { id: 'premium', ...settings.packages.premium }
  ];

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
              {getLocalizedText(settings.content.companyName)}
            </span>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={`${
                  isScrolled 
                    ? 'text-gray-900 dark:text-white hover:text-emerald-600' 
                    : 'text-white hover:text-emerald-200'
                }`}>
                  {getLocalizedText(settings.sectionTitles.home)}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <button
                          onClick={() => scrollToSection('hero')}
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Welcome
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Start your fitness transformation journey
                          </p>
                        </button>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <button
                          onClick={() => scrollToSection('gallery')}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Gallery</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            View training photos and results
                          </p>
                        </button>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <button
                  onClick={() => scrollToSection('about')}
                  className={`px-4 py-2 font-medium transition-colors ${
                    isScrolled 
                      ? 'text-gray-900 dark:text-white hover:text-emerald-600' 
                      : 'text-white hover:text-emerald-200'
                  }`}
                >
                  {getLocalizedText(settings.sectionTitles.about)}
                </button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={`${
                  isScrolled 
                    ? 'text-gray-900 dark:text-white hover:text-emerald-600' 
                    : 'text-white hover:text-emerald-200'
                }`}>
                  {getLocalizedText(settings.sectionTitles.packages)}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {packagesArray.map((pkg, index) => (
                      <li key={index}>
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => scrollToSection('packages')}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {getLocalizedText(pkg.name)}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {getLocalizedText(pkg.description)}
                            </p>
                          </button>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`px-4 py-2 font-medium transition-colors ${
                    isScrolled 
                      ? 'text-gray-900 dark:text-white hover:text-emerald-600' 
                      : 'text-white hover:text-emerald-200'
                  }`}
                >
                  {getLocalizedText(settings.sectionTitles.contact)}
                </button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

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
              {getLocalizedText(settings.buttons.admin)}
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
                {getLocalizedText(settings.sectionTitles.home)}
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {getLocalizedText(settings.sectionTitles.about)}
              </button>
              <button
                onClick={() => scrollToSection('packages')}
                className="block w-full text-left px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {getLocalizedText(settings.sectionTitles.packages)}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {getLocalizedText(settings.sectionTitles.contact)}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
