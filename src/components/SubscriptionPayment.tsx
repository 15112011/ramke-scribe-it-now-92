
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 799,
    interval: 'month',
    icon: <Zap className="w-6 h-6" />,
    features: [
      'Up to 5 sections',
      'Basic templates',
      'Email support',
      'Mobile responsive'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 1999,
    interval: 'month',
    icon: <Star className="w-6 h-6" />,
    popular: true,
    features: [
      'Unlimited sections',
      'Premium templates',
      'Priority support',
      'Advanced analytics',
      'Custom domain',
      'SEO optimization'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 4999,
    interval: 'month',
    icon: <Crown className="w-6 h-6" />,
    features: [
      'Everything in Premium',
      'White-label solution',
      'API access',
      'Dedicated support',
      'Custom integrations',
      'Advanced security'
    ]
  }
];

export const SubscriptionPayment: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubscribe = async (planId: string) => {
    try {
      setLoading(planId);
      
      if (!supabase) {
        toast({
          title: "Configuration Required",
          description: "Supabase configuration is required for payments. Please set up your environment variables.",
          variant: "destructive"
        });
        return;
      }

      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to subscribe to a plan.",
          variant: "destructive"
        });
        return;
      }

      // Call the create-checkout edge function
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planId },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription Error",
        description: "Failed to start subscription process. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(null);
    }
  };

  // Show configuration message if Supabase is not configured
  if (!supabase) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Choose Your Plan
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Unlock premium features with our subscription plans
          </p>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            Configuration Required
          </h3>
          <p className="text-yellow-700 dark:text-yellow-300">
            To enable payments, please configure your Supabase environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-50">
          {plans.map((plan) => (
            <Card key={plan.id} className="relative">
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white px-3 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-2">
                  <div className="p-3 rounded-full bg-gray-100 text-gray-600">
                    {plan.icon}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold">
                  {plan.name}
                </CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">
                    ${(plan.price / 100).toFixed(2)}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    /{plan.interval}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button disabled className="w-full bg-gray-400">
                  Configure Supabase First
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Choose Your Plan
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Unlock premium features with our subscription plans
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${
              plan.popular 
                ? 'border-2 border-blue-500 shadow-lg scale-105' 
                : 'border border-gray-200 dark:border-gray-700'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white px-3 py-1">
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-2">
                <div className={`p-3 rounded-full ${
                  plan.popular 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {plan.icon}
                </div>
              </div>
              <CardTitle className="text-xl font-bold">
                {plan.name}
              </CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">
                  ${(plan.price / 100).toFixed(2)}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  /{plan.interval}
                </span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Button
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading === plan.id}
                className={`w-full ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-800 hover:bg-gray-900'
                }`}
              >
                {loading === plan.id ? 'Processing...' : 'Subscribe Now'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p>All plans include a 7-day free trial. Cancel anytime.</p>
        <p>Secure payments powered by Stripe.</p>
      </div>
    </div>
  );
};
