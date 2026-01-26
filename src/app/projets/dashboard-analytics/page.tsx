"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, BarChart3, Brain, TrendingUp, Zap, Database, Lock, Bell, Settings, Users, Calendar, Download, Filter, Search, RefreshCw, ChevronDown, FileText, PieChart, Activity, Target, AlertTriangle, CheckCircle, Clock, Globe, Factory, Gauge, ArrowUp, ArrowDown, MoreHorizontal, Eye, Share2 } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/contexts";

const content = {
  fr: {
    back: "Retour aux projets",
    category: "Plateforme SaaS",
    title: "Dashboard Analytics IA",
    subtitle: "Plateforme d'analyse prédictive avec visualisations temps réel et recommandations automatisées par IA.",
    client: "Groupe industriel",
    year: "2025",
    duration: "5 mois",
    tags: ["React", "D3.js", "Machine Learning", "Python", "PostgreSQL"],
    overview: "Présentation",
    overviewText: "Conception d'une plateforme d'analytics avancée pour un groupe industriel international. Le dashboard centralise les données de production de 12 usines et utilise le machine learning pour prédire les tendances, optimiser les processus et alerter sur les anomalies.",
    features: "Fonctionnalités clés",
    featuresList: [
      { icon: BarChart3, title: "Visualisations temps réel", desc: "Graphiques interactifs et KPIs dynamiques" },
      { icon: Brain, title: "Prédictions IA", desc: "Modèles ML pour anticipation des tendances" },
      { icon: TrendingUp, title: "Recommandations", desc: "Suggestions d'optimisation automatiques" },
      { icon: Zap, title: "Alertes intelligentes", desc: "Détection d'anomalies en temps réel" },
      { icon: Database, title: "Data unifiée", desc: "Agrégation multi-sources transparente" },
      { icon: Lock, title: "Sécurité enterprise", desc: "SSO, RBAC et audit trail complet" },
    ],
    results: "Résultats",
    resultsList: [
      { value: "+23%", label: "Productivité" },
      { value: "-18%", label: "Temps d'arrêt" },
      { value: "12", label: "Usines connectées" },
      { value: "< 100ms", label: "Latence données" },
    ],
  },
  en: {
    back: "Back to projects",
    category: "SaaS Platform",
    title: "AI Analytics Dashboard",
    subtitle: "Predictive analytics platform with real-time visualizations and AI-automated recommendations.",
    client: "Industrial group",
    year: "2025",
    duration: "5 months",
    tags: ["React", "D3.js", "Machine Learning", "Python", "PostgreSQL"],
    overview: "Overview",
    overviewText: "Design of an advanced analytics platform for an international industrial group. The dashboard centralizes production data from 12 factories and uses machine learning to predict trends, optimize processes and alert on anomalies.",
    features: "Key Features",
    featuresList: [
      { icon: BarChart3, title: "Real-time visualizations", desc: "Interactive charts and dynamic KPIs" },
      { icon: Brain, title: "AI Predictions", desc: "ML models for trend anticipation" },
      { icon: TrendingUp, title: "Recommendations", desc: "Automatic optimization suggestions" },
      { icon: Zap, title: "Smart alerts", desc: "Real-time anomaly detection" },
      { icon: Database, title: "Unified data", desc: "Seamless multi-source aggregation" },
      { icon: Lock, title: "Enterprise security", desc: "SSO, RBAC and full audit trail" },
    ],
    results: "Results",
    resultsList: [
      { value: "+23%", label: "Productivity" },
      { value: "-18%", label: "Downtime" },
      { value: "12", label: "Connected factories" },
      { value: "< 100ms", label: "Data latency" },
    ],
  },
};

export default function DashboardAnalyticsPage() {
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

      {/* Main Dashboard Mockup */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              {/* Browser header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#111]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-black/50 rounded-sm px-4 py-1.5 text-xs text-white/40 max-w-md mx-auto">
                    analytics.industrie-groupe.com
                  </div>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="aspect-[16/9] bg-[#0d0d0d] flex">
                {/* Sidebar */}
                <div className="w-16 lg:w-56 border-r border-white/5 p-4 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 bg-white flex items-center justify-center">
                      <span className="text-black font-bold text-sm">A</span>
                    </div>
                    <span className="hidden lg:block text-sm font-medium text-white">Analytics</span>
                  </div>
                  <nav className="space-y-1">
                    {[
                      { label: "Dashboard", active: true },
                      { label: "Production", active: false },
                      { label: "Prédictions", active: false },
                      { label: "Alertes", active: false },
                      { label: "Rapports", active: false },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={`flex items-center gap-3 px-3 py-2 rounded text-xs ${
                          item.active ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded ${item.active ? "bg-white/20" : "bg-white/5"}`} />
                        <span className="hidden lg:block">{item.label}</span>
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Main content */}
                <div className="flex-1 p-4 lg:p-6 overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-sm lg:text-lg font-medium text-white">Vue d'ensemble</h2>
                      <p className="text-[10px] lg:text-xs text-white/40">Dernière mise à jour: il y a 2 min</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="px-3 py-1.5 bg-white/5 rounded text-[10px] lg:text-xs text-white/60">7 jours</div>
                      <div className="px-3 py-1.5 bg-white/10 rounded text-[10px] lg:text-xs text-white">30 jours</div>
                    </div>
                  </div>

                  {/* KPI Cards */}
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {[
                      { label: "Production", value: "847K", change: "+12.3%", positive: true },
                      { label: "Efficacité", value: "94.2%", change: "+2.1%", positive: true },
                      { label: "Temps d'arrêt", value: "1.2h", change: "-18%", positive: true },
                      { label: "Qualité", value: "99.1%", change: "+0.3%", positive: true },
                    ].map((kpi) => (
                      <div key={kpi.label} className="bg-white/[0.03] border border-white/5 rounded p-3 lg:p-4">
                        <p className="text-[8px] lg:text-[10px] text-white/40 uppercase tracking-wider">{kpi.label}</p>
                        <p className="text-lg lg:text-2xl font-light text-white mt-1">{kpi.value}</p>
                        <p className={`text-[10px] lg:text-xs mt-1 ${kpi.positive ? "text-green-400" : "text-red-400"}`}>
                          {kpi.change}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Charts */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* Main chart */}
                    <div className="col-span-2 bg-white/[0.02] border border-white/5 rounded p-4">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-xs text-white/60">Production par usine</p>
                        <div className="flex gap-4 text-[10px] text-white/40">
                          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-white rounded-full" /> Actuel</span>
                          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-white/30 rounded-full" /> Prévu</span>
                        </div>
                      </div>
                      {/* Chart visualization */}
                      <div className="h-32 lg:h-48 flex items-end gap-2">
                        {[65, 78, 45, 89, 72, 95, 68, 82, 75, 88, 92, 70].map((h, i) => (
                          <div key={i} className="flex-1 flex flex-col gap-1">
                            <div className="flex-1 flex flex-col justify-end gap-0.5">
                              <div className="bg-white/10 rounded-t" style={{ height: `${h * 0.3}%` }} />
                              <div className="bg-white rounded-t" style={{ height: `${h}%` }} />
                            </div>
                            <span className="text-[8px] text-white/30 text-center">U{i + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Side panel */}
                    <div className="space-y-4">
                      {/* AI Insights */}
                      <div className="bg-white/[0.02] border border-white/5 rounded p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Brain className="w-4 h-4 text-white/40" />
                          <p className="text-xs text-white/60">Insights IA</p>
                        </div>
                        <div className="space-y-2">
                          <div className="p-2 bg-green-500/10 border border-green-500/20 rounded">
                            <p className="text-[10px] text-green-400">Usine 6: +15% prévu demain</p>
                          </div>
                          <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded">
                            <p className="text-[10px] text-amber-400">Maintenance U3 recommandée</p>
                          </div>
                        </div>
                      </div>

                      {/* Mini pie chart */}
                      <div className="bg-white/[0.02] border border-white/5 rounded p-4">
                        <p className="text-xs text-white/60 mb-3">Répartition</p>
                        <div className="flex items-center justify-center">
                          <div className="relative w-20 h-20">
                            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                              <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                              <circle cx="18" cy="18" r="15.9" fill="none" stroke="white" strokeWidth="3" strokeDasharray="75, 100" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-sm font-medium text-white">75%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Corner accents */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-white/20" />
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t border-r border-white/20" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b border-l border-white/20" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-white/20" />
          </motion.div>
        </div>
      </section>

      {/* Overview */}
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
                {["React 18", "TypeScript", "D3.js / Recharts", "Python / FastAPI", "TensorFlow", "PostgreSQL / TimescaleDB"].map((tech) => (
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

      {/* Secondary Mockups - Detailed Views */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Écrans détaillés" : "Detailed Screens"}
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Factory Detail View */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                  <span className="text-[10px] text-white/30">{locale === "fr" ? "Détail Usine" : "Factory Detail"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-3 h-3 text-white/30" />
                  <Download className="w-3 h-3 text-white/30" />
                </div>
              </div>
              <div className="aspect-[4/3] bg-[#0d0d0d] p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <Factory className="w-5 h-5 text-white/60" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white">Usine 6 - Lyon</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="w-2 h-2 bg-green-400 rounded-full" />
                        <span className="text-[10px] text-green-400">Opérationnelle</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-white/5 rounded text-[10px] text-white/60 flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Live
                  </button>
                </div>
                
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { icon: Gauge, label: "Efficacité", value: "96.4%", trend: "+2.1%" },
                    { icon: Activity, label: "Production", value: "12.4K", trend: "+8%" },
                    { icon: Clock, label: "Uptime", value: "99.2%", trend: "+0.1%" },
                    { icon: AlertTriangle, label: "Alertes", value: "2", trend: "-3" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/[0.03] border border-white/5 rounded p-2.5">
                      <stat.icon className="w-3 h-3 text-white/30 mb-1" />
                      <p className="text-[8px] text-white/40">{stat.label}</p>
                      <p className="text-sm font-medium text-white">{stat.value}</p>
                      <p className="text-[8px] text-green-400">{stat.trend}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white/[0.02] border border-white/5 rounded p-3 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-white/50">Production temps réel</span>
                    <span className="text-[10px] text-white/30">24h</span>
                  </div>
                  <div className="h-16 flex items-end gap-0.5">
                    {[40,55,48,62,58,70,65,72,68,75,78,82,76,80,85,72,68,74,79,85,88,82,78,84].map((h, i) => (
                      <div key={i} className="flex-1 bg-white/60 rounded-t" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/[0.02] border border-white/5 rounded p-3">
                    <p className="text-[10px] text-white/50 mb-2">Équipes actives</p>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[1,2,3,4].map((i) => (<div key={i} className="w-6 h-6 bg-white/20 rounded-full border-2 border-[#0d0d0d]" />))}
                      </div>
                      <span className="text-xs text-white">+24</span>
                    </div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded p-3">
                    <p className="text-[10px] text-white/50 mb-2">Prochaine maintenance</p>
                    <p className="text-xs text-white">15 Jan - 08:00</p>
                    <p className="text-[10px] text-white/40">Calibration capteurs</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Alerts Center */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                  <span className="text-[10px] text-white/30">{locale === "fr" ? "Centre d'alertes" : "Alerts Center"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-[10px] rounded">3</span>
                  <Bell className="w-3 h-3 text-white/30" />
                </div>
              </div>
              <div className="aspect-[4/3] bg-[#0d0d0d] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-1 flex items-center gap-2 bg-white/5 rounded px-3 py-1.5">
                    <Search className="w-3 h-3 text-white/30" />
                    <span className="text-[10px] text-white/30">Rechercher...</span>
                  </div>
                  <button className="p-1.5 bg-white/5 rounded"><Filter className="w-3 h-3 text-white/40" /></button>
                </div>
                
                <div className="flex gap-2 mb-4">
                  {[
                    { label: "Toutes", count: 12, active: true },
                    { label: "Critiques", count: 3 },
                    { label: "Warning", count: 5 },
                    { label: "Info", count: 4 },
                  ].map((tab) => (
                    <button key={tab.label} className={`px-2 py-1 rounded text-[10px] flex items-center gap-1 ${tab.active ? 'bg-white/10 text-white' : 'text-white/40'}`}>
                      {tab.label} <span className="text-white/30">{tab.count}</span>
                    </button>
                  ))}
                </div>
                
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {[
                    { level: "critical", icon: AlertTriangle, title: "Surchauffe détectée", location: "Usine 3 - Ligne A", time: "5 min" },
                    { level: "critical", icon: AlertTriangle, title: "Pression anormale", location: "Usine 7 - Compresseur", time: "12 min" },
                    { level: "critical", icon: AlertTriangle, title: "Maintenance urgente", location: "Usine 1 - Moteur 4", time: "23 min" },
                    { level: "warning", icon: Clock, title: "Performance dégradée", location: "Usine 9 - Section B", time: "1h" },
                    { level: "info", icon: Settings, title: "Calibration requise", location: "Usine 12 - Capteur T3", time: "2h" },
                  ].map((alert, i) => (
                    <div key={i} className={`p-3 rounded border ${alert.level === "critical" ? "bg-red-500/10 border-red-500/20" : alert.level === "warning" ? "bg-amber-500/10 border-amber-500/20" : "bg-white/5 border-white/10"}`}>
                      <div className="flex items-start gap-3">
                        <alert.icon className={`w-4 h-4 mt-0.5 ${alert.level === "critical" ? "text-red-400" : alert.level === "warning" ? "text-amber-400" : "text-white/40"}`} />
                        <div className="flex-1">
                          <p className={`text-xs ${alert.level === "critical" ? "text-red-400" : alert.level === "warning" ? "text-amber-400" : "text-white/60"}`}>{alert.title}</p>
                          <p className="text-[10px] text-white/30">{alert.location}</p>
                        </div>
                        <span className="text-[10px] text-white/30">{alert.time}</span>
                      </div>
                    </div>
                  ))}
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
              {locale === "fr" ? "Rapports & Prédictions" : "Reports & Predictions"}
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* AI Predictions */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center gap-4 px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
                <span className="text-[10px] text-white/30">{locale === "fr" ? "Prédictions IA" : "AI Predictions"}</span>
              </div>
              <div className="aspect-[4/3] bg-[#0d0d0d] p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-400" />
                    <h3 className="text-sm font-medium text-white">Prévisions 7 jours</h3>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-white/40">
                    <span className="w-2 h-0.5 bg-white rounded" /> Réel
                    <span className="w-2 h-0.5 bg-white/30 rounded ml-2" /> Prévu
                  </div>
                </div>
                
                <div className="h-32 mb-4 relative">
                  <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                    {[0,1,2,3,4].map((i) => (<line key={i} x1="0" y1={i*25} x2="300" y2={i*25} stroke="rgba(255,255,255,0.05)" />))}
                    <polyline fill="none" stroke="white" strokeWidth="2" points="0,70 43,55 86,60 129,40 172,45" />
                    <polyline fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="4,4" points="172,45 215,30 258,35 300,20" />
                    <polygon fill="rgba(139,92,246,0.1)" points="172,45 215,20 258,25 300,10 300,40 258,45 215,40 172,45" />
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[8px] text-white/30">
                    {['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'].map((d)=>(<span key={d}>{d}</span>))}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Production prévue", value: "+15%", icon: TrendingUp, color: "text-green-400" },
                    { label: "Confiance modèle", value: "94.2%", icon: Target, color: "text-purple-400" },
                    { label: "Risque panne", value: "Faible", icon: CheckCircle, color: "text-blue-400" },
                  ].map((pred) => (
                    <div key={pred.label} className="bg-white/[0.03] border border-white/5 rounded p-2.5">
                      <pred.icon className={`w-3 h-3 ${pred.color} mb-1`} />
                      <p className="text-[8px] text-white/40">{pred.label}</p>
                      <p className={`text-sm font-medium ${pred.color}`}>{pred.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Reports Generator */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center gap-4 px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
                <span className="text-[10px] text-white/30">{locale === "fr" ? "Générateur de rapports" : "Report Generator"}</span>
              </div>
              <div className="aspect-[4/3] bg-[#0d0d0d] p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-white">Rapports disponibles</h3>
                  <button className="px-3 py-1.5 bg-white text-black text-[10px] font-medium rounded flex items-center gap-1">
                    <FileText className="w-3 h-3" /> Nouveau
                  </button>
                </div>
                
                <div className="space-y-2">
                  {[
                    { name: "Rapport mensuel - Décembre 2024", type: "PDF", size: "2.4 MB", date: "02/01/2025" },
                    { name: "Analyse performance Q4", type: "XLSX", size: "1.8 MB", date: "01/01/2025" },
                    { name: "Comparatif usines 2024", type: "PDF", size: "4.2 MB", date: "28/12/2024" },
                    { name: "Prédictions 2025", type: "PDF", size: "1.1 MB", date: "27/12/2024" },
                  ].map((report) => (
                    <div key={report.name} className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded hover:border-white/10 transition-colors">
                      <div className="w-8 h-8 bg-white/5 rounded flex items-center justify-center">
                        <FileText className="w-4 h-4 text-white/40" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white truncate">{report.name}</p>
                        <p className="text-[10px] text-white/30">{report.type} • {report.size}</p>
                      </div>
                      <span className="text-[10px] text-white/30">{report.date}</span>
                      <div className="flex gap-1">
                        <button className="p-1.5 hover:bg-white/5 rounded"><Eye className="w-3 h-3 text-white/40" /></button>
                        <button className="p-1.5 hover:bg-white/5 rounded"><Download className="w-3 h-3 text-white/40" /></button>
                        <button className="p-1.5 hover:bg-white/5 rounded"><Share2 className="w-3 h-3 text-white/40" /></button>
                      </div>
                    </div>
                  ))}
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
