"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Shield, Lock, Eye, AlertTriangle, FileCheck, CheckCircle, ArrowRight, Server } from "lucide-react";
import Link from "next/link";

const services = [
  { name: "Audit de Sécurité", desc: "Évaluation complète de votre posture" },
  { name: "Tests d'Intrusion", desc: "Pentest white/grey/black box" },
  { name: "Analyse de Vulnérabilités", desc: "Scan et remédiation" },
  { name: "Conformité RGPD", desc: "Mise en conformité données" },
  { name: "SOC as a Service", desc: "Surveillance 24/7" },
  { name: "Formation Sécurité", desc: "Sensibilisation équipes" },
  { name: "Réponse Incidents", desc: "Gestion de crise cyber" },
  { name: "Architecture Zero Trust", desc: "Sécurité par design" },
];

const processSteps = [
  {
    num: "01",
    title: "Audit Initial",
    desc: "Cartographie complète de votre SI, identification des actifs critiques et évaluation des risques existants.",
  },
  {
    num: "02",
    title: "Tests et Analyse",
    desc: "Tests d'intrusion, scan de vulnérabilités, analyse de code et vérification des configurations.",
  },
  {
    num: "03",
    title: "Plan de Remédiation",
    desc: "Rapport détaillé avec priorisation des risques, recommandations et feuille de route de sécurisation.",
  },
  {
    num: "04",
    title: "Implémentation et Suivi",
    desc: "Mise en oeuvre des correctifs, monitoring continu et audits périodiques de vérification.",
  },
];

const features = [
  {
    icon: Shield,
    title: "Protection Proactive",
    desc: "Détection et neutralisation des menaces avant qu'elles n'impactent votre activité. Veille threat intelligence continue.",
  },
  {
    icon: Lock,
    title: "Chiffrement Avancé",
    desc: "Protection des données au repos et en transit. Gestion des clés, certificats SSL/TLS et protocoles sécurisés.",
  },
  {
    icon: Eye,
    title: "Monitoring 24/7",
    desc: "Surveillance permanente de votre infrastructure. Détection d'anomalies, alertes temps réel et réponse rapide.",
  },
  {
    icon: FileCheck,
    title: "Conformité Réglementaire",
    desc: "RGPD, ISO 27001, PCI-DSS, SOC 2. Accompagnement certification et maintien de la conformité.",
  },
];

const certifications = [
  { name: "ISO 27001", desc: "Management sécurité" },
  { name: "PCI-DSS", desc: "Données de paiement" },
  { name: "SOC 2", desc: "Controles service" },
  { name: "RGPD", desc: "Protection données UE" },
  { name: "HDS", desc: "Hébergement santé" },
  { name: "ANSSI", desc: "Référentiels nationaux" },
];

export default function CybersecuritePage() {
  return (
    <div className="bg-black min-h-screen">
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-8 lg:px-16 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-4 mb-6">
              <Link href="/" className="text-xs text-white/50 hover:text-white/80 transition-colors">Accueil</Link>
              <span className="text-white/30">/</span>
              <span className="text-xs text-white/80">Services</span>
              <span className="text-white/30">/</span>
              <span className="text-xs text-white">Cybersécurité</span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white/80" />
              </div>
              <div className="w-16 h-px bg-gradient-to-r from-white/40 to-transparent" />
            </div>

            <h1 className="text-4xl lg:text-6xl font-light text-white mb-6 tracking-tight">
              Cybersécurité
            </h1>
            <p className="text-lg text-white/70 max-w-2xl leading-relaxed mb-8">
              Protégez vos actifs numériques contre les cybermenaces. Audits, tests d&apos;intrusion, 
              mise en conformité et surveillance continue pour une sécurité sans compromis.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors">
                Demander un audit
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
              Sécurité augmentée par l&apos;IA, validée par l&apos;humain
            </h2>
            <div className="max-w-3xl">
              <p className="text-white/70 leading-relaxed mb-6">
                La cybersécurité exige une vigilance de chaque instant. Nos agents IA analysent en continu les logs, 
                détectent les patterns suspects et identifient les vulnérabilités. Mais chaque alerte critique, chaque 
                décision de remédiation est validée par nos experts humains certifiés. Cette synergie garantit une 
                protection robuste sans faux positifs paralysants.
              </p>
              <p className="text-white/70 leading-relaxed mb-6">
                Nous suivons rigoureusement les référentiels de l&apos;ANSSI, les normes ISO 27001 et les meilleures 
                pratiques OWASP. Notre veille permanente sur les menaces émergentes et les nouvelles vulnérabilités 
                nous permet d&apos;anticiper les risques avant qu&apos;ils ne se concrétisent.
              </p>
              <p className="text-white/70 leading-relaxed">
                Pour les missions d&apos;envergure nécessitant des compétences spécifiques (pentest, forensic, 
                compliance), nous mobilisons des experts freelances sous contrat de confidentialité renforcé. 
                Chaque intervenant dispose d&apos;un accès strictement limité aux périmètres définis, avec 
                traçabilité complète des actions. Vos données sensibles restent protégées à chaque étape.
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
            <h2 className="text-3xl lg:text-4xl font-light text-white">Notre processus de sécurisation</h2>
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
            <h2 className="text-3xl lg:text-4xl font-light text-white">Nos services de sécurité</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-4 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="text-sm font-medium text-white mb-1">{service.name}</div>
                <div className="text-xs text-white/50">{service.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <span className="text-xs text-white/50 uppercase tracking-[0.3em] mb-4 block">Conformité</span>
            <h2 className="text-3xl lg:text-4xl font-light text-white">Certifications et normes</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-4 border border-white/10 hover:border-white/20 transition-colors text-center"
              >
                <div className="text-sm font-medium text-white mb-1">{cert.name}</div>
                <div className="text-xs text-white/50">{cert.desc}</div>
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
              "Audit complet avec rapport détaillé et priorisé",
              "Tests d'intrusion par experts certifiés (OSCP, CEH)",
              "Conformité RGPD et accompagnement DPO",
              "Surveillance SOC 24/7 avec alertes temps réel",
              "Plan de réponse aux incidents personnalisé",
              "Formation et sensibilisation des équipes",
              "Suivi post-audit et vérification des correctifs",
              "Confidentialité absolue des informations",
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
              <h3 className="text-2xl font-light text-white mb-2">Évaluez votre niveau de sécurité</h3>
              <p className="text-white/60">Bénéficiez d&apos;un pré-audit gratuit pour identifier vos priorités.</p>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors whitespace-nowrap">
              Demander un audit
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
