
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Edit, Trash2, GripVertical, Plus } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSections } from '@/contexts/SectionsContext';
import { useToast } from '@/hooks/use-toast';
import { SectionEditor } from './SectionEditor';

export const SectionList: React.FC = () => {
  const { sections, toggleSection, reorderSections, getSectionById } = useSections();
  const { toast } = useToast();
  const [editingSection, setEditingSection] = useState<any>(null);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    reorderSections(items);
    toast({
      title: "Section Order Updated",
      description: "The section order has been saved successfully."
    });
  };

  const handleToggleSection = (sectionId: string) => {
    toggleSection(sectionId);
    const section = getSectionById(sectionId);
    toast({
      title: "Section Updated",
      description: `${section?.name} has been ${section?.enabled ? 'disabled' : 'enabled'}.`
    });
  };

  const deleteSection = (sectionId: string) => {
    // Don't allow deletion of core sections
    if (['hero', 'gallery', 'stats', 'about', 'packages', 'contact'].includes(sectionId)) {
      toast({
        title: "Cannot Delete",
        description: "Core sections cannot be deleted.",
        variant: "destructive"
      });
      return;
    }
    
    // For now, we'll just disable the section instead of deleting it
    const section = getSectionById(sectionId);
    if (section && section.enabled) {
      toggleSection(sectionId);
      toast({
        title: "Section Disabled",
        description: "The section has been disabled. Use the toggle to re-enable it."
      });
    }
  };

  const openEditDialog = (section: any) => {
    setEditingSection(section);
  };

  const saveSection = (updatedSection: any) => {
    console.log('Section saved:', updatedSection);
    setEditingSection(null);
    toast({
      title: "Section Saved",
      description: `${updatedSection.name} has been updated successfully.`
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GripVertical className="w-5 h-5" />
            All Sections ({sections.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Live Control:</strong> Changes made here will immediately affect the main website at "/". 
              Disabled sections will not appear on the site, and the order here determines the display order.
            </p>
          </div>
          
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
                          } ${!section.enabled ? 'opacity-60' : ''}`}
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
                                  Order: {section.order} | Component: {section.component}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {section.enabled ? (
                                  <Eye className="w-4 h-4 text-green-600" />
                                ) : (
                                  <EyeOff className="w-4 h-4 text-red-600" />
                                )}
                                <Switch
                                  checked={section.enabled}
                                  onCheckedChange={() => handleToggleSection(section.id)}
                                />
                              </div>
                              
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
                                disabled={['hero', 'gallery', 'stats', 'about', 'packages', 'contact'].includes(section.id)}
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
