export const contactEmail = "info@fullcourthq.com";

export const demoEmailHref = `mailto:${contactEmail}?subject=${encodeURIComponent(
  "FullCourtHQ Demo Request",
)}&body=${encodeURIComponent(
  [
    "Hi FullCourtHQ team,",
    "",
    "I would like to schedule a walkthrough.",
    "",
    "Organization:",
    "Location:",
    "Number of courts/facilities:",
    "What we want to streamline:",
  ].join("\n"),
)}`;
