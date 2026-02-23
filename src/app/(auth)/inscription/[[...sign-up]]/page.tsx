"use client";

import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield, MessageSquare, FileText, Sparkles, Check } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#030303] relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Subtle Gradient Orbs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-[100px]" />

      {/* Back Link */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-8 left-8 z-20"
      >
        <Link 
          href="/" 
          className="group flex items-center gap-3 text-white/40 hover:text-white transition-all duration-300"
        >
          <div className="p-2 rounded-lg border border-white/10 group-hover:border-white/20 group-hover:bg-white/5 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-light tracking-wide">Retour</span>
        </Link>
      </motion.div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left - Branding */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:block space-y-10"
          >
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white flex items-center justify-center">
                <span className="text-black font-bold text-xl">F</span>
              </div>
              <span className="text-2xl font-semibold text-white tracking-tight">FluxDev</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-extralight text-white leading-tight">
                Créez votre
                <br />
                <span className="font-medium">compte client</span>
              </h1>
              <p className="text-white/40 text-lg font-light leading-relaxed max-w-md">
                Rejoignez FluxDev et accédez à un espace dédié pour piloter vos projets digitaux.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-5 pt-4">
              <p className="text-white/50 text-xs uppercase tracking-widest font-light">Inclus dès l&apos;inscription</p>
              
              {[
                { icon: MessageSquare, title: "Chat temps réel", desc: "Échangez directement avec l'équipe" },
                { icon: FileText, title: "Partage de documents", desc: "Envoyez vos fichiers en toute sécurité" },
                { icon: Sparkles, title: "Suivi de projet", desc: "Débloqué après validation admin" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className={`flex items-center gap-4 ${i === 2 ? 'opacity-50' : ''}`}
                >
                  <div className="w-12 h-12 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-white/50" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/80 text-sm font-medium">{feature.title}</p>
                    <p className="text-white/30 text-xs font-light">{feature.desc}</p>
                  </div>
                  {i < 2 && <Check className="w-4 h-4 text-emerald-500/70" />}
                </motion.div>
              ))}
            </div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-3 pt-4"
            >
              <Shield className="w-4 h-4 text-white/30" />
              <span className="text-white/30 text-xs font-light">Données chiffrées et sécurisées</span>
            </motion.div>
          </motion.div>

          {/* Right - Glassmorphism Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Glassmorphism Container */}
            <div className="relative">
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-b from-white/10 via-white/5 to-transparent rounded-2xl blur-xl opacity-50" />
              
              {/* Card */}
              <div className="relative backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 lg:p-10 shadow-2xl">
                {/* Inner subtle border */}
                <div className="absolute inset-[1px] rounded-2xl border border-white/[0.05] pointer-events-none" />
                
                {/* Mobile Logo */}
                <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-white flex items-center justify-center">
                    <span className="text-black font-bold text-lg">F</span>
                  </div>
                  <span className="text-xl font-semibold text-white">FluxDev</span>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-light text-white mb-2">Inscription</h2>
                  <p className="text-white/40 text-sm font-light">
                    Créez votre compte en quelques secondes
                  </p>
                </div>

                {/* Clerk SignUp */}
                <SignUp
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "bg-transparent shadow-none p-0 border-none",
                      header: "hidden",
                      socialButtonsBlockButton: `
                        bg-white/[0.04] border border-white/[0.08] text-white 
                        hover:bg-white/[0.08] hover:border-white/[0.15]
                        transition-all duration-300 rounded-xl h-12
                        backdrop-blur-sm
                      `,
                      socialButtonsBlockButtonText: "text-white/80 font-light text-sm",
                      socialButtonsProviderIcon: "opacity-80",
                      dividerLine: "bg-white/[0.06]",
                      dividerText: "text-white/30 text-xs font-light uppercase tracking-widest",
                      formFieldLabel: "text-white/60 text-xs font-light uppercase tracking-wider mb-2",
                      formFieldInput: `
                        bg-white/[0.03] border border-white/[0.08] text-white 
                        placeholder:text-white/20 
                        focus:border-white/20 focus:bg-white/[0.05] focus:ring-0
                        transition-all duration-300 rounded-xl h-12 px-4
                        backdrop-blur-sm
                      `,
                      formButtonPrimary: `
                        bg-white text-black font-medium
                        hover:bg-white/90 hover:shadow-lg hover:shadow-white/10
                        transition-all duration-300 rounded-xl h-12
                        text-sm uppercase tracking-wider
                      `,
                      footerAction: "justify-center",
                      footerActionText: "text-white/40 text-sm font-light",
                      footerActionLink: "text-white/70 hover:text-white font-normal transition-colors",
                      identityPreview: "bg-white/[0.03] border border-white/[0.08] rounded-xl",
                      identityPreviewText: "text-white",
                      identityPreviewEditButton: "text-white/50 hover:text-white",
                      formFieldInputShowPasswordButton: "text-white/40 hover:text-white/70",
                      formFieldInputShowPasswordIcon: "w-4 h-4",
                      alert: "bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl",
                      alertText: "text-red-400 text-sm",
                      formFieldErrorText: "text-red-400 text-xs mt-1",
                    },
                    layout: {
                      socialButtonsPlacement: "top",
                      socialButtonsVariant: "blockButton",
                    },
                  }}
                  routing="path"
                  path="/inscription"
                  signInUrl="/connexion"
                  fallbackRedirectUrl="/dashboard"
                />

                {/* Bottom decoration */}
                <div className="mt-8 pt-6 border-t border-white/[0.05]">
                  <p className="text-center text-white/20 text-xs font-light">
                    En créant un compte, vous acceptez nos conditions d&apos;utilisation
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-white/20 text-xs font-light tracking-wide">
          © 2026 FluxDev. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
