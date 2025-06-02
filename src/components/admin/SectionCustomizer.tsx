
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Save, 
  Eye, 
  EyeOff, 
  Settings, 
  Palette, 
  Type, 
  Image as ImageIcon,
  Plus,
  X,
  Move,
  Copy,
  MessageSquare,
  CreditCard
} from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';
import { ImageUpload } from './ImageUpload';

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
  const { settings, updateSettings } = useAdmin();
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);

  const saveSection = () => {
    updateSettings(tempSettings);
    toast({
      title: "Section Updated",
      description: `${sectionName} has been updated successfully.`
    });
  };

  const renderHeroCustomizer = () => (
    <div className="space-y-6">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="styling">Styling</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="effects">Effects</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Title (Arabic)</label>
              <Input
                value={tempSettings.content.heroTitle.ar}
                onChange={(e) => setTempSettings(prev => ({
                  ...prev,
                  content: { 
                    ...prev.content, 
                    heroTitle: { ...prev.content.heroTitle, ar: e.target.value }
                  }
                }))}
                dir="rtl"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Title (English)</label>
              <Input
                value={tempSettings.content.heroTitle.en}
                onChange={(e) => setTempSettings(prev => ({
                  ...prev,
                  content: { 
                    ...prev.content, 
                    heroTitle: { ...prev.content.heroTitle, en: e.target.value }
                  }
                }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Subtitle (Arabic)</label>
              <Textarea
                value={tempSettings.content.heroSubtitle.ar}
                onChange={(e) => setTempSettings(prev => ({
                  ...prev,
                  content: { 
                    ...prev.content, 
                    heroSubtitle: { ...prev.content.heroSubtitle, ar: e.target.value }
                  }
                }))}
                rows={3}
                dir="rtl"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Subtitle (English)</label>
              <Textarea
                value={tempSettings.content.heroSubtitle.en}
                onChange={(e) => setTempSettings(prev => ({
                  ...prev,
                  content: { 
                    ...prev.content, 
                    heroSubtitle: { ...prev.content.heroSubtitle, en: e.target.value }
                  }
                }))}
                rows={3}
              />
            </div>
          </div>

          <ImageUpload
            currentImage={tempSettings.heroImage}
            onImageChange={(imageUrl) => setTempSettings(prev => ({
              ...prev,
              heroImage: imageUrl
            }))}
            label="Hero Background Image"
          />
        </TabsContent>

        <TabsContent value="styling" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Text Color</label>
              <Input type="color" defaultValue="#ffffff" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Background Overlay</label>
              <Select defaultValue="gradient">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="solid">Solid Color</SelectItem>
                  <SelectItem value="gradient">Gradient</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Font Size</label>
              <Select defaultValue="large">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="xl">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Content Alignment</label>
              <Select defaultValue="center">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Section Height</label>
              <Select defaultValue="full">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="half">Half Screen</SelectItem>
                  <SelectItem value="full">Full Screen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="effects" className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Parallax Effect</label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Typing Animation</label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Fade In Animation</label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Particles Background</label>
              <Switch />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderTestimonialsCustomizer = () => (
    <div className="space-y-6">
      <Tabs defaultValue="testimonials" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="styling">Styling</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>

        <TabsContent value="testimonials" className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Manage Testimonials</h4>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Testimonial
            </Button>
          </div>
          
          {tempSettings.testimonials.map((testimonial, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-start mb-3">
                <Badge variant="secondary">Testimonial {index + 1}</Badge>
                <Button variant="ghost" size="sm">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Customer Name"
                  value={testimonial.name}
                  onChange={(e) => {
                    const newTestimonials = [...tempSettings.testimonials];
                    newTestimonials[index] = { ...testimonial, name: e.target.value };
                    setTempSettings(prev => ({ ...prev, testimonials: newTestimonials }));
                  }}
                />
                <Select 
                  value={testimonial.rating.toString()}
                  onValueChange={(value) => {
                    const newTestimonials = [...tempSettings.testimonials];
                    newTestimonials[index] = { ...testimonial, rating: parseInt(value) };
                    setTempSettings(prev => ({ ...prev, testimonials: newTestimonials }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map(rating => (
                      <SelectItem key={rating} value={rating.toString()}>
                        {rating} Star{rating !== 1 ? 's' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Textarea
                className="mt-3"
                placeholder="Testimonial content"
                value={typeof testimonial.content === 'string' ? testimonial.content : testimonial.content.en}
                onChange={(e) => {
                  const newTestimonials = [...tempSettings.testimonials];
                  newTestimonials[index] = { ...testimonial, content: e.target.value };
                  setTempSettings(prev => ({ ...prev, testimonials: newTestimonials }));
                }}
                rows={3}
              />
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="styling" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Card Style</label>
              <Select defaultValue="modern">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Auto-play Speed</label>
              <Select defaultValue="5000">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3000">3 seconds</SelectItem>
                  <SelectItem value="5000">5 seconds</SelectItem>
                  <SelectItem value="7000">7 seconds</SelectItem>
                  <SelectItem value="0">Manual only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Show Navigation Dots</label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Show Arrow Controls</label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Show Customer Photos</label>
              <Switch defaultChecked />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderPackagesCustomizer = () => (
    <div className="space-y-6">
      <Tabs defaultValue="packages" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="packages">Packages</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        <TabsContent value="packages" className="space-y-4">
          {['basic', 'professional', 'premium'].map(packageType => (
            <Card key={packageType} className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium capitalize">{packageType} Package</h4>
                <Badge variant={packageType === 'professional' ? 'default' : 'secondary'}>
                  {packageType === 'professional' ? 'Most Popular' : 'Standard'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Package Name</label>
                  <Input
                    value={tempSettings.packages[packageType as keyof typeof tempSettings.packages]?.name || ''}
                    placeholder={`${packageType} Package`}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Price</label>
                  <Input
                    value={tempSettings.packages[packageType as keyof typeof tempSettings.packages]?.price || ''}
                    onChange={(e) => setTempSettings(prev => ({
                      ...prev,
                      packages: {
                        ...prev.packages,
                        [packageType]: { 
                          ...prev.packages[packageType as keyof typeof prev.packages], 
                          price: e.target.value 
                        }
                      }
                    }))}
                    placeholder="$0"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea placeholder="Package description..." rows={2} />
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Show Currency Symbol</label>
              <Switch defaultChecked />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Currency</label>
              <Select defaultValue="USD">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">$ USD</SelectItem>
                  <SelectItem value="EUR">€ EUR</SelectItem>
                  <SelectItem value="SAR">﷼ SAR</SelectItem>
                  <SelectItem value="AED">د.إ AED</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Show Discount Badge</label>
              <Switch />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Show Feature Checkmarks</label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Feature Comparison Table</label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Highlight Popular Package</label>
              <Switch defaultChecked />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderSectionCustomizer = () => {
    switch (sectionType) {
      case 'hero':
        return renderHeroCustomizer();
      case 'testimonials':
        return renderTestimonialsCustomizer();
      case 'packages':
        return renderPackagesCustomizer();
      default:
        return (
          <div className="text-center py-8 text-gray-500">
            <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Customization options for {sectionName} coming soon...</p>
          </div>
        );
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="flex items-center gap-2">
              {sectionType === 'hero' && <Type className="w-5 h-5" />}
              {sectionType === 'testimonials' && <MessageSquare className="w-5 h-5" />}
              {sectionType === 'packages' && <CreditCard className="w-5 h-5" />}
              {sectionType === 'gallery' && <ImageIcon className="w-5 h-5" />}
              <span>{sectionName}</span>
            </CardTitle>
            <Badge variant="outline">{sectionType}</Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Switch defaultChecked />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          {renderSectionCustomizer()}
          
          <div className="flex justify-end gap-2 pt-6 border-t">
            <Button variant="outline" size="sm">
              <Copy className="w-4 h-4 mr-2" />
              Duplicate Section
            </Button>
            <Button onClick={saveSection} size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
