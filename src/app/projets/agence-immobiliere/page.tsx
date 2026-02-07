"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Home, Eye, Calendar, MapPin, Calculator, Search, Heart, Share2, Phone, Mail, Bed, Bath, Square, Car, ChevronLeft, ChevronRight, Play, Star, Clock, Check, Filter, Grid, List, TrendingUp, Euro, Building2, Trees, User, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/contexts";

const content = {
  fr: {
    back: "Retour aux projets",
    category: "Site Vitrine",
    title: "Agence Immobilière Premium",
    subtitle: "Site immobilier premium avec visites virtuelles 3D, estimation IA et prise de RDV automatisée.",
    client: "Agence immobilière",
    year: "2023",
    duration: "3 mois",
    tags: ["Next.js", "3D", "VR", "IA"],
    overview: "Présentation",
    overviewText: "Création d'un site web premium pour une agence immobilière haut de gamme. Le site intègre des visites virtuelles 3D immersives, un estimateur de prix basé sur l'IA et un système de prise de rendez-vous automatisé pour offrir une expérience client exceptionnelle.",
    features: "Fonctionnalités clés",
    featuresList: [
      { icon: Eye, title: "Visites 3D", desc: "Tours virtuels immersifs Matterport" },
      { icon: Calculator, title: "Estimation IA", desc: "Prix estimé basé sur le marché" },
      { icon: Calendar, title: "RDV en ligne", desc: "Réservation automatisée 24/7" },
      { icon: MapPin, title: "Carte interactive", desc: "Recherche géolocalisée" },
      { icon: Search, title: "Recherche avancée", desc: "Filtres multicritères" },
      { icon: Home, title: "Favoris", desc: "Espace client personnalisé" },
    ],
    results: "Résultats",
    resultsList: [
      { value: "+180%", label: "Leads qualifiés" },
      { value: "85%", label: "Visites virtuelles" },
      { value: "-50%", label: "Visites physiques inutiles" },
      { value: "4.9/5", label: "Satisfaction" },
    ],
  },
  en: {
    back: "Back to projects",
    category: "Showcase Website",
    title: "Premium Real Estate Agency",
    subtitle: "Premium real estate site with 3D virtual tours, AI valuation and automated booking.",
    client: "Real estate agency",
    year: "2023",
    duration: "3 months",
    tags: ["Next.js", "3D", "VR", "AI"],
    overview: "Overview",
    overviewText: "Creation of a premium website for a high-end real estate agency. The site integrates immersive 3D virtual tours, an AI-based price estimator and an automated booking system to deliver an exceptional client experience.",
    features: "Key Features",
    featuresList: [
      { icon: Eye, title: "3D Tours", desc: "Immersive Matterport virtual tours" },
      { icon: Calculator, title: "AI Estimation", desc: "Market-based price estimate" },
      { icon: Calendar, title: "Online booking", desc: "24/7 automated reservation" },
      { icon: MapPin, title: "Interactive map", desc: "Geolocated search" },
      { icon: Search, title: "Advanced search", desc: "Multi-criteria filters" },
      { icon: Home, title: "Favorites", desc: "Personalized client area" },
    ],
    results: "Results",
    resultsList: [
      { value: "+180%", label: "Qualified leads" },
      { value: "85%", label: "Virtual tours" },
      { value: "-50%", label: "Unnecessary visits" },
      { value: "4.9/5", label: "Satisfaction" },
    ],
  },
};

export default function AgenceImmobilierePage() {
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
                <div className="flex-1 mx-4"><div className="bg-black/50 rounded-sm px-4 py-1.5 text-xs text-white/40 max-w-md mx-auto">prestige-immobilier.fr</div></div>
              </div>

              <div className="aspect-[16/10] bg-white relative overflow-hidden">
                {/* Hero image area */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-48 bg-white shadow-2xl rounded-lg flex items-center justify-center">
                      <Home className="w-16 h-16 text-neutral-200" />
                    </div>
                  </div>
                </div>

                {/* Header */}
                <div className="absolute top-0 left-0 right-0 bg-white/95 backdrop-blur px-8 py-4 flex items-center justify-between border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-neutral-900 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                    <span className="text-sm font-medium text-neutral-800 tracking-wide">PRESTIGE</span>
                  </div>
                  <nav className="hidden lg:flex items-center gap-6 text-xs text-neutral-600">
                    <span>Acheter</span>
                    <span>Louer</span>
                    <span>Vendre</span>
                    <span>Estimer</span>
                  </nav>
                  <button className="px-4 py-2 bg-neutral-900 text-white text-xs">Contact</button>
                </div>

                {/* Hero content */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 lg:p-12">
                  <div className="max-w-xl">
                    <h2 className="text-2xl lg:text-4xl font-light text-white leading-tight">
                      L&apos;immobilier<br />d&apos;exception
                    </h2>
                    <p className="text-sm text-white/70 mt-4 max-w-md">
                      Découvrez notre sélection de biens prestigieux avec visites virtuelles 3D.
                    </p>
                    {/* Search bar */}
                    <div className="mt-6 bg-white rounded-lg p-2 flex items-center gap-2 max-w-lg">
                      <div className="flex-1 flex items-center gap-2 px-3">
                        <Search className="w-4 h-4 text-neutral-400" />
                        <input type="text" placeholder="Ville, quartier, code postal..." className="flex-1 text-sm text-neutral-800 outline-none" />
                      </div>
                      <select className="text-xs text-neutral-600 border-l border-neutral-200 px-3 py-2 outline-none">
                        <option>Acheter</option>
                        <option>Louer</option>
                      </select>
                      <button className="px-4 py-2 bg-neutral-900 text-white text-xs rounded">Rechercher</button>
                    </div>
                  </div>
                </div>

                {/* Featured properties */}
                <div className="absolute bottom-4 right-4 lg:right-8 flex gap-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-24 lg:w-32 bg-white rounded shadow-lg overflow-hidden">
                      <div className="h-16 bg-neutral-100 flex items-center justify-center">
                        <Home className="w-6 h-6 text-neutral-300" />
                      </div>
                      <div className="p-2">
                        <p className="text-[10px] font-medium text-neutral-800">Appartement T{i + 2}</p>
                        <p className="text-[8px] text-neutral-500">Paris {i + 5}e</p>
                        <p className="text-[10px] font-bold text-neutral-800 mt-1">€{(i + 4) * 100}K</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 3D badge */}
                <div className="absolute top-20 right-4 bg-white rounded-full px-3 py-1.5 shadow-lg flex items-center gap-2">
                  <Eye className="w-4 h-4 text-neutral-600" />
                  <span className="text-[10px] font-medium text-neutral-800">Visite 3D</span>
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
              {["Next.js 14", "Three.js", "Matterport SDK", "TensorFlow", "Mapbox", "Calendly API"].map((tech) => (
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

      {/* Detailed Mockups - Property & Virtual Tour */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Fiche bien & Visite 3D" : "Property & 3D Tour"}
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Property Detail */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /></div>
                  <span className="text-[10px] text-white/30">{locale === "fr" ? "Fiche bien" : "Property Detail"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-3 h-3 text-white/30" />
                  <Share2 className="w-3 h-3 text-white/30" />
                </div>
              </div>
              <div className="aspect-[4/3] bg-white overflow-hidden">
                <div className="h-28 bg-neutral-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Home className="w-12 h-12 text-neutral-300" />
                  </div>
                  <button className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 bg-black/70 text-white text-[10px] rounded">
                    <Eye className="w-3 h-3" /> Visite 3D
                  </button>
                  <div className="absolute bottom-2 left-2 flex gap-1">
                    {[1,2,3,4].map((i)=>(<div key={i} className="w-6 h-6 bg-white/80 rounded border border-white/50" />))}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-medium text-neutral-800">Appartement 4 pièces</h3>
                      <div className="flex items-center gap-1 text-[10px] text-neutral-500">
                        <MapPin className="w-3 h-3" /> Paris 16e - Passy
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-neutral-800">1 250 000 €</p>
                      <p className="text-[10px] text-neutral-400">12 500 €/m²</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 mb-3 p-2 bg-neutral-50 rounded-lg">
                    {[
                      { icon: Square, value: "100 m²", label: "Surface" },
                      { icon: Bed, value: "3", label: "Chambres" },
                      { icon: Bath, value: "2", label: "SdB" },
                      { icon: Car, value: "1", label: "Parking" },
                    ].map((item)=>(
                      <div key={item.label} className="text-center">
                        <item.icon className="w-4 h-4 mx-auto text-neutral-400 mb-1" />
                        <p className="text-[10px] font-medium text-neutral-800">{item.value}</p>
                        <p className="text-[8px] text-neutral-400">{item.label}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-neutral-900 text-white text-[10px] font-medium rounded flex items-center justify-center gap-1">
                      <Calendar className="w-3 h-3" /> Prendre RDV
                    </button>
                    <button className="px-3 py-2 border border-neutral-200 text-neutral-600 text-[10px] rounded">
                      <Phone className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Virtual Tour */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /></div>
                  <span className="text-[10px] text-white/30">{locale === "fr" ? "Visite virtuelle 3D" : "3D Virtual Tour"}</span>
                </div>
                <button className="text-[10px] text-white/50">Plein écran</button>
              </div>
              <div className="aspect-[4/3] bg-[#1a1a1a] relative">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-3">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-sm text-white/80">Visite 3D Matterport</p>
                    <p className="text-[10px] text-white/40">Cliquez pour démarrer</p>
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/70 backdrop-blur rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-white/70">Navigation</span>
                      <div className="flex gap-2">
                        {['Salon', 'Cuisine', 'Chambre 1', 'SdB'].map((room,i)=>(
                          <button key={room} className={`px-2 py-1 text-[10px] rounded ${i===0 ? 'bg-white text-black' : 'bg-white/10 text-white/70'}`}>{room}</button>
                        ))}
                      </div>
                    </div>
                    <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-1/4 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white"><Eye className="w-4 h-4" /></button>
                  <button className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white"><Share2 className="w-4 h-4" /></button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* More Screens - Estimation & Search */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Estimation & Recherche" : "Estimation & Search"}
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* AI Estimation */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center gap-4 px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /></div>
                <span className="text-[10px] text-white/30">{locale === "fr" ? "Estimation IA" : "AI Estimation"}</span>
              </div>
              <div className="aspect-[4/3] bg-white p-4 overflow-hidden">
                <div className="text-center mb-4 pb-4 border-b border-neutral-100">
                  <div className="w-12 h-12 mx-auto bg-neutral-900 rounded-xl flex items-center justify-center mb-3">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-neutral-800">Estimation de votre bien</h3>
                  <p className="text-[10px] text-neutral-500">Basée sur l&apos;IA et les données du marché</p>
                </div>
                
                <div className="bg-neutral-50 rounded-lg p-4 mb-4 text-center">
                  <p className="text-[10px] text-neutral-500 mb-1">Estimation</p>
                  <p className="text-3xl font-bold text-neutral-800">485 000 €</p>
                  <p className="text-[10px] text-neutral-400">± 5% selon le marché</p>
                  <div className="flex items-center justify-center gap-4 mt-3">
                    <div className="text-center">
                      <p className="text-xs font-medium text-neutral-800">+8%</p>
                      <p className="text-[8px] text-neutral-400">vs 2023</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium text-neutral-800">9 200 €/m²</p>
                      <p className="text-[8px] text-neutral-400">Prix moyen</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {[
                    { label: "Adresse", value: "15 Rue de la Paix, 75002" },
                    { label: "Surface", value: "52 m²" },
                    { label: "Type", value: "Appartement T2" },
                  ].map((item)=>(
                    <div key={item.label} className="flex justify-between text-[10px]">
                      <span className="text-neutral-500">{item.label}</span>
                      <span className="text-neutral-800">{item.value}</span>
                    </div>
                  ))}
                </div>
                
                <button className="w-full py-2 bg-neutral-900 text-white text-[10px] font-medium rounded">Affiner mon estimation</button>
              </div>
            </motion.div>

            {/* Search Results */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /></div>
                  <span className="text-[10px] text-white/30">{locale === "fr" ? "Résultats recherche" : "Search Results"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Grid className="w-3 h-3 text-white/50" />
                  <List className="w-3 h-3 text-white/30" />
                </div>
              </div>
              <div className="aspect-[4/3] bg-[#f8fafc] p-4 overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] text-neutral-600">24 biens trouvés</p>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 px-2 py-1 border border-neutral-200 rounded text-[10px] text-neutral-600">
                      <Filter className="w-3 h-3" /> Filtres
                    </button>
                    <select className="text-[10px] border border-neutral-200 rounded px-2 py-1">
                      <option>Prix croissant</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {[
                    { type: "Appartement T3", location: "Paris 8e", price: "890 000 €", surface: "75 m²", rooms: 3, isHouse: false },
                    { type: "Maison 5 pièces", location: "Neuilly", price: "1 450 000 €", surface: "140 m²", rooms: 5, isHouse: true },
                    { type: "Studio", location: "Paris 11e", price: "320 000 €", surface: "28 m²", rooms: 1, isHouse: false },
                  ].map((property,i)=>(
                    <div key={i} className="flex gap-3 p-2 bg-white rounded-lg border border-neutral-100 hover:shadow-sm transition-shadow">
                      <div className="w-20 h-16 bg-neutral-100 rounded flex items-center justify-center">
                        {property.isHouse ? <Home className="w-6 h-6 text-neutral-400" /> : <Building2 className="w-6 h-6 text-neutral-400" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-[10px] font-medium text-neutral-800">{property.type}</h4>
                            <p className="text-[10px] text-neutral-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{property.location}</p>
                          </div>
                          <Heart className="w-4 h-4 text-neutral-300" />
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs font-bold text-neutral-800">{property.price}</p>
                          <div className="flex items-center gap-2 text-[10px] text-neutral-500">
                            <span>{property.surface}</span>
                            <span>•</span>
                            <span>{property.rooms} pièces</span>
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
