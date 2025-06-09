import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/modules/home/components/hero-section";
import Features from "@/modules/home/components/features";
import Faq from "@/modules/home/components/faq";
import { useLatestUsers } from "./hooks/use-latest-users";
import { CTA } from "./components/cta";

export function Home() {
  const { latestUsers } = useLatestUsers();
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-green-50">
      <Navbar />
      <HeroSection latestUsers={latestUsers} />
      <Features />
      <Faq />
      <CTA latestUsers={latestUsers} />
      <Footer />
    </div>
  );
}
