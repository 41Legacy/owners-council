import type { ReactNode } from "react";

import { SiteFooter } from "./site-footer";

export const LEGAL_CONTACT_EMAIL = "Mike@41Legacy.com";
export const LEGAL_EFFECTIVE = "October 20, 2026";

/** Shared layout for Privacy, Terms and SMS Terms. */
export function LegalPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <>
      <header className="oc-legal__bar">
        <a aria-label="The Owners Council, home" className="oc-brand" href="/">
          <span aria-hidden="true" className="oc-brand__mark" />
          <span className="oc-brand__text">
            <span className="oc-brand__name">The Owners Council</span>
            <span className="oc-brand__endorse">A 41 Legacy concept</span>
          </span>
        </a>
        <a className="cta-text" href="/">
          Back to the site
        </a>
      </header>
      <main className="oc-legal">
        <h1 className="oc-h2">{title}</h1>
        <p className="oc-legal__meta">Effective {LEGAL_EFFECTIVE}</p>
        <p className="oc-lede">{intro}</p>
        <div className="oc-legal__body">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}
