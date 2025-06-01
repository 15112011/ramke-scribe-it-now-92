
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GripVertical, Eye, EyeOff, Edit, Trash2, Plus } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';

interface Section {
  id: string;
  name: string;
  title: string;
  enabled: boolean;
  order: number;
  content: any;
}

export const SectionManager: React.FC = () => {
  const { settings, updateSettings } = useAdmin();
  const { toast } = useToast();
  
  const [sections, setSections] = useState<Section[]>([
    { id: 'hero', name: 'Hero Section', title: 'Hero', enabled: true, order: 1, content: settings.content },
    { id: 'stats', name: 'Statistics', title: 'Stats', enabled: true, order: 2, content: settings.stats },
    { id: 'about', name: 'About Section', title: 'About', enabled: true, order: 3, content: { aboutText: settings.aboutText } },
    { id: 'videos', name: 'Video Previews', title: 'Videos', enabled: true, order: 4, content: {} },
    { id: 'packages', name: 'Packages', title: 'Packages', enabled: true, order: 5, content: settings.packages },
    { id: 'testimonials', name: 'Testimonials', title: 'Reviews', enabled: true, order: 6, content: settings.testimonials },
    { id: 'contact', name: 'Contact Section', title: 'Contact', enabled: true, order: 7, content: settings.socialLinks }
  ]);

  const [editingSection, setEditingSection] = useState<string | null>(null);

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

  return (
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
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingSection(section.id)}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            
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
                        
                        {editingSection === section.id && (
                          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded border space-y-4">
                            <div>
                              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Section Title</label>
                              <Input
                                value={section.title}
                                onChange={(e) => setSections(prev => prev.map(s => 
                                  s.id === section.id ? { ...s, title: e.target.value } : s
                                ))}
                                className="mt-1"
                              />
                            </div>
                            
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => setEditingSection(null)}
                                className="bg-emerald-500 hover:bg-emerald-600"
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingSection(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        
        <Button className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600">
          <Plus className="w-4 h-4 mr-2" />
          Add New Section
        </Button>
      </CardContent>
    </Card>
  );
};
