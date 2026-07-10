import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  Check,
  CreditCard,
  LockKeyhole,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  Trophy,
  UsersRound,
} from "lucide-react";

const workflowSteps = [
  ["01", "Build the program", "Set sessions, courts, capacity, trainers, player fit, and pricing."],
  ["02", "Publish registration", "Give families a clear, mobile path from discovery to the right session."],
  ["03", "Run the roster", "Keep registrations, payment status, credits, moves, and trainer details together."],
  ["04", "See the operation", "Connect program activity back to the shared schedule and revenue picture."],
];

const audiences = [
  {
    icon: Building2,
    title: "Facility operators",
    body: "See courts, bookings, blocked time, approvals, and utilization without stitching together calendars and spreadsheets.",
  },
  {
    icon: Sparkles,
    title: "Program directors",
    body: "Launch training and clinics with capacity, eligibility, registration, payment, roster, and session details in one flow.",
  },
  {
    icon: Trophy,
    title: "Club leaders",
    body: "Manage teams, guardians, schedules, availability, fees, messaging, and competition around one connected record.",
  },
  {
    icon: UsersRound,
    title: "Coaches and families",
    body: "Give every role a focused mobile home for the next event, action, message, payment, or registration.",
  },
];

const trustItems = [
  {
    icon: LockKeyhole,
    title: "Role-aware access",
    body: "Separate platform, facility staff, trainer, coach, parent, and public experiences around the work each role needs.",
  },
  {
    icon: CreditCard,
    title: "Stripe-connected payments",
    body: "Support card and ACH workflows while payment details remain handled through Stripe’s payment infrastructure.",
  },
  {
    icon: ShieldCheck,
    title: "Waivers with evidence",
    body: "Attach required waivers to key registration and access flows and retain signed acceptance records for staff review.",
  },
  {
    icon: BadgeCheck,
    title: "Tenant-level control",
    body: "Keep organizations, branding, domains, configuration, and operational data separated within the platform model.",
  },
];

const faqs = [
  {
    question: "Is FullCourtHQ only court-booking software?",
    answer:
      "No. Booking is one connected workflow. FullCourtHQ also supports facility scheduling, programs and training, teams and clubs, billing and access, tournaments, communications, waivers, reporting, and parent and coach portals.",
  },
  {
    question: "Who is the platform best suited for?",
    answer:
      "The strongest fit is an organization operating courts or facilities alongside programs, club teams, training, or events. That overlap is where one connected system replaces the most operational friction.",
  },
  {
    question: "Can the experience carry our brand?",
    answer:
      "Yes. Tenant branding is applied across public and portal experiences, with support for organization-specific logos, colors, and domains as part of implementation readiness.",
  },
  {
    question: "Does FullCourtHQ replace our payment processor?",
    answer:
      "FullCourtHQ connects the operational record to Stripe-powered payment flows. The platform coordinates products, plans, checkout, payment status, and staff workflows rather than storing raw card details itself.",
  },
  {
    question: "How does implementation work?",
    answer:
      "Implementation is scoped around your facilities, programs, teams, billing setup, roles, branding, and rollout sequence. The walkthrough is the first step in mapping that operating model and identifying a sensible launch path.",
  },
];

export function ConnectedWorkflowSection() {
  return (
    <section className="workflow-section" id="workflows" aria-labelledby="workflow-heading">
      <div className="site-shell">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow eyebrow-gold">Connected workflows</p>
            <h2 id="workflow-heading">One platform. Every part of the operation in sync.</h2>
          </div>
          <p>
            FullCourtHQ is designed around the handoffs between schedules, people, payments, and communication—not a
            collection of isolated feature pages.
          </p>
        </div>

        <div className="workflow-story">
          <div className="workflow-copy">
            <p className="workflow-kicker">Example workflow · Programs and training</p>
            <h3>Take a program from court time to family registration.</h3>
            <ol>
              {workflowSteps.map(([number, title, body]) => (
                <li key={number}>
                  <span>{number}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="workflow-visual" aria-label="Real scheduling and training screens">
            <figure className="workflow-desktop">
              <figcaption>Shared facility calendar</figcaption>
              <Image
                src="/product/fullcourthq-calendar-desktop.png"
                alt="FullCourtHQ facility calendar with courts, filters, dates, and available time"
                width={1280}
                height={720}
                sizes="(max-width: 900px) 92vw, 55vw"
              />
            </figure>
            <figure className="workflow-mobile">
              <figcaption>Family registration</figcaption>
              <div>
                <Image
                  src="/product/rdc-training-detail.png"
                  alt="Tenant-branded mobile training registration screen showing session, player fit, availability, and pricing"
                  width={780}
                  height={1688}
                  sizes="(max-width: 900px) 42vw, 15vw"
                />
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SolutionsSection() {
  return (
    <section className="solutions-section" id="solutions" aria-labelledby="solutions-heading">
      <div className="site-shell">
        <div className="section-heading section-heading--centered">
          <p className="eyebrow">Built around the people running the day</p>
          <h2 id="solutions-heading">A focused view for every role. One operating record underneath.</h2>
        </div>
        <div className="audience-grid">
          {audiences.map((audience) => {
            const Icon = audience.icon;
            return (
              <article key={audience.title}>
                <Icon aria-hidden="true" size={23} />
                <h3>{audience.title}</h3>
                <p>{audience.body}</p>
              </article>
            );
          })}
        </div>
        <div className="persona-bridge">
          <CalendarDays aria-hidden="true" size={26} />
          <div>
            <strong>The same schedule, translated for each role.</strong>
            <p>Operators see resources. Coaches see readiness. Families see what’s next.</p>
          </div>
          <Link href="#product-tour">
            View the real screens <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
    <section className="pricing-section" id="pricing" aria-labelledby="pricing-heading">
      <div className="site-shell pricing-layout">
        <div>
          <p className="eyebrow eyebrow-gold">Pricing</p>
          <h2 id="pricing-heading">Built around your operating model—not a generic seat count.</h2>
        </div>
        <div className="pricing-detail">
          <p>
            Facilities and clubs do not all run the same way. Pricing is shaped by the footprint, workflows, and
            rollout support you actually need.
          </p>
          <ul>
            <li><Check aria-hidden="true" size={18} /> Facilities, courts, and locations</li>
            <li><Check aria-hidden="true" size={18} /> Programs, teams, and billing scope</li>
            <li><Check aria-hidden="true" size={18} /> Branding, setup, and implementation path</li>
          </ul>
          <Link href="#demo" className="button button-gold">
            Talk through your operation
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function TrustSection() {
  return (
    <section className="trust-section" id="trust" aria-labelledby="trust-heading">
      <div className="site-shell">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">Trust is an operating feature</p>
            <h2 id="trust-heading">Clear boundaries for people, payments, and organizations.</h2>
          </div>
          <p>
            FullCourtHQ combines role-aware experiences with practical payment, waiver, and tenant controls. Review
            the details that matter to your implementation.
          </p>
        </div>
        <div className="trust-grid">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title}>
                <Icon aria-hidden="true" size={22} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            );
          })}
        </div>
        <div className="trust-links">
          <Link href="/security">Security overview</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/accessibility">Accessibility</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className="faq-section" id="resources" aria-labelledby="faq-heading">
      <div className="site-shell faq-layout">
        <div className="faq-intro">
          <p className="eyebrow">Questions worth asking</p>
          <h2 id="faq-heading">A clearer way to evaluate the fit.</h2>
          <p>
            We’d rather be specific about where FullCourtHQ fits than hide behind generic software language.
          </p>
          <div className="faq-contact-note">
            <MessagesSquare aria-hidden="true" size={22} />
            <p>Have a workflow that is not covered here? Bring it to the walkthrough.</p>
          </div>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
