"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useLocale } from "@/contexts";

const projectTypesData = {
  fr: [
    { id: "web", label: "Site Web", desc: "Vitrine, e-commerce" },
    { id: "mobile", label: "Application Mobile", desc: "iOS, Android" },
    { id: "saas", label: "Plateforme SaaS", desc: "Cloud, API" },
    { id: "security", label: "Audit Sécurité", desc: "Pentest, SOC" },
    { id: "other", label: "Autre projet", desc: "Sur mesure" },
  ],
  en: [
    { id: "web", label: "Website", desc: "Showcase, e-commerce" },
    { id: "mobile", label: "Mobile App", desc: "iOS, Android" },
    { id: "saas", label: "SaaS Platform", desc: "Cloud, API" },
    { id: "security", label: "Security Audit", desc: "Pentest, SOC" },
    { id: "other", label: "Other project", desc: "Custom" },
  ],
};

const budgets = [
  { id: "500k", label: "500k - 2M FCFA" },
  { id: "2m", label: "2M - 5M FCFA" },
  { id: "5m", label: "5M - 15M FCFA" },
  { id: "15m", label: "15M+ FCFA" },
];

export default function ContactPage() {
  const { locale } = useLocale();
  const projectTypes = projectTypesData[locale];
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    company: "",
    type: "", 
    budget: "",
    message: "" 
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validation basique
    if (!form.name.trim() || !form.email.trim() || !form.type || !form.message.trim()) {
      setError(locale === "fr" ? "Veuillez remplir tous les champs obligatoires" : "Please fill all required fields");
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError(locale === "fr" ? "Veuillez fournir un email valide" : "Please provide a valid email");
      return;
    }

    setSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details?.[0]?.message || "Erreur lors de l'envoi");
      }

      setSent(true);
    } catch (err) {
      console.error("Contact form error:", err);
      setError(err instanceof Error ? err.message : locale === "fr" ? "Une erreur est survenue" : "An error occurred");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-black min-h-screen">
            
      {/* Hero */}
      <section className="relative pt-32 pb-8 overflow-hidden">
        {/* Cadre hero cohérent */}
        <div className="absolute inset-x-4 lg:inset-x-8 top-24 bottom-4 border border-white/15 pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/[0.08] mb-6">
              <div className="w-1.5 h-1.5 bg-green-500 animate-pulse" />
              <span className="text-[10px] text-white/70 uppercase tracking-wider">
                {locale === "fr" ? "Disponible pour nouveaux projets" : "Available for new projects"}
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-light text-white mb-4">
              {locale === "fr" ? "Démarrons votre" : "Let's start your"}
              <br />
              <span className="text-white/70">{locale === "fr" ? "projet ensemble" : "project together"}</span>
            </h1>
            
            <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed">
              {locale === "fr" 
                ? "Remplissez le formulaire ci-dessous et recevez une proposition personnalisée sous 48 heures."
                : "Fill out the form below and receive a personalized proposal within 48 hours."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center py-20"
            >
              <div className="w-16 h-16 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-light text-white mb-3">{locale === "fr" ? "Message envoyé" : "Message sent"}</h2>
              <p className="text-sm text-white/80 mb-8">
                {locale === "fr" 
                  ? "Merci pour votre message. Notre équipe vous contactera sous 24-48h pour discuter de votre projet."
                  : "Thank you for your message. Our team will contact you within 24-48h to discuss your project."}
              </p>
              <div className="flex items-center justify-center gap-8 text-xs text-white/50">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-white/50" />
                  <span>{locale === "fr" ? "Réponse sous 48h" : "Response within 48h"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-white/30" />
                  <span>{locale === "fr" ? "Audit gratuit inclus" : "Free audit included"}</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="max-w-3xl mx-auto"
            >
              {error && (
                <div className="mb-6 p-4 border border-red-500/30 bg-red-500/10 rounded-lg">
                  <p className="text-sm text-red-400 text-center">{error}</p>
                </div>
              )}
              {/* Step 1: Contact Info */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-8 border border-white/30 flex items-center justify-center text-xs text-white/80">
                    01
                  </div>
                  <span className="text-sm text-white/90">{locale === "fr" ? "Vos coordonnées" : "Your contact info"}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="group">
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-0 py-4 bg-transparent border-b border-white/[0.08] text-white text-base focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/50"
                      placeholder={locale === "fr" ? "Nom complet *" : "Full name *"}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-0 py-4 bg-transparent border-b border-white/[0.08] text-white text-base focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/50"
                      placeholder={locale === "fr" ? "Email professionnel *" : "Professional email *"}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full px-0 py-4 bg-transparent border-b border-white/[0.08] text-white text-base focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/50"
                      placeholder={locale === "fr" ? "Entreprise (optionnel)" : "Company (optional)"}
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Project Type */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-8 border border-white/30 flex items-center justify-center text-xs text-white/80">
                    02
                  </div>
                  <span className="text-sm text-white/90">{locale === "fr" ? "Type de projet" : "Project type"}</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {projectTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setForm({ ...form, type: type.id })}
                      className={`p-4 border text-left transition-all ${
                        form.type === type.id
                          ? "border-white/40 bg-white/[0.03]"
                          : "border-white/[0.06] hover:border-white/15"
                      }`}
                    >
                      <div className="text-xs text-white mb-1">{type.label}</div>
                      <div className="text-[10px] text-white/70">{type.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Budget */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-8 border border-white/30 flex items-center justify-center text-xs text-white/80">
                    03
                  </div>
                  <span className="text-sm text-white/90">{locale === "fr" ? "Budget estimé" : "Estimated budget"}</span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {budgets.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setForm({ ...form, budget: b.id })}
                      className={`px-5 py-3 border text-xs transition-all ${
                        form.budget === b.id
                          ? "border-white/40 bg-white/[0.03] text-white"
                          : "border-white/[0.08] text-white/80 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Message */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-8 border border-white/30 flex items-center justify-center text-xs text-white/80">
                    04
                  </div>
                  <span className="text-sm text-white/90">{locale === "fr" ? "Votre projet" : "Your project"}</span>
                </div>
                
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-0 py-4 bg-transparent border-b border-white/[0.08] text-white text-base focus:outline-none focus:border-white/30 transition-colors resize-none placeholder:text-white/50"
                  placeholder={locale === "fr" ? "Décrivez votre projet, vos objectifs et vos contraintes... *" : "Describe your project, goals and constraints... *"}
                />
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-white/[0.06]">
                <div className="text-xs text-white/70 max-w-sm">
                  {locale === "fr" 
                    ? "En soumettant ce formulaire, vous acceptez d'être contacté concernant votre demande. Vos données restent confidentielles."
                    : "By submitting this form, you agree to be contacted regarding your request. Your data remains confidential."}
                </div>
                
                <button
                  type="submit"
                  disabled={sending}
                  className="group flex items-center gap-4 px-8 py-4 bg-white text-black text-sm font-medium transition-all hover:bg-white/90 disabled:opacity-50"
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black animate-spin" />
                      <span>{locale === "fr" ? "Envoi en cours..." : "Sending..."}</span>
                    </>
                  ) : (
                    <>
                      <span>{locale === "fr" ? "Envoyer ma demande" : "Send my request"}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </section>

      {/* Info Bar */}
      <section className="py-12 border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {(locale === "fr" ? [
              { label: "Email", value: "contact@fluxdev.io", link: "mailto:contact@fluxdev.io" },
              { label: "Réponse", value: "Sous 24-48h" },
              { label: "Audit initial", value: "Gratuit" },
              { label: "Devis", value: "Sans engagement" },
            ] : [
              { label: "Email", value: "contact@fluxdev.io", link: "mailto:contact@fluxdev.io" },
              { label: "Response", value: "Within 24-48h" },
              { label: "Initial audit", value: "Free" },
              { label: "Quote", value: "No commitment" },
            ]).map((item) => (
              <div key={item.label}>
                <div className="text-[10px] text-white/50 uppercase tracking-wider mb-2">
                  {item.label}
                </div>
                {item.link ? (
                  <a href={item.link} className="text-sm text-white hover:text-white/80 transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <div className="text-sm text-white">{item.value}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
