import type { ContactFormValues } from "@/lib/validations";
import { site } from "@/lib/site";

const FOREST = "#08241b";
const GOLD = "#c6a253";
const INK = "#16231d";

function esc(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const shell = (title: string, body: string) => `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(
  title,
)}</title></head>
<body style="margin:0;padding:0;background:#f5f2ea;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${INK};">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <div style="background:${FOREST};border-radius:20px 20px 0 0;padding:28px 32px;">
      <p style="margin:0;color:#ffffff;font-size:20px;font-weight:600;letter-spacing:-0.02em;">Bevy Irie</p>
      <p style="margin:4px 0 0;color:${GOLD};font-size:11px;letter-spacing:0.24em;text-transform:uppercase;">Property · Lagos</p>
    </div>
    <div style="background:#ffffff;border-radius:0 0 20px 20px;padding:32px;box-shadow:0 18px 40px -20px rgba(8,36,27,0.22);">
      ${body}
    </div>
    <p style="text-align:center;color:#8a978f;font-size:12px;margin-top:24px;line-height:1.6;">
      ${esc(site.legalName)} · ${esc(site.contact.address.full)}<br/>
      ${esc(site.contact.email)} · ${esc(site.contact.phones[0].display)}
    </p>
  </div>
</body>
</html>`;

const row = (label: string, value: string) => `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #eee;color:#8a978f;font-size:13px;width:150px;vertical-align:top;">${esc(
      label,
    )}</td>
    <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;color:${INK};">${esc(
      value,
    )}</td>
  </tr>`;

/** Internal notification sent to the Bevy Irie team. */
export function notificationEmail(data: ContactFormValues) {
  const body = `
    <p style="margin:0 0 8px;font-size:22px;font-weight:600;letter-spacing:-0.02em;">New enquiry received</p>
    <p style="margin:0 0 24px;color:#5b6b62;font-size:14px;line-height:1.6;">A prospective landlord just reached out through bevyirie.com. Details below.</p>
    <table style="width:100%;border-collapse:collapse;">
      ${row("Name", data.name)}
      ${row("Email", data.email)}
      ${data.phone ? row("Phone", data.phone) : ""}
      ${data.propertyAddress ? row("Property", data.propertyAddress) : ""}
      ${data.service ? row("Interested in", data.service) : ""}
    </table>
    <div style="margin-top:24px;background:#f5f2ea;border-radius:12px;padding:18px;">
      <p style="margin:0 0 6px;color:#8a978f;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Message</p>
      <p style="margin:0;font-size:15px;line-height:1.7;white-space:pre-wrap;">${esc(
        data.message,
      )}</p>
    </div>
    <a href="mailto:${esc(
      data.email,
    )}" style="display:inline-block;margin-top:24px;background:${FOREST};color:#fff;text-decoration:none;padding:12px 24px;border-radius:999px;font-size:14px;font-weight:600;">Reply to ${esc(
      data.name.split(" ")[0],
    )}</a>`;
  return {
    subject: `New enquiry from ${data.name}${data.service ? ` · ${data.service}` : ""}`,
    html: shell("New enquiry", body),
  };
}

/** Auto-response sent to the person who submitted the form. */
export function autoResponseEmail(data: ContactFormValues) {
  const first = data.name.split(" ")[0] || "there";
  const body = `
    <p style="margin:0 0 16px;font-size:22px;font-weight:600;letter-spacing:-0.02em;">Thank you, ${esc(
      first,
    )} 🌿</p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#3f4f47;">
      We've received your message and a member of our team will be in touch within one business day.
      In the meantime, rest assured your property is exactly the kind we love to look after.
    </p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#3f4f47;">
      Here's a quick summary of what you sent us:
    </p>
    <div style="background:#f5f2ea;border-radius:12px;padding:18px;margin-bottom:24px;">
      <p style="margin:0;font-size:14px;line-height:1.7;white-space:pre-wrap;color:${INK};">${esc(
        data.message,
      )}</p>
    </div>
    <p style="margin:0 0 6px;font-size:15px;line-height:1.7;color:#3f4f47;">Need us sooner? Call or WhatsApp:</p>
    <p style="margin:0;font-size:15px;font-weight:600;color:${FOREST};">${esc(
      site.contact.phones[0].display,
    )}</p>
    <p style="margin:24px 0 0;font-size:15px;line-height:1.7;color:#3f4f47;">Warm regards,<br/><strong>The Bevy Irie Team</strong></p>`;
  return {
    subject: "We've received your message · Bevy Irie",
    html: shell("Thank you for reaching out", body),
  };
}
