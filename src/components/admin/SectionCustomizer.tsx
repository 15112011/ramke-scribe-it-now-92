
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Palette, 
  Layout, 
  Sparkles,
  ChevronDown,
  ChevronRight,
  Type,
  Image,
  Star
} from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface SectionCustomizerProps {
  sectionId: string;
  sectionName: string;
  sectionType: string;
}

export const SectionCustomizer: React.FC<SectionCustomizerProps> = ({
  sectionId,
  sectionName,
  sectionType
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const { settings, updateSettings } = useAdmin();
  const { language } = useLanguage();

  const handleContentUpdate = (field: string, value: string, lang: 'ar' | 'en' = 'en') => {
    if (field.includes('.')) {
      const [section, subField] = field.split('.');
      updateSettings({
        [section]: {
          ...settings[section as keyof typeof settings],
          [subField]: typeof settings[section as keyof typeof settings]?.[subField as any] === 'object'
            ? { ...settings[section as keyof typeof settings]?.[subField as any], [lang]: value }
            : value
        }
      });
    } else {
      updateSettings({
        content: {
          ...settings.content,
          [field]: typeof settings.content[field as keyof typeof settings.content] === 'object'
            ? { ...settings.content[field as keyof typeof settings.content], [lang]: value }
            : value
        }
      });
    }
  };

  const renderHeroCustomizer = () => (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="styling">Styling</TabsTrigger>
        <TabsTrigger value="layout">Layout</TabsTrigger>
        <TabsTrigger value="effects">Effects</TabsTrigger>
      </TabsList>
      
      <TabsContent value="content" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Hero Title (English)</Label>
            <Textarea
              value={settings.content.heroTitle.en}
              onChange={(e) => handleContentUpdate('heroTitle', e.target.value, 'en')}
              rows={2}
            />
          </div>
          <div>
            <Label>Hero Title (Arabic)</Label>
            <Textarea
              value={settings.content.heroTitle.ar}
              onChange={(e) => handleContentUpdate('heroTitle', e.target.value, 'ar')}
              rows={2}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Subtitle (English)</Label>
            <Textarea
              value={settings.content.heroSubtitle.en}
              onChange={(e) => handleContentUpdate('heroSubtitle', e.target.value, 'en')}
              rows={3}
            />
          </div>
          <div>
            <Label>Subtitle (Arabic)</Label>
            <Textarea
              value={settings.content.heroSubtitle.ar}
              onChange={(e) => handleContentUpdate('heroSubtitle', e.target.value, 'ar')}
              rows={3}
            />
          </div>
        </div>
        
        <div>
          <Label>Hero Image URL</Label>
          <Input
            value={settings.heroImage}
            onChange={(e) => updateSettings({ heroImage: e.target.value })}
            placeholder="Enter image URL"
          />
        </div>
      </TabsContent>

      <TabsContent value="styling" className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Text Color</Label>
            <Input type="color" defaultValue="#1f2937" />
          </div>
          <div>
            <Label>Background Color</Label>
            <Input type="color" defaultValue="#ffffff" />
          </div>
          <div>
            <Label>Button Color</Label>
            <Input type="color" defaultValue="#10b981" />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="layout" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Text Alignment</Label>
            <select className="w-full p-2 border rounded">
              <option>Center</option>
              <option>Left</option>
              <option>Right</option>
            </select>
          </div>
          <div>
            <Label>Image Position</Label>
            <select className="w-full p-2 border rounded">
              <option>Right</option>
              <option>Left</option>
              <option>Background</option>
            </select>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="effects" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Animation Type</Label>
            <select className="w-full p-2 border rounded">
              <option>Fade Up</option>
              <option>Slide In</option>
              <option>Zoom In</option>
            </select>
          </div>
          <div>
            <Label>Animation Delay (ms)</Label>
            <Input type="number" defaultValue="0" min="0" step="100" />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );

  const renderPackagesCustomizer = () => (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="pricing">Pricing</TabsTrigger>
        <TabsTrigger value="styling">Styling</TabsTrigger>
      </TabsList>
      
      <TabsContent value="content" className="space-y-4">
        <div className="space-y-6">
          {(['basic', 'professional', 'premium'] as const).map((packageType) => (
            <Card key={packageType}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  {settings.packages[packageType].name.en} Package
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name (English)</Label>
                    <Input
                      value={settings.packages[packageType].name.en}
                      onChange={(e) => {
                        updateSettings({
                          packages: {
                            ...settings.packages,
                            [packageType]: {
                              ...settings.packages[packageType],
                              name: { ...settings.packages[packageType].name, en: e.target.value }
                            }
                          }
                        });
                      }}
                    />
                  </div>
                  <div>
                    <Label>Name (Arabic)</Label>
                    <Input
                      value={settings.packages[packageType].name.ar}
                      onChange={(e) => {
                        updateSettings({
                          packages: {
                            ...settings.packages,
                            [packageType]: {
                              ...settings.packages[packageType],
                              name: { ...settings.packages[packageType].name, ar: e.target.value }
                            }
                          }
                        });
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="pricing" className="space-y-4">
        <div className="space-y-4">
          {(['basic', 'professional', 'premium'] as const).map((packageType) => (
            <div key={packageType} className="flex items-center gap-4 p-4 border rounded">
              <Label className="w-20">{settings.packages[packageType].name.en}</Label>
              <Input
                type="number"
                value={settings.packages[packageType].price}
                onChange={(e) => {
                  updateSettings({
                    packages: {
                      ...settings.packages,
                      [packageType]: {
                        ...settings.packages[packageType],
                        price: e.target.value
                      }
                    }
                  });
                }}
                className="w-32"
              />
              <span className="text-gray-500">EGP</span>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="styling" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Card Border Radius</Label>
            <Input type="range" min="0" max="20" defaultValue="8" />
          </div>
          <div>
            <Label>Popular Badge Color</Label>
            <Input type="color" defaultValue="#3b82f6" />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );

  const renderTestimonialsCustomizer = () => (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="styling">Styling</TabsTrigger>
      </TabsList>
      
      <TabsContent value="content" className="space-y-4">
        <div className="space-y-6">
          {settings.testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Testimonial {index + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Client Name</Label>
                  <Input
                    value={testimonial.name}
                    onChange={(e) => {
                      const updatedTestimonials = [...settings.testimonials];
                      updatedTestimonials[index] = { ...testimonial, name: e.target.value };
                      updateSettings({ testimonials: updatedTestimonials });
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Content (English)</Label>
                    <Textarea
                      value={testimonial.content.en}
                      onChange={(e) => {
                        const updatedTestimonials = [...settings.testimonials];
                        updatedTestimonials[index] = {
                          ...testimonial,
                          content: { ...testimonial.content, en: e.target.value }
                        };
                        updateSettings({ testimonials: updatedTestimonials });
                      }}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Content (Arabic)</Label>
                    <Textarea
                      value={testimonial.content.ar}
                      onChange={(e) => {
                        const updatedTestimonials = [...settings.testimonials];
                        updatedTestimonials[index] = {
                          ...testimonial,
                          content: { ...testimonial.content, ar: e.target.value }
                        };
                        updateSettings({ testimonials: updatedTestimonials });
                      }}
                      rows={3}
                    />
                  </div>
                </div>
                <div>
                  <Label>Rating</Label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={testimonial.rating}
                    onChange={(e) => {
                      const updatedTestimonials = [...settings.testimonials];
                      updatedTestimonials[index] = { ...testimonial, rating: parseInt(e.target.value) };
                      updateSettings({ testimonials: updatedTestimonials });
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="styling" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Card Background</Label>
            <Input type="color" defaultValue="#ffffff" />
          </div>
          <div>
            <Label>Star Color</Label>
            <Input type="color" defaultValue="#fbbf24" />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );

  const renderDefaultCustomizer = () => (
    <div className="p-4 text-center text-gray-500">
      <Settings className="w-8 h-8 mx-auto mb-2" />
      <p>Customization options for {sectionName} coming soon...</p>
    </div>
  );

  const renderCustomizer = () => {
    switch (sectionType) {
      case 'hero':
        return renderHeroCustomizer();
      case 'packages':
        return renderPackagesCustomizer();
      case 'testimonials':
        return renderTestimonialsCustomizer();
      default:
        return renderDefaultCustomizer();
    }
  };

  if (!isExpanded) {
    return (
      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setIsExpanded(true)}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium">{sectionName}</h3>
                <p className="text-sm text-gray-500">Click to customize</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Settings className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle>{sectionName} Customization</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)}>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {renderCustomizer()}
      </CardContent>
    </Card>
  );
};
