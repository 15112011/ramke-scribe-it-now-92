
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Settings, Database } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';
import { AdminSectionCRUD } from './AdminSectionCRUD';

export const SectionManager: React.FC = () => {
  const { settings, updateSettings } = useAdmin();
  const { toast } = useToast();
  const [tempSettings, setTempSettings] = React.useState(settings);

  React.useEffect(() => {
    setTempSettings(settings);
  }, [settings]);

  const saveSettings = () => {
    updateSettings(tempSettings);
    toast({
      title: "Settings Saved",
      description: "Your changes have been saved successfully."
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="sections" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sections" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Section CRUD
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Content Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="space-y-6">
          <AdminSectionCRUD />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Content Settings */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Content Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Hero Content */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Hero Section</h3>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Hero Title</label>
                  <Input
                    value={tempSettings.content.heroTitle}
                    onChange={(e) => setTempSettings(prev => ({
                      ...prev,
                      content: { ...prev.content, heroTitle: e.target.value }
                    }))}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Hero Subtitle</label>
                  <Textarea
                    value={tempSettings.content.heroSubtitle}
                    onChange={(e) => setTempSettings(prev => ({
                      ...prev,
                      content: { ...prev.content, heroSubtitle: e.target.value }
                    }))}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Hero Image URL</label>
                  <Input
                    value={tempSettings.heroImage}
                    onChange={(e) => setTempSettings(prev => ({
                      ...prev,
                      heroImage: e.target.value
                    }))}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>

              {/* About Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">About Section</h3>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">About Text</label>
                  <Textarea
                    value={tempSettings.aboutText}
                    onChange={(e) => setTempSettings(prev => ({
                      ...prev,
                      aboutText: e.target.value
                    }))}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    rows={4}
                  />
                </div>
              </div>

              {/* Statistics */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Statistics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Clients</label>
                    <Input
                      value={tempSettings.stats.clients}
                      onChange={(e) => setTempSettings(prev => ({
                        ...prev,
                        stats: { ...prev.stats, clients: e.target.value }
                      }))}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Success Rate</label>
                    <Input
                      value={tempSettings.stats.successRate}
                      onChange={(e) => setTempSettings(prev => ({
                        ...prev,
                        stats: { ...prev.stats, successRate: e.target.value }
                      }))}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Experience</label>
                    <Input
                      value={tempSettings.stats.experience}
                      onChange={(e) => setTempSettings(prev => ({
                        ...prev,
                        stats: { ...prev.stats, experience: e.target.value }
                      }))}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Package Pricing */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Package Pricing</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Basic Price</label>
                    <Input
                      value={tempSettings.packages.basic.price}
                      onChange={(e) => setTempSettings(prev => ({
                        ...prev,
                        packages: {
                          ...prev.packages,
                          basic: { ...prev.packages.basic, price: e.target.value }
                        }
                      }))}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Professional Price</label>
                    <Input
                      value={tempSettings.packages.professional.price}
                      onChange={(e) => setTempSettings(prev => ({
                        ...prev,
                        packages: {
                          ...prev.packages,
                          professional: { ...prev.packages.professional, price: e.target.value }
                        }
                      }))}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Premium Price</label>
                    <Input
                      value={tempSettings.packages.premium.price}
                      onChange={(e) => setTempSettings(prev => ({
                        ...prev,
                        packages: {
                          ...prev.packages,
                          premium: { ...prev.packages.premium, price: e.target.value }
                        }
                      }))}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Social Links</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">WhatsApp</label>
                    <Input
                      value={tempSettings.socialLinks.whatsapp}
                      onChange={(e) => setTempSettings(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, whatsapp: e.target.value }
                      }))}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Instagram</label>
                    <Input
                      value={tempSettings.socialLinks.instagram}
                      onChange={(e) => setTempSettings(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, instagram: e.target.value }
                      }))}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Phone</label>
                    <Input
                      value={tempSettings.socialLinks.phone}
                      onChange={(e) => setTempSettings(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, phone: e.target.value }
                      }))}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>

              <Button onClick={saveSettings} className="w-full bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Save All Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
