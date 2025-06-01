
import React from 'react';
import { Hero } from './Hero';
import { Gallery } from './Gallery';
import { Stats } from './Stats';
import { About } from './About';
import { VideoPreview } from './VideoPreview';
import { BeforeAfterResults } from './BeforeAfterResults';
import { Packages } from './Packages';
import { Steps } from './Steps';
import { InteractiveTestimonials } from './InteractiveTestimonials';
import { Contact } from './Contact';
import { SectionConfig } from '@/contexts/SectionsContext';

interface DynamicSectionProps {
  section: SectionConfig;
}

const componentMap = {
  Hero,
  Gallery,
  Stats,
  About,
  VideoPreview,
  BeforeAfterResults,
  Packages,
  Steps,
  InteractiveTestimonials,
  Contact
};

export const DynamicSection: React.FC<DynamicSectionProps> = ({ section }) => {
  const Component = componentMap[section.component as keyof typeof componentMap];
  
  if (!Component) {
    console.warn(`Component ${section.component} not found for section ${section.id}`);
    return null;
  }

  if (!section.enabled) {
    return null;
  }

  return <Component />;
};
