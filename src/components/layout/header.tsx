"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ArrowUpRight, User, LayoutDashboard } from "lucide-react";
import { useLocale } from "@/contexts";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLocale = () => {
    setLocale(locale === "fr" ? "en" : "fr");
  };

  const navLinks = [
    { href: "/projets", label: t("nav.projects") },
    { href: "/equipe", label: t("nav.team") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass"
            : "bg-transparent"
        }`}
      >
        {/* Cadre fin blanc luxueux */}
        <div className="mx-4 lg:mx-8 mt-4 border border-white/20 bg-black/20 backdrop-blur-sm">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between h-14">
            <Link href="/" className="relative group">
              <motion.div
                className="flex items-center gap-4"
              >
                <div className="w-8 h-8 bg-white flex items-center justify-center">
                  <span className="text-black font-bold text-sm">F</span>
                </div>
                <span className="text-lg font-semibold tracking-tight text-white">FluxDev</span>
              </motion.div>
            </Link>

            <nav className="hidden lg:flex items-center">
              <div className="flex items-center border border-white/20 divide-x divide-white/15">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-6 py-2 text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <span className="relative z-10 uppercase tracking-[0.15em] text-xs font-medium">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </nav>

            <div className="hidden lg:flex items-center gap-6">
              <button
                onClick={toggleLocale}
                className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors duration-300 uppercase tracking-[0.2em]"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="font-medium">{locale}</span>
              </button>

              <div className="w-px h-6 bg-white/10" />

              <SignedOut>
                <Link
                  href="/connexion"
                  className="flex items-center gap-2 px-4 py-2 text-xs text-white/60 hover:text-white transition-colors uppercase tracking-[0.1em] border border-white/10 hover:border-white/20"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Connexion</span>
                </Link>
              </SignedOut>

              <SignedIn>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-xs text-white/60 hover:text-white transition-colors uppercase tracking-[0.1em] border border-white/10 hover:border-white/20"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 border border-white/20",
                    },
                  }}
                />
              </SignedIn>

              <Link
                href="/contact"
                className="group flex items-center gap-2 px-5 py-2 bg-white text-black text-xs uppercase tracking-[0.1em] font-semibold transition-colors duration-200 hover:bg-white/90"
              >
                <span>{t("nav.bookCall")}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center border border-white/10 text-white/70 hover:text-white transition-colors duration-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-black border-l border-white/[0.06]"
            >
              <div className="flex items-center justify-between p-8 border-b border-white/[0.06]">
                <span className="text-xs uppercase tracking-[0.3em] text-white/40">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-12 h-12 flex items-center justify-center border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="p-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                    className="border-b border-white/[0.06]"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between py-6 text-2xl text-white/80 hover:text-white transition-colors group"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-white/[0.06] space-y-4">
                <button
                  onClick={toggleLocale}
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 text-xs text-white/50 hover:text-white transition-colors uppercase tracking-[0.2em] border border-white/[0.06] hover:border-white/10"
                >
                  <Globe className="w-4 h-4" />
                  <span>{locale === "fr" ? "English" : "Français"}</span>
                </button>

                <SignedOut>
                  <Link
                    href="/connexion"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-3 w-full px-6 py-4 text-xs text-white/70 hover:text-white transition-colors uppercase tracking-[0.15em] border border-white/[0.06] hover:border-white/10"
                  >
                    <User className="w-4 h-4" />
                    <span>Connexion</span>
                  </Link>
                </SignedOut>

                <SignedIn>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-3 w-full px-6 py-4 text-xs text-white/70 hover:text-white transition-colors uppercase tracking-[0.15em] border border-white/[0.06] hover:border-white/10"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                </SignedIn>

                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-white text-black text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[#ECF8F6] transition-colors"
                >
                  <span>{t("nav.bookCall")}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
