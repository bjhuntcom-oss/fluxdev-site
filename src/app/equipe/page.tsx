"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, Mail } from "lucide-react";
import { useLocale } from "@/contexts";

const teamData = {
  fr: [
  {
    name: "ATCHAHOUE Destin",
    role: "CEO & Lead Security Researcher",
    initials: "AD",
    image: "/team/destin-atchahoue.webp",
    expertise: ["Cybersécurité", "Pentest", "Architecture sécurisée"],
    bio: "Expert en sécurité offensive et défensive avec plus de 8 ans d'expérience. Spécialisé dans l'audit de sécurité, les tests d'intrusion et la mise en place de SOC.",
    quote: "La sécurité n'est pas une option, c'est une fondation.",
    portfolio: "https://atchahouedestin.com",
    linkedin: "https://bj.linkedin.com/in/destin-atchahoue-8a7018375",
    email: "Firstcyberseclover@gmail.com"
  },
  {
    name: "Hector SEDO",
    role: "Co-Fondateur & Développeur Full-Stack",
    initials: "HS",
    image: "/team/hector-sedo.webp",
    expertise: ["React/Next.js", "Node.js", "Cloud AWS/GCP"],
    bio: "Développeur passionné par les architectures scalables et les interfaces utilisateur performantes. Expert React et écosystème JavaScript moderne.",
    quote: "Le code propre est un acte de respect envers les futurs développeurs.",
    portfolio: "/portfolio/hector",
    linkedin: "#",
    email: "hector@fluxdev.io"
  },
  {
    name: "Jefferson ADANNOU-ZONON",
    role: "Co-Fondateur & Directeur Technique",
    initials: "JA",
    image: "/team/jefferson-adannou-zonon.webp",
    expertise: ["Architecture IA", "Systèmes distribués", "DevOps"],
    bio: "Architecte logiciel spécialisé dans les systèmes d'intelligence artificielle et les infrastructures cloud. Responsable de l'écosystème des 1500+ agents IA.",
    quote: "L'IA n'est pas la pour remplacer, mais pour amplifier le potentiel humain.",
    portfolio: "https://portfolio.willivmx.space/",
    linkedin: "#",
    email: "jefferson@fluxdev.io"
  },
  {
    name: "Welman GBAGUIDI",
    role: "Co-Fondateur & Développeur Mobile/IoT",
    initials: "WG",
    expertise: ["React Native", "iOS/Android", "Systèmes embarqués"],
    bio: "Spécialiste du développement mobile cross-platform et des systèmes IoT. Expert en optimisation des performances et en firmware embarqué.",
    quote: "La technologie doit être invisible pour être vraiment efficace.",
    portfolio: "/portfolio/welman",
    linkedin: "#",
    email: "welman@fluxdev.io"
  },
  ],
  en: [
    { name: "ATCHAHOUE Destin", role: "CEO & Lead Security Researcher", initials: "AD", image: "/team/destin-atchahoue.webp", expertise: ["Cybersecurity", "Pentest", "Secure Architecture"], bio: "Offensive and defensive security expert with over 8 years of experience. Specialized in security audits, penetration testing and SOC implementation.", quote: "Security is not an option, it's a foundation.", portfolio: "https://atchahouedestin.com", linkedin: "https://bj.linkedin.com/in/destin-atchahoue-8a7018375", email: "Firstcyberseclover@gmail.com" },
    { name: "Hector SEDO", role: "Co-Founder & Full-Stack Developer", initials: "HS", image: "/team/hector-sedo.webp", expertise: ["React/Next.js", "Node.js", "Cloud AWS/GCP"], bio: "Developer passionate about scalable architectures and high-performance user interfaces. React expert and modern JavaScript ecosystem.", quote: "Clean code is an act of respect towards future developers.", portfolio: "/portfolio/hector", linkedin: "#", email: "hector@fluxdev.io" },
    { name: "Jefferson ADANNOU-ZONON", role: "Co-Founder & Technical Director", initials: "JA", image: "/team/jefferson-adannou-zonon.webp", expertise: ["AI Architecture", "Distributed Systems", "DevOps"], bio: "Software architect specialized in artificial intelligence systems and cloud infrastructures. Responsible for the 1500+ AI agents ecosystem.", quote: "AI is not here to replace, but to amplify human potential.", portfolio: "https://portfolio.willivmx.space/", linkedin: "#", email: "jefferson@fluxdev.io" },
    { name: "Welman GBAGUIDI", role: "Co-Founder & Mobile/IoT Developer", initials: "WG", expertise: ["React Native", "iOS/Android", "Embedded Systems"], bio: "Cross-platform mobile development and IoT systems specialist. Expert in performance optimization and embedded firmware.", quote: "Technology must be invisible to be truly effective.", portfolio: "/portfolio/welman", linkedin: "#", email: "welman@fluxdev.io" },
  ],
};

export default function TeamPage() {
  const { locale } = useLocale();
  const team = teamData[locale];
  return (
    <div className="bg-black min-h-screen">
            
      {/* Hero Section - Grand et épuré */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24">
        {/* Cadre hero cohérent avec header */}
        <div className="absolute inset-x-4 lg:inset-x-8 top-24 bottom-8 border border-white/15 pointer-events-none" />
        
        <div className="max-w-[1600px] mx-auto px-8 lg:px-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-white/40" />
              <span className="text-xs font-medium text-white/80 uppercase tracking-[0.3em]">
                {locale === "fr" ? "Notre équipe" : "Our Team"}
              </span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl xl:text-9xl font-extralight text-white mb-8 leading-[0.9]">
              {locale === "fr" ? "Les" : "The"}
              <br />
              <span className="text-white/70">{locale === "fr" ? "experts" : "experts"}</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-white/80 max-w-xl leading-relaxed font-light">
              {locale === "fr" 
                ? "Une équipe pluridisciplinaire réunissant expertise technique, passion pour l'innovation et vision stratégique."
                : "A multidisciplinary team combining technical expertise, passion for innovation and strategic vision."}
            </p>
            
            <div className="flex items-center gap-8 mt-12">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 border-2 border-white/40" />
                <span className="text-sm text-white/90">{locale === "fr" ? "4 co-fondateurs" : "4 co-founders"}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 border-2 border-white/40" />
                <span className="text-sm text-white/90">{locale === "fr" ? "+30 ans d'expérience cumulée" : "+30 years combined experience"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section - Layout alterné épuré */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="space-y-24 lg:space-y-32">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  index % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
                style={{ direction: index % 2 === 1 ? "rtl" : "ltr" }}
              >
                {/* Zone Portrait */}
                <div className="relative group" style={{ direction: "ltr" }}>
                  <div className="relative aspect-square max-w-[400px] mx-auto lg:mx-0">
                    {/* Cadre principal */}
                    <div className="absolute inset-0 border border-white/20 group-hover:border-white/40 transition-all duration-500 z-10" />
                    
                    {/* Image ou Initiales */}
                    {member.image ? (
                      <div className="absolute inset-0 overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className={`grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 select-none pointer-events-none ${member.name === "Hector SEDO" ? "object-cover object-[50%_20%]" : "object-contain"}`}
                          draggable={false}
                          priority={index === 0}
                        />
                        {/* Overlay gradient pour fondu */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent flex items-center justify-center">
                        <span className="text-[120px] lg:text-[160px] font-extralight text-white/[0.06] group-hover:text-white/10 transition-all duration-700 select-none">
                          {member.initials}
                        </span>
                      </div>
                    )}
                    
                    {/* Numéro */}
                    <div className="absolute top-6 left-6 text-sm text-white/30 font-mono z-10">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    
                    {/* Coins décoratifs */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 border-l border-t border-white/40 z-10" />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r border-b border-white/40 z-10" />
                  </div>
                </div>
                
                {/* Contenu */}
                <div className="space-y-6" style={{ direction: "ltr" }}>
                  {/* Role */}
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-px bg-white/30" />
                    <span className="text-[11px] text-white/50 uppercase tracking-[0.25em] px-3 py-1.5 border border-white/20">
                      {member.role}
                    </span>
                  </div>
                  
                  {/* Nom */}
                  <h2 className="text-3xl lg:text-4xl font-extralight text-white leading-tight">
                    {member.name}
                  </h2>
                  
                  {/* Bio */}
                  <p className="text-base text-white/60 leading-relaxed max-w-md">
                    {member.bio}
                  </p>
                  
                  {/* Citation */}
                  <div className="relative pl-6 py-4 border-l border-white/20">
                    <p className="text-sm text-white/50 italic leading-relaxed">
                      &ldquo;{member.quote}&rdquo;
                    </p>
                  </div>
                  
                  {/* Expertise */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    {member.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs text-white/60 px-4 py-2 border border-white/10 hover:border-white/25 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-6 pt-4">
                    <a
                      href={member.linkedin}
                      className="flex items-center gap-2 text-xs text-white/40 hover:text-white/80 transition-colors group/link"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 text-xs text-white/40 hover:text-white/80 transition-colors group/link"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </a>
                    <Link
                      href={member.portfolio}
                      className="flex items-center gap-2 text-xs text-white/40 hover:text-white/80 transition-colors ml-auto"
                    >
                      <span>Portfolio</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section - Grande et encadree */}
      <section className="relative py-24 lg:py-32">
        {/* Cadre de section */}
        <div className="absolute inset-x-8 lg:inset-x-24 top-0 bottom-0 border-t-2 border-b-2 border-white/10" />
        
        <div className="max-w-[1600px] mx-auto px-8 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Titre */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-white/40" />
                <span className="text-xs font-medium text-white/50 uppercase tracking-[0.3em]">
                  {locale === "fr" ? "Nos valeurs" : "Our Values"}
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-extralight text-white leading-tight">
                {locale === "fr" ? "Ce qui nous" : "What"}
                <br />
                <span className="text-white/60">{locale === "fr" ? "définit" : "defines us"}</span>
              </h2>
            </motion.div>
            
            {/* Valeurs */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {(locale === "fr" ? [
                { title: "Excellence", desc: "Qualité sans compromis dans chaque ligne de code, chaque design, chaque interaction.", icon: "01" },
                { title: "Innovation", desc: "Toujours à la pointe des technologies, anticipant les besoins de demain.", icon: "02" },
                { title: "Intégrité", desc: "Transparence totale, communication claire et respect des engagements.", icon: "03" },
              ] : [
                { title: "Excellence", desc: "Uncompromising quality in every line of code, every design, every interaction.", icon: "01" },
                { title: "Innovation", desc: "Always at the forefront of technology, anticipating tomorrow's needs.", icon: "02" },
                { title: "Integrity", desc: "Total transparency, clear communication and commitment respect.", icon: "03" },
              ]).map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Cadre de valeur */}
                  <div className="border-2 border-white/10 hover:border-white/25 p-8 transition-all duration-300 h-full">
                    {/* Coin décoratif */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white/30" />
                    
                    <div className="text-xs text-white/30 font-mono mb-4">{value.icon}</div>
                    <h3 className="text-xl font-light text-white mb-4">{value.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{value.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative border-2 border-white/20 p-12 lg:p-16 text-center"
          >
            {/* Grands coins */}
            <div className="absolute -top-3 -left-3 w-12 h-12 border-l-[3px] border-t-[3px] border-white/40" />
            <div className="absolute -top-3 -right-3 w-12 h-12 border-r-[3px] border-t-[3px] border-white/40" />
            <div className="absolute -bottom-3 -left-3 w-12 h-12 border-l-[3px] border-b-[3px] border-white/40" />
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-r-[3px] border-b-[3px] border-white/40" />
            
            <h3 className="text-3xl lg:text-4xl font-extralight text-white mb-4">
              {locale === "fr" ? "Rejoignez l'aventure" : "Join the adventure"}
            </h3>
            <p className="text-white/50 mb-8 max-w-lg mx-auto">
              {locale === "fr" 
                ? "Nous sommes toujours à la recherche de talents passionnés pour renforcer notre équipe."
                : "We are always looking for passionate talents to strengthen our team."}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-4 px-8 py-4 bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
            >
              <span>{locale === "fr" ? "Nous contacter" : "Contact us"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
