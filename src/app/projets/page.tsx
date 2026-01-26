"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Lock, X } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/contexts";

const projectSlugs: Record<number, string> = {
  1: "ecommerce-luxe",
  2: "app-bancaire",
  3: "dashboard-analytics",
  5: "portail-citoyens",
  6: "app-telemedecine",
  7: "crm-ia",
  9: "marketplace-b2b",
  10: "app-logistique",
  11: "plateforme-sirh",
  13: "agence-immobiliere",
  14: "app-fidelite",
  15: "plateforme-elearning",
};

const categoriesData = {
  fr: ["Tous", "Web", "Mobile", "SaaS", "Sécurité"],
  en: ["All", "Web", "Mobile", "SaaS", "Security"],
};

const projectsData = {
  fr: [
    { id: 1, title: "E-commerce Luxe International", cat: "Web", year: "2025", tags: ["Next.js", "Stripe", "Headless CMS"], desc: "Plateforme e-commerce multi-devises pour marque de luxe. Gestion de stock temps réel, paiements internationaux et livraison mondiale.", client: "Marque de luxe" },
    { id: 2, title: "Application Bancaire Mobile", cat: "Mobile", year: "2025", tags: ["React Native", "Biométrie", "PSD2"], desc: "App bancaire sécurisée avec authentification biométrique, virements instantanés et gestion de budget IA.", client: "Institution financière" },
    { id: 3, title: "Dashboard Analytics IA", cat: "SaaS", year: "2025", tags: ["React", "D3.js", "Machine Learning"], desc: "Plateforme d'analyse prédictive avec visualisations temps réel et recommandations automatisées par IA.", client: "Groupe industriel" },
    { id: 4, title: "Audit Sécurité Gouvernemental", cat: "Sécurité", year: "2024", tags: ["Pentest", "ISO 27001", "RGPD"], desc: "Audit complet de l'infrastructure IT d'un ministère. Tests d'intrusion, analyse de vulnérabilités et plan de remédiation.", client: "Gouvernement" },
    { id: 5, title: "Portail Services Citoyens", cat: "Web", year: "2024", tags: ["Next.js", "SSO", "Accessibilité"], desc: "Guichet unique numérique pour démarches administratives. Authentification FranceConnect et accessibilité RGAA.", client: "Collectivité territoriale" },
    { id: 6, title: "App Télémédecine", cat: "Mobile", year: "2024", tags: ["Flutter", "WebRTC", "HDS"], desc: "Application de téléconsultation médicale avec visio HD, ordonnances électroniques et dossier patient sécurisé.", client: "Groupe hospitalier" },
    { id: 7, title: "CRM Augmenté par IA", cat: "SaaS", year: "2024", tags: ["AI", "API", "Salesforce"], desc: "CRM intelligent avec scoring prédictif, automatisation des relances et analyse sentimentale des échanges.", client: "Scale-up B2B" },
    { id: 8, title: "Sécurisation Infrastructure Cloud", cat: "Sécurité", year: "2024", tags: ["AWS", "Zero Trust", "SIEM"], desc: "Migration sécurisée vers le cloud avec architecture Zero Trust, monitoring SOC 24/7 et conformité.", client: "Entreprise" },
    { id: 9, title: "Marketplace B2B Industrielle", cat: "Web", year: "2023", tags: ["React", "Elasticsearch", "ERP"], desc: "Place de marché pour pièces industrielles avec recherche avancée, devis automatisés et intégration ERP.", client: "Groupe industriel" },
    { id: 10, title: "App Logistique Last-Mile", cat: "Mobile", year: "2023", tags: ["React Native", "Maps", "IoT"], desc: "Application livreurs avec optimisation de tournées IA, tracking temps réel et preuve de livraison photo.", client: "Startup logistique" },
    { id: 11, title: "Plateforme SIRH Complète", cat: "SaaS", year: "2023", tags: ["HR Tech", "Paie", "Formation"], desc: "Suite RH complète : recrutement, onboarding, paie, congés, entretiens et formation en ligne.", client: "ETI 500+ salariés" },
    { id: 12, title: "Audit Conformité Fintech", cat: "Sécurité", year: "2023", tags: ["PCI-DSS", "KYC", "AML"], desc: "Mise en conformité PCI-DSS niveau 1 pour plateforme de paiement. Audit KYC/AML et certification.", client: "Fintech" },
    { id: 13, title: "Site Vitrine Agence Immobilière", cat: "Web", year: "2023", tags: ["Next.js", "3D", "VR"], desc: "Site immobilier premium avec visites virtuelles 3D, estimation IA et prise de RDV automatisée.", client: "Agence immobilière" },
    { id: 14, title: "App Fidélité Retail", cat: "Mobile", year: "2023", tags: ["iOS", "Android", "NFC"], desc: "Programme de fidélité omnicanal avec wallet digital, offres personnalisées et paiement sans contact.", client: "Chaîne de magasins" },
    { id: 15, title: "Plateforme E-learning", cat: "SaaS", year: "2023", tags: ["LMS", "Video", "Certification"], desc: "LMS entreprise avec parcours adaptatifs, classes virtuelles, quiz interactifs et certifications.", client: "Organisme de formation" },
    { id: 16, title: "SOC as a Service", cat: "Sécurité", year: "2023", tags: ["SIEM", "EDR", "Threat Intel"], desc: "Centre de sécurité opérationnel externalisé avec détection 24/7, réponse aux incidents et reporting.", client: "PME multi-sites" },
  ],
  en: [
    { id: 1, title: "International Luxury E-commerce", cat: "Web", year: "2025", tags: ["Next.js", "Stripe", "Headless CMS"], desc: "Multi-currency e-commerce platform for luxury brand. Real-time inventory management, international payments and worldwide delivery.", client: "Luxury brand" },
    { id: 2, title: "Mobile Banking App", cat: "Mobile", year: "2025", tags: ["React Native", "Biometrics", "PSD2"], desc: "Secure banking app with biometric authentication, instant transfers and AI budget management.", client: "Financial institution" },
    { id: 3, title: "AI Analytics Dashboard", cat: "SaaS", year: "2025", tags: ["React", "D3.js", "Machine Learning"], desc: "Predictive analytics platform with real-time visualizations and AI-automated recommendations.", client: "Industrial group" },
    { id: 4, title: "Government Security Audit", cat: "Security", year: "2024", tags: ["Pentest", "ISO 27001", "GDPR"], desc: "Complete IT infrastructure audit for a ministry. Penetration testing, vulnerability analysis and remediation plan.", client: "Government" },
    { id: 5, title: "Citizen Services Portal", cat: "Web", year: "2024", tags: ["Next.js", "SSO", "Accessibility"], desc: "One-stop digital portal for administrative procedures. SSO authentication and accessibility compliance.", client: "Local government" },
    { id: 6, title: "Telemedicine App", cat: "Mobile", year: "2024", tags: ["Flutter", "WebRTC", "HDS"], desc: "Medical teleconsultation app with HD video, electronic prescriptions and secure patient records.", client: "Hospital group" },
    { id: 7, title: "AI-Enhanced CRM", cat: "SaaS", year: "2024", tags: ["AI", "API", "Salesforce"], desc: "Intelligent CRM with predictive scoring, automated follow-ups and sentiment analysis.", client: "B2B Scale-up" },
    { id: 8, title: "Cloud Infrastructure Security", cat: "Security", year: "2024", tags: ["AWS", "Zero Trust", "SIEM"], desc: "Secure cloud migration with Zero Trust architecture, 24/7 SOC monitoring and compliance.", client: "Enterprise" },
    { id: 9, title: "Industrial B2B Marketplace", cat: "Web", year: "2023", tags: ["React", "Elasticsearch", "ERP"], desc: "Marketplace for industrial parts with advanced search, automated quotes and ERP integration.", client: "Industrial group" },
    { id: 10, title: "Last-Mile Logistics App", cat: "Mobile", year: "2023", tags: ["React Native", "Maps", "IoT"], desc: "Delivery driver app with AI route optimization, real-time tracking and photo proof of delivery.", client: "Logistics startup" },
    { id: 11, title: "Complete HRIS Platform", cat: "SaaS", year: "2023", tags: ["HR Tech", "Payroll", "Training"], desc: "Complete HR suite: recruitment, onboarding, payroll, leave, reviews and online training.", client: "500+ employee company" },
    { id: 12, title: "Fintech Compliance Audit", cat: "Security", year: "2023", tags: ["PCI-DSS", "KYC", "AML"], desc: "PCI-DSS Level 1 compliance for payment platform. KYC/AML audit and certification.", client: "Fintech" },
    { id: 13, title: "Real Estate Agency Website", cat: "Web", year: "2023", tags: ["Next.js", "3D", "VR"], desc: "Premium real estate site with 3D virtual tours, AI valuation and automated booking.", client: "Real estate agency" },
    { id: 14, title: "Retail Loyalty App", cat: "Mobile", year: "2023", tags: ["iOS", "Android", "NFC"], desc: "Omnichannel loyalty program with digital wallet, personalized offers and contactless payment.", client: "Retail chain" },
    { id: 15, title: "E-learning Platform", cat: "SaaS", year: "2023", tags: ["LMS", "Video", "Certification"], desc: "Enterprise LMS with adaptive learning paths, virtual classrooms, interactive quizzes and certifications.", client: "Training organization" },
    { id: 16, title: "SOC as a Service", cat: "Security", year: "2023", tags: ["SIEM", "EDR", "Threat Intel"], desc: "Outsourced security operations center with 24/7 detection, incident response and reporting.", client: "Multi-site SMB" },
  ],
};

export default function ProjectsPage() {
  const { locale } = useLocale();
  const categories = categoriesData[locale];
  const projects = projectsData[locale];
  const [activeIndex, setActiveIndex] = useState(0);
  const [showConfidentialModal, setShowConfidentialModal] = useState(false);
  const [selectedSecurityProject, setSelectedSecurityProject] = useState<typeof projects[0] | null>(null);
  
  // Security project IDs (4, 8, 12, 16)
  const securityProjectIds = [4, 8, 12, 16];
  const active = categories[activeIndex];
  const catMap: Record<string, string> = { "Web": "Web", "Mobile": "Mobile", "SaaS": "SaaS", "Sécurité": "Security", "Security": "Security" };
  const filtered = activeIndex === 0 ? projects : projects.filter((p) => catMap[p.cat] === catMap[active]);

  const handleSecurityProjectClick = (project: typeof projects[0]) => {
    setSelectedSecurityProject(project);
    setShowConfidentialModal(true);
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Modal Projet Confidentiel */}
      <AnimatePresence>
        {showConfidentialModal && selectedSecurityProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowConfidentialModal(false)}
          >
            <div className="absolute inset-0 bg-black/95" />
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-[#0c0c0c] border border-[#2a1515]"
            >
              <div className="border-b border-[#2a1515] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock className="w-4 h-4 text-[#8b3030]" />
                  <span className="text-[10px] text-[#a04040] uppercase tracking-[0.15em] font-mono">CONFIDENTIEL</span>
                </div>
                <button onClick={() => setShowConfidentialModal(false)} className="text-white/30 hover:text-white/60 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-sm font-medium text-white/90 mb-3">{selectedSecurityProject.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed mb-4">
                  {locale === "fr" 
                    ? "Ce projet est soumis à des accords de confidentialité. Les détails ne peuvent être divulgués."
                    : "This project is under confidentiality agreements. Details cannot be disclosed."
                  }
                </p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {selectedSecurityProject.tags.map((tag) => (
                    <span key={tag} className="text-[9px] text-[#904545] px-2 py-0.5 border border-[#3a2020] bg-[#1a0e0e]">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-[9px] text-white/20 font-mono">ACCÈS RESTREINT</span>
                  <button onClick={() => setShowConfidentialModal(false)} className="text-[10px] text-white/40 hover:text-white/60 transition-colors">
                    {locale === "fr" ? "Fermer" : "Close"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

            
      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        {/* Cadre hero coherent */}
        <div className="absolute inset-x-4 lg:inset-x-8 top-24 bottom-4 border border-white/15 pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8"
          >
            <div>
              <span className="text-[11px] font-medium text-white/70 uppercase tracking-[0.2em]">
                Portfolio
              </span>
              <h1 className="text-5xl lg:text-6xl font-light text-white mt-2">
                {locale === "fr" ? "Réalisations" : "Our Work"}
              </h1>
            </div>
            <p className="text-sm text-white/70 max-w-sm leading-relaxed lg:text-right">
              {locale === "fr" ? "Sélection de projets pour entreprises, gouvernements et particuliers." : "Selection of projects for businesses, governments and individuals."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-black/80 backdrop-blur-sm border-y border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {categories.map((cat, idx) => (
                <button
                  key={cat}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                    active === cat
                      ? "bg-white text-black"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="text-xs text-white/80">
              <span className="text-white/80">{filtered.length}</span> {locale === "fr" ? "projets" : "projects"}
            </span>
          </div>
        </div>
      </section>

      {/* Projects Grid - Style Tableau Encadre */}
      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          {/* Cadre principal du tableau */}
          <div className="relative border-2 border-white/20">
            {/* Coins decoratifs du cadre principal */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-white/50" />
            <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-white/50" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-white/50" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-white/50" />
            
            {/* En-tete du tableau */}
            <div className="border-b border-white/20 px-6 py-4 bg-white/[0.02]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-white/50 font-mono">INDEX</span>
                  <div className="w-px h-4 bg-white/20" />
                  <span className="text-xs text-white/50 uppercase tracking-wider">{locale === "fr" ? "Projets" : "Projects"}</span>
                </div>
                <span className="text-xs text-white/40 font-mono">{filtered.length} {locale === "fr" ? "entrées" : "entries"}</span>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="group/grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((project, index) => {
                  const slug = projectSlugs[project.id];
                  const CardContent = (
                    <>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-white/60 font-mono px-2 py-1 border border-white/15 bg-white/[0.02]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="w-6 h-px bg-white/20" />
                        </div>
                        <ArrowUpRight className={`w-4 h-4 transition-colors ${slug ? "text-white/40 group-hover/card:text-white" : "text-white/20 group-hover/card:text-white/60"}`} />
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] text-white/80 px-2 py-1 border border-white/15 uppercase bg-white/[0.02]">
                          {project.cat}
                        </span>
                        <span className="text-[10px] text-white/60">{project.year}</span>
                        {slug && <span className="text-[10px] text-white/40 px-1.5 py-0.5 border border-white/10 bg-white/[0.02]">{locale === "fr" ? "Voir" : "View"}</span>}
                      </div>

                      <h3 className="text-base font-medium text-white mb-2 group-hover/card:text-white/90">
                        {project.title}
                      </h3>
                      
                      <p className="text-xs text-white/70 leading-relaxed mb-3 min-h-[40px]">
                        {project.desc}
                      </p>
                      
                      <div className="text-[10px] text-white/70 mb-3">
                        {locale === "fr" ? "Client" : "Client"} : <span className="text-white/90">{project.client}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-[10px] text-white/60 px-1.5 py-0.5 border border-white/[0.08] bg-white/[0.02]">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-transparent group-hover/card:border-white/30 transition-colors" />
                    </>
                  );

                  const isSecurityProject = securityProjectIds.includes(project.id);
                  
                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      className={`group/card relative p-6 border transition-all duration-300 ease-out delay-150 group-hover/grid:opacity-50 group-hover/grid:scale-[0.99] hover:!opacity-100 hover:!scale-100 hover:!delay-0 hover:z-10 ${isSecurityProject ? "border-[#2a1515] hover:bg-[#150a0a] hover:border-[#3a2020]" : "border-white/30 hover:bg-white/[0.06] hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]"} ${slug || isSecurityProject ? "cursor-pointer" : ""}`}
                      onClick={isSecurityProject ? () => handleSecurityProjectClick(project) : undefined}
                    >
                      {slug && !isSecurityProject ? (
                        <Link href={`/projets/${slug}`} className="absolute inset-0 z-10" />
                      ) : null}
                      {CardContent}
                      {isSecurityProject && (
                        <Lock className="absolute top-3 right-3 w-3 h-3 text-[#6a3030]" />
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
            
            {/* Pied du tableau */}
            <div className="border-t border-white/20 px-6 py-3 bg-white/[0.01]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/40 uppercase tracking-wider">FluxDev Portfolio</span>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500/60" />
                  <span className="text-[10px] text-white/40">{locale === "fr" ? "Actif" : "Active"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {(locale === "fr" ? [
              { num: "50+", label: "Projets livrés" },
              { num: "98%", label: "Satisfaction" },
              { num: "24h", label: "Support" },
              { num: "4", label: "Pays" },
            ] : [
              { num: "50+", label: "Projects delivered" },
              { num: "98%", label: "Satisfaction" },
              { num: "24h", label: "Support" },
              { num: "4", label: "Countries" },
            ]).map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="text-3xl font-light text-white mb-1">{stat.num}</div>
                <div className="text-xs text-white/60 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
