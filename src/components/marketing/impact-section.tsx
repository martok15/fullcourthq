import Image from "next/image";
import { Clock3, HeartHandshake, TrendingUp } from "lucide-react";

const benefits = [
  {
    title: "Save Time",
    body: "Reduce manual work and keep daily operations moving.",
    icon: Clock3,
  },
  {
    title: "Increase Revenue",
    body: "Make availability clearer and payment workflows smoother.",
    icon: TrendingUp,
  },
  {
    title: "Improve Experience",
    body: "Give staff, members, teams, and customers a more connected journey.",
    icon: HeartHandshake,
  },
];

export function ImpactSection() {
  return (
    <section className="impact-section" id="about">
      <div className="court-pattern impact-pattern" aria-hidden="true" />
      <div className="site-shell impact-grid">
        <div className="impact-copy">
          <p className="eyebrow eyebrow-gold">Built for modern operations</p>
          <h2>
            More than software.
            <br />
            A partner in your growth.
          </h2>
          <p>
            FullCourtHQ is designed to help organizations streamline daily operations, improve experiences, and unlock
            their full potential.
          </p>
          <div className="benefit-grid">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article key={benefit.title}>
                  <Icon aria-hidden="true" size={21} />
                  <h3>{benefit.title}</h3>
                  <p>{benefit.body}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="impact-visual">
          <div className="impact-screenshot-card">
            <div className="impact-screenshot-toolbar">
              <span />
              <span />
              <span />
              <strong>Admin dashboard view</strong>
            </div>
            <Image
              src="/product/fullcourthq-admin-dashboard.png"
              alt="FullCourtHQ admin dashboard showing court status, bookings, utilization, and daily operations"
              width={1280}
              height={720}
            />
            <div className="impact-screenshot-notes" aria-label="App workflow highlights">
              <span>Operations dashboard</span>
              <span>Court status</span>
              <span>Utilization insights</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
