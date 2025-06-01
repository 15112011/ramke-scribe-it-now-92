
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ParticleBackground";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { DynamicSection } from "@/components/DynamicSection";
import { useSections } from "@/contexts/SectionsContext";

const Index = () => {
  const { getEnabledSections } = useSections();
  const enabledSections = getEnabledSections();

  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <Header />
      
      <main>
        {enabledSections.map((section) => (
          <DynamicSection key={section.id} section={section} />
        ))}
      </main>
      
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Index;
