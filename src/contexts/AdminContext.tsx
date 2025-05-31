
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminSettings {
  heroImage: string;
  galleryImages: string[];
  aboutText: string;
  packages: {
    basic: { price: string; features: string[] };
    professional: { price: string; features: string[] };
    premium: { price: string; features: string[] };
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
  aboutText: "مدرب شخصي معتمد مع خبرة واسعة في مجال اللياقة البدنية والتغذية. هدفي هو مساعدتك في تحقيق أهدافك والوصول إلى أفضل نسخة من نفسك.",
  packages: {
    basic: {
      price: "1200",
      features: [
        "برنامج تدريبي لمدة شهر",
        "نظام غذائي بسيط",
        "متابعة أسبوعية",
        "دعم عبر الواتساب"
      ]
    },
    professional: {
      price: "2000",
      features: [
        "برنامج تدريبي لمدة شهرين",
        "نظام غذائي مفصل",
        "متابعة يومية",
        "مكالمات أسبوعية",
        "برنامج مكملات"
      ]
    },
    premium: {
      price: "3200",
      features: [
        "برنامج تدريبي لمدة 3 شهور",
        "نظام غذائي شامل",
        "متابعة على مدار الساعة",
        "جلسات تدريب أونلاين",
        "برنامج مكملات VIP",
        "ضمان النتائج"
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
        setSettings(parsed);
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
