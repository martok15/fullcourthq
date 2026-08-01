import type { Metadata } from "next";

import { InfoPage, type InfoPageSection } from "@/components/marketing/info-page";

const title = "Support";
const socialTitle = "Support | FullCourtHQ";
const description =
  "Support, safety-reporting, blocking, and account-deletion help for FullCourtHQ users.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/support" },
  openGraph: {
    title: socialTitle,
    description,
    url: "/support",
    type: "website",
  },
};

const sections: readonly InfoPageSection[] = [
  {
    title: "Get help",
    paragraphs: [
      "For help with a FullCourtHQ account, organization relationship, native-app access, billing record, notification, or product workflow, start with your facility or club when the issue concerns information or permissions it controls. You can also email FullCourtHQ support.",
      "Include the organization name, the page or feature involved, what you expected, what happened, and the approximate time. Screenshots can help, but remove unrelated personal information. Never send a password or full payment-card number.",
    ],
    resources: [
      {
        href: "mailto:info@fullcourthq.com?subject=FullCourtHQ%20Support",
        label: "Email info@fullcourthq.com",
        description: "Use email for account, product, privacy, accessibility, or moderation help.",
      },
    ],
  },
  {
    title: "Report a safety concern",
    paragraphs: [
      "For a specific message, use the Report action in FullCourtHQ whenever possible. That securely preserves the message context for the authorized moderator and is safer than copying sensitive content into an email.",
      "Urgent safety reports are prioritized for prompt review during support hours. FullCourtHQ is not an emergency service and reports are not monitored continuously. If someone is in immediate danger, contact 911 or the appropriate local emergency service before contacting FullCourtHQ.",
    ],
    resources: [
      {
        href: "/community-standards",
        label: "Read the Community Standards",
        description: "See prohibited conduct, reporting guidance, blocking behavior, and moderation options.",
      },
    ],
  },
  {
    title: "Block or unblock an account",
    paragraphs: [
      "Use Block on a message or conversation to stop direct messages in both directions. In a shared team conversation, messages from the blocked account remain collapsed for you unless you reveal one message. Blocking also suppresses unread counts and message push notifications from that account for you.",
      "You can review and remove blocks in Message safety settings. Unblocking allows future direct messages again but does not restore deleted content or reverse a separate moderation restriction.",
    ],
  },
  {
    title: "Native-app age access",
    paragraphs: [
      "The iOS and Android apps are for people age 13 or older in the United States. A player or member with a trusted date of birth showing they are under 13 cannot use the native apps. If no valid date of birth is available, the app asks the user to attest that they are at least 13.",
      "If the date of birth held by your organization is wrong, contact the organization to correct the authoritative record. FullCourtHQ support will not bypass a known under-13 result or change an organization's participant record without authorization.",
    ],
  },
  {
    title: "Delete an account",
    paragraphs: [
      "A signed-in user can start account deletion from the account page. The page explains the effect on profile access and organization records before the request is confirmed. Some financial, scheduling, safety, security, or legal history may need to be retained or de-identified.",
    ],
    resources: [
      {
        href: "https://app.fullcourthq.com/account/delete",
        label: "Request account deletion",
        description: "Sign in to review and start the deletion process.",
      },
      {
        href: "/privacy",
        label: "Read the Privacy notice",
        description: "Review collection, use, disclosures, retention, and privacy-request guidance.",
      },
    ],
  },
  {
    title: "Store and app details",
    paragraphs: [
      "FullCourtHQ's native apps are wrappers around the hosted FullCourtHQ service. Availability of features depends on your organization, role, and active relationship. The apps do not contain third-party advertising, and access to an existing organization relationship does not itself purchase a program or service.",
      "When reporting a native-app issue, include whether you use iOS or Android, the device and operating-system version, the FullCourtHQ app version, and whether the same workflow works in a browser.",
    ],
  },
];

export default function SupportPage() {
  return (
    <InfoPage
      currentPath="/support"
      eyebrow="Product support"
      title="How can we help?"
      introduction="Account, safety, native-app, privacy, and product support for FullCourtHQ users."
      updatedDate="2026-08-01"
      updatedLabel="August 1, 2026"
      sections={sections}
      closingNote="For immediate danger, contact 911 or the appropriate local emergency service. FullCourtHQ support is not an emergency service."
    />
  );
}
