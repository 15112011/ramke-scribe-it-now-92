
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Languages, 
  CreditCard, 
  Users, 
  BarChart3, 
  Image,
  MessageSquare,
  Layers
} from 'lucide-react';
import { MultilingualEditor } from './MultilingualEditor';
import { SubscriptionRequests } from './SubscriptionRequests';
import { AdminSectionCRUD } from '@/components/AdminSectionCRUD';
import { SectionEditor } from './SectionEditor';

export const ComprehensiveAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('content');

  return (
    <div className="p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Languages className="w-4 h-4" />
            <span className="hidden sm:inline">Content</span>
          </TabsTrigger>
          <TabsTrigger value="sections" className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">Sections</span>
          </TabsTrigger>
          <TabsTrigger value="subscriptions" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            <span className="hidden sm:inline">Subscriptions</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            <span className="hidden sm:inline">Media</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-6">
          <MultilingualEditor />
        </TabsContent>

        <TabsContent value="sections" className="mt-6">
          <AdminSectionCRUD />
        </TabsContent>

        <TabsContent value="subscriptions" className="mt-6">
          <SubscriptionRequests />
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">User Management</h3>
            <p className="text-gray-600">User management features coming soon...</p>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
            <p className="text-gray-600">Analytics and reporting features coming soon...</p>
          </div>
        </TabsContent>

        <TabsContent value="media" className="mt-6">
          <div className="text-center py-12">
            <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Media Library</h3>
            <p className="text-gray-600">Media management features coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
