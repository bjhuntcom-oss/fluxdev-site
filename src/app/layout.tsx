import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import { LocaleProvider } from "@/contexts";
import { Preloader } from "@/components/ui/preloader";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/json-ld";
import { MainLayout } from "@/components/layout/main-layout";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fluxdev.io"),
  title: {
    default: "FluxDev | Agence Développement Web & IA | Web Development & AI Agency",
    template: "%s | FluxDev",
  },
  description: "Agence de développement web, mobile, SaaS et cybersécurité propulsée par plus de 1500 agents IA propriétaires. Solutions sur mesure, sécurisées et performantes. | Web, mobile, SaaS development and cybersecurity agency powered by over 1500 proprietary AI agents. Custom, secure and performant solutions.",
  keywords: [
    "développement web", "web development", 
    "application mobile", "mobile app", 
    "SaaS", "cybersécurité", "cybersecurity",
    "intelligence artificielle", "artificial intelligence", "AI",
    "Next.js", "React", "TypeScript",
    "agence digitale", "digital agency",
    "FluxDev", "agents IA", "AI agents",
    "développement sur mesure", "custom development",
  ],
  authors: [{ name: "FluxDev", url: "https://fluxdev.io" }],
  creator: "FluxDev",
  publisher: "FluxDev",
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
  alternates: {
    canonical: "https://fluxdev.io",
    languages: {
      "fr-FR": "https://fluxdev.io",
      "en-US": "https://fluxdev.io",
    },
  },
  openGraph: {
    title: "FluxDev | Agence Développement Web & IA",
    description: "Plus de 1500 agents IA propriétaires orchestrent vos projets web, mobile, SaaS et cybersécurité. Solutions performantes et sécurisées.",
    url: "https://fluxdev.io",
    siteName: "FluxDev",
    locale: "fr_FR",
    alternateLocale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FluxDev - Solutions Digitales Propulsées par l'IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FluxDev | Web Development & AI Agency",
    description: "Over 1500 proprietary AI agents powering your web, mobile, SaaS and cybersecurity projects. Performant and secure solutions.",
    images: ["/og-image.png"],
    creator: "@fluxdev",
  },
  verification: {
    google: "google-site-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <head>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
        suppressHydrationWarning
      >
        <ClerkProvider
          localization={frFR}
          appearance={{
            variables: {
              colorPrimary: "#ffffff",
              colorBackground: "#000000",
              colorText: "#ffffff",
              colorTextSecondary: "#a0a0a0",
              colorInputBackground: "rgba(255,255,255,0.05)",
              colorInputText: "#ffffff",
            },
            elements: {
              formButtonPrimary: "bg-white text-black hover:bg-white/90",
              card: "bg-black border border-white/10",
              headerTitle: "text-white",
              headerSubtitle: "text-white/50",
              socialButtonsBlockButton: "bg-white/5 border-white/10 text-white hover:bg-white/10",
              formFieldLabel: "text-white/70",
              formFieldInput: "bg-white/5 border-white/10 text-white",
              footerActionLink: "text-white/70 hover:text-white",
            },
          }}
        >
          <LocaleProvider>
            <Preloader />
            <CookieConsent />
            <MainLayout>{children}</MainLayout>
          </LocaleProvider>
          <Analytics />
          <SpeedInsights />
        </ClerkProvider>
      </body>
    </html>
  );
}
