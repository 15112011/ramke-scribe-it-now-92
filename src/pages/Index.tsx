import React from 'react';
import { Star, Users, Clock, TrendingUp, Phone, MessageCircle, Instagram, CheckCircle, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { AdminPanel } from '@/components/AdminPanel';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';

const Index = () => {
  const { language, t } = useLanguage();
  const { settings } = useAdmin();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <Header />
      
      {/* Admin Panel */}
      <AdminPanel />

      {/* Hero Section */}
      <section id="home" className="py-20 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <AnimatedSection className="lg:w-1/2 text-center lg:text-right" animation="fade-right">
              <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
                {t('heroTitle')}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t('heroSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-lg px-8 py-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  {t('startJourney')}
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-green-500 text-green-600 hover:bg-green-500 hover:text-white dark:border-green-400 dark:text-green-400 transform transition-all duration-300 hover:scale-105">
                  {t('viewResults')}
                </Button>
              </div>
            </AnimatedSection>
            <AnimatedSection className="lg:w-1/2" animation="fade-left" delay={200}>
              <div className="relative">
                <img 
                  src={settings.heroImage}
                  alt="Omar Ashraf - Personal Trainer"
                  className="rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-500 hover:scale-105"
                />
                <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full animate-pulse">
                  <Dumbbell className="w-6 h-6" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <AnimatedSection animation="fade-up">
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">{t('trainingPhotos')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {settings.galleryImages.map((image, index) => (
                <AnimatedSection key={index} animation="scale" delay={index * 100}>
                  <div className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer">
                    <img 
                      src={image}
                      alt={`Training ${index + 1}`}
                      className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
                      <p className="text-white font-semibold mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {t('fitness')}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection animation="fade-up">
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Clock, value: "24/7", label: t('available247') },
                { icon: Users, value: settings.stats.clients, label: t('satisfiedClients') },
                { icon: TrendingUp, value: settings.stats.successRate, label: t('successRate') },
                { icon: Star, value: settings.stats.experience, label: t('yearsExperience') }
              ].map((stat, index) => (
                <AnimatedSection key={index} animation="scale" delay={index * 150}>
                  <div className="text-center group">
                    <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-green-200 dark:group-hover:bg-green-800/50">
                      <stat.icon className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-3xl font-bold text-gray-800 dark:text-white">{stat.value}</div>
                    <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">{t('aboutTitle')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t('aboutDescription')}
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4">شهادات واعتمادات</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• مدرب شخصي معتمد</li>
                  <li>• أخصائي تغذية</li>
                  <li>• خبرة +5 سنوات</li>
                </ul>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4">التخصصات</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• بناء العضلات</li>
                  <li>• حرق الدهون</li>
                  <li>• اللياقة العامة</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">اختر الباقة التي تناسبك</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Basic Package */}
            <Card className="relative border-2 border-gray-200 hover:border-green-300 transition-all">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">المبتدئ</h3>
                <div className="text-4xl font-bold text-gray-800 mb-6">
                  1200<span className="text-lg text-gray-600"> ج.م</span>
                </div>
                <ul className="space-y-3 mb-8 text-right">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                    برنامج تدريبي لمدة شهر
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                    نظام غذائي بسيط
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                    متابعة أسبوعية
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                    دعم عبر الواتساب
                  </li>
                </ul>
                <Button className="w-full bg-gray-500 hover:bg-gray-600">
                  اختر هذه الباقة
                </Button>
              </CardContent>
            </Card>

            {/* Professional Package */}
            <Card className="relative border-2 border-green-500 shadow-lg scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                الأكثر شعبية
              </div>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4 text-green-600">المحترف</h3>
                <div className="text-4xl font-bold text-gray-800 mb-6">
                  2000<span className="text-lg text-gray-600"> ج.م</span>
                </div>
                <ul className="space-y-3 mb-8 text-right">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                    برنامج تدريبي لمدة شهرين
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                    نظام غذائي مفصل
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                    متابعة يومية
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                    مكالمات أسبوعية
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                    برنامج مكملات
                  </li>
                </ul>
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  اختر هذه الباقة
                </Button>
              </CardContent>
            </Card>

            {/* Premium Package */}
            <Card className="relative border-2 border-gray-200 hover:border-green-300 transition-all">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">المتميز</h3>
                <div className="text-4xl font-bold text-gray-800 mb-6">
                  3200<span className="text-lg text-gray-600"> ج.م</span>
                </div>
                <ul className="space-y-3 mb-8 text-right">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                    برنامج تدريبي لمدة 3 شهور
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                    نظام غذائي شامل
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                    متابعة على مدار الساعة
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                    جلسات تدريب أونلاين
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                    برنامج مكملات VIP
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                    ضمان النتائج
                  </li>
                </ul>
                <Button className="w-full bg-gray-500 hover:bg-gray-600">
                  اختر هذه الباقة
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">آراء العملاء</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center ml-4">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold">عميل {i}</div>
                      <div className="flex text-yellow-400">
                        {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    تجربة رائعة مع المدرب عمر، حقق لي نتائج مذهلة في وقت قصير. أنصح بشدة بالتعامل معه.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
            أربع خطوات لتحقيق الهدف معاً
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "التواصل", desc: "تواصل معي عبر الواتساب" },
              { step: "2", title: "التقييم", desc: "تقييم حالتك الصحية" },
              { step: "3", title: "البرنامج", desc: "وضع برنامج مخصص لك" },
              { step: "4", title: "النتائج", desc: "تحقيق أهدافك المرجوة" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">تواصل معي الآن</h2>
          <p className="text-xl text-gray-600 mb-8">
            ابدأ رحلتك نحو الجسم المثالي اليوم
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-lg px-8 py-4">
              <MessageCircle className="w-5 h-5 ml-2" />
              واتساب
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              <Phone className="w-5 h-5 ml-2" />
              اتصل بي
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/lovable-uploads/8d1f7dd8-67c5-4ab2-8ea3-d655ef1cb613.png" 
                  alt="Omar Ashraf Logo"
                  className="w-8 h-8"
                />
                <h3 className="text-xl font-bold">{t('aboutTitle')}</h3>
              </div>
              <p className="text-gray-400">
                {t('footerDescription')}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('services')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>تدريب شخصي</li>
                <li>برامج غذائية</li>
                <li>استشارات اللياقة</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('quickLinks')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-green-400 transition-colors">{t('home')}</a></li>
                <li><a href="#about" className="hover:text-green-400 transition-colors">{t('about')}</a></li>
                <li><a href="#packages" className="hover:text-green-400 transition-colors">{t('packages')}</a></li>
                <li><a href="#contact" className="hover:text-green-400 transition-colors">{t('contact')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('followMe')}</h4>
              <div className="flex space-x-reverse space-x-4">
                <a href={settings.socialLinks.instagram} className="bg-green-500 p-2 rounded-full hover:bg-green-600 transform transition-all duration-300 hover:scale-110">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href={settings.socialLinks.whatsapp} className="bg-green-500 p-2 rounded-full hover:bg-green-600 transform transition-all duration-300 hover:scale-110">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 {t('aboutTitle')}. {t('rightsReserved')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
