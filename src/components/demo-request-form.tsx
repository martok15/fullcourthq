"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

type DemoResponse = {
  ok: boolean;
  message?: string;
};

export function DemoRequestForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const payload = (await response.json()) as DemoResponse;

      if (!response.ok || !payload.ok) {
        setState("error");
        setMessage(payload.message ?? "We could not send that request. Please try again.");
        return;
      }

      form.reset();
      setState("success");
      setMessage("Thanks. Your demo request is in, and we will follow up soon.");
    } catch {
      setState("error");
      setMessage("We could not send that request. Please try again.");
    }
  }

  return (
    <form className="demo-form" onSubmit={handleSubmit}>
      <input aria-hidden="true" className="hidden-field" name="company_website" tabIndex={-1} autoComplete="off" />

      <div className="form-row">
        <label>
          Name
          <input name="name" type="text" autoComplete="name" minLength={2} maxLength={120} required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" maxLength={160} required />
        </label>
      </div>

      <div className="form-row">
        <label>
          Phone
          <input name="phone" type="tel" autoComplete="tel" maxLength={40} />
        </label>
        <label>
          Facility name
          <input name="organization" type="text" autoComplete="organization" maxLength={160} required />
        </label>
      </div>

      <div className="form-row">
        <label>
          Website
          <input name="website" type="url" inputMode="url" placeholder="https://" maxLength={220} />
        </label>
        <label>
          City / state
          <input name="location" type="text" autoComplete="address-level2" maxLength={120} />
        </label>
      </div>

      <label>
        Number of courts
        <input name="courtCount" type="number" min={1} max={200} inputMode="numeric" />
      </label>

      <label>
        What should we look at together?
        <textarea
          name="notes"
          rows={5}
          maxLength={1200}
          placeholder="Scheduling, rentals, memberships, waivers, payments, multiple facilities..."
          required
        />
      </label>

      <button className="button button-form" type="submit" disabled={state === "submitting"}>
        {state === "submitting" ? (
          <>
            <Loader2 aria-hidden="true" className="spin" size={18} />
            Sending
          </>
        ) : state === "success" ? (
          <>
            <CheckCircle2 aria-hidden="true" size={18} />
            Request sent
          </>
        ) : (
          <>
            Send demo request
            <ArrowRight aria-hidden="true" size={18} />
          </>
        )}
      </button>

      {message ? (
        <p className={state === "error" ? "form-message form-message-error" : "form-message"} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
