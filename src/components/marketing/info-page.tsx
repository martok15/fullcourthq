import Link from "next/link";

import { contactEmail } from "@/lib/contact";

export type InfoPageSection = {
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  resources?: readonly {
    href: string;
    label: string;
    description: string;
  }[];
};

type InfoPageProps = {
  currentPath:
    | "/security"
    | "/privacy"
    | "/community-standards"
    | "/support"
    | "/accessibility"
    | "/terms";
  eyebrow: string;
  title: string;
  introduction: string;
  updatedDate: string;
  updatedLabel: string;
  sections: readonly InfoPageSection[];
  closingNote?: string;
};

const informationLinks = [
  { href: "/security", label: "Security" },
  { href: "/privacy", label: "Privacy" },
  { href: "/community-standards", label: "Community standards" },
  { href: "/support", label: "Support" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/terms", label: "Terms" },
] as const;

export function InfoPage({
  currentPath,
  eyebrow,
  title,
  introduction,
  updatedDate,
  updatedLabel,
  sections,
  closingNote,
}: InfoPageProps) {
  return (
    <>
      <a className="info-skip-link" href="#info-main">
        Skip to content
      </a>

      <header className="info-header">
        <div className="info-shell info-header-inner">
          <Link className="info-brand" href="/" aria-label="FullCourtHQ home">
            FullCourtHQ
          </Link>

          <Link className="info-header-cta" href="/#demo">
            Request a demo
          </Link>
        </div>
      </header>

      <main className="info-main" id="info-main">
        <article className="info-shell info-article">
          <header className="info-hero">
            <p className="info-eyebrow">{eyebrow}</p>
            <h1 className="info-title">{title}</h1>
            <p className="info-introduction">{introduction}</p>
            <p className="info-updated">
              Last updated <time dateTime={updatedDate}>{updatedLabel}</time>
            </p>
          </header>

          <div className="info-content">
            {sections.map((section) => (
              <section className="info-section" key={section.title}>
                <h2 className="info-section-title">{section.title}</h2>

                {section.paragraphs?.map((paragraph) => (
                  <p className="info-section-copy" key={paragraph}>
                    {paragraph}
                  </p>
                ))}

                {section.bullets ? (
                  <ul className="info-list">
                    {section.bullets.map((bullet) => (
                      <li className="info-list-item" key={bullet}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.resources ? (
                  <ul className="info-resource-list">
                    {section.resources.map((resource) => (
                      <li key={resource.href}>
                        <a className="info-resource-link" href={resource.href}>
                          {resource.label}
                        </a>
                        <p>{resource.description}</p>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {closingNote ? (
              <aside className="info-note" aria-label="Important note">
                <p className="info-note-copy">{closingNote}</p>
              </aside>
            ) : null}

            <section className="info-contact" aria-labelledby="info-contact-title">
              <p className="info-contact-eyebrow">Questions or feedback?</p>
              <h2 className="info-contact-title" id="info-contact-title">
                Talk with the FullCourtHQ team.
              </h2>
              <p className="info-contact-copy">
                Email{" "}
                <a className="info-inline-link" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>{" "}
                or tell us about your organization in a demo request.
              </p>
              <div className="info-contact-actions">
                <Link className="info-primary-link" href="/#demo">
                  Request a demo
                </Link>
                <Link className="info-secondary-link" href="/">
                  Back to home
                </Link>
              </div>
            </section>
          </div>
        </article>
      </main>

      <footer className="info-footer">
        <div className="info-shell info-footer-inner">
          <p className="info-footer-brand">FullCourtHQ</p>
          <nav className="info-footer-nav" aria-label="Trust and legal pages">
            {informationLinks.map((link) => (
              <Link
                className="info-footer-link"
                href={link.href}
                key={link.href}
                aria-current={currentPath === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
