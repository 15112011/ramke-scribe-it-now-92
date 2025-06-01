
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Edit, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSections, SectionConfig } from '@/contexts/SectionsContext';
import { useToast } from '@/hooks/use-toast';
import { SectionEditor } from './SectionEditor';

// Interface for the legacy SectionEditor component
interface LegacySection {
  id: string;
  name: string;
  type: 'hero' | 'gallery' | 'stats' | 'about' | 'packages' | 'testimonials' | 'steps' | 'contact' | 'video' | 'results';
  enabled: boolean;
  content: any;
}

export const SectionList: React.FC = () => {
  const { sections, toggleSection, reorderSections } = useSections();
  const { toast } = useToast();
  const [editingSection, setEditingSection] = useState<LegacySection | null>(null);

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

  const convertToLegacySection = (section: SectionConfig): LegacySection => {
    return {
      id: section.id,
      name: section.name,
      type: section.type,
      enabled: section.enabled,
      content: {}
    };
  };

  const handleSaveSection = (updatedSection: LegacySection) => {
    console.log('SectionList: Saving updated section', updatedSection);
    setEditingSection(null);
    
    toast({
      title: "Section Updated",
      description: `${updatedSection.name} has been updated successfully.`
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GripVertical className="w-5 h-5" />
            Website Sections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Drag and drop sections to reorder them. Toggle switches to enable/disable sections on your website.
            </p>
          </div>

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
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-gray-800 dark:text-white">
                                    {section.name}
                                  </h3>
                                  <Badge variant="secondary" className="text-xs">
                                    {section.type}
                                  </Badge>
                                  {section.enabled && (
                                    <Badge variant="default" className="text-xs bg-green-500">
                                      Active
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  Order: {section.order} • {section.enabled ? 'Visible on website' : 'Hidden from website'}
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
                                onClick={() => setEditingSection(convertToLegacySection(section))}
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                title="Edit Section"
                              >
                                <Edit className="w-4 h-4" />
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

      {/* Section Editor */}
      {editingSection && (
        <SectionEditor
          section={editingSection}
          isOpen={!!editingSection}
          onClose={() => setEditingSection(null)}
          onSave={handleSaveSection}
        />
      )}
    </div>
  );
};
