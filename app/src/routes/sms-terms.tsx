import { createFileRoute } from "@tanstack/react-router";

import { LEGAL_CONTACT_EMAIL, LegalPage } from "@/components/site/legal-page";
import { PROGRAM_NAME } from "@/lib/consent";

export const Route = createFileRoute("/sms-terms")({
  head: () => ({
    meta: [
      { title: "SMS Terms | The Owners Council" },
      { name: "description", content: "Text messaging terms for The Owners Council by 41 Legacy." },
    ],
    links: [{ rel: "canonical", href: "https://theownerscouncil.com/sms-terms" }],
  }),
  component: SmsTerms,
});

function SmsTerms() {
  return (
    <LegalPage
      intro={`These terms apply to text messages from ${PROGRAM_NAME}. You receive texts only if you checked the calls and texts box on one of our forms.`}
      title="SMS Terms"
    >
      <h2>Program</h2>
      <p>
        {PROGRAM_NAME} sends texts about your invitation request or chapter inquiry, council
        sessions, workshops, events and member updates.
      </p>

      <h2>Frequency and cost</h2>
      <p>Message frequency varies. Message and data rates may apply.</p>

      <h2>Opting out and help</h2>
      <ul>
        <li>Reply <strong>STOP</strong> to any message to stop receiving texts. You will get one confirmation text.</li>
        <li>Reply <strong>HELP</strong> for help, or email <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>.</li>
        <li>Consent to texts is never a condition of membership or of any purchase.</li>
      </ul>

      <h2>Carriers</h2>
      <p>Mobile carriers are not liable for delayed or undelivered messages.</p>

      <h2>Privacy</h2>
      <p>
        No mobile information will be shared with third parties or affiliates for marketing or
        promotional purposes. See our <a href="/privacy#sms">Privacy Policy</a> and{" "}
        <a href="/terms">Terms of Service</a>.
      </p>
    </LegalPage>
  );
}
