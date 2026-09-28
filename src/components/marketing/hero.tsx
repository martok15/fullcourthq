import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, CircleCheck } from "lucide-react";
import type { CSSProperties } from "react";

const proofPoints = ["Card & ACH through Stripe", "No ads for families", "Carries your club’s brand"];

// Sample activity for the animated cards. These are illustrations, not customer data.
const payments = [
  { household: "Rivera household", item: "12U Girls · March dues", amount: "$135.00" },
  { household: "Okafor household", item: "Spring skills clinic", amount: "$90.00" },
  { household: "Chen household", item: "Court rental · Court 2", amount: "$60.00" },
];

const courtSlots = ["5", "6", "7", "8", "9"];
// One row per court; each letter is the booking type that lands in that hour.
const courtRows = [
  { court: "Court 1", fills: "tcctr" },
  { court: "Court 2", fills: "rrctt" },
  { court: "Court 3", fills: "cttr-" },
  { court: "Court 4", fills: "trrc-" },
];
const fillLabels = { t: "Team", c: "Clinic", r: "Rental" } as const;

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__backdrop" aria-hidden="true" />
      <div className="site-shell hero__inner">
        <div className="hero__copy">
          <Link className="hero__announce" href="#families">
            <span className="hero__announce-tag">New</span>
            Share the weekend with the whole family
            <ArrowRight aria-hidden="true" size={15} />
          </Link>

          <h1 id="hero-title">
            Full courts.
            <span>Paid on time.</span>
          </h1>

          <p className="hero__lede">
            FullCourtHQ runs court booking, programs, teams, and billing for sports facilities and clubs. Open time
            gets booked, dues get paid without the chasing, and families get an ad-free app they actually like.
          </p>

          <div className="hero__actions">
            <Link href="#demo" className="btn btn--primary btn--lg">
              Book a walkthrough
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link href="#product-tour" className="btn btn--ghost btn--lg">
              See the product
            </Link>
          </div>

          <ul className="hero__proof" aria-label="Highlights">
            {proofPoints.map((point) => (
              <li key={point}>
                <Check aria-hidden="true" size={15} strokeWidth={2.5} />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-stage">
          <div className="hero-stage__window">
            <div className="window-bar" aria-hidden="true">
              <span />
              <span />
              <span />
              <p>app.fullcourthq.com</p>
            </div>
            <Image
              src="/product/fullcourthq-admin-dashboard.png"
              alt="FullCourtHQ administrator dashboard showing court status, today’s bookings, and weekly utilization"
              width={1280}
              height={720}
              sizes="(max-width: 1100px) 92vw, 1024px"
              preload
            />
          </div>

          <div className="hero-float hero-float--payments" aria-hidden="true">
            <p className="hero-float__label">
              <span className="live-dot" />
              Payments
            </p>
            <div className="toast-cycle">
              {payments.map((payment, index) => (
                <div className="toast" key={payment.household} style={{ "--i": index } as CSSProperties}>
                  <CircleCheck size={20} />
                  <div>
                    <strong>Payment received</strong>
                    <span>
                      {payment.household} · {payment.item}
                    </span>
                  </div>
                  <b>{payment.amount}</b>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-float hero-float--courts" aria-hidden="true">
            <p className="hero-float__label">Tonight · Main Facility</p>
            <div className="mini-courts">
              <span />
              {courtSlots.map((slot) => (
                <span className="mini-courts__hour" key={slot}>
                  {slot}p
                </span>
              ))}
              {courtRows.map((row, rowIndex) => (
                <div className="mini-courts__row" key={row.court}>
                  <span className="mini-courts__court">{row.court}</span>
                  {row.fills.split("").map((fill, slotIndex) => (
                    <span
                      className="mini-courts__cell"
                      data-fill={fill === "-" ? undefined : fill}
                      key={slotIndex}
                      style={{ "--i": slotIndex * 4 + rowIndex } as CSSProperties}
                    />
                  ))}
                </div>
              ))}
            </div>
            <p className="mini-courts__legend">
              {Object.entries(fillLabels).map(([key, label]) => (
                <span key={key} data-fill={key}>
                  {label}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
