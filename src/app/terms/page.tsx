import type { Metadata } from "next";

import { InfoPage, type InfoPageSection } from "@/components/marketing/info-page";

const title = "Terms of Use";
const socialTitle = "Terms of Use | FullCourtHQ";
const description =
  "Terms for using the FullCourtHQ website, hosted service, and iOS and Android apps.";

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
    title: "Scope and applicable agreements",
    paragraphs: [
      "These terms govern access to the FullCourtHQ public website, hosted service, and iOS and Android apps. By accessing or using those services, you agree to follow these terms and the Community Standards.",
      "A subscription agreement, order form, data-processing addendum, payment-provider agreement, or other signed contract may add or replace terms for a customer organization. If a signed customer agreement conflicts with these terms on a matter it covers, the signed agreement controls for that customer relationship.",
    ],
  },
  {
    title: "Accounts, organizations, and eligibility",
    paragraphs: [
      "Provide accurate account information, keep credentials private, and tell your organization or FullCourtHQ promptly if you suspect unauthorized access. You may use only accounts, organizations, teams, and records you are authorized to access. An organization controls the roles and relationships it assigns in its workspace.",
      "The FullCourtHQ native apps are offered in the United States for people age 13 or older. Player and member access requires an existing active account and organization relationship. A trusted date of birth showing that a player or member is under 13 makes that person ineligible for native-app access. When no valid date of birth is available, the app may require an age attestation.",
      "Adults remain responsible for supervising minors and using youth information in accordance with applicable law and the organization's policies. Do not misstate age, identity, authority, or organization relationships to obtain access.",
    ],
  },
  {
    title: "Acceptable use",
    paragraphs: [
      "Use FullCourtHQ only for lawful, authorized sports-organization and related personal activities. You are responsible for content and instructions you submit through your account.",
    ],
    bullets: [
      "Do not threaten, harass, bully, exploit, impersonate, discriminate against, or endanger another person.",
      "Do not send sexual exploitation material, illegal content, malicious code, spam, or content that violates privacy, intellectual-property, or other rights.",
      "Do not bypass access controls, probe non-public systems without authorization, interfere with service operation, scrape protected records, or misuse another person's credentials.",
      "Do not submit payment, participant, health, identity, or other sensitive information unless the supported workflow and your authority permit it.",
      "Follow the Community Standards and any additional rules your organization lawfully applies to its workspace.",
    ],
  },
  {
    title: "Communications, reports, and moderation",
    paragraphs: [
      "FullCourtHQ may apply limited automated checks before a message is sent. Users can report messages and block accounts. Authorized tenant or platform moderators may preserve evidence, hide or restore content, restrict messaging, suspend access, resolve or dismiss reports, and take other proportionate action to protect users and the service.",
      "We may remove content or limit access when we reasonably believe these terms, the Community Standards, an organization's rules, or applicable law have been violated. We may also act to address a credible safety or security risk while a review is underway. Moderation tools reduce risk but cannot guarantee that every harmful message will be detected or reviewed immediately.",
      "Do not make knowingly false or abusive reports. Good-faith reports are permitted even when a moderator ultimately finds no violation. The reporting workflow does not disclose the reporter's identity to the reported user, although legal process or a safety emergency may require separate disclosure.",
    ],
  },
  {
    title: "Customer content and responsibilities",
    paragraphs: [
      "Customer organizations and users retain their rights in content they are authorized to submit. They grant FullCourtHQ the limited rights needed to host, process, transmit, back up, moderate, and otherwise provide and protect the service.",
      "Organizations are responsible for configuring their workspace, assigning access, providing required notices, obtaining permissions, maintaining accurate records, and responding to their users. FullCourtHQ is not the organizer of an organization's programs and does not replace its safeguarding, supervision, financial, or legal responsibilities.",
    ],
  },
  {
    title: "Payments and third-party services",
    paragraphs: [
      "Some workflows connect to third-party services such as payment, email, authentication, or push-notification providers. Their terms and privacy practices apply to their services. FullCourtHQ is not a bank, card network, or payment processor.",
      "Fees, refunds, subscription terms, and payment responsibilities are governed by the applicable organization or customer agreement and supported checkout terms. The native apps provide access to an existing organization relationship and do not themselves create a right to a paid program, registration, or service.",
    ],
  },
  {
    title: "FullCourtHQ materials and feedback",
    paragraphs: [
      "The service, website, software, brand, product imagery, and documentation are owned by FullCourtHQ or used with permission. These terms grant only a limited, revocable right to use the service as intended; they do not transfer ownership.",
      "If you provide feedback, you permit FullCourtHQ to use it without restriction or compensation, provided we do not identify you publicly without permission. Third-party names and marks remain the property of their owners.",
    ],
  },
  {
    title: "Availability, changes, and disclaimers",
    paragraphs: [
      "Features, interfaces, integrations, and availability may change and can vary by organization configuration. Marketing materials, screenshots, demonstrations, and roadmap discussions are general information, not a commitment to deliver a future feature or meet a particular legal, regulatory, accounting, or operational requirement.",
      "The service is provided on an as-available basis to the extent permitted by law. No system is free from interruption or risk. Any warranties, service levels, remedies, or liability limits for a paid customer are stated in the agreement that applies to that customer. Nothing in these terms excludes a right or responsibility that cannot lawfully be excluded.",
    ],
  },
  {
    title: "Suspension, termination, and account deletion",
    paragraphs: [
      "An organization or FullCourtHQ may suspend or end access when authorization ends, an agreement expires, a user violates applicable rules, or action is reasonably necessary for safety, security, legal compliance, or service integrity. Where practical, access may be restored after the concern is resolved.",
      "You may start account deletion from the signed-in account page. Some operational, financial, scheduling, safety, security, or legal records may be retained or de-identified as described in the Privacy notice and applicable customer agreement.",
    ],
    resources: [
      {
        href: "https://app.fullcourthq.com/account/delete",
        label: "Request account deletion",
        description: "Sign in to review and start the account-deletion process.",
      },
    ],
  },
  {
    title: "Changes and questions",
    paragraphs: [
      "We may update these terms as the service or legal requirements change. The date above identifies this version. Material changes may also be communicated through the service when appropriate. Continued use after an effective update constitutes acceptance to the extent permitted by law.",
    ],
    resources: [
      {
        href: "/community-standards",
        label: "Read the Community Standards",
        description: "Review the rules for communications and user conduct.",
      },
      {
        href: "/support",
        label: "Get support",
        description: "Find account, safety, and contact guidance.",
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <InfoPage
      currentPath="/terms"
      eyebrow="Terms of use"
      title="The rules for using FullCourtHQ"
      introduction="Terms for the website, hosted service, and FullCourtHQ iOS and Android apps."
      updatedDate="2026-08-01"
      updatedLabel="August 1, 2026"
      sections={sections}
      closingNote="These terms do not replace a signed customer agreement or advice from your legal counsel."
    />
  );
}
