
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AdminAuth } from '@/components/AdminAuth';
import { ComprehensiveAdmin } from '@/components/admin/ComprehensiveAdmin';
import { AnimatedSection } from '@/components/AnimatedSection';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // If not authenticated, show login
  if (!isAuthenticated) {
    return <AdminAuth onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <AnimatedSection animation="fade-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="bg-white/70 dark:bg-gray-800/70 border-gray-300/50 dark:border-gray-600/50 hover:bg-white dark:hover:bg-gray-800 shadow-sm"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Website
                </Button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Manage your website content</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 rounded-full text-xs font-medium">
                  Authenticated
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl overflow-hidden">
            <ComprehensiveAdmin />
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Admin;
