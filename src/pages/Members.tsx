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
  ExternalLink,
  Timer
} from 'lucide-react';
import { apiClient } from '@/utils/api';

interface UserResource {
  videos: Array<{ title: string; url: string; assignedAt: string }>;
  documents: Array<{ title: string; url: string; type: string; assignedAt: string }>;
}

interface DailyUsage {
  date: string;
  trainingsAccessed: number;
  videosAccessed: number;
}

interface UserData {
  id: string;
  email: string;
  name: string;
  subscription: {
    plan: string;
    status: string;
    endDate?: string;
  };
  resources: UserResource;
  dailyUsage: DailyUsage;
}

const Members: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [canAttemptLogin, setCanAttemptLogin] = useState(true);
  const [remainingTime, setRemainingTime] = useState(0);
  const { language } = useLanguage();
  const { toast } = useToast();

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedAuth = localStorage.getItem('memberAuth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        setEmail(authData.email);
        verifyTokenAndLoadData(authData.token);
      } catch (error) {
        localStorage.removeItem('memberAuth');
      }
    }
  }, []);

  // Countdown timer for login attempts
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            setCanAttemptLogin(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [remainingTime]);

  const verifyTokenAndLoadData = async (token: string) => {
    try {
      apiClient.token = token;
      const response = await apiClient.getMyResources();
      setUserData(response.user);
      setIsAuthorized(true);
    } catch (error) {
      localStorage.removeItem('memberAuth');
      setIsAuthorized(false);
    }
  };

  const handleVerifyAccess = () => {
    if (!email || !password) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' 
          ? 'يرجى إدخال البريد الإلكتروني وكلمة المرور'
          : 'Please enter your email and password',
        variant: 'destructive'
      });
      return;
    }

    if (!canAttemptLogin) {
      toast({
        title: language === 'ar' ? 'انتظر قليلاً' : 'Please Wait',
        description: language === 'ar' 
          ? `يرجى الانتظار ${remainingTime} ثانية قبل المحاولة مرة أخرى`
          : `Please wait ${remainingTime} seconds before trying again`,
        variant: 'destructive'
      });
      return;
    }

    setIsVerifying(true);

    setTimeout(async () => {
      try {
        const response = await apiClient.login(email, password);
        
        setIsAuthorized(true);
        setUserData(response.user);
        
        // Save auth state
        localStorage.setItem('memberAuth', JSON.stringify({
          email: email,
          token: response.token,
          plan: response.user.subscription.plan,
          loginTime: new Date().toISOString()
        }));

        toast({
          title: language === 'ar' ? 'مرحباً بك!' : 'Welcome!',
          description: language === 'ar' 
            ? 'تم تسجيل الدخول بنجاح'
            : 'Successfully logged in',
        });
      } catch (error: any) {
        setCanAttemptLogin(false);
        setRemainingTime(60); // 1 minute countdown
        
        toast({
          title: language === 'ar' ? 'فشل تسجيل الدخول' : 'Login Failed',
          description: error.message || (language === 'ar' 
            ? 'بيانات الدخول غير صحيحة أو منتهية الصلاحية'
            : 'Invalid credentials or expired access'),
          variant: 'destructive'
        });
      }
      setIsVerifying(false);
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem('memberAuth');
    localStorage.removeItem('authToken');
    setIsAuthorized(false);
    setEmail('');
    setPassword('');
    setUserData(null);
    toast({
      title: language === 'ar' ? 'تم تسجيل الخروج' : 'Logged Out',
      description: language === 'ar' 
        ? 'تم تسجيل خروجك بنجاح'
        : 'You have been logged out successfully',
    });
  };

  const handleResourceAccess = async (type: 'training' | 'video', url: string) => {
    try {
      await apiClient.accessResource(type);
      
      // Update local user data
      const updatedData = await apiClient.getMyResources();
      setUserData(prev => prev ? { ...prev, dailyUsage: updatedData.dailyUsage } : null);
      
      // Open resource
      window.open(url, '_blank');
      
      toast({
        title: language === 'ar' ? 'تم فتح المورد' : 'Resource Opened',
        description: language === 'ar' 
          ? 'تم فتح الرابط في نافذة جديدة'
          : 'Resource opened in new window',
      });
    } catch (error: any) {
      toast({
        title: language === 'ar' ? 'تم الوصول للحد الأقصى' : 'Daily Limit Reached',
        description: error.message,
        variant: 'destructive'
      });
    }
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
                  ? 'أدخل بياناتك للوصول إلى المحتوى الحصري'
                  : 'Enter your credentials to access exclusive content'
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
                />
              </div>
              
              <div>
                <Input
                  type="password"
                  placeholder={language === 'ar' ? 'كلمة المرور' : 'Password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleVerifyAccess()}
                />
              </div>
              
              <Button 
                onClick={handleVerifyAccess}
                disabled={isVerifying || !canAttemptLogin}
                className="w-full"
              >
                {isVerifying ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    {language === 'ar' ? 'جاري التحقق...' : 'Verifying...'}
                  </>
                ) : !canAttemptLogin ? (
                  <>
                    <Timer className="w-4 h-4 mr-2" />
                    {language === 'ar' ? `انتظر ${remainingTime}ث` : `Wait ${remainingTime}s`}
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
                {!canAttemptLogin && (
                  <p className="text-red-500 mt-2">
                    {language === 'ar' 
                      ? 'يجب الانتظار دقيقة واحدة بين محاولات تسجيل الدخول'
                      : '1-minute delay between login attempts'
                    }
                  </p>
                )}
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
        {/* Header with improved styling */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-5xl font-bold mb-4 leading-tight">
                  {language === 'ar' ? 'مرحباً بك في منطقة الأعضاء' : 'Welcome to Members Area'}
                </h1>
                <p className="text-emerald-100 mb-6 text-lg">
                  {language === 'ar' ? `أهلاً وسهلاً ${email}` : `Hello ${email}`}
                </p>
                <div className="flex gap-3 flex-wrap">
                  {userData && (
                    <>
                      <Badge className="bg-white text-emerald-700 hover:bg-emerald-50 px-4 py-2 text-sm font-semibold">
                        {language === 'ar' ? `باقة ${userData.subscription.plan}` : `${userData.subscription.plan} Plan`}
                      </Badge>
                      {userData.subscription.endDate && (
                        <Badge variant="outline" className="bg-emerald-500 text-white border-white hover:bg-emerald-400 px-4 py-2 text-sm font-semibold">
                          {language === 'ar' ? 'تنتهي في:' : 'Expires:'} {new Date(userData.subscription.endDate).toLocaleDateString()}
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              </div>
              <Button variant="outline" onClick={handleLogout} className="border-white text-white hover:bg-white hover:text-emerald-600 font-semibold">
                {language === 'ar' ? 'تسجيل خروج' : 'Logout'}
              </Button>
            </div>
          </div>
        </div>

        {/* Daily Usage Status with improved styling */}
        <div className="container mx-auto px-4 py-8">
          <Card className="mb-8 shadow-lg border-0 bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {language === 'ar' ? 'الاستخدام اليومي' : 'Daily Usage'}
                  </h3>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 block">
                          {language === 'ar' ? 'التدريبات' : 'Trainings'}
                        </span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {userData?.dailyUsage.trainingsAccessed || 0}/5
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <Play className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 block">
                          {language === 'ar' ? 'الفيديوهات' : 'Videos'}
                        </span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {userData?.dailyUsage.videosAccessed || 0}/1
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-gray-600 border-gray-300">
                    {language === 'ar' ? 'يتم إعادة تعيين الحدود يومياً' : 'Limits reset daily'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid with improved styling */}
        <div className="container mx-auto px-4 pb-12">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Training Resources with better styling */}
            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl text-gray-900 dark:text-white">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-emerald-600" />
                  </div>
                  {language === 'ar' ? 'التدريبات والأنظمة الغذائية' : 'Training & Diet Plans'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userData?.resources.documents.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">
                        {resource.title}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`${resource.type === 'training' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'} border-0`}>
                          {resource.type === 'training' ? 
                            (language === 'ar' ? 'تدريب' : 'Training') : 
                            (language === 'ar' ? 'نظام غذائي' : 'Diet')
                          }
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Assigned: {new Date(resource.assignedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      variant={userData?.dailyUsage.trainingsAccessed >= 5 ? "outline" : "default"}
                      onClick={() => handleResourceAccess('training', resource.url)}
                      disabled={userData?.dailyUsage.trainingsAccessed >= 5}
                      className={userData?.dailyUsage.trainingsAccessed >= 5 ? "opacity-50" : "bg-emerald-600 hover:bg-emerald-700"}
                    >
                      {userData?.dailyUsage.trainingsAccessed >= 5 ? (
                        <AlertCircle className="w-4 h-4 mr-1" />
                      ) : (
                        <Download className="w-4 h-4 mr-1" />
                      )}
                      PDF
                    </Button>
                  </div>
                ))}
                
                {(!userData?.resources.documents || userData.resources.documents.length === 0) && (
                  <div className="text-center text-gray-500 py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 opacity-50" />
                    </div>
                    <p className="text-lg">{language === 'ar' ? 'لا توجد موارد متاحة' : 'No resources available'}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Video Resources with better styling */}
            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl text-gray-900 dark:text-white">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Play className="w-6 h-6 text-red-600" />
                  </div>
                  {language === 'ar' ? 'فيديوهات تعليمية' : 'Video Tutorials'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userData?.resources.videos.map((video, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">
                        {video.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Assigned: {new Date(video.assignedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      variant={userData?.dailyUsage.videosAccessed >= 1 ? "outline" : "default"}
                      onClick={() => handleResourceAccess('video', video.url)}
                      disabled={userData?.dailyUsage.videosAccessed >= 1}
                      className={userData?.dailyUsage.videosAccessed >= 1 ? "opacity-50" : "bg-red-600 hover:bg-red-700"}
                    >
                      {userData?.dailyUsage.videosAccessed >= 1 ? (
                        <AlertCircle className="w-4 h-4 mr-1" />
                      ) : (
                        <ExternalLink className="w-4 h-4 mr-1" />
                      )}
                      {language === 'ar' ? 'مشاهدة' : 'Watch'}
                    </Button>
                  </div>
                ))}
                
                {(!userData?.resources.videos || userData.resources.videos.length === 0) && (
                  <div className="text-center text-gray-500 py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 opacity-50" />
                    </div>
                    <p className="text-lg">{language === 'ar' ? 'لا توجد فيديوهات متاحة' : 'No videos available'}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Progress Tracking with better styling */}
            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl text-gray-900 dark:text-white">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  {language === 'ar' ? 'متابعة التقدم' : 'Progress Tracking'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {language === 'ar' ? 'الأسبوع الحالي' : 'Current Week'}
                    </span>
                    <Badge className="bg-emerald-100 text-emerald-800 border-0 font-bold">3/4</Badge>
                  </div>
                  <div className="w-full bg-emerald-200 dark:bg-emerald-800 rounded-full h-3">
                    <div className="bg-emerald-600 h-3 rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
                  </div>
                </div>
                
                <Button className="w-full bg-purple-600 hover:bg-purple-700 font-semibold py-3" variant="default">
                  <FileText className="w-4 h-4 mr-2" />
                  {language === 'ar' ? 'تحديث التقدم' : 'Update Progress'}
                </Button>
              </CardContent>
            </Card>

            {/* Support with better styling */}
            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl text-gray-900 dark:text-white">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                  {language === 'ar' ? 'الدعم والمساعدة' : 'Support & Help'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-orange-600 hover:bg-orange-700 font-semibold py-3" variant="default">
                  {language === 'ar' ? 'تواصل مع المدرب' : 'Contact Coach'}
                </Button>
                
                <Button className="w-full font-semibold py-3" variant="outline">
                  {language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
                </Button>
                
                <Button className="w-full font-semibold py-3" variant="outline">
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