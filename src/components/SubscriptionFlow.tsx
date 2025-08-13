import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Phone, 
  CreditCard, 
  Upload, 
  CheckCircle, 
  Clock,
  Mail,
  AlertCircle,
  Lock
} from 'lucide-react';
import { subscriptionStorage } from '@/utils/subscriptionStorage';
import { useLanguage } from '@/contexts/LanguageContext';
import { apiClient } from '@/utils/api';

interface SubscriptionData {
  email: string;
  name: string;
  phone: string;
  password: string;
  paymentScreenshot: File | null;
  selectedPlan: string;
  goals: string;
}

type SubscriptionStep = 'details' | 'payment' | 'review' | 'submitted';

interface SubscriptionFlowProps {
  selectedPlan?: string;
  planPrice?: string;
  planName?: string;
}

export const SubscriptionFlow: React.FC<SubscriptionFlowProps> = ({ 
  selectedPlan = '', 
  planPrice = '', 
  planName = '' 
}) => {
  const [currentStep, setCurrentStep] = useState<SubscriptionStep>('details');
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({
    email: '',
    name: '',
    phone: '',
    password: '',
    paymentScreenshot: null,
    selectedPlan: selectedPlan,
    goals: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSubscriptionData(prev => ({ ...prev, paymentScreenshot: file }));
    }
  };

  const handleSubmitApplication = async () => {
    setIsLoading(true);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('email', subscriptionData.email);
      formData.append('name', subscriptionData.name);
      formData.append('phone', subscriptionData.phone);
      formData.append('password', subscriptionData.password);
      formData.append('selectedPlan', selectedPlan);
      formData.append('goals', subscriptionData.goals);
      
      if (subscriptionData.paymentScreenshot) {
        formData.append('paymentProof', subscriptionData.paymentScreenshot);
      }

      // Submit to backend
      await apiClient.submitSubscription(formData);
      
      setCurrentStep('submitted');
      toast({
        title: language === 'ar' ? "تم إرسال الطلب!" : "Application Submitted!",
        description: language === 'ar' 
          ? "تم إرسال طلبك للمراجعة من قبل المدرب"
          : "Your application has been sent to the coach for review.",
      });
    } catch (error) {
      toast({
        title: language === 'ar' ? "خطأ في الإرسال" : "Submission Error",
        description: language === 'ar' 
          ? "حدث خطأ أثناء إرسال الطلب"
          : "An error occurred while submitting your request",
        variant: "destructive"
      });
    }
    setIsLoading(false);
    }
  };

  const renderStepIndicator = () => {
    const steps = [
      { id: 'details', label: language === 'ar' ? 'التفاصيل' : 'Details', icon: User },
      { id: 'payment', label: language === 'ar' ? 'الدفع' : 'Payment', icon: Upload },
      { id: 'review', label: language === 'ar' ? 'المراجعة' : 'Review', icon: CheckCircle }
    ];

    const stepOrder = ['details', 'payment', 'review'];
    const currentStepIndex = stepOrder.indexOf(currentStep);

    return (
      <div className="flex items-center justify-center mb-8 px-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentStepIndex;
          const isCurrent = stepOrder[index] === currentStep;
          
          return (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                isActive 
                  ? 'bg-emerald-500 border-emerald-500 text-white' 
                  : 'bg-gray-100 border-gray-300 text-gray-400'
              } ${isCurrent ? 'ring-4 ring-emerald-200' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`ml-2 text-sm font-medium ${
                isActive ? 'text-emerald-600' : 'text-gray-400'
              } hidden sm:inline`}>
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-8 h-px mx-4 ${
                  index < currentStepIndex ? 'bg-emerald-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Details Step
  if (currentStep === 'details') {
    return (
      <div className="max-w-md mx-auto p-6">
        {renderStepIndicator()}
        
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {language === 'ar' ? 'أكمل طلبك' : 'Complete Your Application'}
            </CardTitle>
            <p className="text-gray-600">
              {language === 'ar' ? 'الباقة المختارة:' : 'Selected Plan:'} 
              <span className="font-semibold text-emerald-600"> {planName} - {planPrice}</span>
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">{language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}</Label>
              <Input
                id="email"
                type="email"
                placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email address'}
                value={subscriptionData.email}
                onChange={(e) => setSubscriptionData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="name">{language === 'ar' ? 'الاسم الكامل' : 'Full Name'}</Label>
              <Input
                id="name"
                type="text"
                placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                value={subscriptionData.name}
                onChange={(e) => setSubscriptionData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="phone">{language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+20 123 456 7890"
                value={subscriptionData.phone}
                onChange={(e) => setSubscriptionData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="password">{language === 'ar' ? 'كلمة المرور' : 'Password'}</Label>
              <Input
                id="password"
                type="password"
                placeholder={language === 'ar' ? 'اختر كلمة مرور قوية' : 'Choose a strong password'}
                value={subscriptionData.password}
                onChange={(e) => setSubscriptionData(prev => ({ ...prev, password: e.target.value }))}
              />
              <p className="text-xs text-gray-500 mt-1">
                {language === 'ar' 
                  ? 'ستستخدم هذه كلمة المرور للدخول إلى منطقة الأعضاء'
                  : 'You will use this password to access the members area'
                }
              </p>
            </div>
            
            <div>
              <Label htmlFor="goals">{language === 'ar' ? 'أهدافك في اللياقة' : 'Your Fitness Goals'}</Label>
              <Textarea
                id="goals"
                placeholder={language === 'ar' 
                  ? 'أخبرنا عن أهدافك في اللياقة البدنية والتحديات الحالية...'
                  : 'Tell us about your fitness goals, current challenges, and what you hope to achieve...'
                }
                value={subscriptionData.goals}
                onChange={(e) => setSubscriptionData(prev => ({ ...prev, goals: e.target.value }))}
                rows={4}
              />
            </div>
            
            <Button 
              onClick={() => setCurrentStep('payment')}
              disabled={!subscriptionData.email || !subscriptionData.name || !subscriptionData.phone || !subscriptionData.password || !subscriptionData.goals}
              className="w-full"
            >
              {language === 'ar' ? 'المتابعة للدفع' : 'Continue to Payment'}
            </Button>
            
            <div className="text-center text-sm text-gray-500">
              {language === 'ar' 
                ? 'بالمتابعة، أنت توافق على شروط الخدمة وسياسة الخصوصية'
                : 'By continuing, you agree to our Terms of Service and Privacy Policy'
              }
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Payment Screenshot Step
  if (currentStep === 'payment') {
    return (
      <div className="max-w-md mx-auto p-6">
        {renderStepIndicator()}
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {language === 'ar' ? 'التحقق من الدفع' : 'Payment Verification'}
            </CardTitle>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'قم برفع لقطة شاشة من تأكيد الدفع'
                : 'Upload a screenshot of your payment confirmation'
              }
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="bg-emerald-50 p-4 rounded-lg">
              <h3 className="font-semibold text-emerald-800">
                {language === 'ar' ? 'الباقة المختارة' : 'Selected Plan'}
              </h3>
              <p className="text-emerald-600">{planName} - {planPrice}</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">
                {language === 'ar' ? 'تعليمات الدفع' : 'Payment Instructions'}
              </h4>
              <ol className="text-sm text-blue-700 space-y-1">
                <li>{language === 'ar' ? '1. أرسل الدفع إلى: InstaPay - 01234567890' : '1. Send payment to: InstaPay - 01234567890'}</li>
                <li>{language === 'ar' ? '2. أو حوّل إلى: فودافون كاش - 01098765432' : '2. Or transfer to: Vodafone Cash - 01098765432'}</li>
                <li>{language === 'ar' ? '3. خذ لقطة شاشة من التأكيد' : '3. Take a screenshot of the confirmation'}</li>
                <li>{language === 'ar' ? '4. ارفعها أدناه' : '4. Upload it below'}</li>
              </ol>
            </div>
            
            <div>
              <Label htmlFor="payment-screenshot">
                {language === 'ar' ? 'لقطة شاشة الدفع' : 'Payment Screenshot'}
              </Label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-emerald-400 transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="payment-screenshot" className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500">
                      <span>{language === 'ar' ? 'ارفع ملف' : 'Upload a file'}</span>
                      <input
                        id="payment-screenshot"
                        name="payment-screenshot"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">{language === 'ar' ? 'أو اسحب وأفلت' : 'or drag and drop'}</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              {subscriptionData.paymentScreenshot && (
                <p className="mt-2 text-sm text-emerald-600">
                  ✓ {subscriptionData.paymentScreenshot.name}
                </p>
              )}
            </div>
            
            <Button 
              onClick={() => setCurrentStep('review')}
              disabled={!subscriptionData.paymentScreenshot}
              className="w-full"
            >
              {language === 'ar' ? 'المتابعة للمراجعة' : 'Continue to Review'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Review Step
  if (currentStep === 'review') {
    return (
      <div className="max-w-md mx-auto p-6">
        {renderStepIndicator()}
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {language === 'ar' ? 'راجع طلبك' : 'Review Your Application'}
            </CardTitle>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'تأكد من صحة المعلومات قبل الإرسال'
                : 'Please verify your information before submitting'
              }
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">{language === 'ar' ? 'الباقة:' : 'Plan:'}</span>
                <span>{planName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{language === 'ar' ? 'السعر:' : 'Price:'}</span>
                <span>{planPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{language === 'ar' ? 'الايميل:' : 'Email:'}</span>
                <span>{subscriptionData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{language === 'ar' ? 'الاسم:' : 'Name:'}</span>
                <span>{subscriptionData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{language === 'ar' ? 'الهاتف:' : 'Phone:'}</span>
                <span>{subscriptionData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{language === 'ar' ? 'كلمة المرور:' : 'Password:'}</span>
                <span className="text-emerald-600">✓ {language === 'ar' ? 'تم التعيين' : 'Set'}</span>
              </div>
              <div>
                <span className="font-medium">{language === 'ar' ? 'الأهداف:' : 'Goals:'}</span>
                <p className="text-sm text-gray-600 mt-1">{subscriptionData.goals}</p>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{language === 'ar' ? 'إثبات الدفع:' : 'Payment Proof:'}</span>
                <span className="text-emerald-600">✓ {language === 'ar' ? 'تم الرفع' : 'Uploaded'}</span>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" />
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold">
                    {language === 'ar' ? 'في انتظار المراجعة' : 'Pending Review'}
                  </p>
                  <p>
                    {language === 'ar' 
                      ? 'سيتم مراجعة طلبك من قبل المدرب خلال 24 ساعة. ستتلقى بريد إلكتروني برابط الوصول عند الموافقة.'
                      : 'Your application will be reviewed by the coach within 24 hours. You\'ll receive an email with your access link once approved.'
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleSubmitApplication}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading 
                ? (language === 'ar' ? 'جاري الإرسال...' : 'Submitting...') 
                : (language === 'ar' ? 'إرسال الطلب' : 'Submit Application')
              }
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Submitted Step
  if (currentStep === 'submitted') {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold mb-4">
          {language === 'ar' ? 'تم إرسال الطلب!' : 'Application Submitted!'}
        </h2>
        <p className="text-gray-600 mb-6">
          {language === 'ar' 
            ? 'شكراً لك على طلبك. سيقوم المدرب بمراجعة طلبك وإثبات الدفع خلال 24 ساعة.'
            : 'Thank you for your application. The coach will review your submission and payment proof within 24 hours.'
          }
        </p>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-start">
            <Clock className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold">
                {language === 'ar' ? 'ماذا يحدث الآن؟' : 'What happens next?'}
              </p>
              <ul className="text-left mt-2 space-y-1">
                <li>• {language === 'ar' ? 'المدرب يراجع دفعتك وملفك الشخصي' : 'Coach reviews your payment and profile'}</li>
                <li>• {language === 'ar' ? 'ستتلقى بريد إلكتروني بالموافقة' : 'You\'ll receive an approval email'}</li>
                <li>• {language === 'ar' ? 'احصل على رابط الوصول الحصري' : 'Get your exclusive access link'}</li>
                <li>• {language === 'ar' ? 'ابدأ رحلة التحول!' : 'Start your transformation journey!'}</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          <p>
            {language === 'ar' 
              ? 'أسئلة؟ تواصل معنا على support@coach.com'
              : 'Questions? Contact us at support@coach.com'
            }
          </p>
        </div>
      </div>
    );
  }

  return null;
};
