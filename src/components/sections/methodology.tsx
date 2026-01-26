"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/contexts";

const stepsData = {
  fr: [
    { num: "01", title: "Audit & Découverte", desc: "Nous analysons en profondeur vos besoins, votre marché cible, vos concurrents et vos contraintes techniques. Cet audit gratuit de 30 minutes permet de définir le périmètre exact du projet.", time: "1-2 jours", icon: "◎", deliverables: ["Rapport d'audit", "Analyse concurrentielle", "Recommandations techniques"] },
    { num: "02", title: "Conception & Design", desc: "Nos designers créent les maquettes Figma et prototypes interactifs. L'architecture technique est définie avec choix des technologies, schémas de base de données et spécifications API.", time: "1-2 sem.", icon: "◇", deliverables: ["Maquettes Figma", "Prototype cliquable", "Spécifications techniques"] },
    { num: "03", title: "Développement & Sécurité", desc: "Notre écosystème de 1500+ agents IA orchestre le développement. Chaque ligne de code est revue, testée et sécurisée. Tests automatisés, audit de sécurité et optimisation des performances.", time: "4-12 sem.", icon: "□", deliverables: ["Code source", "Tests automatisés", "Rapport de sécurité"] },
    { num: "04", title: "Production & Suivi", desc: "Déploiement sur votre infrastructure ou la nôtre. Monitoring 24/7, support technique et maintenance inclus le premier mois. Option d'équipe dédiée pour le suivi long terme.", time: "Continu", icon: "◈", deliverables: ["Déploiement", "Documentation", "Formation équipe"] },
  ],
  en: [
    { num: "01", title: "Audit & Discovery", desc: "We thoroughly analyze your needs, target market, competitors and technical constraints. This free 30-minute audit helps define the exact project scope.", time: "1-2 days", icon: "◎", deliverables: ["Audit report", "Competitive analysis", "Technical recommendations"] },
    { num: "02", title: "Design & Architecture", desc: "Our designers create Figma mockups and interactive prototypes. Technical architecture is defined with technology choices, database schemas and API specifications.", time: "1-2 weeks", icon: "◇", deliverables: ["Figma mockups", "Clickable prototype", "Technical specifications"] },
    { num: "03", title: "Development & Security", desc: "Our ecosystem of 1500+ AI agents orchestrates development. Every line of code is reviewed, tested and secured. Automated tests, security audit and performance optimization.", time: "4-12 weeks", icon: "□", deliverables: ["Source code", "Automated tests", "Security report"] },
    { num: "04", title: "Production & Support", desc: "Deployment on your infrastructure or ours. 24/7 monitoring, technical support and maintenance included the first month. Dedicated team option for long-term follow-up.", time: "Ongoing", icon: "◈", deliverables: ["Deployment", "Documentation", "Team training"] },
  ],
};

export function MethodologySection() {
  const { t, locale } = useLocale();
  const steps = stepsData[locale];
  
  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Cadre très fin blanc */}
      <div className="absolute inset-8 border-[0.5px] border-white/70 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="text-[11px] font-medium text-white/70 uppercase tracking-[0.3em]">
            {t("methodology.label")}
          </span>
          <h2 className="text-5xl lg:text-6xl font-light text-white mt-4">
            <span className="border-b-2 border-white pb-1">{t("methodology.title")}</span>
          </h2>
          <p className="text-white/70 mt-8 max-w-xl mx-auto">
            {t("methodology.subtitle")}
          </p>
        </motion.div>

        {/* Timeline horizontale */}
        <div className="relative">
          {/* Ligne de progression */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-px bg-white/10" />
          <div className="hidden lg:block absolute top-16 left-0 w-1/4 h-px bg-gradient-to-r from-white/30 to-white/10" />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative group"
              >
                {/* Numero et icone */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 border-2 border-white/20 flex items-center justify-center bg-black group-hover:border-white/40 transition-colors duration-300">
                      <span className="text-2xl text-white/30 group-hover:text-white/60 transition-colors">{step.icon}</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-black border border-white/20 flex items-center justify-center">
                      <span className="text-[10px] font-mono text-white/50">{step.num}</span>
                    </div>
                  </div>
                  <div className="lg:hidden flex-1 h-px bg-white/10" />
                </div>
                
                {/* Contenu */}
                <div className="space-y-3">
                  <h3 className="text-xl font-medium text-white group-hover:text-white/90 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed min-h-[80px]">
                    {step.desc}
                  </p>
                  
                  {/* Deliverables */}
                  <div className="space-y-1.5 pt-3 border-t border-white/[0.06]">
                    <div className="text-[10px] text-white/60 uppercase tracking-wider mb-2">{locale === "fr" ? "Livrables" : "Deliverables"}</div>
                    {step.deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-white/70">
                        <div className="w-1 h-1 bg-white/30" />
                        {item}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 pt-3">
                    <div className="w-8 h-px bg-white/20" />
                    <span className="text-xs text-white/60 uppercase tracking-wider">{step.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MethodologySection;
