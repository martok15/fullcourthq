"use client";

import { CircleAlert, XCircle } from "lucide-react";
import { useState } from "react";

export function NewsletterUnsubscribeForm({ token }: { token: string }) {
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");

    const response = await fetch("/api/newsletter/unsubscribe", {
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
    setStatus(result.error ?? "We could not unsubscribe that address just now.");
  }

  return (
    <form className="newsletter-form newsletter-form--compact" onSubmit={onSubmit}>
      <button className="btn btn--primary btn--lg newsletter-submit" type="submit" disabled={submitting}>
        {submitting ? "Unsubscribing" : "Unsubscribe from updates"}
        <XCircle aria-hidden="true" size={18} />
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
