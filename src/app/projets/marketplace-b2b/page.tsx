"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Search, Package, FileText, Truck, Settings, Shield, ShoppingCart, Star, Check, Building2, Download, Plus, Minus, MapPin, TrendingUp, Heart, Share2, CheckCircle, Box } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/contexts";

const content = {
  fr: {
    back: "Retour aux projets",
    category: "Place de marché",
    title: "Marketplace B2B Industrielle",
    subtitle: "Place de marché pour pièces industrielles avec recherche avancée, devis automatisés et intégration ERP.",
    client: "Groupe industriel",
    year: "2023",
    duration: "6 mois",
    tags: ["React", "Elasticsearch", "ERP", "SAP"],
    overview: "Présentation",
    overviewText: "Création d'une marketplace B2B spécialisée dans les pièces industrielles, connectant fabricants et acheteurs professionnels. La plateforme intègre un moteur de recherche puissant, un système de devis automatisé et une synchronisation bidirectionnelle avec les ERP des partenaires.",
    features: "Fonctionnalités clés",
    featuresList: [
      { icon: Search, title: "Recherche avancée", desc: "Elasticsearch avec filtres techniques" },
      { icon: Package, title: "Catalogue unifié", desc: "500K+ références normalisées" },
      { icon: FileText, title: "Devis automatisés", desc: "Génération instantanée multi-fournisseurs" },
      { icon: Truck, title: "Logistique intégrée", desc: "Tracking et gestion des livraisons" },
      { icon: Settings, title: "Intégration ERP", desc: "SAP, Oracle, Sage connectés" },
      { icon: Shield, title: "Paiements sécurisés", desc: "Délais, facilités, garanties" },
    ],
    results: "Résultats",
    resultsList: [
      { value: "500K+", label: "Références" },
      { value: "€12M", label: "Volume mensuel" },
      { value: "-40%", label: "Temps commande" },
      { value: "850+", label: "Entreprises" },
    ],
  },
  en: {
    back: "Back to projects",
    category: "Marketplace",
    title: "Industrial B2B Marketplace",
    subtitle: "Industrial parts marketplace with advanced search, automated quotes and ERP integration.",
    client: "Industrial group",
    year: "2023",
    duration: "6 months",
    tags: ["React", "Elasticsearch", "ERP", "SAP"],
    overview: "Overview",
    overviewText: "Creation of a specialized B2B marketplace for industrial parts, connecting manufacturers and professional buyers. The platform integrates a powerful search engine, automated quoting system and bidirectional synchronization with partner ERPs.",
    features: "Key Features",
    featuresList: [
      { icon: Search, title: "Advanced search", desc: "Elasticsearch with technical filters" },
      { icon: Package, title: "Unified catalog", desc: "500K+ normalized references" },
      { icon: FileText, title: "Automated quotes", desc: "Instant multi-supplier generation" },
      { icon: Truck, title: "Integrated logistics", desc: "Tracking and delivery management" },
      { icon: Settings, title: "ERP integration", desc: "SAP, Oracle, Sage connected" },
      { icon: Shield, title: "Secure payments", desc: "Terms, facilities, guarantees" },
    ],
    results: "Results",
    resultsList: [
      { value: "500K+", label: "References" },
      { value: "€12M", label: "Monthly volume" },
      { value: "-40%", label: "Order time" },
      { value: "850+", label: "Companies" },
    ],
  },
};

export default function MarketplaceB2BPage() {
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
                <div className="flex-1 mx-4"><div className="bg-black/50 rounded-sm px-4 py-1.5 text-xs text-white/40 max-w-md mx-auto">industriparts-pro.com</div></div>
              </div>

              <div className="aspect-[16/10] bg-white">
                {/* Header */}
                <div className="bg-[#1e293b] px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <span className="text-white font-bold text-sm tracking-wider">INDUSTRIPARTS</span>
                    <nav className="hidden lg:flex gap-4 text-xs text-white/70">
                      <span>Catalogue</span><span>Fournisseurs</span><span>Mes commandes</span>
                    </nav>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden lg:flex items-center bg-white/10 rounded px-3 py-1.5 gap-2">
                      <Search className="w-3 h-3 text-white/50" />
                      <span className="text-[10px] text-white/50">Rechercher une pièce...</span>
                    </div>
                    <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-[10px] font-medium text-white">TB</div>
                  </div>
                </div>

                {/* Search bar */}
                <div className="px-8 py-6 bg-neutral-50 border-b border-neutral-200">
                  <div className="max-w-4xl mx-auto">
                    <div className="flex gap-3">
                      <div className="flex-1 flex items-center bg-white border border-neutral-300 rounded-lg px-4 py-3">
                        <Search className="w-5 h-5 text-neutral-400 mr-3" />
                        <input type="text" placeholder="Référence, nom de pièce, fabricant..." className="flex-1 text-sm text-neutral-800 outline-none" defaultValue="Roulement SKF 6205" />
                      </div>
                      <button className="px-6 py-3 bg-[#1e293b] text-white text-sm font-medium rounded-lg">Rechercher</button>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {["Roulements", "Courroies", "Joints", "Visserie", "Électrique"].map((cat) => (
                        <span key={cat} className="px-3 py-1 bg-white border border-neutral-200 rounded text-xs text-neutral-600 cursor-pointer hover:border-neutral-400">{cat}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="px-8 py-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-neutral-600">24 résultats pour &quot;Roulement SKF 6205&quot;</p>
                    <select className="text-xs border border-neutral-200 rounded px-2 py-1">
                      <option>Prix croissant</option>
                    </select>
                  </div>
                  <div className="grid lg:grid-cols-3 gap-4">
                    {[
                      { ref: "SKF 6205-2RS", name: "Roulement à billes étanche", price: "€12.50", stock: "En stock", supplier: "SKF France" },
                      { ref: "SKF 6205-2Z", name: "Roulement à billes blindé", price: "€11.80", stock: "En stock", supplier: "Bearing Pro" },
                      { ref: "SKF 6205-C3", name: "Roulement jeu C3", price: "€14.20", stock: "48h", supplier: "IndusSupply" },
                    ].map((product) => (
                      <div key={product.ref} className="bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex gap-3">
                          <div className="w-16 h-16 bg-neutral-100 rounded flex items-center justify-center">
                            <Package className="w-6 h-6 text-neutral-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] text-neutral-400">{product.ref}</p>
                            <p className="text-xs font-medium text-neutral-800">{product.name}</p>
                            <p className="text-[10px] text-neutral-500 mt-1">{product.supplier}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-100">
                          <div>
                            <p className="text-sm font-bold text-neutral-800">{product.price}</p>
                            <p className={`text-[10px] ${product.stock === "En stock" ? "text-neutral-600" : "text-neutral-500"}`}>{product.stock}</p>
                          </div>
                          <button className="px-3 py-1.5 bg-[#1e293b] text-white text-[10px] rounded">Ajouter</button>
                        </div>
                      </div>
                    ))}
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
              {["React / Next.js", "Node.js", "Elasticsearch", "PostgreSQL", "SAP Integration", "Stripe Connect"].map((tech) => (
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

      {/* Detailed Mockups - Product & Quote */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Fiche produit & Devis" : "Product & Quote"}
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Product Detail */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /></div>
                  <span className="text-[10px] text-white/30">{locale === "fr" ? "Fiche produit" : "Product Detail"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-3 h-3 text-white/30" />
                  <Share2 className="w-3 h-3 text-white/30" />
                </div>
              </div>
              <div className="aspect-[4/3] bg-white p-4 overflow-hidden">
                <div className="flex gap-4">
                  <div className="w-32 flex-shrink-0">
                    <div className="aspect-square bg-neutral-100 rounded-lg flex items-center justify-center mb-2">
                      <Box className="w-12 h-12 text-neutral-300" />
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {[1,2,3].map((i)=>(<div key={i} className="aspect-square bg-neutral-50 rounded border border-neutral-200" />))}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] text-neutral-400">SKF 6205-2RS</span>
                      <span className="px-1.5 py-0.5 bg-neutral-100 text-neutral-700 text-[8px] rounded">En stock</span>
                    </div>
                    <h3 className="text-sm font-medium text-neutral-800 mb-2">Roulement à billes étanche SKF</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-0.5">{[1,2,3,4,5].map((i)=>(<Star key={i} className={`w-3 h-3 ${i<=4 ? 'text-neutral-600 fill-neutral-600' : 'text-neutral-200'}`} />))}</div>
                      <span className="text-[10px] text-neutral-500">(127 avis)</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3 text-[10px]">
                      {[
                        { label: "Diamètre int.", value: "25 mm" },
                        { label: "Diamètre ext.", value: "52 mm" },
                        { label: "Largeur", value: "15 mm" },
                        { label: "Charge max", value: "14.8 kN" },
                      ].map((spec)=>(
                        <div key={spec.label} className="flex justify-between p-1.5 bg-neutral-50 rounded">
                          <span className="text-neutral-500">{spec.label}</span>
                          <span className="text-neutral-800 font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-end justify-between pt-3 border-t border-neutral-100">
                      <div>
                        <p className="text-[10px] text-neutral-400">Prix unitaire HT</p>
                        <p className="text-xl font-bold text-neutral-800">€12.50</p>
                        <p className="text-[10px] text-neutral-500">-15% à partir de 100 pcs</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-neutral-200 rounded">
                          <button className="p-1.5"><Minus className="w-3 h-3 text-neutral-400" /></button>
                          <span className="px-3 text-xs">10</span>
                          <button className="p-1.5"><Plus className="w-3 h-3 text-neutral-400" /></button>
                        </div>
                        <button className="px-4 py-2 bg-[#1e293b] text-white text-[10px] font-medium rounded flex items-center gap-1">
                          <ShoppingCart className="w-3 h-3" /> Ajouter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quote Request */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /></div>
                  <span className="text-[10px] text-white/30">{locale === "fr" ? "Demande de devis" : "Quote Request"}</span>
                </div>
                <Download className="w-3 h-3 text-white/30" />
              </div>
              <div className="aspect-[4/3] bg-white p-4 overflow-hidden">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-800">Devis #DV-2024-0847</h3>
                    <p className="text-[10px] text-neutral-500">Créé le 15/01/2024 • Expire le 30/01/2024</p>
                  </div>
                  <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-[10px] rounded">En attente</span>
                </div>
                
                <div className="space-y-2 mb-4">
                  {[
                    { ref: "SKF 6205-2RS", name: "Roulement étanche", qty: 50, price: "€10.50", total: "€525.00" },
                    { ref: "SKF 6206-2Z", name: "Roulement blindé", qty: 25, price: "€14.80", total: "€370.00" },
                    { ref: "NTN 6207", name: "Roulement standard", qty: 100, price: "€8.90", total: "€890.00" },
                  ].map((item,i)=>(
                    <div key={i} className="flex items-center gap-3 p-2 bg-neutral-50 rounded">
                      <div className="w-8 h-8 bg-white rounded border border-neutral-200 flex items-center justify-center">
                        <Package className="w-4 h-4 text-neutral-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-medium text-neutral-800 truncate">{item.name}</p>
                        <p className="text-[8px] text-neutral-400">{item.ref} × {item.qty}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-medium text-neutral-800">{item.total}</p>
                        <p className="text-[8px] text-neutral-400">{item.price}/u</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-neutral-50 rounded p-3 mb-3">
                  <div className="flex justify-between text-[10px] mb-1"><span className="text-neutral-500">Sous-total HT</span><span className="text-neutral-800">€1,785.00</span></div>
                  <div className="flex justify-between text-[10px] mb-1"><span className="text-neutral-500">Livraison</span><span className="text-neutral-800">€45.00</span></div>
                  <div className="flex justify-between text-xs font-medium pt-2 border-t border-neutral-200"><span className="text-neutral-800">Total HT</span><span className="text-neutral-800">€1,830.00</span></div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 py-2 border border-neutral-300 text-neutral-600 text-[10px] rounded">Modifier</button>
                  <button className="flex-1 py-2 bg-[#1e293b] text-white text-[10px] font-medium rounded flex items-center justify-center gap-1">
                    <Check className="w-3 h-3" /> Accepter le devis
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* More Screens - Order & Dashboard */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Commandes & Tableau de bord" : "Orders & Dashboard"}
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Tracking */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center gap-4 px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /></div>
                <span className="text-[10px] text-white/30">{locale === "fr" ? "Suivi commande" : "Order Tracking"}</span>
              </div>
              <div className="aspect-[4/3] bg-white p-4 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-800">Commande #CMD-2024-1247</h3>
                    <p className="text-[10px] text-neutral-500">3 articles • €1,830.00 HT</p>
                  </div>
                  <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-[10px] rounded flex items-center gap-1">
                    <Truck className="w-3 h-3" /> En transit
                  </span>
                </div>
                
                <div className="relative pl-4 border-l-2 border-neutral-200 space-y-4 mb-4">
                  {[
                    { status: "done", title: "Commande confirmée", date: "15/01 - 10:32", icon: CheckCircle },
                    { status: "done", title: "En préparation", date: "15/01 - 14:20", icon: Box },
                    { status: "current", title: "Expédié", date: "16/01 - 09:00", icon: Truck },
                    { status: "pending", title: "Livraison prévue", date: "18/01", icon: MapPin },
                  ].map((step, i) => (
                    <div key={i} className="relative">
                      <div className={`absolute -left-[21px] w-4 h-4 rounded-full flex items-center justify-center ${step.status === 'done' ? 'bg-neutral-800' : step.status === 'current' ? 'bg-neutral-600' : 'bg-neutral-200'}`}>
                        <step.icon className={`w-2.5 h-2.5 ${step.status !== 'pending' ? 'text-white' : 'text-neutral-400'}`} />
                      </div>
                      <div className="ml-2">
                        <p className={`text-[10px] font-medium ${step.status === 'pending' ? 'text-neutral-400' : 'text-neutral-800'}`}>{step.title}</p>
                        <p className="text-[8px] text-neutral-400">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-neutral-50 border border-neutral-200 rounded p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-neutral-600" />
                      <div>
                        <p className="text-[10px] font-medium text-neutral-700">Chronopost Express</p>
                        <p className="text-[8px] text-neutral-500">N° suivi: 7X42891234FR</p>
                      </div>
                    </div>
                    <button className="text-[10px] text-neutral-700 font-medium">Suivre →</button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Buyer Dashboard */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <div className="flex items-center gap-4 px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /><div className="w-2 h-2 rounded-full bg-white/20" /></div>
                <span className="text-[10px] text-white/30">{locale === "fr" ? "Tableau de bord acheteur" : "Buyer Dashboard"}</span>
              </div>
              <div className="aspect-[4/3] bg-[#f8fafc] p-4 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1e293b] rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-neutral-800">TechCorp Industries</h3>
                      <p className="text-[10px] text-neutral-500">Compte Pro • Niveau Gold</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-neutral-100 text-[8px] text-neutral-600 rounded">GOLD</span>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { icon: ShoppingCart, label: "Commandes", value: "47", trend: "+12%" },
                    { icon: FileText, label: "Devis", value: "8", trend: "3 en attente" },
                    { icon: TrendingUp, label: "Ce mois", value: "€24.5K", trend: "+18%" },
                  ].map((stat)=>(
                    <div key={stat.label} className="bg-white p-3 rounded-lg border border-neutral-200">
                      <stat.icon className="w-4 h-4 text-[#1e293b] mb-2" />
                      <p className="text-lg font-bold text-neutral-800">{stat.value}</p>
                      <p className="text-[8px] text-neutral-500">{stat.label}</p>
                      <p className="text-[8px] text-neutral-500">{stat.trend}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white rounded-lg border border-neutral-200 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-medium text-neutral-700">Commandes récentes</span>
                    <span className="text-[10px] text-[#1e293b]">Voir tout</span>
                  </div>
                  {[
                    { id: "#1247", status: "En transit", amount: "€1,830", date: "16/01" },
                    { id: "#1245", status: "Livré", amount: "€892", date: "12/01" },
                  ].map((order,i)=>(
                    <div key={i} className="flex items-center justify-between py-2 border-t border-neutral-100">
                      <span className="text-[10px] text-neutral-600">{order.id}</span>
                      <span className={`text-[8px] px-1.5 py-0.5 rounded ${order.status === 'Livré' ? 'bg-neutral-200 text-neutral-700' : 'bg-neutral-100 text-neutral-600'}`}>{order.status}</span>
                      <span className="text-[10px] font-medium text-neutral-800">{order.amount}</span>
                      <span className="text-[8px] text-neutral-400">{order.date}</span>
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
