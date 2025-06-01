import React, { useEffect } from 'react';
import { Star, Users, Clock, TrendingUp, Phone, MessageCircle, Instagram, CheckCircle, Dumbbell, Award, Target, Zap, Heart, Calendar, Map, ChevronDown, PlayCircle, Timer, Trophy, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { EnhancedNavigation } from '@/components/EnhancedNavigation';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { ProgressTracker } from '@/components/ProgressTracker';
import { InteractiveTestimonials } from '@/components/InteractiveTestimonials';
import { VideoModal } from '@/components/VideoModal';
import { CountdownTimer } from '@/components/CountdownTimer';
import { ParticleBackground } from '@/components/ParticleBackground';
import { BeforeAfterResults } from '@/components/BeforeAfterResults';

const Index = () => {
  const {
    language,
    t
  } = useLanguage();
  const {
    settings
  } = useAdmin();

  // Initialize AOS animation library
  useEffect(() => {
    const initAOS = () => {
      // AOS animation library simulation
      const elements = document.querySelectorAll('[data-aos]');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('aos-animate');
        }, index * 100);
      });
    };
    initAOS();

    // Initialize particles effect
    const canvas = document.getElementById('particles-canvas') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        for (let i = 0; i < 50; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1
          });
        }
        
        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = 'rgba(34, 197, 94, 0.1)';
          particles.forEach(particle => {
            particle.x += particle.dx;
            particle.y += particle.dy;
            if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
          });
          requestAnimationFrame(animate);
        };
        animate();
      }
    }
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-500 relative overflow-x-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Enhanced Navigation */}
      <EnhancedNavigation />
      
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Hero Section */}
      <section id="home" className="relative py-32 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 dark:from-emerald-800 dark:via-emerald-700 dark:to-green-700 min-h-screen flex items-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <AnimatedSection className="lg:w-1/2 text-center lg:text-left" animation="fade-right">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-white text-sm font-semibold mb-4 animate-bounce">
                  🏆 {language === 'ar' ? 'مدرب العام 2024' : '2024 Trainer of the Year'}
                </span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                {language === 'ar' ? settings.content.heroTitle : 'Transform Your Body, Transform Your Life'}
                <span className="block text-green-200 typewriter">
                  {language === 'ar' ? 'مع عمر أشرف' : 'with Omar Ashraf'}
                </span>
              </h1>
              
              <p className="text-2xl text-green-50 mb-10 leading-relaxed">
                {language === 'ar' ? settings.content.heroSubtitle : 'Certified personal trainer with 5+ years of experience helping clients achieve their dream physique through science-based training and nutrition.'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-green-50 hover:text-emerald-700 text-xl px-10 py-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl font-bold rounded-full">
                  <PlayCircle className="w-6 h-6 mr-3" />
                  {language === 'ar' ? settings.buttons.startJourney : 'Start Your Transformation'}
                </Button>
                
                <Button size="lg" variant="outline" className="text-xl px-10 py-6 border-2 border-white text-white hover:bg-white hover:text-emerald-600 transform transition-all duration-300 hover:scale-105 shadow-xl font-bold rounded-full">
                  <Trophy className="w-6 h-6 mr-3" />
                  {language === 'ar' ? settings.buttons.viewResults : 'View Success Stories'}
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center justify-center lg:justify-start gap-8 text-white/90">
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm">{language === 'ar' ? 'عميل سعيد' : 'Happy Clients'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-sm">{language === 'ar' ? 'نسبة النجاح' : 'Success Rate'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">5+</div>
                  <div className="text-sm">{language === 'ar' ? 'سنوات خبرة' : 'Years Experience'}</div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection className="lg:w-1/2" animation="fade-left" delay={200}>
              <div className="relative">
                <div className="relative z-10">
                  <img src={settings.heroImage} alt="Omar Ashraf - Elite Personal Trainer" className="rounded-3xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-500 hover:scale-105 hover:shadow-3xl" />
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm text-emerald-600 p-4 rounded-2xl animate-bounce shadow-xl">
                    <Dumbbell className="w-8 h-8" />
                  </div>
                  
                  <div className="absolute -bottom-6 -left-6 bg-emerald-500 text-white p-4 rounded-2xl animate-pulse shadow-xl">
                    <Star className="w-8 h-8" />
                  </div>
                  
                  <div className="absolute top-1/2 -left-8 bg-white/90 backdrop-blur-sm text-emerald-600 p-3 rounded-xl animate-bounce delay-500 shadow-lg">
                    <Heart className="w-6 h-6" />
                  </div>
                </div>
                
                {/* Glowing Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
              </div>
            </AnimatedSection>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/70" />
        </div>
      </section>

      {/* Progress Tracker */}
      <ProgressTracker />

      {/* Before/After Results Section */}
      <BeforeAfterResults />

      {/* Enhanced Stats Section */}
      <AnimatedSection animation="fade-up">
        <section className="py-20 bg-white dark:bg-gray-900 transition-all duration-500 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">
                {language === 'ar' ? 'أرقام تتحدث عن نفسها' : 'Results That Speak Volumes'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {language === 'ar' ? 'إحصائيات حقيقية من عملائنا المتميزين' : 'Real statistics from our exceptional clients who transformed their lives'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Users, value: "500+", label: language === 'ar' ? 'عميل متحول' : 'Transformed Clients', color: 'text-emerald-500' },
                { icon: Trophy, value: "98%", label: language === 'ar' ? 'نسبة النجاح' : 'Success Rate', color: 'text-emerald-500' },
                { icon: Award, value: "50+", label: language === 'ar' ? 'جائزة وشهادة' : 'Awards & Certifications', color: 'text-emerald-500' },
                { icon: Clock, value: "24/7", label: language === 'ar' ? 'دعم مستمر' : 'Continuous Support', color: 'text-emerald-500' }
              ].map((stat, index) => (
                <AnimatedSection key={index} animation="scale" delay={index * 150}>
                  <div className="text-center group hover:scale-110 transition-transform duration-300">
                    <div className={`bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-800/20 dark:to-green-800/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform transition-all duration-300 group-hover:shadow-2xl shadow-lg ${stat.color}`}>
                      <stat.icon className="w-10 h-10" />
                    </div>
                    <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Enhanced Gallery with Lightbox */}
      <AnimatedSection animation="fade-up">
        <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-all duration-500">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">
                {language === 'ar' ? 'معرض التحولات' : 'Transformation Gallery'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {language === 'ar' ? 'شاهد قصص النجاح الحقيقية' : 'Witness real success stories from our community'}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {settings.galleryImages.map((image, index) => <AnimatedSection key={index} animation="scale" delay={index * 100}>
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                    <img src={image} alt={`Transformation ${index + 1}`} className="w-full h-80 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110" />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
                      <div className="text-white text-center p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-xl font-bold mb-2">
                          {language === 'ar' ? `تحول ${index + 1}` : `Transformation ${index + 1}`}
                        </h3>
                        <p className="text-sm opacity-90">
                          {language === 'ar' ? 'اضغط للمشاهدة' : 'Click to view details'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Play Icon */}
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <PlayCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </AnimatedSection>)}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* About Section with Timeline */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-all duration-500 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">
                  {language === 'ar' ? 'تعرف على المدرب' : 'Meet Your Trainer'}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  {language === 'ar' ? settings.aboutText : 'Certified personal trainer with extensive experience in fitness and nutrition. My mission is to help you achieve your goals and become the best version of yourself through science-based training methods.'}
                </p>
              </div>
            </AnimatedSection>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection animation="fade-right" delay={200}>
                <div className="space-y-8">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-8 rounded-2xl shadow-lg">
                    <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
                      <Award className="w-8 h-8 text-green-500 mr-3" />
                      {language === 'ar' ? settings.specialties.certifications.title : 'Certifications & Credentials'}
                    </h3>
                    <ul className="space-y-4">
                      {(language === 'ar' ? settings.specialties.certifications.items : ['NASM Certified Personal Trainer', 'Precision Nutrition Level 1', 'Functional Movement Screen (FMS)', 'CPR/AED Certified', '5+ Years Professional Experience']).map((item, index) => <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="font-medium">{item}</span>
                        </li>)}
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-2xl shadow-lg">
                    <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
                      <Target className="w-8 h-8 text-blue-500 mr-3" />
                      {language === 'ar' ? settings.specialties.specializations.title : 'Areas of Expertise'}
                    </h3>
                    <ul className="space-y-4">
                      {(language === 'ar' ? settings.specialties.specializations.items : ['Muscle Building & Hypertrophy', 'Fat Loss & Body Composition', 'Strength Training & Powerlifting', 'Functional Fitness & Mobility', 'Sports Performance Enhancement']).map((item, index) => <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                          <Zap className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                          <span className="font-medium">{item}</span>
                        </li>)}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-left" delay={300}>
                <div className="relative">
                  <img src={settings.heroImage} alt="Omar Ashraf Professional Photo" className="rounded-2xl shadow-2xl w-full max-w-lg mx-auto" />
                  
                  {/* Achievement Badges */}
                  <div className="absolute -top-6 -left-6 bg-yellow-400 text-gray-800 p-4 rounded-2xl shadow-xl animate-pulse">
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm font-medium">
                      {language === 'ar' ? 'عميل' : 'Clients'}
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-6 -right-6 bg-green-500 text-white p-4 rounded-2xl shadow-xl animate-pulse delay-500">
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-sm font-medium">
                      {language === 'ar' ? 'نجاح' : 'Success'}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Packages Section */}
      <section id="packages" className="py-20 bg-gray-50 dark:bg-gray-800 transition-all duration-500 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">
                {language === 'ar' ? settings.content.packagesTitle : 'Choose Your Transformation Package'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {language === 'ar' ? 'اختر الباقة التي تناسب أهدافك وميزانيتك' : 'Select the perfect package that fits your goals and budget. Each package includes personalized training and nutrition guidance.'}
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            {/* Basic Package */}
            <AnimatedSection animation="fade-up" delay={100}>
              <Card className="relative border-2 border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 transition-all duration-300 transform hover:scale-105 bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-400 to-gray-500"></div>
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Activity className="w-10 h-10 text-gray-600 dark:text-gray-300" />
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                    {language === 'ar' ? settings.packageLabels.basic : 'Starter Package'}
                  </h3>
                  
                  <div className="text-5xl font-bold text-gray-800 dark:text-white mb-2">
                    {settings.packages.basic.price}
                    <span className="text-xl text-gray-600 dark:text-gray-400"> 
                      {language === 'ar' ? 'ج.م' : 'EGP'}
                    </span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-8">
                    {language === 'ar' ? 'شهر واحد' : 'Per Month'}
                  </p>
                  
                  <ul className="space-y-4 mb-8 text-right">
                    {(language === 'ar' ? settings.packages.basic.features : ['Personalized workout plan', 'Basic nutrition guidelines', 'Weekly progress check-ins', 'WhatsApp support', 'Exercise form videos']).map((feature, index) => <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-500 ml-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>)}
                  </ul>
                  
                  <Button className="w-full bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 transform transition-all duration-300 hover:scale-105 text-lg py-3">
                    {language === 'ar' ? settings.buttons.choosePackage : 'Choose Starter'}
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Professional Package */}
            <AnimatedSection animation="fade-up" delay={200}>
              <Card className="relative border-2 border-green-500 shadow-2xl scale-110 bg-white dark:bg-gray-900 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-bold animate-pulse shadow-xl">
                  <Star className="w-4 h-4 inline mr-2" />
                  {language === 'ar' ? settings.packageLabels.mostPopular : 'Most Popular'}
                </div>
                
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 text-green-600">
                    {language === 'ar' ? settings.packageLabels.professional : 'Professional Package'}
                  </h3>
                  
                  <div className="text-5xl font-bold text-gray-800 dark:text-white mb-2">
                    {settings.packages.professional.price}
                    <span className="text-xl text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'ج.م' : 'EGP'}
                    </span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-8">
                    {language === 'ar' ? 'شهرين' : '2 Months'}
                  </p>
                  
                  <ul className="space-y-4 mb-8 text-right">
                    {(language === 'ar' ? settings.packages.professional.features : ['Custom training & nutrition plan', 'Daily progress monitoring', 'Video call consultations', 'Supplement recommendations', 'Meal prep guidance', '24/7 WhatsApp support']).map((feature, index) => <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-500 ml-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>)}
                  </ul>
                  
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 dark:from-green-600 dark:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700 transform transition-all duration-300 hover:scale-105 shadow-xl text-lg py-3 font-bold">
                    {language === 'ar' ? settings.buttons.choosePackage : 'Choose Professional'}
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Premium Package */}
            <AnimatedSection animation="fade-up" delay={300}>
              <Card className="relative border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300 transform hover:scale-105 bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 to-indigo-500"></div>
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                    {language === 'ar' ? settings.packageLabels.premium : 'Elite Package'}
                  </h3>
                  
                  <div className="text-5xl font-bold text-gray-800 dark:text-white mb-2">
                    {settings.packages.premium.price}
                    <span className="text-xl text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'ج.م' : 'EGP'}
                    </span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-8">
                    {language === 'ar' ? 'ثلاثة شهور' : '3 Months'}
                  </p>
                  
                  <ul className="space-y-4 mb-8 text-right">
                    {(language === 'ar' ? settings.packages.premium.features : ['Complete transformation program', 'Weekly 1-on-1 video sessions', 'Custom meal plans & recipes', 'Premium supplement stack', 'Body composition tracking', 'Results guarantee', 'VIP 24/7 support']).map((feature, index) => <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-purple-500 ml-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>)}
                  </ul>
                  
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 dark:from-purple-600 dark:to-indigo-600 dark:hover:from-purple-700 dark:hover:to-indigo-700 transform transition-all duration-300 hover:scale-105 text-lg py-3 font-bold">
                    {language === 'ar' ? settings.buttons.choosePackage : 'Choose Elite'}
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
          
          {/* Guarantee Badge */}
          <AnimatedSection animation="fade-up" delay={400}>
            <div className="text-center mt-16">
              <div className="inline-flex items-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-6 py-3 rounded-full font-semibold text-lg shadow-lg">
                <CheckCircle className="w-6 h-6 mr-2" />
                {language === 'ar' ? 'ضمان استرداد المال خلال 30 يوم' : '30-Day Money-Back Guarantee'}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Interactive Testimonials */}
      <InteractiveTestimonials />

      {/* Enhanced Steps Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-all duration-500 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">
                {language === 'ar' ? settings.content.stepsTitle : 'Your Journey to Success'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {language === 'ar' ? 'رحلة بسيطة من أربع خطوات لتحقيق أهدافك' : 'A simple 4-step journey to achieve your fitness goals with personalized guidance'}
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {settings.steps.map((item, index) => <AnimatedSection key={index} animation="scale" delay={index * 150}>
                <div className="text-center group relative">
                  {/* Connection Line */}
                  {index < settings.steps.length - 1 && <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-green-300 to-green-500 transform translate-x-4 z-10"></div>}
                  
                  <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold transform transition-all duration-300 group-hover:scale-125 group-hover:shadow-2xl shadow-lg relative z-20">
                    {item.step}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                    {language === 'ar' ? item.title : index === 0 ? 'Initial Consultation' : index === 1 ? 'Assessment & Planning' : index === 2 ? 'Program Implementation' : 'Results & Optimization'}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {language === 'ar' ? item.description : index === 0 ? 'Free consultation to discuss your goals, assess your current fitness level, and understand your lifestyle.' : index === 1 ? 'Comprehensive health assessment and creation of your personalized training and nutrition plan.' : index === 2 ? 'Begin your transformation journey with daily support, progress tracking, and plan adjustments.' : 'Achieve your desired results with continuous optimization and long-term maintenance strategies.'}
                  </p>
                </div>
              </AnimatedSection>)}
          </div>
        </div>
      </section>

      {/* Countdown Timer for Special Offer */}
      <CountdownTimer />

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-500 dark:from-emerald-800 dark:via-emerald-700 dark:to-green-700 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-300/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedSection animation="fade-up">
            <h2 className="text-5xl font-bold mb-6">
              {language === 'ar' ? settings.content.contactTitle : 'Ready to Transform Your Life?'}
            </h2>
            <p className="text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
              {language === 'ar' ? settings.content.contactSubtitle : "Don't wait another day. Your transformation starts with a single message. Get your free consultation now!"}
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="scale" delay={200}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-green-50 hover:text-emerald-700 text-xl px-10 py-6 transform transition-all duration-300 hover:scale-105 shadow-2xl font-bold rounded-full flex-1" onClick={() => window.open(settings.socialLinks.whatsapp, '_blank')}>
                <MessageCircle className="w-6 h-6 mr-3" />
                {language === 'ar' ? settings.buttons.whatsapp : 'WhatsApp Now'}
              </Button>
              
              <Button size="lg" variant="outline" className="text-xl px-10 py-6 border-2 border-white text-white hover:bg-white hover:text-emerald-600 transform transition-all duration-300 hover:scale-105 shadow-2xl font-bold rounded-full flex-1" onClick={() => window.open(`tel:${settings.socialLinks.phone}`, '_blank')}>
                <Phone className="w-6 h-6 mr-3" />
                {language === 'ar' ? settings.buttons.callMe : 'Call Direct'}
              </Button>
            </div>
          </AnimatedSection>
          
          {/* Additional Contact Info */}
          <AnimatedSection animation="fade-up" delay={400}>
            <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {language === 'ar' ? 'رد فوري' : 'Instant Response'}
                </h3>
                <p className="opacity-90">
                  {language === 'ar' ? 'رد خلال 5 دقائق' : 'Reply within 5 minutes'}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {language === 'ar' ? 'استشارة مجانية' : 'Free Consultation'}
                </h3>
                <p className="opacity-90">
                  {language === 'ar' ? '30 دقيقة مجاناً' : '30 minutes absolutely free'}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Map className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {language === 'ar' ? 'مصر - القاهرة' : 'Cairo, Egypt'}
                </h3>
                <p className="opacity-90">
                  {language === 'ar' ? 'تدريب محلي وأونلاين' : 'Local & Online Training'}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-16 transition-all duration-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-12">
            <AnimatedSection animation="fade-up" delay={100}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <img src={settings.content.logo} alt="Omar Ashraf Logo" className="w-12 h-12" />
                  <h3 className="text-2xl font-bold">{language === 'ar' ? settings.content.aboutTitle : 'Omar Ashraf'}</h3>
                </div>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {language === 'ar' ? settings.content.footerDescription : 'Your certified personal trainer dedicated to helping you achieve your fitness goals through science-based training and personalized nutrition guidance.'}
                </p>
                
                {/* Social Links */}
                <div className="flex space-x-reverse space-x-4">
                  <a href={settings.socialLinks.instagram} className="bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-full hover:scale-110 transform transition-all duration-300 shadow-lg hover:shadow-xl" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href={settings.socialLinks.whatsapp} className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full hover:scale-110 transform transition-all duration-300 shadow-lg hover:shadow-xl" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={200}>
              <div>
                <h4 className="text-xl font-bold mb-6 text-green-400">
                  {language === 'ar' ? settings.sectionTitles.services : 'Services'}
                </h4>
                <ul className="space-y-3 text-gray-400">
                  {(language === 'ar' ? settings.services : ['Personal Training', 'Nutrition Coaching', 'Online Consultations', 'Fitness Assessments', 'Program Design', 'Progress Tracking']).map((service, index) => <li key={index} className="hover:text-green-400 transition-colors duration-300 cursor-pointer flex items-center">
                      <ChevronDown className="w-4 h-4 mr-2 rotate-270" />
                      {service}
                    </li>)}
                </ul>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={300}>
              <div>
                <h4 className="text-xl font-bold mb-6 text-green-400">
                  {language === 'ar' ? settings.sectionTitles.quickLinks : 'Quick Links'}
                </h4>
                <ul className="space-y-3 text-gray-400">
                  <li><a href="#home" className="hover:text-green-400 transition-colors duration-300 flex items-center">
                    <ChevronDown className="w-4 h-4 mr-2 rotate-270" />
                    {language === 'ar' ? settings.sectionTitles.home : 'Home'}
                  </a></li>
                  <li><a href="#about" className="hover:text-green-400 transition-colors duration-300 flex items-center">
                    <ChevronDown className="w-4 h-4 mr-2 rotate-270" />
                    {language === 'ar' ? settings.sectionTitles.about : 'About'}
                  </a></li>
                  <li><a href="#packages" className="hover:text-green-400 transition-colors duration-300 flex items-center">
                    <ChevronDown className="w-4 h-4 mr-2 rotate-270" />
                    {language === 'ar' ? settings.sectionTitles.packages : 'Packages'}
                  </a></li>
                  <li><a href="#contact" className="hover:text-green-400 transition-colors duration-300 flex items-center">
                    <ChevronDown className="w-4 h-4 mr-2 rotate-270" />
                    {language === 'ar' ? settings.sectionTitles.contact : 'Contact'}
                  </a></li>
                </ul>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={400}>
              <div>
                <h4 className="text-xl font-bold mb-6 text-green-400">
                  {language === 'ar' ? 'معلومات التواصل' : 'Contact Info'}
                </h4>
                <div className="space-y-4 text-gray-400">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-green-400" />
                    <span>{settings.socialLinks.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-5 h-5 mr-3 text-green-400" />
                    <span>{language === 'ar' ? 'واتساب متاح 24/7' : 'WhatsApp 24/7'}</span>
                  </div>
                  <div className="flex items-center">
                    <Map className="w-5 h-5 mr-3 text-green-400" />
                    <span>{language === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt'}</span>
                  </div>
                </div>
                
                {/* Newsletter */}
                <div className="mt-8">
                  <h5 className="font-bold mb-3 text-green-400">
                    {language === 'ar' ? 'النشرة الإخبارية' : 'Newsletter'}
                  </h5>
                  <div className="flex">
                    <input type="email" placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Your email'} className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-green-400" />
                    <Button className="bg-green-500 hover:bg-green-600 px-6 rounded-l-none">
                      {language === 'ar' ? 'اشترك' : 'Subscribe'}
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
          
          <AnimatedSection animation="fade-up" delay={500}>
            <div className="border-t border-gray-800 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-center md:text-left">
                  © 2024 {language === 'ar' ? settings.content.aboutTitle : 'Omar Ashraf'}. {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0 text-gray-400">
                  <a href="#" className="hover:text-green-400 transition-colors duration-300">
                    {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                  </a>
                  <a href="#" className="hover:text-green-400 transition-colors duration-300">
                    {language === 'ar' ? 'الشروط والأحكام' : 'Terms of Service'}
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </footer>

      {/* Video Modal */}
      <VideoModal />

      {/* Back to Top Button */}
      
    </div>
  );
};

export default Index;
