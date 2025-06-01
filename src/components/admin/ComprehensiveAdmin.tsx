import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Database, Settings, Plus, Layout, Users } from 'lucide-react';
import { SectionDashboard } from './SectionDashboard';
import { SectionList } from './SectionList';
import { AdminSectionCRUD } from '../AdminSectionCRUD';
import { SubscriptionRequests } from './SubscriptionRequests';

export const ComprehensiveAdmin: React.FC = () => {
  return (
    <div className="p-6">
      <Tabs defaultValue="dashboard" className="w-full">
        <div className="mb-8">
          <TabsList className="grid w-full grid-cols-5 bg-gray-100/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-1 h-auto">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center gap-2 py-3 px-4 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-md transition-all"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="sections" 
              className="flex items-center gap-2 py-3 px-4 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-md transition-all"
            >
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">Sections</span>
            </TabsTrigger>
            <TabsTrigger 
              value="subscriptions" 
              className="flex items-center gap-2 py-3 px-4 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-md transition-all"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Subscriptions</span>
            </TabsTrigger>
            <TabsTrigger 
              value="crud" 
              className="flex items-center gap-2 py-3 px-4 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create</span>
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="flex items-center gap-2 py-3 px-4 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-md transition-all"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="space-y-6 mt-0">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-800/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard Overview</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Monitor your website's sections and content status at a glance.
            </p>
            <SectionDashboard />
          </div>
        </TabsContent>

        <TabsContent value="sections" className="space-y-6 mt-0">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-emerald-200/50 dark:border-emerald-800/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Layout className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Section Management</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Organize, edit, and control the visibility of all your website sections.
            </p>
            <SectionList />
          </div>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-6 mt-0">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200/50 dark:border-purple-800/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Subscription Management</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Review and manage client subscription applications and payment verifications.
            </p>
            <SubscriptionRequests />
          </div>
        </TabsContent>

        <TabsContent value="crud" className="space-y-6 mt-0">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200/50 dark:border-purple-800/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Content Creation</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create new sections, manage testimonials, and add custom content.
            </p>
            <AdminSectionCRUD />
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 mt-0">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-6 border border-orange-200/50 dark:border-orange-800/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Legacy Content Settings</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Use the other tabs for comprehensive section management. This contains original content settings.
            </p>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6">
              <div className="text-center py-8">
                <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Legacy Settings
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                  The comprehensive admin interface in other tabs provides better section management. 
                  This area is preserved for backward compatibility.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
