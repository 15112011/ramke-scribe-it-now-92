
import React from 'react';
import { Star, Users, Clock, TrendingUp, Phone, MessageCircle, Instagram, CheckCircle, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';

const Index = () => {
  const { language, t } = useLanguage();
  const { settings } = useAdmin();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-500" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section id="home" className="py-20 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 transition-all duration-500">
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
                <Button size="lg" className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-lg px-8 py-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg">
                  {t('startJourney')}
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-green-500 text-green-600 hover:bg-green-500 hover:text-white dark:border-green-400 dark:text-green-400 dark:hover:bg-green-600 dark:hover:border-green-600 transform transition-all duration-300 hover:scale-105 shadow-lg">
                  {t('viewResults')}
                </Button>
              </div>
            </AnimatedSection>
            <AnimatedSection className="lg:w-1/2" animation="fade-left" delay={200}>
              <div className="relative">
                <img 
                  src={settings.heroImage}
                  alt="Omar Ashraf - Personal Trainer"
                  className="rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-500 hover:scale-105 hover:shadow-3xl"
                />
                <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full animate-pulse shadow-lg">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-400 to-green-600 text-white p-3 rounded-full animate-bounce shadow-lg">
                  <Star className="w-6 h-6" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <AnimatedSection animation="fade-up">
        <section className="py-16 bg-white dark:bg-gray-900 transition-all duration-500">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">{t('trainingPhotos')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {settings.galleryImages.map((image, index) => (
                <AnimatedSection key={index} animation="scale" delay={index * 100}>
                  <div className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer transform transition-all duration-500 hover:scale-105">
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
        <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-all duration-500">
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
                    <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-green-200 dark:group-hover:bg-green-800/50 shadow-lg group-hover:shadow-xl">
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
      <section id="about" className="py-16 bg-white dark:bg-gray-900 transition-all duration-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection animation="fade-up">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">{t('aboutTitle')}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {settings.aboutText}
              </p>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <AnimatedSection animation="fade-right" delay={200}>
                <div className="text-center bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">شهادات واعتمادات</h3>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• مدرب شخصي معتمد</li>
                    <li>• أخصائي تغذية</li>
                    <li>• خبرة +5 سنوات</li>
                  </ul>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="fade-left" delay={300}>
                <div className="text-center bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">التخصصات</h3>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• بناء العضلات</li>
                    <li>• حرق الدهون</li>
                    <li>• اللياقة العامة</li>
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-16 bg-gray-50 dark:bg-gray-800 transition-all duration-500">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">اختر الباقة التي تناسبك</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Basic Package */}
            <AnimatedSection animation="fade-up" delay={100}>
              <Card className="relative border-2 border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 transition-all duration-300 transform hover:scale-105 bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">المبتدئ</h3>
                  <div className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
                    {settings.packages.basic.price}<span className="text-lg text-gray-600 dark:text-gray-400"> ج.م</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-right">
                    {settings.packages.basic.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 transform transition-all duration-300 hover:scale-105">
                    اختر هذه الباقة
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Professional Package */}
            <AnimatedSection animation="fade-up" delay={200}>
              <Card className="relative border-2 border-green-500 shadow-xl scale-105 bg-white dark:bg-gray-900">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                  الأكثر شعبية
                </div>
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4 text-green-600">المحترف</h3>
                  <div className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
                    {settings.packages.professional.price}<span className="text-lg text-gray-600 dark:text-gray-400"> ج.م</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-right">
                    {settings.packages.professional.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transform transition-all duration-300 hover:scale-105 shadow-lg">
                    اختر هذه الباقة
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Premium Package */}
            <AnimatedSection animation="fade-up" delay={300}>
              <Card className="relative border-2 border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 transition-all duration-300 transform hover:scale-105 bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">المتميز</h3>
                  <div className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
                    {settings.packages.premium.price}<span className="text-lg text-gray-600 dark:text-gray-400"> ج.م</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-right">
                    {settings.packages.premium.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 transform transition-all duration-300 hover:scale-105">
                    اختر هذه الباقة
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-all duration-500">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">آراء العملاء</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                <Card className="bg-white dark:bg-gray-800 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center ml-4">
                        <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 dark:text-white">عميل {i}</div>
                        <div className="flex text-yellow-400">
                          {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      تجربة رائعة مع المدرب عمر، حقق لي نتائج مذهلة في وقت قصير. أنصح بشدة بالتعامل معه.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-all duration-500">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
              أربع خطوات لتحقيق الهدف معاً
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "التواصل", desc: "تواصل معي عبر الواتساب" },
              { step: "2", title: "التقييم", desc: "تقييم حالتك الصحية" },
              { step: "3", title: "البرنامج", desc: "وضع برنامج مخصص لك" },
              { step: "4", title: "النتائج", desc: "تحقيق أهدافك المرجوة" }
            ].map((item, index) => (
              <AnimatedSection key={index} animation="scale" delay={index * 150}>
                <div className="text-center group">
                  <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white dark:bg-gray-900 transition-all duration-500">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">تواصل معي الآن</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              ابدأ رحلتك نحو الجسم المثالي اليوم
            </p>
          </AnimatedSection>
          <AnimatedSection animation="scale" delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-lg px-8 py-4 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={() => window.open(settings.socialLinks.whatsapp, '_blank')}
              >
                <MessageCircle className="w-5 h-5 ml-2" />
                واتساب
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4 border-green-500 text-green-600 hover:bg-green-500 hover:text-white dark:border-green-400 dark:text-green-400 dark:hover:bg-green-600 transform transition-all duration-300 hover:scale-105 shadow-lg"
                onClick={() => window.open(`tel:${settings.socialLinks.phone}`, '_blank')}
              >
                <Phone className="w-5 h-5 ml-2" />
                اتصل بي
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-white py-12 transition-all duration-500">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <AnimatedSection animation="fade-up" delay={100}>
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
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={200}>
              <div>
                <h4 className="text-lg font-semibold mb-4">{t('services')}</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">تدريب شخصي</li>
                  <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">برامج غذائية</li>
                  <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">استشارات اللياقة</li>
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={300}>
              <div>
                <h4 className="text-lg font-semibold mb-4">{t('quickLinks')}</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#home" className="hover:text-green-400 transition-colors duration-300">{t('home')}</a></li>
                  <li><a href="#about" className="hover:text-green-400 transition-colors duration-300">{t('about')}</a></li>
                  <li><a href="#packages" className="hover:text-green-400 transition-colors duration-300">{t('packages')}</a></li>
                  <li><a href="#contact" className="hover:text-green-400 transition-colors duration-300">{t('contact')}</a></li>
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={400}>
              <div>
                <h4 className="text-lg font-semibold mb-4">{t('followMe')}</h4>
                <div className="flex space-x-reverse space-x-4">
                  <a 
                    href={settings.socialLinks.instagram} 
                    className="bg-green-500 p-2 rounded-full hover:bg-green-600 transform transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href={settings.socialLinks.whatsapp} 
                    className="bg-green-500 p-2 rounded-full hover:bg-green-600 transform transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
          <AnimatedSection animation="fade-up" delay={500}>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>© 2024 {t('aboutTitle')}. {t('rightsReserved')}</p>
            </div>
          </AnimatedSection>
        </div>
      </footer>
    </div>
  );
};

export default Index;
