import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

import { bindings } from "../bindings.server";
import { CONSENT_CALLS_TEXTS, CONSENT_EMAIL, CONSENT_VERSION, SUBMIT_NOTICE } from "../consent";
import { isActiveChapter } from "../chapters";
import { GHL, pushLeadToGhl } from "../ghl.server";

type ConsentRecord = {
  sms: boolean;
  email: boolean;
  version: string;
  at: string;
  ip: string;
  userAgent: string;
  wording: string;
};

function consentRecord(sms: boolean, email: boolean): ConsentRecord {
  const parts = [`Shown to submitter: "${SUBMIT_NOTICE}"`];
  if (sms) parts.push(`Calls and texts (checked): "${CONSENT_CALLS_TEXTS}"`);
  else parts.push("Calls and texts: not checked");
  if (email) parts.push(`Email updates (checked): "${CONSENT_EMAIL}"`);
  else parts.push("Email updates: not checked");
  return {
    sms,
    email,
    version: CONSENT_VERSION,
    at: new Date().toISOString(),
    ip: getRequestHeader("cf-connecting-ip") ?? "",
    userAgent: (getRequestHeader("user-agent") ?? "").slice(0, 300),
    wording: parts.join(" | "),
  };
}

function consentTags(c: ConsentRecord): string[] {
  return [
    c.sms ? "consent: calls and texts" : "no consent: calls and texts",
    c.email ? "consent: email updates" : "no consent: email updates",
  ];
}

function consentNote(c: ConsentRecord): string {
  return [
    "",
    "Contact consent",
    `Calls and texts: ${c.sms ? "YES" : "NO"}`,
    `Email updates: ${c.email ? "YES" : "NO"}`,
    `Recorded: ${c.at} (consent version ${c.version})`,
    `IP: ${c.ip || "unknown"}`,
    `Wording: ${c.wording}`,
  ].join("\n");
}

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
  consentSms: z.boolean(),
  consentEmail: z.boolean(),
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
  consentSms: z.boolean(),
  consentEmail: z.boolean(),
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
    const consent = consentRecord(data.consentSms, data.consentEmail);
    let stored = false;
    if (DB) {
      await DB.prepare(
        "INSERT INTO invitation_requests (name, company, email, phone, region, revenue, referred_by, note, consent_sms, consent_email, consent_version, consent_at, consent_ip, consent_user_agent, consent_wording) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15)",
      )
        .bind(data.name, data.company, data.email, data.phone, data.region, data.revenue, data.referredBy, data.note, consent.sms ? 1 : 0, consent.email ? 1 : 0, consent.version, consent.at, consent.ip, consent.userAgent, consent.wording)
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
      consent_calls_texts: consent.sms,
      consent_email: consent.email,
      consent_version: consent.version,
      submitted_at: new Date().toISOString(),
    });
    const inGhl = await pushLeadToGhl(GHL_PRIVATE_TOKEN, {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      tags: [
        "owners council",
        "oc: business owner",
        isActiveChapter(data.region) ? "oc: invitation request" : "oc: waitlist",
        `oc chapter: ${data.region}`,
        `oc revenue: ${data.revenue}`,
        ...consentTags(consent),
      ],
      pipelineId: GHL.owners.pipelineId,
      stageId: isActiveChapter(data.region) ? GHL.owners.stageRequested : GHL.owners.stageWaitlist,
      opportunityName: `${data.company} (${data.region})`,
      note: [
        "Owners Council invitation request (theownerscouncil.com)",
        `Company: ${data.company}`,
        `Region: ${data.region}`,
        `Annual revenue: ${data.revenue}`,
        `Referred by: ${data.referredBy || "not given"}`,
        `On their mind: ${data.note || "not given"}`,
      ].join("\n") + consentNote(consent),
    });
    if (!stored && !forwarded && !inGhl) throw new Error("Submissions are not configured yet");
    return { ok: true };
  });

export const submitChapterInquiry = createServerFn({ method: "POST" })
  .validator(chapterInput)
  .handler(async ({ data }) => {
    if (data.website) return { ok: true };
    const { DB, LEAD_WEBHOOK_URL, GHL_PRIVATE_TOKEN } = bindings();
    const consent = consentRecord(data.consentSms, data.consentEmail);
    let stored = false;
    if (DB) {
      await DB.prepare(
        "INSERT INTO chapter_inquiries (name, firm, role, email, phone, region, clients, consent_sms, consent_email, consent_version, consent_at, consent_ip, consent_user_agent, consent_wording) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14)",
      )
        .bind(data.name, data.firm, data.role, data.email, data.phone, data.region, data.clients, consent.sms ? 1 : 0, consent.email ? 1 : 0, consent.version, consent.at, consent.ip, consent.userAgent, consent.wording)
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
      consent_calls_texts: consent.sms,
      consent_email: consent.email,
      consent_version: consent.version,
      submitted_at: new Date().toISOString(),
    });
    const inGhl = await pushLeadToGhl(GHL_PRIVATE_TOKEN, {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.firm,
      tags: [
        "owners council",
        "oc: advisor",
        "oc: chapter host inquiry",
        `oc chapter: ${data.region}`,
        `oc practice: ${data.role}`,
        ...consentTags(consent),
      ],
      pipelineId: GHL.hosts.pipelineId,
      stageId: GHL.hosts.stageInquiry,
      opportunityName: `${data.firm}: host ${data.region}`,
      note: [
        "Owners Council chapter inquiry (theownerscouncil.com)",
        `Firm: ${data.firm}`,
        `Practice: ${data.role}`,
        `Proposed chapter area: ${data.region}`,
        `Client base: ${data.clients || "not given"}`,
      ].join("\n") + consentNote(consent),
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
