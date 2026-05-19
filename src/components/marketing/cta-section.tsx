import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DemoRequestForm } from "@/components/demo-request-form";

export function CTASection() {
  return (
    <section className="cta-section" id="demo">
      <span className="section-anchor" id="pricing" aria-hidden="true" />
      <div className="site-shell cta-grid">
        <div className="cta-copy">
          <Image src="/brand/fullcourthq-rounded-icon.png" alt="" width={76} height={76} />
          <p className="eyebrow eyebrow-gold">Operate. Manage. Grow.</p>
          <h2>Ready to take your operations to the next level?</h2>
          <p>Join organizations already saving time, increasing revenue, and growing their impact.</p>
          <div className="cta-actions">
            <Link href="#demo-form" className="button button-gold">
              Book a Demo
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link href="#pricing" className="button button-ghost">
              See Pricing
            </Link>
          </div>
        </div>
        <div className="cta-form-card" id="demo-form">
          <p className="form-kicker">Request a walkthrough</p>
          <DemoRequestForm />
        </div>
      </div>
    </section>
  );
}
