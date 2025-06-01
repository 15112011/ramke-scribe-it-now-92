
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { Stats } from "@/components/Stats";
import { About } from "@/components/About";
import { VideoPreview } from "@/components/VideoPreview";
import { BeforeAfterResults } from "@/components/BeforeAfterResults";
import { Packages } from "@/components/Packages";
import { Steps } from "@/components/Steps";
import { InteractiveTestimonials } from "@/components/InteractiveTestimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ParticleBackground";
import { FloatingActionButton } from "@/components/FloatingActionButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <Header />
      
      <main>
        <Hero />
        <Gallery />
        <Stats />
        <About />
        <VideoPreview />
        <BeforeAfterResults />
        <Packages />
        <Steps />
        <InteractiveTestimonials />
        <Contact />
      </main>
      
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Index;
