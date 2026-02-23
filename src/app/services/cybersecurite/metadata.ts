import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cybersécurité & Audit Sécurité | Pentest, SOC, ISO 27001",
  description: "Services cybersécurité : audit de sécurité, tests d'intrusion (pentest), mise en place SOC, conformité ISO 27001, RGPD. Protection OWASP, architecture Zero Trust, monitoring 24/7. Experts certifiés en sécurité offensive et défensive.",
  keywords: [
    "cybersécurité",
    "audit sécurité",
    "pentest",
    "test intrusion",
    "SOC",
    "ISO 27001",
    "conformité RGPD",
    "sécurité OWASP",
    "Zero Trust",
    "expert cybersécurité",
  ],
  openGraph: {
    title: "Cybersécurité | Pentest, SOC, Audit Sécurité",
    description: "Audit sécurité, pentest, SOC, conformité ISO 27001/RGPD. Experts certifiés, monitoring 24/7.",
    url: "https://fluxdev.io/services/cybersecurite",
    type: "website",
    images: [
      {
        url: "/og-cybersecurite.png",
        width: 1200,
        height: 630,
        alt: "Cybersécurité FluxDev - Pentest & SOC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersécurité | Pentest & SOC",
    description: "Audit, pentest, SOC, conformité. Experts certifiés.",
  },
  alternates: {
    canonical: "https://fluxdev.io/services/cybersecurite",
  },
};
