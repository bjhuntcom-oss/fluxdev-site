"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/contexts";

export function ContactSection() {
  const { t } = useLocale();
  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Cadre Contact - bordure gradient */}
      <div className="absolute inset-8 border border-white/15 pointer-events-none" style={{
        borderImage: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.25) 100%) 1'
      }} />
      
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[11px] font-medium text-white/70 uppercase tracking-[0.2em]">
              {t("contact.label")}
            </span>
            <h2 className="text-4xl lg:text-5xl font-light text-white mt-2 mb-4">
              {t("contact.title")}
            </h2>
            <p className="text-sm text-white/80 leading-relaxed max-w-sm mb-4">
              {t("contact.subtitle")}
            </p>
            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              {t("contact.clients")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <Link
              href="/contact"
              className="group flex items-center justify-between p-5 bg-white text-black transition-colors hover:bg-white/90"
            >
              <div>
                <span className="text-sm font-medium block">{t("contact.cta1")}</span>
                <span className="text-xs text-black/50">{t("contact.cta1.sub")}</span>
              </div>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="mailto:contact@fluxdev.io"
              className="group flex items-center justify-between p-5 border border-white/10 text-white transition-colors hover:border-white/20"
            >
              <div>
                <span className="text-sm font-medium block">contact@fluxdev.io</span>
                <span className="text-xs text-white/40">{t("contact.cta2.sub")}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-white/40 transition-transform group-hover:translate-x-1" />
            </a>

            <div className="flex gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500" />
                <span className="text-[10px] text-white/50 uppercase">{t("contact.online")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-white/20" />
                <span className="text-[10px] text-white/50 uppercase">{t("contact.noCommitment")}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
