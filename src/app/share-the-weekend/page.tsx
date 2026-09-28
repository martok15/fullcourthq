import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Link2, TimerOff, UserRound } from "lucide-react";

import { BrandLockup } from "@/components/marketing/brand-lockup";
import { ShareWeekendVideo } from "@/components/marketing/share-weekend-video";

const title = "Share the weekend";
const socialTitle = "Share the weekend | FullCourtHQ";
const description =
  "Send family one link with every game, court, and address. It updates itself when times change, with no app or account needed to open it.";

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#170b3b",
};

// Preview images come from opengraph-image.jpg and twitter-image.jpg in this folder.
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/share-the-weekend" },
  openGraph: {
    title: socialTitle,
    description,
    url: "/share-the-weekend",
    siteName: "FullCourtHQ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description,
  },
};

const steps = [
  {
    title: "Tap Share this weekend",
    body: "In FullCourtHQ, open Schedule and tap Share this weekend. Pick your player, then choose this weekend or next.",
  },
  {
    title: "Send it to the family",
    body: "Share the link, copy a ready-made message, or save the invite card with its QR code. Text it, email it, or drop it in the group chat.",
  },
  {
    title: "They’re set for game day",
    body: "Family sees every game with live times, courts, addresses, and directions, and can add games to their calendar. Final scores show up too.",
  },
];

const details = [
  {
    icon: Link2,
    title: "Anyone with the link can see it",
    body: "No sign-in needed, so share it with people you trust. If a game time or court changes, the link shows the latest.",
  },
  {
    icon: UserRound,
    title: "You choose what shows",
    body: "Your player’s first name appears unless you turn it off. Their photo is only included if you switch it on.",
  },
  {
    icon: TimerOff,
    title: "Links turn off on their own",
    body: "Each link stops working a week after its games. You can turn one off sooner from Shared schedules on your Schedule.",
  },
];

export default function ShareTheWeekendPage() {
  return (
    <div className="weekend-page">
      <a className="skip-link" href="#weekend-main">
        Skip to main content
      </a>

      <header className="weekend-page__header">
        <div className="site-shell weekend-page__header-bar">
          <Link href="/" aria-label="FullCourtHQ home">
            <BrandLockup />
          </Link>
        </div>
      </header>

      <main id="weekend-main">
        <section className="weekend-page__hero" aria-labelledby="weekend-title">
          <div className="site-shell">
            <div className="weekend-page__intro">
              <p className="weekend-kicker">New in FullCourtHQ</p>
              <h1 id="weekend-title">
                Share the <span>weekend.</span>
              </h1>
              <p>
                Grandparents, aunts, uncles, the neighbor who never misses a game: send them one link with every game,
                court, and address. No app or account needed.
              </p>
            </div>

            <figure className="weekend-page__video">
              <ShareWeekendVideo sizes="(max-width: 1180px) 92vw, 1100px" priority />
              <figcaption>Real product screens · Demo team and sample data</figcaption>
            </figure>
          </div>
        </section>

        <section className="weekend-page__steps" aria-labelledby="weekend-steps-title">
          <div className="site-shell">
            <h2 id="weekend-steps-title">How it works</h2>
            <ol>
              {steps.map((step, index) => (
                <li key={step.title}>
                  <span className="weekend-page__step-number" aria-hidden="true">
                    {index + 1}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
            <p className="weekend-page__tip">
              <strong>Just one game?</strong> Tap <strong>Share game</strong> on any game instead.
            </p>
          </div>
        </section>

        <section className="weekend-page__details" aria-labelledby="weekend-details-title">
          <div className="site-shell">
            <h2 id="weekend-details-title">Good to know</h2>
            <ul>
              {details.map((detail) => {
                const Icon = detail.icon;
                return (
                  <li key={detail.title}>
                    <Icon aria-hidden="true" size={22} />
                    <h3>{detail.title}</h3>
                    <p>{detail.body}</p>
                  </li>
                );
              })}
            </ul>
            <p className="weekend-page__help">
              Don’t see Share this weekend? Update the FullCourtHQ app, or ask your club. Still stuck? Visit{" "}
              <Link href="/support">Support</Link>.
            </p>
          </div>
        </section>
      </main>

      <footer className="weekend-page__footer">
        <div className="site-shell weekend-page__footer-bar">
          <p>© 2026 FullCourtHQ. All rights reserved.</p>
          <nav aria-label="FullCourtHQ information">
            <Link href="/support">Support</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/">For clubs &amp; facilities</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
