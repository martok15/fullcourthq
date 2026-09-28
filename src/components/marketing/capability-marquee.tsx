const capabilities = [
  "Court booking",
  "Programs & clinics",
  "Club teams",
  "Recurring dues",
  "Card & ACH payments",
  "Waivers",
  "Team messaging",
  "Tournaments",
  "Parent & coach apps",
  "Share the weekend",
  "Calendar sync",
  "Your club’s branding",
];

export function CapabilityMarquee() {
  return (
    <section className="marquee" aria-label="What FullCourtHQ covers">
      <p className="marquee__label">One platform for</p>
      <div className="marquee__viewport">
        <div className="marquee__track">
          <ul>
            {capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {/* A second copy makes the loop seamless; screen readers get the list once. */}
          <ul aria-hidden="true">
            {capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
