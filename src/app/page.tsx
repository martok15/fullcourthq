import { CTASection } from "@/components/marketing/cta-section";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { Footer } from "@/components/marketing/footer";
import { Header } from "@/components/marketing/header";
import { Hero } from "@/components/marketing/hero";
import { ImpactSection } from "@/components/marketing/impact-section";
import { TrustBar } from "@/components/marketing/trust-bar";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-[var(--black)]">
      <Header />
      <Hero />
      <TrustBar />
      <FeatureGrid />
      <ImpactSection />
      <CTASection />
      <Footer />
    </main>
  );
}
