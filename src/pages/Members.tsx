
import React, { useState, useEffect } from 'react';
import { EnhancedNavigation } from '@/components/EnhancedNavigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { subscriptionStorage } from '@/utils/subscriptionStorage';
import { 
  Lock, 
  Download, 
  Calendar, 
  FileText, 
  Play,
  Shield,
  CheckCircle,
  Clock,
  Dumbbell,
  Apple
} from 'lucide-react';

const Members: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userPlan, setUserPlan] = useState('');
  const { language } = useLanguage();
  const { toast } = useToast();

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedAuth = localStorage.getItem('memberAuth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsAuthorized(true);
      setEmail(authData.email);
      setUserPlan(authData.plan);
    }
  }, []);

  const handleVerifyAccess = () => {
    if (!email) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' 
          ? 'يرجى إدخال البريد الإلكتروني'
          : 'Please enter your email address',
        variant: 'destructive'
      });
      return;
    }

    setIsVerifying(true);

    // Check if email is in approved users
    const approvedUsers = subscriptionStorage.getApprovedUsers();
    const allRequests = subscriptionStorage.getAllRequests();
    const userRequest = allRequests.find(req => req.email === email && req.status === 'approved');

    setTimeout(() => {
      if (approvedUsers.includes(email) && userRequest) {
        setIsAuthorized(true);
        setUserPlan(userRequest.selectedPlan);
        
        // Save auth state
        localStorage.setItem('memberAuth', JSON.stringify({
          email: email,
          plan: userRequest.selectedPlan,
          loginTime: new Date().toISOString()
        }));

        toast({
          title: language === 'ar' ? 'مرحباً بك!' : 'Welcome!',
          description: language === 'ar' 
            ? 'تم التحقق من وصولك بنجاح'
            : 'Access verified successfully',
        });
      } else {
        toast({
          title: language === 'ar' ? 'وصول مرفوض' : 'Access Denied',
          description: language === 'ar' 
            ? 'البريد الإلكتروني غير مُصرح له أو لم تتم الموافقة على الطلب بعد'
            : 'Email not authorized or application not yet approved',
          variant: 'destructive'
        });
      }
      setIsVerifying(false);
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem('memberAuth');
    setIsAuthorized(false);
    setEmail('');
    setUserPlan('');
    toast({
      title: language === 'ar' ? 'تم تسجيل الخروج' : 'Logged Out',
      description: language === 'ar' 
        ? 'تم تسجيل خروجك بنجاح'
        : 'You have been logged out successfully',
    });
  };

  // Login page for non-authorized users
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
        <EnhancedNavigation />
        
        <main className="pt-20 flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-md mx-4">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl">
                {language === 'ar' ? 'منطقة الأعضاء' : 'Members Area'}
              </CardTitle>
              <p className="text-gray-600">
                {language === 'ar' 
                  ? 'أدخل بريدك الإلكتروني للوصول إلى المحتوى الحصري'
                  : 'Enter your email to access exclusive content'
                }
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleVerifyAccess()}
                />
              </div>
              
              <Button 
                onClick={handleVerifyAccess}
                disabled={isVerifying}
                className="w-full"
              >
                {isVerifying ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    {language === 'ar' ? 'جاري التحقق...' : 'Verifying...'}
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'دخول' : 'Access'}
                  </>
                )}
              </Button>
              
              <div className="text-center text-sm text-gray-500">
                <p>
                  {language === 'ar' 
                    ? 'متاح فقط للأعضاء المُصرح لهم'
                    : 'Available only to authorized members'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // Members dashboard for authorized users
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedNavigation />
      
      <main className="pt-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  {language === 'ar' ? 'مرحباً بك في منطقة الأعضاء' : 'Welcome to Members Area'}
                </h1>
                <p className="text-emerald-100 mb-4">
                  {language === 'ar' ? `مرحباً ${email}` : `Welcome ${email}`}
                </p>
                <Badge className="bg-white text-emerald-600">
                  {language === 'ar' ? `باقة ${userPlan}` : `${userPlan} Plan`}
                </Badge>
              </div>
              <Button variant="outline" onClick={handleLogout} className="border-white text-white hover:bg-white hover:text-emerald-600">
                {language === 'ar' ? 'تسجيل خروج' : 'Logout'}
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Training Schedules */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-emerald-600" />
                  {language === 'ar' ? 'جداول التدريب' : 'Training Schedules'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{language === 'ar' ? 'الأسبوع 1-2' : 'Week 1-2'}</p>
                    <p className="text-sm text-gray-600">{language === 'ar' ? 'برنامج البداية' : 'Beginner Program'}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    PDF
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{language === 'ar' ? 'الأسبوع 3-4' : 'Week 3-4'}</p>
                    <p className="text-sm text-gray-600">{language === 'ar' ? 'برنامج متوسط' : 'Intermediate Program'}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    PDF
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{language === 'ar' ? 'الأسبوع 5-8' : 'Week 5-8'}</p>
                    <p className="text-sm text-gray-600">{language === 'ar' ? 'برنامج متقدم' : 'Advanced Program'}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Diet Plans */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Apple className="w-5 h-5 text-emerald-600" />
                  {language === 'ar' ? 'الأنظمة الغذائية' : 'Diet Plans'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{language === 'ar' ? 'نظام حرق الدهون' : 'Fat Loss Diet'}</p>
                    <p className="text-sm text-gray-600">{language === 'ar' ? '1800 سعرة حرارية' : '1800 Calories'}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    PDF
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{language === 'ar' ? 'نظام بناء العضلات' : 'Muscle Building Diet'}</p>
                    <p className="text-sm text-gray-600">{language === 'ar' ? '2500 سعرة حرارية' : '2500 Calories'}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    PDF
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{language === 'ar' ? 'نظام المحافظة' : 'Maintenance Diet'}</p>
                    <p className="text-sm text-gray-600">{language === 'ar' ? '2200 سعرة حرارية' : '2200 Calories'}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Video Tutorials */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-emerald-600" />
                  {language === 'ar' ? 'فيديوهات تعليمية' : 'Video Tutorials'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{language === 'ar' ? 'تقنيات التمرين الصحيحة' : 'Proper Exercise Form'}</p>
                    <p className="text-sm text-gray-600">15 {language === 'ar' ? 'دقيقة' : 'minutes'}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Play className="w-4 h-4 mr-1" />
                    {language === 'ar' ? 'مشاهدة' : 'Watch'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{language === 'ar' ? 'تمارين الإحماء' : 'Warm-up Exercises'}</p>
                    <p className="text-sm text-gray-600">10 {language === 'ar' ? 'دقائق' : 'minutes'}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Play className="w-4 h-4 mr-1" />
                    {language === 'ar' ? 'مشاهدة' : 'Watch'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{language === 'ar' ? 'تمارين التمدد' : 'Stretching Routine'}</p>
                    <p className="text-sm text-gray-600">12 {language === 'ar' ? 'دقيقة' : 'minutes'}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Play className="w-4 h-4 mr-1" />
                    {language === 'ar' ? 'مشاهدة' : 'Watch'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Progress Tracking */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  {language === 'ar' ? 'متابعة التقدم' : 'Progress Tracking'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{language === 'ar' ? 'الأسبوع الحالي' : 'Current Week'}</span>
                    <Badge className="bg-emerald-100 text-emerald-800">3/4</Badge>
                  </div>
                  <div className="w-full bg-emerald-200 rounded-full h-2">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  {language === 'ar' ? 'تحديث التقدم' : 'Update Progress'}
                </Button>
              </CardContent>
            </Card>

            {/* Nutrition Tracker */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  {language === 'ar' ? 'متتبع التغذية' : 'Nutrition Tracker'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">1,650</p>
                  <p className="text-sm text-gray-600">{language === 'ar' ? 'سعرة حرارية اليوم' : 'calories today'}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{language === 'ar' ? 'البروتين' : 'Protein'}</span>
                    <span>120g</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{language === 'ar' ? 'الكارب' : 'Carbs'}</span>
                    <span>180g</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{language === 'ar' ? 'الدهون' : 'Fats'}</span>
                    <span>55g</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  {language === 'ar' ? 'الدعم والمساعدة' : 'Support & Help'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  {language === 'ar' ? 'تواصل مع المدرب' : 'Contact Coach'}
                </Button>
                
                <Button className="w-full" variant="outline">
                  {language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
                </Button>
                
                <Button className="w-full" variant="outline">
                  {language === 'ar' ? 'طلب مراجعة البرنامج' : 'Request Program Review'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Members;
