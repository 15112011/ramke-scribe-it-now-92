
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Save, Languages } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';

interface MultilingualText {
  ar: string;
  en: string;
}

export const MultilingualEditor: React.FC = () => {
  const { settings, updateSettings } = useAdmin();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('content');

  const updateMultilingualText = (path: string, value: MultilingualText) => {
    const keys = path.split('.');
    const newSettings = { ...settings };
    let current = newSettings as any;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    updateSettings(newSettings);
  };

  const updateArrayItem = (path: string, index: number, value: any) => {
    const keys = path.split('.');
    const newSettings = { ...settings };
    let current = newSettings as any;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]][index] = value;
    
    updateSettings(newSettings);
  };

  const addArrayItem = (path: string, defaultValue: any) => {
    const keys = path.split('.');
    const newSettings = { ...settings };
    let current = newSettings as any;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]].push(defaultValue);
    
    updateSettings(newSettings);
  };

  const removeArrayItem = (path: string, index: number) => {
    const keys = path.split('.');
    const newSettings = { ...settings };
    let current = newSettings as any;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]].splice(index, 1);
    
    updateSettings(newSettings);
  };

  const MultilingualInput: React.FC<{
    label: string;
    value: MultilingualText;
    onChange: (value: MultilingualText) => void;
    textarea?: boolean;
  }> = ({ label, value, onChange, textarea = false }) => (
    <div className="space-y-3">
      <label className="text-sm font-medium">{label}</label>
      <Tabs defaultValue="ar" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ar">العربية</TabsTrigger>
          <TabsTrigger value="en">English</TabsTrigger>
        </TabsList>
        <TabsContent value="ar">
          {textarea ? (
            <Textarea
              value={value.ar}
              onChange={(e) => onChange({ ...value, ar: e.target.value })}
              className="text-right"
              dir="rtl"
              rows={3}
            />
          ) : (
            <Input
              value={value.ar}
              onChange={(e) => onChange({ ...value, ar: e.target.value })}
              className="text-right"
              dir="rtl"
            />
          )}
        </TabsContent>
        <TabsContent value="en">
          {textarea ? (
            <Textarea
              value={value.en}
              onChange={(e) => onChange({ ...value, en: e.target.value })}
              rows={3}
            />
          ) : (
            <Input
              value={value.en}
              onChange={(e) => onChange({ ...value, en: e.target.value })}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "All multilingual content has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Languages className="w-5 h-5" />
          <h2 className="text-2xl font-bold">Multilingual Content Editor</h2>
        </div>
        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
          <TabsTrigger value="testimonials">Reviews</TabsTrigger>
          <TabsTrigger value="steps">Steps</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Main Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <MultilingualInput
                label="Hero Title"
                value={settings.content.heroTitle}
                onChange={(value) => updateMultilingualText('content.heroTitle', value)}
              />
              <MultilingualInput
                label="Hero Subtitle"
                value={settings.content.heroSubtitle}
                onChange={(value) => updateMultilingualText('content.heroSubtitle', value)}
                textarea
              />
              <MultilingualInput
                label="About Text"
                value={settings.aboutText}
                onChange={(value) => updateMultilingualText('aboutText', value)}
                textarea
              />
              <MultilingualInput
                label="Contact Title"
                value={settings.content.contactTitle}
                onChange={(value) => updateMultilingualText('content.contactTitle', value)}
              />
              <MultilingualInput
                label="Contact Subtitle"
                value={settings.content.contactSubtitle}
                onChange={(value) => updateMultilingualText('content.contactSubtitle', value)}
                textarea
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="packages" className="space-y-6">
          {['basic', 'professional', 'premium'].map((packageType) => (
            <Card key={packageType}>
              <CardHeader>
                <CardTitle className="capitalize">{packageType} Package</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Price</label>
                  <Input
                    value={settings.packages[packageType as keyof typeof settings.packages].price}
                    onChange={(e) => {
                      const newSettings = { ...settings };
                      newSettings.packages[packageType as keyof typeof settings.packages].price = e.target.value;
                      updateSettings(newSettings);
                    }}
                  />
                </div>
                <MultilingualInput
                  label="Package Name"
                  value={settings.packages[packageType as keyof typeof settings.packages].name}
                  onChange={(value) => updateMultilingualText(`packages.${packageType}.name`, value)}
                />
                <MultilingualInput
                  label="Package Description"
                  value={settings.packages[packageType as keyof typeof settings.packages].description}
                  onChange={(value) => updateMultilingualText(`packages.${packageType}.description`, value)}
                  textarea
                />
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium">Features</label>
                    <Button
                      size="sm"
                      onClick={() => addArrayItem(`packages.${packageType}.features`, { ar: '', en: '' })}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Feature
                    </Button>
                  </div>
                  {settings.packages[packageType as keyof typeof settings.packages].features.map((feature, index) => (
                    <div key={index} className="border p-4 rounded mb-3">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium">Feature {index + 1}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeArrayItem(`packages.${packageType}.features`, index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <MultilingualInput
                        label=""
                        value={feature}
                        onChange={(value) => updateArrayItem(`packages.${packageType}.features`, index, value)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Client Testimonials</CardTitle>
                <Button
                  onClick={() => addArrayItem('testimonials', { name: '', content: { ar: '', en: '' }, rating: 5 })}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Testimonial
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {settings.testimonials.map((testimonial, index) => (
                <div key={index} className="border p-4 rounded">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Testimonial {index + 1}</h4>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeArrayItem('testimonials', index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Client Name</label>
                      <Input
                        value={testimonial.name}
                        onChange={(e) => updateArrayItem('testimonials', index, { ...testimonial, name: e.target.value })}
                      />
                    </div>
                    <MultilingualInput
                      label="Testimonial Content"
                      value={testimonial.content}
                      onChange={(value) => updateArrayItem('testimonials', index, { ...testimonial, content: value })}
                      textarea
                    />
                    <div>
                      <label className="text-sm font-medium mb-2 block">Rating</label>
                      <Input
                        type="number"
                        min="1"
                        max="5"
                        value={testimonial.rating}
                        onChange={(e) => updateArrayItem('testimonials', index, { ...testimonial, rating: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="steps" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Process Steps</CardTitle>
                <Button
                  onClick={() => addArrayItem('steps', { step: (settings.steps.length + 1).toString(), title: { ar: '', en: '' }, description: { ar: '', en: '' } })}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Step
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {settings.steps.map((step, index) => (
                <div key={index} className="border p-4 rounded">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Step {index + 1}</h4>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeArrayItem('steps', index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Step Number</label>
                      <Input
                        value={step.step}
                        onChange={(e) => updateArrayItem('steps', index, { ...step, step: e.target.value })}
                      />
                    </div>
                    <MultilingualInput
                      label="Step Title"
                      value={step.title}
                      onChange={(value) => updateArrayItem('steps', index, { ...step, title: value })}
                    />
                    <MultilingualInput
                      label="Step Description"
                      value={step.description}
                      onChange={(value) => updateArrayItem('steps', index, { ...step, description: value })}
                      textarea
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Results Page</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <MultilingualInput
                label="Results Page Title"
                value={settings.resultsPage.title}
                onChange={(value) => updateMultilingualText('resultsPage.title', value)}
              />
              <MultilingualInput
                label="Results Page Subtitle"
                value={settings.resultsPage.subtitle}
                onChange={(value) => updateMultilingualText('resultsPage.subtitle', value)}
                textarea
              />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium">Result Cards</label>
                  <Button
                    onClick={() => addArrayItem('resultsPage.cards', {
                      title: { ar: '', en: '' },
                      description: { ar: '', en: '' },
                      image: '',
                      stats: { before: '', after: '', duration: { ar: '', en: '' } }
                    })}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Result Card
                  </Button>
                </div>
                {settings.resultsPage.cards.map((card, index) => (
                  <div key={index} className="border p-4 rounded mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Result Card {index + 1}</h4>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeArrayItem('resultsPage.cards', index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <MultilingualInput
                        label="Card Title"
                        value={card.title}
                        onChange={(value) => updateArrayItem('resultsPage.cards', index, { ...card, title: value })}
                      />
                      <MultilingualInput
                        label="Card Description"
                        value={card.description}
                        onChange={(value) => updateArrayItem('resultsPage.cards', index, { ...card, description: value })}
                        textarea
                      />
                      <div>
                        <label className="text-sm font-medium mb-2 block">Image URL</label>
                        <Input
                          value={card.image}
                          onChange={(e) => updateArrayItem('resultsPage.cards', index, { ...card, image: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Before Stats</label>
                          <Input
                            value={card.stats.before}
                            onChange={(e) => updateArrayItem('resultsPage.cards', index, { 
                              ...card, 
                              stats: { ...card.stats, before: e.target.value } 
                            })}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">After Stats</label>
                          <Input
                            value={card.stats.after}
                            onChange={(e) => updateArrayItem('resultsPage.cards', index, { 
                              ...card, 
                              stats: { ...card.stats, after: e.target.value } 
                            })}
                          />
                        </div>
                      </div>
                      <MultilingualInput
                        label="Duration"
                        value={card.stats.duration}
                        onChange={(value) => updateArrayItem('resultsPage.cards', index, { 
                          ...card, 
                          stats: { ...card.stats, duration: value } 
                        })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">Instapay Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Instapay Number</label>
                    <Input
                      value={settings.paymentMethods.instapay.number}
                      onChange={(e) => {
                        const newSettings = { ...settings };
                        newSettings.paymentMethods.instapay.number = e.target.value;
                        updateSettings(newSettings);
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Account Holder Name</label>
                    <Input
                      value={settings.paymentMethods.instapay.name}
                      onChange={(e) => {
                        const newSettings = { ...settings };
                        newSettings.paymentMethods.instapay.name = e.target.value;
                        updateSettings(newSettings);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-4">Vodafone Cash Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Vodafone Cash Number</label>
                    <Input
                      value={settings.paymentMethods.vodafoneCash.number}
                      onChange={(e) => {
                        const newSettings = { ...settings };
                        newSettings.paymentMethods.vodafoneCash.number = e.target.value;
                        updateSettings(newSettings);
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Account Holder Name</label>
                    <Input
                      value={settings.paymentMethods.vodafoneCash.name}
                      onChange={(e) => {
                        const newSettings = { ...settings };
                        newSettings.paymentMethods.vodafoneCash.name = e.target.value;
                        updateSettings(newSettings);
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
