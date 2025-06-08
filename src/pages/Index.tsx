import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/hero-section";
import Features from "@/components/home/features";
import Faq from "@/components/home/faq";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-green-50">
      <Navbar />
      <HeroSection />
      <Features />
      <Faq />
      <Footer />
    </div>
  );
};

export default Index;
