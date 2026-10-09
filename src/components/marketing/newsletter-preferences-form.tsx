"use client";

import { CheckCircle2, Save } from "lucide-react";
import { useState } from "react";
import { newsletterAudienceLabels } from "@/lib/newsletter-common";
import type { NewsletterPreference } from "@/lib/newsletter-common";

const options: NewsletterPreference[] = ["parent", "staff", "both", "none"];

export function NewsletterPreferencesForm({ token }: { token: string }) {
  const [audience, setAudience] = useState<NewsletterPreference>("both");
  const [status, setStatus] = useState("");
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setSaved(false);
    setStatus("");

    const response = await fetch("/api/newsletter/preferences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, audience }),
    }).catch(() => null);

    setSubmitting(false);
    if (!response) {
      setStatus("We could not reach the server. Please try again in a minute.");
      return;
    }

    const result = (await response.json().catch(() => ({}))) as { message?: string; error?: string };
    if (!response.ok) {
      setStatus(result.error ?? "We could not update those preferences just now.");
      return;
    }

    setSaved(true);
    setStatus(result.message ?? "Your FullCourtHQ update preferences have been saved.");
  }

  return (
    <form className="newsletter-form newsletter-form--compact" onSubmit={onSubmit}>
      <fieldset className="newsletter-audiences">
        <legend>Updates I want now</legend>
        {options.map((option) => (
          <label className="newsletter-choice" data-checked={audience === option} key={option}>
            <input
              type="radio"
              name="audience"
              value={option}
              checked={audience === option}
              onChange={() => setAudience(option)}
            />
            <span>
              <strong>{newsletterAudienceLabels[option]}</strong>
            </span>
          </label>
        ))}
      </fieldset>

      <button className="btn btn--primary btn--lg newsletter-submit" type="submit" disabled={submitting}>
        {submitting ? "Saving" : "Save preferences"}
        {saved ? <CheckCircle2 aria-hidden="true" size={18} /> : <Save aria-hidden="true" size={18} />}
      </button>

      {status ? (
        <p className={saved ? "newsletter-status newsletter-status--success" : "newsletter-status"} role="status">
          {status}
        </p>
      ) : null}
    </form>
  );
}
