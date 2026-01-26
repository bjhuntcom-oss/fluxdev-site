"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Play, BookOpen, Award, Users, BarChart, CheckCircle, Clock, Star, Download, MessageSquare, Video, FileText, Target, TrendingUp, Calendar, ChevronRight, Search, Filter, Pause, Volume2, Settings, Maximize, SkipForward, SkipBack, Lock, Unlock, Trophy, Medal, Share2, Bookmark, Check } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/contexts";

const content = {
  fr: {
    back: "Retour aux projets",
    category: "Plateforme SaaS",
    title: "Plateforme E-learning",
    subtitle: "LMS entreprise avec parcours adaptatifs, classes virtuelles, quiz interactifs et certifications.",
    client: "Organisme de formation",
    year: "2023",
    duration: "5 mois",
    tags: ["LMS", "Video", "Certification", "React"],
    overview: "Présentation",
    overviewText: "Développement d'une plateforme LMS complète pour un organisme de formation professionnelle. Le système propose des parcours d'apprentissage adaptatifs, des classes virtuelles en direct, des quiz interactifs et un système de certification reconnu.",
    features: "Fonctionnalités clés",
    featuresList: [
      { icon: Play, title: "Vidéos HD", desc: "Streaming adaptatif et sous-titres" },
      { icon: BookOpen, title: "Parcours adaptatifs", desc: "Progression personnalisée par IA" },
      { icon: Users, title: "Classes virtuelles", desc: "Visio intégrée jusqu'à 100 participants" },
      { icon: CheckCircle, title: "Quiz interactifs", desc: "Évaluations et exercices pratiques" },
      { icon: Award, title: "Certifications", desc: "Diplômes vérifiables blockchain" },
      { icon: BarChart, title: "Analytics", desc: "Suivi progression et reporting" },
    ],
    results: "Résultats",
    resultsList: [
      { value: "15K+", label: "Apprenants" },
      { value: "92%", label: "Taux complétion" },
      { value: "200+", label: "Formations" },
      { value: "4.7/5", label: "Satisfaction" },
    ],
  },
  en: {
    back: "Back to projects",
    category: "SaaS Platform",
    title: "E-learning Platform",
    subtitle: "Enterprise LMS with adaptive learning paths, virtual classrooms, interactive quizzes and certifications.",
    client: "Training organization",
    year: "2023",
    duration: "5 months",
    tags: ["LMS", "Video", "Certification", "React"],
    overview: "Overview",
    overviewText: "Development of a complete LMS platform for a professional training organization. The system offers adaptive learning paths, live virtual classrooms, interactive quizzes and a recognized certification system.",
    features: "Key Features",
    featuresList: [
      { icon: Play, title: "HD Videos", desc: "Adaptive streaming and subtitles" },
      { icon: BookOpen, title: "Adaptive paths", desc: "AI-personalized progression" },
      { icon: Users, title: "Virtual classrooms", desc: "Integrated video up to 100 participants" },
      { icon: CheckCircle, title: "Interactive quizzes", desc: "Assessments and practical exercises" },
      { icon: Award, title: "Certifications", desc: "Blockchain-verified diplomas" },
      { icon: BarChart, title: "Analytics", desc: "Progress tracking and reporting" },
    ],
    results: "Results",
    resultsList: [
      { value: "15K+", label: "Learners" },
      { value: "92%", label: "Completion rate" },
      { value: "200+", label: "Courses" },
      { value: "4.7/5", label: "Satisfaction" },
    ],
  },
};

export default function PlateformeElearningPage() {
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
                <div className="flex-1 mx-4"><div className="bg-black/50 rounded-sm px-4 py-1.5 text-xs text-white/40 max-w-md mx-auto">learn.formation-pro.fr</div></div>
              </div>

              <div className="aspect-[16/9] bg-[#f8fafc] flex">
                {/* Sidebar */}
                <div className="w-14 lg:w-56 bg-[#0f172a] p-3 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-6 px-2">
                    <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center"><BookOpen className="w-4 h-4 text-white" /></div>
                    <span className="hidden lg:block text-sm font-medium text-white">LearnHub</span>
                  </div>
                  <nav className="space-y-1">
                    {[
                      { label: "Dashboard", active: false },
                      { label: "Mes formations", active: true },
                      { label: "Catalogue", active: false },
                      { label: "Certifications", active: false },
                      { label: "Communauté", active: false },
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
                  {/* Course header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-[10px] text-neutral-500">Formation en cours</p>
                      <h2 className="text-sm lg:text-lg font-medium text-neutral-800">Développement Web Full-Stack</h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-xs font-medium text-neutral-800">65%</p>
                        <p className="text-[10px] text-neutral-500">complété</p>
                      </div>
                      <div className="w-12 h-12 relative">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#525252" strokeWidth="3" strokeDasharray="65, 100" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-4">
                    {/* Video player area */}
                    <div className="lg:col-span-2">
                      <div className="bg-neutral-900 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900" />
                        <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                          <Play className="w-8 h-8 text-white ml-1" fill="white" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80">
                          <p className="text-white text-xs font-medium">Module 5: APIs REST avec Node.js</p>
                          <p className="text-white/60 text-[10px]">Durée: 45 min</p>
                        </div>
                        {/* Progress bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                          <div className="h-full bg-white/60 w-1/3" />
                        </div>
                      </div>
                      {/* Course content */}
                      <div className="mt-4 space-y-2">
                        {[
                          { title: "Introduction aux APIs", duration: "12 min", done: true },
                          { title: "Express.js Fondamentaux", duration: "28 min", done: true },
                          { title: "APIs REST avec Node.js", duration: "45 min", current: true },
                          { title: "Authentification JWT", duration: "35 min", done: false },
                        ].map((lesson, i) => (
                          <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${lesson.current ? "bg-neutral-100 border border-neutral-300" : "bg-white border border-neutral-200"}`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${lesson.done ? "bg-neutral-800 text-white" : lesson.current ? "bg-neutral-600 text-white" : "bg-neutral-200 text-neutral-500"}`}>
                              {lesson.done ? <Check className="w-3 h-3" /> : i + 1}
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-medium text-neutral-800">{lesson.title}</p>
                              <p className="text-[10px] text-neutral-500">{lesson.duration}</p>
                            </div>
                            {lesson.current && <div className="px-2 py-0.5 bg-neutral-700 text-white text-[8px] rounded">En cours</div>}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                      {/* Quiz card */}
                      <div className="bg-white border border-neutral-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="w-4 h-4 text-neutral-600" />
                          <p className="text-xs font-medium text-neutral-800">Quiz du module</p>
                        </div>
                        <p className="text-[10px] text-neutral-500 mb-3">Testez vos connaissances avec 10 questions</p>
                        <button className="w-full py-2 bg-neutral-800 text-white text-[10px] font-medium rounded-lg">Commencer le quiz</button>
                      </div>

                      {/* Certificate */}
                      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Award className="w-4 h-4 text-neutral-600" />
                          <p className="text-xs font-medium text-neutral-800">Certification</p>
                        </div>
                        <p className="text-[10px] text-neutral-600 mb-2">Complétez la formation pour obtenir votre certificat</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                            <div className="h-full bg-neutral-600 w-[65%]" />
                          </div>
                          <span className="text-[10px] text-neutral-600">65%</span>
                        </div>
                      </div>

                      {/* Community */}
                      <div className="bg-white border border-neutral-200 rounded-lg p-4">
                        <p className="text-xs font-medium text-neutral-800 mb-3">Discussion</p>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <div className="w-5 h-5 bg-neutral-200 rounded-full flex-shrink-0" />
                            <div className="flex-1 bg-neutral-50 rounded p-2">
                              <p className="text-[10px] text-neutral-800">Super module ! Très clair.</p>
                            </div>
                          </div>
                        </div>
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
              {["React / Next.js", "Node.js", "PostgreSQL", "Mux Video", "WebRTC", "Stripe"].map((tech) => (
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

      {/* Detailed Mockups - Quiz & Certificate */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Quiz & Certification" : "Quiz & Certification"}
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Quiz Interface */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /></div>
                  <span className="text-[10px] text-white/30">{locale === "fr" ? "Quiz interactif" : "Interactive Quiz"}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-white/50">
                  <Clock className="w-3 h-3" /> 12:45
                </div>
              </div>
              <div className="aspect-[4/3] bg-white p-4 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] text-neutral-500">Question 5 / 10</span>
                  <div className="flex gap-1">
                    {[1,2,3,4,5,6,7,8,9,10].map((i)=>(
                      <div key={i} className={`w-4 h-1 rounded-full ${i<=4 ? 'bg-neutral-700' : i===5 ? 'bg-neutral-500' : 'bg-neutral-200'}`} />
                    ))}
                  </div>
                </div>
                
                <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-neutral-800">Quelle méthode HTTP est utilisée pour créer une nouvelle ressource dans une API REST ?</p>
                </div>
                
                <div className="space-y-2 mb-4">
                  {[
                    { letter: "A", text: "GET", selected: false },
                    { letter: "B", text: "POST", selected: true },
                    { letter: "C", text: "PUT", selected: false },
                    { letter: "D", text: "DELETE", selected: false },
                  ].map((option)=>(
                    <div key={option.letter} className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${option.selected ? 'border-neutral-600 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-300'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${option.selected ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-600'}`}>{option.letter}</div>
                      <span className={`text-sm ${option.selected ? 'text-neutral-800 font-medium' : 'text-neutral-700'}`}>{option.text}</span>
                      {option.selected && <CheckCircle className="w-5 h-5 text-neutral-600 ml-auto" />}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <button className="px-4 py-2 border border-neutral-200 text-neutral-600 text-[10px] rounded-lg flex items-center gap-1">
                    <SkipBack className="w-3 h-3" /> Précédent
                  </button>
                  <button className="px-4 py-2 bg-neutral-800 text-white text-[10px] font-medium rounded-lg flex items-center gap-1">
                    Suivant <SkipForward className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Certificate */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /></div>
                  <span className="text-[10px] text-white/30">{locale === "fr" ? "Certificat" : "Certificate"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-3 h-3 text-white/30" />
                  <Share2 className="w-3 h-3 text-white/30" />
                </div>
              </div>
              <div className="aspect-[4/3] bg-neutral-100 p-4 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm border-2 border-neutral-300">
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center">
                        <Trophy className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">Certificat d'achèvement</p>
                    <h3 className="text-lg font-bold text-neutral-800 mb-2">Développement Web Full-Stack</h3>
                    <p className="text-[10px] text-neutral-500 mb-3">Ce certificat atteste que</p>
                    <p className="text-sm font-medium text-neutral-800 mb-3">Marie Dupont</p>
                    <p className="text-[10px] text-neutral-500 mb-4">a complété avec succès la formation de 40 heures</p>
                    
                    <div className="flex items-center justify-center gap-4 mb-4 text-[10px] text-neutral-400">
                      <span>Score: 92%</span>
                      <span>•</span>
                      <span>15 Jan 2024</span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 pt-3 border-t border-neutral-100">
                      <div className="w-6 h-6 bg-neutral-800 rounded flex items-center justify-center">
                        <BookOpen className="w-3 h-3 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-[8px] text-neutral-400">Vérifié par</p>
                        <p className="text-[10px] font-medium text-neutral-700">LearnHub</p>
                      </div>
                      <div className="ml-4 px-2 py-1 bg-neutral-200 text-neutral-700 text-[8px] rounded flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Blockchain
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* More Screens - Catalog & Progress */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Catalogue & Progression" : "Catalog & Progress"}
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Course Catalog */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /></div>
                  <span className="text-[10px] text-white/30">{locale === "fr" ? "Catalogue formations" : "Course Catalog"}</span>
                </div>
                <Filter className="w-3 h-3 text-white/30" />
              </div>
              <div className="aspect-[4/3] bg-[#f8fafc] p-4 overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-1 flex items-center bg-white border border-neutral-200 rounded-lg px-3 py-2">
                    <Search className="w-4 h-4 text-neutral-400 mr-2" />
                    <input type="text" placeholder="Rechercher une formation..." className="text-[10px] flex-1 outline-none" />
                  </div>
                </div>
                
                <div className="flex gap-2 mb-4 overflow-x-auto">
                  {["Tous", "Dev Web", "Design", "Marketing", "Data"].map((cat,i)=>(
                    <button key={cat} className={`px-3 py-1 text-[10px] rounded-full whitespace-nowrap ${i===0 ? 'bg-neutral-800 text-white' : 'bg-white border border-neutral-200 text-neutral-600'}`}>{cat}</button>
                  ))}
                </div>
                
                <div className="space-y-3">
                  {[
                    { title: "React & Next.js Avancé", level: "Avancé", duration: "20h", rating: 4.9, students: "2.3K", price: "149€" },
                    { title: "UX/UI Design Masterclass", level: "Intermédiaire", duration: "35h", rating: 4.8, students: "5.1K", price: "199€" },
                    { title: "Python pour Data Science", level: "Débutant", duration: "25h", rating: 4.7, students: "8.2K", price: "99€" },
                  ].map((course,i)=>(
                    <div key={i} className="flex gap-3 p-3 bg-white rounded-lg border border-neutral-100 hover:shadow-md transition-shadow">
                      <div className="w-16 h-16 bg-neutral-800 rounded-lg flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[10px] font-medium text-neutral-800 mb-1">{course.title}</h4>
                        <div className="flex items-center gap-2 text-[8px] text-neutral-500 mb-2">
                          <span className="px-1.5 py-0.5 bg-neutral-100 rounded">{course.level}</span>
                          <span>{course.duration}</span>
                          <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-neutral-500 fill-neutral-500" />{course.rating}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] text-neutral-400">{course.students} apprenants</span>
                          <span className="text-xs font-bold text-neutral-800">{course.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Progress Dashboard */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center gap-4 px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /></div>
                <span className="text-[10px] text-white/30">{locale === "fr" ? "Ma progression" : "My Progress"}</span>
              </div>
              <div className="aspect-[4/3] bg-[#f8fafc] p-4 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-neutral-800">Bonjour, Marie!</p>
                    <p className="text-[10px] text-neutral-500">Continuez votre apprentissage</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-center">
                      <p className="text-lg font-bold text-neutral-800">12</p>
                      <p className="text-[8px] text-neutral-400">jours consécutifs</p>
                    </div>
                    <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center">
                      <Medal className="w-4 h-4 text-neutral-600" />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Formations", value: "3", sub: "en cours" },
                    { label: "Heures", value: "47", sub: "cette semaine" },
                    { label: "Certificats", value: "5", sub: "obtenus" },
                  ].map((stat)=>(
                    <div key={stat.label} className="bg-white p-3 rounded-lg border border-neutral-100 text-center">
                      <p className="text-lg font-bold text-neutral-800">{stat.value}</p>
                      <p className="text-[8px] text-neutral-500">{stat.label}</p>
                      <p className="text-[8px] text-neutral-500">{stat.sub}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white rounded-lg border border-neutral-100 p-3">
                  <p className="text-[10px] font-medium text-neutral-700 mb-3">Formations en cours</p>
                  {[
                    { title: "Dev Web Full-Stack", progress: 65, next: "APIs REST" },
                    { title: "UX Design", progress: 30, next: "Wireframing" },
                  ].map((course,i)=>(
                    <div key={i} className="flex items-center gap-3 mb-3 last:mb-0">
                      <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-neutral-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-medium text-neutral-800">{course.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                            <div className="h-full bg-neutral-600 rounded-full" style={{ width: `${course.progress}%` }} />
                          </div>
                          <span className="text-[10px] text-neutral-500">{course.progress}%</span>
                        </div>
                      </div>
                      <button className="px-2 py-1 bg-neutral-800 text-white text-[8px] rounded">Continuer</button>
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
