import { createFileRoute } from "@tanstack/react-router";

import { LEGAL_CONTACT_EMAIL, LegalPage } from "@/components/site/legal-page";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | The Owners Council" },
      { name: "description", content: "The terms that apply to theownerscouncil.com and The Owners Council by 41 Legacy." },
    ],
    links: [{ rel: "canonical", href: "https://theownerscouncil.com/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <LegalPage
      intro="These terms apply to theownerscouncil.com and to The Owners Council, operated by 41 Legacy LLC. By using the site or taking part in a chapter, you agree to them."
      title="Terms of Service"
    >
      <h2>What The Owners Council is</h2>
      <p>
        The Owners Council is an educational community for business owners, organized in local
        chapters. Chapters are designed and facilitated by 41 Legacy and hosted with local partners.
        Sessions, reports, workshops and materials are for education only.
      </p>

      <h2>No professional advice</h2>
      <p>
        Nothing shared on this site, in sessions, in reports or by guest speakers is legal, tax,
        investment, accounting or other professional advice, and no advisory relationship is created
        by taking part. Make decisions with your own licensed advisors. Reports are general,
        plain-language estimates based on the information you provide and are not appraisals or
        formal valuations.
      </p>

      <h2>Membership</h2>
      <ul>
        <li>Membership is by invitation. We may accept or decline a request, and may end a membership, at our discretion.</li>
        <li>There is no fee to be a member unless we tell you otherwise in writing before you agree to one.</li>
        <li>You agree to give accurate information and to keep it up to date.</li>
      </ul>

      <h2>Council ground rules</h2>
      <ul>
        <li>The council is a room for learning, not selling. Members, hosts and speakers may not use sessions to solicit business.</li>
        <li>What members share in the room stays in the room. Do not record sessions or share another member's information without their permission.</li>
        <li>Treat every member, host and speaker with respect.</li>
      </ul>
      <p>
        41 Legacy discloses the advisory services it offers outside the council. Any one-on-one
        conversation happens only at a member's request and is separate from the council.
      </p>

      <h2>Introductions to professionals</h2>
      <p>
        When you ask, we may introduce you to professionals or programs. They are independent. We do
        not guarantee their services or results, and any engagement is between you and them.
      </p>

      <h2>Content and intellectual property</h2>
      <p>
        The site, session materials, reports and the council's name, design and methods belong to 41
        Legacy LLC or its licensors. You may use materials you receive for your own business. You may
        not copy, resell or redistribute them without written permission.
      </p>

      <h2>Communications</h2>
      <p>
        We contact you as described in our <a href="/privacy">Privacy Policy</a>. Texts are covered by
        our <a href="/sms-terms">SMS Terms</a>.
      </p>

      <h2>Disclaimers and limits of liability</h2>
      <p>
        The site and the council are provided as is, without warranties of any kind. To the fullest
        extent the law allows, 41 Legacy LLC, its hosts and partners are not liable for indirect,
        incidental or consequential damages, or for decisions you make based on council content.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Connecticut, without regard to its
        conflict of laws rules.
      </p>

      <h2>Changes</h2>
      <p>We may update these terms. The effective date above shows when they last changed.</p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>
      </p>
    </LegalPage>
  );
}
