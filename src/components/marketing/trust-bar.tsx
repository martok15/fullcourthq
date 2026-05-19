import { Building2, GraduationCap, Handshake, Landmark, ShieldCheck, Trophy } from "lucide-react";

const categories = [
  { label: "Sports Complexes", icon: Building2 },
  { label: "Colleges & Universities", icon: GraduationCap },
  { label: "Youth Organizations", icon: ShieldCheck },
  { label: "Recreation Centers", icon: Landmark },
  { label: "Leagues & Associations", icon: Trophy },
  { label: "Private Facilities", icon: Handshake },
];

export function TrustBar() {
  return (
    <section className="trust-bar" id="solutions">
      <div className="site-shell">
        <p>Designed for organizations of all types</p>
        <div className="trust-grid">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div className="trust-item" key={category.label}>
                <Icon aria-hidden="true" size={19} />
                <span>{category.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
