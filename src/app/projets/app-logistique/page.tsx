"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, MapPin, Package, Camera, Navigation, Clock, CheckCircle, Phone, MessageSquare, AlertTriangle, RotateCcw, Scan, User, TrendingUp, Calendar, ChevronRight, Bell, Truck, Edit, X, Check, Timer, Route } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/contexts";

const content = {
  fr: {
    back: "Retour aux projets",
    category: "Application Mobile",
    title: "App Logistique Last-Mile",
    subtitle: "Application livreurs avec optimisation de tournées IA, tracking temps réel et preuve de livraison photo.",
    client: "Startup logistique",
    year: "2023",
    duration: "4 mois",
    tags: ["React Native", "Maps", "IoT", "ML"],
    overview: "Présentation",
    overviewText: "Développement d'une application mobile pour les livreurs last-mile intégrant l'optimisation de tournées par intelligence artificielle, le suivi en temps réel des colis et un système de preuve de livraison par photo géolocalisée.",
    features: "Fonctionnalités clés",
    featuresList: [
      { icon: Navigation, title: "Optimisation IA", desc: "Tournées optimisées en temps réel" },
      { icon: MapPin, title: "Tracking GPS", desc: "Suivi en direct des livreurs" },
      { icon: Camera, title: "Preuve photo", desc: "Photos géolocalisées horodatées" },
      { icon: Package, title: "Scan colis", desc: "Lecture codes-barres et QR" },
      { icon: Clock, title: "ETAs précis", desc: "Estimation d'arrivée dynamique" },
      { icon: CheckCircle, title: "Signature", desc: "Signature électronique client" },
    ],
    results: "Résultats",
    resultsList: [
      { value: "+35%", label: "Livraisons/jour" },
      { value: "-25%", label: "Km parcourus" },
      { value: "98%", label: "Taux livraison" },
      { value: "4.7", label: "Note livreurs" },
    ],
  },
  en: {
    back: "Back to projects",
    category: "Mobile Application",
    title: "Last-Mile Logistics App",
    subtitle: "Delivery driver app with AI route optimization, real-time tracking and photo proof of delivery.",
    client: "Logistics startup",
    year: "2023",
    duration: "4 months",
    tags: ["React Native", "Maps", "IoT", "ML"],
    overview: "Overview",
    overviewText: "Development of a mobile application for last-mile delivery drivers integrating AI-powered route optimization, real-time parcel tracking and a geolocated photo proof of delivery system.",
    features: "Key Features",
    featuresList: [
      { icon: Navigation, title: "AI Optimization", desc: "Real-time optimized routes" },
      { icon: MapPin, title: "GPS Tracking", desc: "Live driver tracking" },
      { icon: Camera, title: "Photo proof", desc: "Geolocated timestamped photos" },
      { icon: Package, title: "Parcel scan", desc: "Barcode and QR reading" },
      { icon: Clock, title: "Accurate ETAs", desc: "Dynamic arrival estimation" },
      { icon: CheckCircle, title: "Signature", desc: "Customer e-signature" },
    ],
    results: "Results",
    resultsList: [
      { value: "+35%", label: "Deliveries/day" },
      { value: "-25%", label: "Km traveled" },
      { value: "98%", label: "Delivery rate" },
      { value: "4.7", label: "Driver rating" },
    ],
  },
};

export default function AppLogistiquePage() {
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

      {/* Mobile Mockups */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex justify-center items-end gap-4 lg:gap-8">
            {/* Phone 1 - Route */}
            <div className="relative w-[160px] lg:w-[220px] transform -rotate-6 translate-y-8">
              <div className="bg-[#1a1a1a] rounded-[24px] lg:rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-[#0f172a] rounded-[20px] lg:rounded-[28px] overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-[10px] text-white/50">Tournée du jour</p>
                    <p className="text-xs font-medium text-white">12 livraisons restantes</p>
                  </div>
                  <div className="p-3 space-y-2">
                    {[
                      { addr: "15 Rue de Paris", time: "10:30", status: "next" },
                      { addr: "8 Av. Victor Hugo", time: "10:45", status: "pending" },
                      { addr: "42 Bd Haussmann", time: "11:00", status: "pending" },
                    ].map((stop, i) => (
                      <div key={i} className={`flex items-center gap-2 p-2 rounded-lg ${stop.status === "next" ? "bg-emerald-500/20 border border-emerald-500/30" : "bg-white/5"}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${stop.status === "next" ? "bg-emerald-500 text-white" : "bg-white/10 text-white/50"}`}>{i + 1}</div>
                        <div className="flex-1">
                          <p className="text-[10px] font-medium text-white">{stop.addr}</p>
                          <p className="text-[8px] text-white/40">{stop.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Phone 2 - Map (Center) */}
            <div className="relative w-[200px] lg:w-[280px] z-10">
              <div className="bg-[#1a1a1a] rounded-[28px] lg:rounded-[40px] p-2 lg:p-3 shadow-2xl border border-white/20">
                <div className="bg-[#0f172a] rounded-[24px] lg:rounded-[36px] overflow-hidden">
                  <div className="flex justify-center pt-2"><div className="w-20 lg:w-28 h-5 lg:h-7 bg-black rounded-full" /></div>
                  <div className="aspect-[9/16] relative bg-gradient-to-b from-[#1e3a5f] to-[#0f172a]">
                    {/* Map visualization */}
                    <div className="absolute inset-4 rounded-xl overflow-hidden">
                      <div className="absolute inset-0 bg-[#1e293b]">
                        {/* Roads */}
                        <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-white/10" />
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10" />
                        <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-white/10" />
                        <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-white/10" />
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10" />
                        <div className="absolute left-3/4 top-0 bottom-0 w-0.5 bg-white/10" />
                        {/* Route line */}
                        <svg className="absolute inset-0" viewBox="0 0 100 100">
                          <path d="M20,80 L30,60 L50,65 L70,40 L80,20" stroke="#10b981" strokeWidth="2" fill="none" strokeDasharray="4,2" />
                        </svg>
                        {/* Points */}
                        <div className="absolute top-[80%] left-[20%] w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center"><div className="w-1.5 h-1.5 bg-white rounded-full" /></div>
                        <div className="absolute top-[40%] left-[70%] w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
                        <div className="absolute top-[20%] left-[80%] w-3 h-3 bg-white/30 rounded-full" />
                      </div>
                    </div>
                    {/* Bottom panel */}
                    <div className="absolute bottom-0 left-0 right-0 bg-[#0f172a]/95 backdrop-blur p-4 border-t border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                          <Navigation className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-white">15 Rue de Paris</p>
                          <p className="text-[10px] text-white/50">2.3 km • 8 min</p>
                        </div>
                        <button className="px-3 py-2 bg-emerald-500 text-white text-[10px] font-medium rounded-lg">GO</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone 3 - Delivery confirmation */}
            <div className="relative w-[160px] lg:w-[220px] transform rotate-6 translate-y-8">
              <div className="bg-[#1a1a1a] rounded-[24px] lg:rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-white rounded-[20px] lg:rounded-[28px] overflow-hidden">
                  <div className="bg-emerald-500 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-white" />
                      <p className="text-xs font-medium text-white">Livraison confirmée</p>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="aspect-video bg-neutral-100 rounded-lg flex items-center justify-center">
                      <Camera className="w-8 h-8 text-neutral-300" />
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-500">Colis #45892</p>
                      <p className="text-xs font-medium text-neutral-800">15 Rue de Paris</p>
                    </div>
                    <div className="flex gap-2 text-[10px]">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded">Photo ✓</span>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded">GPS ✓</span>
                    </div>
                    <button className="w-full py-2 bg-neutral-800 text-white text-[10px] font-medium rounded-lg">Suivant</button>
                  </div>
                </div>
              </div>
            </div>
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
              {["React Native", "TypeScript", "Google Maps API", "TensorFlow Lite", "Firebase", "Node.js"].map((tech) => (
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

      {/* Detailed Screens - Delivery & Scan */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Livraison & Scan" : "Delivery & Scan"}
            </span>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Delivery Detail */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-[#0f172a] rounded-[28px] overflow-hidden">
                  <div className="px-4 py-2 flex items-center justify-between">
                    <ArrowLeft className="w-4 h-4 text-white/40" />
                    <span className="text-[10px] text-white/60">Détails livraison</span>
                    <Phone className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="px-4 pb-4">
                    <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                        <div>
                          <p className="text-[10px] font-medium text-white">Prochaine livraison</p>
                          <p className="text-[8px] text-emerald-400">ETA: 10:32</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-[10px]">
                        <User className="w-3 h-3 text-white/40" />
                        <span className="text-white/70">Marie Dupont</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px]">
                        <MapPin className="w-3 h-3 text-white/40" />
                        <span className="text-white/70">15 Rue de Paris, 75001</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px]">
                        <Package className="w-3 h-3 text-white/40" />
                        <span className="text-white/70">Colis #45892 • 2.3 kg</span>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-2 mb-3">
                      <p className="text-[8px] text-white/40 mb-1">Instructions</p>
                      <p className="text-[10px] text-white/70">Code: 4521B • 3ème étage gauche</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-emerald-500 text-white text-[10px] font-medium rounded-lg flex items-center justify-center gap-1">
                        <Navigation className="w-3 h-3" /> Naviguer
                      </button>
                      <button className="px-3 py-2 bg-white/10 text-white text-[10px] rounded-lg">
                        <MessageSquare className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Détails livraison</p>
            </motion.div>

            {/* Scan Screen */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-[#0f172a] rounded-[28px] overflow-hidden">
                  <div className="px-4 py-2 flex items-center justify-between">
                    <ArrowLeft className="w-4 h-4 text-white/40" />
                    <span className="text-[10px] text-white/60">Scanner colis</span>
                    <div className="w-4" />
                  </div>
                  <div className="px-4 pb-4">
                    <div className="aspect-square bg-black/50 rounded-xl mb-3 relative overflow-hidden">
                      <div className="absolute inset-4 border-2 border-emerald-500/50 rounded-lg">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-500" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-500" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-500" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-500" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-0.5 bg-emerald-500/50 animate-pulse" />
                      </div>
                      <Scan className="absolute bottom-2 right-2 w-5 h-5 text-emerald-500" />
                    </div>
                    
                    <p className="text-[10px] text-white/50 text-center mb-3">Placez le code-barres dans le cadre</p>
                    
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2 mb-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <div>
                          <p className="text-[10px] text-emerald-400 font-medium">Dernier scan</p>
                          <p className="text-[8px] text-white/50">#45891 • il y a 2 min</p>
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full py-2 bg-white/10 text-white text-[10px] rounded-lg">Saisie manuelle</button>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Scanner colis</p>
            </motion.div>

            {/* Proof of Delivery */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-white rounded-[28px] overflow-hidden">
                  <div className="bg-[#0f172a] px-4 py-2 flex items-center justify-between">
                    <ArrowLeft className="w-4 h-4 text-white/40" />
                    <span className="text-[10px] text-white/60">Preuve de livraison</span>
                    <div className="w-4" />
                  </div>
                  <div className="p-4">
                    <div className="aspect-video bg-neutral-100 rounded-lg mb-3 flex items-center justify-center relative">
                      <Camera className="w-8 h-8 text-neutral-300" />
                      <div className="absolute bottom-1 right-1 flex gap-1">
                        <span className="px-1.5 py-0.5 bg-emerald-500 text-white text-[8px] rounded">GPS ✓</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <button className="w-full py-2.5 border-2 border-dashed border-neutral-200 text-neutral-500 text-[10px] rounded-lg flex items-center justify-center gap-2">
                        <Camera className="w-4 h-4" /> Prendre photo
                      </button>
                    </div>
                    
                    <div className="border border-neutral-200 rounded-lg p-3 mb-3">
                      <p className="text-[8px] text-neutral-400 mb-2">Signature client</p>
                      <div className="h-12 bg-neutral-50 rounded border border-neutral-100 flex items-center justify-center">
                        <Edit className="w-4 h-4 text-neutral-300" />
                      </div>
                    </div>
                    
                    <button className="w-full py-2.5 bg-emerald-500 text-white text-[10px] font-medium rounded-lg">Confirmer livraison</button>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Preuve de livraison</p>
            </motion.div>

            {/* Issue Report */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-white rounded-[28px] overflow-hidden">
                  <div className="bg-amber-500 px-4 py-2 flex items-center justify-between">
                    <X className="w-4 h-4 text-white/60" />
                    <span className="text-[10px] text-white font-medium">Signaler problème</span>
                    <div className="w-4" />
                  </div>
                  <div className="p-4">
                    <div className="space-y-2 mb-4">
                      {[
                        { label: "Absent", icon: User },
                        { label: "Adresse incorrecte", icon: MapPin },
                        { label: "Colis endommagé", icon: Package },
                        { label: "Accès impossible", icon: AlertTriangle },
                      ].map((issue)=>(
                        <button key={issue.label} className="w-full flex items-center gap-3 p-2.5 border border-neutral-200 rounded-lg hover:border-amber-300 transition-colors">
                          <issue.icon className="w-4 h-4 text-neutral-400" />
                          <span className="text-[10px] text-neutral-700">{issue.label}</span>
                          <ChevronRight className="w-3 h-3 text-neutral-300 ml-auto" />
                        </button>
                      ))}
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-2">
                      <div className="flex items-center gap-2">
                        <RotateCcw className="w-4 h-4 text-amber-500" />
                        <span className="text-[10px] text-amber-700">Nouvelle tentative programmée</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Signaler problème</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* More Screens - Dashboard & Stats */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Dashboard & Statistiques" : "Dashboard & Statistics"}
            </span>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Driver Dashboard */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-[#0f172a] rounded-[28px] overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">TM</div>
                        <div>
                          <p className="text-[10px] font-medium text-white">Thomas Martin</p>
                          <p className="text-[8px] text-white/40">Livreur • Zone Paris Nord</p>
                        </div>
                      </div>
                      <Bell className="w-4 h-4 text-white/40" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {[
                        { label: "Aujourd'hui", value: "24/28", color: "text-emerald-400" },
                        { label: "Cette semaine", value: "142", color: "text-white" },
                        { label: "Taux succès", value: "98%", color: "text-emerald-400" },
                        { label: "Note", value: "4.8 ★", color: "text-amber-400" },
                      ].map((stat)=>(
                        <div key={stat.label} className="bg-white/5 rounded-lg p-2 text-center">
                          <p className={`text-sm font-bold ${stat.color}`}>{stat.value}</p>
                          <p className="text-[8px] text-white/40">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <span className="text-[10px] text-emerald-400">+12% vs semaine dernière</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Dashboard livreur</p>
            </motion.div>

            {/* Route Summary */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-[#0f172a] rounded-[28px] overflow-hidden">
                  <div className="px-4 py-2 flex items-center justify-between border-b border-white/10">
                    <span className="text-[10px] text-white/60">Récap tournée</span>
                    <span className="text-[10px] text-emerald-400">En cours</span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">24</p>
                        <p className="text-[8px] text-white/40">Livrés</p>
                      </div>
                      <div className="h-12 w-12 rounded-full border-4 border-emerald-500 flex items-center justify-center">
                        <span className="text-xs font-bold text-emerald-400">86%</span>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white/40">4</p>
                        <p className="text-[8px] text-white/40">Restants</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-white/50">Distance parcourue</span>
                        <span className="text-white">47.2 km</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-white/50">Temps actif</span>
                        <span className="text-white">5h 23min</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-white/50">Temps moyen/livraison</span>
                        <span className="text-white">8min</span>
                      </div>
                    </div>
                    
                    <button className="w-full py-2 bg-emerald-500 text-white text-[10px] font-medium rounded-lg">Terminer tournée</button>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Récap tournée</p>
            </motion.div>

            {/* History */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-[#0f172a] rounded-[28px] overflow-hidden">
                  <div className="px-4 py-2 flex items-center justify-between border-b border-white/10">
                    <span className="text-[10px] text-white/60">Historique</span>
                    <Calendar className="w-4 h-4 text-white/40" />
                  </div>
                  <div className="p-3">
                    <div className="space-y-2">
                      {[
                        { id: "#45892", addr: "15 Rue de Paris", time: "10:32", status: "delivered" },
                        { id: "#45891", addr: "8 Av. Victor Hugo", time: "10:18", status: "delivered" },
                        { id: "#45890", addr: "42 Bd Haussmann", time: "09:55", status: "delivered" },
                        { id: "#45889", addr: "3 Rue Rivoli", time: "09:41", status: "failed" },
                        { id: "#45888", addr: "27 Av. Opéra", time: "09:22", status: "delivered" },
                      ].map((item,i)=>(
                        <div key={i} className={`flex items-center gap-2 p-2 rounded-lg ${item.status === 'failed' ? 'bg-red-500/10' : 'bg-white/5'}`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.status === 'failed' ? 'bg-red-500/20' : 'bg-emerald-500/20'}`}>
                            {item.status === 'failed' ? <X className="w-3 h-3 text-red-400" /> : <Check className="w-3 h-3 text-emerald-400" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-white truncate">{item.addr}</p>
                            <p className="text-[8px] text-white/40">{item.id}</p>
                          </div>
                          <span className="text-[8px] text-white/40">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Historique</p>
            </motion.div>

            {/* Navigation Bottom */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-[#0f172a] rounded-[28px] overflow-hidden">
                  <div className="px-4 py-2 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-white/60">Optimisation</span>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[8px] rounded">IA Active</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Route className="w-4 h-4 text-emerald-400" />
                        <span className="text-[10px] font-medium text-emerald-400">Route optimisée</span>
                      </div>
                      <p className="text-[10px] text-white/70">Économie estimée: 12 km, 25 min</p>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Timer className="w-3 h-3 text-white/40" />
                          <span className="text-[10px] text-white/70">Fin estimée</span>
                        </div>
                        <span className="text-[10px] text-white font-medium">16:45</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Truck className="w-3 h-3 text-white/40" />
                          <span className="text-[10px] text-white/70">Distance totale</span>
                        </div>
                        <span className="text-[10px] text-white font-medium">58 km</span>
                      </div>
                    </div>
                    
                    <button className="w-full py-2 border border-emerald-500/30 text-emerald-400 text-[10px] rounded-lg">Réoptimiser</button>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Optimisation IA</p>
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
