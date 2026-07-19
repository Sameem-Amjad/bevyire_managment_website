"use server";

import nodemailer from "nodemailer";
import {
  contactSchema,
  type ContactFormValues,
  type ContactState,
} from "@/lib/validations";
import { notificationEmail, autoResponseEmail } from "@/emails/templates";
import { site } from "@/lib/site";

/**
 * Reads SMTP configuration from the environment.
 * Returns null when the mailer isn't configured (→ demo mode).
 */
function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT ?? 587);
  // Explicit override, otherwise infer: port 465 uses implicit TLS.
  const secure =
    process.env.SMTP_SECURE != null
      ? process.env.SMTP_SECURE === "true"
      : port === 465;

  return { host, port, secure, user, pass };
}

/**
 * Server action for the contact form.
 * - Validates on the server with Zod (never trust the client).
 * - Sends a team notification + an auto-response via SMTP (Nodemailer).
 * - Falls back to "demo mode" (logs only) when SMTP isn't configured,
 *   so the form works out-of-the-box before credentials are added.
 */
export async function submitContactForm(
  values: ContactFormValues,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors)) {
        fieldErrors[key as keyof ContactFormValues] = issue.message;
      }
    }
    return {
      success: false,
      message: "Please check the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const data = parsed.data;

  // Honeypot — silently accept and drop bot submissions.
  if (data.website && data.website.length > 0) {
    return { success: true, message: "Thank you — we'll be in touch shortly." };
  }

  const smtp = getSmtpConfig();
  const to = process.env.CONTACT_TO_EMAIL ?? site.contact.email;
  const from =
    process.env.CONTACT_FROM_EMAIL ??
    (smtp ? `Bevy Irie <${smtp.user}>` : `Bevy Irie <${site.contact.email}>`);

  // Demo mode: no SMTP configured yet.
  if (!smtp) {
    console.info("[contact] demo mode (no SMTP configured) — enquiry received:", {
      name: data.name,
      email: data.email,
      service: data.service,
    });
    return {
      success: true,
      message:
        "Thank you — your message has been received. We'll be in touch within one business day.",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: { user: smtp.user, pass: smtp.pass },
    });

    const note = notificationEmail(data);
    const auto = autoResponseEmail(data);

    // Notify the team (reply-to points straight at the enquirer).
    await transporter.sendMail({
      from,
      to,
      replyTo: data.email,
      subject: note.subject,
      html: note.html,
    });

    // Auto-response to the person who enquired.
    await transporter.sendMail({
      from,
      to: data.email,
      subject: auto.subject,
      html: auto.html,
    });

    return {
      success: true,
      message:
        "Thank you — your message is on its way. Look out for a confirmation in your inbox.",
    };
  } catch (error) {
    console.error("[contact] SMTP send error:", error);
    return {
      success: false,
      message: `Something went wrong sending your message. Please email us directly at ${site.contact.email}.`,
    };
  }
}
