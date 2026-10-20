import { NavInviteCta } from "./ctas";

const links = [
  { href: "#what", label: "What it is" },
  { href: "#members", label: "Benefits" },
  { href: "#chapters", label: "Chapters" },
  { href: "#advisors", label: "Host a chapter" },
  { href: "#faq", label: "FAQ" },
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
