import { Building2, CalendarRange, Layers3 } from "lucide-react";
import { DemoRequestForm } from "@/components/marketing/demo-request-form";

const pricingFactors = [
  { icon: Building2, text: "Number of facilities and courts" },
  { icon: Layers3, text: "Teams, programs, and operating scope" },
  { icon: CalendarRange, text: "Implementation and rollout needs" },
];

export function CTASection() {
  return (
    <section className="cta-section" id="demo" aria-labelledby="demo-heading">
      <div className="site-shell cta-grid">
        <div className="cta-copy">
          <p className="eyebrow eyebrow-gold">A walkthrough built around your operation</p>
          <h2 id="demo-heading">See how the whole system fits together.</h2>
          <p>
            Tell us how your facility or club runs today. We’ll center the conversation on the workflows that matter
            to your team—not a canned feature tour.
          </p>

          <div className="cta-pricing-note">
            <strong>Pricing is scoped to the operation.</strong>
            <p>
              FullCourtHQ is configured around your facilities, programs, teams, and rollout. We’ll explain the fit
              and pricing clearly during the walkthrough.
            </p>
            <ul>
              {pricingFactors.map((factor) => {
                const Icon = factor.icon;
                return (
                  <li key={factor.text}>
                    <Icon aria-hidden="true" size={19} />
                    {factor.text}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="cta-form-card">
          <p className="cta-form-kicker">Request a platform walkthrough</p>
          <h3>Start with a few useful details.</h3>
          <DemoRequestForm />
        </div>
      </div>
    </section>
  );
}
