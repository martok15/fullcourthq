import Image from "next/image";
import {
  BellRing,
  CalendarCheck2,
  CalendarRange,
  ChartColumnIncreasing,
  CreditCard,
  Repeat2,
  Sparkles,
  TableProperties,
} from "lucide-react";
import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";

type Point = { icon: LucideIcon; title: string; body: string };

const paymentPoints: Point[] = [
  {
    icon: Repeat2,
    title: "Recurring dues and memberships",
    body: "Set up plans once. Families see their monthly total and exactly what’s due.",
  },
  {
    icon: CreditCard,
    title: "Card or bank, through Stripe",
    body: "Card and ACH payments run on Stripe, so card details never sit in a spreadsheet.",
  },
  {
    icon: BellRing,
    title: "Families know when to act",
    body: "When a household needs to set up payment, it’s the first thing they see in the app.",
  },
  {
    icon: TableProperties,
    title: "Payment status next to the roster",
    body: "Staff see who’s paid alongside registrations and teams, not in a separate tool.",
  },
];

const courtPoints: Point[] = [
  {
    icon: CalendarRange,
    title: "Open time, published",
    body: "A public calendar shows renters and families exactly which courts are free.",
  },
  {
    icon: CalendarCheck2,
    title: "Booked and paid online",
    body: "Rentals check out through Stripe, and the slot is held while they pay.",
  },
  {
    icon: Sparkles,
    title: "Quiet hours become programs",
    body: "Turn open court time into clinics with capacity, eligibility, and member pricing.",
  },
  {
    icon: ChartColumnIncreasing,
    title: "Utilization by court",
    body: "See what’s on every court right now and how full each one ran this week.",
  },
];

// Sample rows for the illustration. Not customer data.
const duesRows = [
  { household: "Rivera", plan: "12U Girls · Monthly", amount: "$135" },
  { household: "Okafor", plan: "14U Boys · Monthly", amount: "$150" },
  { household: "Chen", plan: "Skills academy", amount: "$90" },
  { household: "Brooks", plan: "12U Girls · Monthly", amount: "$135" },
  { household: "Patel", plan: "Membership · Family", amount: "$270", pending: true },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// Each string is one hour row across the week; letters mark booking types, "-" stays open.
const weekRows = ["tctcr-r", "ctrttrr", "rttcrrc", "crc-tr-", "-r-r-c-"];
const dayFill = [72, 84, 78, 90, 66, 96, 58];

function PointList({ points }: { points: Point[] }) {
  return (
    <ul className="outcome__points">
      {points.map((point, index) => {
        const Icon = point.icon;
        return (
          <li key={point.title} data-reveal style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}>
            <span className="icon-chip">
              <Icon aria-hidden="true" size={18} />
            </span>
            <strong>{point.title}</strong>
            <p>{point.body}</p>
          </li>
        );
      })}
    </ul>
  );
}

export function PaymentsSection() {
  return (
    <section className="outcome" id="payments" aria-labelledby="payments-heading">
      <div className="site-shell outcome__grid">
        <div className="outcome__copy">
          <p className="kicker" data-reveal>
            For clubs
          </p>
          <h2 id="payments-heading" data-reveal>
            Stop chasing payments.
          </h2>
          <p className="outcome__lede" data-reveal>
            Dues, memberships, and program fees live next to your rosters and schedules. Families see what they owe and
            pay from a saved card or bank account. Your staff stop keeping a spreadsheet of who’s paid.
          </p>
          <PointList points={paymentPoints} />
        </div>

        <div className="outcome__visual outcome__visual--payments" data-reveal>
          <div className="dues-card" aria-hidden="true">
            <div className="dues-card__head">
              <div>
                <p>March dues</p>
                <strong>Lakeshore Hoops</strong>
              </div>
              <span className="sample-tag">Sample data</span>
            </div>
            <div className="dues-card__progress">
              <span>Collected</span>
              <div className="dues-card__bar">
                <i />
              </div>
            </div>
            <ul>
              {duesRows.map((row, index) => (
                <li key={row.household} style={{ "--i": index } as CSSProperties}>
                  <span className="dues-card__avatar">{row.household[0]}</span>
                  <div>
                    <strong>{row.household} household</strong>
                    <span>{row.plan}</span>
                  </div>
                  <b>{row.amount}</b>
                  {row.pending ? (
                    <span className="status status--pending">Setup requested</span>
                  ) : (
                    <span className="status status--flip">
                      <span>Due</span>
                      <span>Paid</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <figure className="phone phone--overlap">
            <div className="phone__screen">
              <Image
                src="/product/rdc-parent-billing.png"
                alt="Family billing screen in the FullCourtHQ app showing no balance due and a $270 monthly recurring total"
                width={780}
                height={1688}
                sizes="(max-width: 900px) 44vw, 250px"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

export function CourtsSection() {
  return (
    <section className="outcome outcome--reverse" id="courts" aria-labelledby="courts-heading">
      <div className="site-shell outcome__grid">
        <div className="outcome__copy">
          <p className="kicker" data-reveal>
            For facilities
          </p>
          <h2 id="courts-heading" data-reveal>
            Keep every court full.
          </h2>
          <p className="outcome__lede" data-reveal>
            Empty court time is lost revenue. Put your open hours where people can book them, fill the quiet ones with
            programs, and see how every court is actually used.
          </p>
          <PointList points={courtPoints} />
        </div>

        <div className="outcome__visual outcome__visual--courts" data-reveal>
          <div className="week-card" aria-hidden="true">
            <div className="week-card__head">
              <div>
                <p>This week · evenings</p>
                <strong>Main Facility</strong>
              </div>
              <span className="sample-tag">Sample data</span>
            </div>
            <div className="week-grid">
              {days.map((day) => (
                <span className="week-grid__day" key={day}>
                  {day}
                </span>
              ))}
              {weekRows.flatMap((row, rowIndex) =>
                row.split("").map((fill, dayIndex) => (
                  <span
                    className="week-grid__cell"
                    data-fill={fill === "-" ? undefined : fill}
                    key={`${rowIndex}-${dayIndex}`}
                    style={{ "--i": dayIndex + rowIndex * 2 } as CSSProperties}
                  />
                )),
              )}
            </div>
            <div className="week-card__bars">
              {dayFill.map((value, index) => (
                <span key={days[index]} style={{ "--h": `${value}%`, "--i": index } as CSSProperties} />
              ))}
            </div>
            <p className="mini-courts__legend">
              <span data-fill="t">Team</span>
              <span data-fill="c">Clinic</span>
              <span data-fill="r">Rental</span>
              <span>Open</span>
            </p>
          </div>

          <figure className="phone phone--overlap phone--booking">
            <div className="phone__screen">
              <Image
                src="/product/fullcourthq-booking-mobile.png"
                alt="Court rental checkout in FullCourtHQ with a 5:30 to 7:00 PM slot held for 12 minutes and a $90 price"
                width={390}
                height={740}
                sizes="(max-width: 900px) 44vw, 250px"
              />
            </div>
            <figcaption className="callout">Slot held while they pay</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
