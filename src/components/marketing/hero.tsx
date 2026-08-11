import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const operatingAreas = [
  { index: "01", name: "Facility", detail: "Courts & availability" },
  { index: "02", name: "Programs", detail: "Sessions & registration" },
  { index: "03", name: "Teams", detail: "Rosters & competition" },
  { index: "04", name: "Billing", detail: "Payments & access" },
  { index: "05", name: "Families", detail: "Schedules & actions" },
];

const daySignals = [
  { label: "On court now", value: "3 of 4 courts open" },
  { label: "Next handoff", value: "Skills clinic · 5:30 PM" },
  { label: "Family action", value: "Payment setup required" },
];

export function Hero() {
  return (
    <section className="ops-hero" aria-labelledby="hero-title">
      <div className="ops-hero__schedule-grid" aria-hidden="true" />
      <div className="site-shell">
        <div className="ops-hero__grid">
          <div className="ops-hero__copy">
            <p className="ops-kicker">Sports facility &amp; club operations</p>
            <h1 id="hero-title">
              <span>The operating system</span>
              <span>behind your</span>
              <span className="ops-hero__title-accent">sports day.</span>
            </h1>
            <p className="ops-hero__lede">
              Connect court availability, programs, teams, billing, and family communication in one shared operating
              record.
            </p>
            <div className="ops-hero__actions">
              <Link href="#demo" className="ops-button ops-button--primary">
                Book a walkthrough
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link href="#product-tour" className="ops-button ops-button--secondary">
                Tour the real product
              </Link>
            </div>
            <p className="ops-hero__proof">
              <CheckCircle2 aria-hidden="true" size={18} />
              Real product screens. Demo data. Built for multi-court operations.
            </p>
          </div>

          <HeroOperatingBoard />
        </div>

        <div className="ops-flow" id="platform">
          <div className="ops-flow__lead">
            <span>One operating record</span>
            <strong>Every role sees what it needs.</strong>
          </div>
          <ol className="ops-flow__track" aria-label="Connected FullCourtHQ product areas">
            {operatingAreas.map((area) => (
              <li key={area.name}>
                <span className="ops-flow__marker" aria-hidden="true" />
                <span className="ops-flow__index">{area.index}</span>
                <strong>{area.name}</strong>
                <small>{area.detail}</small>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function HeroOperatingBoard() {
  return (
    <div className="ops-hero__product" aria-label="A real FullCourtHQ administrator dashboard and operating-day summary">
      <div className="ops-console">
        <div className="ops-console__bar">
          <span className="ops-console__status">
            <span aria-hidden="true" />
            Demo operating day
          </span>
          <time dateTime="2026-05-18">Mon · May 18 · America/Chicago</time>
        </div>

        <figure className="ops-console__screen">
          <Image
            src="/product/fullcourthq-admin-dashboard.png"
            alt="FullCourtHQ administrator dashboard showing court status, today’s bookings, and weekly utilization"
            width={1280}
            height={720}
            sizes="(max-width: 860px) 94vw, (max-width: 1120px) 84vw, 58vw"
            preload
          />
          <figcaption>Real FullCourtHQ product screen using a demo workspace</figcaption>
        </figure>

        <ul className="ops-console__signals" aria-label="Example operating-day signals">
          {daySignals.map((signal) => (
            <li key={signal.label}>
              <span>{signal.label}</span>
              <strong>{signal.value}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
