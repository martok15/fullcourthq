import Link from "next/link";
import { ArrowRight, Ban, CalendarDays, House, Link2 } from "lucide-react";
import type { CSSProperties } from "react";

import { CopyLinkButton } from "@/components/marketing/copy-link-button";
import { ShareWeekendVideo } from "@/components/marketing/share-weekend-video";
import { siteUrl } from "@/lib/site";

const familyPoints = [
  {
    icon: Ban,
    title: "No ads",
    body: "The FullCourtHQ apps don’t show third-party ads, and we don’t sell family data.",
  },
  {
    icon: Link2,
    title: "Share the weekend",
    body: "Send grandparents one link with every game, court, and address. No app or account needed to open it.",
  },
  {
    icon: CalendarDays,
    title: "One schedule for the household",
    body: "Games, practices, and training in one calendar that syncs to the phone’s calendar.",
  },
  {
    icon: House,
    title: "What needs you, up top",
    body: "Payments, next games, and team messages are waiting on the home screen.",
  },
];

export function FamiliesSection() {
  return (
    <section className="families" id="families" aria-labelledby="families-heading">
      <div className="site-shell">
        <header className="families__header">
          <p className="kicker kicker--gold" data-reveal>
            For families
          </p>
          <h2 id="families-heading" data-reveal>
            The team app parents actually like.
          </h2>
          <p data-reveal>
            No ads, no clutter. Just the schedule, what needs doing next, and an easy way to bring the whole family to
            game day.
          </p>
        </header>

        <div className="families__grid">
          <ul className="families__points">
            {familyPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <li key={point.title} data-reveal style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}>
                  <span className="icon-chip icon-chip--dark">
                    <Icon aria-hidden="true" size={18} />
                  </span>
                  <div>
                    <strong>{point.title}</strong>
                    <p>{point.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <figure className="families__video" data-reveal>
            <ShareWeekendVideo sizes="(max-width: 980px) 92vw, 840px" teaser />
            <figcaption>
              <span className="hero__announce-tag">New</span>
              Share the weekend · 49-second tour
            </figcaption>
          </figure>
        </div>

        <div className="families__share" data-reveal>
          <p>
            <strong>Running a club?</strong> Send your families the Share the weekend page in your next team message.
          </p>
          <div className="families__share-actions">
            <CopyLinkButton url={`${siteUrl}/share-the-weekend`} label="Link to the Share the weekend page for families" />
            <Link className="text-link text-link--light" href="/share-the-weekend">
              Open the family page <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
