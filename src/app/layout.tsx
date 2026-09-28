import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const title = "FullCourtHQ | Full courts. Paid on time.";
const description =
  "Court booking, programs, teams, and billing for sports facilities and clubs, with an ad-free app families actually like.";
const previewImage = "/brand/fullcourthq-og-logo.png";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: "#f7f8fb",
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
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
