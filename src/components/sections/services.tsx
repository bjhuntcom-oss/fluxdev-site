"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/contexts";

const servicesData = {
  fr: [
    { number: "01", title: "Développement Web", desc: "Sites vitrine, e-commerce, applications web complexes. Stack moderne : Next.js, React, Node.js avec optimisation SEO et performances.", icon: "◈", details: ["Sites vitrine & corporate", "E-commerce sur mesure", "Applications web SPA/SSR", "API REST & GraphQL"] },
    { number: "02", title: "Applications Mobile", desc: "Applications natives iOS et Android ou cross-platform React Native. De la conception UX au déploiement sur les stores.", icon: "◇", details: ["iOS natif (Swift)", "Android natif (Kotlin)", "React Native cross-platform", "Publication App Store & Play Store"] },
    { number: "03", title: "Solutions SaaS", desc: "Plateformes cloud scalables avec architecture microservices. Gestion multi-tenant, facturation, analytics intégrés.", icon: "□", details: ["Architecture microservices", "Multi-tenancy", "Système de facturation", "Dashboard analytics"] },
    { number: "04", title: "Logiciels Desktop", desc: "Applications bureau pour Windows et macOS. Electron, .NET, ou natif selon vos besoins de performance.", icon: "▣", details: ["Windows (.NET, Electron)", "macOS (Swift, Electron)", "Cross-platform", "Auto-update intégré"] },
    { number: "05", title: "Systèmes IoT", desc: "Firmware embarqué, systèmes RTOS, et plateformes de gestion IoT. Du capteur au cloud.", icon: "◎", details: ["Firmware embarqué", "Systèmes RTOS", "Protocoles IoT (MQTT, CoAP)", "Plateforme de gestion"] },
    { number: "06", title: "Cybersécurité", desc: "Audit de sécurité, tests d'intrusion, mise en place SOC. Protection de bout en bout de vos solutions.", icon: "◉", details: ["Audit & pentest", "Sécurisation code", "Mise en place SOC", "Formation équipes"] },
    { number: "07", title: "Design UI/UX", desc: "Maquettes Figma, prototypes interactifs, rendus 3D. Design system complet pour une cohérence visuelle.", icon: "◐", details: ["Maquettes Figma", "Prototypes interactifs", "Rendus 3D", "Design system"] },
    { number: "08", title: "Accompagnement 360°", desc: "RSSI externalisé, comptabilité, conformité juridique RGPD. On gère tout pour que vous vous concentriez sur votre coeur de métier.", icon: "◑", details: ["RSSI externalisé", "Comptabilité & fiscalité", "Conformité RGPD", "Support juridique"] },
  ],
  en: [
    { number: "01", title: "Web Development", desc: "Showcase sites, e-commerce, complex web applications. Modern stack: Next.js, React, Node.js with SEO and performance optimization.", icon: "◈", details: ["Showcase & corporate sites", "Custom e-commerce", "SPA/SSR web apps", "API REST & GraphQL"] },
    { number: "02", title: "Mobile Applications", desc: "Native iOS and Android apps or cross-platform React Native. From UX design to store deployment.", icon: "◇", details: ["Native iOS (Swift)", "Native Android (Kotlin)", "React Native cross-platform", "Publication App Store & Play Store"] },
    { number: "03", title: "SaaS Solutions", desc: "Scalable cloud platforms with microservices architecture. Multi-tenant management, billing, integrated analytics.", icon: "□", details: ["Microservices architecture", "Multi-tenancy", "Billing system", "Dashboard analytics"] },
    { number: "04", title: "Desktop Software", desc: "Desktop applications for Windows and macOS. Electron, .NET, or native based on your performance needs.", icon: "▣", details: ["Windows (.NET, Electron)", "macOS (Swift, Electron)", "Cross-platform", "Auto-update integrated"] },
    { number: "05", title: "IoT Systems", desc: "Embedded firmware, RTOS systems, and IoT management platforms. From sensor to cloud.", icon: "◎", details: ["Embedded firmware", "RTOS systems", "IoT protocols (MQTT, CoAP)", "Management platform"] },
    { number: "06", title: "Cybersecurity", desc: "Security audits, penetration testing, SOC implementation. End-to-end protection of your solutions.", icon: "◉", details: ["Audit & pentest", "Code security", "SOC implementation", "Team training"] },
    { number: "07", title: "UI/UX Design", desc: "Figma mockups, interactive prototypes, 3D renders. Complete design system for visual consistency.", icon: "◐", details: ["Figma mockups", "Interactive prototypes", "3D renders", "Design system"] },
    { number: "08", title: "360° Support", desc: "Outsourced CISO, accounting, GDPR legal compliance. We handle everything so you can focus on your core business.", icon: "◑", details: ["Outsourced CISO", "Accounting & tax", "GDPR compliance", "Legal support"] },
  ],
};

export function ServicesSection() {
  const { t, locale } = useLocale();
  const services = servicesData[locale];
  
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Cadre fin blanc */}
      <div className="absolute inset-8 border-[0.5px] border-white/70 pointer-events-none" />
      
      {/* Grille papier millimetre - limitée au cadre */}
      <div className="absolute inset-8 pointer-events-none overflow-hidden">
        {/* Lignes verticales fines */}
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.06) 39px, rgba(255,255,255,0.06) 40px)`,
        }} />
        {/* Lignes horizontales fines */}
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.06) 39px, rgba(255,255,255,0.06) 40px)`,
        }} />
        {/* Lignes principales verticales */}
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 199px, rgba(255,255,255,0.12) 199px, rgba(255,255,255,0.12) 200px)`,
        }} />
        {/* Lignes principales horizontales */}
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 199px, rgba(255,255,255,0.12) 199px, rgba(255,255,255,0.12) 200px)`,
        }} />
      </div>
      
      {/* Cadre Services - double traits */}
      <div className="absolute inset-6 border border-white/10 pointer-events-none" />
      <div className="absolute inset-10 border border-white/10 pointer-events-none" />
      
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-white/70 uppercase tracking-[0.2em]">
                {t("services.label")}
              </span>
              <h2 className="text-4xl lg:text-5xl font-light text-white mt-2">
                {t("services.title")}
              </h2>
            </div>
            <div className="hidden lg:block text-right max-w-xs">
              <p className="text-sm text-white/80 leading-relaxed">
                {t("services.subtitle")}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group relative bg-black/50 backdrop-blur-sm border border-white/[0.08] p-6 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(255,255,255,0.08),inset_0_0_20px_rgba(255,255,255,0.02)]"
            >
              {/* Cadre carré lumineux au hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-2 border border-white/20" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.02]" />
              </div>
              
              {/* Coins lumineux au hover */}
              <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-transparent group-hover:border-white/40 transition-all duration-300" />
              <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-transparent group-hover:border-white/40 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-transparent group-hover:border-white/40 transition-all duration-300" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-transparent group-hover:border-white/40 transition-all duration-300" />
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl text-white/20 group-hover:text-white/40 transition-colors">{service.icon}</span>
                <span className="text-[10px] text-white/30 font-mono border border-white/10 px-2 py-0.5">{service.number}</span>
              </div>
              <h3 className="text-base font-medium text-white mb-3 group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-xs text-white/70 leading-relaxed mb-4 group-hover:text-white/80 transition-colors min-h-[60px]">
                {service.desc}
              </p>
              
              {/* Liste des détails */}
              <div className="space-y-1.5 pt-3 border-t border-white/[0.06]">
                {service.details.slice(0, 3).map((detail, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px] text-white/60 group-hover:text-white/70 transition-colors">
                    <div className="w-1 h-1 bg-white/20" />
                    {detail}
                  </div>
                ))}
              </div>
              
              {/* Ligne indicateur bas */}
              <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/20 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
