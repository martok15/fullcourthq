import type { Metadata } from "next";

import { InfoPage, type InfoPageSection } from "@/components/marketing/info-page";

const title = "Privacy";
const socialTitle = "Privacy | FullCourtHQ";
const description =
  "How FullCourtHQ handles information across its website, hosted service, and iOS and Android apps.";

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
    title: "Scope and our role",
    paragraphs: [
      "This privacy notice covers the FullCourtHQ public website, hosted product, support interactions, and the FullCourtHQ iOS and Android apps. A customer agreement, data-processing addendum, or feature-specific notice may provide additional terms.",
      "Sports facilities and clubs generally decide why and how information is entered into their organization workspace. In that setting, the organization controls the relevant records and FullCourtHQ processes them to provide the service. Contacting the organization is usually the best first step for a question about its records.",
    ],
  },
  {
    title: "Information we process",
    bullets: [
      "Account and profile details, such as name, email address, authentication identifiers, organization relationships, roles, and profile preferences.",
      "Organization and sports-program records, such as participant and guardian details, teams, schedules, registrations, attendance, waivers, balances, and transaction records.",
      "Communications and safety information, including messages you send, the category and optional explanation in a safety report, blocking relationships, moderation status, and actions taken on a report.",
      "Age-eligibility information used for native-app access. This can include a trusted date of birth already held by an organization or a record that the user attested to being at least 13, together with the statement version, time, and device platform.",
      "Device and service information needed to operate and protect the service, such as IP address, browser or device type, timestamps, diagnostic events, session records, and push-notification tokens.",
      "Information you choose to provide in a demo request, support request, or other communication with FullCourtHQ.",
    ],
  },
  {
    title: "How information is used",
    bullets: [
      "Provide, personalize, maintain, secure, and troubleshoot the website, product, and native apps.",
      "Authenticate users, enforce role and organization boundaries, and confirm native-app eligibility.",
      "Deliver schedules, team communications, notifications, registrations, billing workflows, and other enabled features.",
      "Detect prohibited message content, receive reports, support blocking, investigate safety concerns, and enforce the Community Standards.",
      "Respond to inquiries, support customer organizations and their authorized users, maintain business records, and comply with applicable law.",
      "Understand service reliability and improve supported workflows without using customer content for unrelated advertising.",
    ],
  },
  {
    title: "Message safety, reporting, and blocking",
    paragraphs: [
      "Before a message is sent, FullCourtHQ may apply a private, deterministic check for a limited set of high-confidence prohibited phrases. If the message is rejected, its body and the matched phrase are not saved in the message-safety log. A limited event record may be kept to measure and defend the safety control.",
      "When someone reports a message, the report may preserve an evidence snapshot of the message and the reporter's optional explanation so an authorized moderator can review the concern even if the original message later changes or is hidden. Reporter identity is limited to the protected moderation queue and is not disclosed to the person reported through the reporting workflow.",
      "Tenant moderators may receive a metadata-only email alert that a report needs review. The alert does not include message content, the reporter's identity, or the reported user's name or email. Urgent safety reports and reports without an available tenant moderator may also be escalated to authorized FullCourtHQ platform reviewers.",
      "Blocking prevents direct messages in both directions. In a shared team conversation, messages from a blocked account are collapsed for the blocker and can be revealed one at a time. Blocked messages do not count as unread for the blocker and do not generate message push notifications to that person.",
    ],
  },
  {
    title: "Payments, notifications, and service providers",
    paragraphs: [
      "Supported payment workflows use connected payment providers such as Stripe. FullCourtHQ does not need to store a complete payment-card number to provide those workflows, but it may keep provider references, payment status, amounts, and related business records.",
      "Hosting, authentication, database, email, push-notification, observability, and payment providers may process limited information on our behalf to deliver and protect the service. Their own terms and privacy practices also apply where they interact directly with you or an organization.",
    ],
  },
  {
    title: "How information may be disclosed",
    paragraphs: [
      "Information may be disclosed to the organization that controls the relevant workspace, to service providers acting for FullCourtHQ, or when reasonably necessary for legal compliance, safety, fraud prevention, security, a business transaction, or the protection of users and others.",
      "FullCourtHQ does not sell personal information or use product messages, participant records, or native-app activity for third-party targeted advertising. The native apps do not display third-party advertising.",
    ],
  },
  {
    title: "Youth and native-app access",
    paragraphs: [
      "The FullCourtHQ iOS and Android apps are intended only for people age 13 or older in the United States. A player or member with a trusted date of birth showing that they are under 13 cannot use the native apps. If no valid date of birth is available, the native app requires an attestation that the user is at least 13.",
      "An existing account does not override the native-app age requirement. Customer organizations may operate web-based youth programs under their own notices, permissions, and legal responsibilities, and parents or guardians may have access to information connected to those programs.",
    ],
  },
  {
    title: "Retention and deletion",
    paragraphs: [
      "Information is retained for as long as reasonably needed to provide the service, preserve operational and transaction history, meet customer instructions, resolve disputes, protect safety and security, and comply with contractual or legal obligations. The period varies by record type and context.",
      "A safety report's optional details and preserved evidence snapshot are scheduled to be scrubbed 90 days after the report is resolved or dismissed. Non-sensitive case and action history may be retained for accountability. An original hidden message body is removed only after every related report has reached the applicable retention point.",
      "A signed-in user can start the account-deletion process from the account page. Deleting an account may remove or de-identify profile data while preserving records that an organization or FullCourtHQ must retain, including financial, security, moderation, scheduling, or legal history.",
    ],
    resources: [
      {
        href: "https://app.fullcourthq.com/account/delete",
        label: "Request account deletion",
        description: "Sign in to review the account-deletion process and its effect on organization records.",
      },
    ],
  },
  {
    title: "Your choices and questions",
    paragraphs: [
      "You may ask FullCourtHQ to access, correct, or delete information you submitted directly, subject to identity verification and records we are permitted or required to retain. Rights and exceptions vary by location. For information held in an organization workspace, contact the facility or club first; FullCourtHQ may need its authorization before acting.",
      "You can control push notifications through your device settings, leave or mute supported conversations where the product permits, block another account, and report a message from the message interface.",
    ],
    resources: [
      {
        href: "/support",
        label: "Get support",
        description: "Find safety-reporting, account, and contact guidance.",
      },
      {
        href: "mailto:info@fullcourthq.com?subject=Privacy%20Request",
        label: "Email a privacy request",
        description: "Do not send passwords, full payment-card numbers, or unnecessary sensitive information.",
      },
    ],
  },
  {
    title: "Changes to this notice",
    paragraphs: [
      "We may update this notice as the website, product, native apps, providers, or legal requirements change. The date above identifies the current version. Material changes may also be communicated through the service when appropriate.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <InfoPage
      currentPath="/privacy"
      eyebrow="Privacy notice"
      title="Privacy at FullCourtHQ"
      introduction="How information is used across the FullCourtHQ website, hosted service, and iOS and Android apps."
      updatedDate="2026-08-01"
      updatedLabel="August 1, 2026"
      sections={sections}
      closingNote="This notice is a general description of FullCourtHQ's practices. A customer agreement or data-processing addendum may provide additional terms for a particular organization."
    />
  );
}
