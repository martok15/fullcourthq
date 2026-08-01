import type { Metadata } from "next";

import { InfoPage, type InfoPageSection } from "@/components/marketing/info-page";

const title = "Community Standards";
const socialTitle = "Community Standards | FullCourtHQ";
const description =
  "The conduct and message-safety standards for the FullCourtHQ service and native apps.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/community-standards" },
  openGraph: {
    title: socialTitle,
    description,
    url: "/community-standards",
    type: "website",
  },
};

const sections: readonly InfoPageSection[] = [
  {
    title: "A safe sports community",
    paragraphs: [
      "FullCourtHQ connects people who operate, coach, participate in, and support sports programs. Treat every person with respect and use organization communications only for legitimate team, program, facility, and account purposes.",
      "These standards apply to messages, profile information, reports, uploads, and other content submitted through FullCourtHQ. An organization may apply additional rules to its own programs, but it may not use those rules to permit conduct prohibited here.",
    ],
  },
  {
    title: "Content and conduct we do not allow",
    bullets: [
      "Threats of violence, credible threats of self-harm, encouragement of dangerous conduct, or content intended to intimidate or endanger someone.",
      "Bullying, targeted harassment, stalking, repeated unwanted contact, humiliation, or abuse based on a person's identity or protected characteristics.",
      "Sexual exploitation, grooming, sexual content involving a minor, requests for sexual content from a minor, or any material that endangers a child.",
      "Sharing private or identifying information without authorization, including doxxing, credentials, payment-card data, sensitive health information, or another person's private communications.",
      "Impersonation, fraud, scams, malicious links or code, spam, illegal transactions, or attempts to bypass safety, access, payment, or security controls.",
      "Content that infringes intellectual-property rights or violates applicable law, a valid court order, or an authorized organization's safeguarding rules.",
    ],
  },
  {
    title: "Report a message",
    paragraphs: [
      "Use the Report action on a message to choose the closest category and, if useful, add a short explanation. Reports go to authorized moderators for the organization. Urgent child-safety or credible-threat reports, and reports for an organization without an available moderator, may also be escalated to authorized FullCourtHQ platform reviewers.",
      "Reports should be made in good faith. The person whose message is reported is not told the reporter's identity through the reporting workflow. Do not add unnecessary private information to the optional explanation.",
    ],
  },
  {
    title: "Block another account",
    paragraphs: [
      "Blocking stops direct messages in both directions. If both people remain in a shared team conversation, messages from the blocked account are collapsed for the blocker. The blocker can reveal an individual shared-team message without removing the block.",
      "Blocked messages do not count as unread for the blocker and do not generate message push notifications to that person. Blocking does not automatically remove either person from a team or prevent an authorized moderator from reviewing a report.",
    ],
  },
  {
    title: "How moderation works",
    paragraphs: [
      "FullCourtHQ uses a limited high-confidence automated check to reject certain clearly prohibited outgoing phrases. Automated checks do not replace human judgment, and a message passing the check does not mean it complies with these standards.",
      "Authorized tenant moderators can review reports, preserve evidence, hide or restore messages, temporarily restrict messaging, suspend access, and resolve or dismiss cases. Authorized FullCourtHQ platform reviewers handle escalated cases. Actions are selected based on context, severity, repeat behavior, available evidence, and user safety.",
      "We may take immediate protective action while reviewing an urgent concern. No moderation system can guarantee that all harmful content will be detected or that every disagreement will be resolved to each person's satisfaction.",
    ],
  },
  {
    title: "Emergencies and immediate danger",
    paragraphs: [
      "FullCourtHQ is not an emergency service and reports are not monitored continuously. If someone is in immediate danger, contact 911 or the appropriate local emergency service first. For a child-safety concern, also follow the reporting and safeguarding requirements that apply to you and your organization.",
      "After addressing immediate danger, report the relevant message in the app so authorized moderators can preserve context and take account-level action.",
    ],
  },
  {
    title: "Questions or review requests",
    paragraphs: [
      "If you cannot use the in-app report flow, need help with a block, or believe an account action was made in error, contact FullCourtHQ support. Include the organization and approximate date of the event, but do not email passwords, full payment-card numbers, or copies of illegal material.",
    ],
    resources: [
      {
        href: "/support",
        label: "Get support",
        description: "Find the safest way to contact the team about an account or moderation issue.",
      },
      {
        href: "/privacy",
        label: "Read the Privacy notice",
        description: "Learn how reports, evidence, blocking, and retention are handled.",
      },
    ],
  },
];

export default function CommunityStandardsPage() {
  return (
    <InfoPage
      currentPath="/community-standards"
      eyebrow="Community safety"
      title="Play fair. Communicate safely."
      introduction="The conduct standards, reporting tools, blocking behavior, and moderation process for FullCourtHQ."
      updatedDate="2026-08-01"
      updatedLabel="August 1, 2026"
      sections={sections}
      closingNote="FullCourtHQ has zero tolerance for objectionable content and abusive users. Context still matters when moderators select a proportionate action."
    />
  );
}
