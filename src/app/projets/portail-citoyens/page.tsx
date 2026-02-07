"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Users, FileText, Shield, Clock, Accessibility, CheckCircle, Search, Bell, ChevronRight, Upload, Download, Calendar, MapPin, Phone, Mail, MessageSquare, HelpCircle, Eye, Printer, Share2, AlertCircle, Info, User, Home, Building2, Car, GraduationCap, Baby, Heart, Briefcase, FileCheck, PenTool } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/contexts";

const content = {
  fr: {
    back: "Retour aux projets",
    category: "Portail Web",
    title: "Portail Services Citoyens",
    subtitle: "Guichet unique numérique pour démarches administratives avec authentification sécurisée et accessibilité RGAA.",
    client: "Collectivité territoriale",
    year: "2024",
    duration: "8 mois",
    tags: ["Next.js", "SSO", "Accessibilité", "FranceConnect"],
    overview: "Présentation",
    overviewText: "Développement d'un portail citoyen moderne permettant aux habitants d'effectuer leurs démarches administratives en ligne. Le projet a mis l'accent sur l'accessibilité universelle (RGAA niveau AA) et l'intégration avec FranceConnect pour une authentification simplifiée et sécurisée.",
    features: "Fonctionnalités clés",
    featuresList: [
      { icon: Users, title: "FranceConnect", desc: "Authentification nationale sécurisée" },
      { icon: FileText, title: "Démarches en ligne", desc: "50+ formulaires dématérialisés" },
      { icon: Shield, title: "Sécurité", desc: "Chiffrement et conformité RGPD" },
      { icon: Clock, title: "Suivi temps réel", desc: "État d'avancement des demandes" },
      { icon: Accessibility, title: "Accessibilité", desc: "RGAA AA, lecteur d'écran compatible" },
      { icon: CheckCircle, title: "Signature électronique", desc: "Validation légale des documents" },
    ],
    results: "Résultats",
    resultsList: [
      { value: "85%", label: "Démarches en ligne" },
      { value: "-60%", label: "Temps de traitement" },
      { value: "120K", label: "Citoyens actifs" },
      { value: "AA", label: "Conformité RGAA" },
    ],
  },
  en: {
    back: "Back to projects",
    category: "Web Portal",
    title: "Citizen Services Portal",
    subtitle: "One-stop digital portal for administrative procedures with secure authentication and accessibility compliance.",
    client: "Local government",
    year: "2024",
    duration: "8 months",
    tags: ["Next.js", "SSO", "Accessibility", "FranceConnect"],
    overview: "Overview",
    overviewText: "Development of a modern citizen portal allowing residents to complete administrative procedures online. The project emphasized universal accessibility (WCAG AA) and integration with national SSO for simplified and secure authentication.",
    features: "Key Features",
    featuresList: [
      { icon: Users, title: "SSO Integration", desc: "Secure national authentication" },
      { icon: FileText, title: "Online procedures", desc: "50+ digitized forms" },
      { icon: Shield, title: "Security", desc: "Encryption and GDPR compliance" },
      { icon: Clock, title: "Real-time tracking", desc: "Request progress status" },
      { icon: Accessibility, title: "Accessibility", desc: "WCAG AA, screen reader compatible" },
      { icon: CheckCircle, title: "E-signature", desc: "Legal document validation" },
    ],
    results: "Results",
    resultsList: [
      { value: "85%", label: "Online procedures" },
      { value: "-60%", label: "Processing time" },
      { value: "120K", label: "Active citizens" },
      { value: "AA", label: "WCAG compliance" },
    ],
  },
};

export default function PortailCitoyensPage() {
  const { locale } = useLocale();
  const t = content[locale];

  return (
    <div className="bg-black min-h-screen">
      
      {/* Header */}
      <section className="relative pt-32 pb-16">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/projets" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">{t.back}</span>
            </Link>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              <div className="flex-1">
                <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">{t.category}</span>
                <h1 className="text-4xl lg:text-6xl font-light text-white mt-3 leading-[1.1]">{t.title}</h1>
                <p className="text-lg text-white/60 mt-6 max-w-2xl leading-relaxed">{t.subtitle}</p>
                <div className="flex flex-wrap gap-2 mt-8">
                  {t.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 text-xs font-medium text-white/70 border border-white/10 bg-white/[0.02]">{tag}</span>
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

      {/* Main Mockup */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#111]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-black/50 rounded-sm px-4 py-1.5 text-xs text-white/40 max-w-md mx-auto">
                    services.maville.fr
                  </div>
                </div>
              </div>

              <div className="aspect-[16/10] bg-[#fafafa] relative overflow-hidden">
                {/* Header */}
                <div className="bg-[#0f172a] px-8 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-sm">M</span>
                    </div>
                    <div>
                      <span className="text-white text-sm font-medium">Ma Ville</span>
                      <span className="text-white/40 text-xs block">Services en ligne</span>
                    </div>
                  </div>
                  <nav className="hidden lg:flex items-center gap-6 text-xs text-white/70">
                    <span>Accueil</span>
                    <span>Démarches</span>
                    <span>Mes dossiers</span>
                    <span>Aide</span>
                  </nav>
                  <button className="px-4 py-2 bg-white text-[#0f172a] text-xs font-medium rounded">
                    Se connecter
                  </button>
                </div>

                {/* Hero */}
                <div className="px-8 lg:px-16 py-12 bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
                  <div className="max-w-2xl">
                    <h2 className="text-2xl lg:text-4xl font-light text-white leading-tight">
                      Vos démarches<br />
                      <span className="text-white/60">simplifiées</span>
                    </h2>
                    <p className="text-sm text-white/50 mt-4 max-w-md">
                      Effectuez vos démarches administratives 24h/24, suivez vos demandes et recevez vos documents en ligne.
                    </p>
                    <div className="flex gap-3 mt-6">
                      <button className="px-5 py-2.5 bg-white text-[#0f172a] text-xs font-medium rounded">
                        Commencer une démarche
                      </button>
                      <button className="px-5 py-2.5 bg-white/10 text-white text-xs font-medium rounded border border-white/20">
                        Suivre ma demande
                      </button>
                    </div>
                  </div>
                </div>

                {/* Services grid */}
                <div className="px-8 lg:px-16 py-8 bg-white">
                  <h3 className="text-sm font-medium text-neutral-800 mb-6">Démarches populaires</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { icon: FileText, title: "État civil", desc: "Actes de naissance, mariage..." },
                      { icon: Building2, title: "Urbanisme", desc: "Permis, déclarations..." },
                      { icon: GraduationCap, title: "Scolarité", desc: "Inscriptions, cantine..." },
                      { icon: Car, title: "Stationnement", desc: "Cartes, abonnements..." },
                    ].map((service) => (
                      <div key={service.title} className="p-4 border border-neutral-200 rounded hover:border-neutral-300 transition-colors cursor-pointer group">
                        <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                          <service.icon className="w-5 h-5 text-neutral-600" />
                        </div>
                        <h4 className="text-sm font-medium text-neutral-800 mt-3">{service.title}</h4>
                        <p className="text-xs text-neutral-500 mt-1">{service.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FranceConnect badge */}
                <div className="absolute bottom-4 right-4 bg-white px-3 py-2 rounded shadow-lg flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#0f172a] rounded flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">FC</span>
                  </div>
                  <span className="text-[10px] text-neutral-600">FranceConnect</span>
                </div>
              </div>
            </div>

            <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-white/20" />
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t border-r border-white/20" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b border-l border-white/20" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-white/20" />
          </motion.div>
        </div>
      </section>

      {/* Overview & Tech */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">{t.overview}</span>
              <p className="text-lg lg:text-xl text-white/80 mt-6 leading-relaxed">{t.overviewText}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">Stack technique</span>
              <div className="mt-6 space-y-3">
                {["Next.js 14", "TypeScript", "PostgreSQL", "FranceConnect API", "DocuSign", "Matomo Analytics"].map((tech) => (
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">{t.features}</span>
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

      {/* Secondary Mockups - Forms & Tracking */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Formulaires & Suivi" : "Forms & Tracking"}
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Detailed Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                  <span className="text-[10px] text-white/30">{locale === "fr" ? "Formulaire de demande" : "Request Form"}</span>
                </div>
                <HelpCircle className="w-3 h-3 text-white/30" />
              </div>
              <div className="aspect-[4/3] bg-white p-5 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0f172a] rounded-lg flex items-center justify-center">
                      <Baby className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-neutral-800">Demande d&apos;acte de naissance</h3>
                      <p className="text-[10px] text-neutral-500">Réf: ACT-2024-00847</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-neutral-400">Étape 2/4</span>
                </div>
                
                <div className="flex gap-1 mb-5">
                  {[1,2,3,4].map((step) => (
                    <div key={step} className="flex-1 flex items-center gap-1">
                      <div className={`flex-1 h-1 rounded ${step <= 2 ? 'bg-[#0f172a]' : 'bg-neutral-200'}`} />
                      <span className={`text-[8px] ${step <= 2 ? 'text-[#0f172a]' : 'text-neutral-300'}`}>{step}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-neutral-500 block mb-1">Nom de naissance *</label>
                      <input type="text" className="w-full px-3 py-2 border border-neutral-300 rounded text-xs" defaultValue="DUPONT" />
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-500 block mb-1">Prénom(s) *</label>
                      <input type="text" className="w-full px-3 py-2 border border-neutral-300 rounded text-xs" defaultValue="Marie Louise" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-neutral-500 block mb-1">Date de naissance *</label>
                      <input type="text" className="w-full px-3 py-2 border border-neutral-300 rounded text-xs" defaultValue="15/03/1985" />
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-500 block mb-1">Lieu de naissance *</label>
                      <input type="text" className="w-full px-3 py-2 border border-neutral-300 rounded text-xs" defaultValue="Lyon (69)" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-500 block mb-1">Motif de la demande</label>
                    <select className="w-full px-3 py-2 border border-neutral-300 rounded text-xs text-neutral-700">
                      <option>Démarche administrative</option>
                    </select>
                  </div>
                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded">
                    <div className="flex items-start gap-2">
                      <Info className="w-3 h-3 text-neutral-500 mt-0.5" />
                      <p className="text-[10px] text-neutral-600">Vous pouvez joindre un justificatif d&apos;identité à l&apos;étape suivante.</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <button className="px-4 py-2 text-[10px] text-neutral-600 border border-neutral-300 rounded flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" /> Précédent
                  </button>
                  <button className="flex-1 px-4 py-2 bg-[#0f172a] text-white text-[10px] rounded flex items-center justify-center gap-1">
                    Continuer <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Detailed Tracking */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                  <span className="text-[10px] text-white/30">{locale === "fr" ? "Suivi demande" : "Request Tracking"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Printer className="w-3 h-3 text-white/30" />
                  <Share2 className="w-3 h-3 text-white/30" />
                </div>
              </div>
              <div className="aspect-[4/3] bg-white p-5 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-800">Acte de naissance</h3>
                    <p className="text-[10px] text-neutral-500">Réf: ACT-2024-00847 • Déposée le 15/01/2024</p>
                  </div>
                  <span className="px-2 py-1 bg-neutral-200 text-neutral-700 text-[10px] rounded">En traitement</span>
                </div>
                
                <div className="relative pl-4 border-l-2 border-neutral-200 space-y-4 mb-4">
                  {[
                    { status: "done", title: "Demande déposée", date: "15/01 - 14:32", desc: "Formulaire soumis avec succès" },
                    { status: "done", title: "Vérification identité", date: "15/01 - 14:35", desc: "FranceConnect validé" },
                    { status: "current", title: "Traitement en cours", date: "16/01 - 09:00", desc: "Service état civil" },
                    { status: "pending", title: "Document prêt", date: "Estimation: 18/01", desc: "Notification par email" },
                  ].map((step, i) => (
                    <div key={i} className="relative">
                      <div className={`absolute -left-[21px] w-4 h-4 rounded-full border-2 ${
                        step.status === 'done' ? 'bg-neutral-800 border-neutral-800' : 
                        step.status === 'current' ? 'bg-neutral-600 border-neutral-600' : 
                        'bg-white border-neutral-300'
                      } flex items-center justify-center`}>
                        {step.status === 'done' && <CheckCircle className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <div className="ml-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-medium ${step.status === 'pending' ? 'text-neutral-400' : 'text-neutral-800'}`}>{step.title}</span>
                          <span className="text-[10px] text-neutral-400">{step.date}</span>
                        </div>
                        <p className={`text-[10px] ${step.status === 'pending' ? 'text-neutral-300' : 'text-neutral-500'}`}>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-neutral-400" />
                      <span className="text-[10px] text-neutral-600">Une question sur votre demande ?</span>
                    </div>
                    <button className="text-[10px] text-[#0f172a] font-medium">Contacter le service</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* More Detailed Views */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Espace personnel & Services" : "Personal Space & Services"}
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* User Dashboard */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center gap-4 px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
                <span className="text-[10px] text-white/30">{locale === "fr" ? "Mon espace" : "My Dashboard"}</span>
              </div>
              <div className="aspect-[4/3] bg-[#f8fafc] p-5 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0f172a] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">MD</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-neutral-800">Bonjour Marie</h3>
                      <p className="text-[10px] text-neutral-500">Dernière connexion: Aujourd&apos;hui, 14:32</p>
                    </div>
                  </div>
                  <Bell className="w-4 h-4 text-neutral-400" />
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { icon: FileText, label: "Demandes", value: "3" },
                    { icon: FileCheck, label: "Terminées", value: "12" },
                    { icon: Clock, label: "En attente", value: "1" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white p-3 rounded-lg border border-neutral-200">
                      <div className="w-6 h-6 bg-neutral-100 rounded flex items-center justify-center mb-2">
                        <stat.icon className="w-3 h-3 text-neutral-600" />
                      </div>
                      <p className="text-lg font-medium text-neutral-800">{stat.value}</p>
                      <p className="text-[10px] text-neutral-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white rounded-lg border border-neutral-200 p-3 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-medium text-neutral-700">Demandes récentes</span>
                    <span className="text-[10px] text-[#0f172a]">Voir tout</span>
                  </div>
                  {[
                    { title: "Acte de naissance", status: "En cours", icon: FileText },
                    { title: "Carte stationnement", status: "Validé", icon: Car },
                  ].map((req) => (
                    <div key={req.title} className="flex items-center gap-3 py-2 border-t border-neutral-100">
                      <req.icon className="w-4 h-4 text-neutral-400" />
                      <span className="flex-1 text-xs text-neutral-700">{req.title}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded ${req.status === 'Validé' ? 'bg-neutral-200 text-neutral-700' : 'bg-neutral-100 text-neutral-600'}`}>{req.status}</span>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-2 bg-white rounded border border-neutral-200 flex items-center gap-2 text-[10px] text-neutral-700">
                    <Download className="w-3 h-3" /> Mes documents
                  </button>
                  <button className="p-2 bg-white rounded border border-neutral-200 flex items-center gap-2 text-[10px] text-neutral-700">
                    <User className="w-3 h-3" /> Mon profil
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Services Catalog */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center gap-4 px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
                <span className="text-[10px] text-white/30">{locale === "fr" ? "Catalogue des démarches" : "Services Catalog"}</span>
              </div>
              <div className="aspect-[4/3] bg-white p-5 overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-1 flex items-center gap-2 bg-neutral-100 rounded-lg px-3 py-2">
                    <Search className="w-4 h-4 text-neutral-400" />
                    <span className="text-xs text-neutral-400">Rechercher une démarche...</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[
                    { icon: FileText, label: "État civil" },
                    { icon: Building2, label: "Urbanisme" },
                    { icon: GraduationCap, label: "Scolarité" },
                    { icon: Car, label: "Transport" },
                  ].map((cat) => (
                    <button key={cat.label} className="p-2 rounded-lg border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50 transition-colors">
                      <div className="w-6 h-6 bg-neutral-100 rounded mx-auto mb-1 flex items-center justify-center">
                        <cat.icon className="w-3 h-3 text-neutral-600" />
                      </div>
                      <span className="text-[10px] text-neutral-600 block text-center">{cat.label}</span>
                    </button>
                  ))}
                </div>
                
                <p className="text-[10px] font-medium text-neutral-500 mb-2">Démarches populaires</p>
                <div className="space-y-2">
                  {[
                    { icon: FileText, title: "Acte de naissance", time: "5 min", online: true },
                    { icon: Home, title: "Attestation de domicile", time: "3 min", online: true },
                    { icon: Car, title: "Carte de stationnement", time: "10 min", online: true },
                    { icon: GraduationCap, title: "Inscription scolaire", time: "15 min", online: true },
                  ].map((service) => (
                    <div key={service.title} className="flex items-center gap-3 p-2 rounded border border-neutral-200 hover:border-neutral-300 transition-colors cursor-pointer">
                      <service.icon className="w-4 h-4 text-neutral-400" />
                      <div className="flex-1">
                        <span className="text-xs text-neutral-800">{service.title}</span>
                        <span className="text-[10px] text-neutral-400 block">Durée estimée: {service.time}</span>
                      </div>
                      {service.online && <span className="text-[8px] text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded">En ligne</span>}
                      <ChevronRight className="w-4 h-4 text-neutral-300" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Mockups - Documents & Appointments */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Documents & Rendez-vous" : "Documents & Appointments"}
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Document Upload */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center gap-4 px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
                <span className="text-[10px] text-white/30">{locale === "fr" ? "Téléversement de documents" : "Document Upload"}</span>
              </div>
              <div className="aspect-[4/3] bg-white p-5 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-800">Pièces justificatives</h3>
                    <p className="text-[10px] text-neutral-500">Demande ACT-2024-00847</p>
                  </div>
                  <span className="text-[10px] text-neutral-400">2/3 documents</span>
                </div>
                
                <div className="border-2 border-dashed border-neutral-200 rounded-lg p-6 text-center mb-4 hover:border-neutral-400 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
                  <p className="text-xs text-neutral-600 mb-1">Glissez vos fichiers ici</p>
                  <p className="text-[10px] text-neutral-400">ou cliquez pour parcourir</p>
                  <p className="text-[10px] text-neutral-300 mt-2">PDF, JPG, PNG • Max 10 Mo</p>
                </div>
                
                <div className="space-y-2">
                  {[
                    { name: "carte_identite.pdf", size: "2.4 Mo", status: "validated" },
                    { name: "justificatif_domicile.pdf", size: "1.8 Mo", status: "validated" },
                    { name: "Livret de famille", size: "-", status: "required" },
                  ].map((doc, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${doc.status === 'required' ? 'border-dashed border-neutral-300 bg-neutral-50' : 'border-neutral-200 bg-white'}`}>
                      <FileText className={`w-4 h-4 ${doc.status === 'required' ? 'text-neutral-300' : 'text-neutral-500'}`} />
                      <div className="flex-1">
                        <p className={`text-xs ${doc.status === 'required' ? 'text-neutral-400' : 'text-neutral-700'}`}>{doc.name}</p>
                        {doc.size !== '-' && <p className="text-[10px] text-neutral-400">{doc.size}</p>}
                      </div>
                      {doc.status === 'validated' && (
                        <div className="flex items-center gap-1 text-[10px] text-neutral-600">
                          <CheckCircle className="w-3 h-3" /> Validé
                        </div>
                      )}
                      {doc.status === 'required' && (
                        <span className="text-[10px] text-neutral-400">Requis</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Appointment Booking */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center gap-4 px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
                <span className="text-[10px] text-white/30">{locale === "fr" ? "Prise de rendez-vous" : "Appointment Booking"}</span>
              </div>
              <div className="aspect-[4/3] bg-white p-5 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-800">Rendez-vous en mairie</h3>
                    <p className="text-[10px] text-neutral-500">Service État Civil</p>
                  </div>
                  <MapPin className="w-4 h-4 text-neutral-400" />
                </div>
                
                <div className="mb-4">
                  <p className="text-[10px] font-medium text-neutral-500 mb-2">Sélectionnez une date</p>
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
                      <div key={i} className="text-neutral-400 py-1">{d}</div>
                    ))}
                    {[...Array(31)].map((_, i) => {
                      const disabled = i < 14 || [19, 20, 26, 27].includes(i);
                      const selected = i === 17;
                      return (
                        <div key={i} className={`py-1.5 rounded cursor-pointer transition-colors ${
                          disabled ? 'text-neutral-200' : 
                          selected ? 'bg-neutral-800 text-white' : 
                          'text-neutral-700 hover:bg-neutral-100'
                        }`}>
                          {i + 1}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <p className="text-[10px] font-medium text-neutral-500 mb-2">Créneaux disponibles - 18 janvier</p>
                  <div className="grid grid-cols-4 gap-2">
                    {['09:00', '09:30', '10:00', '10:30', '14:00', '14:30', '15:00', '15:30'].map((time, i) => (
                      <button key={i} className={`py-2 text-[10px] rounded border transition-colors ${
                        i === 2 ? 'bg-neutral-800 text-white border-neutral-800' : 
                        'border-neutral-200 text-neutral-600 hover:border-neutral-400'
                      }`}>
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button className="w-full mt-4 py-2.5 bg-[#0f172a] text-white text-[10px] font-medium rounded flex items-center justify-center gap-2">
                  <Calendar className="w-3 h-3" /> Confirmer le rendez-vous
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notification Center & Accessibility */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Notifications & Accessibilité" : "Notifications & Accessibility"}
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Notification Center */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center gap-4 px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
                <span className="text-[10px] text-white/30">{locale === "fr" ? "Centre de notifications" : "Notification Center"}</span>
              </div>
              <div className="aspect-[4/3] bg-[#f8fafc] p-5 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-neutral-800">Notifications</h3>
                  <span className="text-[10px] text-neutral-500">3 non lues</span>
                </div>
                
                <div className="flex gap-2 mb-4">
                  {['Toutes', 'Non lues', 'Demandes', 'Alertes'].map((tab, i) => (
                    <button key={tab} className={`px-3 py-1 text-[10px] rounded-full ${i === 0 ? 'bg-neutral-800 text-white' : 'bg-white border border-neutral-200 text-neutral-600'}`}>
                      {tab}
                    </button>
                  ))}
                </div>
                
                <div className="space-y-2">
                  {[
                    { title: "Document prêt", desc: "Votre acte de naissance est disponible", time: "Il y a 2h", unread: true, icon: FileCheck },
                    { title: "Demande validée", desc: "Carte stationnement approuvée", time: "Hier", unread: true, icon: CheckCircle },
                    { title: "Rappel rendez-vous", desc: "RDV mairie demain à 10h00", time: "Hier", unread: true, icon: Calendar },
                    { title: "Nouvelle démarche", desc: "Inscription cantine disponible", time: "Il y a 3j", unread: false, icon: Info },
                    { title: "Paiement confirmé", desc: "Facture cantine réglée", time: "Il y a 5j", unread: false, icon: CheckCircle },
                  ].map((notif, i) => (
                    <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${notif.unread ? 'bg-white border-neutral-200' : 'bg-neutral-50 border-neutral-100'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${notif.unread ? 'bg-neutral-100' : 'bg-neutral-50'}`}>
                        <notif.icon className="w-4 h-4 text-neutral-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className={`text-xs ${notif.unread ? 'font-medium text-neutral-800' : 'text-neutral-600'}`}>{notif.title}</p>
                          {notif.unread && <div className="w-1.5 h-1.5 bg-neutral-800 rounded-full" />}
                        </div>
                        <p className="text-[10px] text-neutral-500">{notif.desc}</p>
                        <p className="text-[10px] text-neutral-400 mt-1">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Accessibility Panel */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center gap-4 px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
                <span className="text-[10px] text-white/30">{locale === "fr" ? "Options d'accessibilité" : "Accessibility Options"}</span>
              </div>
              <div className="aspect-[4/3] bg-white p-5 overflow-hidden">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                    <Accessibility className="w-5 h-5 text-neutral-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-neutral-800">Accessibilité</h3>
                    <p className="text-[10px] text-neutral-500">Conformité RGAA niveau AA</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-medium text-neutral-600 mb-2">Taille du texte</p>
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 border border-neutral-200 rounded text-neutral-600 text-xs">A-</button>
                      <div className="flex-1 h-1 bg-neutral-100 rounded-full">
                        <div className="w-1/2 h-full bg-neutral-800 rounded-full" />
                      </div>
                      <button className="w-8 h-8 border border-neutral-200 rounded text-neutral-600 text-sm font-medium">A+</button>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-[10px] font-medium text-neutral-600 mb-2">Contraste</p>
                    <div className="grid grid-cols-3 gap-2">
                      {['Normal', 'Élevé', 'Inversé'].map((opt, i) => (
                        <button key={opt} className={`py-2 text-[10px] rounded border transition-colors ${i === 0 ? 'bg-neutral-800 text-white border-neutral-800' : 'border-neutral-200 text-neutral-600'}`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {[
                      { label: "Lecteur d'écran", desc: "Compatible NVDA, JAWS, VoiceOver", enabled: true },
                      { label: "Navigation clavier", desc: "Raccourcis et focus visible", enabled: true },
                      { label: "Animations réduites", desc: "Mouvements limités", enabled: false },
                      { label: "Mode dyslexie", desc: "Police adaptée OpenDyslexic", enabled: false },
                    ].map((option) => (
                      <div key={option.label} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                        <div>
                          <p className="text-xs text-neutral-700">{option.label}</p>
                          <p className="text-[10px] text-neutral-400">{option.desc}</p>
                        </div>
                        <div className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${option.enabled ? 'bg-neutral-800' : 'bg-neutral-200'}`}>
                          <div className={`w-4 h-4 bg-white rounded-full mt-0.5 transition-transform ${option.enabled ? 'ml-5' : 'ml-0.5'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">{t.results}</span>
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
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
