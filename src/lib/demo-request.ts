// Shared by the walkthrough form and /api/demo-request so both enforce the same rules.

export const focusOptions = [
  "Facility scheduling",
  "Programs and registration",
  "Club and team operations",
  "Billing and payments",
  "Parent and coach experience",
] as const;

export const organizationTypes = [
  "Sports facility with club programs",
  "Multi-court facility",
  "Youth sports club",
  "Training academy",
  "Tournament or event operator",
  "Other sports organization",
] as const;

export type DemoRequest = {
  name: string;
  email: string;
  organization: string;
  role: string;
  organizationType: string;
  focus: string[];
  message: string;
};

export type DemoRequestErrors = Partial<Record<keyof DemoRequest, string>>;

const limits = { name: 120, email: 254, organization: 160, role: 120, message: 4000 };

export function validateDemoRequest(values: DemoRequest): DemoRequestErrors {
  const errors: DemoRequestErrors = {};

  if (!values.name.trim()) errors.name = "Add your name.";
  if (!values.email.trim()) {
    errors.email = "Add your work email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Use a complete email address.";
  }
  if (!values.organization.trim()) errors.organization = "Add your organization.";
  if (!organizationTypes.includes(values.organizationType as (typeof organizationTypes)[number])) {
    errors.organizationType = "Choose the closest organization type.";
  }
  if (values.focus.length === 0) errors.focus = "Choose at least one area to explore.";

  for (const field of Object.keys(limits) as Array<keyof typeof limits>) {
    if (!errors[field] && values[field].length > limits[field]) errors[field] = "That’s a bit long. Please shorten it.";
  }

  return errors;
}

/** Coerces an untrusted JSON body into a DemoRequest, dropping anything unexpected. */
export function parseDemoRequest(body: unknown): DemoRequest {
  const input = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");
  const focus = Array.isArray(input.focus)
    ? focusOptions.filter((option) => (input.focus as unknown[]).includes(option))
    : [];

  return {
    name: text(input.name),
    email: text(input.email).toLowerCase(),
    organization: text(input.organization),
    role: text(input.role),
    organizationType: text(input.organizationType),
    focus,
    message: text(input.message),
  };
}
