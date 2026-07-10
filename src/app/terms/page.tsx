import type { Metadata } from "next";

import { InfoPage, type InfoPageSection } from "@/components/marketing/info-page";

const title = "Website Terms";
const socialTitle = "Website Terms | FullCourtHQ";
const description =
  "Terms for use of the public FullCourtHQ marketing website and its informational content.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms" },
  openGraph: {
    title: socialTitle,
    description,
    url: "/terms",
    type: "website",
  },
};

const sections: readonly InfoPageSection[] = [
  {
    title: "Scope of these terms",
    paragraphs: [
      "These terms apply to the public FullCourtHQ marketing website. They do not replace a subscription agreement, order form, data-processing addendum, payment-provider agreement, or other contract that may govern use of the FullCourtHQ product.",
      "If a signed customer agreement conflicts with these website terms on a matter covered by that agreement, the signed agreement controls for that customer relationship.",
    ],
  },
  {
    title: "Acceptable use",
    paragraphs: [
      "You may use the website to learn about FullCourtHQ, evaluate whether the service may fit your organization, and contact the team. You may not use the site unlawfully or in a way that interferes with its operation or another person's use.",
    ],
    bullets: [
      "Do not attempt to bypass security controls, probe non-public systems without authorization, or introduce malicious code.",
      "Do not misrepresent your identity or submit information you are not authorized to provide.",
      "Do not copy, scrape, or reuse site content in a way that violates applicable law or FullCourtHQ's rights.",
    ],
  },
  {
    title: "Product information is not a service commitment",
    paragraphs: [
      "Website copy, screenshots, demonstrations, plans, and roadmap discussions are provided for general evaluation. Features, integrations, interfaces, and availability can change and may vary by configuration or customer agreement.",
      "A statement on this site is not a guarantee of uptime, a promise to deliver a future feature, or a warranty that the service is suitable for a particular legal, regulatory, accounting, or operational requirement. Commercial commitments must be stated in the applicable signed agreement.",
    ],
  },
  {
    title: "Intellectual property",
    paragraphs: [
      "The website, brand, product imagery, written content, and other materials are owned by FullCourtHQ or used with permission and are protected by applicable intellectual-property laws. These terms do not transfer ownership or grant a license beyond the limited right to use the public site for its intended purpose.",
      "Names and marks belonging to customers, providers, or other third parties remain the property of their respective owners. Their appearance does not necessarily imply endorsement.",
    ],
  },
  {
    title: "Third-party services and links",
    paragraphs: [
      "The website or product description may refer or link to services operated by others. FullCourtHQ does not control those services, and their own terms, privacy practices, availability, and security controls apply.",
    ],
  },
  {
    title: "Website availability and disclaimers",
    paragraphs: [
      "We work to keep website information useful and current, but it may contain errors, omissions, or content that is no longer current. The public site is provided on an as-available basis for general information, to the extent permitted by applicable law.",
      "FullCourtHQ does not make warranties through this page that are not expressly included in a signed agreement. Nothing here excludes a right or responsibility that cannot lawfully be excluded.",
    ],
  },
  {
    title: "Responsibility for website use",
    paragraphs: [
      "To the extent permitted by applicable law, FullCourtHQ is not responsible for indirect or consequential loss arising solely from reliance on public marketing-site content. Any liability connected to a paid service is governed by the agreement that applies to that service.",
    ],
  },
  {
    title: "Changes and questions",
    paragraphs: [
      "We may revise these terms as the site or business changes. The date above identifies the current version. Continued use of the site after an update is subject to the revised terms to the extent permitted by law.",
      "Email info@fullcourthq.com with a question about these website terms. The team can explain what document applies to a product evaluation or customer relationship, but cannot provide legal advice.",
    ],
  },
];

export default function TermsPage() {
  return (
    <InfoPage
      currentPath="/terms"
      eyebrow="Website terms"
      title="Terms for this website"
      introduction="The ground rules for using FullCourtHQ's public marketing site and evaluating the information presented here."
      updatedDate="2026-07-09"
      updatedLabel="July 9, 2026"
      sections={sections}
      closingNote="These are website terms, not a substitute for a signed customer agreement or advice from your legal counsel."
    />
  );
}
