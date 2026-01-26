"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Palette, Layers, MousePointer, Sparkles, Users, CheckCircle, ArrowRight, PenTool } from "lucide-react";
import Link from "next/link";

const tools = [
  { name: "Figma", desc: "Design collaboratif" },
  { name: "Adobe XD", desc: "Prototypage avancé" },
  { name: "Sketch", desc: "Design vectoriel" },
  { name: "Framer", desc: "Prototypes interactifs" },
  { name: "Principle", desc: "Animations UI" },
  { name: "Zeplin", desc: "Handoff développeurs" },
  { name: "Maze", desc: "Tests utilisateurs" },
  { name: "Hotjar", desc: "Analytics UX" },
];

const processSteps = [
  {
    num: "01",
    title: "Recherche UX",
    desc: "Étude utilisateurs, analyse concurrentielle, personas et cartographie des parcours utilisateurs.",
  },
  {
    num: "02",
    title: "Architecture et Wireframes",
    desc: "Structure de l'information, arborescence, wireframes low-fidelity et validation des flux.",
  },
  {
    num: "03",
    title: "Design UI",
    desc: "Direction artistique, design system, maquettes haute fidélité et prototypes interactifs.",
  },
  {
    num: "04",
    title: "Tests et Itération",
    desc: "Tests utilisateurs, analyse des métriques, itérations et handoff aux développeurs.",
  },
];

const features = [
  {
    icon: MousePointer,
    title: "Expérience Centrée Utilisateur",
    desc: "Chaque décision de design est guidée par les besoins réels des utilisateurs, validés par des tests et des données.",
  },
  {
    icon: Layers,
    title: "Design System Scalable",
    desc: "Composants réutilisables, tokens de design et documentation complète pour une cohérence à long terme.",
  },
  {
    icon: Sparkles,
    title: "Micro-interactions",
    desc: "Animations subtiles et feedbacks visuels qui rendent l'interface vivante et intuitive.",
  },
  {
    icon: PenTool,
    title: "Identité Visuelle Unique",
    desc: "Direction artistique distinctive qui reflète votre marque et vous différencie de la concurrence.",
  },
];

const deliverables = [
  { name: "Audit UX", desc: "Analyse de l'existant" },
  { name: "Personas", desc: "Profils utilisateurs" },
  { name: "User Flows", desc: "Parcours utilisateurs" },
  { name: "Wireframes", desc: "Structure des pages" },
  { name: "Maquettes HD", desc: "Design final" },
  { name: "Prototypes", desc: "Version interactive" },
  { name: "Design System", desc: "Bibliothèque composants" },
  { name: "Spécifications", desc: "Guide pour devs" },
];

export default function DesignUiUxPage() {
  return (
    <div className="bg-black min-h-screen">
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-8 lg:px-16 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-4 mb-6">
              <Link href="/" className="text-xs text-white/50 hover:text-white/80 transition-colors">Accueil</Link>
              <span className="text-white/30">/</span>
              <span className="text-xs text-white/80">Services</span>
              <span className="text-white/30">/</span>
              <span className="text-xs text-white">Design UI/UX</span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center">
                <Palette className="w-6 h-6 text-white/80" />
              </div>
              <div className="w-16 h-px bg-gradient-to-r from-white/40 to-transparent" />
            </div>

            <h1 className="text-4xl lg:text-6xl font-light text-white mb-6 tracking-tight">
              Design UI/UX
            </h1>
            <p className="text-lg text-white/70 max-w-2xl leading-relaxed mb-8">
              Interfaces élégantes et expériences utilisateur mémorables. Du concept à la livraison, 
              nous concevons des produits digitaux qui allient beauté et fonctionnalité.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors">
                Démarrer un projet
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link href="/projets" className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm hover:border-white/40 transition-colors">
                Voir nos réalisations
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <span className="text-xs text-white/50 uppercase tracking-[0.3em] mb-4 block">Notre approche</span>
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-6">
              Le design au service de l&apos;humain
            </h2>
            <div className="max-w-3xl">
              <p className="text-white/70 leading-relaxed mb-6">
                Le design est avant tout une discipline humaine. Si nos agents IA peuvent accélérer certaines tâches 
                répétitives comme la génération de variantes ou l&apos;analyse de patterns, chaque décision créative 
                est prise par nos designers seniors. Cette collaboration IA-humain nous permet de consacrer plus de 
                temps à ce qui compte vraiment : comprendre vos utilisateurs et créer des expériences qui les enchantent.
              </p>
              <p className="text-white/70 leading-relaxed mb-6">
                Nous suivons les principes fondamentaux du design thinking et les dernières tendances de l&apos;industrie. 
                Notre veille permanente sur les innovations UI/UX, les nouveaux patterns d&apos;interaction et les 
                évolutions des guidelines (Apple HIG, Material Design, Fluent) nous permet de proposer des interfaces 
                modernes et intuitives.
              </p>
              <p className="text-white/70 leading-relaxed">
                Pour les projets nécessitant des compétences spécifiques (motion design, illustration, 3D), nous 
                collaborons avec des freelances talentueux sous accord de confidentialité strict. Chaque intervenant 
                travaille sur des éléments isolés, sans accès à la vision globale du projet ni aux données sensibles 
                de votre entreprise. Vous bénéficiez ainsi d&apos;une expertise élargie tout en préservant votre 
                avantage compétitif.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 border border-white/10 hover:border-white/20 transition-colors group"
              >
                <feature.icon className="w-8 h-8 text-white/60 mb-4 group-hover:text-white/80 transition-colors" />
                <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <span className="text-xs text-white/50 uppercase tracking-[0.3em] mb-4 block">Méthodologie</span>
            <h2 className="text-3xl lg:text-4xl font-light text-white">Notre processus de design</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-5xl font-light text-white/10 mb-4">{step.num}</div>
                <h3 className="text-lg font-medium text-white mb-3">{step.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
                {index < processSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-8 -right-4 w-6 h-6 text-white/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <span className="text-xs text-white/50 uppercase tracking-[0.3em] mb-4 block">Livrables</span>
            <h2 className="text-3xl lg:text-4xl font-light text-white">Ce que vous recevez</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {deliverables.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-4 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="text-sm font-medium text-white mb-1">{item.name}</div>
                <div className="text-xs text-white/50">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <span className="text-xs text-white/50 uppercase tracking-[0.3em] mb-4 block">Outils</span>
            <h2 className="text-3xl lg:text-4xl font-light text-white">Technologies maîtrisées</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-4 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="text-sm font-medium text-white mb-1">{tool.name}</div>
                <div className="text-xs text-white/50">{tool.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <span className="text-xs text-white/50 uppercase tracking-[0.3em] mb-4 block">Engagements</span>
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-6">Ce que nous garantissons</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Recherche utilisateur et analyse comportementale",
              "Design system complet et documenté",
              "Prototypes interactifs haute fidélité",
              "Tests utilisateurs et itérations",
              "Handoff structuré pour les développeurs",
              "Fichiers sources éditables (Figma)",
              "Guidelines et documentation UI",
              "Support post-livraison",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 border border-white/10"
              >
                <CheckCircle className="w-5 h-5 text-green-500/80 flex-shrink-0" />
                <span className="text-sm text-white/80">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col lg:flex-row items-center justify-between gap-8 p-12 border border-white/20">
            <div>
              <h3 className="text-2xl font-light text-white mb-2">Un projet de design en tête ?</h3>
              <p className="text-white/60">Discutons de votre vision lors d&apos;un appel découverte gratuit.</p>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors whitespace-nowrap">
              Prendre rendez-vous
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
