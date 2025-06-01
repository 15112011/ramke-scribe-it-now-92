import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Database, Settings, Plus } from 'lucide-react';
import { SectionDashboard } from './SectionDashboard';
import { SectionList } from './SectionList';
import { AdminSectionCRUD } from '../AdminSectionCRUD';

export const ComprehensiveAdmin: React.FC = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="sections" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            All Sections
          </TabsTrigger>
          <TabsTrigger value="crud" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create/Manage
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Content Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <SectionDashboard />
        </TabsContent>

        <TabsContent value="sections" className="space-y-6">
          <SectionList />
        </TabsContent>

        <TabsContent value="crud" className="space-y-6">
          <AdminSectionCRUD />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Keep existing content settings from SectionManager */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Content Settings (Legacy)
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Use the other tabs for comprehensive section management. This tab contains the original content settings.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
