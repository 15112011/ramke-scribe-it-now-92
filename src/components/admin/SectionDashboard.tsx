
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Eye, EyeOff, Layout, Zap } from 'lucide-react';
import { useSections } from '@/contexts/SectionsContext';

export const SectionDashboard: React.FC = () => {
  const { sections, getEnabledSections } = useSections();
  const enabledSections = getEnabledSections();
  
  const totalSections = sections.length;
  const activeSections = enabledSections.length;
  const disabledSections = totalSections - activeSections;
  
  const sectionTypeData = sections.reduce((acc, section) => {
    acc[section.type] = (acc[section.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(sectionTypeData).map(([type, count]) => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    count
  }));

  const pieData = [
    { name: 'Active', value: activeSections, color: '#10b981' },
    { name: 'Disabled', value: disabledSections, color: '#ef4444' }
  ];

  const orderData = enabledSections.map(section => ({
    name: section.name,
    order: section.order,
    enabled: section.enabled
  }));

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sections</CardTitle>
            <Layout className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSections}</div>
            <p className="text-xs text-muted-foreground">
              All available sections
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sections</CardTitle>
            <Eye className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeSections}</div>
            <p className="text-xs text-muted-foreground">
              Currently visible on site
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disabled Sections</CardTitle>
            <EyeOff className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{disabledSections}</div>
            <p className="text-xs text-muted-foreground">
              Hidden from site
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Site Status</CardTitle>
            <Zap className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">Live</div>
            <p className="text-xs text-muted-foreground">
              Changes reflect immediately
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section Types Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Section Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Active vs Disabled Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Section Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Current Site Structure */}
      <Card>
        <CardHeader>
          <CardTitle>Current Site Structure (Live)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {enabledSections.map((section, index) => (
              <div key={section.id} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-xs font-mono">
                    {index + 1}
                  </Badge>
                  <span className="font-medium">{section.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {section.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">Live</span>
                </div>
              </div>
            ))}
            {enabledSections.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No sections are currently enabled. Enable sections to see them here.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Disabled Sections */}
      {disabledSections > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Disabled Sections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sections.filter(section => !section.enabled).map((section) => (
                <div key={section.id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-red-800 dark:text-red-200">{section.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {section.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <EyeOff className="w-4 h-4 text-red-600" />
                    <span className="text-xs text-red-600 font-medium">Hidden</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
