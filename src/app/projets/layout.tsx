import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Projets & Réalisations | Portfolio",
  description: "Découvrez nos 16+ projets web, mobile, SaaS et cybersécurité : e-commerce luxe, applications bancaires, plateformes IA, audits de sécurité. Solutions sur mesure pour startups, PME et grands comptes.",
  keywords: [
    "portfolio développement web",
    "projets web réalisés",
    "applications mobiles",
    "plateforme SaaS",
    "audit cybersécurité",
    "e-commerce",
    "application bancaire",
    "CRM IA",
    "télémédecine",
    "marketplace B2B",
  ],
  openGraph: {
    title: "Portfolio FluxDev | 16+ Projets Web, Mobile & SaaS",
    description: "E-commerce, apps bancaires, plateformes IA, audits sécurité. Découvrez nos réalisations pour startups et grands comptes.",
    url: "https://fluxdev.io/projets",
    type: "website",
    images: [
      {
        url: "/og-projets.png",
        width: 1200,
        height: 630,
        alt: "Portfolio FluxDev - Projets Web, Mobile et SaaS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio FluxDev | 16+ Projets Réalisés",
    description: "E-commerce, apps bancaires, plateformes IA, audits sécurité. Nos réalisations web, mobile et SaaS.",
  },
  alternates: {
    canonical: "https://fluxdev.io/projets",
  },
};

export default function ProjetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
