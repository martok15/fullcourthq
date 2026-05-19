import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Sparkles, TrendingUp, UsersRound } from "lucide-react";
import { demoEmailHref } from "@/lib/contact";

const valuePoints = [
  { label: "Simplify Operations", icon: Sparkles },
  { label: "Empower People", icon: UsersRound },
  { label: "Gain Insights", icon: BarChart3 },
  { label: "Drive Growth", icon: TrendingUp },
];

export function Hero() {
  return (
    <section className="hero-section">
      <div className="court-pattern" aria-hidden="true" />
      <div className="site-shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-gold">Built for modern operations</p>
          <h1>
            Operate.
            <br />
            Manage.
            <br />
            <span>Grow.</span>
          </h1>
          <p>
            The all-in-one platform that simplifies operations, empowers people, and helps organizations grow.
          </p>
          <div className="hero-actions">
            <a href={demoEmailHref} className="button button-gold hero-primary">
              Book a Demo
              <ArrowRight aria-hidden="true" size={18} />
            </a>
            <Link href="#features" className="button button-ghost">
              See How It Works
            </Link>
          </div>
          <div className="hero-values" aria-label="Platform value points">
            {valuePoints.map((point) => {
              const Icon = point.icon;
              return (
                <span key={point.label}>
                  <Icon aria-hidden="true" size={17} />
                  {point.label}
                </span>
              );
            })}
          </div>
        </div>
        <HeroProductMockup />
      </div>
    </section>
  );
}

function HeroProductMockup() {
  return (
    <div className="hero-product" aria-label="FullCourtHQ app screenshots">
      <div className="laptop-shell">
        <div className="laptop-toolbar">
          <span />
          <span />
          <span />
          <strong>Live product screen</strong>
        </div>
        <div className="screenshot-frame desktop-screenshot-frame">
          <Image
            src="/product/fullcourthq-calendar-desktop.png"
            alt="FullCourtHQ public calendar screen showing facilities, courts, availability, and day controls"
            width={1280}
            height={720}
            priority
          />
        </div>
      </div>

      <div className="mobile-shell">
        <div className="mobile-notch" />
        <div className="screenshot-frame mobile-screenshot-frame">
          <Image
            src="/product/fullcourthq-booking-mobile.png"
            alt="Mobile FullCourtHQ booking screen with selected facility time, renter details, and checkout action"
            width={390}
            height={740}
            priority
          />
        </div>
      </div>
    </div>
  );
}
