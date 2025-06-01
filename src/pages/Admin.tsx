
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <div className="container mx-auto px-4 py-8">
        <AnimatedSection animation="fade-up">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Website
            </Button>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={100}>
          <ComprehensiveAdmin />
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Admin;
