"use client";

import { ArrowRight, CircleAlert } from "lucide-react";
import { useState } from "react";

export function NewsletterConfirmForm({ token }: { token: string }) {
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");

    const response = await fetch("/api/newsletter/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    }).catch(() => null);

    if (!response) {
      setSubmitting(false);
      setStatus("We could not reach the server. Please try again in a minute.");
      return;
    }

    const result = (await response.json().catch(() => ({}))) as { redirectTo?: string; error?: string };
    if (result.redirectTo) {
      window.location.assign(result.redirectTo);
      return;
    }

    setSubmitting(false);
    setStatus(result.error ?? "We could not confirm that link just now.");
  }

  return (
    <form className="newsletter-form newsletter-form--compact" onSubmit={onSubmit}>
      <button className="btn btn--primary btn--lg newsletter-submit" type="submit" disabled={submitting}>
        {submitting ? "Confirming" : "Confirm updates"}
        <ArrowRight aria-hidden="true" size={18} />
      </button>
      {status ? (
        <p className="newsletter-status" role="status">
          <CircleAlert aria-hidden="true" size={16} />
          {status}
        </p>
      ) : null}
    </form>
  );
}
