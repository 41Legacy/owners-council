// GoHighLevel (41 Legacy sub-account) integration. Server-only.
// Needs the secret GHL_PRIVATE_TOKEN (a GHL Private Integration token with
// contacts.write and opportunities.write). IDs below are not secrets.
const GHL_API = "https://services.leadconnectorhq.com";

export const GHL = {
  locationId: "owURdzvQYMBBw1c6hlyZ",
  owners: {
    pipelineId: "eX0GUrmlOxmfATZ8DCts", // Owners Council: Business Owners
    stageRequested: "fad4bbaf-d47a-4905-a5c2-25590e73b851", // Invitation requested
    stageWaitlist: "0ec1f91f-328b-4549-8924-ec115f785ff6", // Waitlist (forming chapter)
  },
  hosts: {
    pipelineId: "CtCglew3cIVqQhPlUA1Q", // Owners Council: Chapter Hosts (Advisors)
    stageInquiry: "f4e1b9f3-1f7e-4d87-90c9-a2bc27769d1a", // Host inquiry
  },
};

type Lead = {
  name: string;
  email: string;
  phone: string;
  company: string;
  tags: string[];
  note: string;
  pipelineId: string;
  stageId: string;
  opportunityName: string;
};

async function ghlPost(token: string, path: string, body: unknown) {
  const res = await fetch(`${GHL_API}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`GHL ${path} ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  return (await res.json()) as Record<string, unknown>;
}

function normalizePhone(raw: string): string | undefined {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return undefined;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return raw.trim().startsWith("+") ? `+${digits}` : undefined;
}

/** Create or update the contact, add a note and an opportunity. Returns the contact id when the contact landed. */
export async function pushLeadToGhl(token: string | undefined, lead: Lead): Promise<string | undefined> {
  if (!token) return undefined;
  const parts = lead.name.trim().split(/\s+/);
  const firstName = parts[0] ?? lead.name;
  const lastName = parts.slice(1).join(" ");
  let contactId: string | undefined;
  try {
    const upsert = await ghlPost(token, "/contacts/upsert", {
      locationId: GHL.locationId,
      firstName,
      ...(lastName ? { lastName } : {}),
      name: lead.name,
      email: lead.email,
      ...(normalizePhone(lead.phone) ? { phone: normalizePhone(lead.phone) } : {}),
      companyName: lead.company,
      source: "theownerscouncil.com",
      tags: lead.tags,
    });
    contactId = (upsert.contact as { id?: string } | undefined)?.id;
  } catch (error) {
    console.error(error);
    return undefined;
  }
  if (!contactId) return undefined;
  try {
    await ghlPost(token, `/contacts/${contactId}/notes`, { body: lead.note });
  } catch (error) {
    console.error(error);
  }
  try {
    await ghlPost(token, "/opportunities/", {
      locationId: GHL.locationId,
      pipelineId: lead.pipelineId,
      pipelineStageId: lead.stageId,
      name: lead.opportunityName,
      status: "open",
      contactId,
      source: "theownerscouncil.com",
    });
  } catch (error) {
    // An open opportunity for this contact may already exist; the contact and note still landed.
    console.error(error);
  }
  return contactId;
}

// ---------------------------------------------------------------------------
// New-submission alert emailed to the 41 Legacy team.
// Sent through GHL Conversations to the team contact below, so it needs the
// conversations/message.write scope on the Private Integration token.
// ---------------------------------------------------------------------------
export const NOTIFY = {
  contactId: "8c6uL2e3P5l5Vq2Mg3CV", // Mike Laskowski contact in the 41 Legacy sub-account
  email: "mike@41legacy.com",
};

export type Alert = {
  kind: "owner" | "host";
  headline: string; // e.g. "Waitlist: Fairfield County, CT"
  rows: [string, string][];
  leadContactId?: string;
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function notifyTeam(token: string | undefined, alert: Alert): Promise<boolean> {
  if (!token) return false;
  const label = alert.kind === "owner" ? "BUSINESS OWNER" : "CHAPTER HOST (ADVISOR)";
  const color = alert.kind === "owner" ? "#1f3a5f" : "#8a5a14";
  const subject = `[Owners Council] New ${alert.kind === "owner" ? "Business Owner request" : "Chapter Host inquiry"}: ${alert.headline}`;
  const link = alert.leadContactId
    ? `https://app.gohighlevel.com/v2/location/${GHL.locationId}/contacts/detail/${alert.leadContactId}`
    : "";
  const rows = alert.rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#666;font-family:Arial,sans-serif;font-size:13px;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0;font-family:Georgia,serif;font-size:15px;color:#111">${esc(v || "not given")}</td></tr>`,
    )
    .join("");
  const html = `<div style="max-width:560px">
<div style="display:inline-block;background:${color};color:#fff;font-family:Arial,sans-serif;font-size:12px;font-weight:bold;letter-spacing:1px;padding:6px 10px;border-radius:3px">${label}</div>
<h2 style="font-family:Arial,sans-serif;font-size:20px;margin:14px 0 4px">${esc(alert.headline)}</h2>
<p style="font-family:Georgia,serif;font-size:14px;color:#444;margin:0 0 14px">A new ${alert.kind === "owner" ? "business owner request" : "chapter host inquiry"} came in on theownerscouncil.com.</p>
<table style="border-collapse:collapse">${rows}</table>
${link ? `<p style="margin:18px 0 0"><a href="${link}" style="font-family:Arial,sans-serif;font-size:14px;color:${color}">Open the contact in Go High Level</a></p>` : ""}
</div>`;
  try {
    const res = await fetch(`${GHL_API}/conversations/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Version: "2021-04-15",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        type: "Email",
        contactId: NOTIFY.contactId,
        emailTo: NOTIFY.email,
        subject,
        html,
      }),
    });
    if (!res.ok) {
      console.error(`GHL notify ${res.status}: ${(await res.text()).slice(0, 300)}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
