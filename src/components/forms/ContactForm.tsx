"use client";

import { AlertCircle, CheckCircle2, Info, Loader2, Send } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";

import { contactConfig, SELECT_SERVICE_EVENT } from "@/config/contact";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import {
  contactFields,
  contactLimits,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactPayload,
} from "@/lib/contact-validation";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ServiceValue } from "@/types";

type ContactDict = Dictionary["contact"];

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "notice" | "error"; message: string };

const EMPTY: ContactPayload = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  details: "",
};

const fieldControl =
  "h-11 rounded-md border-fg/10 bg-fg/[0.03] px-3.5 text-[0.95rem] text-fg placeholder:text-fg/30 hover:border-fg/20 focus-visible:border-brand focus-visible:ring-brand/25 md:text-sm dark:bg-fg/[0.03]";

interface ContactFormProps {
  locale: Locale;
  form: ContactDict["form"];
  errors: ContactDict["errors"];
  services: ContactDict["services"];
}

export function ContactForm({ locale, form, errors: errorText, services }: ContactFormProps) {
  const uid = useId();
  const id = (f: ContactField) => `${uid}-${f}`;
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const selectItems = contactConfig.serviceValues.map((value) => ({
    value,
    label: services[value],
  }));

  const [values, setValues] = useState<ContactPayload>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [honeypot, setHoneypot] = useState("");

  /** Translated message for a field's error code. */
  const message = (field: ContactField): string | undefined => {
    const code = errors[field];
    if (!code) return undefined;
    const map = errorText[field] as Partial<Record<string, string>>;
    return map[code] ?? map.invalid ?? form.invalid;
  };

  // "Explore service" links elsewhere on the page pre-select a service.
  useEffect(() => {
    const onSelect = (e: Event) => {
      const value = (e as CustomEvent<ServiceValue>).detail;
      if (!contactConfig.serviceValues.includes(value)) return;
      setValues((v) => ({ ...v, service: value }));
      setErrors((er) => ({ ...er, service: undefined }));
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  const revalidate = (next: ContactPayload, field: ContactField) => {
    const result = validateContact(next);
    const code = result.ok ? undefined : result.errors[field];
    setErrors((er) => ({ ...er, [field]: code }));
  };

  const update = (field: ContactField, value: string) => {
    const next = { ...values, [field]: value } as ContactPayload;
    setValues(next);
    if (touched[field] || errors[field]) revalidate(next, field);
    if (status.kind !== "idle" && status.kind !== "submitting") setStatus({ kind: "idle" });
  };

  const blur = (field: ContactField) => {
    setTouched((t) => ({ ...t, [field]: true }));
    revalidate(values, field);
  };

  const focusFirstError = (errs: ContactErrors) => {
    const first = contactFields.find((f) => errs[f]);
    if (!first) return;
    formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(first))}`)?.focus();
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;

    const result = validateContact(values);
    if (!result.ok) {
      setErrors(result.errors);
      setTouched(Object.fromEntries(contactFields.map((f) => [f, true])));
      focusFirstError(result.errors);
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch(contactConfig.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forbit-locale": locale },
        body: JSON.stringify({ ...result.data, website: honeypot }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: boolean; code?: string; errors?: ContactErrors }
        | null;

      if (res.ok && data?.ok) {
        setStatus({ kind: "success" });
        setValues(EMPTY);
        setTouched({});
        setErrors({});
      } else if (data?.code === "invalid" && data.errors) {
        setErrors(data.errors);
        setStatus({ kind: "error", message: form.invalid });
        focusFirstError(data.errors);
      } else if (data?.code === "not_configured") {
        setStatus({ kind: "notice", message: form.notConfigured });
      } else {
        setStatus({ kind: "error", message: form.failed });
      }
    } catch {
      setStatus({ kind: "error", message: form.network });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const submitting = status.kind === "submitting";

  const describedBy = (f: ContactField, hint?: boolean) =>
    cn(errors[f] && `${id(f)}-error`, hint && `${id(f)}-hint`) || undefined;

  const fieldError = (field: ContactField) => {
    const text = message(field);
    return text ? (
      <p id={`${id(field)}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs text-destructive">
        <AlertCircle className="size-3.5 shrink-0" aria-hidden />
        {text}
      </p>
    ) : null;
  };

  const labelCls = "mb-2 text-[0.8rem] font-medium text-fg/80";
  const req = (
    <span className="text-brand-fg" aria-hidden>
      *
    </span>
  );
  const optional = <span className="text-fg/35">{form.optional}</span>;

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-describedby={`${uid}-required-note`}
      className="relative"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={id("name")} className={labelCls}>
            {form.labels.name} {req}
          </Label>
          <Input
            id={id("name")}
            name="name"
            autoComplete="name"
            required
            maxLength={contactLimits.name}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => blur("name")}
            aria-invalid={!!errors.name || undefined}
            aria-describedby={describedBy("name")}
            className={fieldControl}
            placeholder={form.placeholders.name}
          />
          {fieldError("name")}
        </div>

        <div>
          <Label htmlFor={id("company")} className={labelCls}>
            {form.labels.company} {optional}
          </Label>
          <Input
            id={id("company")}
            name="company"
            autoComplete="organization"
            maxLength={contactLimits.company}
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            onBlur={() => blur("company")}
            aria-invalid={!!errors.company || undefined}
            aria-describedby={describedBy("company")}
            className={fieldControl}
            placeholder={form.placeholders.company}
          />
          {fieldError("company")}
        </div>

        <div>
          <Label htmlFor={id("email")} className={labelCls}>
            {form.labels.email} {req}
          </Label>
          <Input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={contactLimits.email}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => blur("email")}
            aria-invalid={!!errors.email || undefined}
            aria-describedby={describedBy("email")}
            className={fieldControl}
            placeholder={form.placeholders.email}
          />
          {fieldError("email")}
        </div>

        <div>
          <Label htmlFor={id("phone")} className={labelCls}>
            {form.labels.phone} {optional}
          </Label>
          <Input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={contactLimits.phone}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => blur("phone")}
            aria-invalid={!!errors.phone || undefined}
            aria-describedby={describedBy("phone", true)}
            className={fieldControl}
            placeholder={form.placeholders.phone}
          />
          <p id={`${id("phone")}-hint`} className="sr-only">
            {form.phoneHint}
          </p>
          {fieldError("phone")}
        </div>

        <div className="sm:col-span-2">
          <Label id={`${id("service")}-label`} htmlFor={id("service")} className={labelCls}>
            {form.labels.service} {req}
          </Label>
          <Select
            items={selectItems}
            value={values.service || null}
            onValueChange={(v) => {
              const next = { ...values, service: (v ?? "") as ContactPayload["service"] };
              setValues(next);
              setTouched((t) => ({ ...t, service: true }));
              revalidate(next, "service");
            }}
            name="service"
          >
            <SelectTrigger
              id={id("service")}
              aria-labelledby={`${id("service")}-label`}
              aria-invalid={!!errors.service || undefined}
              aria-describedby={describedBy("service")}
              className={cn(fieldControl, "w-full justify-between data-[size=default]:h-11")}
            >
              <SelectValue placeholder={form.placeholders.service} />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false} className="border border-fg/10 bg-surface">
              {selectItems.map((item) => (
                <SelectItem key={item.value} value={item.value} className="py-2 text-sm">
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldError("service")}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor={id("details")} className={labelCls}>
            {form.labels.details} {req}
          </Label>
          <Textarea
            id={id("details")}
            name="details"
            required
            rows={5}
            maxLength={contactLimits.details}
            value={values.details}
            onChange={(e) => update("details", e.target.value)}
            onBlur={() => blur("details")}
            aria-invalid={!!errors.details || undefined}
            aria-describedby={describedBy("details")}
            className={cn(fieldControl, "h-auto min-h-36 py-3 leading-relaxed")}
            placeholder={form.placeholders.details}
          />
          {fieldError("details")}
        </div>

        {/* Honeypot — hidden from people and assistive tech */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input
              tabIndex={-1}
              autoComplete="off"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="mt-7 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id={`${uid}-required-note`} className="text-xs text-fg/40">
          <span className="text-brand-fg">*</span> {form.requiredNote}
        </p>
        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand px-7 py-2 text-sm font-semibold text-on-brand transition-all duration-300 hover:bg-brand-bright disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              {form.sending}
            </>
          ) : (
            <>
              {form.submit}
              <Send
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </>
          )}
        </button>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {status.kind === "success" && (
          <p className="mt-6 flex items-start gap-2.5 rounded-lg border border-brand/30 bg-brand/10 p-4 text-sm text-fg">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-fg" aria-hidden />
            {form.success}
          </p>
        )}
        {status.kind === "notice" && (
          <p className="mt-6 flex items-start gap-2.5 rounded-lg border border-amber-300/30 bg-amber-300/10 p-4 text-sm text-amber-900 dark:text-amber-100">
            <Info className="mt-0.5 size-4 shrink-0 text-amber-700 dark:text-amber-200" aria-hidden />
            {status.message}
          </p>
        )}
        {status.kind === "error" && (
          <p
            role="alert"
            className="mt-6 flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-red-800 dark:text-red-100"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
