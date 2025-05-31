
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Settings, Save, Upload } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

export const AdminPanel: React.FC = () => {
  const { settings, updateSettings, isAdminMode } = useAdmin();
  const [tempSettings, setTempSettings] = useState(settings);

  if (!isAdminMode) return null;

  const handleSave = () => {
    updateSettings(tempSettings);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Settings className="w-4 h-4 mr-2" />
            Admin Panel
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Admin Control Panel</SheetTitle>
          </SheetHeader>
          
          <div className="space-y-6 mt-6">
            {/* Hero Section */}
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Hero Image URL</label>
                  <Input
                    value={tempSettings.heroImage}
                    onChange={(e) => setTempSettings({
                      ...tempSettings,
                      heroImage: e.target.value
                    })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Number of Clients</label>
                  <Input
                    value={tempSettings.stats.clients}
                    onChange={(e) => setTempSettings({
                      ...tempSettings,
                      stats: { ...tempSettings.stats, clients: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Success Rate</label>
                  <Input
                    value={tempSettings.stats.successRate}
                    onChange={(e) => setTempSettings({
                      ...tempSettings,
                      stats: { ...tempSettings.stats, successRate: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Years of Experience</label>
                  <Input
                    value={tempSettings.stats.experience}
                    onChange={(e) => setTempSettings({
                      ...tempSettings,
                      stats: { ...tempSettings.stats, experience: e.target.value }
                    })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Package Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Package Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Basic Package Price</label>
                  <Input
                    value={tempSettings.packages.basic.price}
                    onChange={(e) => setTempSettings({
                      ...tempSettings,
                      packages: {
                        ...tempSettings.packages,
                        basic: { ...tempSettings.packages.basic, price: e.target.value }
                      }
                    })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Professional Package Price</label>
                  <Input
                    value={tempSettings.packages.professional.price}
                    onChange={(e) => setTempSettings({
                      ...tempSettings,
                      packages: {
                        ...tempSettings.packages,
                        professional: { ...tempSettings.packages.professional, price: e.target.value }
                      }
                    })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Premium Package Price</label>
                  <Input
                    value={tempSettings.packages.premium.price}
                    onChange={(e) => setTempSettings({
                      ...tempSettings,
                      packages: {
                        ...tempSettings.packages,
                        premium: { ...tempSettings.packages.premium, price: e.target.value }
                      }
                    })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">WhatsApp</label>
                  <Input
                    value={tempSettings.socialLinks.whatsapp}
                    onChange={(e) => setTempSettings({
                      ...tempSettings,
                      socialLinks: { ...tempSettings.socialLinks, whatsapp: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Instagram</label>
                  <Input
                    value={tempSettings.socialLinks.instagram}
                    onChange={(e) => setTempSettings({
                      ...tempSettings,
                      socialLinks: { ...tempSettings.socialLinks, instagram: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    value={tempSettings.socialLinks.phone}
                    onChange={(e) => setTempSettings({
                      ...tempSettings,
                      socialLinks: { ...tempSettings.socialLinks, phone: e.target.value }
                    })}
                  />
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleSave} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
