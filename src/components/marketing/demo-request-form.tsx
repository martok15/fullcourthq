"use client";

import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { contactEmail } from "@/lib/contact";

const focusOptions = [
  "Facility scheduling",
  "Programs and registration",
  "Club and team operations",
  "Billing and payments",
  "Parent and coach experience",
];

type FormValues = {
  name: string;
  email: string;
  organization: string;
  role: string;
  organizationType: string;
  focus: string[];
  message: string;
};

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};
    if (!values.name.trim()) nextErrors.name = "Add your name.";
    if (!values.email.trim()) {
      nextErrors.email = "Add your work email.";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      nextErrors.email = "Use a complete email address.";
    }
    if (!values.organization.trim()) nextErrors.organization = "Add your organization.";
    if (!values.organizationType) nextErrors.organizationType = "Choose the closest organization type.";
    if (values.focus.length === 0) nextErrors.focus = "Choose at least one area to explore.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("A few details still need your attention.");
      return;
    }

    const subject = encodeURIComponent(`FullCourtHQ walkthrough — ${values.organization}`);
    const body = encodeURIComponent(
      [
        "Hi FullCourtHQ team,",
        "",
        "I’d like to schedule a platform walkthrough.",
        "",
        `Name: ${values.name}`,
        `Work email: ${values.email}`,
        `Organization: ${values.organization}`,
        `Role: ${values.role || "Not provided"}`,
        `Organization type: ${values.organizationType}`,
        `Areas to explore: ${values.focus.join(", ")}`,
        `Additional context: ${values.message || "None provided"}`,
      ].join("\n"),
    );

    setStatus("Opening your email app with the request filled in. Review it, then press send.");
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="demo-form" onSubmit={handleSubmit} noValidate>
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

        <Field label="Your role (optional)" htmlFor="demo-role">
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
            <option>Sports facility with club programs</option>
            <option>Multi-court facility</option>
            <option>Youth sports club</option>
            <option>Training academy</option>
            <option>Tournament or event operator</option>
            <option>Other sports organization</option>
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

      <Field label="Anything we should know? (optional)" htmlFor="demo-message" wide>
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
        <button className="button button-gold" type="submit">
          Build my walkthrough request
          <ArrowRight aria-hidden="true" size={18} />
        </button>
        <p>
          This opens a pre-filled email for you to review and send. Nothing is submitted automatically.
        </p>
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
