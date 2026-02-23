"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, FileText, Calendar, Shield, Heart, Pill, Clock, Star, ChevronRight, Bell, Filter, Plus, Check, Activity, Thermometer, Droplets, Weight, Download, Share2, QrCode, MapPin, Video } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/contexts";

const content = {
  fr: {
    back: "Retour aux projets",
    category: "Application Mobile",
    title: "App Télémédecine",
    subtitle: "Application de téléconsultation médicale avec visio HD, ordonnances électroniques et dossier patient sécurisé.",
    client: "Groupe hospitalier",
    year: "2024",
    duration: "7 mois",
    tags: ["Flutter", "WebRTC", "HDS", "HL7 FHIR"],
    overview: "Présentation",
    overviewText: "Conception d'une application de télémédecine complète pour un groupe hospitalier majeur. La solution permet aux patients de consulter des médecins à distance via vidéo HD, de recevoir des ordonnances électroniques et d'accéder à leur dossier médical en toute sécurité, conformément aux normes HDS.",
    features: "Fonctionnalités clés",
    featuresList: [
      { icon: Video, title: "Visio HD", desc: "Consultations vidéo haute définition" },
      { icon: FileText, title: "Ordonnances", desc: "Prescriptions électroniques sécurisées" },
      { icon: Calendar, title: "Rendez-vous", desc: "Prise de RDV en ligne 24/7" },
      { icon: Shield, title: "Hébergement HDS", desc: "Données de santé certifiées" },
      { icon: Heart, title: "Suivi santé", desc: "Historique et constantes" },
      { icon: Pill, title: "Rappels", desc: "Notifications de traitement" },
    ],
    results: "Résultats",
    resultsList: [
      { value: "50K+", label: "Consultations/mois" },
      { value: "4.8", label: "Note App Store" },
      { value: "<2min", label: "Temps d'attente" },
      { value: "100%", label: "Conformité HDS" },
    ],
  },
  en: {
    back: "Back to projects",
    category: "Mobile Application",
    title: "Telemedicine App",
    subtitle: "Medical teleconsultation app with HD video, electronic prescriptions and secure patient records.",
    client: "Hospital group",
    year: "2024",
    duration: "7 months",
    tags: ["Flutter", "WebRTC", "HDS", "HL7 FHIR"],
    overview: "Overview",
    overviewText: "Design of a complete telemedicine application for a major hospital group. The solution allows patients to consult doctors remotely via HD video, receive electronic prescriptions and access their medical records securely, in compliance with healthcare data hosting standards.",
    features: "Key Features",
    featuresList: [
      { icon: Video, title: "HD Video", desc: "High-definition video consultations" },
      { icon: FileText, title: "Prescriptions", desc: "Secure electronic prescriptions" },
      { icon: Calendar, title: "Appointments", desc: "24/7 online booking" },
      { icon: Shield, title: "HDS Hosting", desc: "Certified health data" },
      { icon: Heart, title: "Health tracking", desc: "History and vitals" },
      { icon: Pill, title: "Reminders", desc: "Treatment notifications" },
    ],
    results: "Results",
    resultsList: [
      { value: "50K+", label: "Consultations/month" },
      { value: "4.8", label: "App Store rating" },
      { value: "<2min", label: "Wait time" },
      { value: "100%", label: "HDS compliance" },
    ],
  },
};

export default function AppTelemedecinePage() {
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

      {/* Mobile Mockups */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center items-end gap-4 lg:gap-8"
          >
            {/* Phone 1 - Doctor list */}
            <div className="relative w-[160px] lg:w-[220px] transform -rotate-6 translate-y-8">
              <div className="bg-[#1a1a1a] rounded-[24px] lg:rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-white rounded-[20px] lg:rounded-[28px] overflow-hidden">
                  <div className="bg-[#0891b2] px-4 py-3">
                    <p className="text-[10px] lg:text-xs text-white/80">Nos médecins</p>
                    <p className="text-xs lg:text-sm font-medium text-white">Disponibles maintenant</p>
                  </div>
                  <div className="p-3 space-y-2">
                    {[
                      { name: "Dr. Martin", specialty: "Généraliste", available: true },
                      { name: "Dr. Dubois", specialty: "Dermatologue", available: true },
                      { name: "Dr. Bernard", specialty: "Pédiatre", available: false },
                    ].map((doc) => (
                      <div key={doc.name} className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg">
                        <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center">
                          <span className="text-[10px] text-neutral-500">{doc.name[4]}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] font-medium text-neutral-800">{doc.name}</p>
                          <p className="text-[8px] text-neutral-500">{doc.specialty}</p>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${doc.available ? "bg-green-500" : "bg-neutral-300"}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Phone 2 - Main (Video call) */}
            <div className="relative w-[200px] lg:w-[280px] z-10">
              <div className="bg-[#1a1a1a] rounded-[28px] lg:rounded-[40px] p-2 lg:p-3 shadow-2xl border border-white/20">
                <div className="bg-[#0891b2] rounded-[24px] lg:rounded-[36px] overflow-hidden">
                  <div className="flex justify-center pt-2">
                    <div className="w-20 lg:w-28 h-5 lg:h-7 bg-black rounded-full" />
                  </div>
                  <div className="aspect-[9/16] relative">
                    {/* Video background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0891b2] to-[#065f77] flex items-center justify-center">
                      <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-3xl lg:text-4xl text-white/60">👨‍⚕️</span>
                      </div>
                    </div>
                    {/* Self view */}
                    <div className="absolute top-4 right-4 w-16 h-20 lg:w-20 lg:h-24 bg-neutral-800 rounded-lg border-2 border-white/20 flex items-center justify-center">
                      <span className="text-xl text-white/40">👤</span>
                    </div>
                    {/* Doctor info */}
                    <div className="absolute bottom-20 left-4 right-4">
                      <p className="text-sm lg:text-base font-medium text-white">Dr. Sophie Martin</p>
                      <p className="text-[10px] lg:text-xs text-white/70">Médecin généraliste • 12:34</p>
                    </div>
                    {/* Controls */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <div className="w-5 h-5 bg-white rounded" />
                      </div>
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                        <div className="w-5 h-2 bg-white rounded" />
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <div className="w-5 h-5 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone 3 - Prescription */}
            <div className="relative w-[160px] lg:w-[220px] transform rotate-6 translate-y-8">
              <div className="bg-[#1a1a1a] rounded-[24px] lg:rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-white rounded-[20px] lg:rounded-[28px] overflow-hidden">
                  <div className="bg-[#0891b2] px-4 py-3">
                    <p className="text-xs lg:text-sm font-medium text-white">Ordonnance</p>
                    <p className="text-[10px] text-white/70">15 janvier 2024</p>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
                      <div className="w-6 h-6 bg-[#0891b2]/10 rounded flex items-center justify-center">
                        <Pill className="w-3 h-3 text-[#0891b2]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-neutral-800">Amoxicilline 500mg</p>
                        <p className="text-[8px] text-neutral-500">3x/jour pendant 7 jours</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
                      <div className="w-6 h-6 bg-[#0891b2]/10 rounded flex items-center justify-center">
                        <Pill className="w-3 h-3 text-[#0891b2]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-neutral-800">Doliprane 1000mg</p>
                        <p className="text-[8px] text-neutral-500">Si douleurs, max 3/jour</p>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-[#0891b2] text-white text-[10px] font-medium rounded-lg mt-2">
                      Envoyer à la pharmacie
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
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">{t.overview}</span>
              <p className="text-lg lg:text-xl text-white/80 mt-6 leading-relaxed">{t.overviewText}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">Stack technique</span>
              <div className="mt-6 space-y-3">
                {["Flutter", "Dart", "WebRTC", "Firebase", "HL7 FHIR", "HDS Cloud"].map((tech) => (
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

      {/* Detailed Screens - Appointments & Medical Records */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Rendez-vous & Dossier médical" : "Appointments & Medical Records"}
            </span>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Appointment Booking */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-white rounded-[28px] overflow-hidden">
                  <div className="bg-[#0891b2] px-4 py-3">
                    <div className="flex items-center justify-between">
                      <ArrowLeft className="w-4 h-4 text-white/60" />
                      <span className="text-xs font-medium text-white">Prendre RDV</span>
                      <div className="w-4" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-4 p-2 bg-neutral-50 rounded-lg">
                      <div className="w-10 h-10 bg-[#0891b2]/10 rounded-full flex items-center justify-center">
                        <span className="text-sm">👨‍⚕️</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-neutral-800">Dr. Sophie Martin</p>
                        <p className="text-[8px] text-neutral-500">Médecin généraliste</p>
                      </div>
                      <div className="ml-auto flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-[10px] text-neutral-600">4.9</span>
                      </div>
                    </div>
                    
                    <p className="text-[10px] text-neutral-500 mb-2">Janvier 2024</p>
                    <div className="grid grid-cols-7 gap-1 mb-4 text-center">
                      {['L','M','M','J','V','S','D'].map((d,i)=>(<span key={i} className="text-[8px] text-neutral-400">{d}</span>))}
                      {[15,16,17,18,19,20,21].map((d)=>(
                        <button key={d} className={`text-[10px] py-1 rounded ${d===18 ? 'bg-[#0891b2] text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}>{d}</button>
                      ))}
                    </div>
                    
                    <p className="text-[10px] text-neutral-500 mb-2">Créneaux disponibles</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {['09:00','09:30','10:00','11:00','14:00','15:30'].map((t,i)=>(
                        <button key={t} className={`px-2 py-1 text-[10px] rounded ${i===2 ? 'bg-[#0891b2] text-white' : 'border border-neutral-200 text-neutral-600'}`}>{t}</button>
                      ))}
                    </div>
                    
                    <button className="w-full py-2.5 bg-[#0891b2] text-white text-[10px] font-medium rounded-lg">Confirmer le RDV</button>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Prise de rendez-vous</p>
            </motion.div>

            {/* Medical Record */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-white rounded-[28px] overflow-hidden">
                  <div className="bg-[#0891b2] px-4 py-3">
                    <div className="flex items-center justify-between">
                      <ArrowLeft className="w-4 h-4 text-white/60" />
                      <span className="text-xs font-medium text-white">Mon dossier</span>
                      <Share2 className="w-4 h-4 text-white/60" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-[#0891b2] rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">MD</span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-neutral-800">Marie Dupont</p>
                        <p className="text-[10px] text-neutral-500">Née le 15/03/1985 • 38 ans</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {[
                        { icon: Activity, label: "Groupe", value: "A+" },
                        { icon: Weight, label: "Poids", value: "65 kg" },
                        { icon: Thermometer, label: "Taille", value: "168 cm" },
                        { icon: Heart, label: "Allergies", value: "Aucune" },
                      ].map((item)=>(
                        <div key={item.label} className="p-2 bg-neutral-50 rounded-lg">
                          <item.icon className="w-3 h-3 text-[#0891b2] mb-1" />
                          <p className="text-[8px] text-neutral-400">{item.label}</p>
                          <p className="text-[10px] font-medium text-neutral-700">{item.value}</p>
                        </div>
                      ))}
                    </div>
                    
                    <p className="text-[10px] text-neutral-500 mb-2">Dernières consultations</p>
                    <div className="space-y-2">
                      {[
                        { date: "15/01", doctor: "Dr. Martin", type: "Généraliste" },
                        { date: "02/12", doctor: "Dr. Dubois", type: "Dermato" },
                      ].map((c,i)=>(
                        <div key={i} className="flex items-center gap-2 p-2 border border-neutral-100 rounded-lg">
                          <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center text-[10px]">👨‍⚕️</div>
                          <div className="flex-1"><p className="text-[10px] text-neutral-700">{c.doctor}</p><p className="text-[8px] text-neutral-400">{c.type}</p></div>
                          <span className="text-[8px] text-neutral-400">{c.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Dossier médical</p>
            </motion.div>

            {/* Prescription Detail */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-white rounded-[28px] overflow-hidden">
                  <div className="bg-[#0891b2] px-4 py-3">
                    <div className="flex items-center justify-between">
                      <ArrowLeft className="w-4 h-4 text-white/60" />
                      <span className="text-xs font-medium text-white">Ordonnance</span>
                      <Download className="w-4 h-4 text-white/60" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
                      <div>
                        <p className="text-[10px] font-medium text-neutral-800">Dr. Sophie Martin</p>
                        <p className="text-[8px] text-neutral-400">15 janvier 2024</p>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded">
                        <Check className="w-3 h-3 text-green-500" />
                        <span className="text-[8px] text-green-600">Validée</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { name: "Amoxicilline 500mg", dose: "1 comprimé", freq: "3x/jour", duration: "7 jours" },
                        { name: "Doliprane 1000mg", dose: "1 comprimé", freq: "Si douleurs", duration: "Max 3/jour" },
                      ].map((med,i)=>(
                        <div key={i} className="p-3 bg-neutral-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Pill className="w-4 h-4 text-[#0891b2]" />
                            <span className="text-[10px] font-medium text-neutral-800">{med.name}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-[8px]">
                            <div><span className="text-neutral-400">Dose:</span><br/><span className="text-neutral-600">{med.dose}</span></div>
                            <div><span className="text-neutral-400">Fréq:</span><br/><span className="text-neutral-600">{med.freq}</span></div>
                            <div><span className="text-neutral-400">Durée:</span><br/><span className="text-neutral-600">{med.duration}</span></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 py-2 border border-[#0891b2] text-[#0891b2] text-[10px] font-medium rounded-lg flex items-center justify-center gap-1">
                        <QrCode className="w-3 h-3" /> QR Code
                      </button>
                      <button className="flex-1 py-2 bg-[#0891b2] text-white text-[10px] font-medium rounded-lg flex items-center justify-center gap-1">
                        <MapPin className="w-3 h-3" /> Pharmacie
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Ordonnance détaillée</p>
            </motion.div>

            {/* Treatment Reminders */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-white rounded-[28px] overflow-hidden">
                  <div className="bg-[#0891b2] px-4 py-3">
                    <div className="flex items-center justify-between">
                      <ArrowLeft className="w-4 h-4 text-white/60" />
                      <span className="text-xs font-medium text-white">Mes rappels</span>
                      <Plus className="w-4 h-4 text-white/60" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] text-neutral-500">Aujourd&apos;hui</span>
                      <span className="text-[10px] text-[#0891b2]">3 prises</span>
                    </div>
                    
                    <div className="space-y-2">
                      {[
                        { time: "08:00", med: "Amoxicilline 500mg", status: "done" },
                        { time: "14:00", med: "Amoxicilline 500mg", status: "current" },
                        { time: "20:00", med: "Amoxicilline 500mg", status: "pending" },
                      ].map((reminder,i)=>(
                        <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${reminder.status === 'done' ? 'bg-green-50 border-green-100' : reminder.status === 'current' ? 'bg-[#0891b2]/5 border-[#0891b2]/20' : 'bg-neutral-50 border-neutral-100'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${reminder.status === 'done' ? 'bg-green-100' : reminder.status === 'current' ? 'bg-[#0891b2]/20' : 'bg-neutral-100'}`}>
                            {reminder.status === 'done' ? <Check className="w-4 h-4 text-green-500" /> : <Clock className="w-4 h-4 text-neutral-400" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] font-medium text-neutral-800">{reminder.med}</p>
                            <p className="text-[8px] text-neutral-400">{reminder.time}</p>
                          </div>
                          {reminder.status === 'current' && (
                            <button className="px-2 py-1 bg-[#0891b2] text-white text-[8px] rounded">Pris</button>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-amber-500" />
                        <span className="text-[10px] text-amber-700">Prochaine prise dans 2h</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Rappels traitement</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* More Screens - Chat & Health Tracking */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Messagerie & Suivi santé" : "Messaging & Health Tracking"}
            </span>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Secure Chat */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-white rounded-[28px] overflow-hidden">
                  <div className="bg-[#0891b2] px-4 py-3">
                    <div className="flex items-center gap-3">
                      <ArrowLeft className="w-4 h-4 text-white/60" />
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-[10px]">👨‍⚕️</div>
                        <div><p className="text-[10px] font-medium text-white">Dr. Martin</p><p className="text-[8px] text-white/60">En ligne</p></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 h-48 flex flex-col">
                    <div className="flex-1 space-y-2 overflow-hidden">
                      <div className="flex justify-start"><div className="bg-neutral-100 rounded-lg rounded-tl-none px-3 py-2 max-w-[80%]"><p className="text-[10px] text-neutral-700">Bonjour, comment vous sentez-vous après le traitement ?</p><span className="text-[8px] text-neutral-400">10:32</span></div></div>
                      <div className="flex justify-end"><div className="bg-[#0891b2] rounded-lg rounded-tr-none px-3 py-2 max-w-[80%]"><p className="text-[10px] text-white">Beaucoup mieux, merci ! La fièvre est tombée.</p><span className="text-[8px] text-white/60">10:35</span></div></div>
                      <div className="flex justify-start"><div className="bg-neutral-100 rounded-lg rounded-tl-none px-3 py-2 max-w-[80%]"><p className="text-[10px] text-neutral-700">Parfait, continuez le traitement jusqu&apos;à la fin.</p><span className="text-[8px] text-neutral-400">10:36</span></div></div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-neutral-100">
                      <input type="text" placeholder="Message..." className="flex-1 text-[10px] px-3 py-2 bg-neutral-50 rounded-full outline-none" />
                      <button className="w-8 h-8 bg-[#0891b2] rounded-full flex items-center justify-center"><ChevronRight className="w-4 h-4 text-white" /></button>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Chat sécurisé</p>
            </motion.div>

            {/* Health Vitals */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-white rounded-[28px] overflow-hidden">
                  <div className="bg-[#0891b2] px-4 py-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-white">Mes constantes</span>
                      <Plus className="w-4 h-4 text-white/60" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {[
                        { icon: Heart, label: "Rythme cardiaque", value: "72", unit: "bpm", color: "text-red-500", bg: "bg-red-50" },
                        { icon: Activity, label: "Tension", value: "12/8", unit: "", color: "text-blue-500", bg: "bg-blue-50" },
                        { icon: Thermometer, label: "Température", value: "36.8", unit: "°C", color: "text-amber-500", bg: "bg-amber-50" },
                        { icon: Droplets, label: "Glycémie", value: "0.95", unit: "g/L", color: "text-purple-500", bg: "bg-purple-50" },
                      ].map((vital)=>(
                        <div key={vital.label} className={`p-3 ${vital.bg} rounded-lg`}>
                          <vital.icon className={`w-4 h-4 ${vital.color} mb-2`} />
                          <p className="text-lg font-medium text-neutral-800">{vital.value}<span className="text-[10px] text-neutral-500 ml-1">{vital.unit}</span></p>
                          <p className="text-[8px] text-neutral-500">{vital.label}</p>
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-2 border border-neutral-200 text-neutral-600 text-[10px] rounded-lg flex items-center justify-center gap-1">
                      <Plus className="w-3 h-3" /> Ajouter une mesure
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Suivi constantes</p>
            </motion.div>

            {/* Find Pharmacy */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-white rounded-[28px] overflow-hidden">
                  <div className="bg-[#0891b2] px-4 py-3">
                    <div className="flex items-center justify-between">
                      <ArrowLeft className="w-4 h-4 text-white/60" />
                      <span className="text-xs font-medium text-white">Pharmacies</span>
                      <Filter className="w-4 h-4 text-white/60" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="h-24 bg-neutral-100 rounded-lg mb-3 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-[#0891b2]" />
                    </div>
                    <div className="space-y-2">
                      {[
                        { name: "Pharmacie du Centre", dist: "250m", open: true },
                        { name: "Pharmacie Pasteur", dist: "450m", open: true },
                        { name: "Grande Pharmacie", dist: "800m", open: false },
                      ].map((ph,i)=>(
                        <div key={i} className="flex items-center gap-3 p-2 border border-neutral-100 rounded-lg">
                          <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">💊</div>
                          <div className="flex-1">
                            <p className="text-[10px] font-medium text-neutral-800">{ph.name}</p>
                            <p className="text-[8px] text-neutral-400">{ph.dist} • {ph.open ? <span className="text-green-500">Ouvert</span> : <span className="text-red-400">Fermé</span>}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-neutral-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Trouver pharmacie</p>
            </motion.div>

            {/* Payment */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-white rounded-[28px] overflow-hidden">
                  <div className="bg-[#0891b2] px-4 py-3">
                    <div className="flex items-center justify-between">
                      <ArrowLeft className="w-4 h-4 text-white/60" />
                      <span className="text-xs font-medium text-white">Paiement</span>
                      <div className="w-4" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-center mb-4 pb-4 border-b border-neutral-100">
                      <p className="text-[10px] text-neutral-500">Consultation</p>
                      <p className="text-2xl font-medium text-neutral-800">25,00 €</p>
                      <p className="text-[10px] text-green-500">Remboursé: 17,50 €</p>
                    </div>
                    
                    <p className="text-[10px] text-neutral-500 mb-2">Moyen de paiement</p>
                    <div className="space-y-2 mb-4">
                      {[
                        { type: "Carte Vitale", icon: "💳", selected: true },
                        { type: "CB •••• 4521", icon: "💳", selected: false },
                      ].map((m,i)=>(
                        <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${m.selected ? 'border-[#0891b2] bg-[#0891b2]/5' : 'border-neutral-200'}`}>
                          <span className="text-lg">{m.icon}</span>
                          <span className="flex-1 text-[10px] text-neutral-700">{m.type}</span>
                          {m.selected && <Check className="w-4 h-4 text-[#0891b2]" />}
                        </div>
                      ))}
                    </div>
                    
                    <button className="w-full py-2.5 bg-[#0891b2] text-white text-[10px] font-medium rounded-lg">Payer 7,50 €</button>
                    <p className="text-[8px] text-neutral-400 text-center mt-2">Reste à charge après remboursement</p>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Paiement & remboursement</p>
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
