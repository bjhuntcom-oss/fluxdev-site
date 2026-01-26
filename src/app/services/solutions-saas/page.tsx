"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Cloud, Database, BarChart3, Lock, Users, CheckCircle, ArrowRight, Repeat } from "lucide-react";
import Link from "next/link";

const technologies = [
  { name: "AWS / GCP / Azure", desc: "Infrastructure cloud" },
  { name: "Kubernetes", desc: "Orchestration containers" },
  { name: "Docker", desc: "Conteneurisation" },
  { name: "Terraform", desc: "Infrastructure as Code" },
  { name: "Stripe / Paddle", desc: "Facturation SaaS" },
  { name: "Redis", desc: "Cache distribué" },
  { name: "Elasticsearch", desc: "Recherche full-text" },
  { name: "RabbitMQ / Kafka", desc: "Message queuing" },
];

const processSteps = [
  {
    num: "01",
    title: "Discovery et MVP",
    desc: "Analyse du marché, définition du MVP, architecture multi-tenant et stratégie de monétisation.",
  },
  {
    num: "02",
    title: "Architecture Cloud",
    desc: "Infrastructure scalable, microservices, API RESTful/GraphQL et intégration CI/CD.",
  },
  {
    num: "03",
    title: "Développement Produit",
    desc: "Sprints agiles, onboarding utilisateur, tableau de bord admin et système de billing.",
  },
  {
    num: "04",
    title: "Launch et Growth",
    desc: "Déploiement production, monitoring, analytics comportementaux et itérations continues.",
  },
];

const features = [
  {
    icon: Cloud,
    title: "Architecture Multi-tenant",
    desc: "Isolation des données par client, personnalisation par tenant et scalabilité horizontale automatique.",
  },
  {
    icon: Database,
    title: "Haute Disponibilité",
    desc: "SLA 99.9%, redondance géographique, sauvegardes automatiques et plan de reprise d'activité.",
  },
  {
    icon: BarChart3,
    title: "Analytics Intégrés",
    desc: "Tableaux de bord temps réel, métriques clés, rapports automatisés et insights actionables.",
  },
  {
    icon: Repeat,
    title: "Billing Automatisé",
    desc: "Gestion des abonnements, facturation récurrente, périodes d'essai et gestion des upgrades.",
  },
];

const saasTypes = [
  { name: "B2B Enterprise", desc: "Solutions métier complexes" },
  { name: "Vertical SaaS", desc: "Secteurs spécifiques" },
  { name: "Marketplace", desc: "Plateformes multi-vendeurs" },
  { name: "API as a Service", desc: "Services programmatiques" },
  { name: "Collaboration", desc: "Outils d'équipe" },
  { name: "Analytics", desc: "Business Intelligence" },
];

export default function SolutionsSaasPage() {
  return (
    <div className="bg-black min-h-screen">
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-8 lg:px-16 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-4 mb-6">
              <Link href="/" className="text-xs text-white/50 hover:text-white/80 transition-colors">Accueil</Link>
              <span className="text-white/30">/</span>
              <span className="text-xs text-white/80">Services</span>
              <span className="text-white/30">/</span>
              <span className="text-xs text-white">Solutions SaaS</span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center">
                <Cloud className="w-6 h-6 text-white/80" />
              </div>
              <div className="w-16 h-px bg-gradient-to-r from-white/40 to-transparent" />
            </div>

            <h1 className="text-4xl lg:text-6xl font-light text-white mb-6 tracking-tight">
              Solutions SaaS
            </h1>
            <p className="text-lg text-white/70 max-w-2xl leading-relaxed mb-8">
              Concevez et lancez votre produit SaaS avec une architecture cloud-native pensée pour la croissance. 
              Du MVP au scale-up, nous construisons des plateformes qui génèrent des revenus récurrents.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors">
                Lancer mon SaaS
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
              Construire pour durer et scaler
            </h2>
            <div className="max-w-3xl">
              <p className="text-white/70 leading-relaxed mb-6">
                Un produit SaaS réussi repose sur une architecture solide et une exécution impeccable. Nos agents IA 
                accélèrent le développement des fonctionnalités répétitives, mais chaque décision architecturale est 
                prise et validée par nos experts humains. Cette collaboration IA-humain nous permet de livrer plus vite 
                sans compromettre la qualité.
              </p>
              <p className="text-white/70 leading-relaxed mb-6">
                Nous appliquons les meilleures pratiques de l&apos;industrie SaaS : architecture multi-tenant sécurisée, 
                microservices découplés, infrastructure as code, et DevOps automatisé. Notre veille permanente nous 
                permet d&apos;intégrer les dernières innovations cloud et les patterns éprouvés par les leaders du marché.
              </p>
              <p className="text-white/70 leading-relaxed">
                Pour accélérer votre time-to-market, nous pouvons renforcer l&apos;équipe avec des freelances spécialisés 
                SaaS et cloud. Chaque intervenant travaille sous NDA strict avec un accès segmenté uniquement aux 
                composants qui le concernent. Cette organisation protège votre code propriétaire tout en multipliant 
                la vitesse de développement.
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
            <h2 className="text-3xl lg:text-4xl font-light text-white">De l&apos;idée au MRR</h2>
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
            <h2 className="text-3xl lg:text-4xl font-light text-white">Types de SaaS</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {saasTypes.map((type, index) => (
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
              "Architecture multi-tenant sécurisée et scalable",
              "Infrastructure cloud optimisée (AWS/GCP/Azure)",
              "Système de billing et gestion abonnements",
              "Tableau de bord admin complet",
              "API documentée et versionnée",
              "CI/CD et déploiement zero-downtime",
              "Monitoring et alerting 24/7",
              "Documentation technique et utilisateur",
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
              <h3 className="text-2xl font-light text-white mb-2">Prêt à lancer votre SaaS ?</h3>
              <p className="text-white/60">Validons ensemble votre idée et définissons la roadmap technique.</p>
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
