import type { Metadata } from "next";

import { InfoPage, type InfoPageSection } from "@/components/marketing/info-page";

const title = "Security";
const socialTitle = "Security | FullCourtHQ";
const description =
  "A plain-language overview of FullCourtHQ's approach to product security, access, payments, and responsible reporting.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/security" },
  openGraph: {
    title: socialTitle,
    description,
    url: "/security",
    type: "website",
  },
};

const sections: readonly InfoPageSection[] = [
  {
    title: "Our approach",
    paragraphs: [
      "FullCourtHQ is built to support the operational work of sports facilities and clubs. Security is an ongoing product and operational responsibility, not a one-time claim or a guarantee that risk can be eliminated.",
      "The controls available to an organization can depend on its configuration, enabled features, connected providers, and the responsibilities it assigns to its own users.",
    ],
  },
  {
    title: "Access and organization boundaries",
    paragraphs: [
      "The product is designed around organization-scoped workflows and role-appropriate experiences. Administrative, staff, coach, and family access can differ based on the role and context assigned to a user.",
    ],
    bullets: [
      "Organizations are responsible for assigning access carefully and removing it when a person's responsibilities change.",
      "Users should keep their sign-in credentials private and report unexpected access promptly.",
      "No statement on this page should be read as a promise that every control is available in every deployment or plan.",
    ],
  },
  {
    title: "Payments and connected services",
    paragraphs: [
      "FullCourtHQ can connect with established providers, including Stripe, for supported payment workflows. Those providers operate their own systems and apply their own security, privacy, and compliance programs.",
      "Connected services may require an organization to configure its own account, permissions, and operating procedures. FullCourtHQ is not a bank, card network, or payment processor.",
    ],
  },
  {
    title: "Operational safeguards",
    paragraphs: [
      "Our security work includes maintaining application dependencies, reviewing access paths, protecting production configuration, and responding to reported issues. Practices and architecture may change as the service evolves.",
      "A public marketing page cannot describe every implementation detail without creating additional risk. Customers with specific requirements should raise them during evaluation so the team can provide current, scoped information.",
    ],
  },
  {
    title: "Report a security concern",
    paragraphs: [
      "If you believe you found a security issue, email info@fullcourthq.com with a clear description, the affected page or workflow, and steps that help reproduce it. Do not include passwords, payment card data, or personal information that is not necessary to explain the issue.",
      "We will review good-faith reports and determine an appropriate response based on the available evidence and potential impact. This page does not create a formal bug-bounty program or promise a particular response time or reward.",
    ],
  },
  {
    title: "Certifications and service commitments",
    paragraphs: [
      "Unless FullCourtHQ provides a specific statement in signed documentation, this page should not be interpreted as a claim of SOC 2, ISO, HIPAA, PCI, or other certification; a guarantee of uptime; or a commitment to a particular audit or testing schedule.",
      "Any contractual security, availability, or data-handling commitments are defined in the agreement that applies to the customer relationship.",
    ],
  },
];

export default function SecurityPage() {
  return (
    <InfoPage
      currentPath="/security"
      eyebrow="Trust & transparency"
      title="Security at FullCourtHQ"
      introduction="A clear, appropriately scoped overview of how we think about access, connected services, and product security."
      updatedDate="2026-07-09"
      updatedLabel="July 9, 2026"
      sections={sections}
      closingNote="This overview is informational. Current product behavior and signed customer agreements take precedence over general marketing-site descriptions."
    />
  );
}
