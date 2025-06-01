
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SectionConfig {
  id: string;
  name: string;
  type: 'hero' | 'gallery' | 'stats' | 'about' | 'packages' | 'testimonials' | 'steps' | 'contact' | 'video' | 'results';
  enabled: boolean;
  order: number;
  component: string;
}

interface SectionsContextType {
  sections: SectionConfig[];
  updateSections: (newSections: SectionConfig[]) => void;
  toggleSection: (sectionId: string) => void;
  reorderSections: (newOrder: SectionConfig[]) => void;
  getSectionById: (id: string) => SectionConfig | undefined;
  getEnabledSections: () => SectionConfig[];
}

const defaultSections: SectionConfig[] = [
  { id: 'hero', name: 'Hero Section', type: 'hero', enabled: true, order: 1, component: 'Hero' },
  { id: 'gallery', name: 'Gallery', type: 'gallery', enabled: true, order: 2, component: 'Gallery' },
  { id: 'stats', name: 'Statistics', type: 'stats', enabled: true, order: 3, component: 'Stats' },
  { id: 'about', name: 'About Section', type: 'about', enabled: true, order: 4, component: 'About' },
  { id: 'video', name: 'Video Preview', type: 'video', enabled: true, order: 5, component: 'VideoPreview' },
  { id: 'results', name: 'Before/After Results', type: 'results', enabled: true, order: 6, component: 'BeforeAfterResults' },
  { id: 'packages', name: 'Packages', type: 'packages', enabled: true, order: 7, component: 'Packages' },
  { id: 'steps', name: 'Process Steps', type: 'steps', enabled: true, order: 8, component: 'Steps' },
  { id: 'testimonials', name: 'Testimonials', type: 'testimonials', enabled: true, order: 9, component: 'InteractiveTestimonials' },
  { id: 'contact', name: 'Contact Section', type: 'contact', enabled: true, order: 10, component: 'Contact' }
];

const SectionsContext = createContext<SectionsContextType | undefined>(undefined);

export const SectionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sections, setSections] = useState<SectionConfig[]>(defaultSections);

  useEffect(() => {
    const savedSections = localStorage.getItem('sectionSettings');
    if (savedSections) {
      try {
        const parsed = JSON.parse(savedSections);
        setSections(parsed);
        console.log('Loaded section settings from localStorage:', parsed);
      } catch (error) {
        console.error('Failed to parse section settings from localStorage:', error);
      }
    }
  }, []);

  const updateSections = (newSections: SectionConfig[]) => {
    setSections(newSections);
    localStorage.setItem('sectionSettings', JSON.stringify(newSections));
    console.log('Section settings updated:', newSections);
  };

  const toggleSection = (sectionId: string) => {
    const newSections = sections.map(section => 
      section.id === sectionId 
        ? { ...section, enabled: !section.enabled }
        : section
    );
    updateSections(newSections);
  };

  const reorderSections = (newOrder: SectionConfig[]) => {
    const reorderedSections = newOrder.map((section, index) => ({
      ...section,
      order: index + 1
    }));
    updateSections(reorderedSections);
  };

  const getSectionById = (id: string) => {
    return sections.find(section => section.id === id);
  };

  const getEnabledSections = () => {
    return sections.filter(section => section.enabled).sort((a, b) => a.order - b.order);
  };

  return (
    <SectionsContext.Provider value={{ 
      sections, 
      updateSections, 
      toggleSection, 
      reorderSections, 
      getSectionById, 
      getEnabledSections 
    }}>
      {children}
    </SectionsContext.Provider>
  );
};

export const useSections = () => {
  const context = useContext(SectionsContext);
  if (context === undefined) {
    throw new Error('useSections must be used within a SectionsProvider');
  }
  return context;
};
