import type { Metadata } from "next";

import { InfoPage, type InfoPageSection } from "@/components/marketing/info-page";

const title = "Privacy";
const socialTitle = "Privacy | FullCourtHQ";
const description =
  "A plain-language overview of how FullCourtHQ handles marketing-site inquiries and data used in the product.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: socialTitle,
    description,
    url: "/privacy",
    type: "website",
  },
};

const sections: readonly InfoPageSection[] = [
  {
    title: "What this page covers",
    paragraphs: [
      "This page provides a plain-language overview of personal information associated with the FullCourtHQ marketing site and product. A customer agreement, data-processing addendum, or provider-specific notice may supply additional terms for a particular organization.",
      "FullCourtHQ customers generally decide why and how information is entered into their organization workspace. If your question concerns records maintained by a facility or club, contacting that organization is usually the best first step.",
    ],
  },
  {
    title: "Information you provide",
    paragraphs: [
      "When you request a demo, email the team, or otherwise contact FullCourtHQ, you may provide your name, email address, organization, location, operational needs, and the content of your message.",
      "Organizations and their authorized users may also provide information needed to use enabled product features, such as account details, participant and guardian information, schedules, registrations, team records, communications, waivers, and transaction-related records.",
    ],
  },
  {
    title: "Technical and service information",
    paragraphs: [
      "Our hosting, security, and communications providers may process limited technical information needed to deliver and protect the site or service. Depending on the provider and configuration, this can include an IP address, browser or device details, request timestamps, diagnostic events, and similar log data.",
      "Connected services, such as payment or email providers, process information under their own terms and privacy practices in addition to the configuration selected by the customer organization.",
    ],
  },
  {
    title: "How information may be used",
    bullets: [
      "Respond to inquiries, schedule demonstrations, and communicate about a requested evaluation.",
      "Provide, maintain, secure, troubleshoot, and improve the service and its enabled features.",
      "Support customer organizations and their authorized users.",
      "Process supported transactions through connected providers and maintain related business records.",
      "Comply with applicable legal obligations and protect the rights, safety, and integrity of users, organizations, FullCourtHQ, and others.",
    ],
  },
  {
    title: "When information may be shared",
    paragraphs: [
      "Information may be shared with service providers that help operate the site or product, with the customer organization that controls the relevant workspace, or when reasonably necessary for legal, safety, fraud-prevention, or business-continuity purposes.",
      "FullCourtHQ does not use information submitted through a demo inquiry as a public data product. We do not disclose it to unrelated third parties simply so they can send their own marketing messages.",
    ],
  },
  {
    title: "Retention and security",
    paragraphs: [
      "Information is generally retained for as long as reasonably needed for the purpose for which it was collected, to operate the service, to maintain appropriate records, or to meet contractual and legal obligations. Retention can vary by data type, customer instruction, connected provider, and applicable requirement.",
      "No method of storage or transmission is risk-free. FullCourtHQ uses safeguards appropriate to the service, but this page does not promise absolute security or uninterrupted availability.",
    ],
  },
  {
    title: "Youth participant information",
    paragraphs: [
      "Sports organizations may use FullCourtHQ for programs and teams that include youth participants. The customer organization is responsible for providing required notices, obtaining appropriate permissions, and using participant information lawfully.",
      "Children should not submit a marketing-site inquiry without the involvement of a parent, guardian, or other authorized adult.",
    ],
  },
  {
    title: "Your questions and choices",
    paragraphs: [
      "You can ask about a marketing inquiry or request that FullCourtHQ correct or delete the contact information you submitted, subject to records we may need to retain. For information held in a customer workspace, contact the facility or club that collected it; FullCourtHQ may need that organization's authorization before acting.",
      "Privacy rights vary by location and are subject to exceptions. Email info@fullcourthq.com with enough detail to understand your request, but do not send passwords, full payment card numbers, or unnecessary sensitive information.",
    ],
  },
  {
    title: "Updates to this overview",
    paragraphs: [
      "We may update this page as the website, product, providers, or legal requirements change. The date above shows when this version was last revised.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <InfoPage
      currentPath="/privacy"
      eyebrow="Privacy overview"
      title="Privacy at FullCourtHQ"
      introduction="What information may be involved when you contact us or use the service, and where to go with a question."
      updatedDate="2026-07-09"
      updatedLabel="July 9, 2026"
      sections={sections}
      closingNote="This page is a general, plain-language summary and is not a substitute for terms in an applicable customer agreement or data-processing addendum."
    />
  );
}
