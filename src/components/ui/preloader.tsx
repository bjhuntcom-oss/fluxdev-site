"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          {/* Grid pattern background */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '60px 60px'
              }}
            />
          </div>

          {/* Main loader container */}
          <div className="relative">
            {/* Outer rotating ring */}
            <motion.div
              className="absolute -inset-8 border border-white/10 rounded-sm"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Inner pulsing ring */}
            <motion.div
              className="absolute -inset-4 border border-white/20"
              animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Logo container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-20 h-20 bg-white flex items-center justify-center"
            >
              {/* Animated corner accents */}
              <motion.div 
                className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-white/40"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-white/40"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div 
                className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-white/40"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              />
              <motion.div 
                className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-white/40"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
              />

              {/* The F letter with animation */}
              <motion.span
                className="text-4xl font-light text-black tracking-tight select-none"
                animate={{ 
                  opacity: [1, 0.6, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                F
              </motion.span>

              {/* Scanning line effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-white/10 overflow-hidden"
            >
              <motion.div
                className="h-full bg-white"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* FluxDev text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-20 left-1/2 -translate-x-1/2 whitespace-nowrap"
            >
              <span className="text-[11px] font-medium text-white/40 uppercase tracking-[0.3em]">
                FluxDev
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
