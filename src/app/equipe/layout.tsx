import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notre Équipe | 4 Co-Fondateurs Experts",
  description: "Rencontrez les 4 co-fondateurs de FluxDev : experts en cybersécurité, développement full-stack, architecture IA et mobile/IoT. Plus de 30 ans d'expérience cumulée en développement web, mobile, SaaS et sécurité.",
  keywords: [
    "équipe développement",
    "co-fondateurs FluxDev",
    "expert cybersécurité",
    "développeur full-stack",
    "architecte IA",
    "développeur mobile",
    "pentest",
    "React Next.js",
    "systèmes IoT",
  ],
  openGraph: {
    title: "L'Équipe FluxDev | 4 Experts en Dev & Cybersécurité",
    description: "Cybersécurité, Full-Stack, Architecture IA, Mobile/IoT. 30+ ans d'expérience cumulée.",
    url: "https://fluxdev.io/equipe",
    type: "website",
    images: [
      {
        url: "/og-equipe.png",
        width: 1200,
        height: 630,
        alt: "Équipe FluxDev - 4 Co-Fondateurs Experts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "L'Équipe FluxDev | 4 Experts",
    description: "Cybersécurité, Full-Stack, Architecture IA, Mobile/IoT. 30+ ans d'expérience.",
  },
  alternates: {
    canonical: "https://fluxdev.io/equipe",
  },
};

export default function EquipeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
