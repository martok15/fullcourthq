import type { Metadata } from "next";

import { InfoPage, type InfoPageSection } from "@/components/marketing/info-page";

const title = "Accessibility";
const socialTitle = "Accessibility | FullCourtHQ";
const description =
  "FullCourtHQ's accessibility goals, current approach, and instructions for reporting a barrier.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/accessibility" },
  openGraph: {
    title: socialTitle,
    description,
    url: "/accessibility",
    type: "website",
  },
};

const sections: readonly InfoPageSection[] = [
  {
    title: "Our goal",
    paragraphs: [
      "FullCourtHQ aims to make its marketing site and product usable by as many people as practical, including people who use keyboards, screen readers, zoom, voice input, or reduced-motion settings.",
      "We use WCAG 2.2 Level AA as a practical reference point for ongoing design and engineering work. This statement describes a goal and working approach; it is not a claim that every page, workflow, or connected third-party experience currently conforms in full.",
    ],
  },
  {
    title: "How we approach accessibility",
    bullets: [
      "Use semantic page structure and descriptive labels where the interface allows it.",
      "Support keyboard navigation and visible focus for interactive controls.",
      "Consider text contrast, readable sizing, responsive layouts, and content at increased zoom.",
      "Provide text alternatives for meaningful images and avoid relying on color alone to communicate important state.",
      "Respect reduced-motion preferences when motion is not essential to understanding a workflow.",
    ],
  },
  {
    title: "Third-party and customer content",
    paragraphs: [
      "Some workflows can include content supplied by customer organizations or experiences delivered by connected providers. Their accessibility may vary and can sit partly outside FullCourtHQ's direct control.",
      "If a connected or customer-managed experience creates a barrier, tell us where it occurs. We can help identify whether FullCourtHQ, the customer organization, or the provider is best positioned to address it.",
    ],
  },
  {
    title: "Report a barrier",
    paragraphs: [
      "Email info@fullcourthq.com if something prevents you from using the site or product. Helpful details include the page or workflow, what you were trying to do, your device and browser, and any assistive technology involved.",
      "Please describe the problem in the way that is easiest for you. We will review the report and look for a practical response or alternative, but this page does not promise a particular remediation date.",
    ],
  },
  {
    title: "Ongoing improvement",
    paragraphs: [
      "Accessibility work evolves with the product. We may revise this statement as interfaces change, feedback identifies barriers, or our testing approach matures.",
    ],
  },
];

export default function AccessibilityPage() {
  return (
    <InfoPage
      currentPath="/accessibility"
      eyebrow="Inclusive by intent"
      title="Accessibility at FullCourtHQ"
      introduction="Our current direction, the benchmark that informs our work, and the fastest way to tell us about a barrier."
      updatedDate="2026-07-09"
      updatedLabel="July 9, 2026"
      sections={sections}
      closingNote="Accessibility is an ongoing practice. Feedback from people using the site and product is an important part of that work."
    />
  );
}
