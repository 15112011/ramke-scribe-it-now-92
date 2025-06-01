import React, { useEffect } from 'react';
import { Star, Users, Clock, Phone, MessageCircle, Instagram, CheckCircle, Dumbbell, Award, Target, Zap, Heart, Calendar, Map, ChevronDown, PlayCircle, Trophy, Activity } from 'lucide-react';
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
import { VideoPreview } from '@/components/VideoPreview';
import { CountdownTimer } from '@/components/CountdownTimer';
import { ParticleBackground } from '@/components/ParticleBackground';
import { BeforeAfterResults } from '@/components/BeforeAfterResults';

const Index = () => {
  const { language } = useLanguage();
  const { settings } = useAdmin();

  // Initialize AOS animation library
  useEffect(() => {
    const initAOS = () => {
      const elements = document.querySelectorAll('[data-aos]');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('aos-animate');
        }, index * 100);
      });
    };
    initAOS();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-500 relative overflow-x-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Enhanced Navigation */}
      <EnhancedNavigation />
      
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Hero Section - Mobile First */}
      <section id="home" className="relative pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 dark:from-emerald-800 dark:via-emerald-700 dark:to-green-700 min-h-screen flex items-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-48 sm:w-96 h-48 sm:h-96 bg-green-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
            <AnimatedSection className="lg:w-1/2 text-center lg:text-left order-2 lg:order-1" animation="fade-right">
              <div className="mb-4 sm:mb-6">
                <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-white/20 rounded-full text-white text-xs sm:text-sm font-semibold mb-3 sm:mb-4 animate-bounce">
                  🏆 {language === 'ar' ? 'مدرب العام 2024' : '2024 Trainer of the Year'}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight">
                {language === 'ar' ? settings.content.heroTitle : 'Transform Your Body, Transform Your Life'}
                <span className="block text-green-200 typewriter mt-2">
                  {language === 'ar' ? 'مع عمر أشرف' : 'with Omar Ashraf'}
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-green-50 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {language === 'ar' ? settings.content.heroSubtitle : 'Certified personal trainer with 5+ years of experience helping clients achieve their dream physique through science-based training and nutrition.'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start mb-8 sm:mb-12">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-green-50 hover:text-emerald-700 text-lg sm:text-xl px-6 sm:px-10 py-3 sm:py-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl font-bold rounded-full w-full sm:w-auto">
                  <PlayCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                  {language === 'ar' ? settings.buttons.startJourney : 'Start Your Transformation'}
                </Button>
                
                <Button size="lg" variant="outline" className="text-lg sm:text-xl px-6 sm:px-10 py-3 sm:py-6 border-2 border-white text-white hover:bg-white hover:text-emerald-600 transform transition-all duration-300 hover:scale-105 shadow-xl font-bold rounded-full w-full sm:w-auto">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                  {language === 'ar' ? settings.buttons.viewResults : 'View Success Stories'}
                </Button>
              </div>
              
              {/* Trust Indicators - Mobile Optimized */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 text-white/90 max-w-md mx-auto lg:max-w-none lg:flex lg:justify-start">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold">500+</div>
                  <div className="text-xs sm:text-sm">{language === 'ar' ? 'عميل سعيد' : 'Happy Clients'}</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold">98%</div>
                  <div className="text-xs sm:text-sm">{language === 'ar' ? 'نسبة النجاح' : 'Success Rate'}</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold">5+</div>
                  <div className="text-xs sm:text-sm">{language === 'ar' ? 'سنوات خبرة' : 'Years Experience'}</div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection className="lg:w-1/2 order-1 lg:order-2" animation="fade-left" delay={200}>
              <div className="relative max-w-sm sm:max-w-md mx-auto">
                <div className="relative z-10">
                  <img src={settings.heroImage} alt="Omar Ashraf - Elite Personal Trainer" className="rounded-2xl sm:rounded-3xl shadow-2xl w-full transform transition-all duration-500 hover:scale-105 hover:shadow-3xl" />
                  
                  {/* Floating Elements - Mobile Optimized */}
                  <div className="absolute -top-3 sm:-top-6 -right-3 sm:-right-6 bg-white/90 backdrop-blur-sm text-emerald-600 p-2 sm:p-4 rounded-xl sm:rounded-2xl animate-bounce shadow-xl">
                    <Dumbbell className="w-5 h-5 sm:w-8 sm:h-8" />
                  </div>
                  
                  <div className="absolute -bottom-3 sm:-bottom-6 -left-3 sm:-left-6 bg-emerald-500 text-white p-2 sm:p-4 rounded-xl sm:rounded-2xl animate-pulse shadow-xl">
                    <Star className="w-5 h-5 sm:w-8 sm:h-8" />
                  </div>
                  
                  <div className="absolute top-1/2 -left-4 sm:-left-8 bg-white/90 backdrop-blur-sm text-emerald-600 p-2 sm:p-3 rounded-lg sm:rounded-xl animate-bounce delay-500 shadow-lg">
                    <Heart className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                </div>
                
                {/* Glowing Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl sm:rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
              </div>
            </AnimatedSection>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-white/70" />
        </div>
      </section>

      {/* Progress Tracker */}
      <ProgressTracker />

      {/* Video Preview Section */}
      <VideoPreview />

      {/* Before/After Results Section */}
      <BeforeAfterResults />

      {/* Enhanced Stats Section - Mobile First */}
      <AnimatedSection animation="fade-up">
        <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 transition-all duration-500 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
                {language === 'ar' ? 'أرقام تتحدث عن نفسها' : 'Results That Speak Volumes'}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {language === 'ar' ? 'إحصائيات حقيقية من عملائنا المتميزين' : 'Real statistics from our exceptional clients who transformed their lives'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[
                { icon: Users, value: "500+", label: language === 'ar' ? 'عميل متحول' : 'Transformed Clients', color: 'text-emerald-500' },
                { icon: Trophy, value: "98%", label: language === 'ar' ? 'نسبة النجاح' : 'Success Rate', color: 'text-emerald-500' },
                { icon: Award, value: "50+", label: language === 'ar' ? 'جائزة وشهادة' : 'Awards & Certifications', color: 'text-emerald-500' },
                { icon: Clock, value: "24/7", label: language === 'ar' ? 'دعم مستمر' : 'Continuous Support', color: 'text-emerald-500' }
              ].map((stat, index) => (
                <AnimatedSection key={index} animation="scale" delay={index * 150}>
                  <div className="text-center group hover:scale-110 transition-transform duration-300">
                    <div className={`bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-800/20 dark:to-green-800/20 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6 transform transition-all duration-300 group-hover:shadow-2xl shadow-lg ${stat.color}`}>
                      <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                    </div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-1 sm:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300 font-medium px-2">{stat.label}</div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Interactive Testimonials */}
      <InteractiveTestimonials />

      {/* Countdown Timer for Special Offer */}
      <CountdownTimer />

      {/* Enhanced Contact Section - Mobile First */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-500 dark:from-emerald-800 dark:via-emerald-700 dark:to-green-700 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              {language === 'ar' ? settings.content.contactTitle : 'Ready to Transform Your Life?'}
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-12 opacity-90 max-w-3xl mx-auto">
              {language === 'ar' ? settings.content.contactSubtitle : "Don't wait another day. Your transformation starts with a single message. Get your free consultation now!"}
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="scale" delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center max-w-lg mx-auto">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-green-50 hover:text-emerald-700 text-lg sm:text-xl px-6 sm:px-10 py-3 sm:py-6 transform transition-all duration-300 hover:scale-105 shadow-2xl font-bold rounded-full flex-1" onClick={() => window.open(settings.socialLinks.whatsapp, '_blank')}>
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                {language === 'ar' ? settings.buttons.whatsapp : 'WhatsApp Now'}
              </Button>
              
              <Button size="lg" variant="outline" className="text-lg sm:text-xl px-6 sm:px-10 py-3 sm:py-6 border-2 border-white text-white hover:bg-white hover:text-emerald-600 transform transition-all duration-300 hover:scale-105 shadow-2xl font-bold rounded-full flex-1" onClick={() => window.open(`tel:${settings.socialLinks.phone}`, '_blank')}>
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                {language === 'ar' ? settings.buttons.callMe : 'Call Direct'}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Enhanced Footer - Mobile First */}
      <footer className="bg-gray-900 dark:bg-black text-white py-8 sm:py-12 lg:py-16 transition-all duration-500 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-3 justify-center sm:justify-start mb-4 sm:mb-6">
                  <img src={settings.content.logo} alt="Omar Ashraf Logo" className="w-10 h-10 sm:w-12 sm:h-12" />
                  <h3 className="text-xl sm:text-2xl font-bold">{language === 'ar' ? settings.content.aboutTitle : 'Omar Ashraf'}</h3>
                </div>
                <p className="text-gray-400 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  {language === 'ar' ? settings.content.footerDescription : 'Your certified personal trainer dedicated to helping you achieve your fitness goals through science-based training and personalized nutrition guidance.'}
                </p>
                
                {/* Social Links */}
                <div className="flex space-x-reverse space-x-4 justify-center sm:justify-start">
                  <a href={settings.socialLinks.instagram} className="bg-gradient-to-r from-pink-500 to-purple-500 p-2 sm:p-3 rounded-full hover:scale-110 transform transition-all duration-300 shadow-lg hover:shadow-xl" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a href={settings.socialLinks.whatsapp} className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 sm:p-3 rounded-full hover:scale-110 transform transition-all duration-300 shadow-lg hover:shadow-xl" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
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
                  {(language === 'ar' ? settings.services : ['Personal Training', 'Nutrition Coaching', 'Online Consultations', 'Fitness Assessments', 'Program Design', 'Progress Tracking']).map((service, index) => (
                    <li key={index} className="hover:text-green-400 transition-colors duration-300 cursor-pointer flex items-center">
                      <ChevronDown className="w-4 h-4 mr-2 rotate-270" />
                      {service}
                    </li>
                  ))}
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
            <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
                <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-0">
                  © 2024 {language === 'ar' ? settings.content.aboutTitle : 'Omar Ashraf'}. {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}
                </p>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-gray-400 text-sm">
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
    </div>
  );
};

export default Index;
