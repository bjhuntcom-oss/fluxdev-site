"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Brain, Target, MessageSquare, BarChart, Zap, Users, Search, Filter, Plus, Phone, Mail, Calendar, Clock, Star, TrendingUp, TrendingDown, ChevronRight, MoreHorizontal, Check, AlertCircle, Building2, DollarSign, PieChart, Activity, Send, Sparkles, RefreshCw, Eye, Edit, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/contexts";

const content = {
  fr: {
    back: "Retour aux projets",
    category: "Plateforme SaaS",
    title: "CRM Augmenté par IA",
    subtitle: "CRM intelligent avec scoring prédictif, automatisation des relances et analyse sentimentale des échanges.",
    client: "Scale-up B2B",
    year: "2024",
    duration: "5 mois",
    tags: ["AI", "API", "Salesforce", "NLP", "Python"],
    overview: "Présentation",
    overviewText: "Développement d'un CRM nouvelle génération intégrant l'intelligence artificielle à chaque étape du cycle de vente. Le système analyse automatiquement les interactions clients, prédit les probabilités de conversion et suggère les meilleures actions à entreprendre.",
    features: "Fonctionnalités clés",
    featuresList: [
      { icon: Brain, title: "Scoring prédictif", desc: "Probabilité de conversion par ML" },
      { icon: Target, title: "Lead prioritization", desc: "Classement automatique des prospects" },
      { icon: MessageSquare, title: "Analyse sentimentale", desc: "Détection du ton des échanges" },
      { icon: Zap, title: "Automatisation", desc: "Relances intelligentes programmées" },
      { icon: BarChart, title: "Prévisions ventes", desc: "Forecasting basé sur données" },
      { icon: Users, title: "Enrichissement", desc: "Données prospects automatiques" },
    ],
    results: "Résultats",
    resultsList: [
      { value: "+45%", label: "Taux conversion" },
      { value: "-30%", label: "Cycle de vente" },
      { value: "92%", label: "Précision scoring" },
      { value: "3x", label: "Productivité commerciale" },
    ],
  },
  en: {
    back: "Back to projects",
    category: "SaaS Platform",
    title: "AI-Enhanced CRM",
    subtitle: "Intelligent CRM with predictive scoring, automated follow-ups and sentiment analysis.",
    client: "B2B Scale-up",
    year: "2024",
    duration: "5 months",
    tags: ["AI", "API", "Salesforce", "NLP", "Python"],
    overview: "Overview",
    overviewText: "Development of a next-generation CRM integrating artificial intelligence at every stage of the sales cycle. The system automatically analyzes customer interactions, predicts conversion probabilities and suggests the best actions to take.",
    features: "Key Features",
    featuresList: [
      { icon: Brain, title: "Predictive scoring", desc: "ML-based conversion probability" },
      { icon: Target, title: "Lead prioritization", desc: "Automatic prospect ranking" },
      { icon: MessageSquare, title: "Sentiment analysis", desc: "Exchange tone detection" },
      { icon: Zap, title: "Automation", desc: "Smart scheduled follow-ups" },
      { icon: BarChart, title: "Sales forecasting", desc: "Data-driven predictions" },
      { icon: Users, title: "Enrichment", desc: "Automatic prospect data" },
    ],
    results: "Results",
    resultsList: [
      { value: "+45%", label: "Conversion rate" },
      { value: "-30%", label: "Sales cycle" },
      { value: "92%", label: "Scoring accuracy" },
      { value: "3x", label: "Sales productivity" },
    ],
  },
};

export default function CrmIaPage() {
  const { locale } = useLocale();
  const t = content[locale];

  return (
    <div className="bg-black min-h-screen">
      
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
                <div><span className="text-[10px] text-white/40 uppercase tracking-wider">Client</span><p className="text-white/80 text-sm mt-1">{t.client}</p></div>
                <div><span className="text-[10px] text-white/40 uppercase tracking-wider">{locale === "fr" ? "Année" : "Year"}</span><p className="text-white/80 text-sm mt-1">{t.year}</p></div>
                <div><span className="text-[10px] text-white/40 uppercase tracking-wider">{locale === "fr" ? "Durée" : "Duration"}</span><p className="text-white/80 text-sm mt-1">{t.duration}</p></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Mockup */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#111]">
                <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-white/20" /><div className="w-2.5 h-2.5 rounded-full bg-white/20" /><div className="w-2.5 h-2.5 rounded-full bg-white/20" /></div>
                <div className="flex-1 mx-4"><div className="bg-black/50 rounded-sm px-4 py-1.5 text-xs text-white/40 max-w-md mx-auto">crm.scaleup.io</div></div>
              </div>

              <div className="aspect-[16/9] bg-[#0d0d0d] flex">
                {/* Sidebar */}
                <div className="w-14 lg:w-52 border-r border-white/5 p-3 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center"><span className="text-white font-bold text-xs">C</span></div>
                    <span className="hidden lg:block text-sm font-medium text-white">CRM Pro</span>
                  </div>
                  <nav className="space-y-1">
                    {["Dashboard", "Leads", "Pipeline", "Contacts", "Analyses", "Automatisations"].map((item, i) => (
                      <div key={item} className={`flex items-center gap-2 px-2 py-1.5 rounded text-[10px] ${i === 1 ? "bg-white/10 text-white" : "text-white/40"}`}>
                        <div className={`w-3 h-3 rounded ${i === 1 ? "bg-white/30" : "bg-white/10"}`} />
                        <span className="hidden lg:block">{item}</span>
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Main */}
                <div className="flex-1 p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-sm lg:text-lg font-medium text-white">Leads</h2>
                      <p className="text-[10px] text-white/40">127 leads actifs</p>
                    </div>
                    <button className="px-3 py-1.5 bg-white/10 text-white text-[10px] rounded border border-white/20">+ Nouveau lead</button>
                  </div>

                  {/* Lead cards */}
                  <div className="grid lg:grid-cols-3 gap-4">
                    {[
                      { name: "TechCorp SAS", contact: "Jean Dupont", score: 92, stage: "Négociation", value: "€45,000", sentiment: "positive" },
                      { name: "InnoGroup", contact: "Marie Martin", score: 78, stage: "Proposition", value: "€28,000", sentiment: "neutral" },
                      { name: "DataFlow Inc", contact: "Pierre Bernard", score: 65, stage: "Qualification", value: "€15,000", sentiment: "positive" },
                    ].map((lead) => (
                      <div key={lead.name} className="bg-white/[0.03] border border-white/5 rounded p-4 hover:border-white/20 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="text-xs font-medium text-white">{lead.name}</p>
                            <p className="text-[10px] text-white/40">{lead.contact}</p>
                          </div>
                          <div className={`px-2 py-0.5 rounded text-[10px] ${lead.score >= 80 ? "bg-white/20 text-white" : lead.score >= 60 ? "bg-white/10 text-white/70" : "bg-white/5 text-white/50"}`}>
                            {lead.score}%
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px]"><span className="text-white/40">Stage</span><span className="text-white/70">{lead.stage}</span></div>
                          <div className="flex justify-between text-[10px]"><span className="text-white/40">Valeur</span><span className="text-white/70">{lead.value}</span></div>
                          <div className="flex justify-between text-[10px] items-center">
                            <span className="text-white/40">Sentiment</span>
                            <span className={`flex items-center gap-1 ${lead.sentiment === "positive" ? "text-white/80" : "text-white/50"}`}>
                              <span className={`w-2 h-2 rounded-full ${lead.sentiment === "positive" ? "bg-white/60" : "bg-white/30"}`} /> {lead.sentiment}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-white/5">
                          <div className="flex items-center gap-2">
                            <Brain className="w-3 h-3 text-white/50" />
                            <p className="text-[9px] text-white/50">IA: Relance recommandée demain</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AI Insights panel */}
                  <div className="mt-6 bg-white/[0.02] border border-white/10 rounded p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-4 h-4 text-white/50" />
                      <span className="text-xs font-medium text-white">Insights IA</span>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-4 text-[10px]">
                      <div className="flex items-center gap-2"><span className="text-white/40">→</span><span className="text-white/70">3 leads prêts à closer cette semaine</span></div>
                      <div className="flex items-center gap-2"><span className="text-white/40">→</span><span className="text-white/70">TechCorp: sentiment très positif (+15%)</span></div>
                      <div className="flex items-center gap-2"><span className="text-white/40">→</span><span className="text-white/70">Prévision Q1: €234K (+23% vs objectif)</span></div>
                    </div>
                  </div>
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

      {/* Overview, Features, Results, CTA - same pattern */}
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
                {["React", "Python / FastAPI", "OpenAI GPT-4", "PostgreSQL", "Redis", "Salesforce API"].map((tech) => (
                  <div key={tech} className="flex items-center gap-3 text-white/70 text-sm"><div className="w-1 h-1 bg-white/40" />{tech}</div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">{t.features}</span>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.featuresList.map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 border border-white/[0.06] bg-white/[0.01] hover:border-white/20 transition-colors">
                <feature.icon className="w-5 h-5 text-white/40 mb-4" />
                <h3 className="text-white font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Mockups - Pipeline & Contact */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Pipeline & Contacts" : "Pipeline & Contacts"}
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Pipeline View */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /></div>
                  <span className="text-[10px] text-white/30">{locale === "fr" ? "Pipeline commercial" : "Sales Pipeline"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-3 h-3 text-white/30" />
                  <Plus className="w-3 h-3 text-white/30" />
                </div>
              </div>
              <div className="aspect-[4/3] bg-[#0d0d0d] p-4 overflow-x-auto">
                <div className="flex gap-3 min-w-[600px]">
                  {[
                    { stage: "Qualification", count: 8, value: "€45K", deals: [{ name: "DataFlow", score: 65 }, { name: "LogiPro", score: 58 }] },
                    { stage: "Proposition", count: 5, value: "€82K", deals: [{ name: "InnoGroup", score: 78 }, { name: "TechVision", score: 72 }] },
                    { stage: "Négociation", count: 3, value: "€124K", deals: [{ name: "TechCorp", score: 92 }, { name: "CloudSys", score: 85 }] },
                    { stage: "Closing", count: 2, value: "€67K", deals: [{ name: "NetPrime", score: 95 }] },
                  ].map((col) => (
                    <div key={col.stage} className="flex-1 min-w-[140px]">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-[10px] font-medium text-white">{col.stage}</p>
                          <p className="text-[8px] text-white/40">{col.count} deals • {col.value}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {col.deals.map((deal) => (
                          <div key={deal.name} className="bg-white/[0.03] border border-white/5 rounded p-2 hover:border-white/20 transition-colors cursor-pointer">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] text-white">{deal.name}</span>
                              <span className={`text-[8px] px-1.5 py-0.5 rounded ${deal.score >= 80 ? 'bg-white/20 text-white' : 'bg-white/10 text-white/70'}`}>{deal.score}%</span>
                            </div>
                            <div className="h-1 bg-white/10 rounded overflow-hidden">
                              <div className="h-full rounded bg-white/60" style={{ width: `${deal.score}%` }} />
                            </div>
                          </div>
                        ))}
                        <button className="w-full py-1.5 border border-dashed border-white/10 rounded text-[10px] text-white/30 hover:border-white/20 transition-colors">+ Ajouter</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Detail */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /></div>
                  <span className="text-[10px] text-white/30">{locale === "fr" ? "Fiche contact" : "Contact Detail"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Edit className="w-3 h-3 text-white/30" />
                  <MoreHorizontal className="w-3 h-3 text-white/30" />
                </div>
              </div>
              <div className="aspect-[4/3] bg-[#0d0d0d] p-4">
                <div className="flex items-start gap-4 mb-4 pb-4 border-b border-white/5">
                  <div className="w-14 h-14 bg-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg font-medium">JD</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-medium text-white">Jean Dupont</h3>
                      <span className="px-1.5 py-0.5 bg-white/20 text-white text-[8px] rounded">Hot lead</span>
                    </div>
                    <p className="text-[10px] text-white/50">Directeur Commercial • TechCorp SAS</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button className="flex items-center gap-1 text-[10px] text-white/50 hover:text-white"><Phone className="w-3 h-3" /> Appeler</button>
                      <button className="flex items-center gap-1 text-[10px] text-white/50 hover:text-white"><Mail className="w-3 h-3" /> Email</button>
                      <button className="flex items-center gap-1 text-[10px] text-white/50 hover:text-white"><Calendar className="w-3 h-3" /> RDV</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1"><Brain className="w-3 h-3 text-white/60" /><span className="text-lg font-medium text-white">92%</span></div>
                    <p className="text-[8px] text-white/40">Score IA</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { icon: Building2, label: "Entreprise", value: "TechCorp SAS" },
                    { icon: DollarSign, label: "Valeur deal", value: "€45,000" },
                    { icon: Clock, label: "Dernière activité", value: "Il y a 2h" },
                    { icon: Target, label: "Probabilité", value: "92%" },
                  ].map((item) => (
                    <div key={item.label} className="bg-white/[0.02] rounded p-2">
                      <item.icon className="w-3 h-3 text-white/30 mb-1" />
                      <p className="text-[8px] text-white/40">{item.label}</p>
                      <p className="text-[10px] text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white/[0.03] border border-white/10 rounded p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-3 h-3 text-white/50" />
                    <span className="text-[10px] font-medium text-white/70">Recommandation IA</span>
                  </div>
                  <p className="text-[10px] text-white/60">Sentiment très positif détecté dans le dernier email. Recommandation: envoyer la proposition finale aujourd&apos;hui.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* More Detailed Views - Analytics & Automation */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Analytics & Automatisations" : "Analytics & Automations"}
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Sales Forecast */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center gap-4 px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /></div>
                <span className="text-[10px] text-white/30">{locale === "fr" ? "Prévisions ventes" : "Sales Forecast"}</span>
              </div>
              <div className="aspect-[4/3] bg-[#0d0d0d] p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-white">Q1 2024</h3>
                    <p className="text-[10px] text-white/40">Prévision vs Objectif</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-white">€234K</p>
                    <p className="text-[10px] text-white/60 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +23% vs objectif</p>
                  </div>
                </div>
                
                <div className="h-24 mb-4 relative">
                  <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
                    <defs><linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="rgba(255,255,255,0.2)" /><stop offset="100%" stopColor="rgba(255,255,255,0)" /></linearGradient></defs>
                    <polygon fill="url(#grad)" points="0,60 50,50 100,55 150,35 200,40 250,25 300,20 300,80 0,80" />
                    <polyline fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" points="0,60 50,50 100,55 150,35 200,40 250,25 300,20" />
                    <line x1="0" y1="45" x2="300" y2="45" stroke="rgba(255,255,255,0.1)" strokeDasharray="4,4" />
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[8px] text-white/30">
                    <span>Jan</span><span>Fév</span><span>Mar</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Gagné", value: "€89K", trend: "+15%", color: "text-white" },
                    { label: "En cours", value: "€145K", trend: "32 deals", color: "text-white/80" },
                    { label: "Perdu", value: "€23K", trend: "-8%", color: "text-white/50" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/[0.02] rounded p-2 text-center">
                      <p className={`text-sm font-medium ${stat.color}`}>{stat.value}</p>
                      <p className="text-[8px] text-white/40">{stat.label}</p>
                      <p className="text-[8px] text-white/30">{stat.trend}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Automation Workflows */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /></div>
                  <span className="text-[10px] text-white/30">{locale === "fr" ? "Automatisations" : "Automations"}</span>
                </div>
                <button className="px-2 py-1 bg-white/10 text-white text-[10px] rounded border border-white/20 flex items-center gap-1"><Plus className="w-3 h-3" /> Créer</button>
              </div>
              <div className="aspect-[4/3] bg-[#0d0d0d] p-4">
                <div className="space-y-3">
                  {[
                    { name: "Relance leads inactifs", trigger: "Inactivité > 7j", actions: 3, enabled: true, runs: 45 },
                    { name: "Email bienvenue", trigger: "Nouveau lead", actions: 2, enabled: true, runs: 127 },
                    { name: "Alerte scoring élevé", trigger: "Score > 80%", actions: 2, enabled: true, runs: 23 },
                    { name: "Proposition auto", trigger: "Stage Négociation", actions: 4, enabled: false, runs: 0 },
                  ].map((auto, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded border ${auto.enabled ? 'bg-white/[0.02] border-white/5' : 'bg-white/[0.01] border-white/[0.03]'}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${auto.enabled ? 'bg-white/10' : 'bg-white/5'}`}>
                        <Zap className={`w-4 h-4 ${auto.enabled ? 'text-white/70' : 'text-white/20'}`} />
                      </div>
                      <div className="flex-1">
                        <p className={`text-[10px] font-medium ${auto.enabled ? 'text-white' : 'text-white/40'}`}>{auto.name}</p>
                        <p className="text-[8px] text-white/30">{auto.trigger} • {auto.actions} actions</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-white/50">{auto.runs} exécutions</p>
                        <div className={`w-8 h-4 rounded-full p-0.5 ${auto.enabled ? 'bg-white/40' : 'bg-white/10'}`}>
                          <div className={`w-3 h-3 bg-white rounded-full transition-transform ${auto.enabled ? 'translate-x-4' : ''}`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">{t.results}</span>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {t.resultsList.map((result, i) => (
              <motion.div key={result.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-3xl lg:text-4xl font-light text-white mb-2">{result.value}</div>
                <div className="text-xs text-white/50 uppercase tracking-wider">{result.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl lg:text-3xl font-light text-white mb-6">{locale === "fr" ? "Un projet similaire ?" : "Similar project?"}</h2>
            <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-medium uppercase tracking-wider hover:bg-white/90 transition-colors group">
              <span>{locale === "fr" ? "Discutons-en" : "Let's talk"}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
