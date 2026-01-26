"use client";

import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield, Zap, Lock } from "lucide-react";

export default function SignInPage() {
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
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-[100px]" />

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
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
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
                Connectez-vous à
                <br />
                <span className="font-medium">votre espace</span>
              </h1>
              <p className="text-white/40 text-lg font-light leading-relaxed max-w-md">
                Gérez vos projets, échangez avec notre équipe et suivez chaque étape de votre transformation digitale.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-4">
              {[
                { icon: Shield, text: "Connexion sécurisée SSL" },
                { icon: Zap, text: "Accès instantané au dashboard" },
                { icon: Lock, text: "Données chiffrées de bout en bout" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-white/50" />
                  </div>
                  <span className="text-white/50 text-sm font-light">{feature.text}</span>
                </motion.div>
              ))}
            </div>
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
                  <h2 className="text-2xl font-light text-white mb-2">Connexion</h2>
                  <p className="text-white/40 text-sm font-light">
                    Accédez à votre espace client sécurisé
                  </p>
                </div>

                {/* Clerk SignIn */}
                <SignIn
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      cardBox: "shadow-none",
                      card: "bg-transparent shadow-none p-0 border-none gap-4",
                      header: "hidden",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      main: "gap-4",
                      socialButtonsBlockButton: `
                        bg-white/[0.04] border border-white/[0.08] text-white 
                        hover:bg-white/[0.08] hover:border-white/[0.15]
                        transition-all duration-300 rounded-xl h-12
                        backdrop-blur-sm
                      `,
                      socialButtonsBlockButtonText: "text-white/80 font-light text-sm",
                      socialButtonsProviderIcon: "opacity-80",
                      dividerLine: "bg-white/[0.08]",
                      dividerText: "text-white/30 text-xs font-light uppercase tracking-widest bg-transparent",
                      dividerRow: "gap-4",
                      form: "gap-4",
                      formFieldRow: "gap-1",
                      formFieldLabel: "text-white/60 text-xs font-light uppercase tracking-wider",
                      formFieldLabelRow: "mb-2",
                      formFieldInput: `
                        bg-white/[0.03] border border-white/[0.08] text-white 
                        placeholder:text-white/20 
                        focus:border-white/20 focus:bg-white/[0.05] focus:ring-0
                        transition-all duration-300 rounded-xl h-12 px-4
                      `,
                      formFieldInputGroup: "rounded-xl",
                      formButtonPrimary: `
                        bg-white text-black font-medium
                        hover:bg-white/90 hover:shadow-lg hover:shadow-white/10
                        transition-all duration-300 rounded-xl h-12
                        text-sm uppercase tracking-wider
                      `,
                      footer: "bg-transparent pt-4",
                      footerAction: "justify-center",
                      footerActionText: "text-white/40 text-sm font-light",
                      footerActionLink: "text-white/70 hover:text-white font-normal transition-colors",
                      footerPages: "hidden",
                      footerPagesLink: "hidden",
                      identityPreview: "bg-white/[0.03] border border-white/[0.08] rounded-xl",
                      identityPreviewText: "text-white",
                      identityPreviewEditButton: "text-white/50 hover:text-white",
                      formFieldInputShowPasswordButton: "text-white/40 hover:text-white/70",
                      formFieldInputShowPasswordIcon: "w-4 h-4",
                      alert: "bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl",
                      alertText: "text-red-400 text-sm",
                      formFieldErrorText: "text-red-400 text-xs mt-1",
                      internal: "hidden",
                    },
                    layout: {
                      socialButtonsPlacement: "top",
                      socialButtonsVariant: "blockButton",
                      showOptionalFields: false,
                    },
                  }}
                  routing="path"
                  path="/connexion"
                  signUpUrl="/inscription"
                />

                {/* Bottom decoration */}
                <div className="mt-8 pt-6 border-t border-white/[0.05]">
                  <p className="text-center text-white/20 text-xs font-light">
                    Connexion sécurisée par chiffrement 256-bit
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
          © 2024 FluxDev. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
