import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CopyLinkButton } from "@/components/marketing/copy-link-button";
import { ShareWeekendVideo } from "@/components/marketing/share-weekend-video";
import { siteUrl } from "@/lib/site";

const facts = [
  "A weekend, tournament, or single game in one link",
  "Live times, courts, directions, and final scores",
  "First name optional, photo off unless a parent adds it",
];

export function ShareWeekendSpotlight() {
  return (
    <section className="weekend-spotlight" id="share-the-weekend" aria-labelledby="weekend-spotlight-heading">
      <div className="site-shell weekend-spotlight__grid">
        <div className="weekend-spotlight__copy">
          <p className="weekend-kicker">New in FullCourtHQ</p>
          <h2 id="weekend-spotlight-heading">
            Share the <span>weekend.</span>
          </h2>
          <p className="weekend-spotlight__lede">
            Parents send grandparents, relatives, and friends one link with every game, court, and address. It updates
            itself when times change, and there’s no app or account needed to open it.
          </p>
          <ul className="weekend-spotlight__facts">
            {facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>

          <div className="weekend-spotlight__share">
            <p>
              <strong>Tell your families.</strong> Send them this link in your next team message.
            </p>
            <CopyLinkButton url={`${siteUrl}/share-the-weekend`} label="Link to the Share the weekend page for families" />
            <Link className="weekend-spotlight__page-link" href="/share-the-weekend">
              Open the family page <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </div>

        <figure className="weekend-spotlight__media">
          <ShareWeekendVideo sizes="(max-width: 980px) 92vw, 58vw" />
          <figcaption>Real product screens · Demo team and sample data</figcaption>
        </figure>
      </div>
    </section>
  );
}
