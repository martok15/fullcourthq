import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/marketing/footer";
import { Header } from "@/components/marketing/header";
import { NewsletterSignupForm } from "@/components/marketing/newsletter-signup-form";
import "../home.css";
import "./updates.css";

export const metadata: Metadata = {
  title: "FullCourtHQ Updates",
  description: "Choose parent updates, coach and staff updates, or both from FullCourtHQ.",
  alternates: {
    canonical: "/updates",
  },
};

export default function UpdatesPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header />
      <main className="newsletter-page" id="main-content">
        <section className="newsletter-hero" aria-labelledby="newsletter-title">
          <div className="site-shell newsletter-hero__grid">
            <div className="newsletter-hero__copy">
              <p className="kicker">Email updates</p>
              <h1 id="newsletter-title">Choose FullCourtHQ updates</h1>
              <p>
                Get the product notes that match your role. We will send a confirmation email first, then add your
                address only after you confirm.
              </p>
              <div className="newsletter-proof">
                <ShieldCheck aria-hidden="true" size={18} />
                <span>No newsletter enrollment until confirmed. Unsubscribe or change topics later.</span>
              </div>
            </div>

            <div className="newsletter-panel" aria-label="FullCourtHQ updates signup">
              <NewsletterSignupForm />
            </div>
          </div>
        </section>

        <section className="newsletter-notes" aria-label="How FullCourtHQ email updates work">
          <div className="site-shell newsletter-notes__grid">
            <div>
              <h2>What you can choose</h2>
              <p>
                Parent updates cover family app improvements, registration, schedules, billing, and communications.
                Coach and staff updates cover operations, reporting, programs, teams, and facility workflows.
              </p>
            </div>
            <Link className="text-link" href="/privacy">
              Read privacy details
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
