"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Fingerprint, CreditCard, Send, PieChart, Shield, Bell, Lock, ArrowDownLeft, Plus, Filter, Zap, ShoppingBag, Coffee, Car, Home, Utensils } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/contexts";

const content = {
  fr: {
    back: "Retour aux projets",
    category: "Application Mobile",
    title: "Application Bancaire Mobile",
    subtitle: "App bancaire sécurisée avec authentification biométrique, virements instantanés et gestion de budget IA.",
    client: "Institution financière",
    year: "2025",
    duration: "6 mois",
    tags: ["React Native", "Biométrie", "PSD2", "iOS", "Android"],
    overview: "Présentation",
    overviewText: "Développement d'une application bancaire nouvelle génération pour une institution financière majeure. L'application combine sécurité de niveau bancaire et expérience utilisateur fluide, avec des fonctionnalités innovantes de gestion budgétaire assistée par IA.",
    features: "Fonctionnalités clés",
    featuresList: [
      { icon: Fingerprint, title: "Biométrie", desc: "Face ID, Touch ID et reconnaissance vocale" },
      { icon: Send, title: "Virements instantanés", desc: "Transferts SEPA en temps réel" },
      { icon: PieChart, title: "Budget IA", desc: "Catégorisation automatique et conseils personnalisés" },
      { icon: CreditCard, title: "Cartes virtuelles", desc: "Création de cartes éphémères sécurisées" },
      { icon: Shield, title: "Conformité PSD2", desc: "Authentification forte et API sécurisées" },
      { icon: Bell, title: "Notifications", desc: "Alertes temps réel et insights" },
    ],
    results: "Résultats",
    resultsList: [
      { value: "4.9", label: "Note App Store" },
      { value: "2M+", label: "Téléchargements" },
      { value: "<0.5s", label: "Temps de connexion" },
      { value: "0", label: "Incidents sécurité" },
    ],
    screens: "Écrans principaux",
  },
  en: {
    back: "Back to projects",
    category: "Mobile Application",
    title: "Mobile Banking App",
    subtitle: "Secure banking app with biometric authentication, instant transfers and AI budget management.",
    client: "Financial institution",
    year: "2025",
    duration: "6 months",
    tags: ["React Native", "Biometrics", "PSD2", "iOS", "Android"],
    overview: "Overview",
    overviewText: "Development of a next-generation banking application for a major financial institution. The app combines bank-level security with seamless user experience, featuring innovative AI-assisted budget management capabilities.",
    features: "Key Features",
    featuresList: [
      { icon: Fingerprint, title: "Biometrics", desc: "Face ID, Touch ID and voice recognition" },
      { icon: Send, title: "Instant transfers", desc: "Real-time SEPA transfers" },
      { icon: PieChart, title: "AI Budget", desc: "Automatic categorization and personalized advice" },
      { icon: CreditCard, title: "Virtual cards", desc: "Secure ephemeral card creation" },
      { icon: Shield, title: "PSD2 Compliance", desc: "Strong authentication and secure APIs" },
      { icon: Bell, title: "Notifications", desc: "Real-time alerts and insights" },
    ],
    results: "Results",
    resultsList: [
      { value: "4.9", label: "App Store rating" },
      { value: "2M+", label: "Downloads" },
      { value: "<0.5s", label: "Login time" },
      { value: "0", label: "Security incidents" },
    ],
    screens: "Main Screens",
  },
};

export default function AppBancairePage() {
  const { locale } = useLocale();
  const t = content[locale];

  return (
    <div className="bg-black min-h-screen">
      
      {/* Header */}
      <section className="relative pt-32 pb-16">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/projets"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">{t.back}</span>
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              <div className="flex-1">
                <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
                  {t.category}
                </span>
                <h1 className="text-4xl lg:text-6xl font-light text-white mt-3 leading-[1.1]">
                  {t.title}
                </h1>
                <p className="text-lg text-white/60 mt-6 max-w-2xl leading-relaxed">
                  {t.subtitle}
                </p>
                <div className="flex flex-wrap gap-2 mt-8">
                  {t.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 text-xs font-medium text-white/70 border border-white/10 bg-white/[0.02]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="lg:text-right space-y-4">
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">Client</span>
                  <p className="text-white/80 text-sm mt-1">{t.client}</p>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">{locale === "fr" ? "Année" : "Year"}</span>
                  <p className="text-white/80 text-sm mt-1">{t.year}</p>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">{locale === "fr" ? "Durée" : "Duration"}</span>
                  <p className="text-white/80 text-sm mt-1">{t.duration}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile Mockups Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center items-end gap-4 lg:gap-8"
          >
            {/* Phone 1 - Dashboard */}
            <div className="relative w-[160px] lg:w-[220px] transform -rotate-6 translate-y-8">
              <div className="bg-[#1a1a1a] rounded-[24px] lg:rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-black rounded-[20px] lg:rounded-[28px] overflow-hidden">
                  {/* Status bar */}
                  <div className="flex justify-between items-center px-4 py-2 text-[8px] lg:text-[10px] text-white/60">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="w-3 h-1.5 bg-white/60 rounded-sm" />
                    </div>
                  </div>
                  {/* Content */}
                  <div className="px-4 pb-6 space-y-4">
                    <div className="text-center py-4">
                      <p className="text-[8px] lg:text-[10px] text-white/40">Solde disponible</p>
                      <p className="text-lg lg:text-2xl font-light text-white mt-1">€12,458.32</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {["Virement", "Carte", "Budget", "Plus"].map((item) => (
                        <div key={item} className="text-center">
                          <div className="w-8 h-8 lg:w-10 lg:h-10 mx-auto bg-white/5 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white/20 rounded" />
                          </div>
                          <p className="text-[6px] lg:text-[8px] text-white/40 mt-1">{item}</p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2 pt-2">
                      <p className="text-[8px] lg:text-[10px] text-white/40">Dernières opérations</p>
                      {[
                        { name: "Amazon", amount: "-€49.99" },
                        { name: "Salaire", amount: "+€3,200.00" },
                        { name: "Spotify", amount: "-€9.99" },
                      ].map((tx) => (
                        <div key={tx.name} className="flex justify-between items-center py-1.5 border-b border-white/5">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-white/5 rounded-full" />
                            <span className="text-[8px] lg:text-[10px] text-white/70">{tx.name}</span>
                          </div>
                          <span className={`text-[8px] lg:text-[10px] ${tx.amount.startsWith("+") ? "text-green-400" : "text-white/70"}`}>
                            {tx.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone 2 - Main (Center) */}
            <div className="relative w-[200px] lg:w-[280px] z-10">
              <div className="bg-[#1a1a1a] rounded-[28px] lg:rounded-[40px] p-2 lg:p-3 shadow-2xl border border-white/20">
                <div className="bg-black rounded-[24px] lg:rounded-[36px] overflow-hidden">
                  {/* Notch */}
                  <div className="flex justify-center pt-2">
                    <div className="w-20 lg:w-28 h-5 lg:h-7 bg-black rounded-full border border-white/10" />
                  </div>
                  {/* Content */}
                  <div className="px-5 lg:px-6 pb-8 pt-4 space-y-5">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[10px] lg:text-xs text-white/40">Bonjour,</p>
                        <p className="text-sm lg:text-base font-medium text-white">Thomas</p>
                      </div>
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/5 rounded-full flex items-center justify-center">
                        <Bell className="w-4 h-4 lg:w-5 lg:h-5 text-white/40" />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl lg:rounded-2xl p-4 lg:p-5">
                      <p className="text-[10px] lg:text-xs text-white/50">Compte principal</p>
                      <p className="text-2xl lg:text-3xl font-light text-white mt-2">€12,458.32</p>
                      <div className="flex gap-3 mt-4">
                        <button className="flex-1 py-2 bg-white text-black text-[10px] lg:text-xs font-medium rounded-lg">
                          Envoyer
                        </button>
                        <button className="flex-1 py-2 bg-white/10 text-white text-[10px] lg:text-xs font-medium rounded-lg">
                          Demander
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <p className="text-[10px] lg:text-xs text-white/50">Ce mois</p>
                        <p className="text-[10px] lg:text-xs text-white/30">Voir tout</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: "Dépenses", value: "€1,234", color: "bg-red-500/20" },
                          { label: "Revenus", value: "€3,200", color: "bg-green-500/20" },
                          { label: "Épargne", value: "€450", color: "bg-blue-500/20" },
                        ].map((stat) => (
                          <div key={stat.label} className={`${stat.color} rounded-lg p-2 lg:p-3`}>
                            <p className="text-[8px] lg:text-[10px] text-white/50">{stat.label}</p>
                            <p className="text-[10px] lg:text-sm font-medium text-white mt-1">{stat.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Bottom nav */}
                  <div className="flex justify-around py-3 border-t border-white/5">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className={`w-5 h-5 rounded-full ${i === 0 ? "bg-white" : "bg-white/10"}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Phone 3 - Transfer */}
            <div className="relative w-[160px] lg:w-[220px] transform rotate-6 translate-y-8">
              <div className="bg-[#1a1a1a] rounded-[24px] lg:rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-black rounded-[20px] lg:rounded-[28px] overflow-hidden">
                  <div className="flex justify-between items-center px-4 py-2 text-[8px] lg:text-[10px] text-white/60">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="w-3 h-1.5 bg-white/60 rounded-sm" />
                    </div>
                  </div>
                  <div className="px-4 pb-6 space-y-4">
                    <p className="text-xs lg:text-sm font-medium text-white">Nouveau virement</p>
                    <div className="space-y-3">
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-[8px] lg:text-[10px] text-white/40">Bénéficiaire</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-6 h-6 bg-white/10 rounded-full" />
                          <span className="text-[10px] lg:text-xs text-white">Marie Dupont</span>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-[8px] lg:text-[10px] text-white/40">Montant</p>
                        <p className="text-lg lg:text-xl font-light text-white mt-1">€250.00</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-[8px] lg:text-[10px] text-white/40">Motif</p>
                        <p className="text-[10px] lg:text-xs text-white/70 mt-1">Remboursement dîner</p>
                      </div>
                    </div>
                    <button className="w-full py-2.5 bg-white text-black text-[10px] lg:text-xs font-medium rounded-lg mt-2">
                      Confirmer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
                {t.overview}
              </span>
              <p className="text-lg lg:text-xl text-white/80 mt-6 leading-relaxed">
                {t.overviewText}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
                Stack technique
              </span>
              <div className="mt-6 space-y-3">
                {["React Native", "TypeScript", "Redux Toolkit", "Biometric APIs", "Plaid API", "Firebase"].map((tech) => (
                  <div key={tech} className="flex items-center gap-3 text-white/70 text-sm">
                    <div className="w-1 h-1 bg-white/40" />
                    {tech}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {t.features}
            </span>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.featuresList.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 border border-white/[0.06] bg-white/[0.01] hover:border-white/20 transition-colors"
              >
                <feature.icon className="w-5 h-5 text-white/40 mb-4" />
                <h3 className="text-white font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Screens - Login & Cards */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Authentification & Cartes" : "Authentication & Cards"}
            </span>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Login Screen */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-black rounded-[28px] overflow-hidden">
                  <div className="flex justify-between items-center px-5 py-3 text-[10px] text-white/60">
                    <span>9:41</span>
                    <div className="w-4 h-2 border border-white/60 rounded-sm"><div className="w-3 h-full bg-white/60" /></div>
                  </div>
                  <div className="px-6 pb-8 pt-8 flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center mb-6">
                      <span className="text-2xl font-light text-white">B</span>
                    </div>
                    <h3 className="text-sm font-medium text-white mb-1">Banque Privée</h3>
                    <p className="text-[10px] text-white/40 mb-8">Bienvenue</p>
                    <div className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center mb-4">
                      <Fingerprint className="w-10 h-10 text-white/60" />
                    </div>
                    <p className="text-[10px] text-white/50 mb-6">Touch ID pour continuer</p>
                    <button className="text-[10px] text-white/40 underline">Utiliser le code PIN</button>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Authentification</p>
            </motion.div>

            {/* PIN Entry */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-black rounded-[28px] overflow-hidden">
                  <div className="flex justify-between items-center px-5 py-3 text-[10px] text-white/60">
                    <span>9:41</span>
                    <div className="w-4 h-2 border border-white/60 rounded-sm"><div className="w-3 h-full bg-white/60" /></div>
                  </div>
                  <div className="px-6 pb-6 pt-6">
                    <h3 className="text-sm font-medium text-white text-center mb-2">Entrez votre code</h3>
                    <p className="text-[10px] text-white/40 text-center mb-6">Code à 6 chiffres</p>
                    <div className="flex justify-center gap-3 mb-8">
                      {[1,2,3,4,5,6].map((i) => (
                        <div key={i} className={`w-3 h-3 rounded-full ${i <= 4 ? 'bg-white' : 'bg-white/20'}`} />
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((num, i) => (
                        <button key={i} className={`h-12 rounded-xl flex items-center justify-center text-lg text-white ${num === '' ? '' : 'bg-white/5'}`}>
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Code PIN</p>
            </motion.div>

            {/* Cards List */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-black rounded-[28px] overflow-hidden">
                  <div className="flex justify-between items-center px-5 py-3 text-[10px] text-white/60">
                    <span>9:41</span>
                    <div className="w-4 h-2 border border-white/60 rounded-sm"><div className="w-3 h-full bg-white/60" /></div>
                  </div>
                  <div className="px-5 pb-6 pt-2">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium text-white">Mes cartes</span>
                      <Plus className="w-4 h-4 text-white/40" />
                    </div>
                    <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-xl p-4 mb-3">
                      <p className="text-[8px] text-white/40 mb-4">Carte Principale</p>
                      <p className="text-[10px] text-white/60 font-mono mb-1">•••• •••• •••• 4521</p>
                      <div className="flex justify-between items-end">
                        <div><p className="text-[8px] text-white/40">TITULAIRE</p><p className="text-[10px] text-white">T. MARTIN</p></div>
                        <p className="text-[10px] text-white font-mono">09/27</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-4">
                      <div className="flex items-center gap-1 mb-3"><Zap className="w-3 h-3 text-yellow-300" /><p className="text-[8px] text-white/60">Carte Virtuelle</p></div>
                      <p className="text-[10px] text-white/80 font-mono mb-1">•••• •••• •••• 8834</p>
                      <p className="text-[8px] text-white/40">Expire dans 24h</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Gestion cartes</p>
            </motion.div>

            {/* Card Controls */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-black rounded-[28px] overflow-hidden">
                  <div className="flex justify-between items-center px-5 py-3 text-[10px] text-white/60">
                    <span>9:41</span>
                    <div className="w-4 h-2 border border-white/60 rounded-sm"><div className="w-3 h-full bg-white/60" /></div>
                  </div>
                  <div className="px-5 pb-6 pt-2">
                    <span className="text-xs font-medium text-white">Paramètres carte</span>
                    <div className="mt-4 space-y-3">
                      {[
                        { label: "Paiements en ligne", on: true },
                        { label: "Paiements étranger", on: true },
                        { label: "Retraits DAB", on: true },
                        { label: "Sans contact", on: true },
                        { label: "Carte bloquée", on: false },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5">
                          <span className="text-[10px] text-white/70">{item.label}</span>
                          <div className={`w-8 h-4 rounded-full ${item.on ? 'bg-green-500' : 'bg-white/20'} relative`}>
                            <div className={`absolute w-3 h-3 bg-white rounded-full top-0.5 ${item.on ? 'right-0.5' : 'left-0.5'}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-4 py-2.5 bg-red-500/20 text-red-400 text-[10px] font-medium rounded-lg flex items-center justify-center gap-1">
                      <Lock className="w-3 h-3" /> Bloquer
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Contrôles</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Budget & Transfers */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Budget IA & Virements" : "AI Budget & Transfers"}
            </span>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Budget Overview */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-black rounded-[28px] overflow-hidden">
                  <div className="flex justify-between items-center px-5 py-3 text-[10px] text-white/60">
                    <span>9:41</span>
                    <div className="w-4 h-2 border border-white/60 rounded-sm"><div className="w-3 h-full bg-white/60" /></div>
                  </div>
                  <div className="px-5 pb-6 pt-2">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium text-white">Mon budget</span>
                      <span className="text-[10px] text-white/40">Janvier</span>
                    </div>
                    <div className="relative w-28 h-28 mx-auto mb-4">
                      <svg className="w-full h-full -rotate-90"><circle cx="56" cy="56" r="48" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" /><circle cx="56" cy="56" r="48" fill="none" stroke="#3b82f6" strokeWidth="8" strokeDasharray="301" strokeDashoffset="90" strokeLinecap="round" /></svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-lg font-medium text-white">70%</span><span className="text-[8px] text-white/40">utilisé</span></div>
                    </div>
                    <div className="flex justify-between text-center">
                      <div><p className="text-[10px] text-white/40">Dépensé</p><p className="text-xs text-white">€1,400</p></div>
                      <div><p className="text-[10px] text-white/40">Restant</p><p className="text-xs text-green-400">€600</p></div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Vue budget</p>
            </motion.div>

            {/* Categories */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-black rounded-[28px] overflow-hidden">
                  <div className="flex justify-between items-center px-5 py-3 text-[10px] text-white/60">
                    <span>9:41</span>
                    <div className="w-4 h-2 border border-white/60 rounded-sm"><div className="w-3 h-full bg-white/60" /></div>
                  </div>
                  <div className="px-5 pb-6 pt-2">
                    <span className="text-xs font-medium text-white">Par catégorie</span>
                    <div className="mt-4 space-y-3">
                      {[
                        { icon: ShoppingBag, label: "Shopping", amount: "€420", percent: 30, color: "bg-pink-500" },
                        { icon: Utensils, label: "Restaurants", amount: "€280", percent: 20, color: "bg-orange-500" },
                        { icon: Car, label: "Transport", amount: "€210", percent: 15, color: "bg-blue-500" },
                        { icon: Home, label: "Logement", amount: "€350", percent: 25, color: "bg-purple-500" },
                        { icon: Coffee, label: "Loisirs", amount: "€140", percent: 10, color: "bg-green-500" },
                      ].map((cat) => (
                        <div key={cat.label} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2"><cat.icon className="w-3 h-3 text-white/40" /><span className="text-[10px] text-white/70">{cat.label}</span></div>
                            <span className="text-[10px] text-white">{cat.amount}</span>
                          </div>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden"><div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.percent}%` }} /></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Catégories IA</p>
            </motion.div>

            {/* Transfer */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-black rounded-[28px] overflow-hidden">
                  <div className="flex justify-between items-center px-5 py-3 text-[10px] text-white/60">
                    <span>9:41</span>
                    <div className="w-4 h-2 border border-white/60 rounded-sm"><div className="w-3 h-full bg-white/60" /></div>
                  </div>
                  <div className="px-5 pb-6 pt-2">
                    <span className="text-xs font-medium text-white">Envoyer</span>
                    <div className="mt-4 text-center">
                      <p className="text-[10px] text-white/40 mb-2">Montant</p>
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-3xl font-light text-white">€250</span>
                        <span className="text-lg text-white/40">.00</span>
                      </div>
                    </div>
                    <div className="flex justify-center gap-2 mt-4 mb-6">
                      {['€50', '€100', '€250', '€500'].map((amt) => (
                        <button key={amt} className={`px-3 py-1 rounded-full text-[10px] ${amt === '€250' ? 'bg-white text-black' : 'bg-white/10 text-white'}`}>{amt}</button>
                      ))}
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 mb-4">
                      <p className="text-[8px] text-white/40 mb-2">Bénéficiaire</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center"><span className="text-xs text-white font-medium">MD</span></div>
                        <div><p className="text-[10px] text-white">Marie Dupont</p><p className="text-[8px] text-white/40">FR76 •••• 4521</p></div>
                      </div>
                    </div>
                    <button className="w-full py-3 bg-white text-black text-[10px] font-medium rounded-xl">Confirmer</button>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Virement</p>
            </motion.div>

            {/* History */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-black rounded-[28px] overflow-hidden">
                  <div className="flex justify-between items-center px-5 py-3 text-[10px] text-white/60">
                    <span>9:41</span>
                    <div className="w-4 h-2 border border-white/60 rounded-sm"><div className="w-3 h-full bg-white/60" /></div>
                  </div>
                  <div className="px-5 pb-6 pt-2">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium text-white">Historique</span>
                      <Filter className="w-3 h-3 text-white/40" />
                    </div>
                    <p className="text-[8px] text-white/40 mb-2">Aujourd&apos;hui</p>
                    <div className="space-y-2">
                      {[
                        { icon: ShoppingBag, name: "Amazon", amount: "-€49.99", time: "14:32" },
                        { icon: Coffee, name: "Starbucks", amount: "-€5.40", time: "09:15" },
                        { icon: ArrowDownLeft, name: "Salaire", amount: "+€3,200", time: "00:01", positive: true },
                        { icon: Car, name: "Uber", amount: "-€18.50", time: "Hier" },
                      ].map((tx, i) => (
                        <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5">
                          <div className={`w-8 h-8 ${tx.positive ? 'bg-green-500/20' : 'bg-white/5'} rounded-full flex items-center justify-center`}>
                            <tx.icon className={`w-3 h-3 ${tx.positive ? 'text-green-400' : 'text-white/40'}`} />
                          </div>
                          <div className="flex-1"><p className="text-[10px] text-white">{tx.name}</p><p className="text-[8px] text-white/40">{tx.time}</p></div>
                          <span className={`text-[10px] ${tx.positive ? 'text-green-400' : 'text-white'}`}>{tx.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Transactions</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {t.results}
            </span>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {t.resultsList.map((result, i) => (
              <motion.div
                key={result.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-light text-white mb-2">{result.value}</div>
                <div className="text-xs text-white/50 uppercase tracking-wider">{result.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl lg:text-3xl font-light text-white mb-6">
              {locale === "fr" ? "Un projet similaire ?" : "Similar project?"}
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-medium uppercase tracking-wider hover:bg-white/90 transition-colors group"
            >
              <span>{locale === "fr" ? "Discutons-en" : "Let's talk"}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
