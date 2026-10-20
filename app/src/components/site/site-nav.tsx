import { NavInviteCta } from "./ctas";

const links = [
  { href: "#thesis", label: "The thesis" },
  { href: "#members", label: "Membership" },
  { href: "#chapters", label: "Chapters" },
  { href: "#advisors", label: "For advisors" },
];

export function SiteNav() {
  return (
    <header className="oc-nav">
      <a aria-label="The Owners Council, back to top" className="oc-brand" href="#top">
        <span aria-hidden="true" className="oc-brand__mark" />
        <span className="oc-brand__text">
          <span className="oc-brand__name">The Owners Council</span>
          <span className="oc-brand__endorse">A 41 Legacy concept</span>
        </span>
      </a>
      <nav aria-label="Primary" className="oc-nav__links">
        {links.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <NavInviteCta />
    </header>
  );
}
