import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { bindings } from "../bindings.server";
import { GHL, pushLeadToGhl } from "../ghl.server";

const field = (max: number) => z.string().trim().max(max);

const invitationInput = z.object({
  name: field(120).min(2),
  company: field(160).min(1),
  email: field(200).email(),
  phone: field(40),
  region: field(80).min(1),
  revenue: field(40).min(1),
  referredBy: field(160),
  note: field(2000),
  website: z.string().max(200),
});

const chapterInput = z.object({
  name: field(120).min(2),
  firm: field(160).min(1),
  role: field(80).min(1),
  email: field(200).email(),
  phone: field(40),
  region: field(80).min(1),
  clients: field(2000),
  website: z.string().max(200),
});

async function forward(url: string | undefined, payload: Record<string, unknown>) {
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export const submitInvitation = createServerFn({ method: "POST" })
  .validator(invitationInput)
  .handler(async ({ data }) => {
    if (data.website) return { ok: true };
    const { DB, LEAD_WEBHOOK_URL, GHL_PRIVATE_TOKEN } = bindings();
    let stored = false;
    if (DB) {
      await DB.prepare(
        "INSERT INTO invitation_requests (name, company, email, phone, region, revenue, referred_by, note) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)",
      )
        .bind(data.name, data.company, data.email, data.phone, data.region, data.revenue, data.referredBy, data.note)
        .run();
      stored = true;
    }
    const forwarded = await forward(LEAD_WEBHOOK_URL, {
      type: "owner_invitation_request",
      source: "theownerscouncil.com",
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      region: data.region,
      revenue: data.revenue,
      referred_by: data.referredBy,
      note: data.note,
      submitted_at: new Date().toISOString(),
    });
    const inGhl = await pushLeadToGhl(GHL_PRIVATE_TOKEN, {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      tags: ["owners council", "oc owner request", `oc region: ${data.region}`],
      stageId: GHL.stageOwnerRequested,
      opportunityName: `${data.company}: Owners Council invitation`,
      note: [
        "Owners Council invitation request (theownerscouncil.com)",
        `Company: ${data.company}`,
        `Region: ${data.region}`,
        `Annual revenue: ${data.revenue}`,
        `Referred by: ${data.referredBy || "not given"}`,
        `On their mind: ${data.note || "not given"}`,
      ].join("\n"),
    });
    if (!stored && !forwarded && !inGhl) throw new Error("Submissions are not configured yet");
    return { ok: true };
  });

export const submitChapterInquiry = createServerFn({ method: "POST" })
  .validator(chapterInput)
  .handler(async ({ data }) => {
    if (data.website) return { ok: true };
    const { DB, LEAD_WEBHOOK_URL, GHL_PRIVATE_TOKEN } = bindings();
    let stored = false;
    if (DB) {
      await DB.prepare(
        "INSERT INTO chapter_inquiries (name, firm, role, email, phone, region, clients) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
      )
        .bind(data.name, data.firm, data.role, data.email, data.phone, data.region, data.clients)
        .run();
      stored = true;
    }
    const forwarded = await forward(LEAD_WEBHOOK_URL, {
      type: "advisor_chapter_inquiry",
      source: "theownerscouncil.com",
      name: data.name,
      firm: data.firm,
      role: data.role,
      email: data.email,
      phone: data.phone,
      region: data.region,
      clients: data.clients,
      submitted_at: new Date().toISOString(),
    });
    const inGhl = await pushLeadToGhl(GHL_PRIVATE_TOKEN, {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.firm,
      tags: ["owners council", "oc coi chapter lead", `oc region: ${data.region}`],
      stageId: GHL.stageCoiInquiry,
      opportunityName: `${data.firm}: chapter host (${data.region})`,
      note: [
        "Owners Council chapter inquiry (theownerscouncil.com)",
        `Firm: ${data.firm}`,
        `Practice: ${data.role}`,
        `Proposed chapter area: ${data.region}`,
        `Client base: ${data.clients || "not given"}`,
      ].join("\n"),
    });
    if (!stored && !forwarded && !inGhl) throw new Error("Submissions are not configured yet");
    return { ok: true };
  });

export type InvitationRow = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  region: string;
  revenue: string;
  referred_by: string;
  note: string;
  created_at: string;
};

export type ChapterRow = {
  id: number;
  name: string;
  firm: string;
  role: string;
  email: string;
  phone: string;
  region: string;
  clients: string;
  created_at: string;
};

export const listSubmissions = createServerFn({ method: "POST" })
  .validator(z.object({ key: z.string().min(1).max(200) }))
  .handler(async ({ data }) => {
    const { DB, ADMIN_KEY } = bindings();
    if (!ADMIN_KEY) throw new Error("ADMIN_KEY is not set in the website settings");
    if (data.key !== ADMIN_KEY) throw new Error("That key did not match");
    if (!DB) return { invitations: [] as InvitationRow[], chapters: [] as ChapterRow[] };
    const inv = await DB.prepare("SELECT * FROM invitation_requests ORDER BY id DESC LIMIT 500").all<InvitationRow>();
    const ch = await DB.prepare("SELECT * FROM chapter_inquiries ORDER BY id DESC LIMIT 500").all<ChapterRow>();
    return { invitations: inv.results ?? [], chapters: ch.results ?? [] };
  });
