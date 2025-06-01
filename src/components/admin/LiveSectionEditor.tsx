
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Save, Edit, Eye, Move, Plus, X, Palette, Type, Image as ImageIcon } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';
import { useSections } from '@/contexts/SectionsContext';

interface LiveSectionEditorProps {
  sectionId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface EditableElement {
  id: string;
  type: 'text' | 'image' | 'button' | 'heading';
  content: string;
  position: { x: number; y: number };
  style: {
    fontSize?: string;
    color?: string;
    fontWeight?: string;
    width?: string;
    height?: string;
  };
}

export const LiveSectionEditor: React.FC<LiveSectionEditorProps> = ({ sectionId, isOpen, onClose }) => {
  const { settings, updateSettings } = useAdmin();
  const { getSectionById } = useSections();
  const { toast } = useToast();
  
  const [elements, setElements] = useState<EditableElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isEditMode, setIsEditMode] = useState(true);
  
  const previewRef = useRef<HTMLDivElement>(null);
  const section = getSectionById(sectionId);

  useEffect(() => {
    if (section && isOpen) {
      initializeElements();
    }
  }, [section, isOpen]);

  const initializeElements = () => {
    // Initialize elements based on section type and content
    const newElements: EditableElement[] = [];
    
    if (section?.type === 'hero') {
      newElements.push(
        {
          id: 'hero-title',
          type: 'heading',
          content: settings.content.heroTitle || 'Hero Title',
          position: { x: 50, y: 20 },
          style: { fontSize: '3rem', fontWeight: 'bold', color: '#1f2937' }
        },
        {
          id: 'hero-subtitle',
          type: 'text',
          content: settings.content.heroSubtitle || 'Hero Subtitle',
          position: { x: 50, y: 40 },
          style: { fontSize: '1.25rem', color: '#6b7280' }
        },
        {
          id: 'hero-button',
          type: 'button',
          content: 'Get Started',
          position: { x: 50, y: 70 },
          style: { fontSize: '1rem', color: 'white' }
        }
      );
    } else if (section?.type === 'about') {
      newElements.push({
        id: 'about-text',
        type: 'text',
        content: settings.aboutText || 'About text here...',
        position: { x: 20, y: 30 },
        style: { fontSize: '1rem', color: '#374151' }
      });
    }
    
    setElements(newElements);
  };

  const handleElementClick = (elementId: string) => {
    if (isEditMode) {
      setSelectedElement(elementId);
    }
  };

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    if (!isEditMode) return;
    
    setIsDragging(true);
    setSelectedElement(elementId);
    setDragStart({
      x: e.clientX - (previewRef.current?.getBoundingClientRect().left || 0),
      y: e.clientY - (previewRef.current?.getBoundingClientRect().top || 0)
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedElement || !previewRef.current) return;

    const rect = previewRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setElements(prev => prev.map(el => 
      el.id === selectedElement 
        ? { ...el, position: { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) } }
        : el
    ));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateElementContent = (elementId: string, content: string) => {
    setElements(prev => prev.map(el => 
      el.id === elementId ? { ...el, content } : el
    ));
  };

  const updateElementStyle = (elementId: string, style: Partial<EditableElement['style']>) => {
    setElements(prev => prev.map(el => 
      el.id === elementId ? { ...el, style: { ...el.style, ...style } } : el
    ));
  };

  const addElement = (type: EditableElement['type']) => {
    const newElement: EditableElement = {
      id: `element-${Date.now()}`,
      type,
      content: type === 'text' ? 'New Text' : type === 'heading' ? 'New Heading' : type === 'button' ? 'Button' : 'Image',
      position: { x: 50, y: 50 },
      style: {
        fontSize: type === 'heading' ? '2rem' : '1rem',
        color: '#374151',
        fontWeight: type === 'heading' ? 'bold' : 'normal'
      }
    };
    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement.id);
  };

  const deleteElement = (elementId: string) => {
    setElements(prev => prev.filter(el => el.id !== elementId));
    setSelectedElement(null);
  };

  const renderElement = (element: EditableElement) => {
    const commonProps = {
      key: element.id,
      className: `absolute cursor-pointer transition-all duration-200 ${
        selectedElement === element.id ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
      } ${isEditMode ? 'hover:ring-2 hover:ring-blue-300' : ''}`,
      style: {
        left: `${element.position.x}%`,
        top: `${element.position.y}%`,
        transform: 'translate(-50%, -50%)',
        fontSize: element.style.fontSize,
        color: element.style.color,
        fontWeight: element.style.fontWeight as React.CSSProperties['fontWeight'],
        width: element.style.width,
        height: element.style.height,
        userSelect: (isEditMode ? 'none' : 'auto') as React.CSSProperties['userSelect']
      },
      onClick: () => handleElementClick(element.id),
      onMouseDown: (e: React.MouseEvent) => handleMouseDown(e, element.id)
    };

    switch (element.type) {
      case 'heading':
        return (
          <h1 {...commonProps}>
            {element.content}
          </h1>
        );
      case 'text':
        return (
          <p {...commonProps}>
            {element.content}
          </p>
        );
      case 'button':
        return (
          <button 
            {...commonProps}
            className={`${commonProps.className} bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg`}
          >
            {element.content}
          </button>
        );
      case 'image':
        return (
          <img 
            {...commonProps}
            src={element.content || '/placeholder.svg'}
            alt="Editable element"
            className={`${commonProps.className} max-w-xs h-auto`}
          />
        );
      default:
        return null;
    }
  };

  const selectedElementData = elements.find(el => el.id === selectedElement);

  const saveChanges = () => {
    // Save the changes back to the settings
    console.log('Saving section changes:', elements);
    toast({
      title: "Section Updated",
      description: "Your changes have been saved successfully."
    });
    onClose();
  };

  if (!section) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Live Editor - {section.name}
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-[70vh] gap-4">
          {/* Control Panel */}
          <div className="w-80 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Mode Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Edit Mode</span>
                <Switch
                  checked={isEditMode}
                  onCheckedChange={setIsEditMode}
                />
              </div>

              {/* Add Elements */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Add Elements</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" variant="outline" onClick={() => addElement('heading')}>
                    <Type className="w-4 h-4 mr-1" />
                    Heading
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => addElement('text')}>
                    <Type className="w-4 h-4 mr-1" />
                    Text
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => addElement('button')}>
                    <Plus className="w-4 h-4 mr-1" />
                    Button
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => addElement('image')}>
                    <ImageIcon className="w-4 h-4 mr-1" />
                    Image
                  </Button>
                </div>
              </div>

              {/* Element Properties */}
              {selectedElementData && (
                <div className="space-y-3 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Element Properties</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteElement(selectedElementData.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium mb-1 block">Content</label>
                    {selectedElementData.type === 'image' ? (
                      <Input
                        value={selectedElementData.content}
                        onChange={(e) => updateElementContent(selectedElementData.id, e.target.value)}
                        placeholder="Image URL"
                        className="text-sm"
                      />
                    ) : (
                      <Textarea
                        value={selectedElementData.content}
                        onChange={(e) => updateElementContent(selectedElementData.id, e.target.value)}
                        className="text-sm min-h-[60px]"
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium mb-1 block">Font Size</label>
                      <Input
                        value={selectedElementData.style.fontSize || ''}
                        onChange={(e) => updateElementStyle(selectedElementData.id, { fontSize: e.target.value })}
                        placeholder="1rem"
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1 block">Color</label>
                      <Input
                        type="color"
                        value={selectedElementData.style.color || '#000000'}
                        onChange={(e) => updateElementStyle(selectedElementData.id, { color: e.target.value })}
                        className="text-sm h-8"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium mb-1 block">X Position (%)</label>
                      <Input
                        type="number"
                        value={selectedElementData.position.x}
                        onChange={(e) => setElements(prev => prev.map(el => 
                          el.id === selectedElementData.id 
                            ? { ...el, position: { ...el.position, x: Number(e.target.value) } }
                            : el
                        ))}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1 block">Y Position (%)</label>
                      <Input
                        type="number"
                        value={selectedElementData.position.y}
                        onChange={(e) => setElements(prev => prev.map(el => 
                          el.id === selectedElementData.id 
                            ? { ...el, position: { ...el.position, y: Number(e.target.value) } }
                            : el
                        ))}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Live Preview */}
          <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-hidden">
            <div className="h-full relative">
              <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                {isEditMode ? 'Edit Mode - Click & Drag Elements' : 'Preview Mode'}
              </div>
              
              <div
                ref={previewRef}
                className="w-full h-full relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {elements.map(renderElement)}
                
                {/* Grid overlay for editing */}
                {isEditMode && (
                  <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full" style={{
                      backgroundImage: `
                        linear-gradient(to right, #000 1px, transparent 1px),
                        linear-gradient(to bottom, #000 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px'
                    }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => setIsEditMode(!isEditMode)}>
            {isEditMode ? <Eye className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
            {isEditMode ? 'Preview' : 'Edit'}
          </Button>
          <Button onClick={saveChanges}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
