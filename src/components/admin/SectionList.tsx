
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Edit, Trash2, GripVertical, Plus } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';
import { SectionEditor } from './SectionEditor';

interface Section {
  id: string;
  name: string;
  type: 'hero' | 'gallery' | 'stats' | 'about' | 'packages' | 'testimonials' | 'steps' | 'contact';
  enabled: boolean;
  order: number;
  content: any;
}

export const SectionList: React.FC = () => {
  const { settings, updateSettings } = useAdmin();
  const { toast } = useToast();
  
  const [sections, setSections] = useState<Section[]>([
    { id: 'hero', name: 'Hero Section', type: 'hero', enabled: true, order: 1, content: { title: settings.content.heroTitle, subtitle: settings.content.heroSubtitle, image: settings.heroImage } },
    { id: 'gallery', name: 'Gallery', type: 'gallery', enabled: true, order: 2, content: { images: settings.galleryImages } },
    { id: 'stats', name: 'Statistics', type: 'stats', enabled: true, order: 3, content: settings.stats },
    { id: 'about', name: 'About Section', type: 'about', enabled: true, order: 4, content: { text: settings.aboutText } },
    { id: 'packages', name: 'Packages', type: 'packages', enabled: true, order: 5, content: settings.packages },
    { id: 'testimonials', name: 'Testimonials', type: 'testimonials', enabled: true, order: 6, content: settings.testimonials },
    { id: 'steps', name: 'Process Steps', type: 'steps', enabled: true, order: 7, content: settings.steps },
    { id: 'contact', name: 'Contact Section', type: 'contact', enabled: true, order: 8, content: { title: settings.content.contactTitle, subtitle: settings.content.contactSubtitle } }
  ]);

  const [editingSection, setEditingSection] = useState<Section | null>(null);

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

  const openEditDialog = (section: Section) => {
    setEditingSection(section);
  };

  const saveSection = (updatedSection: Section) => {
    setSections(prev => prev.map(section => 
      section.id === updatedSection.id ? updatedSection : section
    ));

    // Update the main settings based on section type
    const newSettings = { ...settings };
    
    switch (updatedSection.type) {
      case 'hero':
        newSettings.content.heroTitle = updatedSection.content.title;
        newSettings.content.heroSubtitle = updatedSection.content.subtitle;
        newSettings.heroImage = updatedSection.content.image;
        break;
      case 'about':
        newSettings.aboutText = updatedSection.content.text;
        break;
      case 'stats':
        newSettings.stats = updatedSection.content;
        break;
      case 'packages':
        newSettings.packages = updatedSection.content;
        break;
      case 'contact':
        newSettings.content.contactTitle = updatedSection.content.title;
        newSettings.content.contactSubtitle = updatedSection.content.subtitle;
        break;
    }

    updateSettings(newSettings);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GripVertical className="w-5 h-5" />
            All Sections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {sections
                    .sort((a, b) => a.order - b.order)
                    .map((section, index) => (
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
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-gray-800 dark:text-white">
                                    {section.name}
                                  </h3>
                                  <Badge variant="secondary" className="text-xs capitalize">
                                    {section.type}
                                  </Badge>
                                  <Badge variant={section.enabled ? "default" : "destructive"} className="text-xs">
                                    {section.enabled ? "Active" : "Disabled"}
                                  </Badge>
                                </div>
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
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditDialog(section)}
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteSection(section.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                disabled={['hero', 'gallery', 'stats', 'about'].includes(section.id)}
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

      {editingSection && (
        <SectionEditor
          section={editingSection}
          isOpen={!!editingSection}
          onClose={() => setEditingSection(null)}
          onSave={saveSection}
        />
      )}
    </div>
  );
};
