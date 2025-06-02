
import React, { useState, useEffect } from 'react';
import { EnhancedNavigation } from '@/components/EnhancedNavigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  subscriptionStorage, 
  TrainingResource, 
  VideoResource, 
  DailyUsage 
} from '@/utils/subscriptionStorage';
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
  Apple,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

const Members: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userPlan, setUserPlan] = useState('');
  const [trainingResources, setTrainingResources] = useState<TrainingResource[]>([]);
  const [videoResources, setVideoResources] = useState<VideoResource[]>([]);
  const [dailyUsage, setDailyUsage] = useState<DailyUsage>({
    email: '',
    date: '',
    trainingsAccessed: 0,
    videosAccessed: 0
  });
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
      loadUserData(authData.email);
    }
  }, []);

  const loadUserData = (userEmail: string) => {
    setTrainingResources(subscriptionStorage.getTrainingResources().filter(r => r.enabled));
    setVideoResources(subscriptionStorage.getVideoResources().filter(v => v.enabled));
    setDailyUsage(subscriptionStorage.getDailyUsage(userEmail));
  };

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

        loadUserData(email);

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

  const handleResourceAccess = (type: 'training' | 'video', url: string) => {
    const maxTrainings = 5;
    const maxVideos = 1;

    if (type === 'training' && dailyUsage.trainingsAccessed >= maxTrainings) {
      toast({
        title: language === 'ar' ? 'تم الوصول للحد الأقصى' : 'Daily Limit Reached',
        description: language === 'ar' 
          ? `يمكنك الوصول إلى ${maxTrainings} تدريبات يومياً فقط`
          : `You can only access ${maxTrainings} trainings per day`,
        variant: 'destructive'
      });
      return;
    }

    if (type === 'video' && dailyUsage.videosAccessed >= maxVideos) {
      toast({
        title: language === 'ar' ? 'تم الوصول للحد الأقصى' : 'Daily Limit Reached',
        description: language === 'ar' 
          ? `يمكنك مشاهدة ${maxVideos} فيديو يومياً فقط`
          : `You can only watch ${maxVideos} video per day`,
        variant: 'destructive'
      });
      return;
    }

    // Update usage
    subscriptionStorage.updateDailyUsage(email, type);
    setDailyUsage(subscriptionStorage.getDailyUsage(email));

    // Open resource
    window.open(url, '_blank');

    toast({
      title: language === 'ar' ? 'تم فتح المورد' : 'Resource Opened',
      description: language === 'ar' 
        ? 'تم فتح الرابط في نافذة جديدة'
        : 'Resource opened in new window',
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
                    {language === 'ar' ? 'دخول' : 'Sign In'}
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

        {/* Daily Usage Status */}
        <div className="container mx-auto px-4 py-6">
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-2">
                    {language === 'ar' ? 'الاستخدام اليومي' : 'Daily Usage'}
                  </h3>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">
                        {language === 'ar' ? 'التدريبات:' : 'Trainings:'} {dailyUsage.trainingsAccessed}/5
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4 text-red-600" />
                      <span className="text-sm">
                        {language === 'ar' ? 'الفيديوهات:' : 'Videos:'} {dailyUsage.videosAccessed}/1
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'يتم إعادة تعيين الحدود يومياً' : 'Limits reset daily'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 pb-12">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Training Resources */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-emerald-600" />
                  {language === 'ar' ? 'التدريبات والأنظمة الغذائية' : 'Training & Diet Plans'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trainingResources.map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">
                        {language === 'ar' ? resource.title.ar : resource.title.en}
                      </p>
                      <p className="text-sm text-gray-600">
                        <Badge className="mr-2">
                          {resource.type === 'training' ? 
                            (language === 'ar' ? 'تدريب' : 'Training') : 
                            (language === 'ar' ? 'نظام غذائي' : 'Diet')
                          }
                        </Badge>
                        {language === 'ar' ? resource.description.ar : resource.description.en}
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleResourceAccess('training', resource.pdfUrl)}
                      disabled={dailyUsage.trainingsAccessed >= 5}
                    >
                      {dailyUsage.trainingsAccessed >= 5 ? (
                        <AlertCircle className="w-4 h-4 mr-1" />
                      ) : (
                        <Download className="w-4 h-4 mr-1" />
                      )}
                      PDF
                    </Button>
                  </div>
                ))}
                
                {trainingResources.length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>{language === 'ar' ? 'لا توجد موارد متاحة' : 'No resources available'}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Video Resources */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-emerald-600" />
                  {language === 'ar' ? 'فيديوهات تعليمية' : 'Video Tutorials'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {videoResources.map((video) => (
                  <div key={video.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">
                        {language === 'ar' ? video.title.ar : video.title.en}
                      </p>
                      <p className="text-sm text-gray-600">
                        {language === 'ar' ? video.description.ar : video.description.en}
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleResourceAccess('video', video.videoUrl)}
                      disabled={dailyUsage.videosAccessed >= 1}
                    >
                      {dailyUsage.videosAccessed >= 1 ? (
                        <AlertCircle className="w-4 h-4 mr-1" />
                      ) : (
                        <ExternalLink className="w-4 h-4 mr-1" />
                      )}
                      {language === 'ar' ? 'مشاهدة' : 'Watch'}
                    </Button>
                  </div>
                ))}
                
                {videoResources.length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    <Play className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>{language === 'ar' ? 'لا توجد فيديوهات متاحة' : 'No videos available'}</p>
                  </div>
                )}
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
