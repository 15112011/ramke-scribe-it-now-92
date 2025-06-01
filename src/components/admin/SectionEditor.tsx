import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Save, Edit, Plus, X, Upload } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';

interface Section {
  id: string;
  name: string;
  type: 'hero' | 'gallery' | 'stats' | 'about' | 'packages' | 'testimonials' | 'steps' | 'contact' | 'video' | 'results';
  enabled: boolean;
  content: any;
}

interface SectionEditorProps {
  section: Section;
  isOpen: boolean;
  onClose: () => void;
  onSave: (section: Section) => void;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({ section, isOpen, onClose, onSave }) => {
  const [editedSection, setEditedSection] = useState<Section>(section);
  const { toast } = useToast();

  useEffect(() => {
    setEditedSection(section);
  }, [section]);

  const handleSave = () => {
    console.log('SectionEditor: Saving section', editedSection);
    onSave(editedSection);
    toast({
      title: "Section Updated",
      description: `${editedSection.name} has been updated successfully.`
    });
    onClose();
  };

  const updateContent = (key: string, value: any) => {
    console.log('SectionEditor: Updating content', key, value);
    setEditedSection(prev => ({
      ...prev,
      content: { ...prev.content, [key]: value }
    }));
  };

  const updateArrayContent = (newArray: any[]) => {
    console.log('SectionEditor: Updating array content', newArray);
    setEditedSection(prev => ({
      ...prev,
      content: newArray
    }));
  };

  const renderContentEditor = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Hero Title</label>
              <Input
                value={editedSection.content?.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                placeholder="Enter hero title"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Hero Subtitle</label>
              <Textarea
                value={editedSection.content?.subtitle || ''}
                onChange={(e) => updateContent('subtitle', e.target.value)}
                placeholder="Enter hero subtitle"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Hero Image URL</label>
              <Input
                value={editedSection.content?.image || ''}
                onChange={(e) => updateContent('image', e.target.value)}
                placeholder="Enter image URL"
              />
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">About Text</label>
              <Textarea
                value={editedSection.content?.text || ''}
                onChange={(e) => updateContent('text', e.target.value)}
                placeholder="Enter about text"
                rows={5}
              />
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Clients</label>
                <Input
                  value={editedSection.content?.clients || ''}
                  onChange={(e) => updateContent('clients', e.target.value)}
                  placeholder="Number of clients"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Success Rate</label>
                <Input
                  value={editedSection.content?.successRate || ''}
                  onChange={(e) => updateContent('successRate', e.target.value)}
                  placeholder="Success rate"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Experience</label>
                <Input
                  value={editedSection.content?.experience || ''}
                  onChange={(e) => updateContent('experience', e.target.value)}
                  placeholder="Years of experience"
                />
              </div>
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Video Title</label>
              <Input
                value={editedSection.content?.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                placeholder="Enter video title"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Video URL</label>
              <Input
                value={editedSection.content?.videoUrl || ''}
                onChange={(e) => updateContent('videoUrl', e.target.value)}
                placeholder="Enter video URL"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Video Description</label>
              <Textarea
                value={editedSection.content?.description || ''}
                onChange={(e) => updateContent('description', e.target.value)}
                placeholder="Enter video description"
                rows={3}
              />
            </div>
          </div>
        );

      case 'results':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Results Title</label>
              <Input
                value={editedSection.content?.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                placeholder="Enter results title"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Results Description</label>
              <Textarea
                value={editedSection.content?.description || ''}
                onChange={(e) => updateContent('description', e.target.value)}
                placeholder="Enter results description"
                rows={3}
              />
            </div>
          </div>
        );

      case 'packages':
        return (
          <div className="space-y-4">
            <div className="space-y-6">
              {/* Basic Package */}
              <div className="border p-4 rounded">
                <h4 className="font-medium mb-3">Basic Package</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Price</label>
                    <Input
                      value={editedSection.content?.basic?.price || ''}
                      onChange={(e) => updateContent('basic', { ...editedSection.content?.basic, price: e.target.value })}
                      placeholder="Basic price"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Name</label>
                    <Input
                      value={editedSection.content?.basic?.name || 'Basic Package'}
                      onChange={(e) => updateContent('basic', { ...editedSection.content?.basic, name: e.target.value })}
                      placeholder="Package name"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Package */}
              <div className="border p-4 rounded">
                <h4 className="font-medium mb-3">Professional Package</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Price</label>
                    <Input
                      value={editedSection.content?.professional?.price || ''}
                      onChange={(e) => updateContent('professional', { ...editedSection.content?.professional, price: e.target.value })}
                      placeholder="Professional price"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Name</label>
                    <Input
                      value={editedSection.content?.professional?.name || 'Professional Package'}
                      onChange={(e) => updateContent('professional', { ...editedSection.content?.professional, name: e.target.value })}
                      placeholder="Package name"
                    />
                  </div>
                </div>
              </div>

              {/* Premium Package */}
              <div className="border p-4 rounded">
                <h4 className="font-medium mb-3">Premium Package</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Price</label>
                    <Input
                      value={editedSection.content?.premium?.price || ''}
                      onChange={(e) => updateContent('premium', { ...editedSection.content?.premium, price: e.target.value })}
                      placeholder="Premium price"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Name</label>
                    <Input
                      value={editedSection.content?.premium?.name || 'Premium Package'}
                      onChange={(e) => updateContent('premium', { ...editedSection.content?.premium, name: e.target.value })}
                      placeholder="Package name"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'testimonials':
        const testimonials = Array.isArray(editedSection.content) ? editedSection.content : [];
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Testimonials</label>
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  const newTestimonial = { name: '', content: '', rating: 5 };
                  updateArrayContent([...testimonials, newTestimonial]);
                }}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Testimonial
              </Button>
            </div>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="border p-4 rounded space-y-3">
                <div className="flex justify-between">
                  <h4 className="font-medium">Testimonial {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newTestimonials = testimonials.filter((_, i) => i !== index);
                      updateArrayContent(newTestimonials);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <Input
                  value={testimonial.name || ''}
                  onChange={(e) => {
                    const newTestimonials = [...testimonials];
                    newTestimonials[index] = { ...testimonial, name: e.target.value };
                    updateArrayContent(newTestimonials);
                  }}
                  placeholder="Customer name"
                />
                <Textarea
                  value={testimonial.content || ''}
                  onChange={(e) => {
                    const newTestimonials = [...testimonials];
                    newTestimonials[index] = { ...testimonial, content: e.target.value };
                    updateArrayContent(newTestimonials);
                  }}
                  placeholder="Testimonial content"
                  rows={3}
                />
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={testimonial.rating || 5}
                  onChange={(e) => {
                    const newTestimonials = [...testimonials];
                    newTestimonials[index] = { ...testimonial, rating: parseInt(e.target.value) };
                    updateArrayContent(newTestimonials);
                  }}
                  placeholder="Rating (1-5)"
                />
              </div>
            ))}
          </div>
        );

      case 'steps':
        const steps = Array.isArray(editedSection.content) ? editedSection.content : [];
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Process Steps</label>
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  const newStep = { step: (steps.length + 1).toString(), title: '', description: '' };
                  updateArrayContent([...steps, newStep]);
                }}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Step
              </Button>
            </div>
            {steps.map((step, index) => (
              <div key={index} className="border p-4 rounded space-y-3">
                <div className="flex justify-between">
                  <h4 className="font-medium">Step {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newSteps = steps.filter((_, i) => i !== index);
                      updateArrayContent(newSteps);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <Input
                  value={step.step || ''}
                  onChange={(e) => {
                    const newSteps = [...steps];
                    newSteps[index] = { ...step, step: e.target.value };
                    updateArrayContent(newSteps);
                  }}
                  placeholder="Step number"
                />
                <Input
                  value={step.title || ''}
                  onChange={(e) => {
                    const newSteps = [...steps];
                    newSteps[index] = { ...step, title: e.target.value };
                    updateArrayContent(newSteps);
                  }}
                  placeholder="Step title"
                />
                <Textarea
                  value={step.description || ''}
                  onChange={(e) => {
                    const newSteps = [...steps];
                    newSteps[index] = { ...step, description: e.target.value };
                    updateArrayContent(newSteps);
                  }}
                  placeholder="Step description"
                  rows={3}
                />
              </div>
            ))}
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Contact Title</label>
              <Input
                value={editedSection.content?.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                placeholder="Enter contact title"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Contact Subtitle</label>
              <Textarea
                value={editedSection.content?.subtitle || ''}
                onChange={(e) => updateContent('subtitle', e.target.value)}
                placeholder="Enter contact subtitle"
                rows={3}
              />
            </div>
          </div>
        );

      case 'gallery':
        const images = editedSection.content?.images || [];
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Gallery Images</label>
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  const newImages = [...images, ''];
                  updateContent('images', newImages);
                }}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Image
              </Button>
            </div>
            {images.map((image, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={image}
                  onChange={(e) => {
                    const newImages = [...images];
                    newImages[index] = e.target.value;
                    updateContent('images', newImages);
                  }}
                  placeholder={`Image URL ${index + 1}`}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newImages = images.filter((_, i) => i !== index);
                    updateContent('images', newImages);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Content (JSON)</label>
              <Textarea
                value={JSON.stringify(editedSection.content, null, 2)}
                onChange={(e) => {
                  try {
                    const content = JSON.parse(e.target.value);
                    setEditedSection(prev => ({ ...prev, content }));
                  } catch (error) {
                    // Invalid JSON, ignore
                    console.error('Invalid JSON:', error);
                  }
                }}
                placeholder="Enter content as JSON"
                rows={8}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Edit {section.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-4">
              <label className="text-sm font-medium mb-2 block">Section Name</label>
              <Input
                value={editedSection.name}
                onChange={(e) => setEditedSection(prev => ({ ...prev, name: e.target.value }))}
                className="text-lg font-semibold"
                placeholder="Section name"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Enabled</span>
              <Switch
                checked={editedSection.enabled}
                onCheckedChange={(checked) => setEditedSection(prev => ({ ...prev, enabled: checked }))}
              />
            </div>
          </div>

          {renderContentEditor()}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
