import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandLockup } from "@/components/marketing/brand-lockup";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <Link href="/" className="not-found-logo" aria-label="FullCourtHQ home">
        <BrandLockup />
      </Link>
      <div>
        <p className="eyebrow eyebrow-gold">404 · Off the schedule</p>
        <h1>This page isn’t on the court.</h1>
        <p>The address may have changed, or the page may no longer exist.</p>
        <Link className="button button-gold" href="/">
          <ArrowLeft aria-hidden="true" size={18} />
          Return home
        </Link>
      </div>
    </main>
  );
}
