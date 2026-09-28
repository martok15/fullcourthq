import { CapabilityMarquee } from "@/components/marketing/capability-marquee";
import { CTASection } from "@/components/marketing/cta-section";
import { FamiliesSection } from "@/components/marketing/families-section";
import { Footer } from "@/components/marketing/footer";
import { Header } from "@/components/marketing/header";
import { Hero } from "@/components/marketing/hero";
import { CourtsSection, PaymentsSection } from "@/components/marketing/outcome-sections";
import { ProductTour } from "@/components/marketing/product-tour";
import { RevealObserver } from "@/components/marketing/reveal-observer";
import { FAQSection, TrustSection } from "@/components/marketing/trust-faq-sections";
import { siteUrl } from "@/lib/site";
import "./home.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "FullCourtHQ",
      url: siteUrl,
      logo: `${siteUrl}/brand/fullcourthq-og-logo.png`,
      email: "info@fullcourthq.com",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "FullCourtHQ",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: siteUrl,
      description:
        "Court booking, programs, teams, recurring billing, and an ad-free family app for sports facilities and clubs.",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Hero />
        <CapabilityMarquee />
        <PaymentsSection />
        <CourtsSection />
        <FamiliesSection />
        <ProductTour />
        <TrustSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
