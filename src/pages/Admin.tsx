
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Upload, Trash2 } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { AnimatedSection } from '@/components/AnimatedSection';
import { AdminAuth } from '@/components/AdminAuth';

const Admin = () => {
  const { settings, updateSettings } = useAdmin();
  const [tempSettings, setTempSettings] = useState(settings);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // If not authenticated, show login
  if (!isAuthenticated) {
    return <AdminAuth onLogin={() => setIsAuthenticated(true)} />;
  }

  const handleSave = () => {
    updateSettings(tempSettings);
    toast({
      title: "Settings Saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleImageUpload = (field: string) => {
    // Placeholder for image upload functionality
    toast({
      title: "Image Upload",
      description: "Image upload functionality would be implemented here.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <div className="container mx-auto px-4 py-8">
        <AnimatedSection animation="fade-up">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Website
            </Button>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Hero Section */}
          <AnimatedSection animation="fade-right" delay={100}>
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Hero Section
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Hero Image</label>
                  <div className="flex gap-2">
                    <Input
                      value={tempSettings.heroImage}
                      onChange={(e) => setTempSettings({
                        ...tempSettings,
                        heroImage: e.target.value
                      })}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      placeholder="Image URL"
                    />
                    <Button
                      variant="outline"
                      onClick={() => handleImageUpload('heroImage')}
                      className="border-gray-300 dark:border-gray-600"
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                  {tempSettings.heroImage && (
                    <div className="mt-2">
                      <img
                        src={tempSettings.heroImage}
                        alt="Hero preview"
                        className="w-32 h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Statistics */}
          <AnimatedSection animation="fade-left" delay={200}>
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Number of Clients</label>
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
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Success Rate</label>
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
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Years of Experience</label>
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
          </AnimatedSection>

          {/* About Section */}
          <AnimatedSection animation="fade-up" delay={300}>
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">About Text</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={tempSettings.aboutText}
                  onChange={(e) => setTempSettings({
                    ...tempSettings,
                    aboutText: e.target.value
                  })}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white min-h-32"
                  placeholder="About text..."
                />
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Package Pricing */}
          <AnimatedSection animation="fade-up" delay={400}>
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Package Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Basic Package Price</label>
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
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Professional Package Price</label>
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
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Premium Package Price</label>
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
          </AnimatedSection>

          {/* Gallery Management */}
          <AnimatedSection animation="fade-right" delay={500}>
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Gallery Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {tempSettings.galleryImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            const newImages = tempSettings.galleryImages.filter((_, i) => i !== index);
                            setTempSettings({
                              ...tempSettings,
                              galleryImages: newImages
                            });
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div 
                    className="h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-green-500 transition-colors duration-200"
                    onClick={() => handleImageUpload('gallery')}
                  >
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Social Links */}
          <AnimatedSection animation="fade-left" delay={600}>
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Social Links</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">WhatsApp</label>
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
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Instagram</label>
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
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Phone</label>
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
          </AnimatedSection>
        </div>

        {/* Save Button */}
        <AnimatedSection animation="scale" delay={700}>
          <div className="mt-8 text-center">
            <Button 
              onClick={handleSave} 
              size="lg"
              className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 transform transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Save className="w-5 h-5 mr-2" />
              Save All Changes
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Admin;
