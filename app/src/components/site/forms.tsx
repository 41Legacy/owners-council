import { useEffect, useRef, useState, type FormEvent } from "react";

import { CONSENT_CALLS_TEXTS, CONSENT_EMAIL } from "@/lib/consent";

import { PREFILL_EVENT, type PrefillDetail, type PrefillTarget } from "./prefill";

import { submitChapterInquiry, submitInvitation } from "@/lib/api/council.functions";

type Status = "idle" | "sending" | "sent" | "error";

export const REGIONS = [
  "Connecticut",
  "Greater Boston",
  "New York City and Westchester",
  "Long Island",
  "Northern New Jersey",
  "Rhode Island",
  "Central and Western Massachusetts",
  "New Hampshire, Vermont and Maine",
  "Somewhere else",
];

const REVENUE = ["Under $1M", "$1M to $3M", "$3M to $10M", "$10M to $25M", "Over $25M"];

const ROLES = [
  "CPA or accounting firm",
  "Attorney",
  "Banker or private banker",
  "Wealth advisor",
  "Valuation or M&A advisor",
  "Insurance advisor",
  "Business coach or consultant",
  "Other",
];

function readForm(form: HTMLFormElement): Record<string, string> {
  const out: Record<string, string> = {};
  new FormData(form).forEach((value, key) => {
    out[key] = String(value);
  });
  return out;
}

function Honeypot() {
  return (
    <div aria-hidden="true" className="oc-hp">
      <label htmlFor="website">Leave this empty</label>
      <input autoComplete="off" id="website" name="website" tabIndex={-1} type="text" />
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  required = false,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="oc-field">
      <label htmlFor={id}>
        {label}
        {required ? null : <span className="oc-field__optional"> (optional)</span>}
      </label>
      <input autoComplete={autoComplete} id={id} name={id} required={required} type={type} />
    </div>
  );
}

function Select({
  id,
  label,
  options,
  prefillTarget,
}: {
  id: string;
  label: string;
  options: string[];
  prefillTarget?: PrefillTarget;
}) {
  const ref = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    if (!prefillTarget) return;
    const onPrefill = (event: Event) => {
      const detail = (event as CustomEvent<PrefillDetail>).detail;
      if (detail?.target !== prefillTarget || !ref.current) return;
      const match = options.find((o) => o === detail.region) ?? options.find((o) => detail.region.startsWith(o.split(",")[0] ?? o));
      if (match) ref.current.value = match;
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, [options, prefillTarget]);
  return (
    <div className="oc-field">
      <label htmlFor={id}>{label}</label>
      <select defaultValue="" id={id} name={id} ref={ref} required>
        <option disabled value="">
          Choose one
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function Area({ id, label, hint }: { id: string; label: string; hint: string }) {
  return (
    <div className="oc-field oc-field--wide">
      <label htmlFor={id}>
        {label}
        <span className="oc-field__optional"> (optional)</span>
      </label>
      <textarea aria-describedby={`${id}-hint`} id={id} maxLength={2000} name={id} rows={4} />
      <p className="oc-field__hint" id={`${id}-hint`}>
        {hint}
      </p>
    </div>
  );
}

function Consent({ prefix, smsError }: { prefix: string; smsError: boolean }) {
  return (
    <fieldset className="oc-consent">
      <legend>How we may contact you</legend>
      <label className="oc-consent__row" htmlFor={`${prefix}-consent-sms`}>
        <input id={`${prefix}-consent-sms`} name={`${prefix}ConsentSms`} type="checkbox" value="yes" />
        <span>{CONSENT_CALLS_TEXTS}</span>
      </label>
      {smsError ? (
        <p className="oc-form__error" role="alert">
          Add a phone number above so we can call or text you, or leave this box unchecked.
        </p>
      ) : null}
      <label className="oc-consent__row" htmlFor={`${prefix}-consent-email`}>
        <input id={`${prefix}-consent-email`} name={`${prefix}ConsentEmail`} type="checkbox" value="yes" />
        <span>{CONSENT_EMAIL}</span>
      </label>
      <p className="oc-consent__notice">
        By submitting, you agree to our <a href="/terms">Terms of Service</a> and{" "}
        <a href="/privacy">Privacy Policy</a>, and that we may contact you by email or phone to
        respond to this request. Text messages follow our <a href="/sms-terms">SMS Terms</a>.
      </p>
    </fieldset>
  );
}

export function InvitationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [smsError, setSmsError] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const v = readForm(event.currentTarget);
    const consentSms = v.ownerConsentSms === "yes";
    if (consentSms && !(v.phone ?? "").trim()) {
      setSmsError(true);
      return;
    }
    setSmsError(false);
    setStatus("sending");
    try {
      await submitInvitation({
        data: {
          name: v.name ?? "",
          company: v.company ?? "",
          email: v.email ?? "",
          phone: v.phone ?? "",
          region: v.region ?? "",
          revenue: v.revenue ?? "",
          referredBy: v.referredBy ?? "",
          note: v.note ?? "",
          website: v.website ?? "",
          consentSms,
          consentEmail: v.ownerConsentEmail === "yes",
        },
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="oc-form__done" role="status">
        <h3>Thank you. Your request is in.</h3>
        <p>We are glad you reached out. The chapter host will reply personally, soon.</p>
      </div>
    );
  }

  return (
    <form className="oc-form" onSubmit={onSubmit}>
      <Honeypot />
      <div className="oc-form__grid">
        <Field autoComplete="name" id="name" label="Your name" required />
        <Field autoComplete="organization" id="company" label="Company" required />
        <Field autoComplete="email" id="email" label="Email" required type="email" />
        <Field autoComplete="tel" id="phone" label="Phone" type="tel" />
        <Select id="region" label="Chapter you would like to join" options={REGIONS} prefillTarget="owner" />
        <Select id="revenue" label="Annual revenue" options={REVENUE} />
        <Field id="referredBy" label="Who referred you" />
        <Area
          hint="A sentence is plenty. What is taking up the most room in your head right now?"
          id="note"
          label="What's on your mind"
        />
      </div>
      <Consent prefix="owner" smsError={smsError} />
      {status === "error" ? (
        <p className="oc-form__error" role="alert">
          That did not go through. Check the fields above and try again.
        </p>
      ) : null}
      <button className="cta-submit-owner" disabled={status === "sending"} type="submit">
        {status === "sending" ? "Sending" : "Send my request"}
      </button>
    </form>
  );
}

export function ChapterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [smsError, setSmsError] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const v = readForm(event.currentTarget);
    const consentSms = v.advisorConsentSms === "yes";
    if (consentSms && !(v.cphone ?? "").trim()) {
      setSmsError(true);
      return;
    }
    setSmsError(false);
    setStatus("sending");
    try {
      await submitChapterInquiry({
        data: {
          name: v.cname ?? "",
          firm: v.firm ?? "",
          role: v.role ?? "",
          email: v.cemail ?? "",
          phone: v.cphone ?? "",
          region: v.cregion ?? "",
          clients: v.clients ?? "",
          website: v.website ?? "",
          consentSms,
          consentEmail: v.advisorConsentEmail === "yes",
        },
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="oc-form__done" role="status">
        <h3>Thank you. Let's talk.</h3>
        <p>The 41 Legacy team will reach out to set up a first conversation about your market and your clients.</p>
      </div>
    );
  }

  return (
    <form className="oc-form oc-form--advisor" onSubmit={onSubmit}>
      <Honeypot />
      <div className="oc-form__grid">
        <Field autoComplete="name" id="cname" label="Your name" required />
        <Field autoComplete="organization" id="firm" label="Firm" required />
        <Select id="role" label="Your practice" options={ROLES} />
        <Field autoComplete="email" id="cemail" label="Email" required type="email" />
        <Field autoComplete="tel" id="cphone" label="Phone" type="tel" />
        <Select id="cregion" label="Where would your chapter meet" options={REGIONS} prefillTarget="advisor" />
        <Area
          hint="Who do you serve, and roughly how many owners would you be glad to introduce?"
          id="clients"
          label="Your client base"
        />
      </div>
      <Consent prefix="advisor" smsError={smsError} />
      {status === "error" ? (
        <p className="oc-form__error" role="alert">
          That did not go through. Check the fields above and try again.
        </p>
      ) : null}
      <button className="cta-submit-advisor" disabled={status === "sending"} type="submit">
        {status === "sending" ? "Sending" : "Send chapter inquiry"}
      </button>
    </form>
  );
}
