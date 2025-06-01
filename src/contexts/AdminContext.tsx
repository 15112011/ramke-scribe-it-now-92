
import React, { createContext, useContext, useState, useEffect } from 'react';

interface MultilingualText {
  ar: string;
  en: string;
}

interface AdminSettings {
  heroImage: string;
  galleryImages: string[];
  aboutText: MultilingualText;
  packages: {
    basic: { 
      price: string; 
      features: MultilingualText[];
      name: MultilingualText;
      description: MultilingualText;
    };
    professional: { 
      price: string; 
      features: MultilingualText[];
      name: MultilingualText;
      description: MultilingualText;
    };
    premium: { 
      price: string; 
      features: MultilingualText[];
      name: MultilingualText;
      description: MultilingualText;
    };
  };
  socialLinks: {
    whatsapp: string;
    instagram: string;
    phone: string;
  };
  stats: {
    clients: string;
    successRate: string;
    experience: string;
  };
  content: {
    heroTitle: MultilingualText;
    heroSubtitle: MultilingualText;
    aboutTitle: MultilingualText;
    packagesTitle: MultilingualText;
    testimonialsTitle: MultilingualText;
    stepsTitle: MultilingualText;
    contactTitle: MultilingualText;
    contactSubtitle: MultilingualText;
    footerDescription: MultilingualText;
    companyName: MultilingualText;
    logo: string;
    favIcon: string;
  };
  sectionTitles: {
    home: MultilingualText;
    about: MultilingualText;
    packages: MultilingualText;
    contact: MultilingualText;
    gallery: MultilingualText;
    services: MultilingualText;
    quickLinks: MultilingualText;
    followMe: MultilingualText;
  };
  buttons: {
    startJourney: MultilingualText;
    viewResults: MultilingualText;
    choosePackage: MultilingualText;
    whatsapp: MultilingualText;
    callMe: MultilingualText;
    admin: MultilingualText;
    saveChanges: MultilingualText;
  };
  packageLabels: {
    basic: MultilingualText;
    professional: MultilingualText;
    premium: MultilingualText;
    mostPopular: MultilingualText;
  };
  specialties: {
    certifications: {
      title: MultilingualText;
      items: MultilingualText[];
    };
    specializations: {
      title: MultilingualText;
      items: MultilingualText[];
    };
  };
  steps: Array<{
    step: string;
    title: MultilingualText;
    description: MultilingualText;
  }>;
  testimonials: Array<{
    name: string;
    content: MultilingualText;
    rating: number;
  }>;
  services: MultilingualText[];
  resultsPage: {
    title: MultilingualText;
    subtitle: MultilingualText;
    cards: Array<{
      title: MultilingualText;
      description: MultilingualText;
      image: string;
      stats: {
        before: string;
        after: string;
        duration: MultilingualText;
      };
    }>;
  };
  paymentMethods: {
    instapay: {
      number: string;
      name: string;
    };
    vodafoneCash: {
      number: string;
      name: string;
    };
  };
}

interface AdminContextType {
  settings: AdminSettings;
  updateSettings: (newSettings: Partial<AdminSettings>) => void;
  isAdminMode: boolean;
  toggleAdminMode: () => void;
}

const defaultSettings: AdminSettings = {
  heroImage: "/lovable-uploads/1ceb2b84-4db5-4e10-8be0-bf7e46cb4a37.png",
  galleryImages: [
    "/lovable-uploads/4fec875e-9e74-4a4f-aedd-29de4c064bc1.png",
    "/lovable-uploads/78c7f92d-29b1-4699-9511-9e5848c5892e.png",
    "/lovable-uploads/8fb7f786-bdcb-4dac-a303-8405af22960b.png",
    "/lovable-uploads/37b67d4e-4f06-4346-b807-2caeee7427eb.png"
  ],
  aboutText: {
    ar: "مدرب شخصي معتمد مع خبرة واسعة في مجال اللياقة البدنية والتغذية. هدفي هو مساعدتك في تحقيق أهدافك والوصول إلى أفضل نسخة من نفسك.",
    en: "Certified personal trainer with extensive experience in fitness and nutrition. My goal is to help you achieve your goals and reach the best version of yourself."
  },
  packages: {
    basic: {
      price: "1200",
      name: { ar: "المبتدئ", en: "Basic" },
      description: { ar: "باقة مناسبة للمبتدئين", en: "Perfect package for beginners" },
      features: [
        { ar: "برنامج تدريبي لمدة شهر", en: "1-month training program" },
        { ar: "نظام غذائي بسيط", en: "Simple nutrition plan" },
        { ar: "متابعة أسبوعية", en: "Weekly follow-up" },
        { ar: "دعم عبر الواتساب", en: "WhatsApp support" }
      ]
    },
    professional: {
      price: "2000",
      name: { ar: "المحترف", en: "Professional" },
      description: { ar: "باقة شاملة للمحترفين", en: "Comprehensive package for professionals" },
      features: [
        { ar: "برنامج تدريبي لمدة شهرين", en: "2-month training program" },
        { ar: "نظام غذائي مفصل", en: "Detailed nutrition plan" },
        { ar: "متابعة يومية", en: "Daily follow-up" },
        { ar: "مكالمات أسبوعية", en: "Weekly calls" },
        { ar: "برنامج مكملات", en: "Supplement program" }
      ]
    },
    premium: {
      price: "3200",
      name: { ar: "المتميز", en: "Premium" },
      description: { ar: "الباقة الأكثر شمولية", en: "Most comprehensive package" },
      features: [
        { ar: "برنامج تدريبي لمدة 3 شهور", en: "3-month training program" },
        { ar: "نظام غذائي شامل", en: "Comprehensive nutrition plan" },
        { ar: "متابعة على مدار الساعة", en: "24/7 follow-up" },
        { ar: "جلسات تدريب أونلاين", en: "Online training sessions" },
        { ar: "برنامج مكملات VIP", en: "VIP supplement program" },
        { ar: "ضمان النتائج", en: "Results guarantee" }
      ]
    }
  },
  socialLinks: {
    whatsapp: "https://wa.me/1234567890",
    instagram: "https://instagram.com/omarashraf",
    phone: "+1234567890"
  },
  stats: {
    clients: "+50",
    successRate: "95%",
    experience: "5"
  },
  content: {
    heroTitle: {
      ar: "حقق حلمك بالجسم المثالي مع عمر أشرف",
      en: "Achieve your dream body with Omar Ashraf"
    },
    heroSubtitle: {
      ar: "مدرب شخصي معتمد يساعدك في الوصول لأهدافك بأسرع وقت وأفضل النتائج",
      en: "Certified personal trainer helping you reach your goals faster with the best results"
    },
    aboutTitle: { ar: "عمر أشرف", en: "Omar Ashraf" },
    packagesTitle: { ar: "اختر الباقة التي تناسبك", en: "Choose the package that suits you" },
    testimonialsTitle: { ar: "آراء العملاء", en: "Client Reviews" },
    stepsTitle: { ar: "أربع خطوات لتحقيق الهدف معاً", en: "Four steps to achieve the goal together" },
    contactTitle: { ar: "تواصل معي الآن", en: "Contact me now" },
    contactSubtitle: { ar: "ابدأ رحلتك نحو الجسم المثالي اليوم", en: "Start your journey to the perfect body today" },
    footerDescription: { ar: "مدرب شخصي معتمد متخصص في تحقيق أهداف اللياقة البدنية", en: "Certified personal trainer specialized in achieving fitness goals" },
    companyName: { ar: "عمر أشرف - المدرب الشخصي", en: "Omar Ashraf - Personal Trainer" },
    logo: "/lovable-uploads/8d1f7dd8-67c5-4ab2-8ea3-d655ef1cb613.png",
    favIcon: "/favicon.ico"
  },
  sectionTitles: {
    home: { ar: "الرئيسية", en: "Home" },
    about: { ar: "من أنا", en: "About" },
    packages: { ar: "الباقات", en: "Packages" },
    contact: { ar: "تواصل معي", en: "Contact" },
    gallery: { ar: "صور التدريب", en: "Training Gallery" },
    services: { ar: "الخدمات", en: "Services" },
    quickLinks: { ar: "روابط سريعة", en: "Quick Links" },
    followMe: { ar: "تابعني", en: "Follow Me" }
  },
  buttons: {
    startJourney: { ar: "ابدأ رحلتك", en: "Start Journey" },
    viewResults: { ar: "شاهد النتائج", en: "View Results" },
    choosePackage: { ar: "اختر هذه الباقة", en: "Choose Package" },
    whatsapp: { ar: "واتساب", en: "WhatsApp" },
    callMe: { ar: "اتصل بي", en: "Call Me" },
    admin: { ar: "لوحة التحكم", en: "Admin Panel" },
    saveChanges: { ar: "حفظ التغييرات", en: "Save Changes" }
  },
  packageLabels: {
    basic: { ar: "المبتدئ", en: "Basic" },
    professional: { ar: "المحترف", en: "Professional" },
    premium: { ar: "المتميز", en: "Premium" },
    mostPopular: { ar: "الأكثر شعبية", en: "Most Popular" }
  },
  specialties: {
    certifications: {
      title: { ar: "شهادات واعتمادات", en: "Certifications" },
      items: [
        { ar: "مدرب شخصي معتمد", en: "Certified Personal Trainer" },
        { ar: "أخصائي تغذية", en: "Nutrition Specialist" },
        { ar: "خبرة +5 سنوات", en: "+5 Years Experience" }
      ]
    },
    specializations: {
      title: { ar: "التخصصات", en: "Specializations" },
      items: [
        { ar: "بناء العضلات", en: "Muscle Building" },
        { ar: "حرق الدهون", en: "Fat Loss" },
        { ar: "اللياقة العامة", en: "General Fitness" }
      ]
    }
  },
  steps: [
    { 
      step: "1", 
      title: { ar: "التواصل", en: "Contact" }, 
      description: { ar: "تواصل معي عبر الواتساب", en: "Contact me via WhatsApp" } 
    },
    { 
      step: "2", 
      title: { ar: "التقييم", en: "Assessment" }, 
      description: { ar: "تقييم حالتك الصحية", en: "Assess your health condition" } 
    },
    { 
      step: "3", 
      title: { ar: "البرنامج", en: "Program" }, 
      description: { ar: "وضع برنامج مخصص لك", en: "Create a custom program for you" } 
    },
    { 
      step: "4", 
      title: { ar: "النتائج", en: "Results" }, 
      description: { ar: "تحقيق أهدافك المرجوة", en: "Achieve your desired goals" } 
    }
  ],
  testimonials: [
    { 
      name: "Ahmed Hassan", 
      content: { 
        ar: "تجربة رائعة مع المدرب عمر، حقق لي نتائج مذهلة في وقت قصير. أنصح بشدة بالتعامل معه.", 
        en: "Amazing experience with coach Omar, achieved incredible results in a short time. Highly recommend working with him." 
      }, 
      rating: 5 
    },
    { 
      name: "Sarah Mohamed", 
      content: { 
        ar: "برنامج التدريب والنظام الغذائي كان ممتاز، والمتابعة المستمرة ساعدتني كثيراً.", 
        en: "The training program and nutrition plan were excellent, and the continuous follow-up helped me a lot." 
      }, 
      rating: 5 
    },
    { 
      name: "Mohamed Ali", 
      content: { 
        ar: "أفضل مدرب تعاملت معه، صبور ومتفهم ويساعد في تحقيق الأهداف بطريقة صحية.", 
        en: "Best trainer I've worked with, patient and understanding, helps achieve goals in a healthy way." 
      }, 
      rating: 5 
    }
  ],
  services: [
    { ar: "تدريب شخصي", en: "Personal Training" },
    { ar: "برامج غذائية", en: "Nutrition Programs" },
    { ar: "استشارات اللياقة", en: "Fitness Consultations" }
  ],
  resultsPage: {
    title: { ar: "نتائج عملائنا", en: "Our Clients' Results" },
    subtitle: { ar: "شاهد التحولات المذهلة التي حققها عملاؤنا", en: "See the amazing transformations our clients achieved" },
    cards: [
      {
        title: { ar: "تحول أحمد", en: "Ahmed's Transformation" },
        description: { ar: "فقدان 20 كيلو وبناء عضلات", en: "Lost 20kg and built muscle" },
        image: "/lovable-uploads/4fec875e-9e74-4a4f-aedd-29de4c064bc1.png",
        stats: {
          before: "95kg",
          after: "75kg",
          duration: { ar: "6 أشهر", en: "6 months" }
        }
      },
      {
        title: { ar: "تحول سارة", en: "Sarah's Transformation" },
        description: { ar: "نحت الجسم وزيادة اللياقة", en: "Body sculpting and increased fitness" },
        image: "/lovable-uploads/78c7f92d-29b1-4699-9511-9e5848c5892e.png",
        stats: {
          before: "28% fat",
          after: "18% fat",
          duration: { ar: "4 أشهر", en: "4 months" }
        }
      }
    ]
  },
  paymentMethods: {
    instapay: {
      number: "01234567890",
      name: "Omar Ashraf"
    },
    vodafoneCash: {
      number: "01098765432",
      name: "Omar Ashraf"
    }
  }
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings);
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
        console.log('Loaded admin settings from localStorage:', parsed);
      } catch (error) {
        console.error('Failed to parse admin settings from localStorage:', error);
      }
    }

    const savedAdminMode = localStorage.getItem('adminMode');
    if (savedAdminMode === 'true') {
      setIsAdminMode(true);
      console.log('Admin mode enabled from localStorage');
    }
  }, []);

  const updateSettings = (newSettings: Partial<AdminSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('adminSettings', JSON.stringify(updatedSettings));
    console.log('Admin settings updated:', updatedSettings);
  };

  const toggleAdminMode = () => {
    const newAdminMode = !isAdminMode;
    setIsAdminMode(newAdminMode);
    localStorage.setItem('adminMode', newAdminMode.toString());
    console.log('Admin mode toggled to:', newAdminMode);
  };

  return (
    <AdminContext.Provider value={{ settings, updateSettings, isAdminMode, toggleAdminMode }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
