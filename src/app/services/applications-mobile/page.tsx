"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Smartphone, Cpu, Fingerprint, Wifi, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const technologies = [
  { name: "React Native", desc: "Cross-platform performant" },
  { name: "Flutter", desc: "UI native multiplateforme" },
  { name: "Swift", desc: "iOS natif Apple" },
  { name: "Kotlin", desc: "Android natif Google" },
  { name: "Firebase", desc: "Backend mobile Google" },
  { name: "Supabase", desc: "Backend open source" },
  { name: "GraphQL", desc: "API efficace mobile" },
  { name: "Push Notifications", desc: "Engagement utilisateur" },
];

const processSteps = [
  {
    num: "01",
    title: "Stratégie Mobile",
    desc: "Définition de la stratégie mobile, choix technologique (natif vs cross-platform), wireframes et prototypage interactif.",
  },
  {
    num: "02",
    title: "Design UI/UX Mobile",
    desc: "Création d'interfaces optimisées pour mobile, respect des guidelines iOS et Android, animations fluides et micro-interactions.",
  },
  {
    num: "03",
    title: "Développement et Tests",
    desc: "Développement itératif, tests sur appareils réels, optimisation batterie et performance, intégration APIs.",
  },
  {
    num: "04",
    title: "Publication et Suivi",
    desc: "Soumission App Store et Play Store, ASO (App Store Optimization), analytics et mises à jour régulières.",
  },
];

const features = [
  {
    icon: Smartphone,
    title: "Expérience Native",
    desc: "Applications fluides et réactives qui tirent pleinement parti des capacités de chaque plateforme iOS et Android.",
  },
  {
    icon: Cpu,
    title: "Performance Optimisée",
    desc: "Gestion mémoire efficace, temps de démarrage minimisé, animations 60fps et consommation batterie maîtrisée.",
  },
  {
    icon: Fingerprint,
    title: "Sécurité Biométrique",
    desc: "Intégration Face ID, Touch ID, authentification forte et stockage sécurisé des données sensibles.",
  },
  {
    icon: Wifi,
    title: "Mode Hors-ligne",
    desc: "Synchronisation intelligente, cache local et fonctionnalités accessibles même sans connexion internet.",
  },
];

const appTypes = [
  { name: "E-commerce", desc: "Boutiques mobiles avec paiement intégré" },
  { name: "Fintech", desc: "Applications bancaires et financières" },
  { name: "Santé", desc: "Télémedicine et suivi médical" },
  { name: "Logistique", desc: "Tracking et gestion de livraisons" },
  { name: "Social", desc: "Réseaux et messagerie" },
  { name: "Productivité", desc: "Outils métier et collaboration" },
];

export default function ApplicationsMobilePage() {
  return (
    <div className="bg-black min-h-screen">
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-8 lg:px-16 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-4 mb-6">
              <Link href="/" className="text-xs text-white/50 hover:text-white/80 transition-colors">Accueil</Link>
              <span className="text-white/30">/</span>
              <span className="text-xs text-white/80">Services</span>
              <span className="text-white/30">/</span>
              <span className="text-xs text-white">Applications Mobile</span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white/80" />
              </div>
              <div className="w-16 h-px bg-gradient-to-r from-white/40 to-transparent" />
            </div>

            <h1 className="text-4xl lg:text-6xl font-light text-white mb-6 tracking-tight">
              Applications Mobile
            </h1>
            <p className="text-lg text-white/70 max-w-2xl leading-relaxed mb-8">
              Applications iOS et Android natives ou cross-platform. Design intuitif, performances optimales 
              et expérience utilisateur exceptionnelle pour conquérir le marché mobile.
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
              Mobile-first, humain-centric
            </h2>
            <div className="max-w-3xl">
              <p className="text-white/70 leading-relaxed mb-6">
                Le développement mobile exige une précision extrême. Nos agents IA accélèrent la production de code 
                mais sont systématiquement supervisés par nos développeurs seniors. Cette corrélation permanente entre 
                intelligence artificielle et expertise humaine garantit des applications robustes et parfaitement adaptées 
                aux contraintes de chaque plateforme.
              </p>
              <p className="text-white/70 leading-relaxed mb-6">
                Nous suivons rigoureusement les guidelines Apple Human Interface et Material Design de Google, 
                tout en nous adaptant aux évolutions constantes de l&apos;écosystème mobile. Notre veille technologique 
                permanente nous permet d&apos;intégrer les dernières innovations : widgets, App Clips, Instant Apps, 
                et bien plus.
              </p>
              <p className="text-white/70 leading-relaxed">
                Pour les projets ambitieux nécessitant une accélération, nous mobilisons des freelances spécialisés 
                mobile sous contrat de confidentialité strict. Chaque intervenant dispose d&apos;un accès limité 
                uniquement aux modules qui le concernent, garantissant la protection de votre propriété intellectuelle.
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
            <h2 className="text-3xl lg:text-4xl font-light text-white">Du concept à l&apos;App Store</h2>
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
            <span className="text-xs text-white/50 uppercase tracking-[0.3em] mb-4 block">Expertise</span>
            <h2 className="text-3xl lg:text-4xl font-light text-white">Types d&apos;applications</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {appTypes.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-6 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="text-base font-medium text-white mb-2">{type.name}</div>
                <div className="text-xs text-white/50">{type.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/10 bg-white/[0.01]">
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

      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <span className="text-xs text-white/50 uppercase tracking-[0.3em] mb-4 block">Engagements</span>
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-6">Ce que nous garantissons</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Applications natives iOS et Android ou cross-platform",
              "Design conforme aux guidelines Apple et Google",
              "Tests sur appareils réels multiples",
              "Optimisation performance et batterie",
              "Soumission et publication sur les stores",
              "Intégration analytics et crash reporting",
              "Support post-lancement et mises à jour",
              "Code source et documentation complète",
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
              <h3 className="text-2xl font-light text-white mb-2">Une idée d&apos;application mobile ?</h3>
              <p className="text-white/60">Discutons de votre projet lors d&apos;un appel de découverte gratuit.</p>
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
