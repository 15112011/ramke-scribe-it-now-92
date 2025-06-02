
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Settings, 
  Languages, 
  CreditCard, 
  Users, 
  BarChart3, 
  Image,
  MessageSquare,
  Layers,
  Type,
  Layout,
  Palette,
  Globe,
  Smartphone
} from 'lucide-react';
import { MultilingualEditor } from './MultilingualEditor';
import { SubscriptionRequests } from './SubscriptionRequests';
import { SectionCustomizer } from './SectionCustomizer';
import { useSections } from '@/contexts/SectionsContext';

export const ComprehensiveAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('sections');
  const { sections } = useSections();

  // Define which sections should have customizers
  const customizableSections = [
    { id: 'hero', name: 'Hero Section', type: 'hero', hasCustomizer: true },
    { id: 'gallery', name: 'Gallery', type: 'gallery', hasCustomizer: false },
    { id: 'stats', name: 'Statistics', type: 'stats', hasCustomizer: false },
    { id: 'about', name: 'About Section', type: 'about', hasCustomizer: false },
    { id: 'video', name: 'Video Preview', type: 'video', hasCustomizer: false },
    { id: 'results', name: 'Before/After Results', type: 'results', hasCustomizer: false },
    { id: 'packages', name: 'Packages', type: 'packages', hasCustomizer: true },
    { id: 'steps', name: 'Process Steps', type: 'steps', hasCustomizer: false },
    { id: 'testimonials', name: 'Testimonials', type: 'testimonials', hasCustomizer: true },
    { id: 'contact', name: 'Contact Section', type: 'contact', hasCustomizer: false }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Website Administration
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage all aspects of your website with section-specific controls
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="sections" className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">Sections</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Languages className="w-4 h-4" />
            <span className="hidden sm:inline">Content</span>
          </TabsTrigger>
          <TabsTrigger value="design" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Design</span>
          </TabsTrigger>
          <TabsTrigger value="subscriptions" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            <span className="hidden sm:inline">Subscriptions</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="mt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                      <Layout className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Active Sections</p>
                      <p className="text-2xl font-bold">{sections.filter(s => s.enabled).length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Languages</p>
                      <p className="text-2xl font-bold">2</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Mobile Ready</p>
                      <p className="text-2xl font-bold">100%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-semibold mb-4">Section Customization</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Customize each section of your website with dedicated controls and options.
              </p>
              
              {customizableSections.map(section => (
                <SectionCustomizer
                  key={section.id}
                  sectionId={section.id}
                  sectionName={section.name}
                  sectionType={section.type}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          <MultilingualEditor />
        </TabsContent>

        <TabsContent value="design" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Color Scheme
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Primary Color</label>
                    <input type="color" className="w-full h-10 rounded border" defaultValue="#10b981" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Secondary Color</label>
                    <input type="color" className="w-full h-10 rounded border" defaultValue="#3b82f6" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Accent Color</label>
                    <input type="color" className="w-full h-10 rounded border" defaultValue="#f59e0b" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="w-5 h-5" />
                  Typography
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Primary Font</label>
                  <select className="w-full p-2 border rounded">
                    <option>Inter</option>
                    <option>Roboto</option>
                    <option>Open Sans</option>
                    <option>Poppins</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Heading Font</label>
                  <select className="w-full p-2 border rounded">
                    <option>Inter</option>
                    <option>Playfair Display</option>
                    <option>Montserrat</option>
                    <option>Merriweather</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subscriptions" className="mt-6">
          <SubscriptionRequests />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
            <p className="text-gray-600">Analytics and reporting features coming soon...</p>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Site Title</label>
                  <input type="text" className="w-full p-2 border rounded" defaultValue="Your Website" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Site Description</label>
                  <textarea className="w-full p-2 border rounded" rows={3} defaultValue="Your website description"></textarea>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Meta Keywords</label>
                  <input type="text" className="w-full p-2 border rounded" placeholder="keyword1, keyword2, keyword3" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Google Analytics ID</label>
                  <input type="text" className="w-full p-2 border rounded" placeholder="GA-XXXXXX-X" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
