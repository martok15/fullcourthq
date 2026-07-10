import { CTASection } from "@/components/marketing/cta-section";
import { Footer } from "@/components/marketing/footer";
import { Header } from "@/components/marketing/header";
import { Hero } from "@/components/marketing/hero";
import {
  ConnectedWorkflowSection,
  FAQSection,
  PricingSection,
  SolutionsSection,
  TrustSection,
} from "@/components/marketing/platform-sections";
import { ProductTour } from "@/components/marketing/product-tour";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fullcourthq.com";

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
        "A connected operating platform for sports facilities and clubs, including scheduling, programs, teams, billing, communications, and family portals.",
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
        <ProductTour />
        <ConnectedWorkflowSection />
        <SolutionsSection />
        <PricingSection />
        <TrustSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
