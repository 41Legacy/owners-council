// GoHighLevel (41 Legacy sub-account) integration. Server-only.
// Needs the secret GHL_PRIVATE_TOKEN (a GHL Private Integration token with
// contacts.write and opportunities.write). IDs below are not secrets.
const GHL_API = "https://services.leadconnectorhq.com";

export const GHL = {
  locationId: "owURdzvQYMBBw1c6hlyZ",
  pipelineId: "eX0GUrmlOxmfATZ8DCts",
  stageOwnerRequested: "fad4bbaf-d47a-4905-a5c2-25590e73b851",
  stageCoiInquiry: "ca8332da-504f-4101-8119-314df17b193d",
};

type Lead = {
  name: string;
  email: string;
  phone: string;
  company: string;
  tags: string[];
  note: string;
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

/** Create or update the contact, add a note and an opportunity. Returns true when the contact landed. */
export async function pushLeadToGhl(token: string | undefined, lead: Lead): Promise<boolean> {
  if (!token) return false;
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
    return false;
  }
  if (!contactId) return false;
  try {
    await ghlPost(token, `/contacts/${contactId}/notes`, { body: lead.note });
  } catch (error) {
    console.error(error);
  }
  try {
    await ghlPost(token, "/opportunities/", {
      locationId: GHL.locationId,
      pipelineId: GHL.pipelineId,
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
  return true;
}
