"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { dashboardTranslations } from "@/lib/i18n/dashboard";

type Locale = "fr" | "en";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations: Record<Locale, Record<string, string>> = {
  fr: {
    // Header
    "nav.projects": "Projets",
    "nav.team": "Équipe",
    "nav.contact": "Contact",
    "nav.bookCall": "Prendre RDV",
    
    // Hero Section
    "hero.badge": "Studio de développement IA",
    "hero.title1": "Nous concevons",
    "hero.title2": "développons &",
    "hero.title3": "sécurisons",
    "hero.subtitle1": "De l'idée à la production : sites web, applications mobiles iOS/Android, solutions SaaS, logiciels desktop et systèmes IoT.",
    "hero.subtitle2": "Notre écosystème de 1500+ agents IA spécialisés orchestre chaque étape de votre projet. Expertise cybersécurité intégrée pour une protection de bout en bout.",
    "hero.cta1": "Démarrer un projet",
    "hero.cta2": "Nos réalisations",
    "hero.stat1.value": "1500+",
    "hero.stat1.label": "Agents IA actifs",
    "hero.stat1.desc": "Orchestration automatisée",
    "hero.stat2.value": "24h",
    "hero.stat2.label": "Délai de réponse",
    "hero.stat2.desc": "Audit gratuit inclus",
    "hero.stat3.value": "E2E",
    "hero.stat3.label": "Sécurité intégrée",
    "hero.stat3.desc": "Pentest & audit code",
    "hero.stat4.value": "360°",
    "hero.stat4.label": "Accompagnement",
    "hero.stat4.desc": "Dev, juridique, compta",
    "hero.projects": "50+ projets livrés cette année",
    
    // Services Section
    "services.label": "Nos expertises",
    "services.title": "Services",
    "services.subtitle": "De la conception à la production, une expertise complète.",
    "services.web.title": "Développement Web",
    "services.web.desc": "Sites vitrine, e-commerce, applications web complexes. Stack moderne : Next.js, React, Node.js avec optimisation SEO et performances.",
    "services.mobile.title": "Applications Mobile",
    "services.mobile.desc": "Applications natives iOS et Android ou cross-platform React Native. De la conception UX au déploiement sur les stores.",
    "services.saas.title": "Solutions SaaS",
    "services.saas.desc": "Plateformes cloud scalables avec architecture microservices. Gestion multi-tenant, facturation, analytics intégrés.",
    "services.desktop.title": "Logiciels Desktop",
    "services.desktop.desc": "Applications bureau pour Windows et macOS. Electron, .NET, ou natif selon vos besoins de performance.",
    "services.iot.title": "Systèmes IoT",
    "services.iot.desc": "Firmware embarqué, systèmes RTOS, et plateformes de gestion IoT. Du capteur au cloud.",
    "services.security.title": "Cybersécurité",
    "services.security.desc": "Audit de sécurité, tests d'intrusion, mise en place SOC. Protection de bout en bout de vos solutions.",
    "services.design.title": "Design UI/UX",
    "services.design.desc": "Maquettes Figma, prototypes interactifs, rendus 3D. Design system complet pour une cohérence visuelle.",
    "services.support.title": "Accompagnement 360°",
    "services.support.desc": "RSSI externalisé, comptabilité, conformité juridique RGPD. On gère tout pour que vous vous concentriez sur votre coeur de métier.",
    
    // Agents Section
    "agents.label": "Technologie",
    "agents.title": "1500+ agents",
    "agents.subtitle": "Notre écosystème d'agents IA spécialisés orchestre chaque projet.",
    "agents.categories": "Catégories",
    "agents.active": "Actifs",
    "agents.orchestration": "Orchestration",
    "agents.content": "Contenu",
    "agents.development": "Développement",
    "agents.security": "Sécurité",
    "agents.data": "Données",
    "agents.research": "Recherche",
    "agents.creative": "Créatif",
    
    // Methodology Section
    "methodology.label": "Notre processus",
    "methodology.title": "Méthodologie",
    "methodology.subtitle": "Une approche structurée pour transformer vos idées en solutions digitales performantes",
    "methodology.step1.title": "Audit & Découverte",
    "methodology.step1.desc": "Nous analysons en profondeur vos besoins, votre marché cible, vos concurrents et vos contraintes techniques. Cet audit gratuit de 30 minutes permet de définir le périmètre exact du projet.",
    "methodology.step1.duration": "1-2 jours",
    "methodology.step2.title": "Conception & Design",
    "methodology.step2.desc": "Nos designers créent les maquettes Figma et prototypes interactifs. L'architecture technique est définie avec choix des technologies, schémas de base de données et spécifications API.",
    "methodology.step2.duration": "1-2 sem.",
    "methodology.step3.title": "Développement & Sécurité",
    "methodology.step3.desc": "Notre écosystème de 1500+ agents IA orchestre le développement. Chaque ligne de code est revue, testée et sécurisée. Tests automatisés, audit de sécurité et optimisation des performances.",
    "methodology.step3.duration": "4-12 sem.",
    "methodology.step4.title": "Production & Suivi",
    "methodology.step4.desc": "Déploiement sur votre infrastructure ou la nôtre. Monitoring 24/7, support technique et maintenance inclus le premier mois. Option d'équipe dédiée pour le suivi long terme.",
    "methodology.step4.duration": "Continu",
    "methodology.deliverables": "Livrables",
    
    // Contact Section
    "contact.label": "Démarrer un projet",
    "contact.title": "Parlons de votre projet",
    "contact.subtitle": "Nous sommes disponibles uniquement sur rendez-vous. Contactez-nous pour un audit gratuit de 30 minutes où nous analysons ensemble vos besoins, objectifs et contraintes.",
    "contact.clients": "Particuliers, entreprises, gouvernements, ONG : nous accompagnons tous types de projets, de la startup au grand compte.",
    "contact.cta1": "Prendre rendez-vous",
    "contact.cta1.sub": "Gratuit, 30 min",
    "contact.cta2.sub": "Réponse 24h",
    "contact.online": "En ligne",
    "contact.noCommitment": "Sans engagement",
    
    // Footer
    "footer.cta.title": "Prêt à démarrer ?",
    "footer.cta.subtitle": "Audit gratuit de 30 minutes pour analyser votre projet.",
    "footer.cta.button": "Prendre rendez-vous",
    "footer.brand.desc": "Solutions digitales propulsées par l'intelligence artificielle. Développement, sécurité et innovation.",
    "footer.services": "Services",
    "footer.company": "Entreprise",
    "footer.legal": "Legal",
    "footer.contact": "Contact",
    "footer.response": "Réponse sous 24h",
    "footer.online": "En ligne",
    "footer.rights": "2026 FluxDev. Tous droits réservés.",
    "footer.location": "Cotonou, Bénin",
    "footer.payments": "Paiements sécurisés",
    
    // Common
    "common.agentsIA": "Agents IA",
    "common.projects": "Projets",
  },
  en: {
    // Header
    "nav.projects": "Projects",
    "nav.team": "Team",
    "nav.contact": "Contact",
    "nav.bookCall": "Book a Call",
    
    // Hero Section
    "hero.badge": "AI Development Studio",
    "hero.title1": "We design",
    "hero.title2": "develop &",
    "hero.title3": "secure",
    "hero.subtitle1": "From idea to production: websites, iOS/Android mobile apps, SaaS solutions, desktop software and IoT systems.",
    "hero.subtitle2": "Our ecosystem of 1500+ specialized AI agents orchestrates every step of your project. Integrated cybersecurity expertise for end-to-end protection.",
    "hero.cta1": "Start a project",
    "hero.cta2": "Our work",
    "hero.stat1.value": "1500+",
    "hero.stat1.label": "Active AI Agents",
    "hero.stat1.desc": "Automated orchestration",
    "hero.stat2.value": "24h",
    "hero.stat2.label": "Response time",
    "hero.stat2.desc": "Free audit included",
    "hero.stat3.value": "E2E",
    "hero.stat3.label": "Integrated security",
    "hero.stat3.desc": "Pentest & code audit",
    "hero.stat4.value": "360°",
    "hero.stat4.label": "Support",
    "hero.stat4.desc": "Dev, legal, accounting",
    "hero.projects": "50+ projects delivered this year",
    
    // Services Section
    "services.label": "Our expertise",
    "services.title": "Services",
    "services.subtitle": "From design to production, complete expertise.",
    "services.web.title": "Web Development",
    "services.web.desc": "Showcase sites, e-commerce, complex web applications. Modern stack: Next.js, React, Node.js with SEO and performance optimization.",
    "services.mobile.title": "Mobile Applications",
    "services.mobile.desc": "Native iOS and Android apps or cross-platform React Native. From UX design to store deployment.",
    "services.saas.title": "SaaS Solutions",
    "services.saas.desc": "Scalable cloud platforms with microservices architecture. Multi-tenant management, billing, integrated analytics.",
    "services.desktop.title": "Desktop Software",
    "services.desktop.desc": "Desktop applications for Windows and macOS. Electron, .NET, or native based on your performance needs.",
    "services.iot.title": "IoT Systems",
    "services.iot.desc": "Embedded firmware, RTOS systems, and IoT management platforms. From sensor to cloud.",
    "services.security.title": "Cybersecurity",
    "services.security.desc": "Security audit, penetration testing, SOC implementation. End-to-end protection for your solutions.",
    "services.design.title": "UI/UX Design",
    "services.design.desc": "Figma mockups, interactive prototypes, 3D renders. Complete design system for visual consistency.",
    "services.support.title": "360° Support",
    "services.support.desc": "Outsourced CISO, accounting, GDPR legal compliance. We handle everything so you can focus on your core business.",
    
    // Agents Section
    "agents.label": "Technology",
    "agents.title": "1500+ agents",
    "agents.subtitle": "Our ecosystem of specialized AI agents orchestrates each project.",
    "agents.categories": "Categories",
    "agents.active": "Active",
    "agents.orchestration": "Orchestration",
    "agents.content": "Content",
    "agents.development": "Development",
    "agents.security": "Security",
    "agents.data": "Data",
    "agents.research": "Research",
    "agents.creative": "Creative",
    
    // Methodology Section
    "methodology.label": "Our process",
    "methodology.title": "Methodology",
    "methodology.subtitle": "A structured approach to transform your ideas into high-performance digital solutions",
    "methodology.step1.title": "Audit & Discovery",
    "methodology.step1.desc": "We deeply analyze your needs, target market, competitors and technical constraints. This free 30-minute audit helps define the exact project scope.",
    "methodology.step1.duration": "1-2 days",
    "methodology.step2.title": "Design & Conception",
    "methodology.step2.desc": "Our designers create Figma mockups and interactive prototypes. Technical architecture is defined with technology choices, database schemas and API specifications.",
    "methodology.step2.duration": "1-2 weeks",
    "methodology.step3.title": "Development & Security",
    "methodology.step3.desc": "Our ecosystem of 1500+ AI agents orchestrates development. Every line of code is reviewed, tested and secured. Automated tests, security audit and performance optimization.",
    "methodology.step3.duration": "4-12 weeks",
    "methodology.step4.title": "Production & Monitoring",
    "methodology.step4.desc": "Deployment on your infrastructure or ours. 24/7 monitoring, technical support and maintenance included for the first month. Dedicated team option for long-term follow-up.",
    "methodology.step4.duration": "Ongoing",
    "methodology.deliverables": "Deliverables",
    
    // Contact Section
    "contact.label": "Start a project",
    "contact.title": "Let's talk about your project",
    "contact.subtitle": "We are available by appointment only. Contact us for a free 30-minute audit where we analyze your needs, goals and constraints together.",
    "contact.clients": "Individuals, businesses, governments, NGOs: we support all types of projects, from startups to large corporations.",
    "contact.cta1": "Book an appointment",
    "contact.cta1.sub": "Free, 30 min",
    "contact.cta2.sub": "Response 24h",
    "contact.online": "Online",
    "contact.noCommitment": "No commitment",
    
    // Footer
    "footer.cta.title": "Ready to start?",
    "footer.cta.subtitle": "Free 30-minute audit to analyze your project.",
    "footer.cta.button": "Book an appointment",
    "footer.brand.desc": "Digital solutions powered by artificial intelligence. Development, security and innovation.",
    "footer.services": "Services",
    "footer.company": "Company",
    "footer.legal": "Legal",
    "footer.contact": "Contact",
    "footer.response": "Response within 24h",
    "footer.online": "Online",
    "footer.rights": "2026 FluxDev. All rights reserved.",
    "footer.location": "Cotonou, Benin",
    "footer.payments": "Secure payments",
    
    // Common
    "common.agentsIA": "AI Agents",
    "common.projects": "Projects",
  },
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "fr";
    const savedLocale = localStorage.getItem("fluxdev-locale") as Locale | null;
    if (savedLocale && (savedLocale === "fr" || savedLocale === "en")) {
      return savedLocale;
    }
    return navigator.language.startsWith("fr") ? "fr" : "en";
  });
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("fluxdev-locale", newLocale);
    }
  };

  const t = (key: string): string => {
    return translations[locale][key] || dashboardTranslations[locale][key] || key;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
