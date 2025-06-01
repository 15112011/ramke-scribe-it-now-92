
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { AnimatedSection } from '@/components/AnimatedSection';
import Typed from 'typed.js';
import { CountUp } from 'countup.js';
import VanillaTilt from 'vanilla-tilt';

declare global {
  interface Window {
    particlesJS: any;
  }
}

export const Hero: React.FC = () => {
  const { language } = useLanguage();
  const { settings } = useAdmin();
  const typedRef = useRef<HTMLSpanElement>(null);
  const countRef1 = useRef<HTMLSpanElement>(null);
  const countRef2 = useRef<HTMLSpanElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize AOS (Animate On Scroll) dynamically
    const initAOS = async () => {
      try {
        const AOS = await import('aos');
        await import('aos/dist/aos.css');
        
        AOS.default.init({
          duration: 1000,
          once: true,
          offset: 100,
        });
      } catch (error) {
        console.log('AOS not available, skipping animation');
      }
    };

    initAOS();

    // Initialize Typed.js for animated text
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: [
          language === 'ar' ? 'حقق حلمك بالجسم المثالي' : 'Achieve Your Dream Body',
          language === 'ar' ? 'مع عمر أشرف' : 'With Omar Ashraf',
          language === 'ar' ? 'مدرب شخصي معتمد' : 'Certified Personal Trainer'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        backDelay: 2000,
      });

      return () => typed.destroy();
    }
  }, [language]);

  useEffect(() => {
    // Initialize CountUp.js for statistics
    if (countRef1.current) {
      const countUp1 = new CountUp(countRef1.current, 5, {
        duration: 2,
        suffix: '+',
      });
      if (!countUp1.error) {
        countUp1.start();
      }
    }

    if (countRef2.current) {
      const countUp2 = new CountUp(countRef2.current, 95, {
        duration: 2,
        suffix: '%',
      });
      if (!countUp2.error) {
        countUp2.start();
      }
    }
  }, []);

  useEffect(() => {
    // Initialize Vanilla Tilt for 3D effect on image container
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
      });
    }

    return () => {
      if (tiltRef.current && (tiltRef.current as any).vanillaTilt) {
        (tiltRef.current as any).vanillaTilt.destroy();
      }
    };
  }, []);

  useEffect(() => {
    // Initialize Particles.js for background effect
    if (particlesRef.current && window.particlesJS) {
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: '#10b981' },
          shape: { type: 'circle' },
          opacity: { value: 0.5, random: false },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#10b981',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
            resize: true
          },
        },
        retina_detect: true
      });
    }
  }, []);

  const handleStartJourney = () => {
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewResults = () => {
    console.log('Navigate to results');
  };

  const getLocalizedText = (text: string | { ar: string; en: string }): string => {
    if (typeof text === 'string') return text;
    return language === 'ar' ? text.ar : text.en;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Particles Background */}
      <div 
        id="particles-js" 
        ref={particlesRef}
        className="absolute inset-0 z-0"
      ></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-transparent z-10"></div>

      <div className="relative z-20 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white" data-aos="fade-right">
            <div className="mb-6">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
                {language === 'ar' ? (
                  <>
                    حقق حلمك بالجسم<br />
                    <span className="text-emerald-400">المثالي</span> مع عمر أشرف
                  </>
                ) : (
                  <>
                    Transform Your Body,<br />
                    Transform Your <span className="text-emerald-400">Life!</span>
                  </>
                )}
              </h1>
              
              {/* Typed.js animated subtitle */}
              <div className="text-xl md:text-2xl text-gray-300 mb-6 h-16">
                <span ref={typedRef}></span>
              </div>
            </div>

            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
              {language === 'ar' 
                ? 'مدرب شخصي معتمد يساعدك في الوصول لأهدافك بأسرع وقت وأفضل النتائج'
                : 'Certified personal trainer helping you reach your goals in the fastest time with the best results'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                onClick={handleStartJourney}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-emerald-500/25"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                {language === 'ar' ? 'ابدأ رحلتك' : 'Start Your Journey'}
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleViewResults}
                className="border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-slate-900 px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                <Play className="mr-2 w-5 h-5" />
                {language === 'ar' ? 'شاهد النتائج' : 'View Results'}
              </Button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div 
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  <span ref={countRef1}>5</span>
                </div>
                <div className="text-sm text-gray-300">
                  {language === 'ar' ? 'سنوات خبرة' : 'Years Experience'}
                </div>
              </div>
              
              <div 
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  <span ref={countRef2}>95</span>
                </div>
                <div className="text-sm text-gray-300">
                  {language === 'ar' ? 'نسبة النجاح' : 'Success Rate'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image with Tilt Effect */}
          <div className="relative" data-aos="fade-left">
            <div 
              ref={tiltRef}
              className="relative rounded-3xl overflow-hidden shadow-2xl transform-gpu"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img 
                src="/lovable-uploads/7e94fd25-056b-4bd5-89d7-88024abc66d5.png"
                alt="Fitness Transformation"
                className="w-full h-[600px] object-cover rounded-3xl"
              />
              
              {/* Floating badges */}
              <div className="absolute top-6 right-6 bg-emerald-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg animate-pulse">
                {language === 'ar' ? '5+ سنوات خبرة' : '5+ Years Experience'}
              </div>
              
              <div className="absolute bottom-6 right-6 bg-slate-900/80 backdrop-blur-sm text-emerald-400 px-4 py-2 rounded-full font-semibold border border-emerald-500/30">
                {language === 'ar' ? '95% نسبة النجاح' : '95% Success Rate'}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20" data-aos="fade-up" data-aos-delay="1000">
        <div className="w-6 h-10 border-2 border-emerald-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-emerald-400 rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </section>
  );
};
