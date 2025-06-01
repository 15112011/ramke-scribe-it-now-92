
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Edit, Trash2, BarChart3 } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

interface SectionStats {
  total: number;
  enabled: number;
  disabled: number;
  byType: Record<string, number>;
}

export const SectionDashboard: React.FC = () => {
  const { settings } = useAdmin();

  // Calculate section statistics
  const calculateStats = (): SectionStats => {
    const sections = [
      { type: 'hero', enabled: true },
      { type: 'gallery', enabled: true },
      { type: 'stats', enabled: true },
      { type: 'about', enabled: true },
      { type: 'packages', enabled: true },
      { type: 'testimonials', enabled: settings.testimonials?.length > 0 },
      { type: 'steps', enabled: settings.steps?.length > 0 },
      { type: 'contact', enabled: true },
    ];

    const stats: SectionStats = {
      total: sections.length,
      enabled: sections.filter(s => s.enabled).length,
      disabled: sections.filter(s => !s.enabled).length,
      byType: {}
    };

    sections.forEach(section => {
      stats.byType[section.type] = (stats.byType[section.type] || 0) + 1;
    });

    return stats;
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sections</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sections</CardTitle>
            <Eye className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.enabled}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disabled Sections</CardTitle>
            <EyeOff className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.disabled}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Section Types Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.entries(stats.byType).map(([type, count]) => (
              <Badge key={type} variant="secondary" className="capitalize">
                {type}: {count}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
