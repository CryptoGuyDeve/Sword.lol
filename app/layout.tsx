import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sword.lol | Minimalist Identity Network",
    template: "%s | Sword.lol"
  },
  description: "The premier minimalist platform for architectural identities. Customize your broadcast node, track analytics, and connect your social network with high-end aesthetics.",
  keywords: ["Sword.lol", "social links", "minimalist profile", "identity network", "personalized links", "bio link"],
  authors: [{ name: "Sword Team" }],
  creator: "Sword.lol",
  publisher: "Sword.lol",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://sword.lol"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sword.lol | Minimalist Identity Network",
    description: "Connect your social profiles with an ultra-premium, architectural dashboard. Designed for clarity, optimized for influence.",
    url: "https://sword.lol",
    siteName: "Sword.lol",
    images: [
      {
        url: "/og-image.png", // Ensure this exists or user adds it
        width: 1200,
        height: 630,
        alt: "Sword.lol - The Architectural Identity Network",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sword.lol | Minimalist Identity Network",
    description: "The future of social identity. Architectural, minimal, and premium.",
    images: ["/og-image.png"],
    creator: "@sword_lol",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: "/logo.png",
  },
};

import SessionProvider from "@/components/SessionProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4258781057309417"
          crossOrigin="anonymous"
        ></script>

        {/* haha */}

        {/* Google Ads Tracking */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-11480288079"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-11480288079');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <SessionProvider>
          {children}
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}

