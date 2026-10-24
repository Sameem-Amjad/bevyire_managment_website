import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Analytics } from "@/components/layout/Analytics";
import { VisitTracker } from "@/components/analytics/VisitTracker";
import { ChromeGate } from "@/components/layout/ChromeGate";
import { JsonLd } from "@/components/ui/JsonLd";
import { baseMetadata, localBusinessJsonLd, websiteJsonLd } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: "#08241b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${fraunces.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-ivory">
        <JsonLd data={localBusinessJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <ChromeGate>
          <ScrollProgress />
          <Header />
        </ChromeGate>
        <main className="flex-1">{children}</main>
        <ChromeGate>
          <Footer />
          <WhatsAppButton />
          <CookieConsent />
        </ChromeGate>
        <Analytics />
        <VisitTracker />
      </body>
    </html>
  );
}
