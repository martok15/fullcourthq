import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fullcourthq.com";
const title = "FullCourtHQ | Sports Facility & Club Operating System";
const description =
  "Run facility scheduling, programs, teams, billing, communications, and the family experience from one connected sports operations platform.";
const previewImage = "/brand/fullcourthq-og-logo.png";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: "#07091c",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | FullCourtHQ",
  },
  description,
  applicationName: "FullCourtHQ",
  category: "Sports operations software",
  keywords: [
    "sports facility software",
    "club management software",
    "court scheduling",
    "sports program registration",
    "team billing",
    "parent coach portal",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "FullCourtHQ",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "FullCourtHQ sports facility and club operating system",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [previewImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>{children}</body>
    </html>
  );
}
