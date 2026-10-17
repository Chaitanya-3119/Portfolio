import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const description = siteDescription;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chaitanya — Full Stack Developer",
    template: "%s · Chaitanya",
  },
  description,
  keywords: [
    "Chaitanya",
    "full stack developer",
    "software engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "portfolio",
  ],
  authors: [{ name: "Chaitanya", url: siteUrl }],
  creator: "Chaitanya",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: "Chaitanya — Full Stack Developer",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaitanya — Full Stack Developer",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Chaitanya",
  jobTitle: "Full Stack Developer",
  url: siteUrl,
  sameAs: ["https://github.com/Chaitanya-3119"],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
