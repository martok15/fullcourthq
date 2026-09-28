"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

type ProductArea = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  outcomes: string[];
  link?: {
    href: string;
    label: string;
  };
  screens: Array<{
    src: string;
    alt: string;
    kind: "desktop" | "mobile";
  }>;
};

const productAreas: ProductArea[] = [
  {
    id: "facility",
    label: "Facility",
    eyebrow: "Facility operations",
    title: "Keep the operating day visible.",
    description:
      "Coordinate facilities, court availability, booking requests, and recurring schedules from one shared operating view.",
    outcomes: [
      "Manage courts, hours, rates, and blocked time",
      "Review booking requests with the schedule in view",
      "Give staff one source of truth for the day ahead",
    ],
    screens: [
      {
        src: "/product/fullcourthq-admin-dashboard.png",
        alt: "FullCourtHQ admin dashboard showing court status, upcoming bookings, and facility utilization",
        kind: "desktop",
      },
      {
        src: "/product/fullcourthq-calendar-desktop.png",
        alt: "FullCourtHQ public facility calendar showing courts and open time slots",
        kind: "desktop",
      },
    ],
  },
  {
    id: "programs",
    label: "Programs",
    eyebrow: "Programs and training",
    title: "Make registration feel like a natural next step.",
    description:
      "Publish clinics and training, set eligibility and member pricing, and let families choose the right player and session from their portal.",
    outcomes: [
      "Show player fit, availability, and pricing up front",
      "Use saved household details to streamline registration",
      "Keep training participation connected to family schedules",
    ],
    screens: [
      {
        src: "/product/rdc-training-detail.png",
        alt: "Tenant-branded mobile training page showing a clinic, player eligibility, session availability, and member pricing",
        kind: "mobile",
      },
    ],
  },
  {
    id: "club",
    label: "Club",
    eyebrow: "Club and team operations",
    title: "Keep coaches, teams, and families in sync.",
    description:
      "Bring team events, rosters, availability, messages, and game results into role-aware portals built for the people using them.",
    outcomes: [
      "Give coaches quick access to rosters and score entry",
      "Collect family availability around each team event",
      "Keep team communication connected to the household",
    ],
    screens: [
      {
        src: "/product/rdc-coach-results.png",
        alt: "Tenant-branded coach portal showing an upcoming game, roster access, score entry, and availability responses",
        kind: "mobile",
      },
      {
        src: "/product/rdc-parent-messages.png",
        alt: "Tenant-branded parent portal showing a team message thread and unread filtering",
        kind: "mobile",
      },
    ],
  },
  {
    id: "billing",
    label: "Billing",
    eyebrow: "Billing and access",
    title: "Make payment status easy to understand.",
    description:
      "Bring club fees, memberships, program charges, and household billing history into a clear flow for families and staff.",
    outcomes: [
      "Surface payment setup when a household needs to act",
      "Show balances and recurring totals in plain language",
      "Keep programs and billing in the same family experience",
    ],
    screens: [
      {
        src: "/product/rdc-parent-billing.png",
        alt: "Tenant-branded parent billing portal showing payment status, recurring total, and household billing summary",
        kind: "mobile",
      },
    ],
  },
  {
    id: "families",
    label: "Families",
    eyebrow: "Family experience",
    title: "Give every household a useful home base.",
    description:
      "Families can see what needs attention, review schedules, reach training, follow team messages, and manage billing from one mobile portal.",
    outcomes: [
      "Put the next important action at the top",
      "Bring team events and training into one schedule",
      "Keep essential household tools within easy reach",
    ],
    link: {
      href: "#share-the-weekend",
      label: "See what’s new for families",
    },
    screens: [
      {
        src: "/product/rdc-parent-dashboard.png",
        alt: "Tenant-branded parent portal home showing a payment setup action and the household's next game",
        kind: "mobile",
      },
      {
        src: "/product/rdc-parent-calendar.png",
        alt: "Tenant-branded family schedule showing team events, training, filters, and calendar sync",
        kind: "mobile",
      },
    ],
  },
];

export function ProductTour() {
  const [activeIndex, setActiveIndex] = useState(0);
  // Tabs advance on their own until someone picks one. The progress bar's CSS animation is the
  // timer, so reduced-motion viewers (no animation) never see it advance.
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [inView, setInView] = useState(false);
  const [held, setHeld] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeArea = productAreas[activeIndex];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function selectTab(index: number, moveFocus = false) {
    setAutoAdvance(false);
    setActiveIndex(index);
    if (moveFocus) {
      tabRefs.current[index]?.focus();
    }
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % productAreas.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + productAreas.length) % productAreas.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = productAreas.length - 1;
    }

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    selectTab(nextIndex, true);
  }

  return (
    <section className="tour" id="product-tour" aria-labelledby="tour-heading" ref={sectionRef}>
      <div className="site-shell">
        <header className="section-head">
          <p className="kicker" data-reveal>
            The product
          </p>
          <h2 id="tour-heading" data-reveal>
            Everything your club runs on, in one place.
          </h2>
          <p data-reveal>
            Facility, programs, teams, billing, and families share the same schedule and the same records. Every screen
            here is the real product, shown with a demo club.
          </p>
        </header>

        <div
          className="tour__frame"
          data-reveal
          data-autoplay={autoAdvance && inView && !held ? "running" : autoAdvance ? "paused" : "off"}
          onPointerEnter={() => setHeld(true)}
          onPointerLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false);
          }}
        >
          <div className="tour__tabs" role="tablist" aria-label="FullCourtHQ product areas">
            {productAreas.map((area, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  className="tour__tab"
                  id={`tour-tab-${area.id}`}
                  key={area.id}
                  onClick={() => selectTab(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  role="tab"
                  type="button"
                  aria-controls={`tour-panel-${area.id}`}
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                >
                  {area.label}
                  {isActive && autoAdvance ? (
                    <span
                      className="tour__progress"
                      aria-hidden="true"
                      onAnimationEnd={() => setActiveIndex((index + 1) % productAreas.length)}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <div
            className="tour__panel"
            id={`tour-panel-${activeArea.id}`}
            key={activeArea.id}
            role="tabpanel"
            aria-labelledby={`tour-tab-${activeArea.id}`}
            tabIndex={0}
          >
            <div className="tour__copy">
              <p className="tour__eyebrow">{activeArea.eyebrow}</p>
              <h3>{activeArea.title}</h3>
              <p>{activeArea.description}</p>

              <ul aria-label={`${activeArea.label} capabilities`}>
                {activeArea.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>

              {activeArea.link ? (
                <Link className="text-link" href={activeArea.link.href}>
                  {activeArea.link.label}
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              ) : null}
            </div>

            <div
              className={`tour__gallery tour__gallery--${activeArea.screens[0].kind}-${activeArea.screens.length}`}
              aria-label={`${activeArea.label} product screens`}
            >
              {activeArea.screens.map((screen) => (
                <figure className={`tour__screen tour__screen--${screen.kind}`} key={screen.src}>
                  <Image
                    src={screen.src}
                    alt={screen.alt}
                    width={screen.kind === "desktop" ? 1280 : 780}
                    height={screen.kind === "desktop" ? 720 : 1688}
                    sizes={
                      screen.kind === "desktop"
                        ? "(max-width: 720px) 92vw, (max-width: 1100px) 70vw, 720px"
                        : "(max-width: 720px) 46vw, 260px"
                    }
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
