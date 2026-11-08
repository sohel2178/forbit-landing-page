import { contactConfig } from "@/config/contact";
import type { ServiceValue } from "@/types";

export const contactFields = [
  "name",
  "company",
  "email",
  "phone",
  "service",
  "details",
] as const;

export type ContactField = (typeof contactFields)[number];

export interface ContactPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: ServiceValue | "";
  details: string;
}

/** Language-neutral error codes; the UI maps them to translated messages. */
export type ContactErrorCode = "required" | "tooShort" | "tooLong" | "invalid";

export type ContactErrors = Partial<Record<ContactField, ContactErrorCode>>;

export type ContactValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; errors: ContactErrors };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;

const LIMITS = {
  name: 120,
  company: 160,
  email: 254,
  phone: 20,
  details: 5000,
} as const;

const serviceValues = new Set<string>(contactConfig.serviceValues);

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Validates contact form input. Shared by the client form (instant feedback)
 * and the API route (authoritative check).
 */
export function validateContact(input: unknown): ContactValidationResult {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;

  const data: ContactPayload = {
    name: str(raw.name),
    company: str(raw.company),
    email: str(raw.email),
    phone: str(raw.phone),
    service: str(raw.service) as ServiceValue | "",
    details: str(raw.details),
  };

  const errors: ContactErrors = {};

  if (!data.name) errors.name = "required";
  else if (data.name.length < 2) errors.name = "tooShort";
  else if (data.name.length > LIMITS.name) errors.name = "tooLong";

  if (data.company.length > LIMITS.company) errors.company = "tooLong";

  if (!data.email) errors.email = "required";
  else if (data.email.length > LIMITS.email || !EMAIL_RE.test(data.email)) errors.email = "invalid";

  if (data.phone && !PHONE_RE.test(data.phone)) errors.phone = "invalid";

  if (!data.service) errors.service = "required";
  else if (!serviceValues.has(data.service)) errors.service = "invalid";

  if (!data.details) errors.details = "required";
  else if (data.details.length < 20) errors.details = "tooShort";
  else if (data.details.length > LIMITS.details) errors.details = "tooLong";

  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, data };
}

export const contactLimits = LIMITS;
