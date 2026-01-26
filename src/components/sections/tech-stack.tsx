"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/contexts";

const techStackData = {
  fr: {
    categories: [
      { 
        name: "Frontend", 
        desc: "Interfaces réactives et performantes",
        techs: [
          { name: "Next.js 14", detail: "SSR, App Router, RSC" },
          { name: "React 18", detail: "Composants, Hooks" },
          { name: "TypeScript", detail: "Typage strict" },
          { name: "Tailwind CSS", detail: "Styling utility-first" },
        ]
      },
      { 
        name: "Backend", 
        desc: "APIs robustes et scalables",
        techs: [
          { name: "Node.js", detail: "Runtime JavaScript" },
          { name: "Python", detail: "ML, Automation" },
          { name: "GraphQL", detail: "API flexible" },
          { name: "tRPC", detail: "End-to-end typesafe" },
        ]
      },
      { 
        name: "Infrastructure", 
        desc: "Déploiement et monitoring",
        techs: [
          { name: "AWS / GCP", detail: "Cloud providers" },
          { name: "Docker", detail: "Containerisation" },
          { name: "Kubernetes", detail: "Orchestration" },
          { name: "Vercel", detail: "Edge deployment" },
        ]
      },
    ],
    agents: {
      title: "Agents IA Propriétaires",
      subtitle: "Plus de 1500 agents IA développés en interne, coordonnés et supervisés par nos experts humains. Chaque agent est contrôlé, audité et optimisé par notre équipe technique.",
      categories: [
        { 
          name: "Orchestration", 
          desc: "Coordination et routage intelligent",
          agents: [
            { name: "NEXUS", role: "Chef d'orchestre principal" },
            { name: "SYNAPSE", role: "Routage intelligent des tâches" },
            { name: "PULSE", role: "Monitoring temps réel" },
          ]
        },
        { 
          name: "Développement", 
          desc: "Génération et intégration de code",
          agents: [
            { name: "FORGE", role: "Backend & API" },
            { name: "CIPHER", role: "Algorithmes & logique" },
            { name: "PIXEL", role: "Frontend & UI" },
            { name: "BRIDGE", role: "Intégration & DevOps" },
          ]
        },
        { 
          name: "Sécurité", 
          desc: "Protection et audit continu",
          agents: [
            { name: "SENTINEL", role: "Analyse vulnérabilités" },
            { name: "GUARDIAN", role: "Protection runtime" },
            { name: "PHANTOM", role: "Tests d'intrusion" },
          ]
        },
        { 
          name: "Qualité", 
          desc: "Tests et validation automatisés",
          agents: [
            { name: "INSPECTOR", role: "Review de code" },
            { name: "BENCHMARK", role: "Tests de performance" },
            { name: "VALIDATOR", role: "Tests fonctionnels" },
          ]
        },
      ]
    }
  },
  en: {
    categories: [
      { 
        name: "Frontend", 
        desc: "Reactive and performant interfaces",
        techs: [
          { name: "Next.js 14", detail: "SSR, App Router, RSC" },
          { name: "React 18", detail: "Components, Hooks" },
          { name: "TypeScript", detail: "Strict typing" },
          { name: "Tailwind CSS", detail: "Utility-first styling" },
        ]
      },
      { 
        name: "Backend", 
        desc: "Robust and scalable APIs",
        techs: [
          { name: "Node.js", detail: "JavaScript runtime" },
          { name: "Python", detail: "ML, Automation" },
          { name: "GraphQL", detail: "Flexible API" },
          { name: "tRPC", detail: "End-to-end typesafe" },
        ]
      },
      { 
        name: "Infrastructure", 
        desc: "Deployment and monitoring",
        techs: [
          { name: "AWS / GCP", detail: "Cloud providers" },
          { name: "Docker", detail: "Containerization" },
          { name: "Kubernetes", detail: "Orchestration" },
          { name: "Vercel", detail: "Edge deployment" },
        ]
      },
    ],
    agents: {
      title: "Proprietary AI Agents",
      subtitle: "Over 1500 AI agents developed in-house, coordinated and supervised by our human experts. Each agent is controlled, audited and optimized by our technical team.",
      categories: [
        { 
          name: "Orchestration", 
          desc: "Intelligent coordination and routing",
          agents: [
            { name: "NEXUS", role: "Main conductor" },
            { name: "SYNAPSE", role: "Intelligent task routing" },
            { name: "PULSE", role: "Real-time monitoring" },
          ]
        },
        { 
          name: "Development", 
          desc: "Code generation and integration",
          agents: [
            { name: "FORGE", role: "Backend & API" },
            { name: "CIPHER", role: "Algorithms & logic" },
            { name: "PIXEL", role: "Frontend & UI" },
            { name: "BRIDGE", role: "Integration & DevOps" },
          ]
        },
        { 
          name: "Security", 
          desc: "Continuous protection and audit",
          agents: [
            { name: "SENTINEL", role: "Vulnerability analysis" },
            { name: "GUARDIAN", role: "Runtime protection" },
            { name: "PHANTOM", role: "Penetration testing" },
          ]
        },
        { 
          name: "Quality", 
          desc: "Automated testing and validation",
          agents: [
            { name: "INSPECTOR", role: "Code review" },
            { name: "BENCHMARK", role: "Performance testing" },
            { name: "VALIDATOR", role: "Functional testing" },
          ]
        },
      ]
    }
  },
};

export function TechStackSection() {
  const { locale } = useLocale();
  const data = techStackData[locale];
  
  return (
    <section className="relative py-28 bg-black overflow-hidden">
      {/* Cadre blanc simple */}
      <div className="absolute inset-8 border-2 border-white pointer-events-none" />
      
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block relative px-8 py-4 mb-6 border-2 border-white">
            <h2 className="text-5xl lg:text-7xl font-light text-white tracking-tight">
              Technologies
            </h2>
          </div>
          <p className="text-white/50 text-base max-w-2xl mx-auto leading-relaxed">
            {locale === "fr" 
              ? "Une stack technologique moderne et éprouvée, combinée à un écosystème unique d'agents IA spécialisés pour livrer des solutions performantes et sécurisées."
              : "A modern and proven technology stack, combined with a unique ecosystem of specialized AI agents to deliver performant and secure solutions."
            }
          </p>
        </motion.div>

        {/* Tech Stack */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-white/30" />
            <span className="text-[11px] text-white/50 uppercase tracking-[0.2em]">Stack Technique</span>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {data.categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-white/10 p-6 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white">{cat.name}</h3>
                  <span className="text-[10px] text-white/30 uppercase tracking-wider">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="text-xs text-white/40 mb-6">{cat.desc}</p>
                <div className="space-y-3">
                  {cat.techs.map((tech) => (
                    <div key={tech.name} className="flex items-center justify-between py-2 border-b border-white/[0.06] last:border-0">
                      <span className="text-sm text-white/80">{tech.name}</span>
                      <span className="text-[10px] text-white/30">{tech.detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Agents IA */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-white/30" />
            <span className="text-[11px] text-white/50 uppercase tracking-[0.2em]">{data.agents.title}</span>
          </div>
          <p className="text-sm text-white/40 mb-8 max-w-xl">{data.agents.subtitle}</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.agents.categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/[0.02] border border-white/[0.06] p-5 hover:border-white/15 transition-colors"
              >
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-white mb-1">{cat.name}</h4>
                  <p className="text-[10px] text-white/30">{cat.desc}</p>
                </div>
                <div className="space-y-2">
                  {cat.agents.map((agent) => (
                    <div key={agent.name} className="flex items-start gap-2">
                      <span className="text-[10px] text-white/60 font-mono bg-white/[0.04] px-1.5 py-0.5">{agent.name}</span>
                      <span className="text-[10px] text-white/30 leading-relaxed">{agent.role}</span>
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

export default TechStackSection;
