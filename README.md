# FluxDev.io

Site web premium pour FluxDev - Solutions digitales propulsees par l'intelligence artificielle.

## Stack Technique

- **Framework**: Next.js 16.0.10 (version securisee, corrigee pour React2Shell)
- **React**: 19.x avec React Compiler
- **Styling**: Tailwind CSS 4.x + shadcn/ui
- **Animations**: Framer Motion + GSAP + Lenis (smooth scroll)
- **3D**: Three.js + React Three Fiber
- **Fonts**: Geist Sans & Geist Mono
- **Icons**: Lucide React

## Fonctionnalites

- Design ultra-moderne avec fond gris studio
- Animations fluides et parallax sur scroll
- Images de fond plein ecran avec effets de profondeur
- Smooth scrolling avec Lenis
- Header/Footer professionnels
- Selection de langue FR/EN avec detection automatique
- 20+ agents IA illustres par categories
- 20 projets en portfolio
- Page equipe avec design creatif
- Formulaire de contact complet

## Installation

```bash
npm install
npm run dev
```

## Structure

```
src/
  app/
    page.tsx          # Page d'accueil
    equipe/           # Page equipe
    projets/          # Page projets
    contact/          # Page contact
  components/
    animations.tsx    # Composants d'animation Framer Motion
    smooth-scroll.tsx # Smooth scroll avec Lenis
    three-background.tsx # Background 3D Three.js
    layout/
      header.tsx      # Header avec navigation
      footer.tsx      # Footer professionnel
    sections/
      hero.tsx        # Section hero avec parallax
      services.tsx    # Section services
      agents.tsx      # Section agents IA
      methodology.tsx # Section methodologie
      contact.tsx     # Section contact CTA
    ui/               # Composants shadcn/ui
```

## Couleurs

- Background: `#1A1A1A` (gris studio)
- Foreground: `#FAFAFA`
- Accent: `#ECF8F6`, `#EBF2FA`
- Muted: `#7E7E7E`, `#A3A3A3`

## Deploiement

```bash
npm run build
npm start
```
