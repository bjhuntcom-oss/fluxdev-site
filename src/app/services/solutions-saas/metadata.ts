import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Développement SaaS | Plateforme Cloud Scalable | FluxDev",
  description: "Création de plateformes SaaS cloud scalables : architecture microservices, multi-tenancy, facturation automatisée, analytics intégrés. Stack moderne, sécurité renforcée, monitoring 24/7. Solutions B2B et B2C.",
  keywords: [
    "développement SaaS",
    "plateforme cloud",
    "architecture microservices",
    "multi-tenancy",
    "SaaS B2B",
    "facturation SaaS",
    "analytics SaaS",
    "API REST",
    "scalabilité cloud",
    "monitoring 24/7",
  ],
  openGraph: {
    title: "Développement SaaS | Plateforme Cloud Scalable",
    description: "Plateformes SaaS : microservices, multi-tenancy, facturation auto. Stack moderne, sécurité renforcée.",
    url: "https://fluxdev.io/services/solutions-saas",
    type: "website",
    images: [
      {
        url: "/og-saas.png",
        width: 1200,
        height: 630,
        alt: "Développement SaaS FluxDev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Développement SaaS | Plateforme Cloud",
    description: "Plateformes SaaS scalables : microservices, multi-tenancy, facturation.",
  },
  alternates: {
    canonical: "https://fluxdev.io/services/solutions-saas",
  },
};
