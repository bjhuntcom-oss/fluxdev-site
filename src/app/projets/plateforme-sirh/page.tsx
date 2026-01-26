"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Users, Calendar, FileText, GraduationCap, DollarSign, BarChart, Search, Filter, Plus, Mail, Phone, MapPin, Building2, Clock, Check, X, ChevronRight, Star, TrendingUp, Download, Upload, Eye, Edit, Briefcase, Award, Target, MessageSquare, Bell, Settings, Home, PieChart, Activity, UserPlus, ClipboardList } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/contexts";

const content = {
  fr: {
    back: "Retour aux projets",
    category: "Plateforme SaaS",
    title: "Plateforme SIRH Complète",
    subtitle: "Suite RH complète : recrutement, onboarding, paie, congés, entretiens et formation en ligne.",
    client: "ETI 500+ salariés",
    year: "2023",
    duration: "8 mois",
    tags: ["HR Tech", "Paie", "Formation", "React"],
    overview: "Présentation",
    overviewText: "Développement d'une suite SIRH complète pour une ETI de plus de 500 salariés. La plateforme centralise l'ensemble des processus RH : du recrutement à la formation, en passant par la gestion de la paie et des congés, avec une expérience utilisateur moderne et intuitive.",
    features: "Fonctionnalités clés",
    featuresList: [
      { icon: Users, title: "Recrutement", desc: "ATS complet avec scoring candidats" },
      { icon: Calendar, title: "Congés & absences", desc: "Workflow de validation automatisé" },
      { icon: DollarSign, title: "Paie intégrée", desc: "Calcul automatique et DSN" },
      { icon: GraduationCap, title: "Formation", desc: "LMS et parcours personnalisés" },
      { icon: FileText, title: "Entretiens", desc: "Campagnes et suivi objectifs" },
      { icon: BarChart, title: "Analytics RH", desc: "Tableaux de bord et KPIs" },
    ],
    results: "Résultats",
    resultsList: [
      { value: "-60%", label: "Temps admin RH" },
      { value: "500+", label: "Collaborateurs" },
      { value: "98%", label: "Adoption" },
      { value: "4.6/5", label: "Satisfaction" },
    ],
  },
  en: {
    back: "Back to projects",
    category: "SaaS Platform",
    title: "Complete HRIS Platform",
    subtitle: "Complete HR suite: recruitment, onboarding, payroll, leave, reviews and online training.",
    client: "500+ employee company",
    year: "2023",
    duration: "8 months",
    tags: ["HR Tech", "Payroll", "Training", "React"],
    overview: "Overview",
    overviewText: "Development of a complete HRIS suite for a 500+ employee company. The platform centralizes all HR processes: from recruitment to training, including payroll and leave management, with a modern and intuitive user experience.",
    features: "Key Features",
    featuresList: [
      { icon: Users, title: "Recruitment", desc: "Complete ATS with candidate scoring" },
      { icon: Calendar, title: "Leave & absences", desc: "Automated approval workflow" },
      { icon: DollarSign, title: "Integrated payroll", desc: "Automatic calculation and reporting" },
      { icon: GraduationCap, title: "Training", desc: "LMS and personalized paths" },
      { icon: FileText, title: "Reviews", desc: "Campaigns and goal tracking" },
      { icon: BarChart, title: "HR Analytics", desc: "Dashboards and KPIs" },
    ],
    results: "Results",
    resultsList: [
      { value: "-60%", label: "HR admin time" },
      { value: "500+", label: "Employees" },
      { value: "98%", label: "Adoption" },
      { value: "4.6/5", label: "Satisfaction" },
    ],
  },
};

export default function PlateformeSirhPage() {
  const { locale } = useLocale();
  const t = content[locale];

  return (
    <div className="bg-black min-h-screen">
      
      <section className="relative pt-32 pb-16">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/projets" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /><span className="text-sm">{t.back}</span>
            </Link>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              <div className="flex-1">
                <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">{t.category}</span>
                <h1 className="text-4xl lg:text-6xl font-light text-white mt-3 leading-[1.1]">{t.title}</h1>
                <p className="text-lg text-white/60 mt-6 max-w-2xl leading-relaxed">{t.subtitle}</p>
                <div className="flex flex-wrap gap-2 mt-8">
                  {t.tags.map((tag) => (<span key={tag} className="px-3 py-1.5 text-xs font-medium text-white/70 border border-white/10 bg-white/[0.02]">{tag}</span>))}
                </div>
              </div>
              <div className="lg:text-right space-y-4">
                <div><span className="text-[10px] text-white/40 uppercase tracking-wider">Client</span><p className="text-white/80 text-sm mt-1">{t.client}</p></div>
                <div><span className="text-[10px] text-white/40 uppercase tracking-wider">{locale === "fr" ? "Année" : "Year"}</span><p className="text-white/80 text-sm mt-1">{t.year}</p></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#111]">
                <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-white/20" /><div className="w-2.5 h-2.5 rounded-full bg-white/20" /><div className="w-2.5 h-2.5 rounded-full bg-white/20" /></div>
                <div className="flex-1 mx-4"><div className="bg-black/50 rounded-sm px-4 py-1.5 text-xs text-white/40 max-w-md mx-auto">rh.entreprise.com</div></div>
              </div>

              <div className="aspect-[16/9] bg-[#f8fafc] flex">
                {/* Sidebar */}
                <div className="w-14 lg:w-56 bg-[#0f172a] p-3 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-6 px-2">
                    <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center"><span className="text-white font-bold text-xs">RH</span></div>
                    <span className="hidden lg:block text-sm font-medium text-white">PeopleHub</span>
                  </div>
                  <nav className="space-y-1">
                    {[
                      { label: "Dashboard", active: true },
                      { label: "Collaborateurs", active: false },
                      { label: "Recrutement", active: false },
                      { label: "Congés", active: false },
                      { label: "Formation", active: false },
                      { label: "Paie", active: false },
                    ].map((item) => (
                      <div key={item.label} className={`flex items-center gap-2 px-2 py-1.5 rounded text-[10px] ${item.active ? "bg-white/10 text-white" : "text-white/50"}`}>
                        <div className={`w-3 h-3 rounded ${item.active ? "bg-white/40" : "bg-white/20"}`} />
                        <span className="hidden lg:block">{item.label}</span>
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Main content */}
                <div className="flex-1 p-4 lg:p-6 overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-[10px] text-neutral-500">Bienvenue,</p>
                      <h2 className="text-sm lg:text-lg font-medium text-neutral-800">Marie Dupont</h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center text-[10px] font-bold text-neutral-600">MD</div>
                    </div>
                  </div>

                  {/* Stats cards */}
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {[
                      { label: "Effectif", value: "542", change: "+3" },
                      { label: "En congés", value: "24", change: "" },
                      { label: "Recrutements", value: "8", change: "en cours" },
                      { label: "Formations", value: "12", change: "ce mois" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white border border-neutral-200 rounded-lg p-3">
                        <p className="text-[10px] text-neutral-500">{stat.label}</p>
                        <p className="text-lg font-semibold text-neutral-800">{stat.value}</p>
                        <p className="text-[10px] text-neutral-500">{stat.change}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid lg:grid-cols-2 gap-4">
                    {/* Leave requests */}
                    <div className="bg-white border border-neutral-200 rounded-lg p-4">
                      <h3 className="text-xs font-medium text-neutral-800 mb-3">Demandes de congés à valider</h3>
                      <div className="space-y-2">
                        {[
                          { name: "Jean Martin", dates: "15-19 Jan", type: "CP", days: 5 },
                          { name: "Sophie Bernard", dates: "22 Jan", type: "RTT", days: 1 },
                        ].map((req) => (
                          <div key={req.name} className="flex items-center justify-between p-2 bg-neutral-50 rounded">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-neutral-200 rounded-full" />
                              <div>
                                <p className="text-[10px] font-medium text-neutral-800">{req.name}</p>
                                <p className="text-[8px] text-neutral-500">{req.dates} • {req.type}</p>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <button className="px-2 py-1 bg-neutral-800 text-white text-[8px] rounded flex items-center justify-center"><Check className="w-3 h-3" /></button>
                              <button className="px-2 py-1 bg-neutral-200 text-neutral-600 text-[8px] rounded flex items-center justify-center"><X className="w-3 h-3" /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent activity */}
                    <div className="bg-white border border-neutral-200 rounded-lg p-4">
                      <h3 className="text-xs font-medium text-neutral-800 mb-3">Activité récente</h3>
                      <div className="space-y-2">
                        {[
                          { action: "Nouvelle candidature", detail: "Dev Frontend - 3 CV reçus", time: "Il y a 2h" },
                          { action: "Formation terminée", detail: "Cybersécurité - 12 participants", time: "Il y a 4h" },
                          { action: "Entretien planifié", detail: "Marc Durand - Demain 10h", time: "Hier" },
                        ].map((act, i) => (
                          <div key={i} className="flex items-start gap-2 p-2">
                            <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-1.5" />
                            <div className="flex-1">
                              <p className="text-[10px] font-medium text-neutral-800">{act.action}</p>
                              <p className="text-[8px] text-neutral-500">{act.detail}</p>
                            </div>
                            <span className="text-[8px] text-neutral-400">{act.time}</span>
                          </div>
                        ))}
                      </div>
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

      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 grid lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">{t.overview}</span>
            <p className="text-lg text-white/80 mt-6 leading-relaxed">{t.overviewText}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">Stack technique</span>
            <div className="mt-6 space-y-3">
              {["React", "Node.js", "PostgreSQL", "Redis", "AWS", "Stripe Billing"].map((tech) => (
                <div key={tech} className="flex items-center gap-3 text-white/70 text-sm"><div className="w-1 h-1 bg-white/40" />{tech}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">{t.features}</span>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.featuresList.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 border border-white/[0.06] bg-white/[0.01] hover:border-white/20 transition-colors">
                <f.icon className="w-5 h-5 text-white/40 mb-4" /><h3 className="text-white font-medium mb-2">{f.title}</h3><p className="text-sm text-white/50">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Mockups - Employee & Recruitment */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Collaborateurs & Recrutement" : "Employees & Recruitment"}
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Employee Profile */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /></div>
                  <span className="text-[10px] text-white/30">{locale === "fr" ? "Fiche collaborateur" : "Employee Profile"}</span>
                </div>
                <Edit className="w-3 h-3 text-white/30" />
              </div>
              <div className="aspect-[4/3] bg-[#f8fafc] p-4 overflow-hidden">
                <div className="flex items-start gap-4 mb-4 pb-4 border-b border-neutral-200">
                  <div className="w-16 h-16 bg-neutral-800 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl font-medium">JM</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-neutral-800">Jean Martin</h3>
                    <p className="text-[10px] text-neutral-500">Développeur Senior • Tech</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="px-2 py-0.5 bg-neutral-200 text-neutral-700 text-[8px] rounded">CDI</span>
                      <span className="text-[10px] text-neutral-400">Depuis 3 ans</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-neutral-400">Manager</p>
                    <p className="text-[10px] text-neutral-700">Sophie Bernard</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { icon: Mail, label: "Email", value: "j.martin@company.com" },
                    { icon: Phone, label: "Téléphone", value: "+33 6 12 34 56 78" },
                    { icon: Building2, label: "Service", value: "Engineering" },
                    { icon: MapPin, label: "Site", value: "Paris - Siège" },
                  ].map((info)=>(
                    <div key={info.label} className="flex items-center gap-2 p-2 bg-white rounded border border-neutral-100">
                      <info.icon className="w-3 h-3 text-neutral-500" />
                      <div>
                        <p className="text-[8px] text-neutral-400">{info.label}</p>
                        <p className="text-[10px] text-neutral-700 truncate">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <div className="flex-1 bg-white rounded border border-neutral-100 p-2">
                    <div className="flex items-center gap-1 mb-1">
                      <Calendar className="w-3 h-3 text-neutral-500" />
                      <span className="text-[10px] font-medium text-neutral-700">Congés</span>
                    </div>
                    <p className="text-lg font-bold text-neutral-800">18<span className="text-[10px] font-normal text-neutral-400">/25 jours</span></p>
                  </div>
                  <div className="flex-1 bg-white rounded border border-neutral-100 p-2">
                    <div className="flex items-center gap-1 mb-1">
                      <GraduationCap className="w-3 h-3 text-neutral-500" />
                      <span className="text-[10px] font-medium text-neutral-700">Formations</span>
                    </div>
                    <p className="text-lg font-bold text-neutral-800">4<span className="text-[10px] font-normal text-neutral-400"> cette année</span></p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recruitment ATS */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /></div>
                  <span className="text-[10px] text-white/30">{locale === "fr" ? "Recrutement - Pipeline" : "Recruitment Pipeline"}</span>
                </div>
                <Plus className="w-3 h-3 text-white/30" />
              </div>
              <div className="aspect-[4/3] bg-[#f8fafc] p-4 overflow-x-auto">
                <div className="flex gap-3 min-w-[500px]">
                  {[
                    { stage: "Candidatures", count: 12, candidates: [{ name: "Alice D.", score: 85 }, { name: "Marc T.", score: 78 }] },
                    { stage: "Entretien RH", count: 5, candidates: [{ name: "Julie R.", score: 92 }] },
                    { stage: "Entretien Tech", count: 3, candidates: [{ name: "Paul M.", score: 88 }] },
                    { stage: "Offre", count: 1, candidates: [{ name: "Emma L.", score: 95 }] },
                  ].map((col) => (
                    <div key={col.stage} className="flex-1 min-w-[120px]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-medium text-neutral-700">{col.stage}</span>
                        <span className="text-[10px] text-neutral-400">{col.count}</span>
                      </div>
                      <div className="space-y-2">
                        {col.candidates.map((c) => (
                          <div key={c.name} className="bg-white border border-neutral-200 rounded p-2 hover:shadow-sm transition-shadow cursor-pointer">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-6 h-6 bg-neutral-200 rounded-full flex items-center justify-center text-[8px] font-medium text-neutral-600">{c.name.split(' ').map(n=>n[0]).join('')}</div>
                              <span className="text-[10px] text-neutral-800">{c.name}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-neutral-500 fill-neutral-500" />
                                <span className="text-[10px] text-neutral-600">{c.score}%</span>
                              </div>
                              <span className="text-[8px] text-neutral-500">Dev Frontend</span>
                            </div>
                          </div>
                        ))}
                        <button className="w-full py-1.5 border border-dashed border-neutral-300 rounded text-[10px] text-neutral-400 hover:border-neutral-400 transition-colors">+ Ajouter</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* More Screens - Payroll & Training */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Paie & Formation" : "Payroll & Training"}
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Payroll */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /></div>
                  <span className="text-[10px] text-white/30">{locale === "fr" ? "Bulletin de paie" : "Payslip"}</span>
                </div>
                <Download className="w-3 h-3 text-white/30" />
              </div>
              <div className="aspect-[4/3] bg-white p-4 overflow-hidden">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-800">Jean Martin</h3>
                    <p className="text-[10px] text-neutral-500">Janvier 2024 • Développeur Senior</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-neutral-400">Net à payer</p>
                    <p className="text-xl font-bold text-neutral-800">3 245,87 €</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-[10px] py-1.5 border-b border-neutral-50">
                    <span className="text-neutral-600">Salaire brut</span>
                    <span className="text-neutral-800 font-medium">4 500,00 €</span>
                  </div>
                  <div className="flex justify-between text-[10px] py-1.5 border-b border-neutral-50">
                    <span className="text-neutral-600">Cotisations salariales</span>
                    <span className="text-neutral-600">- 1 012,50 €</span>
                  </div>
                  <div className="flex justify-between text-[10px] py-1.5 border-b border-neutral-50">
                    <span className="text-neutral-600">CSG/CRDS</span>
                    <span className="text-neutral-600">- 241,63 €</span>
                  </div>
                  <div className="flex justify-between text-[10px] py-1.5">
                    <span className="text-neutral-600">Prélèvement à la source</span>
                    <span className="text-neutral-600">- 450,00 €</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-neutral-800 text-white text-[10px] font-medium rounded flex items-center justify-center gap-1">
                    <Download className="w-3 h-3" /> Télécharger PDF
                  </button>
                  <button className="px-3 py-2 border border-neutral-200 text-neutral-600 text-[10px] rounded">
                    <Eye className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Training LMS */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /></div>
                  <span className="text-[10px] text-white/30">{locale === "fr" ? "Catalogue formations" : "Training Catalog"}</span>
                </div>
                <Filter className="w-3 h-3 text-white/30" />
              </div>
              <div className="aspect-[4/3] bg-[#f8fafc] p-4 overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-1 flex items-center bg-white border border-neutral-200 rounded px-3 py-1.5">
                    <Search className="w-3 h-3 text-neutral-400 mr-2" />
                    <input type="text" placeholder="Rechercher une formation..." className="text-[10px] flex-1 outline-none" />
                  </div>
                  <button className="px-3 py-1.5 bg-neutral-800 text-white text-[10px] rounded">Filtrer</button>
                </div>
                
                <div className="space-y-2">
                  {[
                    { title: "Cybersécurité - Les fondamentaux", duration: "4h", progress: 75, type: "Obligatoire" },
                    { title: "Management d'équipe", duration: "8h", progress: 30, type: "Recommandé" },
                    { title: "React Avancé", duration: "12h", progress: 0, type: "Optionnel" },
                  ].map((course,i)=>(
                    <div key={i} className="bg-white border border-neutral-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                          <GraduationCap className="w-5 h-5 text-neutral-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-[10px] font-medium text-neutral-800">{course.title}</h4>
                            <span className={`px-1.5 py-0.5 text-[8px] rounded ${course.type === 'Obligatoire' ? 'bg-neutral-800 text-white' : course.type === 'Recommandé' ? 'bg-neutral-200 text-neutral-700' : 'bg-neutral-100 text-neutral-500'}`}>{course.type}</span>
                          </div>
                          <p className="text-[10px] text-neutral-500 mb-2">{course.duration} • En ligne</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                              <div className="h-full bg-neutral-600 rounded-full" style={{ width: `${course.progress}%` }} />
                            </div>
                            <span className="text-[10px] text-neutral-500">{course.progress}%</span>
                          </div>
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
            {t.resultsList.map((r, i) => (
              <motion.div key={r.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-3xl lg:text-4xl font-light text-white mb-2">{r.value}</div>
                <div className="text-xs text-white/50 uppercase tracking-wider">{r.label}</div>
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
