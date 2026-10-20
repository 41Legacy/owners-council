export function SiteFooter() {
  return (
    <footer className="oc-footer">
      <div className="oc-wrap oc-footer__grid">
        <div className="oc-footer__brand">
          <p className="oc-footer__name">The Owners Council</p>
          <p>
            A 41 Legacy concept. Every council is designed and facilitated by 41 Legacy and hosted
            with a trusted local partner.
          </p>
        </div>
        <div className="oc-footer__credit">
          <p>Designed and facilitated by 41 Legacy</p>
          <p>Chapters across New England and the tri-state area</p>
        </div>
      </div>
      <div className="oc-wrap oc-footer__legal">
        <p>
          The Owners Council is an educational community. Nothing shared in sessions or on this site
          is legal, tax, investment or accounting advice. Decisions should be made with your own
          licensed advisors. Hosting partners appear with their permission and do not endorse any
          individual service.
        </p>
        <nav aria-label="Legal" className="oc-footer__links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/sms-terms">SMS Terms</a>
          <a href="mailto:Mike@41Legacy.com">Contact</a>
        </nav>
        <p>© 2026 41 Legacy LLC. All rights reserved.</p>
      </div>
    </footer>
  );
}
