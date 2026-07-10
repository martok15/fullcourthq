"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";

type ProductArea = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  outcomes: string[];
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
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeArea = productAreas[activeIndex];

  function selectTab(index: number, moveFocus = false) {
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
    <section className="tour-section" id="product-tour" aria-labelledby="tour-heading">
      <div className="site-shell tour-shell">
        <header className="tour-header">
          <div>
            <p className="tour-eyebrow">Explore the platform</p>
            <h2 className="tour-heading" id="tour-heading">
              One connected system, seen through every role.
            </h2>
          </div>
          <p className="tour-intro">
            Move through the product areas below. Every screen is from the working platform, using a demo tenant and
            sample data.
          </p>
        </header>

        <div className="tour-tabs" role="tablist" aria-label="FullCourtHQ product areas">
          {productAreas.map((area, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                className="tour-tab"
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
              </button>
            );
          })}
        </div>

        <div
          className="tour-panel"
          id={`tour-panel-${activeArea.id}`}
          key={activeArea.id}
          role="tabpanel"
          aria-labelledby={`tour-tab-${activeArea.id}`}
          tabIndex={0}
        >
          <div className="tour-copy">
            <p className="tour-panel-eyebrow">{activeArea.eyebrow}</p>
            <h3 className="tour-panel-title">{activeArea.title}</h3>
            <p className="tour-panel-body">{activeArea.description}</p>

            <ul className="tour-outcomes" aria-label={`${activeArea.label} capabilities`}>
              {activeArea.outcomes.map((outcome) => (
                <li className="tour-outcome" key={outcome}>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`tour-gallery tour-gallery--${activeArea.screens.length === 1 ? "single" : "paired"}`}
            aria-label={`${activeArea.label} product screens`}
          >
            {activeArea.screens.map((screen, index) => (
              <figure
                className={`tour-screen tour-screen--${screen.kind} ${
                  index === 0 ? "tour-screen--primary" : "tour-screen--secondary"
                }`}
                key={screen.src}
              >
                <div className="tour-screen-viewport">
                  <Image
                    className="tour-screen-image"
                    src={screen.src}
                    alt={screen.alt}
                    width={screen.kind === "desktop" ? 1280 : 780}
                    height={screen.kind === "desktop" ? 720 : 1688}
                    sizes={
                      screen.kind === "desktop"
                        ? "(max-width: 720px) 92vw, (max-width: 1100px) 74vw, 680px"
                        : "(max-width: 720px) 62vw, (max-width: 1100px) 34vw, 280px"
                    }
                  />
                </div>
                <figcaption className="tour-screen-caption">Real product screen · Demo tenant</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
