/** Bespoke calls to action. Each intent has its own component and interaction identity. */

export function InviteCta() {
  return (
    <a className="cta-invite" href="#invitation">
      <span>Request an invitation</span>
      <span aria-hidden="true" className="cta-invite__arrow">
        →
      </span>
    </a>
  );
}

export function ChapterCta() {
  return (
    <a className="cta-chapter" href="#advisors">
      Host a chapter
    </a>
  );
}

export function FindChapterCta() {
  return (
    <a className="cta-find" href="#chapters">
      Find a chapter <span aria-hidden="true">↓</span>
    </a>
  );
}

export function NavInviteCta() {
  return (
    <a className="cta-nav" href="#invitation">
      Request an invitation
    </a>
  );
}

export function ChapterInlineCta() {
  return (
    <a className="cta-chapter-inline" href="#chapter-form">
      Host a chapter <span aria-hidden="true">↓</span>
    </a>
  );
}
