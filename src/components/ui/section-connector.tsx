"use client";

import { motion } from "framer-motion";

export function SectionConnector() {
  return (
    <div className="relative h-16 flex items-center justify-center overflow-hidden">
      {/* Ligne verticale fine */}
      <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-white/20" />
      
      {/* Points animés - transmission de données */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white"
          initial={{ top: -6, opacity: 0 }}
          animate={{ 
            top: ["0%", "100%"],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear"
          }}
        />
      ))}
      
      {/* Texte 10 go/s animé */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={`speed-${i}`}
          className="absolute left-1/2 ml-4 text-[10px] font-mono text-white/45 whitespace-nowrap"
          initial={{ top: -10, opacity: 0 }}
          animate={{ 
            top: ["0%", "100%"],
            opacity: [0, 0.45, 0.45, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear"
          }}
        >
          10 go/s
        </motion.span>
      ))}
    </div>
  );
}

export default SectionConnector;
