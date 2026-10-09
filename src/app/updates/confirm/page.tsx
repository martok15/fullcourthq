import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Footer } from "@/components/marketing/footer";
import { Header } from "@/components/marketing/header";
import { NewsletterConfirmForm } from "@/components/marketing/newsletter-confirm-form";
import "../../home.css";
import "../updates.css";

export const metadata: Metadata = {
  title: "Confirm FullCourtHQ Updates",
  description: "Confirm FullCourtHQ email updates.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ConfirmNewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const token = (await searchParams).token;

  return (
    <>
      <Header />
      <main className="newsletter-page newsletter-status-page">
        <section className="site-shell newsletter-manage" aria-labelledby="confirm-title">
          <ShieldCheck aria-hidden="true" className="newsletter-manage__icon" size={34} />
          <p className="kicker">Confirm email</p>
          <h1 id="confirm-title">Confirm FullCourtHQ updates</h1>
          <p>
            Use the button below to finish subscribing this address. This extra step keeps automated link checks from
            enrolling anyone by merely opening the email link.
          </p>
          {token ? (
            <NewsletterConfirmForm token={token} />
          ) : (
            <p className="newsletter-status">This confirmation link is missing. Request a fresh confirmation email.</p>
          )}
          <Link className="text-link newsletter-manage__back" href="/updates">
            Request a fresh link
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
