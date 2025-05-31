
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    // Navigation
    home: "الرئيسية",
    about: "نبذة عني",
    packages: "الباقات",
    contact: "تواصل معي",
    
    // Hero Section
    heroTitle: "ستصبح نسخة أقوى من نفسك!",
    heroSubtitle: "مدربك الشخصي عمر أشرف سيساعدك في تحقيق أهدافك في اللياقة البدنية والحصول على الجسم المثالي",
    startJourney: "ابدأ رحلتك الآن",
    viewResults: "شاهد النتائج",
    
    // Gallery
    trainingPhotos: "صور التدريب",
    weightTraining: "تدريب الأوزان",
    strengthExercises: "تمارين القوة",
    muscleExercises: "تمارين العضلات",
    fitness: "اللياقة البدنية",
    
    // Stats
    available247: "متاح دائماً",
    satisfiedClients: "عميل راضي",
    successRate: "نسبة النجاح",
    yearsExperience: "سنوات خبرة",
    
    // About
    aboutTitle: "عمر أشرف",
    aboutDescription: "مدرب شخصي معتمد مع خبرة واسعة في مجال اللياقة البدنية والتغذية. هدفي هو مساعدتك في تحقيق أهدافك والوصول إلى أفضل نسخة من نفسك.",
    certifications: "شهادات واعتمادات",
    specializations: "التخصصات",
    
    // Packages
    choosePackage: "اختر الباقة التي تناسبك",
    beginner: "المبتدئ",
    professional: "المحترف",
    premium: "المتميز",
    mostPopular: "الأكثر شعبية",
    chooseThisPackage: "اختر هذه الباقة",
    
    // Contact
    contactTitle: "تواصل معي الآن",
    contactSubtitle: "ابدأ رحلتك نحو الجسم المثالي اليوم",
    whatsapp: "واتساب",
    callMe: "اتصل بي",
    
    // Footer
    footerDescription: "مدربك الشخصي المعتمد لتحقيق أهدافك في اللياقة البدنية",
    services: "الخدمات",
    quickLinks: "روابط سريعة",
    followMe: "تابعني",
    rightsReserved: "جميع الحقوق محفوظة"
  },
  en: {
    // Navigation
    home: "Home",
    about: "About",
    packages: "Packages",
    contact: "Contact",
    
    // Hero Section
    heroTitle: "Become a Stronger Version of Yourself!",
    heroSubtitle: "Your personal trainer Omar Ashraf will help you achieve your fitness goals and get the perfect body",
    startJourney: "Start Your Journey Now",
    viewResults: "View Results",
    
    // Gallery
    trainingPhotos: "Training Photos",
    weightTraining: "Weight Training",
    strengthExercises: "Strength Exercises",
    muscleExercises: "Muscle Exercises",
    fitness: "Fitness",
    
    // Stats
    available247: "Available 24/7",
    satisfiedClients: "Satisfied Clients",
    successRate: "Success Rate",
    yearsExperience: "Years Experience",
    
    // About
    aboutTitle: "Omar Ashraf",
    aboutDescription: "Certified personal trainer with extensive experience in fitness and nutrition. My goal is to help you achieve your goals and reach the best version of yourself.",
    certifications: "Certifications",
    specializations: "Specializations",
    
    // Packages
    choosePackage: "Choose the Package That Suits You",
    beginner: "Beginner",
    professional: "Professional",
    premium: "Premium",
    mostPopular: "Most Popular",
    chooseThisPackage: "Choose This Package",
    
    // Contact
    contactTitle: "Contact Me Now",
    contactSubtitle: "Start your journey to the perfect body today",
    whatsapp: "WhatsApp",
    callMe: "Call Me",
    
    // Footer
    footerDescription: "Your certified personal trainer to achieve your fitness goals",
    services: "Services",
    quickLinks: "Quick Links",
    followMe: "Follow Me",
    rightsReserved: "All Rights Reserved"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
