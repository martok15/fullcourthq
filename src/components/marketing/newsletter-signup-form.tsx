"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { newsletterAudienceLabels, newsletterAudiences } from "@/lib/newsletter-common";
import type { NewsletterAudience } from "@/lib/newsletter-common";
import type { NewsletterSignupErrors } from "@/lib/newsletter";

const audienceCopy: Record<NewsletterAudience, string> = {
  parent: "Family app, registration, schedule, and billing updates.",
  staff: "Facility operations, coaching tools, reporting, and admin updates.",
  both: "Everything FullCourtHQ sends for families and organizations.",
};

export function NewsletterSignupForm() {
  const [audience, setAudience] = useState<NewsletterAudience>("parent");
  const [errors, setErrors] = useState<NewsletterSignupErrors>({});
  const [status, setStatus] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");
    setErrors({});

    const form = event.currentTarget;
    const data = new FormData(form);
    const response = await fetch("/api/newsletter/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.get("email"),
        name: data.get("name"),
        audience,
        consent: data.get("consent") === "on",
        company_website: data.get("company_website"),
      }),
    }).catch(() => null);

    setSubmitting(false);
    if (!response) {
      setStatus("We could not reach the server. Please try again in a minute.");
      return;
    }

    const result = (await response.json().catch(() => ({}))) as {
      message?: string;
      error?: string;
      errors?: NewsletterSignupErrors;
    };

    if (!response.ok) {
      setErrors(result.errors ?? {});
      setStatus(result.error ?? "A few details still need your attention.");
      return;
    }

    form.reset();
    setAudience("parent");
    setSucceeded(true);
    setStatus(result.message ?? "Check your email for a confirmation link.");
  }

  return (
    <form className="newsletter-form" onSubmit={onSubmit} noValidate>
      <div aria-hidden="true" className="newsletter-hp">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="newsletter-field">
        <label htmlFor="newsletter-email">Email</label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "newsletter-email-error" : undefined}
          required
        />
        {errors.email ? (
          <p className="newsletter-error" id="newsletter-email-error">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="newsletter-field">
        <label htmlFor="newsletter-name">Name, optional</label>
        <input id="newsletter-name" name="name" type="text" autoComplete="name" placeholder="Your name" />
        {errors.name ? <p className="newsletter-error">{errors.name}</p> : null}
      </div>

      <fieldset className="newsletter-audiences">
        <legend>Updates I want</legend>
        {newsletterAudiences.map((option) => (
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
              <small>{audienceCopy[option]}</small>
            </span>
          </label>
        ))}
      </fieldset>

      <label className="newsletter-consent">
        <input name="consent" type="checkbox" required aria-invalid={Boolean(errors.consent)} />
        <span>
          I agree to receive FullCourtHQ and KC Business Lab email updates for the audience I selected. I understand I
          can unsubscribe later.
        </span>
      </label>
      {errors.consent ? <p className="newsletter-error">{errors.consent}</p> : null}

      <button className="btn btn--primary btn--lg newsletter-submit" type="submit" disabled={submitting || succeeded}>
        {succeeded ? "Confirmation sent" : submitting ? "Sending" : "Send confirmation"}
        {succeeded ? <CheckCircle2 aria-hidden="true" size={18} /> : <ArrowRight aria-hidden="true" size={18} />}
      </button>

      {status ? (
        <p className={succeeded ? "newsletter-status newsletter-status--success" : "newsletter-status"} role="status">
          {status}
        </p>
      ) : null}
    </form>
  );
}
