"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code, Layers, Zap, Shield, Users, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const technologies = [
  { name: "Next.js", desc: "Framework React de production" },
  { name: "React", desc: "Bibliothèque UI moderne" },
  { name: "TypeScript", desc: "Typage statique robuste" },
  { name: "Node.js", desc: "Backend performant" },
  { name: "PostgreSQL", desc: "Base de données relationnelle" },
  { name: "MongoDB", desc: "Base de données NoSQL" },
  { name: "GraphQL", desc: "API flexible et efficace" },
  { name: "Tailwind CSS", desc: "Styling utilitaire moderne" },
];

const processSteps = [
  {
    num: "01",
    title: "Analyse et Conception",
    desc: "Étude approfondie de vos besoins, audit de l'existant, définition de l'architecture technique et création des maquettes UI/UX.",
  },
  {
    num: "02",
    title: "Développement Agile",
    desc: "Sprints itératifs avec livraisons régulières, intégration continue et tests automatisés pour garantir la qualité du code.",
  },
  {
    num: "03",
    title: "Tests et Optimisation",
    desc: "Tests unitaires, d'intégration et de performance. Optimisation SEO, accessibilité RGAA et Core Web Vitals.",
  },
  {
    num: "04",
    title: "Déploiement et Suivi",
    desc: "Mise en production sécurisée, monitoring 24/7, maintenance évolutive et support technique réactif.",
  },
];

const features = [
  {
    icon: Code,
    title: "Code de Qualité",
    desc: "Architecture propre, documentation complète et respect des standards de l'industrie pour une maintenabilité optimale.",
  },
  {
    icon: Zap,
    title: "Performance Maximale",
    desc: "Optimisation des temps de chargement, lazy loading, CDN global et mise en cache intelligente.",
  },
  {
    icon: Shield,
    title: "Sécurité Renforcée",
    desc: "Protection OWASP, chiffrement des données, authentification robuste et audits de sécurité réguliers.",
  },
  {
    icon: Layers,
    title: "Scalabilité Native",
    desc: "Architecture cloud-native conçue pour évoluer avec votre activité sans refonte majeure.",
  },
];

export default function DeveloppementWebPage() {
  return (
    <div className="bg-black min-h-screen">
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-8 lg:px-16 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-4 mb-6">
              <Link href="/" className="text-xs text-white/50 hover:text-white/80 transition-colors">Accueil</Link>
              <span className="text-white/30">/</span>
              <span className="text-xs text-white/80">Services</span>
              <span className="text-white/30">/</span>
              <span className="text-xs text-white">Développement Web</span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center">
                <Code className="w-6 h-6 text-white/80" />
              </div>
              <div className="w-16 h-px bg-gradient-to-r from-white/40 to-transparent" />
            </div>

            <h1 className="text-4xl lg:text-6xl font-light text-white mb-6 tracking-tight">
              Développement Web
            </h1>
            <p className="text-lg text-white/70 max-w-2xl leading-relaxed mb-8">
              Applications web sur-mesure, performantes et évolutives. De la conception à la mise en production, 
              nous construisons des solutions digitales qui propulsent votre activité.
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
              L&apos;excellence par la collaboration
            </h2>
            <div className="max-w-3xl">
              <p className="text-white/70 leading-relaxed mb-6">
                Chez FluxDev, nous croyons que la technologie doit servir l&apos;humain. Nos agents IA ne travaillent 
                jamais seuls : ils sont constamment supervisés et corrélés par l&apos;expertise humaine de nos équipes. 
                Cette synergie unique garantit des solutions à la fois innovantes et parfaitement adaptées à vos besoins réels.
              </p>
              <p className="text-white/70 leading-relaxed mb-6">
                Nous nous engageons à respecter les dernières normes de l&apos;industrie et nous efforçons de nous 
                améliorer constamment. Chaque projet est une opportunité d&apos;apprendre et de perfectionner nos méthodes.
              </p>
              <p className="text-white/70 leading-relaxed">
                Pour les projets d&apos;envergure, nous pouvons mobiliser des freelances supplémentaires dans un cadre 
                strict de confidentialité et de limitation d&apos;accès. Cette flexibilité nous permet d&apos;accélérer 
                les délais de livraison tout en maintenant les plus hauts standards de qualité et de sécurité.
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
            <h2 className="text-3xl lg:text-4xl font-light text-white">Notre processus de développement</h2>
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
            <span className="text-xs text-white/50 uppercase tracking-[0.3em] mb-4 block">Stack technique</span>
            <h2 className="text-3xl lg:text-4xl font-light text-white">Technologies maîtrisées</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-4 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="text-sm font-medium text-white mb-1">{tech.name}</div>
                <div className="text-xs text-white/50">{tech.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <span className="text-xs text-white/50 uppercase tracking-[0.3em] mb-4 block">Engagements</span>
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-6">Ce que nous garantissons</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Code source documenté et versionné sur Git",
              "Tests automatisés et intégration continue",
              "Conformité RGPD et sécurité des données",
              "Support technique réactif post-livraison",
              "Formation à l'utilisation de votre solution",
              "Documentation technique complète",
              "Hébergement optimisé et monitoring",
              "Évolutivité et maintenabilité à long terme",
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
              <h3 className="text-2xl font-light text-white mb-2">Prêt à lancer votre projet web ?</h3>
              <p className="text-white/60">Bénéficiez d&apos;un audit gratuit de 30 minutes avec nos experts.</p>
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
