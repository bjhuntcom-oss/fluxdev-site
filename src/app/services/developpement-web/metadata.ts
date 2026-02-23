import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Développement Web Sur Mesure | Next.js, React, Node.js | FluxDev",
  description: "Agence développement web : sites vitrine, e-commerce, applications web complexes. Stack moderne Next.js 14, React 18, TypeScript, Node.js. Optimisation SEO, performances Core Web Vitals, sécurité OWASP. Devis gratuit.",
  keywords: [
    "développement web sur mesure",
    "agence Next.js",
    "développement React",
    "site e-commerce",
    "application web",
    "développement TypeScript",
    "API Node.js",
    "optimisation SEO",
    "Core Web Vitals",
    "sécurité OWASP",
  ],
  openGraph: {
    title: "Développement Web Sur Mesure | Next.js & React | FluxDev",
    description: "Sites vitrine, e-commerce, apps web. Next.js 14, React 18, TypeScript. SEO optimisé, performances maximales.",
    url: "https://fluxdev.io/services/developpement-web",
    type: "website",
    images: [
      {
        url: "/og-dev-web.png",
        width: 1200,
        height: 630,
        alt: "Développement Web FluxDev - Next.js React",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Développement Web | Next.js & React",
    description: "Sites vitrine, e-commerce, apps web. Stack moderne, SEO optimisé.",
  },
  alternates: {
    canonical: "https://fluxdev.io/services/developpement-web",
  },
};
