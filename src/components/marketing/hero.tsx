import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";

const platformAreas = [
  { name: "Facility", detail: "Courts, schedules, and rentals" },
  { name: "Programs", detail: "Training, clinics, and registration" },
  { name: "Club", detail: "Teams, rosters, and competition" },
  { name: "Billing", detail: "Payments, plans, and access" },
  { name: "Families", detail: "Schedules, messages, and actions" },
];

export function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <div className="site-shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-gold">Sports facility &amp; club operating system</p>
          <h1 id="hero-title">
            <span>Run the facility.</span>
            <span>Grow the programs.</span>
            <span>Keep every team connected.</span>
          </h1>
          <p className="hero-lede">
            FullCourtHQ brings scheduling, registrations, teams, billing, communications, and the family experience
            into one connected platform.
          </p>
          <div className="hero-actions">
            <Link href="#demo" className="button button-gold hero-primary">
              See the platform in action
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link href="#product-tour" className="button button-ghost">
              Explore the product
            </Link>
          </div>
          <p className="hero-fit-note">
            <ShieldCheck aria-hidden="true" size={20} />
            Built for multi-court facilities, clubs, and program operators.
          </p>
        </div>

        <HeroProductVisual />
      </div>

      <div className="site-shell platform-ribbon" id="platform" aria-label="FullCourtHQ platform areas">
        {platformAreas.map((area) => (
          <Link href="#product-tour" key={area.name}>
            <span className="platform-ribbon-check" aria-hidden="true">
              <Check size={15} strokeWidth={2.5} />
            </span>
            <span>
              <strong>{area.name}</strong>
              <small>{area.detail}</small>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function HeroProductVisual() {
  return (
    <div className="hero-product" aria-label="Real FullCourtHQ product screens for administrators, parents, and coaches">
      <figure className="hero-dashboard-frame">
        <figcaption>
          <span>Operations command center</span>
          <span>Real product view</span>
        </figcaption>
        <Image
          src="/product/fullcourthq-admin-dashboard.png"
          alt="FullCourtHQ administrator dashboard showing court status, today’s bookings, and weekly utilization"
          width={1280}
          height={720}
          sizes="(max-width: 860px) 94vw, 58vw"
          loading="eager"
        />
      </figure>

      <figure className="hero-phone hero-phone-parent">
        <figcaption>Parent portal</figcaption>
        <div className="hero-phone-screen">
          <Image
            src="/product/rdc-parent-dashboard.png"
            alt="Tenant-branded FullCourtHQ parent portal home screen with payment and upcoming game actions"
            width={780}
            height={1688}
            sizes="(max-width: 860px) 35vw, 15vw"
            loading="eager"
          />
        </div>
      </figure>

      <figure className="hero-phone hero-phone-coach">
        <figcaption>Coach portal</figcaption>
        <div className="hero-phone-screen">
          <Image
            src="/product/rdc-coach-results.png"
            alt="Tenant-branded FullCourtHQ coach portal showing an upcoming team event and availability actions"
            width={780}
            height={1688}
            sizes="(max-width: 860px) 35vw, 15vw"
            loading="eager"
          />
        </div>
      </figure>
    </div>
  );
}
