import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/hero-section";
import Features from "@/components/features";
import FaqAndCTA from "@/components/FaqAndCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-green-50">
      <Navbar />
      <HeroSection />
      <Features />
      <FaqAndCTA />
      <Footer />
    </div>
  );
};

export default Index;
