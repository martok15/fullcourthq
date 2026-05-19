import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "Book a Demo", href: "#demo" },
];

export function Footer() {
  return (
    <footer className="site-footer" id="resources">
      <div className="site-shell footer-grid">
        <div className="footer-brand">
          <Link href="#" className="footer-logo-lockup" aria-label="FullCourtHQ home">
            <Image src="/brand/fullcourthq-rounded-icon.png" alt="" width={512} height={512} />
            <span>
              FullCourt<b>HQ</b>
            </span>
          </Link>
          <div className="footer-brand-copy">
            <p className="footer-tagline">Operate. Manage. Grow.</p>
            <p className="footer-note">
              Operations software for facilities, teams, leagues, and organizations.
            </p>
          </div>
        </div>

        <div className="footer-actions">
          <nav className="footer-links" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Link href={link.href} key={link.label}>
                {link.label}
              </Link>
            ))}
          </nav>
          <a className="footer-email" href="mailto:info@fullcourthq.com">
            info@fullcourthq.com
          </a>
        </div>
      </div>
      <div className="site-shell footer-bottom">
        <p>© 2026 FullCourtHQ. All rights reserved.</p>
      </div>
    </footer>
  );
}
