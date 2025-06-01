
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlayCircle, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const VideoModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  return (
    <>
      {/* Video Trigger Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 left-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 z-40"
      >
        <PlayCircle className="w-8 h-8" />
      </Button>

      {/* Video Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black border-0">
          <DialogHeader className="absolute top-4 right-4 z-10">
            <Button 
              onClick={() => setIsOpen(false)} 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
            >
              <X className="w-6 h-6" />
            </Button>
          </DialogHeader>
          
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
              <div className="text-center text-white">
                <PlayCircle className="w-24 h-24 mx-auto mb-4 opacity-50" />
                <h3 className="text-2xl font-bold mb-2">
                  {language === 'ar' ? 'فيديو تحفيزي' : 'Motivational Video'}
                </h3>
                <p className="text-gray-400">
                  {language === 'ar' ? 'شاهد قصص النجاح والتحولات المذهلة' : 'Watch amazing transformation stories and success journeys'}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
