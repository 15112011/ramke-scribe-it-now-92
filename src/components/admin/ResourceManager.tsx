
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  FileText, 
  Play,
  Save,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  subscriptionStorage, 
  TrainingResource, 
  VideoResource 
} from '@/utils/subscriptionStorage';

export const ResourceManager: React.FC = () => {
  const [trainingResources, setTrainingResources] = useState<TrainingResource[]>([]);
  const [videoResources, setVideoResources] = useState<VideoResource[]>([]);
  const [editingTraining, setEditingTraining] = useState<string | null>(null);
  const [editingVideo, setEditingVideo] = useState<string | null>(null);
  const [newTraining, setNewTraining] = useState<Partial<TrainingResource>>({});
  const [newVideo, setNewVideo] = useState<Partial<VideoResource>>({});
  const [showAddTraining, setShowAddTraining] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState(false);
  const { language } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    setTrainingResources(subscriptionStorage.getTrainingResources());
    setVideoResources(subscriptionStorage.getVideoResources());
  }, []);

  const handleSaveTraining = (resource: TrainingResource) => {
    const updated = trainingResources.map(r => r.id === resource.id ? resource : r);
    setTrainingResources(updated);
    subscriptionStorage.updateTrainingResources(updated);
    setEditingTraining(null);
    toast({
      title: language === 'ar' ? 'تم التحديث' : 'Updated',
      description: language === 'ar' ? 'تم حفظ المورد بنجاح' : 'Resource saved successfully'
    });
  };

  const handleAddTraining = () => {
    if (!newTraining.title?.en || !newTraining.title?.ar) return;
    
    const resource: TrainingResource = {
      id: Date.now().toString(),
      title: newTraining.title as { en: string; ar: string },
      description: newTraining.description as { en: string; ar: string },
      pdfUrl: newTraining.pdfUrl || '',
      type: newTraining.type as 'training' | 'diet',
      enabled: true
    };
    
    const updated = [...trainingResources, resource];
    setTrainingResources(updated);
    subscriptionStorage.updateTrainingResources(updated);
    setNewTraining({});
    setShowAddTraining(false);
    toast({
      title: language === 'ar' ? 'تمت الإضافة' : 'Added',
      description: language === 'ar' ? 'تم إضافة المورد بنجاح' : 'Resource added successfully'
    });
  };

  const handleDeleteTraining = (id: string) => {
    const updated = trainingResources.filter(r => r.id !== id);
    setTrainingResources(updated);
    subscriptionStorage.updateTrainingResources(updated);
    toast({
      title: language === 'ar' ? 'تم الحذف' : 'Deleted',
      description: language === 'ar' ? 'تم حذف المورد' : 'Resource deleted'
    });
  };

  const handleSaveVideo = (video: VideoResource) => {
    const updated = videoResources.map(v => v.id === video.id ? video : v);
    setVideoResources(updated);
    subscriptionStorage.updateVideoResources(updated);
    setEditingVideo(null);
    toast({
      title: language === 'ar' ? 'تم التحديث' : 'Updated',
      description: language === 'ar' ? 'تم حفظ الفيديو بنجاح' : 'Video saved successfully'
    });
  };

  const handleAddVideo = () => {
    if (!newVideo.title?.en || !newVideo.title?.ar) return;
    
    const video: VideoResource = {
      id: Date.now().toString(),
      title: newVideo.title as { en: string; ar: string },
      description: newVideo.description as { en: string; ar: string },
      videoUrl: newVideo.videoUrl || '',
      enabled: true
    };
    
    const updated = [...videoResources, video];
    setVideoResources(updated);
    subscriptionStorage.updateVideoResources(updated);
    setNewVideo({});
    setShowAddVideo(false);
    toast({
      title: language === 'ar' ? 'تمت الإضافة' : 'Added',
      description: language === 'ar' ? 'تم إضافة الفيديو بنجاح' : 'Video added successfully'
    });
  };

  const handleDeleteVideo = (id: string) => {
    const updated = videoResources.filter(v => v.id !== id);
    setVideoResources(updated);
    subscriptionStorage.updateVideoResources(updated);
    toast({
      title: language === 'ar' ? 'تم الحذف' : 'Deleted',
      description: language === 'ar' ? 'تم حذف الفيديو' : 'Video deleted'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">
          {language === 'ar' ? 'إدارة الموارد' : 'Resource Management'}
        </h2>
        <p className="text-gray-600">
          {language === 'ar' 
            ? 'إدارة ملفات PDF والفيديوهات المتاحة للأعضاء'
            : 'Manage PDFs and videos available to members'
          }
        </p>
      </div>

      <Tabs defaultValue="training" className="w-full">
        <TabsList>
          <TabsTrigger value="training" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            {language === 'ar' ? 'التدريبات والأنظمة الغذائية' : 'Training & Diet PDFs'}
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            {language === 'ar' ? 'الفيديوهات' : 'Videos'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="training" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              {language === 'ar' ? 'ملفات PDF' : 'PDF Resources'}
            </h3>
            <Button onClick={() => setShowAddTraining(true)}>
              <Plus className="w-4 h-4 mr-2" />
              {language === 'ar' ? 'إضافة ملف PDF' : 'Add PDF'}
            </Button>
          </div>

          {showAddTraining && (
            <Card>
              <CardHeader>
                <CardTitle>{language === 'ar' ? 'إضافة ملف PDF جديد' : 'Add New PDF'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{language === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)'}</Label>
                    <Input
                      value={newTraining.title?.en || ''}
                      onChange={(e) => setNewTraining({
                        ...newTraining,
                        title: { ...newTraining.title, en: e.target.value } as { en: string; ar: string }
                      })}
                    />
                  </div>
                  <div>
                    <Label>{language === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)'}</Label>
                    <Input
                      value={newTraining.title?.ar || ''}
                      onChange={(e) => setNewTraining({
                        ...newTraining,
                        title: { ...newTraining.title, ar: e.target.value } as { en: string; ar: string }
                      })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label>{language === 'ar' ? 'نوع الملف' : 'Type'}</Label>
                  <select 
                    className="w-full p-2 border rounded"
                    value={newTraining.type || 'training'}
                    onChange={(e) => setNewTraining({
                      ...newTraining,
                      type: e.target.value as 'training' | 'diet'
                    })}
                  >
                    <option value="training">{language === 'ar' ? 'تدريب' : 'Training'}</option>
                    <option value="diet">{language === 'ar' ? 'نظام غذائي' : 'Diet'}</option>
                  </select>
                </div>
                
                <div>
                  <Label>{language === 'ar' ? 'رابط PDF' : 'PDF URL'}</Label>
                  <Input
                    value={newTraining.pdfUrl || ''}
                    onChange={(e) => setNewTraining({
                      ...newTraining,
                      pdfUrl: e.target.value
                    })}
                    placeholder="https://example.com/file.pdf"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={handleAddTraining}>
                    <Save className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'حفظ' : 'Save'}
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddTraining(false)}>
                    <X className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {trainingResources.map((resource) => (
              <Card key={resource.id}>
                <CardContent className="p-4">
                  {editingTraining === resource.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Title (English)</Label>
                          <Input
                            value={resource.title.en}
                            onChange={(e) => {
                              const updated = { ...resource, title: { ...resource.title, en: e.target.value } };
                              setTrainingResources(trainingResources.map(r => r.id === resource.id ? updated : r));
                            }}
                          />
                        </div>
                        <div>
                          <Label>Title (Arabic)</Label>
                          <Input
                            value={resource.title.ar}
                            onChange={(e) => {
                              const updated = { ...resource, title: { ...resource.title, ar: e.target.value } };
                              setTrainingResources(trainingResources.map(r => r.id === resource.id ? updated : r));
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>PDF URL</Label>
                        <Input
                          value={resource.pdfUrl}
                          onChange={(e) => {
                            const updated = { ...resource, pdfUrl: e.target.value };
                            setTrainingResources(trainingResources.map(r => r.id === resource.id ? updated : r));
                          }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => handleSaveTraining(resource)}>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" onClick={() => setEditingTraining(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{language === 'ar' ? resource.title.ar : resource.title.en}</h4>
                        <p className="text-sm text-gray-600">
                          <Badge className="mr-2">
                            {resource.type === 'training' ? 
                              (language === 'ar' ? 'تدريب' : 'Training') : 
                              (language === 'ar' ? 'نظام غذائي' : 'Diet')
                            }
                          </Badge>
                          {resource.pdfUrl}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingTraining(resource.id)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteTraining(resource.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              {language === 'ar' ? 'مقاطع الفيديو' : 'Video Resources'}
            </h3>
            <Button onClick={() => setShowAddVideo(true)}>
              <Plus className="w-4 h-4 mr-2" />
              {language === 'ar' ? 'إضافة فيديو' : 'Add Video'}
            </Button>
          </div>

          {showAddVideo && (
            <Card>
              <CardHeader>
                <CardTitle>{language === 'ar' ? 'إضافة فيديو جديد' : 'Add New Video'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{language === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)'}</Label>
                    <Input
                      value={newVideo.title?.en || ''}
                      onChange={(e) => setNewVideo({
                        ...newVideo,
                        title: { ...newVideo.title, en: e.target.value } as { en: string; ar: string }
                      })}
                    />
                  </div>
                  <div>
                    <Label>{language === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)'}</Label>
                    <Input
                      value={newVideo.title?.ar || ''}
                      onChange={(e) => setNewVideo({
                        ...newVideo,
                        title: { ...newVideo.title, ar: e.target.value } as { en: string; ar: string }
                      })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label>{language === 'ar' ? 'رابط الفيديو' : 'Video URL'}</Label>
                  <Input
                    value={newVideo.videoUrl || ''}
                    onChange={(e) => setNewVideo({
                      ...newVideo,
                      videoUrl: e.target.value
                    })}
                    placeholder="https://www.youtube.com/embed/..."
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={handleAddVideo}>
                    <Save className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'حفظ' : 'Save'}
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddVideo(false)}>
                    <X className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {videoResources.map((video) => (
              <Card key={video.id}>
                <CardContent className="p-4">
                  {editingVideo === video.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Title (English)</Label>
                          <Input
                            value={video.title.en}
                            onChange={(e) => {
                              const updated = { ...video, title: { ...video.title, en: e.target.value } };
                              setVideoResources(videoResources.map(v => v.id === video.id ? updated : v));
                            }}
                          />
                        </div>
                        <div>
                          <Label>Title (Arabic)</Label>
                          <Input
                            value={video.title.ar}
                            onChange={(e) => {
                              const updated = { ...video, title: { ...video.title, ar: e.target.value } };
                              setVideoResources(videoResources.map(v => v.id === video.id ? updated : v));
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Video URL</Label>
                        <Input
                          value={video.videoUrl}
                          onChange={(e) => {
                            const updated = { ...video, videoUrl: e.target.value };
                            setVideoResources(videoResources.map(v => v.id === video.id ? updated : v));
                          }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => handleSaveVideo(video)}>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" onClick={() => setEditingVideo(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{language === 'ar' ? video.title.ar : video.title.en}</h4>
                        <p className="text-sm text-gray-600">{video.videoUrl}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingVideo(video.id)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteVideo(video.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
