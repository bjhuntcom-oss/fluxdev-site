"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/contexts";

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);
  const { locale } = useLocale();

  useEffect(() => {
    const consent = localStorage.getItem("fluxdev-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreferences = () => {
    localStorage.setItem("fluxdev-cookie-consent", JSON.stringify({ 
      analytics, 
      marketing,
      timestamp: Date.now() 
    }));
    setShowConsent(false);
  };

  const acceptAll = () => {
    setAnalytics(true);
    setMarketing(true);
    localStorage.setItem("fluxdev-cookie-consent", JSON.stringify({ 
      analytics: true, 
      marketing: true,
      timestamp: Date.now() 
    }));
    setShowConsent(false);
  };

  const texts = {
    fr: {
      title: "Cookies",
      description: "Nous utilisons des cookies pour améliorer votre expérience.",
      acceptAll: "Tout accepter",
      customize: "Personnaliser",
      save: "Enregistrer",
      essential: "Essentiels",
      essentialDesc: "Nécessaires au fonctionnement",
      analyticsLabel: "Analytiques",
      analyticsDesc: "Mesure d'audience",
      marketingLabel: "Marketing",
      marketingDesc: "Publicités personnalisées",
      learnMore: "Politique de confidentialité",
    },
    en: {
      title: "Cookies",
      description: "We use cookies to enhance your experience.",
      acceptAll: "Accept All",
      customize: "Customize",
      save: "Save",
      essential: "Essential",
      essentialDesc: "Required for operation",
      analyticsLabel: "Analytics",
      analyticsDesc: "Audience measurement",
      marketingLabel: "Marketing",
      marketingDesc: "Personalized ads",
      learnMore: "Privacy Policy",
    },
  };

  const t = texts[locale];

  return (
    <AnimatePresence>
      {showConsent && (
        <>
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9990] bg-black/50 backdrop-blur-sm"
          />

          {/* Cookie banner */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 right-0 z-[9991] p-4 lg:p-6"
          >
            <div className="max-w-[900px] mx-auto">
              <div className="relative bg-[#f8f8f8] text-black p-6 lg:p-8 border border-black/10">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-black/20" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-black/20" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-black/20" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-black/20" />

                {/* Header */}
                <div className="flex items-start justify-between gap-6 mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-black flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium tracking-tight">{t.title}</h3>
                      <p className="text-sm text-black/50">{t.description}</p>
                    </div>
                  </div>
                  <a href="/confidentialite" className="text-xs text-black/40 hover:text-black transition-colors whitespace-nowrap">
                    {t.learnMore} →
                  </a>
                </div>

                {/* Options toggle */}
                <AnimatePresence>
                  {showOptions && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5 pt-5 border-t border-black/10">
                        {/* Essential - always on */}
                        <div className="flex items-center justify-between p-3 bg-black/5 rounded-sm">
                          <div>
                            <div className="text-sm font-medium">{t.essential}</div>
                            <div className="text-xs text-black/40">{t.essentialDesc}</div>
                          </div>
                          <div className="w-10 h-5 bg-black rounded-full flex items-center justify-end px-0.5 cursor-not-allowed opacity-60">
                            <div className="w-4 h-4 bg-white rounded-full" />
                          </div>
                        </div>

                        {/* Analytics */}
                        <div className="flex items-center justify-between p-3 bg-black/5 rounded-sm">
                          <div>
                            <div className="text-sm font-medium">{t.analyticsLabel}</div>
                            <div className="text-xs text-black/40">{t.analyticsDesc}</div>
                          </div>
                          <button
                            onClick={() => setAnalytics(!analytics)}
                            className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${analytics ? 'bg-black justify-end' : 'bg-black/20 justify-start'}`}
                          >
                            <div className="w-4 h-4 bg-white rounded-full" />
                          </button>
                        </div>

                        {/* Marketing */}
                        <div className="flex items-center justify-between p-3 bg-black/5 rounded-sm">
                          <div>
                            <div className="text-sm font-medium">{t.marketingLabel}</div>
                            <div className="text-xs text-black/40">{t.marketingDesc}</div>
                          </div>
                          <button
                            onClick={() => setMarketing(!marketing)}
                            className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${marketing ? 'bg-black justify-end' : 'bg-black/20 justify-start'}`}
                          >
                            <div className="w-4 h-4 bg-white rounded-full" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={acceptAll}
                    className="px-6 py-2.5 bg-black text-white text-sm font-medium uppercase tracking-wider hover:bg-black/90 transition-colors"
                  >
                    {t.acceptAll}
                  </button>
                  <button
                    onClick={() => setShowOptions(!showOptions)}
                    className="px-6 py-2.5 bg-transparent border border-black/20 text-black text-sm font-medium uppercase tracking-wider hover:border-black transition-colors"
                  >
                    {t.customize}
                  </button>
                  {showOptions && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={savePreferences}
                      className="px-6 py-2.5 bg-transparent border border-black text-black text-sm font-medium uppercase tracking-wider hover:bg-black hover:text-white transition-all"
                    >
                      {t.save}
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
