export const newsletterAudiences = ["parent", "staff", "both"] as const;
export type NewsletterAudience = (typeof newsletterAudiences)[number];
export type NewsletterPreference = NewsletterAudience | "none";

export const newsletterAudienceLabels: Record<NewsletterPreference, string> = {
  parent: "Parent updates",
  staff: "Coach and staff updates",
  both: "Parent plus coach and staff updates",
  none: "No newsletter updates",
};
