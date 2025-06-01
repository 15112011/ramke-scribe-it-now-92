
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GripVertical, Edit, Trash2, Plus, Save } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';

interface Section {
  id: string;
  name: string;
  title: string;
  enabled: boolean;
  order: number;
  editable: boolean;
}

export const SectionManager: React.FC = () => {
  const { settings, updateSettings } = useAdmin();
  const { toast } = useToast();
  
  const [sections, setSections] = useState<Section[]>([
    { id: 'hero', name: 'Hero Section', title: 'Hero', enabled: true, order: 1, editable: true },
    { id: 'gallery', name: 'Gallery', title: 'Gallery', enabled: true, order: 2, editable: false },
    { id: 'stats', name: 'Statistics', title: 'Stats', enabled: true, order: 3, editable: true },
    { id: 'about', name: 'About Section', title: 'About', enabled: true, order: 4, editable: true },
    { id: 'videos', name: 'Video Previews', title: 'Videos', enabled: true, order: 5, editable: false },
    { id: 'results', name: 'Before/After Results', title: 'Results', enabled: true, order: 6, editable: false },
    { id: 'packages', name: 'Packages', title: 'Packages', enabled: true, order: 7, editable: true },
    { id: 'steps', name: 'Steps', title: 'Process', enabled: true, order: 8, editable: false },
    { id: 'testimonials', name: 'Testimonials', title: 'Reviews', enabled: true, order: 9, editable: true },
    { id: 'contact', name: 'Contact Section', title: 'Contact', enabled: true, order: 10, editable: true }
  ]);

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [tempSettings, setTempSettings] = useState(settings);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedSections = items.map((item, index) => ({
      ...item,
      order: index + 1
    }));

    setSections(updatedSections);
    toast({
      title: "Section Order Updated",
      description: "The section order has been saved successfully."
    });
  };

  const toggleSection = (sectionId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, enabled: !section.enabled }
        : section
    ));
  };

  const deleteSection = (sectionId: string) => {
    setSections(prev => prev.filter(section => section.id !== sectionId));
    toast({
      title: "Section Deleted",
      description: "The section has been removed successfully."
    });
  };

  const saveSettings = () => {
    updateSettings(tempSettings);
    toast({
      title: "Settings Saved",
      description: "Your changes have been saved successfully."
    });
  };

  return (
    <div className="space-y-6">
      {/* Section Order Management */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <GripVertical className="w-5 h-5" />
            Section Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {sections.map((section, index) => (
                    <Draggable key={section.id} draggableId={section.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border-2 transition-all duration-200 ${
                            snapshot.isDragging ? 'border-emerald-500 shadow-lg scale-105' : 'border-gray-200 dark:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div {...provided.dragHandleProps} className="cursor-grab hover:cursor-grabbing">
                                <GripVertical className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                              </div>
                              
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-800 dark:text-white">
                                  {section.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  Order: {section.order}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={section.enabled}
                                onCheckedChange={() => toggleSection(section.id)}
                              />
                              
                              {section.editable && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditingSection(section.id)}
                                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                              )}
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteSection(section.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </CardContent>
      </Card>

      {/* Content Editing */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Content Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Hero Image */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Hero Image URL</label>
            <Input
              value={tempSettings.heroImage}
              onChange={(e) => setTempSettings({
                ...tempSettings,
                heroImage: e.target.value
              })}
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* About Text */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">About Text</label>
            <Textarea
              value={tempSettings.aboutText}
              onChange={(e) => setTempSettings({
                ...tempSettings,
                aboutText: e.target.value
              })}
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 min-h-24"
            />
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Clients</label>
              <Input
                value={tempSettings.stats.clients}
                onChange={(e) => setTempSettings({
                  ...tempSettings,
                  stats: { ...tempSettings.stats, clients: e.target.value }
                })}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
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
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Experience</label>
              <Input
                value={tempSettings.stats.experience}
                onChange={(e) => setTempSettings({
                  ...tempSettings,
                  stats: { ...tempSettings.stats, experience: e.target.value }
                })}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          {/* Package Pricing */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Basic Price</label>
              <Input
                value={tempSettings.packages.basic.price}
                onChange={(e) => setTempSettings({
                  ...tempSettings,
                  packages: {
                    ...tempSettings.packages,
                    basic: { ...tempSettings.packages.basic, price: e.target.value }
                  }
                })}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Professional Price</label>
              <Input
                value={tempSettings.packages.professional.price}
                onChange={(e) => setTempSettings({
                  ...tempSettings,
                  packages: {
                    ...tempSettings.packages,
                    professional: { ...tempSettings.packages.professional, price: e.target.value }
                  }
                })}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Premium Price</label>
              <Input
                value={tempSettings.packages.premium.price}
                onChange={(e) => setTempSettings({
                  ...tempSettings,
                  packages: {
                    ...tempSettings.packages,
                    premium: { ...tempSettings.packages.premium, price: e.target.value }
                  }
                })}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">WhatsApp</label>
              <Input
                value={tempSettings.socialLinks.whatsapp}
                onChange={(e) => setTempSettings({
                  ...tempSettings,
                  socialLinks: { ...tempSettings.socialLinks, whatsapp: e.target.value }
                })}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
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
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
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
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          <Button onClick={saveSettings} className="w-full bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
