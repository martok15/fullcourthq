"use client";

import { ArrowRight, CircleCheck, LoaderCircle, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { contactEmail } from "@/lib/contact";
import { focusOptions, organizationTypes, validateDemoRequest } from "@/lib/demo-request";
import type { DemoRequest, DemoRequestErrors } from "@/lib/demo-request";

type FormValues = DemoRequest;

const initialValues: FormValues = {
  name: "",
  email: "",
  organization: "",
  role: "",
  organizationType: "",
  focus: [],
  message: "",
};

export function DemoRequestForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<DemoRequestErrors>({});
  const [status, setStatus] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Move focus to the confirmation so screen reader and keyboard users land on it.
  useEffect(() => {
    if (state === "sent") successRef.current?.focus();
  }, [state]);

  function updateField(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  }

  function toggleFocus(option: string) {
    setValues((current) => ({
      ...current,
      focus: current.focus.includes(option)
        ? current.focus.filter((item) => item !== option)
        : [...current.focus, option],
    }));
    setErrors((current) => ({ ...current, focus: "" }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const nextErrors = validateDemoRequest(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("A few details still need your attention.");
      return;
    }

    setState("sending");
    setStatus("Sending your request…");

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company_website: honeypotRef.current?.value ?? "" }),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string; errors?: DemoRequestErrors };

      if (!response.ok) {
        setErrors(result.errors ?? {});
        setStatus(result.error ?? `We couldn’t send your request just now. Please email ${contactEmail}.`);
        setState("idle");
        return;
      }

      setStatus("");
      setState("sent");
    } catch {
      setStatus(`We couldn’t reach our server. Check your connection, or email ${contactEmail}.`);
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <div className="demo-form-success" ref={successRef} tabIndex={-1} role="status">
        <CircleCheck aria-hidden="true" size={40} />
        <h4>Thanks, {values.name.split(/\s+/)[0]}. Your request is in.</h4>
        <p>
          We’ll reply to <strong>{values.email}</strong> to set up a time that works for you.
        </p>
      </div>
    );
  }

  return (
    <form className="demo-form" onSubmit={handleSubmit} noValidate aria-busy={state === "sending"}>
      <div className="demo-form-trap" aria-hidden="true">
        <label htmlFor="demo-company-website">Leave this field empty</label>
        <input ref={honeypotRef} id="demo-company-website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="demo-form-grid">
        <Field label="Name" error={errors.name} htmlFor="demo-name">
          <input
            id="demo-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "demo-name-error" : undefined}
          />
        </Field>

        <Field label="Work email" error={errors.email} htmlFor="demo-email">
          <input
            id="demo-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "demo-email-error" : undefined}
          />
        </Field>

        <Field label="Organization" error={errors.organization} htmlFor="demo-organization">
          <input
            id="demo-organization"
            name="organization"
            autoComplete="organization"
            value={values.organization}
            onChange={(event) => updateField("organization", event.target.value)}
            aria-invalid={Boolean(errors.organization)}
            aria-describedby={errors.organization ? "demo-organization-error" : undefined}
          />
        </Field>

        <Field label="Your role (optional)" error={errors.role} htmlFor="demo-role">
          <input
            id="demo-role"
            name="role"
            autoComplete="organization-title"
            value={values.role}
            onChange={(event) => updateField("role", event.target.value)}
          />
        </Field>

        <Field
          label="Organization type"
          error={errors.organizationType}
          htmlFor="demo-organization-type"
          wide
        >
          <select
            id="demo-organization-type"
            name="organizationType"
            value={values.organizationType}
            onChange={(event) => updateField("organizationType", event.target.value)}
            aria-invalid={Boolean(errors.organizationType)}
            aria-describedby={errors.organizationType ? "demo-organization-type-error" : undefined}
          >
            <option value="">Select one</option>
            {organizationTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset className="demo-form-focus" aria-describedby={errors.focus ? "demo-focus-error" : undefined}>
        <legend>What would you like to explore?</legend>
        <div className="demo-form-checks">
          {focusOptions.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                name="focus"
                value={option}
                checked={values.focus.includes(option)}
                onChange={() => toggleFocus(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.focus ? (
          <p className="demo-form-error" id="demo-focus-error">
            {errors.focus}
          </p>
        ) : null}
      </fieldset>

      <Field label="Anything we should know? (optional)" error={errors.message} htmlFor="demo-message" wide>
        <textarea
          id="demo-message"
          name="message"
          rows={4}
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Tell us about your locations, courts, teams, or current tools."
        />
      </Field>

      <div className="demo-form-submit-row">
        <button className="btn btn--gold" type="submit" disabled={state === "sending"}>
          {state === "sending" ? (
            <>
              <LoaderCircle className="demo-form-spinner" aria-hidden="true" size={18} />
              Sending…
            </>
          ) : (
            <>
              Send walkthrough request
              <ArrowRight aria-hidden="true" size={18} />
            </>
          )}
        </button>
      </div>

      <p className="demo-form-status" aria-live="polite">
        {status}
      </p>
      <a className="demo-form-fallback" href={`mailto:${contactEmail}`}>
        <Mail aria-hidden="true" size={17} />
        Or email {contactEmail}
      </a>
    </form>
  );
}

function Field({
  label,
  error,
  htmlFor,
  wide = false,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`demo-form-field${wide ? " demo-form-field--wide" : ""}`}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {error ? (
        <p className="demo-form-error" id={`${htmlFor}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
