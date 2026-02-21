"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLocale } from "@/contexts";

export function Footer() {
  const { t, locale } = useLocale();
  
  const localizedServices = [
    { label: locale === "fr" ? "Développement Web" : "Web Development", href: "/services/developpement-web" },
    { label: locale === "fr" ? "Applications Mobile" : "Mobile Applications", href: "/services/applications-mobile" },
    { label: locale === "fr" ? "Solutions SaaS" : "SaaS Solutions", href: "/services/solutions-saas" },
    { label: locale === "fr" ? "Cybersécurité" : "Cybersecurity", href: "/services/cybersecurite" },
    { label: "Design UI/UX", href: "/services/design-ui-ux" },
  ];

  const localizedCompany = [
    { label: t("nav.projects"), href: "/projets" },
    { label: t("nav.team"), href: "/equipe" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  const localizedLegal = [
    { label: locale === "fr" ? "Mentions légales" : "Legal Notice", href: "/mentions-legales" },
    { label: locale === "fr" ? "Confidentialité" : "Privacy Policy", href: "/confidentialite" },
    { label: locale === "fr" ? "CGV" : "Terms of Sale", href: "/cgv" },
  ];
  
  return (
    <footer className="relative bg-black">
      {/* Cadre Footer - sans bordures verticales */}
      <div className="absolute inset-x-8 top-0 bottom-0 border-b-2 border-white/15 pointer-events-none" />
      
      {/* Barre lumineuse intense */}
      <div className="absolute top-0 left-[2%] right-[2%] h-[4px] bg-white shadow-[0_0_30px_8px_rgba(255,255,255,1),0_0_60px_15px_rgba(255,255,255,0.5)]" />
      
      {/* Rayons de lumière carrés - design géométrique */}
      <div className="absolute top-0 left-0 right-0 h-80 pointer-events-none">
        {/* Bloc central lumineux */}
        <div className="absolute top-0 left-[15%] right-[15%] h-72 bg-gradient-to-b from-white/20 via-white/[0.06] to-transparent" />
        {/* Blocs latéraux */}
        <div className="absolute top-0 left-[5%] w-[12%] h-56 bg-gradient-to-b from-white/15 via-white/[0.04] to-transparent" />
        <div className="absolute top-0 right-[5%] w-[12%] h-56 bg-gradient-to-b from-white/15 via-white/[0.04] to-transparent" />
        {/* Blocs intermédiaires */}
        <div className="absolute top-0 left-[30%] w-[8%] h-48 bg-gradient-to-b from-white/10 to-transparent" />
        <div className="absolute top-0 right-[30%] w-[8%] h-48 bg-gradient-to-b from-white/10 to-transparent" />
        {/* Blocs extérieurs */}
        <div className="absolute top-0 left-0 w-[6%] h-32 bg-gradient-to-b from-white/[0.08] to-transparent" />
        <div className="absolute top-0 right-0 w-[6%] h-32 bg-gradient-to-b from-white/[0.08] to-transparent" />
      </div>
      
      {/* Section CTA */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <h3 className="text-3xl lg:text-4xl font-light text-white mb-2">
                {t("footer.cta.title")}
              </h3>
              <p className="text-sm text-white/60">
                {t("footer.cta.subtitle")}
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 px-8 py-4 bg-white text-black text-sm font-medium transition-colors hover:bg-white/90"
            >
              {t("footer.cta.button")}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white flex items-center justify-center">
                <span className="text-black font-bold text-lg">F</span>
              </div>
              <div>
                <span className="text-lg font-medium text-white block">FluxDev</span>
                <span className="text-[10px] text-white/70 uppercase tracking-wider">Studio</span>
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-xs">
              {t("footer.brand.desc")}
            </p>
            
            {/* Stats mini */}
            <div className="flex gap-6">
              <div>
                <div className="text-2xl font-light text-white">1500+</div>
                <div className="text-[10px] text-white/70 uppercase">{t("common.agentsIA")}</div>
              </div>
              <div>
                <div className="text-2xl font-light text-white">50+</div>
                <div className="text-[10px] text-white/70 uppercase">{t("common.projects")}</div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-4">
              {t("footer.services")}
            </h4>
            <ul className="space-y-3">
              {localizedServices.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-4">
              {t("footer.company")}
            </h4>
            <ul className="space-y-3">
              {localizedCompany.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-4">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-3">
              {localizedLegal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-4">
              {t("footer.contact")}
            </h4>
            <div className="space-y-3">
              <a 
                href="mailto:contact@fluxdev.io" 
                className="text-sm text-white/60 hover:text-white transition-colors block"
              >
                contact@fluxdev.io
              </a>
              <div className="text-sm text-white/60">{t("footer.response")}</div>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-2 h-2 bg-green-500 animate-pulse" />
                <span className="text-xs text-white/60">{t("footer.online")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 lg:gap-8 text-xs text-white/70">
              <span>{t("footer.rights")}</span>
              <span className="hidden lg:inline">|</span>
              <span>{t("footer.location")}</span>
            </div>
            
            <div className="flex items-center gap-6">
              <span className="text-xs text-white/70">{t("footer.payments")}</span>
              <div className="flex items-center gap-2">
                {["VISA", "MC", "PP"].map((p) => (
                  <div key={p} className="px-2 py-1 border border-white/10 text-[9px] text-white/60 font-mono">
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
