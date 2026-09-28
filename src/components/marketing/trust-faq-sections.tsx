import Link from "next/link";
import { ArrowUpRight, BadgeCheck, CreditCard, LockKeyhole, ShieldCheck } from "lucide-react";
import type { CSSProperties } from "react";

import { contactEmail } from "@/lib/contact";

const trustItems = [
  {
    icon: LockKeyhole,
    title: "Role-aware access",
    body: "Staff, coaches, trainers, and parents each see only the work that belongs to them.",
  },
  {
    icon: CreditCard,
    title: "Payments on Stripe",
    body: "Card and bank details are handled by Stripe’s payment infrastructure, not stored by us.",
  },
  {
    icon: ShieldCheck,
    title: "Waivers with a record",
    body: "Required waivers attach to registration and access, with signed acceptance kept for staff.",
  },
  {
    icon: BadgeCheck,
    title: "Your organization, separated",
    body: "Your branding, configuration, and data stay separate from every other organization.",
  },
];

const faqs = [
  {
    question: "Who is FullCourtHQ built for?",
    answer:
      "Sports facilities, clubs, and training academies, especially organizations that run courts alongside programs, club teams, and events. That overlap is where one connected system replaces the most spreadsheets, calendars, and payment apps.",
  },
  {
    question: "How is FullCourtHQ priced?",
    answer:
      "Pricing is based on your operation, not a per-seat count: how many facilities and courts you run, which programs, teams, and billing you bring over, and how much rollout help you want. You’ll get a clear number after the walkthrough.",
  },
  {
    question: "Do families see ads?",
    answer:
      "No. The FullCourtHQ apps don’t display third-party advertising, and FullCourtHQ doesn’t sell personal information or use family activity for targeted advertising.",
  },
  {
    question: "Does FullCourtHQ replace our payment processor?",
    answer:
      "FullCourtHQ works with Stripe. It handles the products, plans, checkout, and payment status your staff and families see, while Stripe processes the payments. FullCourtHQ never stores raw card details.",
  },
  {
    question: "Can it carry our club’s brand?",
    answer:
      "Yes. Your logo and colors appear across the public pages and the parent and coach experience, and organization-specific domains are supported as part of setup.",
  },
  {
    question: "Is it just court booking?",
    answer:
      "No. Booking is one piece. FullCourtHQ also covers programs and training, club teams, billing and memberships, tournaments, messaging, waivers, reporting, and the parent and coach apps.",
  },
  {
    question: "How does getting started work?",
    answer:
      "We start with a walkthrough of how you run today: your facilities, programs, teams, billing, and roles. From there we scope setup, branding, and a rollout order that makes sense for your season.",
  },
];

export function TrustSection() {
  return (
    <section className="trust" id="trust" aria-labelledby="trust-heading">
      <div className="site-shell">
        <div className="trust__head">
          <h2 id="trust-heading" data-reveal>
            Built to be trusted with families’ information.
          </h2>
          <nav className="trust__links" aria-label="Trust and policy pages" data-reveal>
            <Link href="/security">Security</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/accessibility">Accessibility</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </div>
        <ul className="trust__grid">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={item.title} data-reveal style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}>
                <Icon aria-hidden="true" size={20} />
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className="faq" id="faq" aria-labelledby="faq-heading">
      <div className="site-shell faq__layout">
        <div className="faq__intro">
          <p className="kicker" data-reveal>
            FAQ
          </p>
          <h2 id="faq-heading" data-reveal>
            Questions clubs ask us.
          </h2>
          <p data-reveal>
            Something else on your mind?{" "}
            <a className="text-link" href={`mailto:${contactEmail}`}>
              Email the team <ArrowUpRight aria-hidden="true" size={15} />
            </a>
          </p>
        </div>
        <div className="faq__list" data-reveal>
          {faqs.map((item) => (
            <details key={item.question} name="faq">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
