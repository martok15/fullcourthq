import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandLockup } from "@/components/marketing/brand-lockup";
import { contactEmail } from "@/lib/contact";

const footerGroups = [
  {
    title: "Platform",
    links: [
      ["Product tour", "/#product-tour"],
      ["Connected workflows", "/#workflows"],
      ["Who it’s for", "/#solutions"],
      ["Pricing", "/#pricing"],
    ],
  },
  {
    title: "Trust",
    links: [
      ["Security", "/security"],
      ["Privacy", "/privacy"],
      ["Accessibility", "/accessibility"],
      ["Terms", "/terms"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="site-footer" id="company">
      <div className="site-shell footer-main">
        <div className="footer-brand">
          <Link href="/" className="footer-logo" aria-label="FullCourtHQ home">
            <BrandLockup />
          </Link>
          <p>The operating system for modern sports facilities and clubs.</p>
          <a className="footer-email" href={`mailto:${contactEmail}`}>
            {contactEmail}
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p>{group.title}</p>
              {group.links.map(([label, href]) => (
                <Link href={href} key={href}>
                  {label}
                </Link>
              ))}
            </div>
          ))}
          <div>
            <p>Get started</p>
            <Link href="/#demo">Request a walkthrough</Link>
            <a href={`mailto:${contactEmail}`}>Contact the team</a>
          </div>
        </nav>
      </div>
      <div className="site-shell footer-bottom">
        <p>© 2026 FullCourtHQ. All rights reserved.</p>
        <p>Built for the people who keep sports organizations moving.</p>
      </div>
    </footer>
  );
}
