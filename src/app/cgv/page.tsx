"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/contexts";

const sectionsData = {
  fr: [
  {
    title: "Objet et champ d'application",
    content: [
      "Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre FluxDev Studio et ses clients pour toute prestation de services de développement informatique, de cybersécurité et de conseil.",
      "Toute commande implique l'acceptation sans réserve des présentes CGV.",
    ],
  },
  {
    title: "Services proposés",
    content: [
      "FluxDev Studio propose les services suivants :",
      "• Développement de sites web et applications web",
      "• Développement d'applications mobiles (iOS, Android)",
      "• Conception et développement de plateformes SaaS",
      "• Audit et conseil en cybersécurité",
      "• Design UI/UX et création de maquettes",
      "• Maintenance et support technique",
      "• Accompagnement et conseil stratégique",
    ],
  },
  {
    title: "Devis et commande",
    content: [
      "Tout projet fait l'objet d'un devis détaillé gratuit et sans engagement.",
      "Le devis est valable 30 jours à compter de sa date d'émission.",
      "La commande est considérée comme ferme et définitive après signature du devis et versement de l'acompte prévu.",
      "Toute modification de la commande en cours de réalisation fera l'objet d'un avenant au devis initial.",
    ],
  },
  {
    title: "Tarifs et paiement",
    content: [
      "Les prix sont exprimés en FCFA, hors taxes.",
      "Sauf mention contraire, les modalités de paiement sont les suivantes :",
      "• 40% à la commande (acompte)",
      "• 30% à la validation des maquettes ou du prototype",
      "• 30% à la livraison finale",
      "Les paiements sont effectués par virement bancaire ou tout autre moyen convenu.",
      "En cas de retard de paiement, des pénalités de retard seront appliquées au taux légal en vigueur.",
    ],
  },
  {
    title: "Délais de réalisation",
    content: [
      "Les délais de réalisation sont indiqués dans le devis à titre indicatif.",
      "FluxDev Studio s'engage à mettre en oeuvre tous les moyens nécessaires pour respecter les délais convenus.",
      "Les délais peuvent être prolongés en cas de :",
      "• Retard dans la fourniture des éléments nécessaires par le client",
      "• Modifications demandées par le client en cours de projet",
      "• Force majeure",
      "Tout retard imputable au client ne saurait engager la responsabilité de FluxDev Studio.",
    ],
  },
  {
    title: "Obligations du client",
    content: [
      "Le client s'engage à :",
      "• Fournir les informations et éléments nécessaires à la réalisation du projet",
      "• Valider les étapes intermédiaires dans les délais convenus",
      "• Régler les factures aux échéances prévues",
      "• Respecter les droits de propriété intellectuelle",
      "• Informer FluxDev Studio de toute difficulté ou changement",
    ],
  },
  {
    title: "Obligations de FluxDev Studio",
    content: [
      "FluxDev Studio s'engage à :",
      "• Réaliser les prestations conformément au cahier des charges validé",
      "• Informer le client de l'avancement du projet",
      "• Respecter la confidentialité des informations communiquées",
      "• Livrer un travail de qualité professionnelle",
      "• Assurer un support technique pendant la période de garantie",
    ],
  },
  {
    title: "Propriété intellectuelle",
    content: [
      "Sauf accord contraire, le transfert de propriété intellectuelle des livrables au client est effectif après paiement intégral de la prestation.",
      "FluxDev Studio conserve la propriété des outils, méthodes et savoir-faire développés ou utilisés dans le cadre du projet.",
      "Le client autorise FluxDev Studio à mentionner la réalisation du projet dans ses références commerciales, sauf demande contraire écrite.",
    ],
  },
  {
    title: "Garantie et maintenance",
    content: [
      "FluxDev Studio garantit la conformité des livrables au cahier des charges pendant une période de 3 mois après la livraison.",
      "Cette garantie couvre la correction des anomalies et dysfonctionnements.",
      "La garantie ne couvre pas :",
      "• Les modifications effectuées par le client ou un tiers",
      "• Les problèmes liés à l'environnement technique du client",
      "• Les évolutions fonctionnelles non prévues au cahier des charges",
      "Un contrat de maintenance peut être proposé pour assurer le suivi au-delà de la garantie.",
    ],
  },
  {
    title: "Responsabilité",
    content: [
      "La responsabilité de FluxDev Studio est limitée au montant des sommes effectivement perçues pour la prestation concernée.",
      "FluxDev Studio ne saurait être tenu responsable des dommages indirects, pertes d'exploitation ou de données.",
      "Le client est seul responsable de l'utilisation qu'il fait des livrables et de leur adéquation à ses besoins.",
    ],
  },
  {
    title: "Résiliation",
    content: [
      "En cas de manquement grave de l'une des parties à ses obligations, l'autre partie pourra résilier le contrat après mise en demeure restée sans effet pendant 15 jours.",
      "En cas de résiliation par le client avant la fin du projet, les sommes versées restent acquises à FluxDev Studio.",
      "Les travaux réalisés jusqu'à la date de résiliation seront facturés au prorata.",
    ],
  },
  {
    title: "Confidentialité",
    content: [
      "Les parties s'engagent à maintenir confidentielles toutes les informations échangées dans le cadre du projet.",
      "Cette obligation de confidentialité perdure pendant 2 ans après la fin de la relation contractuelle.",
    ],
  },
  {
    title: "Droit applicable et litiges",
    content: [
      "Les présentes CGV sont soumises au droit béninois.",
      "En cas de litige, les parties s'engagent à rechercher une solution amiable.",
      "À défaut d'accord, les tribunaux de Cotonou (Bénin) seront seuls compétents.",
    ],
  },
  ],
  en: [
    { title: "Purpose and Scope", content: ["These General Terms of Sale (GTS) govern the contractual relationships between FluxDev Studio and its clients for any IT development, cybersecurity and consulting services.", "Any order implies unreserved acceptance of these GTS."] },
    { title: "Services Offered", content: ["FluxDev Studio offers the following services:", "• Website and web application development", "• Mobile application development (iOS, Android)", "• SaaS platform design and development", "• Cybersecurity audit and consulting", "• UI/UX design and mockup creation", "• Maintenance and technical support", "• Strategic support and consulting"] },
    { title: "Quote and Order", content: ["Every project is subject to a free, no-obligation detailed quote.", "The quote is valid for 30 days from its issue date.", "The order is considered firm and final after signing the quote and payment of the required deposit.", "Any modification to the order during execution will be subject to an amendment to the initial quote."] },
    { title: "Pricing and Payment", content: ["Prices are expressed in FCFA, excluding taxes.", "Unless otherwise stated, payment terms are as follows:", "• 40% upon order (deposit)", "• 30% upon validation of mockups or prototype", "• 30% upon final delivery", "Payments are made by bank transfer or any other agreed means.", "In case of late payment, late payment penalties will be applied at the legal rate in force."] },
    { title: "Delivery Times", content: ["Delivery times are indicated in the quote for information purposes.", "FluxDev Studio commits to implementing all necessary means to meet agreed deadlines.", "Deadlines may be extended in case of:", "• Delay in providing necessary elements by the client", "• Modifications requested by the client during the project", "• Force majeure", "Any delay attributable to the client shall not engage the responsibility of FluxDev Studio."] },
    { title: "Client Obligations", content: ["The client commits to:", "• Provide information and elements necessary for project completion", "• Validate intermediate stages within agreed deadlines", "• Pay invoices by due dates", "• Respect intellectual property rights", "• Inform FluxDev Studio of any difficulty or change"] },
    { title: "FluxDev Studio Obligations", content: ["FluxDev Studio commits to:", "• Perform services in accordance with the validated specifications", "• Inform the client of project progress", "• Maintain confidentiality of communicated information", "• Deliver professional quality work", "• Provide technical support during the warranty period"] },
    { title: "Intellectual Property", content: ["Unless otherwise agreed, the transfer of intellectual property of deliverables to the client is effective after full payment of the service.", "FluxDev Studio retains ownership of tools, methods and know-how developed or used in the project.", "The client authorizes FluxDev Studio to mention the project realization in its commercial references, unless otherwise requested in writing."] },
    { title: "Warranty and Maintenance", content: ["FluxDev Studio guarantees compliance of deliverables with specifications for a period of 3 months after delivery.", "This warranty covers correction of anomalies and malfunctions.", "The warranty does not cover:", "• Modifications made by the client or a third party", "• Problems related to the client's technical environment", "• Functional evolutions not provided for in the specifications", "A maintenance contract can be proposed to ensure follow-up beyond the warranty."] },
    { title: "Liability", content: ["FluxDev Studio's liability is limited to the amounts actually received for the service concerned.", "FluxDev Studio cannot be held responsible for indirect damages, loss of business or data.", "The client is solely responsible for the use made of deliverables and their suitability for their needs."] },
    { title: "Termination", content: ["In case of serious breach by one of the parties of its obligations, the other party may terminate the contract after formal notice remained without effect for 15 days.", "In case of termination by the client before the end of the project, amounts paid remain acquired by FluxDev Studio.", "Work completed up to the termination date will be invoiced pro rata."] },
    { title: "Confidentiality", content: ["The parties commit to keeping confidential all information exchanged within the project framework.", "This confidentiality obligation continues for 2 years after the end of the contractual relationship."] },
    { title: "Applicable Law and Disputes", content: ["These GTS are subject to Beninese law.", "In case of dispute, the parties commit to seeking an amicable solution.", "Failing agreement, the courts of Cotonou (Benin) will have sole jurisdiction."] },
  ],
};

export default function CGVPage() {
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
              {locale === "fr" ? "Conditions Générales de Vente" : "General Terms of Sale"}
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
              {locale === "fr" ? "Questions sur nos conditions de vente ?" : "Questions about our terms of sale?"}
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
