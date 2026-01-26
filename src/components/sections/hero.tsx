"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Bot, Clock, Shield, Headphones, Sparkles } from "lucide-react";
import { useLocale } from "@/contexts";
import { useRef, useCallback, useState } from "react";

interface Trail {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

const statsData = {
  fr: [
    { value: "1500+", label: "Agents IA Actifs", desc: "Orchestration automatisée", icon: Bot },
    { value: "24h", label: "Temps de réponse", desc: "Audit gratuit inclus", icon: Clock },
    { value: "E2E", label: "Sécurité intégrée", desc: "Pentest & audit code", icon: Shield },
    { value: "360°", label: "Accompagnement", desc: "Dev, juridique, compta", icon: Headphones },
  ],
  en: [
    { value: "1500+", label: "Active AI Agents", desc: "Automated orchestration", icon: Bot },
    { value: "24h", label: "Response time", desc: "Free audit included", icon: Clock },
    { value: "E2E", label: "Integrated security", desc: "Pentest & code audit", icon: Shield },
    { value: "360°", label: "Support", desc: "Dev, legal, accounting", icon: Headphones },
  ],
};

export function HeroSection() {
  const { t, locale } = useLocale();
  const stats = statsData[locale];
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [trails, setTrails] = useState<Trail[]>([]);
  const trailIdRef = useRef(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      const newTrail: Trail = {
        id: trailIdRef.current++,
        x,
        y,
        opacity: 1,
      };
      setTrails(prev => [...prev.slice(-8), newTrail]);
      setTimeout(() => {
        setTrails(prev => prev.filter(t => t.id !== newTrail.id));
      }, 600);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-black">
      {/* Lueur subtile */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/[0.08] via-white/[0.03] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-[10%] right-[10%] h-24 bg-gradient-to-t from-white/[0.12] via-white/[0.04] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-[25%] right-[25%] h-16 bg-gradient-to-t from-white/[0.15] to-transparent pointer-events-none" />
      
      {/* Cadre Hero */}
      <div className="absolute inset-8 border-2 border-white/15 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-16 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Colonne gauche - Contenu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            {/* Badge mobile uniquement */}
            <div className="flex items-center justify-center lg:hidden gap-2 mb-6">
              <div className="flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-white/[0.02]">
                <Sparkles className="w-3 h-3 text-white/60" />
                <span className="text-[10px] font-medium text-white/60 uppercase tracking-[0.15em]">
                  {locale === "fr" ? "Technologie propriétaire" : "Proprietary Technology"}
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-light tracking-tight leading-[1.1] mb-4">
              <span className="text-white">{t("hero.title1")}</span>
              <br />
              <span className="text-white/90">{t("hero.title2")}</span>
              <br />
              <span className="font-normal text-white">{t("hero.title3")}</span>
            </h1>

            <p className="text-sm text-white/80 max-w-md leading-relaxed mb-6 mx-auto lg:mx-0">
              {t("hero.subtitle1")}
            </p>

            <div className="flex flex-wrap gap-3 mb-6 justify-center lg:justify-start">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-6 py-3 bg-white text-black text-sm font-medium transition-colors hover:bg-white/90"
              >
                {t("hero.cta1")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/projets"
                className="group inline-flex items-center gap-3 px-6 py-3 border border-white/20 text-white/70 text-sm font-medium transition-colors hover:border-white/40 hover:text-white"
              >
                {t("hero.cta2")}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats compactes - 2x2 sur mobile, plus épuré */}
            <div className="grid grid-cols-2 gap-2 lg:gap-3 max-w-sm mx-auto lg:max-w-none lg:mx-0">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center lg:items-start gap-2 lg:gap-3 p-2 lg:p-3 border border-white/[0.08] bg-white/[0.02]">
                  <stat.icon className="w-4 h-4 text-white/40 flex-shrink-0" />
                  <div className="text-left">
                    <div className="flex items-baseline gap-1 lg:gap-2">
                      <span className="text-base lg:text-lg font-medium text-white">{stat.value}</span>
                      <span className="text-[9px] lg:text-[10px] text-white/50 uppercase tracking-wider hidden sm:inline">{stat.label}</span>
                    </div>
                    <p className="text-[9px] lg:text-[10px] text-white/40 hidden sm:block">{stat.desc}</p>
                    <span className="text-[9px] text-white/50 uppercase tracking-wider sm:hidden">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Colonne droite - Image avec lueur pulsante (Desktop uniquement) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative hidden lg:block"
          >
            {/* Badge professionnel - aligné à droite */}
            <div className="flex items-center justify-end gap-2 mb-4">
              <div className="flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-white/[0.02]">
                <Sparkles className="w-3 h-3 text-white/60" />
                <span className="text-[10px] font-medium text-white/60 uppercase tracking-[0.15em]">
                  {locale === "fr" ? "Technologie propriétaire" : "Proprietary Technology"}
                </span>
              </div>
            </div>
            
            {/* Container image avec lueur pulsante */}
            <div 
              ref={imageContainerRef}
              onMouseMove={handleMouseMove}
              className="relative select-none"
              style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
            >
              {/* Lueur pulsante fixe - cycle illumination/disparition - PLUS INTENSE */}
              <div 
                className="absolute -inset-16 pointer-events-none z-10 animate-glow-pulse"
                style={{
                  background: 'radial-gradient(ellipse 50% 55% at 50% 50%, rgba(255,255,255,0.25), rgba(255,255,255,0.08) 50%, transparent 80%)',
                  filter: 'blur(50px)',
                }}
              />

              {/* Traces étoiles filantes au passage de la souris - très fines */}
              {trails.map((trail) => (
                <div
                  key={trail.id}
                  className="absolute pointer-events-none z-20 animate-trail-fade"
                  style={{
                    left: trail.x - 8,
                    top: trail.y - 8,
                    width: 16,
                    height: 16,
                    background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 40%, transparent 70%)',
                    filter: 'blur(3px)',
                  }}
                />
              ))}

              {/* Image Hero */}
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/hero-fluxdev.webp"
                  alt="FluxDev - Studio de développement IA"
                  fill
                  priority
                  className="object-contain pointer-events-none"
                  sizes="50vw"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
                
                {/* Fondu sur les bords pour intégration seamless - plus large */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black via-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black via-black/80 to-transparent" />
                  <div className="absolute top-0 bottom-0 left-0 w-28 bg-gradient-to-r from-black via-black/80 to-transparent" />
                  <div className="absolute top-0 bottom-0 right-0 w-28 bg-gradient-to-l from-black via-black/80 to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
