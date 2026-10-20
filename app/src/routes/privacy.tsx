import { createFileRoute } from "@tanstack/react-router";

import { LEGAL_CONTACT_EMAIL, LegalPage } from "@/components/site/legal-page";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | The Owners Council" },
      { name: "description", content: "How The Owners Council by 41 Legacy collects, uses and protects your information." },
    ],
    links: [{ rel: "canonical", href: "https://theownerscouncil.com/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <LegalPage
      intro="The Owners Council is operated by 41 Legacy LLC. This policy explains what we collect through theownerscouncil.com, how we use it, and the choices you have."
      title="Privacy Policy"
    >
      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>What you give us in our forms:</strong> your name, company or firm, email, phone
          number, chapter or region, annual revenue range, your practice, who referred you, and
          anything you choose to write to us.
        </li>
        <li>
          <strong>Your contact preferences:</strong> whether you agreed to calls and texts and to email
          updates, the wording you agreed to, the date and time, and the IP address and browser
          information of the device used, so we can honor and prove your choices.
        </li>
        <li>
          <strong>Basic technical information:</strong> our hosting provider processes standard request
          data, such as IP address and browser type, to deliver and secure the site. We do not use
          advertising trackers on this site.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to your request, review invitations and arrange your seat in a chapter</li>
        <li>To contact you by email, phone or text in line with the choices you made</li>
        <li>To plan sessions, workshops and speakers that fit members</li>
        <li>To operate, secure and improve the site, and to meet legal obligations</li>
      </ul>

      <h2>Who we share it with</h2>
      <ul>
        <li>
          <strong>The host of the chapter you ask to join</strong>, so they can welcome you and find you
          a seat.
        </li>
        <li>
          <strong>Service providers</strong> who work for us under confidentiality obligations, such as
          website hosting and our customer relationship management system. They may use your
          information only to provide services to us.
        </li>
        <li>When required by law, or to protect the rights and safety of members and others.</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2 id="sms">Text messaging and your mobile number</h2>
      <p>
        No mobile information will be shared with third parties or affiliates for marketing or
        promotional purposes. Text messaging opt-in data and consent are not shared with any third
        party, other than the service providers that deliver our messages. You can opt out of texts at
        any time by replying STOP. See our <a href="/sms-terms">SMS Terms</a>.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>Reply STOP to any text to stop texts, or HELP for help.</li>
        <li>Use the unsubscribe link in any email to stop email updates.</li>
        <li>
          Email <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a> to ask what we hold
          about you, to correct it, or to have it deleted, subject to records we must keep by law.
        </li>
      </ul>

      <h2>How long we keep it</h2>
      <p>
        We keep your information while you are a member or prospective member, and as long as needed
        for the purposes above. We keep records of your contact consent for as long as needed to show
        we honored it.
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable safeguards, including encrypted connections and access controls. No system
        is perfectly secure, so we cannot guarantee absolute security.
      </p>

      <h2>Children</h2>
      <p>This site is for business owners and advisors. It is not directed to anyone under 18.</p>

      <h2>Changes</h2>
      <p>
        We may update this policy. The effective date above shows when it last changed. Material
        changes will be posted on this page.
      </p>

      <h2>Contact</h2>
      <p>
        41 Legacy LLC, operator of The Owners Council:{" "}
        <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>
      </p>
    </LegalPage>
  );
}
