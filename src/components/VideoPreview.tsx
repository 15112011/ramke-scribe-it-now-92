
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const VideoPreview: React.FC = () => {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const videos = [
    {
      id: 1,
      title: language === 'ar' ? 'تحولات مذهلة - قصص نجاح العملاء' : 'Amazing Transformations - Client Success Stories',
      thumbnail: '/lovable-uploads/4fec875e-9e74-4a4f-aedd-29de4c064bc1.png',
      duration: '2:45',
      description: language === 'ar' ? 'شاهد كيف غيّر عملاؤنا حياتهم' : 'Watch how our clients transformed their lives'
    },
    {
      id: 2,
      title: language === 'ar' ? 'نصائح التغذية السليمة' : 'Proper Nutrition Tips',
      thumbnail: '/lovable-uploads/78c7f92d-29b1-4699-9511-9e5848c5892e.png',
      duration: '3:20',
      description: language === 'ar' ? 'الدليل الشامل للتغذية الصحيحة' : 'Complete guide to proper nutrition'
    },
    {
      id: 3,
      title: language === 'ar' ? 'تمارين القوة الأساسية' : 'Essential Strength Training',
      thumbnail: '/lovable-uploads/8fb7f786-bdcb-4dac-a303-8405af22960b.png',
      duration: '4:15',
      description: language === 'ar' ? 'تعلم أساسيات تمارين القوة' : 'Learn strength training fundamentals'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
            {language === 'ar' ? 'فيديوهات تدريبية حصرية' : 'Exclusive Training Videos'}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'ar' ? 'شاهد المحتوى التدريبي المتميز وقصص النجاح الملهمة' : 'Watch premium training content and inspiring success stories'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {videos.map((video, index) => (
            <Card key={video.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white dark:bg-gray-900 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Video Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="bg-white/90 text-black hover:bg-white rounded-full w-16 h-16 p-0 shadow-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300"
                    >
                      <Play className="w-8 h-8 ml-1" />
                    </Button>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute top-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
                    {video.duration}
                  </div>
                  
                  {/* Quality Badge */}
                  <div className="absolute top-3 left-3 bg-emerald-500 text-white px-2 py-1 rounded text-xs font-bold">
                    4K
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-3 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-2">
                    {video.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm sm:text-base px-4 py-2 rounded-full font-medium">
                      <Play className="w-4 h-4 mr-2" />
                      {language === 'ar' ? 'مشاهدة' : 'Watch'}
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                        <Maximize className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12">
          <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-xl">
            {language === 'ar' ? 'شاهد جميع الفيديوهات' : 'View All Videos'}
          </Button>
        </div>
      </div>
    </section>
  );
};
