"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/contexts";

const sectionsData = {
  fr: [
  {
    title: "Introduction",
    content: [
      "FluxDev Studio accorde une grande importance à la protection de vos données personnelles. Cette politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site web et nos services.",
      "En utilisant notre site, vous acceptez les pratiques décrites dans cette politique.",
    ],
  },
  {
    title: "Données collectées",
    content: [
      "Nous collectons les types de données suivants :",
      "\u2022 Données d'identification : nom, prénom, adresse email, numéro de téléphone, nom d'entreprise",
      "\u2022 Données de connexion : adresse IP, type de navigateur, pages visitées, durée de visite",
      "\u2022 Données de communication : messages envoyés via le formulaire de contact",
      "\u2022 Données de projet : informations relatives à vos besoins et projets",
    ],
  },
  {
    title: "Finalités du traitement",
    content: [
      "Vos données sont collectées pour les finalités suivantes :",
      "\u2022 Répondre à vos demandes de contact et de devis",
      "\u2022 Gérer la relation commerciale et le suivi de projet",
      "\u2022 Améliorer nos services et notre site web",
      "\u2022 Envoyer des communications marketing (avec votre consentement)",
      "\u2022 Respecter nos obligations légales",
    ],
  },
  {
    title: "Base légale",
    content: [
      "Le traitement de vos données repose sur :",
      "\u2022 Votre consentement explicite",
      "\u2022 L'exécution d'un contrat ou de mesures précontractuelles",
      "\u2022 Notre intérêt légitime à développer notre activité",
      "\u2022 Le respect de nos obligations légales",
    ],
  },
  {
    title: "Durée de conservation",
    content: [
      "Vos données sont conservées pendant une durée proportionnée aux finalités pour lesquelles elles ont été collectées :",
      "\u2022 Données prospects : 3 ans à compter du dernier contact",
      "\u2022 Données clients : durée de la relation contractuelle + 5 ans",
      "\u2022 Données de connexion : 13 mois maximum",
    ],
  },
  {
    title: "Destinataires des données",
    content: [
      "Vos données peuvent être transmises à :",
      "\u2022 Nos équipes internes (commercial, technique, support)",
      "\u2022 Nos sous-traitants techniques (hébergement, emailing)",
      "\u2022 Les autorités compétentes en cas d'obligation légale",
      "Nous ne vendons jamais vos données à des tiers.",
    ],
  },
  {
    title: "Transferts hors UE",
    content: [
      "Certaines données peuvent être transférées vers des pays hors Union Européenne (notamment vers les États-Unis pour l'hébergement).",
      "Ces transferts sont encadrés par des garanties appropriées (clauses contractuelles types, certifications) conformément à la législation en vigueur.",
          ],
  },
  {
    title: "Sécurité des données",
    content: [
      "Nous mettons en oeuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :",
      "• Chiffrement des données en transit (HTTPS/TLS)",
      "• Accès restreint aux données personnelles",
      "• Sauvegardes régulières et sécurisées",
      "• Formation de nos équipes à la protection des données",
    ],
  },
  {
    title: "Vos droits",
    content: [
      "Conformément à la loi n°2017-20 du 20 avril 2018 portant Code du numérique en République du Bénin, vous disposez des droits suivants :",
      "• Droit d'accès : obtenir une copie de vos données",
      "• Droit de rectification : corriger vos données inexactes",
      "• Droit à l'effacement : demander la suppression de vos données",
      "• Droit à la limitation : restreindre le traitement de vos données",
      "• Droit à la portabilité : recevoir vos données dans un format structuré",
      "• Droit d'opposition : vous opposer au traitement de vos données",
      "Pour exercer ces droits, contactez-nous à : contact@fluxdev.io",
    ],
  },
  {
    title: "Cookies",
    content: [
      "Notre site utilise des cookies pour :",
      "• Assurer le bon fonctionnement du site (cookies essentiels)",
      "• Analyser le trafic et améliorer nos services (cookies analytiques)",
      "• Personnaliser votre expérience (cookies de préférence)",
      "Vous pouvez gérer vos préférences de cookies à tout moment via les paramètres de votre navigateur.",
    ],
  },
  {
    title: "Modifications",
    content: [
      "Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.",
      "Les modifications entrent en vigueur dès leur publication sur le site. Nous vous encourageons à consulter régulièrement cette page.",
    ],
  },
  {
    title: "Contact",
    content: [
      "Pour toute question relative à cette politique ou pour exercer vos droits :",
      "Email : contact@fluxdev.io",
      "Vous pouvez également introduire une réclamation auprès de l'Autorité de Protection des Données à caractère Personnel (APDP) du Bénin.",
    ],
  },
  ],
  en: [
    { title: "Introduction", content: ["FluxDev Studio places great importance on protecting your personal data. This privacy policy describes how we collect, use and protect your information when you use our website and services.", "By using our site, you accept the practices described in this policy."] },
    { title: "Data Collected", content: ["We collect the following types of data:", "• Identification data: name, email address, phone number, company name", "• Connection data: IP address, browser type, pages visited, visit duration", "• Communication data: messages sent via the contact form", "• Project data: information related to your needs and projects"] },
    { title: "Processing Purposes", content: ["Your data is collected for the following purposes:", "• Responding to your contact and quote requests", "• Managing the commercial relationship and project follow-up", "• Improving our services and website", "• Sending marketing communications (with your consent)", "• Complying with our legal obligations"] },
    { title: "Legal Basis", content: ["The processing of your data is based on:", "• Your explicit consent", "• Performance of a contract or pre-contractual measures", "• Our legitimate interest in developing our business", "• Compliance with our legal obligations"] },
    { title: "Retention Period", content: ["Your data is retained for a duration proportionate to the purposes for which it was collected:", "• Prospect data: 3 years from last contact", "• Customer data: duration of contractual relationship + 5 years", "• Connection data: 13 months maximum"] },
    { title: "Data Recipients", content: ["Your data may be transmitted to:", "• Our internal teams (sales, technical, support)", "• Our technical subcontractors (hosting, emailing)", "• Competent authorities in case of legal obligation", "We never sell your data to third parties."] },
    { title: "Transfers Outside EU", content: ["Some data may be transferred to countries outside the European Union (notably to the United States for hosting).", "These transfers are governed by appropriate safeguards (standard contractual clauses, certifications) in accordance with applicable legislation."] },
    { title: "Data Security", content: ["We implement appropriate technical and organizational measures to protect your data:", "• Data encryption in transit (HTTPS/TLS)", "• Restricted access to personal data", "• Regular and secure backups", "• Training of our teams in data protection"] },
    { title: "Your Rights", content: ["In accordance with Law No. 2017-20 of April 20, 2018 on the Digital Code in the Republic of Benin, you have the following rights:", "• Right of access: obtain a copy of your data", "• Right to rectification: correct inaccurate data", "• Right to erasure: request deletion of your data", "• Right to restriction: restrict processing of your data", "• Right to portability: receive your data in a structured format", "• Right to object: object to processing of your data", "To exercise these rights, contact us at: contact@fluxdev.io"] },
    { title: "Cookies", content: ["Our site uses cookies to:", "• Ensure proper functioning of the site (essential cookies)", "• Analyze traffic and improve our services (analytics cookies)", "• Personalize your experience (preference cookies)", "You can manage your cookie preferences at any time via your browser settings."] },
    { title: "Modifications", content: ["We reserve the right to modify this privacy policy at any time.", "Changes take effect upon publication on the site. We encourage you to check this page regularly."] },
    { title: "Contact", content: ["For any questions regarding this policy or to exercise your rights:", "Email: contact@fluxdev.io", "You can also file a complaint with the Personal Data Protection Authority (APDP) of Benin."] },
  ],
};

export default function ConfidentialitePage() {
  const { locale } = useLocale();
  const sections = sectionsData[locale];
  return (
    <div className="bg-black min-h-screen">
            
      {/* Hero */}
      <section className="relative pt-32 pb-12">
        {/* Cadre hero cohérent */}
        <div className="absolute inset-x-4 lg:inset-x-8 top-24 bottom-4 border border-white/15 pointer-events-none" />
        
        <div className="max-w-[900px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[11px] font-medium text-white/70 uppercase tracking-[0.2em]">
              Legal
            </span>
            <h1 className="text-4xl lg:text-5xl font-light text-white mt-2 mb-4">
              {locale === "fr" ? "Politique de confidentialité" : "Privacy Policy"}
            </h1>
            <p className="text-sm text-white/80">
              {locale === "fr" ? "Dernière mise à jour : Janvier 2026" : "Last updated: January 2026"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-[900px] mx-auto px-8 lg:px-16">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                className="border-l border-white/[0.08] pl-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs text-white/50 font-mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-lg font-medium text-white">
                    {section.title}
                  </h2>
                </div>
                <div className="space-y-3">
                  {section.content.map((paragraph, i) => (
                    <p key={i} className="text-sm text-white/85 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 border-t border-white/[0.06]">
        <div className="max-w-[900px] mx-auto px-8 lg:px-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-sm text-white/60">
              {locale === "fr" ? "Questions sur la protection de vos données ?" : "Questions about data protection?"}
            </div>
            <a
              href="mailto:contact@fluxdev.io"
              className="text-sm text-white hover:text-white/80 transition-colors"
            >
              contact@fluxdev.io
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
