import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleAlert } from "lucide-react";
import { Footer } from "@/components/marketing/footer";
import { Header } from "@/components/marketing/header";
import "../../home.css";
import "../updates.css";

export const metadata: Metadata = {
  title: "FullCourtHQ Update Status",
  description: "FullCourtHQ email update confirmation status.",
  robots: {
    index: false,
    follow: false,
  },
};

const statusCopy: Record<string, { title: string; copy: string; tone: "success" | "warning" }> = {
  confirmed: {
    title: "You are confirmed",
    copy: "Your email is now enrolled in the FullCourtHQ update topics you selected.",
    tone: "success",
  },
  unsubscribed: {
    title: "You are unsubscribed",
    copy: "This address has been opted out of FullCourtHQ parent and coach/staff update topics.",
    tone: "success",
  },
  invalid: {
    title: "That link is no longer valid",
    copy: "The confirmation or unsubscribe link may have expired or been changed. You can request a fresh link.",
    tone: "warning",
  },
  setup: {
    title: "Signup needs configuration",
    copy: "FullCourtHQ update topics are not configured yet. The team can activate this after Resend setup is complete.",
    tone: "warning",
  },
  error: {
    title: "We could not finish that update",
    copy: "Please try the link again in a minute. If it keeps failing, contact the FullCourtHQ team.",
    tone: "warning",
  },
};

export default async function NewsletterConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; manage?: string }>;
}) {
  const params = await searchParams;
  const status = params.status ?? "invalid";
  const message = statusCopy[status] ?? statusCopy.invalid;
  const manageToken = params.manage;

  return (
    <>
      <Header />
      <main className="newsletter-page newsletter-status-page">
        <section className="site-shell newsletter-result" data-tone={message.tone}>
          {message.tone === "success" ? (
            <CheckCircle2 aria-hidden="true" size={34} />
          ) : (
            <CircleAlert aria-hidden="true" size={34} />
          )}
          <h1>{message.title}</h1>
          <p>{message.copy}</p>
          <div className="newsletter-result__actions">
            {manageToken ? (
              <Link className="btn btn--primary" href={`/updates/manage?token=${encodeURIComponent(manageToken)}`}>
                Manage preferences
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            ) : null}
            <Link className="btn btn--ghost" href="/updates">
              Back to updates
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
