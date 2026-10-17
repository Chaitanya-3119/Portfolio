import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chaitanya | Full Stack Developer - Portfolio",
  description:
    "Portfolio of Chaitanya — a passionate Full Stack Developer building exceptional digital experiences with React, Next.js, Node.js, and modern web technologies.",
  keywords: [
    "full stack developer",
    "software engineer",
    "react developer",
    "next.js",
    "node.js",
    "portfolio",
    "web developer",
    "chaitanya",
  ],
  authors: [{ name: "Chaitanya" }],
  openGraph: {
    title: "Chaitanya | Full Stack Developer",
    description:
      "Building exceptional digital experiences with modern technologies",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaitanya | Full Stack Developer",
    description:
      "Building exceptional digital experiences with modern technologies",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="grid-bg" />
        {children}
      </body>
    </html>
  );
}
