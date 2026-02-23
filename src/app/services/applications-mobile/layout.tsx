import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Développement Application Mobile | iOS, Android, React Native | FluxDev",
  description: "Création d'applications mobiles natives iOS (Swift) et Android (Kotlin) ou cross-platform React Native. De la conception UX au déploiement sur App Store et Google Play. Performances optimales, sécurité renforcée.",
  keywords: [
    "développement application mobile",
    "application iOS",
    "application Android",
    "React Native",
    "Swift développement",
    "Kotlin développement",
    "app mobile sur mesure",
    "déploiement App Store",
    "Google Play",
    "UX mobile",
  ],
  openGraph: {
    title: "Développement App Mobile | iOS, Android, React Native",
    description: "Apps natives iOS/Android ou cross-platform React Native. De la conception au déploiement.",
    url: "https://fluxdev.io/services/applications-mobile",
    type: "website",
    images: [
      {
        url: "/og-mobile.png",
        width: 1200,
        height: 630,
        alt: "Développement Mobile FluxDev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Développement App Mobile | iOS & Android",
    description: "Apps natives ou React Native. Conception UX au déploiement.",
  },
  alternates: {
    canonical: "https://fluxdev.io/services/applications-mobile",
  },
};

export default function ApplicationsMobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
