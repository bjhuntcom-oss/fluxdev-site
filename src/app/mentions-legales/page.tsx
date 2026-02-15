"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/contexts";

const sectionsData = {
  fr: [
  {
    title: "Éditeur du site",
    content: [
      "FluxDev Studio",
      "Forme juridique : [À compléter]",
      "Capital social : [À compléter]",
      "Siège social : Cotonou, Bénin",
      "IFU : [À compléter]",
      "RCCM : [À compléter]",
      "Email : contact@fluxdev.io",
    ],
  },
  {
    title: "Directeur de la publication",
    content: [
      "Nom : ATCHAHOUE Destin",
      "Qualité : CEO & Fondateur",
      "Email : contact@fluxdev.io",
    ],
  },
  {
    title: "Hébergement",
    content: [
      "Le site est hébergé par :",
      "Vercel Inc.",
      "440 N Barranca Ave #4133",
      "Covina, CA 91723, USA",
      "https://vercel.com",
    ],
  },
  {
    title: "Propriété intellectuelle",
    content: [
      "L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, sons, logiciels, etc.) est la propriété exclusive de FluxDev Studio ou de ses partenaires et est protégé par les lois béninoises et internationales relatives à la propriété intellectuelle.",
      "Toute reproduction, représentation, modification, publication, transmission, dénaturation, totale ou partielle du site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit est interdite sans autorisation écrite préalable de FluxDev Studio.",
    ],
  },
  {
    title: "Données personnelles",
    content: [
      "Les informations recueillies sur ce site sont enregistrées dans un fichier informatisé par FluxDev Studio pour la gestion de la relation client et les opérations de prospection commerciale.",
      "Conformément à la loi n°2017-20 du 20 avril 2018 portant Code du numérique en République du Bénin, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données vous concernant.",
      "Pour exercer ces droits, contactez-nous à : contact@fluxdev.io",
    ],
  },
  {
    title: "Cookies",
    content: [
      "Ce site utilise des cookies pour améliorer l'expérience utilisateur et réaliser des statistiques de visites.",
      "Vous pouvez configurer votre navigateur pour refuser les cookies. Cependant, certaines fonctionnalités du site pourraient ne plus être accessibles.",
    ],
  },
  {
    title: "Limitation de responsabilité",
    content: [
      "FluxDev Studio s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, FluxDev Studio ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition.",
      "FluxDev Studio décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site.",
    ],
  },
  {
    title: "Droit applicable",
    content: [
      "Les présentes mentions légales sont soumises au droit béninois.",
      "En cas de litige, les tribunaux de Cotonou (Bénin) seront seuls compétents.",
    ],
  },
  ],
  en: [
    { title: "Website Publisher", content: ["FluxDev Studio", "Legal form: [To complete]", "Share capital: [To complete]", "Headquarters: Cotonou, Benin", "Tax ID: [To complete]", "Business Registration: [To complete]", "Email: contact@fluxdev.io"] },
    { title: "Publication Director", content: ["Name: ATCHAHOUE Destin", "Position: CEO & Founder", "Email: contact@fluxdev.io"] },
    { title: "Hosting", content: ["The website is hosted by:", "Vercel Inc.", "440 N Barranca Ave #4133", "Covina, CA 91723, USA", "https://vercel.com"] },
    { title: "Intellectual Property", content: ["All content on this site (texts, images, videos, logos, icons, sounds, software, etc.) is the exclusive property of FluxDev Studio or its partners and is protected by Beninese and international intellectual property laws.", "Any reproduction, representation, modification, publication, transmission, distortion, total or partial of the site or its content, by any means whatsoever, and on any medium whatsoever is prohibited without prior written authorization from FluxDev Studio."] },
    { title: "Personal Data", content: ["Information collected on this site is recorded in a computerized file by FluxDev Studio for customer relationship management and commercial prospecting operations.", "In accordance with Law No. 2017-20 of April 20, 2018 on the Digital Code in the Republic of Benin, you have the right to access, rectify, delete and oppose data concerning you.", "To exercise these rights, contact us at: contact@fluxdev.io"] },
    { title: "Cookies", content: ["This site uses cookies to improve user experience and compile visit statistics.", "You can configure your browser to refuse cookies. However, some site features may no longer be accessible."] },
    { title: "Limitation of Liability", content: ["FluxDev Studio strives to ensure the accuracy and updating of information published on this site. However, FluxDev Studio cannot guarantee the accuracy, precision or completeness of the information provided.", "FluxDev Studio disclaims any responsibility for any inaccuracy, error or omission relating to information available on the site."] },
    { title: "Applicable Law", content: ["These legal notices are subject to Beninese law.", "In case of dispute, the courts of Cotonou (Benin) will have sole jurisdiction."] },
  ],
};

export default function MentionsLegalesPage() {
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
              {locale === "fr" ? "Mentions légales" : "Legal Notice"}
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
                transition={{ duration: 0.4, delay: index * 0.05 }}
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
              {locale === "fr" ? "Pour toute question concernant ces mentions légales" : "For any questions regarding this legal notice"}
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
