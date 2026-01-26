"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/contexts";

const categoriesData = {
  fr: [
    { name: "Orchestration", agents: [{ name: "NEXUS", role: "Chef d'orchestre principal" }, { name: "SYNAPSE", role: "Routage intelligent des tâches" }, { name: "PULSE", role: "Monitoring temps réel" }] },
    { name: "Contenu", agents: [{ name: "SCRIBE", role: "Rédaction technique" }, { name: "LEXICON", role: "SEO & mots-clés" }, { name: "NARRATOR", role: "Storytelling & UX writing" }] },
    { name: "Développement", agents: [{ name: "FORGE", role: "Backend & API" }, { name: "CIPHER", role: "Algorithmes & logique" }, { name: "PIXEL", role: "Frontend & UI" }, { name: "BRIDGE", role: "Intégration & DevOps" }] },
    { name: "Sécurité", agents: [{ name: "SENTINEL", role: "Analyse vulnérabilités" }, { name: "GUARDIAN", role: "Protection runtime" }, { name: "PHANTOM", role: "Tests d'intrusion" }] },
    { name: "Qualité", agents: [{ name: "INSPECTOR", role: "Review de code" }, { name: "BENCHMARK", role: "Tests de performance" }, { name: "VALIDATOR", role: "Tests fonctionnels" }] },
    { name: "Analytics", agents: [{ name: "CRAWLER", role: "Extraction de données" }, { name: "INSIGHT", role: "Analyse prédictive" }] },
    { name: "Recherche", agents: [{ name: "SCOUT", role: "Veille concurrents" }, { name: "ORACLE", role: "Tendances marché" }] },
    { name: "Créatif", agents: [{ name: "CANVAS", role: "UI/UX design" }, { name: "PRISM", role: "Identité visuelle" }, { name: "RENDER", role: "3D & animations" }] },
  ],
  en: [
    { name: "Orchestration", agents: [{ name: "NEXUS", role: "Main conductor" }, { name: "SYNAPSE", role: "Intelligent task routing" }, { name: "PULSE", role: "Real-time monitoring" }] },
    { name: "Content", agents: [{ name: "SCRIBE", role: "Technical writing" }, { name: "LEXICON", role: "SEO & keywords" }, { name: "NARRATOR", role: "Storytelling & UX writing" }] },
    { name: "Development", agents: [{ name: "FORGE", role: "Backend & API" }, { name: "CIPHER", role: "Algorithms & logic" }, { name: "PIXEL", role: "Frontend & UI" }, { name: "BRIDGE", role: "Integration & DevOps" }] },
    { name: "Security", agents: [{ name: "SENTINEL", role: "Vulnerability analysis" }, { name: "GUARDIAN", role: "Runtime protection" }, { name: "PHANTOM", role: "Penetration testing" }] },
    { name: "Quality", agents: [{ name: "INSPECTOR", role: "Code review" }, { name: "BENCHMARK", role: "Performance testing" }, { name: "VALIDATOR", role: "Functional testing" }] },
    { name: "Analytics", agents: [{ name: "CRAWLER", role: "Data extraction" }, { name: "INSIGHT", role: "Predictive analysis" }] },
    { name: "Research", agents: [{ name: "SCOUT", role: "Competitor watch" }, { name: "ORACLE", role: "Market trends" }] },
    { name: "Creative", agents: [{ name: "CANVAS", role: "UI/UX design" }, { name: "PRISM", role: "Visual identity" }, { name: "RENDER", role: "3D & animations" }] },
  ],
};

export function AgentsSection() {
  const { t, locale } = useLocale();
  const categories = categoriesData[locale];
  
  return (
    <section className="relative py-20 bg-black">
      {/* Cadre Agents - avec lueur */}
      <div className="absolute inset-8 border border-white/20 shadow-[0_0_30px_-5px_rgba(255,255,255,0.15),inset_0_0_30px_-5px_rgba(255,255,255,0.05)] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Colonne gauche - Titre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[11px] font-medium text-white/40 uppercase tracking-[0.2em]">
              {t("agents.label")}
            </span>
            <h2 className="text-4xl lg:text-5xl font-light text-white mt-2 mb-4">
              {t("agents.title")}
            </h2>
            <p className="text-sm text-white/50 leading-relaxed">
              {t("agents.subtitle")}
            </p>
            
            <div className="mt-8 flex gap-8">
              <div>
                <div className="text-2xl font-light text-white">8</div>
                <div className="text-[10px] text-white/40 uppercase">{t("agents.categories")}</div>
              </div>
              <div>
                <div className="text-2xl font-light text-white">24/7</div>
                <div className="text-[10px] text-white/40 uppercase">{t("agents.active")}</div>
              </div>
            </div>
          </motion.div>

          {/* Colonnes droites - Categories */}
          <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="border-l border-white/[0.06] pl-4"
              >
                <div className="text-[10px] text-white/60 uppercase tracking-wider mb-3">
                  {cat.name}
                </div>
                <div className="space-y-2">
                  {cat.agents.map((agent) => (
                    <div key={agent.name} className="group/agent">
                      <div className="text-xs text-white/80 font-mono">{agent.name}</div>
                      <div className="text-[9px] text-white/60 group-hover/agent:text-white/70 transition-colors">{agent.role}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AgentsSection;
