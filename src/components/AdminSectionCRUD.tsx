
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Save, Upload, X, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';

interface Section {
  id: string;
  name: string;
  title: string;
  enabled: boolean;
  order: number;
  type: 'text' | 'image' | 'gallery' | 'stats' | 'testimonial' | 'package' | 'step';
  content: any;
}

interface TestimonialForm {
  name: string;
  content: string;
  rating: number;
  image?: string;
}

interface PackageForm {
  name: string;
  price: string;
  features: string[];
  popular: boolean;
}

interface StepForm {
  step: string;
  title: string;
  description: string;
  icon?: string;
}

export const AdminSectionCRUD: React.FC = () => {
  const { settings, updateSettings } = useAdmin();
  const { toast } = useToast();
  
  const [sections, setSections] = useState<Section[]>([
    { id: 'hero', name: 'Hero Section', title: 'Hero', enabled: true, order: 1, type: 'text', content: { title: settings.content.heroTitle, subtitle: settings.content.heroSubtitle, image: settings.heroImage } },
    { id: 'gallery', name: 'Gallery', title: 'Gallery', enabled: true, order: 2, type: 'gallery', content: { images: settings.galleryImages } },
    { id: 'stats', name: 'Statistics', title: 'Stats', enabled: true, order: 3, type: 'stats', content: settings.stats },
    { id: 'about', name: 'About Section', title: 'About', enabled: true, order: 4, type: 'text', content: { text: settings.aboutText } },
    { id: 'packages', name: 'Packages', title: 'Packages', enabled: true, order: 5, type: 'package', content: settings.packages },
    { id: 'testimonials', name: 'Testimonials', title: 'Reviews', enabled: true, order: 6, type: 'testimonial', content: settings.testimonials },
    { id: 'steps', name: 'Steps', title: 'Process', enabled: true, order: 7, type: 'step', content: settings.steps },
    { id: 'contact', name: 'Contact Section', title: 'Contact', enabled: true, order: 8, type: 'text', content: { title: settings.content.contactTitle, subtitle: settings.content.contactSubtitle } }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Testimonial form state
  const [testimonialForm, setTestimonialForm] = useState<TestimonialForm>({ name: '', content: '', rating: 5 });
  
  // Package form state
  const [packageForm, setPackageForm] = useState<PackageForm>({ name: '', price: '', features: [''], popular: false });
  
  // Step form state
  const [stepForm, setStepForm] = useState<StepForm>({ step: '', title: '', description: '' });

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
    setIsCreating(false);
    
    // Set form data based on section type
    if (section.type === 'testimonial') {
      setTestimonialForm(section.content || { name: '', content: '', rating: 5 });
    } else if (section.type === 'package') {
      setPackageForm(section.content || { name: '', price: '', features: [''], popular: false });
    } else if (section.type === 'step') {
      setStepForm(section.content || { step: '', title: '', description: '' });
    }
    
    setIsDialogOpen(true);
  };

  const openCreateDialog = (type: Section['type']) => {
    const newSection: Section = {
      id: `new_${Date.now()}`,
      name: `New ${type} Section`,
      title: `New ${type}`,
      enabled: true,
      order: sections.length + 1,
      type,
      content: {}
    };
    
    setEditingSection(newSection);
    setIsCreating(true);
    
    // Reset forms
    setTestimonialForm({ name: '', content: '', rating: 5 });
    setPackageForm({ name: '', price: '', features: [''], popular: false });
    setStepForm({ step: '', title: '', description: '' });
    
    setIsDialogOpen(true);
  };

  const saveSection = () => {
    if (!editingSection) return;

    let updatedContent = editingSection.content;

    // Update content based on section type
    if (editingSection.type === 'testimonial') {
      updatedContent = testimonialForm;
    } else if (editingSection.type === 'package') {
      updatedContent = packageForm;
    } else if (editingSection.type === 'step') {
      updatedContent = stepForm;
    }

    const updatedSection = { ...editingSection, content: updatedContent };

    if (isCreating) {
      setSections(prev => [...prev, updatedSection]);
    } else {
      setSections(prev => prev.map(section => 
        section.id === editingSection.id ? updatedSection : section
      ));
    }

    setIsDialogOpen(false);
    setEditingSection(null);
    
    toast({
      title: isCreating ? "Section Created" : "Section Updated",
      description: `The section has been ${isCreating ? 'created' : 'updated'} successfully.`
    });
  };

  const addPackageFeature = () => {
    setPackageForm(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updatePackageFeature = (index: number, value: string) => {
    setPackageForm(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const removePackageFeature = (index: number) => {
    setPackageForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const renderSectionForm = () => {
    if (!editingSection) return null;

    switch (editingSection.type) {
      case 'testimonial':
        return (
          <div className="space-y-4">
            <Input
              placeholder="Customer Name"
              value={testimonialForm.name}
              onChange={(e) => setTestimonialForm(prev => ({ ...prev, name: e.target.value }))}
            />
            <Textarea
              placeholder="Testimonial Content"
              value={testimonialForm.content}
              onChange={(e) => setTestimonialForm(prev => ({ ...prev, content: e.target.value }))}
              rows={4}
            />
            <div>
              <label className="text-sm font-medium mb-2 block">Rating</label>
              <Select
                value={testimonialForm.rating.toString()}
                onValueChange={(value) => setTestimonialForm(prev => ({ ...prev, rating: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map(rating => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating} Star{rating !== 1 ? 's' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'package':
        return (
          <div className="space-y-4">
            <Input
              placeholder="Package Name"
              value={packageForm.name}
              onChange={(e) => setPackageForm(prev => ({ ...prev, name: e.target.value }))}
            />
            <Input
              placeholder="Price"
              value={packageForm.price}
              onChange={(e) => setPackageForm(prev => ({ ...prev, price: e.target.value }))}
            />
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Features</label>
                <Button type="button" size="sm" onClick={addPackageFeature}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Feature
                </Button>
              </div>
              {packageForm.features.map((feature, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    placeholder={`Feature ${index + 1}`}
                    value={feature}
                    onChange={(e) => updatePackageFeature(index, e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removePackageFeature(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={packageForm.popular}
                onCheckedChange={(checked) => setPackageForm(prev => ({ ...prev, popular: checked }))}
              />
              <label className="text-sm font-medium">Mark as Most Popular</label>
            </div>
          </div>
        );

      case 'step':
        return (
          <div className="space-y-4">
            <Input
              placeholder="Step Number"
              value={stepForm.step}
              onChange={(e) => setStepForm(prev => ({ ...prev, step: e.target.value }))}
            />
            <Input
              placeholder="Step Title"
              value={stepForm.title}
              onChange={(e) => setStepForm(prev => ({ ...prev, title: e.target.value }))}
            />
            <Textarea
              placeholder="Step Description"
              value={stepForm.description}
              onChange={(e) => setStepForm(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <Input
              placeholder="Section Title"
              value={editingSection.title}
              onChange={(e) => setEditingSection(prev => prev ? { ...prev, title: e.target.value } : null)}
            />
            <Textarea
              placeholder="Section Content"
              value={JSON.stringify(editingSection.content, null, 2)}
              onChange={(e) => {
                try {
                  const content = JSON.parse(e.target.value);
                  setEditingSection(prev => prev ? { ...prev, content } : null);
                } catch (error) {
                  // Invalid JSON, ignore
                }
              }}
              rows={6}
            />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Create New Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Section
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {['text', 'testimonial', 'package', 'step', 'gallery', 'stats'].map(type => (
              <Button
                key={type}
                variant="outline"
                size="sm"
                onClick={() => openCreateDialog(type as Section['type'])}
                className="capitalize"
              >
                <Plus className="w-4 h-4 mr-1" />
                {type}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GripVertical className="w-5 h-5" />
            Manage Sections
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
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-gray-800 dark:text-white">
                                    {section.name}
                                  </h3>
                                  <Badge variant="secondary" className="text-xs">
                                    {section.type}
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

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isCreating ? 'Create New Section' : 'Edit Section'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <Input
              placeholder="Section Name"
              value={editingSection?.name || ''}
              onChange={(e) => setEditingSection(prev => prev ? { ...prev, name: e.target.value } : null)}
            />
            
            {renderSectionForm()}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveSection}>
              <Save className="w-4 h-4 mr-2" />
              {isCreating ? 'Create' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
