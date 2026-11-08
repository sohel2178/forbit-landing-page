import en from "@/i18n/dictionaries/en";
import { validateContact, type ContactErrors } from "@/lib/contact-validation";

/**
 * Contact form endpoint.
 *
 * Delivery is intentionally pluggable: set CONTACT_WEBHOOK_URL to any HTTPS
 * endpoint that accepts JSON (an email service, CRM, Slack/Zapier/Make hook…).
 * Without it, this route returns 503 so the UI can tell the visitor honestly
 * that the message was not sent.
 */

export type ContactApiResponse =
  | { ok: true }
  | {
      ok: false;
      code: "invalid" | "not_configured" | "delivery_failed" | "bad_request";
      message: string;
      errors?: ContactErrors;
    };

function json(body: ContactApiResponse, status: number) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(
      { ok: false, code: "bad_request", message: "Invalid request body." },
      400,
    );
  }

  // Honeypot: real visitors never see or fill this field.
  if (
    body &&
    typeof body === "object" &&
    typeof (body as Record<string, unknown>).website === "string" &&
    ((body as Record<string, unknown>).website as string).length > 0
  ) {
    return json(
      { ok: false, code: "bad_request", message: "Submission rejected." },
      400,
    );
  }

  const result = validateContact(body);
  if (!result.ok) {
    return json(
      {
        ok: false,
        code: "invalid",
        message: "Please correct the highlighted fields.",
        errors: result.errors,
      },
      422,
    );
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return json(
      {
        ok: false,
        code: "not_configured",
        message:
          "Online inquiries aren't connected yet, so your message was not sent.",
      },
      503,
    );
  }

  // Delivered to the team in English regardless of the visitor's language.
  const serviceLabel = result.data.service ? en.contact.services[result.data.service] : "";

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...result.data,
        serviceLabel,
        source: "forbit-website",
        locale: request.headers.get("x-forbit-locale") ?? undefined,
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (error) {
    console.error("[contact] delivery failed:", error);
    return json(
      {
        ok: false,
        code: "delivery_failed",
        message:
          "We couldn't deliver your message right now. Please try again shortly.",
      },
      502,
    );
  }

  return json({ ok: true }, 200);
}
