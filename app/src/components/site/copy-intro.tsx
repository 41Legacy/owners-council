import { useState } from "react";

export const REFERRAL_INTRO =
  "I'm connected to a small, invite-only council of business owners here, built around learning and community. Members learn market trends, growth strategy and exit planning, with CEO workshops, expert guest speakers, private reports on their business, and access to trusted professionals. It is a room for learning, not selling. I thought of you. Want an introduction? theownerscouncil.com";

export function CopyIntro() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(REFERRAL_INTRO);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="oc-intro">
      <p className="oc-intro__label">A forwardable intro for your clients</p>
      <blockquote className="oc-intro__text">{REFERRAL_INTRO}</blockquote>
      <button aria-live="polite" className="cta-copy" onClick={copy} type="button">
        {copied ? "Copied to clipboard" : "Copy the intro"}
      </button>
    </div>
  );
}
