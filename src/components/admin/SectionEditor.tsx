
import React, { useState } from 'react';
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
  type: 'hero' | 'gallery' | 'stats' | 'about' | 'packages' | 'testimonials' | 'steps' | 'contact';
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

  const handleSave = () => {
    onSave(editedSection);
    toast({
      title: "Section Updated",
      description: `${editedSection.name} has been updated successfully.`
    });
    onClose();
  };

  const updateContent = (key: string, value: any) => {
    setEditedSection(prev => ({
      ...prev,
      content: { ...prev.content, [key]: value }
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

      case 'packages':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Basic Package Price</label>
                <Input
                  value={editedSection.content?.basic?.price || ''}
                  onChange={(e) => updateContent('basic', { ...editedSection.content?.basic, price: e.target.value })}
                  placeholder="Basic price"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Professional Package Price</label>
                <Input
                  value={editedSection.content?.professional?.price || ''}
                  onChange={(e) => updateContent('professional', { ...editedSection.content?.professional, price: e.target.value })}
                  placeholder="Professional price"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Premium Package Price</label>
                <Input
                  value={editedSection.content?.premium?.price || ''}
                  onChange={(e) => updateContent('premium', { ...editedSection.content?.premium, price: e.target.value })}
                  placeholder="Premium price"
                />
              </div>
            </div>
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
            <div>
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
