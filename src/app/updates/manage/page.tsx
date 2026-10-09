import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/marketing/footer";
import { Header } from "@/components/marketing/header";
import { NewsletterPreferencesForm } from "@/components/marketing/newsletter-preferences-form";
import "../../home.css";
import "../updates.css";

export const metadata: Metadata = {
  title: "Manage FullCourtHQ Updates",
  description: "Update FullCourtHQ email topics.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ManageNewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const token = (await searchParams).token;

  return (
    <>
      <Header />
      <main className="newsletter-page newsletter-status-page">
        <section className="site-shell newsletter-manage" aria-labelledby="manage-title">
          <p className="kicker">Preferences</p>
          <h1 id="manage-title">Manage FullCourtHQ updates</h1>
          <p>
            Choose the topics you want now. Saving “No newsletter updates” opts this email out of both FullCourtHQ
            parent and coach/staff update topics.
          </p>
          {token ? (
            <NewsletterPreferencesForm token={token} />
          ) : (
            <p className="newsletter-status">This preferences link is missing. Request a fresh confirmation email.</p>
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
