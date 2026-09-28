import { Check } from "lucide-react";
import { DemoRequestForm } from "@/components/marketing/demo-request-form";

const expectations = [
  "Built around your courts, programs, and teams, not a canned demo",
  "A clear price for your operation",
  "A realistic rollout plan for your season",
];

export function CTASection() {
  return (
    <section className="cta" id="demo" aria-labelledby="demo-heading">
      <div className="cta__glow" aria-hidden="true" />
      <div className="site-shell cta__grid">
        <div className="cta__copy">
          <p className="kicker kicker--gold" data-reveal>
            Book a walkthrough
          </p>
          <h2 id="demo-heading" data-reveal>
            See it running on your schedule.
          </h2>
          <p data-reveal>
            Tell us how your facility or club runs today. We’ll show you how FullCourtHQ fills your courts, collects
            your dues, and keeps your families in the loop.
          </p>
          <ul data-reveal>
            {expectations.map((item) => (
              <li key={item}>
                <Check aria-hidden="true" size={16} strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="cta__card" data-reveal>
          <h3>Request a walkthrough</h3>
          <DemoRequestForm />
        </div>
      </div>
    </section>
  );
}
