import {
  BarChart3,
  CalendarCheck2,
  ClipboardCheck,
  CreditCard,
  Network,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    title: "Smart Scheduling",
    body: "Easily manage schedules, bookings, courts, and resource availability.",
    icon: CalendarCheck2,
  },
  {
    title: "Facility Management",
    body: "Manage facilities, staff, and amenities from one centralized hub.",
    icon: Network,
  },
  {
    title: "Payments & Billing",
    body: "Streamline payments, automate invoicing, and reduce administrative work.",
    icon: CreditCard,
  },
  {
    title: "Programs & Rentals",
    body: "Configure bookable offerings, rental rules, and staff workflows from one place.",
    icon: ClipboardCheck,
  },
  {
    title: "Analytics & Reports",
    body: "Gain real-time insights and make data-driven decisions with powerful reports.",
    icon: BarChart3,
  },
  {
    title: "Waivers & Approvals",
    body: "Capture waiver acceptance and manage rental approvals with clear staff workflows.",
    icon: ShieldCheck,
  },
];

export function FeatureGrid() {
  return (
    <section className="feature-section" id="features">
      <div className="site-shell feature-layout">
        <div className="feature-intro">
          <p className="eyebrow">All-in-one platform</p>
          <h2>
            Everything you need.
            <br />
            All in one place.
          </h2>
          <p>
            From scheduling and facility management to payments and analytics, FullCourtHQ gives you the tools to run
            your organization smarter and more efficiently.
          </p>
        </div>

        <div className="feature-card-grid">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article className="feature-card" key={feature.title}>
                <span>
                  <Icon aria-hidden="true" size={22} />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
