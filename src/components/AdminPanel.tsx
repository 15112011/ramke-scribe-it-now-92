
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { AdminAuth } from './AdminAuth';
import { SectionManager } from './SectionManager';

export const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  if (!isAuthenticated) {
    return <AdminAuth onLogin={() => setIsAuthenticated(true)} />;
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast({
      title: "Logged Out",
      description: "You have been logged out of the admin panel.",
    });
  };

  return (
    <div className="fixed top-20 right-4 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-lg">
            <Settings className="w-4 h-4 mr-2" />
            Admin Panel
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[90vw] sm:w-[400px] lg:w-[600px] overflow-y-auto bg-white dark:bg-gray-900">
          <SheetHeader>
            <div className="flex items-center justify-between">
              <SheetTitle className="text-gray-900 dark:text-white">Admin Control Panel</SheetTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </SheetHeader>
          
          <div className="mt-6">
            <SectionManager />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
