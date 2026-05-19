import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, MessageSquareText } from "lucide-react";
import { contactEmail, demoEmailHref } from "@/lib/contact";

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
            <a href={demoEmailHref} className="button button-gold">
              Book a Demo
              <ArrowRight aria-hidden="true" size={18} />
            </a>
            <Link href="#pricing" className="button button-ghost">
              See Pricing
            </Link>
          </div>
        </div>
        <div className="cta-contact-card">
          <p className="form-kicker">Request a walkthrough</p>
          <div className="contact-card-body">
            <div className="contact-icon" aria-hidden="true">
              <Mail size={24} />
            </div>
            <h3>Tell us what you’re building.</h3>
            <p>
              Send a quick note with your organization, location, number of courts or facilities, and the
              operations you want to streamline.
            </p>
            <a className="contact-email-link" href={demoEmailHref}>
              {contactEmail}
              <ArrowRight aria-hidden="true" size={18} />
            </a>
            <div className="contact-prompts" aria-label="Suggested email details">
              <span>
                <MapPin aria-hidden="true" size={17} />
                Organization and location
              </span>
              <span>
                <MessageSquareText aria-hidden="true" size={17} />
                Scheduling, payments, rentals, reporting
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
