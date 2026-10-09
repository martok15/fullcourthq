import type { Metadata } from "next";
import Link from "next/link";
import { MailMinus } from "lucide-react";
import { NewsletterUnsubscribeForm } from "@/components/marketing/newsletter-unsubscribe-form";
import { Footer } from "@/components/marketing/footer";
import { Header } from "@/components/marketing/header";
import "../../home.css";
import "../updates.css";

export const metadata: Metadata = {
  title: "Unsubscribe from FullCourtHQ Updates",
  description: "Unsubscribe from FullCourtHQ email updates.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function NewsletterUnsubscribePage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;

  return (
    <>
      <Header />
      <main className="newsletter-page newsletter-status-page">
        <section className="site-shell newsletter-manage" aria-labelledby="unsubscribe-title">
          <MailMinus className="newsletter-manage__icon" aria-hidden="true" size={34} />
          <p className="kicker">Email preferences</p>
          <h1 id="unsubscribe-title">Unsubscribe from updates</h1>
          <p>
            Confirm that this address should stop receiving FullCourtHQ parent and coach/staff update topics. Opening
            this link alone will not change your preferences.
          </p>
          {token ? (
            <NewsletterUnsubscribeForm token={token} />
          ) : (
            <p className="newsletter-status">This unsubscribe link is missing. Request a fresh confirmation email.</p>
          )}
          <Link className="text-link newsletter-manage__back" href="/updates">
            Back to updates
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
