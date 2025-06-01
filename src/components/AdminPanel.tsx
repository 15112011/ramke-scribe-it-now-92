
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Save, Layout, Image, DollarSign, MessageSquare, Lock, LogOut } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';
import { SectionManager } from './SectionManager';
import { AdminAuth } from './AdminAuth';

export const AdminPanel: React.FC = () => {
  const { settings, updateSettings, isAdminMode } = useAdmin();
  const [tempSettings, setTempSettings] = useState(settings);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  console.log('AdminPanel rendered, isAdminMode:', isAdminMode);

  if (!isAdminMode) {
    console.log('Admin mode is OFF, not rendering panel');
    return null;
  }

  if (!isAuthenticated) {
    return <AdminAuth onLogin={() => setIsAuthenticated(true)} />;
  }

  console.log('Admin mode is ON, rendering panel');

  const handleSave = () => {
    updateSettings(tempSettings);
    toast({
      title: "Settings Saved",
      description: "Your changes have been saved successfully.",
    });
    console.log('Settings saved:', tempSettings);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast({
      title: "Logged Out",
      description: "You have been logged out of the admin panel.",
    });
  };

  return (
    <div className="fixed top-20 right-4 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-lg">
            <Settings className="w-4 h-4 mr-2" />
            Admin Panel
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[90vw] sm:w-[400px] lg:w-[600px] overflow-y-auto bg-white dark:bg-gray-900">
          <SheetHeader>
            <div className="flex items-center justify-between">
              <SheetTitle className="text-gray-900 dark:text-white">Admin Control Panel</SheetTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </SheetHeader>
          
          <Tabs defaultValue="content" className="mt-6">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="content" className="text-xs sm:text-sm">
                <Settings className="w-4 h-4 mr-1" />
                Content
              </TabsTrigger>
              <TabsTrigger value="sections" className="text-xs sm:text-sm">
                <Layout className="w-4 h-4 mr-1" />
                Sections
              </TabsTrigger>
              <TabsTrigger value="media" className="text-xs sm:text-sm">
                <Image className="w-4 h-4 mr-1" />
                Media
              </TabsTrigger>
              <TabsTrigger value="pricing" className="text-xs sm:text-sm">
                <DollarSign className="w-4 h-4 mr-1" />
                Pricing
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              {/* Hero Section */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Hero Image URL</label>
                    <Input
                      value={tempSettings.heroImage}
                      onChange={(e) => setTempSettings({
                        ...tempSettings,
                        heroImage: e.target.value
                      })}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Statistics */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Number of Clients</label>
                    <Input
                      value={tempSettings.stats.clients}
                      onChange={(e) => setTempSettings({
                        ...tempSettings,
                        stats: { ...tempSettings.stats, clients: e.target.value }
                      })}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Success Rate</label>
                    <Input
                      value={tempSettings.stats.successRate}
                      onChange={(e) => setTempSettings({
                        ...tempSettings,
                        stats: { ...tempSettings.stats, successRate: e.target.value }
                      })}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Years of Experience</label>
                    <Input
                      value={tempSettings.stats.experience}
                      onChange={(e) => setTempSettings({
                        ...tempSettings,
                        stats: { ...tempSettings.stats, experience: e.target.value }
                      })}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sections">
              <SectionManager />
            </TabsContent>

            <TabsContent value="media" className="space-y-6">
              {/* Media Management */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Gallery Images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {settings.galleryImages.map((image, index) => (
                    <div key={index}>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Image {index + 1} URL</label>
                      <Input
                        value={image}
                        onChange={(e) => {
                          const newImages = [...tempSettings.galleryImages];
                          newImages[index] = e.target.value;
                          setTempSettings({
                            ...tempSettings,
                            galleryImages: newImages
                          });
                        }}
                        className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6">
              {/* Package Pricing */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Package Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Basic Package Price</label>
                    <Input
                      value={tempSettings.packages.basic.price}
                      onChange={(e) => setTempSettings({
                        ...tempSettings,
                        packages: {
                          ...tempSettings.packages,
                          basic: { ...tempSettings.packages.basic, price: e.target.value }
                        }
                      })}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Professional Package Price</label>
                    <Input
                      value={tempSettings.packages.professional.price}
                      onChange={(e) => setTempSettings({
                        ...tempSettings,
                        packages: {
                          ...tempSettings.packages,
                          professional: { ...tempSettings.packages.professional, price: e.target.value }
                        }
                      })}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Premium Package Price</label>
                    <Input
                      value={tempSettings.packages.premium.price}
                      onChange={(e) => setTempSettings({
                        ...tempSettings,
                        packages: {
                          ...tempSettings.packages,
                          premium: { ...tempSettings.packages.premium, price: e.target.value }
                        }
                      })}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Social Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">WhatsApp</label>
                    <Input
                      value={tempSettings.socialLinks.whatsapp}
                      onChange={(e) => setTempSettings({
                        ...tempSettings,
                        socialLinks: { ...tempSettings.socialLinks, whatsapp: e.target.value }
                      })}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Instagram</label>
                    <Input
                      value={tempSettings.socialLinks.instagram}
                      onChange={(e) => setTempSettings({
                        ...tempSettings,
                        socialLinks: { ...tempSettings.socialLinks, instagram: e.target.value }
                      })}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                    <Input
                      value={tempSettings.socialLinks.phone}
                      onChange={(e) => setTempSettings({
                        ...tempSettings,
                        socialLinks: { ...tempSettings.socialLinks, phone: e.target.value }
                      })}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Button onClick={handleSave} className="w-full mt-6 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </SheetContent>
      </Sheet>
    </div>
  );
};
