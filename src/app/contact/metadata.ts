import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Devis Gratuit | Audit 30min Offert | FluxDev",
  description: "Démarrez votre projet web, mobile ou SaaS. Audit gratuit de 30 minutes, devis personnalisé sous 48h. Disponibles pour particuliers, entreprises, gouvernements et ONG. Réponse garantie sous 24h.",
  keywords: [
    "contact agence web",
    "devis développement web",
    "audit gratuit",
    "consultation gratuite",
    "devis application mobile",
    "devis SaaS",
    "audit cybersécurité",
    "rendez-vous développement",
  ],
  openGraph: {
    title: "Contactez FluxDev | Audit Gratuit 30min",
    description: "Démarrez votre projet web, mobile ou SaaS. Audit gratuit, devis sous 48h, réponse 24h.",
    url: "https://fluxdev.io/contact",
    type: "website",
    images: [
      {
        url: "/og-contact.png",
        width: 1200,
        height: 630,
        alt: "Contact FluxDev - Audit Gratuit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact FluxDev | Audit Gratuit 30min",
    description: "Démarrez votre projet. Audit gratuit, devis sous 48h.",
  },
  alternates: {
    canonical: "https://fluxdev.io/contact",
  },
};
