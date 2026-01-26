"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ShoppingBag, Globe, CreditCard, Truck, Shield, Star, Heart, Search, User, ChevronRight, MapPin, Check, Package, Filter, Grid3X3, LayoutGrid, Clock, Gift, Percent, Bell, Settings, LogOut, ChevronDown, Plus, Minus, X, CreditCard as CardIcon, Lock } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/contexts";

const content = {
  fr: {
    back: "Retour aux projets",
    category: "Site E-commerce",
    title: "E-commerce Luxe International",
    subtitle: "Plateforme e-commerce multi-devises pour marque de luxe avec gestion de stock temps réel et livraison mondiale.",
    client: "Marque de luxe internationale",
    year: "2025",
    duration: "4 mois",
    tags: ["Next.js", "Stripe", "Headless CMS", "Multi-devises"],
    overview: "Présentation",
    overviewText: "Conception et développement d'une plateforme e-commerce haut de gamme pour une marque de luxe internationale. L'objectif était de créer une expérience d'achat premium reflétant l'excellence de la marque, tout en gérant la complexité des ventes internationales.",
    features: "Fonctionnalités clés",
    featuresList: [
      { icon: Globe, title: "Multi-devises", desc: "Paiement en 12 devises avec taux de change temps réel" },
      { icon: ShoppingBag, title: "Stock temps réel", desc: "Synchronisation inventaire multi-entrepôts" },
      { icon: CreditCard, title: "Paiements sécurisés", desc: "Stripe, Apple Pay, Google Pay, Klarna" },
      { icon: Truck, title: "Livraison mondiale", desc: "Intégration DHL, FedEx, UPS avec tracking" },
      { icon: Shield, title: "Anti-fraude", desc: "Système de détection fraud avancé" },
      { icon: Star, title: "Programme VIP", desc: "Fidélité et accès exclusifs" },
    ],
    results: "Résultats",
    resultsList: [
      { value: "+340%", label: "Ventes internationales" },
      { value: "2.1s", label: "Temps de chargement" },
      { value: "4.8/5", label: "Satisfaction client" },
      { value: "99.9%", label: "Uptime" },
    ],
    mockupTitle: "Aperçu de l'interface",
    visitSite: "Voir le site",
    techStack: "Stack technique",
  },
  en: {
    back: "Back to projects",
    category: "E-commerce Website",
    title: "International Luxury E-commerce",
    subtitle: "Multi-currency e-commerce platform for luxury brand with real-time inventory and worldwide delivery.",
    client: "International luxury brand",
    year: "2025",
    duration: "4 months",
    tags: ["Next.js", "Stripe", "Headless CMS", "Multi-currency"],
    overview: "Overview",
    overviewText: "Design and development of a high-end e-commerce platform for an international luxury brand. The goal was to create a premium shopping experience reflecting the brand's excellence while managing the complexity of international sales.",
    features: "Key Features",
    featuresList: [
      { icon: Globe, title: "Multi-currency", desc: "Payment in 12 currencies with real-time exchange rates" },
      { icon: ShoppingBag, title: "Real-time inventory", desc: "Multi-warehouse inventory synchronization" },
      { icon: CreditCard, title: "Secure payments", desc: "Stripe, Apple Pay, Google Pay, Klarna" },
      { icon: Truck, title: "Worldwide delivery", desc: "DHL, FedEx, UPS integration with tracking" },
      { icon: Shield, title: "Anti-fraud", desc: "Advanced fraud detection system" },
      { icon: Star, title: "VIP Program", desc: "Loyalty and exclusive access" },
    ],
    results: "Results",
    resultsList: [
      { value: "+340%", label: "International sales" },
      { value: "2.1s", label: "Load time" },
      { value: "4.8/5", label: "Customer satisfaction" },
      { value: "99.9%", label: "Uptime" },
    ],
    mockupTitle: "Interface Preview",
    visitSite: "View site",
    techStack: "Tech Stack",
  },
};

export default function EcommerceLuxePage() {
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
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs font-medium text-white/70 border border-white/10 bg-white/[0.02]"
                    >
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

      {/* Main Mockup */}
      <section className="relative py-16">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Browser frame */}
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
                    luxe-brand.com
                  </div>
                </div>
              </div>

              {/* Website mockup content */}
              <div className="aspect-[16/10] bg-[#fafafa] relative overflow-hidden">
                {/* Hero section mockup */}
                <div className="absolute inset-0 flex">
                  {/* Left content */}
                  <div className="w-1/2 bg-white p-12 lg:p-20 flex flex-col justify-center">
                    <div className="space-y-6">
                      <span className="text-[10px] lg:text-xs font-medium text-neutral-400 uppercase tracking-[0.3em]">
                        Collection 2025
                      </span>
                      <h2 className="text-2xl lg:text-5xl font-light text-black leading-tight">
                        L'Excellence<br />
                        <span className="text-neutral-400">Redéfinie</span>
                      </h2>
                      <p className="text-xs lg:text-sm text-neutral-500 max-w-xs leading-relaxed">
                        Découvrez notre nouvelle collection alliant tradition artisanale et innovation contemporaine.
                      </p>
                      <button className="px-6 py-3 bg-black text-white text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors">
                        Explorer
                      </button>
                    </div>
                  </div>
                  {/* Right image placeholder */}
                  <div className="w-1/2 bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMCAwSDQwVjQwIiBzdHJva2U9InJnYmEoMCwwLDAsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-50" />
                    <div className="w-48 h-64 lg:w-64 lg:h-80 bg-white shadow-2xl flex items-center justify-center">
                      <span className="text-4xl lg:text-6xl font-light text-neutral-200">L</span>
                    </div>
                  </div>
                </div>

                {/* Navigation overlay */}
                <div className="absolute top-0 left-0 right-0 px-8 py-6 flex items-center justify-between bg-gradient-to-b from-white/80 to-transparent">
                  <span className="text-lg font-light text-black tracking-wider">LUXE</span>
                  <nav className="hidden lg:flex items-center gap-8 text-xs text-neutral-600 uppercase tracking-wider">
                    <span>Collections</span>
                    <span>Maroquinerie</span>
                    <span>Joaillerie</span>
                    <span>Maison</span>
                  </nav>
                  <div className="flex items-center gap-4 text-neutral-600">
                    <ShoppingBag className="w-4 h-4" />
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
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
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
                {t.techStack}
              </span>
              <div className="mt-6 space-y-3">
                {["Next.js 14", "TypeScript", "Tailwind CSS", "Stripe API", "Sanity CMS", "Vercel Edge"].map((tech) => (
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
            transition={{ duration: 0.5 }}
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
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 border border-white/[0.06] bg-white/[0.01] group hover:border-white/20 transition-colors"
              >
                <feature.icon className="w-5 h-5 text-white/40 mb-4" />
                <h3 className="text-white font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary mockups - Product Detail */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Page Produit Détaillée" : "Detailed Product Page"}
            </span>
          </motion.div>

          {/* Full Product Page Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#111]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-black/50 rounded-sm px-4 py-1.5 text-xs text-white/40 max-w-md mx-auto">
                  luxe-brand.com/maroquinerie/sac-signature
                </div>
              </div>
            </div>
            <div className="bg-white">
              {/* Navigation */}
              <div className="px-8 py-4 border-b border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <span className="text-lg font-light text-black tracking-wider">LUXE</span>
                  <nav className="hidden lg:flex items-center gap-6 text-[11px] text-neutral-600 uppercase tracking-wider">
                    <span className="flex items-center gap-1">Collections <ChevronDown className="w-3 h-3" /></span>
                    <span className="text-black font-medium">Maroquinerie</span>
                    <span>Joaillerie</span>
                    <span>Prêt-à-porter</span>
                    <span>Maison</span>
                  </nav>
                </div>
                <div className="flex items-center gap-4 text-neutral-600">
                  <Search className="w-4 h-4" />
                  <User className="w-4 h-4" />
                  <Heart className="w-4 h-4" />
                  <div className="relative">
                    <ShoppingBag className="w-4 h-4" />
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-black text-white text-[8px] rounded-full flex items-center justify-center">2</span>
                  </div>
                </div>
              </div>
              
              {/* Breadcrumb */}
              <div className="px-8 py-3 text-[10px] text-neutral-400 flex items-center gap-2">
                <span>Accueil</span>
                <ChevronRight className="w-3 h-3" />
                <span>Maroquinerie</span>
                <ChevronRight className="w-3 h-3" />
                <span>Sacs</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-black">Sac Signature</span>
              </div>

              {/* Product Content */}
              <div className="px-8 py-8 grid lg:grid-cols-2 gap-12">
                {/* Product Images */}
                <div className="space-y-4">
                  <div className="aspect-square bg-neutral-50 flex items-center justify-center relative">
                    <div className="w-3/4 h-3/4 bg-white shadow-lg flex items-center justify-center">
                      <span className="text-6xl font-light text-neutral-200">S</span>
                    </div>
                    <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm">
                      <Heart className="w-4 h-4 text-neutral-400" />
                    </button>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-black" />
                      <div className="w-2 h-2 rounded-full bg-neutral-300" />
                      <div className="w-2 h-2 rounded-full bg-neutral-300" />
                      <div className="w-2 h-2 rounded-full bg-neutral-300" />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className={`aspect-square bg-neutral-50 flex items-center justify-center ${i === 1 ? 'ring-1 ring-black' : ''}`}>
                        <span className="text-xl font-light text-neutral-300">{i}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Maroquinerie • Réf. LX-2025-SIG</span>
                    <h1 className="text-2xl font-light text-black mt-2">Sac Signature</h1>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex">
                        {[1,2,3,4,5].map((i) => (
                          <Star key={i} className={`w-3 h-3 ${i <= 4 ? 'text-black fill-black' : 'text-neutral-300'}`} />
                        ))}
                      </div>
                      <span className="text-[10px] text-neutral-400">(127 avis)</span>
                    </div>
                  </div>

                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Confectionné dans nos ateliers français, ce sac emblématique allie savoir-faire artisanal et design contemporain. Cuir pleine fleur tanné végétal, finitions main, quincaillerie dorée.
                  </p>

                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-light text-black">€2,450</span>
                    <span className="text-xs text-neutral-400">ou 3x €816.67 sans frais</span>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-neutral-100">
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Couleur : Noir</span>
                      <div className="flex gap-2 mt-2">
                        <div className="w-8 h-8 rounded-full bg-black border-2 border-black ring-2 ring-offset-2 ring-black" />
                        <div className="w-8 h-8 rounded-full bg-neutral-200 border border-neutral-300" />
                        <div className="w-8 h-8 rounded-full bg-amber-800 border border-amber-700" />
                        <div className="w-8 h-8 rounded-full bg-rose-100 border border-rose-200" />
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Taille</span>
                      <div className="flex gap-2 mt-2">
                        <button className="px-4 py-2 text-xs border border-neutral-200 text-neutral-400">PM</button>
                        <button className="px-4 py-2 text-xs border-2 border-black text-black font-medium">MM</button>
                        <button className="px-4 py-2 text-xs border border-neutral-200 text-neutral-400">GM</button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 py-3.5 bg-black text-white text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                      <ShoppingBag className="w-4 h-4" />
                      Ajouter au panier
                    </button>
                    <button className="px-4 py-3.5 border border-neutral-200">
                      <Heart className="w-4 h-4 text-neutral-600" />
                    </button>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-neutral-100 text-xs text-neutral-500">
                    <div className="flex items-center gap-3">
                      <Truck className="w-4 h-4" />
                      <span>Livraison offerte • 2-4 jours ouvrés</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Package className="w-4 h-4" />
                      <span>Retours gratuits sous 30 jours</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Gift className="w-4 h-4" />
                      <span>Emballage cadeau offert</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Collection Page Mockup */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Page Collection" : "Collection Page"}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#111]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-black/50 rounded-sm px-4 py-1.5 text-xs text-white/40 max-w-md mx-auto">
                  luxe-brand.com/collections/maroquinerie
                </div>
              </div>
            </div>
            <div className="bg-white">
              {/* Collection Header */}
              <div className="px-8 py-12 bg-neutral-50 text-center">
                <span className="text-[10px] text-neutral-400 uppercase tracking-[0.3em]">Collection</span>
                <h2 className="text-3xl font-light text-black mt-2">Maroquinerie</h2>
                <p className="text-sm text-neutral-500 mt-3 max-w-lg mx-auto">
                  L'excellence du cuir français, façonné dans nos ateliers par des artisans d'exception.
                </p>
              </div>

              {/* Filters */}
              <div className="px-8 py-4 border-b border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-xs text-neutral-600 border border-neutral-200 px-3 py-2">
                    <Filter className="w-3 h-3" />
                    Filtres
                  </button>
                  <div className="flex items-center gap-2 text-[10px] text-neutral-500">
                    <span className="px-2 py-1 bg-black text-white">Tous</span>
                    <span className="px-2 py-1 bg-neutral-100">Sacs</span>
                    <span className="px-2 py-1 bg-neutral-100">Portefeuilles</span>
                    <span className="px-2 py-1 bg-neutral-100">Accessoires</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-neutral-400">48 produits</span>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 bg-black text-white"><Grid3X3 className="w-3 h-3" /></button>
                    <button className="p-1.5 bg-neutral-100 text-neutral-400"><LayoutGrid className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <div className="p-8 grid grid-cols-4 gap-6">
                {[
                  { name: "Sac Signature", price: "€2,450", tag: "Nouveauté" },
                  { name: "Pochette Élégance", price: "€890", tag: null },
                  { name: "Cabas Weekend", price: "€1,650", tag: "Best-seller" },
                  { name: "Mini Sac Soirée", price: "€1,290", tag: null },
                  { name: "Portefeuille Classic", price: "€650", tag: null },
                  { name: "Bandoulière City", price: "€1,890", tag: "Nouveauté" },
                  { name: "Porte-cartes", price: "€320", tag: null },
                  { name: "Sac Voyage", price: "€3,200", tag: null },
                ].map((product, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="aspect-square bg-neutral-50 relative mb-3 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-light text-neutral-200 group-hover:scale-110 transition-transform">{product.name[0]}</span>
                      </div>
                      {product.tag && (
                        <span className="absolute top-2 left-2 px-2 py-1 bg-black text-white text-[8px] uppercase tracking-wider">{product.tag}</span>
                      )}
                      <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="w-3 h-3 text-neutral-400" />
                      </button>
                    </div>
                    <h3 className="text-xs font-medium text-black">{product.name}</h3>
                    <p className="text-xs text-neutral-500 mt-1">{product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Checkout & Account Mockups */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Processus de Paiement" : "Checkout Process"}
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Cart mockup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
                <span className="text-[10px] text-white/30 ml-4">{locale === "fr" ? "Panier" : "Cart"}</span>
              </div>
              <div className="bg-white p-6">
                {/* Progress */}
                <div className="flex items-center justify-center gap-2 mb-8 text-[10px]">
                  <span className="flex items-center gap-1 text-black"><span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[9px]">1</span> Panier</span>
                  <div className="w-12 h-px bg-neutral-200" />
                  <span className="text-neutral-300"><span className="w-5 h-5 rounded-full bg-neutral-200 inline-flex items-center justify-center text-[9px]">2</span> Livraison</span>
                  <div className="w-12 h-px bg-neutral-200" />
                  <span className="text-neutral-300"><span className="w-5 h-5 rounded-full bg-neutral-200 inline-flex items-center justify-center text-[9px]">3</span> Paiement</span>
                </div>

                <h3 className="text-sm font-medium text-black mb-4">Votre panier (2 articles)</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex gap-4 p-4 bg-neutral-50">
                    <div className="w-20 h-24 bg-white flex items-center justify-center">
                      <span className="text-2xl font-light text-neutral-200">S</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-xs font-medium text-black">Sac Signature</p>
                          <p className="text-[10px] text-neutral-400 mt-0.5">Noir • MM</p>
                        </div>
                        <button><X className="w-3 h-3 text-neutral-400" /></button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-neutral-200">
                          <button className="px-2 py-1"><Minus className="w-3 h-3" /></button>
                          <span className="px-3 text-xs">1</span>
                          <button className="px-2 py-1"><Plus className="w-3 h-3" /></button>
                        </div>
                        <span className="text-sm font-medium">€2,450</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-neutral-50">
                    <div className="w-20 h-24 bg-white flex items-center justify-center">
                      <span className="text-2xl font-light text-neutral-200">P</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-xs font-medium text-black">Portefeuille Classic</p>
                          <p className="text-[10px] text-neutral-400 mt-0.5">Cognac</p>
                        </div>
                        <button><X className="w-3 h-3 text-neutral-400" /></button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-neutral-200">
                          <button className="px-2 py-1"><Minus className="w-3 h-3" /></button>
                          <span className="px-3 text-xs">1</span>
                          <button className="px-2 py-1"><Plus className="w-3 h-3" /></button>
                        </div>
                        <span className="text-sm font-medium">€650</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Promo code */}
                <div className="flex gap-2 mb-6">
                  <input type="text" placeholder="Code promo" className="flex-1 px-3 py-2 text-xs border border-neutral-200" />
                  <button className="px-4 py-2 text-xs bg-neutral-100 text-neutral-600">Appliquer</button>
                </div>

                {/* Totals */}
                <div className="space-y-2 py-4 border-t border-neutral-200 text-xs">
                  <div className="flex justify-between text-neutral-500">
                    <span>Sous-total</span>
                    <span>€3,100</span>
                  </div>
                  <div className="flex justify-between text-neutral-500">
                    <span>Livraison</span>
                    <span className="text-green-600">Offerte</span>
                  </div>
                  <div className="flex justify-between text-black font-medium pt-2 border-t border-neutral-100">
                    <span>Total</span>
                    <span>€3,100</span>
                  </div>
                </div>

                <button className="w-full py-3 bg-black text-white text-xs uppercase tracking-wider mt-4">
                  Passer la commande
                </button>
              </div>
            </motion.div>

            {/* Payment mockup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
                <span className="text-[10px] text-white/30 ml-4">{locale === "fr" ? "Paiement" : "Payment"}</span>
              </div>
              <div className="bg-white p-6">
                {/* Progress */}
                <div className="flex items-center justify-center gap-2 mb-8 text-[10px]">
                  <span className="text-neutral-400"><span className="w-5 h-5 rounded-full bg-green-500 text-white inline-flex items-center justify-center"><Check className="w-3 h-3" /></span> Panier</span>
                  <div className="w-12 h-px bg-green-500" />
                  <span className="text-neutral-400"><span className="w-5 h-5 rounded-full bg-green-500 text-white inline-flex items-center justify-center"><Check className="w-3 h-3" /></span> Livraison</span>
                  <div className="w-12 h-px bg-black" />
                  <span className="text-black"><span className="w-5 h-5 rounded-full bg-black text-white inline-flex items-center justify-center text-[9px]">3</span> Paiement</span>
                </div>

                <h3 className="text-sm font-medium text-black mb-4">Mode de paiement</h3>

                {/* Payment methods */}
                <div className="space-y-3 mb-6">
                  <label className="flex items-center gap-3 p-3 border-2 border-black cursor-pointer">
                    <input type="radio" name="payment" checked className="w-4 h-4 accent-black" readOnly />
                    <CardIcon className="w-4 h-4" />
                    <span className="text-xs">Carte bancaire</span>
                    <div className="ml-auto flex gap-1">
                      <div className="w-8 h-5 bg-blue-600 rounded-sm" />
                      <div className="w-8 h-5 bg-red-500 rounded-sm" />
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-neutral-200 cursor-pointer">
                    <input type="radio" name="payment" className="w-4 h-4 accent-black" readOnly />
                    <span className="text-xs font-bold">PayPal</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-neutral-200 cursor-pointer">
                    <input type="radio" name="payment" className="w-4 h-4 accent-black" readOnly />
                    <span className="text-xs">Klarna - 3x sans frais</span>
                  </label>
                </div>

                {/* Card form */}
                <div className="space-y-4 p-4 bg-neutral-50 mb-6">
                  <div>
                    <label className="text-[10px] text-neutral-500 uppercase tracking-wider">Numéro de carte</label>
                    <div className="mt-1 flex items-center border border-neutral-200 bg-white px-3 py-2">
                      <input type="text" placeholder="4242 4242 4242 4242" className="flex-1 text-xs outline-none" />
                      <Lock className="w-3 h-3 text-neutral-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-neutral-500 uppercase tracking-wider">Expiration</label>
                      <input type="text" placeholder="MM / AA" className="mt-1 w-full border border-neutral-200 bg-white px-3 py-2 text-xs" />
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-500 uppercase tracking-wider">CVC</label>
                      <input type="text" placeholder="123" className="mt-1 w-full border border-neutral-200 bg-white px-3 py-2 text-xs" />
                    </div>
                  </div>
                </div>

                {/* Order summary */}
                <div className="p-4 bg-neutral-50 mb-6">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-neutral-500">2 articles</span>
                    <span>€3,100</span>
                  </div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-neutral-500">Livraison express</span>
                    <span className="text-green-600">Offerte</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium pt-2 border-t border-neutral-200">
                    <span>Total</span>
                    <span>€3,100</span>
                  </div>
                </div>

                <button className="w-full py-3 bg-black text-white text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                  <Lock className="w-3 h-3" />
                  Payer €3,100
                </button>

                <p className="text-[9px] text-neutral-400 text-center mt-4 flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3" />
                  Paiement 100% sécurisé • SSL
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Account Dashboard Mockup */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Espace Client" : "Customer Account"}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#111]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-black/50 rounded-sm px-4 py-1.5 text-xs text-white/40 max-w-md mx-auto">
                  luxe-brand.com/compte
                </div>
              </div>
            </div>
            <div className="bg-white flex min-h-[500px]">
              {/* Sidebar */}
              <div className="w-64 border-r border-neutral-100 p-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
                    <span className="text-lg font-light text-neutral-400">MC</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">Marie Dupont</p>
                    <p className="text-[10px] text-neutral-400">Membre Gold</p>
                  </div>
                </div>

                <nav className="space-y-1">
                  {[
                    { icon: User, label: "Mon profil", active: false },
                    { icon: Package, label: "Mes commandes", active: true },
                    { icon: Heart, label: "Favoris", active: false },
                    { icon: MapPin, label: "Adresses", active: false },
                    { icon: CreditCard, label: "Paiement", active: false },
                    { icon: Gift, label: "Programme fidélité", active: false },
                    { icon: Bell, label: "Notifications", active: false },
                    { icon: Settings, label: "Paramètres", active: false },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-xs ${item.active ? 'bg-black text-white' : 'text-neutral-600 hover:bg-neutral-50'}`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  ))}
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-xs text-red-500 hover:bg-red-50 mt-4">
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </button>
                </nav>
              </div>

              {/* Content */}
              <div className="flex-1 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-light text-black">Mes commandes</h2>
                  <select className="text-xs border border-neutral-200 px-3 py-2">
                    <option>Toutes les commandes</option>
                    <option>En cours</option>
                    <option>Livrées</option>
                  </select>
                </div>

                {/* Orders */}
                <div className="space-y-4">
                  <div className="border border-neutral-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs font-medium text-black">Commande #LX-2025-4892</p>
                        <p className="text-[10px] text-neutral-400">15 janvier 2025 • 2 articles</p>
                      </div>
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] uppercase tracking-wider">En livraison</span>
                    </div>
                    <div className="flex gap-4 mb-4">
                      <div className="w-16 h-20 bg-neutral-50 flex items-center justify-center">
                        <span className="text-xl font-light text-neutral-300">S</span>
                      </div>
                      <div className="w-16 h-20 bg-neutral-50 flex items-center justify-center">
                        <span className="text-xl font-light text-neutral-300">P</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                      <span className="text-sm font-medium">€3,100</span>
                      <button className="text-xs text-black underline">Suivre ma commande</button>
                    </div>
                  </div>

                  <div className="border border-neutral-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs font-medium text-black">Commande #LX-2024-3156</p>
                        <p className="text-[10px] text-neutral-400">28 novembre 2024 • 1 article</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] uppercase tracking-wider">Livrée</span>
                    </div>
                    <div className="flex gap-4 mb-4">
                      <div className="w-16 h-20 bg-neutral-50 flex items-center justify-center">
                        <span className="text-xl font-light text-neutral-300">E</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                      <span className="text-sm font-medium">€1,290</span>
                      <button className="text-xs text-black underline">Voir les détails</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
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
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-light text-white mb-2">
                  {result.value}
                </div>
                <div className="text-xs text-white/50 uppercase tracking-wider">
                  {result.label}
                </div>
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
            transition={{ duration: 0.5 }}
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
