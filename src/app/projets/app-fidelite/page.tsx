"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Gift, CreditCard, QrCode, Tag, Bell, Star, Wallet, Clock, MapPin, ChevronRight, Check, Percent, ShoppingBag, History, TrendingUp, Award, Heart, Share2, Copy, Sparkles, Calendar, Store, Ticket, Zap } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/contexts";

const content = {
  fr: {
    back: "Retour aux projets",
    category: "Application Mobile",
    title: "App Fidélité Retail",
    subtitle: "Programme de fidélité omnicanal avec wallet digital, offres personnalisées et paiement sans contact.",
    client: "Chaîne de magasins",
    year: "2023",
    duration: "4 mois",
    tags: ["iOS", "Android", "NFC", "Wallet"],
    overview: "Présentation",
    overviewText: "Développement d'une application de fidélité pour une chaîne de magasins nationale. L'app offre une expérience omnicanale avec wallet digital, offres personnalisées basées sur l'historique d'achat et paiement NFC intégré pour une expérience client fluide.",
    features: "Fonctionnalités clés",
    featuresList: [
      { icon: CreditCard, title: "Wallet digital", desc: "Carte de fidélité dématérialisée" },
      { icon: Gift, title: "Offres personnalisées", desc: "Recommandations IA basées sur achats" },
      { icon: QrCode, title: "Scan & Pay", desc: "Paiement et fidélité en un scan" },
      { icon: Tag, title: "Coupons", desc: "Bons de réduction géolocalisés" },
      { icon: Bell, title: "Notifications", desc: "Alertes promos en temps réel" },
      { icon: Star, title: "Niveaux VIP", desc: "Programme de statuts et avantages" },
    ],
    results: "Résultats",
    resultsList: [
      { value: "1.2M", label: "Téléchargements" },
      { value: "+28%", label: "Panier moyen" },
      { value: "72%", label: "Taux d'utilisation" },
      { value: "4.8", label: "Note stores" },
    ],
  },
  en: {
    back: "Back to projects",
    category: "Mobile Application",
    title: "Retail Loyalty App",
    subtitle: "Omnichannel loyalty program with digital wallet, personalized offers and contactless payment.",
    client: "Retail chain",
    year: "2023",
    duration: "4 months",
    tags: ["iOS", "Android", "NFC", "Wallet"],
    overview: "Overview",
    overviewText: "Development of a loyalty application for a national retail chain. The app offers an omnichannel experience with digital wallet, personalized offers based on purchase history and integrated NFC payment for a seamless customer experience.",
    features: "Key Features",
    featuresList: [
      { icon: CreditCard, title: "Digital wallet", desc: "Dematerialized loyalty card" },
      { icon: Gift, title: "Personalized offers", desc: "AI recommendations based on purchases" },
      { icon: QrCode, title: "Scan & Pay", desc: "Payment and loyalty in one scan" },
      { icon: Tag, title: "Coupons", desc: "Geolocated discount vouchers" },
      { icon: Bell, title: "Notifications", desc: "Real-time promo alerts" },
      { icon: Star, title: "VIP Levels", desc: "Status program and benefits" },
    ],
    results: "Results",
    resultsList: [
      { value: "1.2M", label: "Downloads" },
      { value: "+28%", label: "Average basket" },
      { value: "72%", label: "Usage rate" },
      { value: "4.8", label: "Store rating" },
    ],
  },
};

export default function AppFidelitePage() {
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
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex justify-center items-end gap-4 lg:gap-8">
            {/* Phone 1 - Wallet */}
            <div className="relative w-[160px] lg:w-[220px] transform -rotate-6 translate-y-8">
              <div className="bg-[#1a1a1a] rounded-[24px] lg:rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-gradient-to-br from-orange-500 to-rose-500 rounded-[20px] lg:rounded-[28px] overflow-hidden">
                  <div className="px-4 py-3">
                    <p className="text-[10px] text-white/70">Ma carte</p>
                    <p className="text-xs font-medium text-white">SHOPPLUS</p>
                  </div>
                  <div className="px-4 pb-4">
                    <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="text-[10px] text-white/70">Mes points</p>
                          <p className="text-2xl font-bold text-white">2,450</p>
                        </div>
                        <div className="px-2 py-1 bg-white/20 rounded text-[10px] text-white">Gold ⭐</div>
                      </div>
                      <div className="flex justify-center">
                        <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center">
                          <QrCode className="w-16 h-16 text-neutral-800" />
                        </div>
                      </div>
                      <p className="text-[10px] text-white/70 text-center mt-3">Scanner en caisse</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone 2 - Home (Center) */}
            <div className="relative w-[200px] lg:w-[280px] z-10">
              <div className="bg-[#1a1a1a] rounded-[28px] lg:rounded-[40px] p-2 lg:p-3 shadow-2xl border border-white/20">
                <div className="bg-white rounded-[24px] lg:rounded-[36px] overflow-hidden">
                  <div className="flex justify-center pt-2"><div className="w-20 lg:w-28 h-5 lg:h-7 bg-black rounded-full" /></div>
                  <div className="px-5 pb-6 pt-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-[10px] text-neutral-500">Bonjour,</p>
                        <p className="text-sm font-medium text-neutral-800">Marie</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Bell className="w-5 h-5 text-neutral-400" />
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full text-[8px] text-white flex items-center justify-center">3</div>
                        </div>
                      </div>
                    </div>

                    {/* Points card */}
                    <div className="bg-gradient-to-r from-orange-500 to-rose-500 rounded-2xl p-4 mb-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[10px] text-white/80">Mes points</p>
                          <p className="text-2xl font-bold text-white">2,450</p>
                          <p className="text-[10px] text-white/70 mt-1">= 24,50€ d&apos;achats</p>
                        </div>
                        <div className="text-right">
                          <div className="px-2 py-1 bg-white/20 rounded text-[10px] text-white inline-block">Gold ⭐</div>
                          <p className="text-[10px] text-white/70 mt-2">550 pts → Platinum</p>
                        </div>
                      </div>
                    </div>

                    {/* Offers */}
                    <div className="mb-4">
                      <p className="text-xs font-medium text-neutral-800 mb-3">Offres pour vous</p>
                      <div className="space-y-2">
                        {[
                          { title: "-20% Mode", desc: "Valable jusqu'au 31 jan", color: "bg-rose-100 text-rose-700" },
                          { title: "2+1 gratuit", desc: "Rayon beauté", color: "bg-purple-100 text-purple-700" },
                        ].map((offer) => (
                          <div key={offer.title} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
                            <div className={`w-10 h-10 ${offer.color} rounded-lg flex items-center justify-center`}>
                              <Gift className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-medium text-neutral-800">{offer.title}</p>
                              <p className="text-[10px] text-neutral-500">{offer.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick actions */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { icon: QrCode, label: "Scanner" },
                        { icon: Tag, label: "Coupons" },
                        { icon: Star, label: "Avantages" },
                      ].map((action) => (
                        <div key={action.label} className="text-center p-3 bg-neutral-50 rounded-xl">
                          <action.icon className="w-5 h-5 mx-auto text-orange-500" />
                          <p className="text-[10px] text-neutral-600 mt-1">{action.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Bottom nav */}
                  <div className="flex justify-around py-3 border-t border-neutral-100">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className={`w-5 h-5 rounded-full ${i === 0 ? "bg-orange-500" : "bg-neutral-200"}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Phone 3 - Scan */}
            <div className="relative w-[160px] lg:w-[220px] transform rotate-6 translate-y-8">
              <div className="bg-[#1a1a1a] rounded-[24px] lg:rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-neutral-900 rounded-[20px] lg:rounded-[28px] overflow-hidden">
                  <div className="px-4 py-3 text-center">
                    <p className="text-xs font-medium text-white">Scanner un produit</p>
                  </div>
                  <div className="px-4 pb-4">
                    <div className="aspect-square bg-neutral-800 rounded-xl flex items-center justify-center relative overflow-hidden">
                      {/* Scanner frame */}
                      <div className="absolute inset-4 border-2 border-orange-500/50 rounded-lg">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-orange-500" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-orange-500" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-orange-500" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-orange-500" />
                      </div>
                      {/* Scan line */}
                      <div className="absolute left-4 right-4 h-0.5 bg-orange-500 animate-pulse" />
                      <QrCode className="w-12 h-12 text-white/20" />
                    </div>
                    <p className="text-[10px] text-white/50 text-center mt-3">Placez le code-barres dans le cadre</p>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 py-2 bg-white/10 text-white text-[10px] rounded-lg">Flash</button>
                      <button className="flex-1 py-2 bg-white/10 text-white text-[10px] rounded-lg">Galerie</button>
                    </div>
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
              {["React Native", "TypeScript", "NFC APIs", "Firebase", "Braze", "Stripe"].map((tech) => (
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

      {/* Detailed Screens - Offers & History */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Offres & Historique" : "Offers & History"}
            </span>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Offers List */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-white rounded-[28px] overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500 to-rose-500 px-4 py-3">
                    <p className="text-xs font-medium text-white">Mes offres</p>
                    <p className="text-[10px] text-white/70">5 disponibles</p>
                  </div>
                  <div className="p-3 space-y-2">
                    {[
                      { title: "-20% Mode", exp: "31 jan", color: "bg-rose-500" },
                      { title: "2+1 Beauté", exp: "15 fév", color: "bg-purple-500" },
                      { title: "-5€ dès 30€", exp: "28 fév", color: "bg-orange-500" },
                    ].map((offer,i)=>(
                      <div key={i} className="flex items-center gap-3 p-2.5 bg-neutral-50 rounded-xl">
                        <div className={`w-10 h-10 ${offer.color} rounded-lg flex items-center justify-center`}>
                          <Percent className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] font-medium text-neutral-800">{offer.title}</p>
                          <p className="text-[8px] text-neutral-400">Expire le {offer.exp}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Mes offres</p>
            </motion.div>

            {/* Purchase History */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-white rounded-[28px] overflow-hidden">
                  <div className="px-4 py-3 border-b border-neutral-100">
                    <p className="text-xs font-medium text-neutral-800">Historique</p>
                  </div>
                  <div className="p-3 space-y-2">
                    {[
                      { store: "Shop Paris 9e", date: "Aujourd'hui", amount: "45,90€", points: "+92" },
                      { store: "Shop Lyon", date: "12 jan", amount: "128,50€", points: "+257" },
                      { store: "Shop Paris 11e", date: "8 jan", amount: "32,00€", points: "+64" },
                    ].map((item,i)=>(
                      <div key={i} className="flex items-center gap-3 p-2 bg-neutral-50 rounded-lg">
                        <div className="w-8 h-8 bg-neutral-200 rounded-lg flex items-center justify-center">
                          <Store className="w-4 h-4 text-neutral-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] font-medium text-neutral-800">{item.store}</p>
                          <p className="text-[8px] text-neutral-400">{item.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-medium text-neutral-800">{item.amount}</p>
                          <p className="text-[8px] text-orange-500">{item.points} pts</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Historique</p>
            </motion.div>

            {/* VIP Status */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-[28px] overflow-hidden">
                  <div className="px-4 py-3 text-center">
                    <Award className="w-8 h-8 text-white mx-auto mb-1" />
                    <p className="text-sm font-bold text-white">Statut Gold</p>
                    <p className="text-[10px] text-white/70">Depuis le 15/06/2023</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur mx-3 mb-3 rounded-xl p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] text-white/80">Progression</span>
                      <span className="text-[10px] text-white font-medium">2,450 / 3,000</span>
                    </div>
                    <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-white rounded-full" />
                    </div>
                    <p className="text-[10px] text-white/70 mt-2 text-center">550 pts → Platinum ✨</p>
                  </div>
                  <div className="px-3 pb-3">
                    <p className="text-[10px] text-white/80 mb-2">Vos avantages Gold</p>
                    {["-10% permanent", "Livraison offerte", "Ventes privées"].map((benefit,i)=>(
                      <div key={i} className="flex items-center gap-2 text-[10px] text-white/90 mb-1">
                        <Check className="w-3 h-3" /> {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Statut VIP</p>
            </motion.div>

            {/* Coupon Detail */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-white rounded-[28px] overflow-hidden">
                  <div className="bg-rose-500 px-4 py-4 text-center relative">
                    <div className="absolute left-0 top-1/2 w-4 h-8 bg-[#1a1a1a] rounded-r-full -translate-y-1/2" />
                    <div className="absolute right-0 top-1/2 w-4 h-8 bg-[#1a1a1a] rounded-l-full -translate-y-1/2" />
                    <p className="text-3xl font-bold text-white">-20%</p>
                    <p className="text-[10px] text-white/80">Sur tout le rayon Mode</p>
                  </div>
                  <div className="p-4">
                    <div className="border-2 border-dashed border-neutral-200 rounded-lg p-3 text-center mb-3">
                      <p className="text-[10px] text-neutral-400 mb-1">Code promo</p>
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-lg font-bold text-neutral-800 tracking-wider">MODE20</p>
                        <Copy className="w-4 h-4 text-neutral-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-neutral-500 mb-3">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Expire le 31/01</span>
                      <span className="flex items-center gap-1"><Store className="w-3 h-3" /> En magasin</span>
                    </div>
                    <button className="w-full py-2.5 bg-rose-500 text-white text-[10px] font-medium rounded-lg">Utiliser maintenant</button>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Coupon détail</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* More Screens - Rewards & Stores */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em]">
              {locale === "fr" ? "Récompenses & Magasins" : "Rewards & Stores"}
            </span>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Rewards Catalog */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-white rounded-[28px] overflow-hidden">
                  <div className="px-4 py-3 border-b border-neutral-100">
                    <p className="text-xs font-medium text-neutral-800">Catalogue récompenses</p>
                    <p className="text-[10px] text-orange-500">2,450 pts disponibles</p>
                  </div>
                  <div className="p-3 space-y-2">
                    {[
                      { name: "Bon 10€", points: "1,000", icon: Ticket },
                      { name: "Sac shopping", points: "2,500", icon: ShoppingBag },
                      { name: "Box surprise", points: "5,000", icon: Gift },
                    ].map((reward,i)=>(
                      <div key={i} className="flex items-center gap-3 p-2 bg-neutral-50 rounded-lg">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <reward.icon className="w-5 h-5 text-orange-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] font-medium text-neutral-800">{reward.name}</p>
                          <p className="text-[10px] text-orange-500">{reward.points} pts</p>
                        </div>
                        <button className="px-2 py-1 bg-orange-500 text-white text-[8px] rounded">Échanger</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Récompenses</p>
            </motion.div>

            {/* Store Locator */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-white rounded-[28px] overflow-hidden">
                  <div className="px-4 py-2 flex items-center gap-2 border-b border-neutral-100">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="text-[10px] text-neutral-600">Paris, France</span>
                  </div>
                  <div className="h-24 bg-neutral-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] text-neutral-400">Carte</span>
                    </div>
                    {[{x:30,y:40},{x:60,y:30},{x:45,y:60}].map((pos,i)=>(
                      <div key={i} className="absolute w-4 h-4 bg-orange-500 rounded-full border-2 border-white" style={{left:`${pos.x}%`,top:`${pos.y}%`}} />
                    ))}
                  </div>
                  <div className="p-3 space-y-2">
                    {[
                      { name: "Shop Paris 9e", dist: "0.5 km", hours: "Ouvert" },
                      { name: "Shop Paris 11e", dist: "1.2 km", hours: "Ouvert" },
                    ].map((store,i)=>(
                      <div key={i} className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg">
                        <Store className="w-4 h-4 text-neutral-400" />
                        <div className="flex-1">
                          <p className="text-[10px] font-medium text-neutral-800">{store.name}</p>
                          <p className="text-[8px] text-neutral-400">{store.dist}</p>
                        </div>
                        <span className="text-[8px] text-green-500">{store.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Magasins</p>
            </motion.div>

            {/* Notifications */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-white rounded-[28px] overflow-hidden">
                  <div className="px-4 py-3 border-b border-neutral-100 flex items-center justify-between">
                    <p className="text-xs font-medium text-neutral-800">Notifications</p>
                    <span className="w-5 h-5 bg-orange-500 rounded-full text-[10px] text-white flex items-center justify-center">3</span>
                  </div>
                  <div className="p-3 space-y-2">
                    {[
                      { title: "Nouvelle offre!", desc: "-30% ce weekend", time: "2h", icon: Zap, new: true },
                      { title: "Points expirés", desc: "200 pts expirés", time: "1j", icon: Clock, new: true },
                      { title: "Bienvenue Gold!", desc: "Statut débloqué", time: "3j", icon: Award, new: false },
                    ].map((notif,i)=>(
                      <div key={i} className={`flex items-start gap-2 p-2 rounded-lg ${notif.new ? 'bg-orange-50' : 'bg-neutral-50'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${notif.new ? 'bg-orange-500' : 'bg-neutral-200'}`}>
                          <notif.icon className={`w-4 h-4 ${notif.new ? 'text-white' : 'text-neutral-500'}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] font-medium text-neutral-800">{notif.title}</p>
                          <p className="text-[8px] text-neutral-500">{notif.desc}</p>
                        </div>
                        <span className="text-[8px] text-neutral-400">{notif.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Notifications</p>
            </motion.div>

            {/* Referral */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl border border-white/10">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-[28px] overflow-hidden">
                  <div className="p-4 text-center">
                    <div className="w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-bold text-white mb-1">Parrainez vos amis</p>
                    <p className="text-[10px] text-white/70 mb-4">Gagnez 500 pts par filleul</p>
                    
                    <div className="bg-white/20 backdrop-blur rounded-lg p-3 mb-3">
                      <p className="text-[10px] text-white/70 mb-1">Votre code parrain</p>
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-lg font-bold text-white tracking-wider">MARIE2024</p>
                        <Copy className="w-4 h-4 text-white/70" />
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-white text-purple-600 text-[10px] font-medium rounded-lg">Partager</button>
                      <button className="px-3 py-2 bg-white/20 rounded-lg">
                        <Share2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center mt-3">Parrainage</p>
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
