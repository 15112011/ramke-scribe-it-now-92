
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
  AlertCircle
} from 'lucide-react';

interface SubscriptionData {
  email: string;
  name: string;
  phone: string;
  paymentScreenshot: File | null;
  selectedPlan: string;
  goals: string;
}

type SubscriptionStep = 'plan' | 'auth' | 'details' | 'payment' | 'review' | 'submitted';

export const SubscriptionFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<SubscriptionStep>('plan');
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({
    email: '',
    name: '',
    phone: '',
    paymentScreenshot: null,
    selectedPlan: '',
    goals: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const plans = [
    {
      id: 'basic',
      name: 'Basic Training',
      price: '$99',
      duration: '1 Month',
      features: [
        'Personalized workout plan',
        'Basic nutrition guidance',
        'Weekly check-ins',
        'Email support'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Transformation',
      price: '$249',
      duration: '3 Months',
      popular: true,
      features: [
        'Complete transformation program',
        'Detailed meal plans',
        'Daily coaching support',
        'Video form checks',
        'Supplement guidance',
        'Progress tracking'
      ]
    },
    {
      id: 'elite',
      name: 'Elite Coaching',
      price: '$499',
      duration: '6 Months',
      features: [
        'One-on-one coaching sessions',
        'Custom meal prep plans',
        '24/7 coach access',
        'Monthly body composition analysis',
        'Competition prep (if desired)',
        'Lifestyle coaching'
      ]
    }
  ];

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    // Simulate Google OAuth flow
    setTimeout(() => {
      setSubscriptionData(prev => ({
        ...prev,
        email: 'user@gmail.com',
        name: 'John Doe'
      }));
      setCurrentStep('details');
      setIsLoading(false);
      toast({
        title: "Signed in successfully!",
        description: "Please complete your details to continue.",
      });
    }, 1500);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSubscriptionData(prev => ({ ...prev, paymentScreenshot: file }));
    }
  };

  const handleSubmitApplication = async () => {
    setIsLoading(true);
    
    // Simulate API call to submit application
    setTimeout(() => {
      setCurrentStep('submitted');
      setIsLoading(false);
      toast({
        title: "Application Submitted!",
        description: "Your application has been sent to the coach for review.",
      });
    }, 2000);
  };

  const renderStepIndicator = () => {
    const steps = [
      { id: 'plan', label: 'Choose Plan', icon: CreditCard },
      { id: 'auth', label: 'Sign In', icon: User },
      { id: 'details', label: 'Details', icon: Phone },
      { id: 'payment', label: 'Payment', icon: Upload },
      { id: 'review', label: 'Review', icon: CheckCircle }
    ];

    const stepOrder = ['plan', 'auth', 'details', 'payment', 'review'];
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

  // Plan Selection Step
  if (currentStep === 'plan') {
    return (
      <div className="max-w-6xl mx-auto p-6">
        {renderStepIndicator()}
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Choose Your Transformation Plan</h2>
          <p className="text-gray-600">Select the plan that best fits your goals and commitment level</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                plan.popular ? 'border-2 border-emerald-500 relative' : ''
              } ${subscriptionData.selectedPlan === plan.id ? 'ring-2 ring-emerald-500' : ''}`}
              onClick={() => {
                setSubscriptionData(prev => ({ ...prev, selectedPlan: plan.id }));
                setCurrentStep('auth');
              }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-emerald-500">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-emerald-600">{plan.price}</div>
                <div className="text-gray-500">{plan.duration}</div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Google Sign In Step
  if (currentStep === 'auth') {
    return (
      <div className="max-w-md mx-auto p-6">
        {renderStepIndicator()}
        
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Sign In to Continue</CardTitle>
            <p className="text-gray-600">Use your Google account for quick and secure access</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Button 
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin mr-2" />
              ) : (
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              Continue with Google
            </Button>
            
            <div className="text-center text-sm text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Details Step
  if (currentStep === 'details') {
    return (
      <div className="max-w-md mx-auto p-6">
        {renderStepIndicator()}
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
            <p className="text-gray-600">Help us personalize your training experience</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={subscriptionData.phone}
                onChange={(e) => setSubscriptionData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="goals">Your Fitness Goals</Label>
              <Textarea
                id="goals"
                placeholder="Tell us about your fitness goals, current challenges, and what you hope to achieve..."
                value={subscriptionData.goals}
                onChange={(e) => setSubscriptionData(prev => ({ ...prev, goals: e.target.value }))}
                rows={4}
              />
            </div>
            
            <Button 
              onClick={() => setCurrentStep('payment')}
              disabled={!subscriptionData.phone || !subscriptionData.goals}
              className="w-full"
            >
              Continue to Payment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Payment Screenshot Step
  if (currentStep === 'payment') {
    const selectedPlan = plans.find(p => p.id === subscriptionData.selectedPlan);
    
    return (
      <div className="max-w-md mx-auto p-6">
        {renderStepIndicator()}
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Payment Verification</CardTitle>
            <p className="text-gray-600">Upload a screenshot of your payment confirmation</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="bg-emerald-50 p-4 rounded-lg">
              <h3 className="font-semibold text-emerald-800">Selected Plan</h3>
              <p className="text-emerald-600">{selectedPlan?.name} - {selectedPlan?.price}</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Payment Instructions</h4>
              <ol className="text-sm text-blue-700 space-y-1">
                <li>1. Send payment to: coach@example.com (PayPal)</li>
                <li>2. Or transfer to: Bank Account XXX-XXXX-XXXX</li>
                <li>3. Take a screenshot of the confirmation</li>
                <li>4. Upload it below</li>
              </ol>
            </div>
            
            <div>
              <Label htmlFor="payment-screenshot">Payment Screenshot</Label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-emerald-400 transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="payment-screenshot" className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500">
                      <span>Upload a file</span>
                      <input
                        id="payment-screenshot"
                        name="payment-screenshot"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
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
              Continue to Review
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Review Step
  if (currentStep === 'review') {
    const selectedPlan = plans.find(p => p.id === subscriptionData.selectedPlan);
    
    return (
      <div className="max-w-md mx-auto p-6">
        {renderStepIndicator()}
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Review Your Application</CardTitle>
            <p className="text-gray-600">Please verify your information before submitting</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Plan:</span>
                <span>{selectedPlan?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Price:</span>
                <span>{selectedPlan?.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Email:</span>
                <span>{subscriptionData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Phone:</span>
                <span>{subscriptionData.phone}</span>
              </div>
              <div>
                <span className="font-medium">Goals:</span>
                <p className="text-sm text-gray-600 mt-1">{subscriptionData.goals}</p>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Payment Proof:</span>
                <span className="text-emerald-600">✓ Uploaded</span>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" />
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold">Pending Review</p>
                  <p>Your application will be reviewed by the coach within 24 hours. You'll receive an email with your access link once approved.</p>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleSubmitApplication}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Submitting...' : 'Submit Application'}
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
        
        <h2 className="text-2xl font-bold mb-4">Application Submitted!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your application. The coach will review your submission and payment proof within 24 hours.
        </p>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-start">
            <Clock className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold">What happens next?</p>
              <ul className="text-left mt-2 space-y-1">
                <li>• Coach reviews your payment and profile</li>
                <li>• You'll receive an approval email</li>
                <li>• Get your exclusive access link</li>
                <li>• Start your transformation journey!</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          <p>Questions? Contact us at support@coach.com</p>
        </div>
      </div>
    );
  }

  return null;
};
