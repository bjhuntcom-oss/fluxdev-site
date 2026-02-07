# FluxDev.io

Site vitrine + plateforme client pour **FluxDev Studio** — agence de développement web & IA basée à Cotonou, Bénin.

Production : [https://www.fluxdev.io](https://www.fluxdev.io)

---

## Stack technique

| Catégorie | Technologie | Version |
|-----------|------------|---------|
| Framework | Next.js | ^16.1.6 |
| UI | React | 19.2.3 |
| Langage | TypeScript | ^5 |
| Styling | Tailwind CSS | ^4 |
| Auth | Clerk | ^6.36.10 |
| Database | Supabase (PostgreSQL) | ^2.91.1 |
| Rate limiting | Upstash Redis | ^1.36.2 |
| Animations | Framer Motion | ^12.29.0 |
| Icons | Lucide React | ^0.563.0 |
| Validation | Zod | ^4.3.6 |
| Dates | date-fns | ^4.1.0 |
| Linting | ESLint | ^9 |
| CI/CD | GitHub Actions | — |
| Static analysis | SonarCloud | — |
| Hosting | Vercel | — |

---

## Fonctionnalités

### Site vitrine (public)
- **Page d'accueil** — hero parallax, agents IA, services, méthodologie, CTA
- **Projets** — 16 projets showcase (immobilier, banque, e-commerce, CRM, SaaS, etc.)
- **12 pages projets détaillées** avec maquettes UI interactives
- **5 pages services** — Développement Web, Applications Mobile, Solutions SaaS, Cybersécurité, Design UI/UX
- **Page équipe** — 4 co-fondateurs
- **Formulaire de contact** — multi-étapes avec validation Zod
- **Pages légales** — Mentions légales, Politique de confidentialité, CGV
- **i18n FR/EN** — détection automatique + switch manuel
- **SEO** — JSON-LD structuré, OpenGraph, meta tags dynamiques
- **Animations** — Framer Motion, smooth scroll Lenis, Three.js background

### Dashboard client (authentifié)
- **Messagerie** — conversations en temps réel avec upload de fichiers (PDF, images, ZIP)
- **Documents** — upload/download/suppression, stockage Supabase Storage
- **Projets** — CRUD complet, suivi de statut, tâches
- **Paramètres** — profil utilisateur, préférences de notification
- **Notifications** — temps réel via Supabase Realtime

### Dashboard staff/admin
- **Gestion utilisateurs (admin)** :
  - Changer le rôle (user → staff → dev → admin)
  - Activer / Suspendre / Bannir un utilisateur (avec modal de confirmation)
  - Réactiver un utilisateur banni ou suspendu
  - Modal détail : dropdowns rôle et statut, infos profil, sessions récentes
  - Boutons rapides dans le tableau + menu ⋯ avec toutes les actions
  - Recherche par email/nom, filtres par rôle et statut, pagination
- **Conversations staff** — assignation, archivage, filtrage par rôle
- **Administration** — dashboard stats, analytics, logs d'audit
- **Dev Tools** — outils développeur, logs API
- **Analytics** — pages vues, actions utilisateurs, entités les plus actives

### Sécurité & Anti-interception
- **RLS (Row Level Security)** — toutes les tables protégées via header `x-clerk-id`
- **Rate limiting** — Upstash Redis (login, register, message, upload, API)
- **Input sanitization** — Zod schemas + sanitizeInput/sanitizeHtml
- **File validation** — types MIME + taille max côté serveur
- **Audit logging** — toutes les actions CRUD loguées dans `audit_logs`
- **Security headers renforcés** :
  - CSP strict (script-src, connect-src, frame-src whitelist Clerk/Supabase/Vercel)
  - HSTS preload (max-age=2 ans, includeSubDomains) — anti-downgrade SSL
  - COOP (same-origin) — isolation contexte navigateur
  - CORP (same-origin) — bloque lectures cross-origin
  - Permissions-Policy — camera, micro, geo, USB, bluetooth, serial désactivés
  - X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
  - Cache-Control no-store sur dashboard/API (données sensibles non cachées)
- **Chiffrement application (anti-proxy Burp Suite/mitmproxy)** :
  - `lib/crypto.ts` — AES-256-GCM via Web Crypto API + PBKDF2 key derivation
  - Payloads sensibles chiffrés côté client → illisibles même si interceptés
  - HMAC-SHA256 pour intégrité des requêtes
- **Signature des requêtes API (anti-tampering)** :
  - `lib/api-security.ts` — HMAC signing + timestamp validation (30s tolerance)
  - Body hash SHA-256 inclus dans signature → modification = rejet
  - `secureFetch()` wrapper pour les appels sensibles (admin, mutations)
- **Decoy headers** — headers trompeurs (nginx, Varnish, Cloudflare) pour mislead Wappalyzer
- **Limites honnêtes** : SSL pinning impossible en web (navigateurs uniquement), HPKP déprécié depuis 2019. Ces mesures élèvent significativement la barre mais ne sont pas absolues contre un attaquant avec contrôle total du device.

---

## Architecture

```
src/
├── app/
│   ├── page.tsx                    # Accueil
│   ├── projets/                    # 13 pages (listing + 12 détails)
│   ├── services/                   # 5 pages services
│   ├── equipe/                     # Page équipe
│   ├── contact/                    # Formulaire contact
│   ├── (auth)/                     # Connexion / Inscription (Clerk)
│   ├── cgv/                        # CGV
│   ├── confidentialite/            # Politique confidentialité
│   ├── mentions-legales/           # Mentions légales
│   ├── dashboard/                  # 12 pages dashboard
│   │   ├── messages/               # Messagerie temps réel
│   │   ├── documents/              # Gestion fichiers
│   │   ├── projets/                # Projets + détail [id]
│   │   ├── parametres/             # Paramètres utilisateur
│   │   ├── staff/                  # Users + Conversations
│   │   ├── dev/                    # Dev Tools + API Logs
│   │   └── admin/                  # Dashboard + Users + Analytics + Logs
│   └── api/
│       ├── admin/                  # API admin (users, analytics)
│       ├── user/sync/              # Sync Clerk → Supabase
│       └── webhooks/clerk/         # Webhook Clerk
├── components/
│   ├── layout/                     # Header, Footer, Sidebar
│   ├── sections/                   # Hero, Services, Agents, etc.
│   ├── seo/                        # JSON-LD structured data
│   └── ui/                         # Toast, Notifications, Modal
├── contexts/                       # Locale, ActivityLogger
├── hooks/                          # useUserSync, useActivityLogger
├── lib/
│   ├── supabase/                   # Client + Server + Admin
│   ├── security.ts                 # Sanitization, validation, CSRF
│   ├── ratelimit.ts                # Upstash rate limiters
│   └── i18n/                       # Traductions FR/EN
├── types/                          # TypeScript interfaces
└── middleware.ts                    # Auth + security headers
```

**41 pages** — 8 publiques, 2 auth, 12 dashboard, 12 projets détaillés, 5 services, 2 légales

---

## Base de données (Supabase)

| Table | Description | RLS |
|-------|-------------|-----|
| `users` | Utilisateurs synchronisés depuis Clerk | ✅ |
| `conversations` | Fils de discussion | ✅ |
| `messages` | Messages avec pièces jointes | ✅ |
| `projects` | Projets clients | ✅ |
| `documents` | Fichiers uploadés | ✅ |
| `notifications` | Notifications utilisateur | ✅ |
| `audit_logs` | Journal d'audit complet | ✅ |
| `user_sessions` | Sessions utilisateur | ✅ |
| `page_views` | Tracking des pages vues | ✅ |

---

## Installation

```bash
git clone https://github.com/bjhuntcom-oss/fluxdev-site.git
cd fluxdev-site
npm install
```

### Variables d'environnement

Créer un fichier `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

### Développement

```bash
npm run dev
```

### Build production

```bash
npm run build
npm start
```

### Linting

```bash
npx eslint src/              # Tous les warnings
npx eslint src/ --quiet      # Erreurs uniquement
npx tsc --noEmit             # Type check
```

---

## CI/CD

### GitHub Actions

| Workflow | Fichier | Trigger | Actions |
|----------|---------|---------|---------|
| CI | `.github/workflows/ci.yml` | push/PR sur master | ESLint + TypeScript + Build |
| SonarCloud | `.github/workflows/sonarcloud.yml` | push/PR sur master | Analyse statique SonarCloud |

### Déploiement

Déployé automatiquement sur **Vercel** à chaque push sur `master`.

---

## Historique des versions

### v0.8.0 — 2026-02-07 (Session 7)
- Messages temps réel : smart polling 3s (messages) + 10s (conversations) comme fallback Supabase Realtime
- Security hardening complet :
  - Headers : COOP, CORP, HSTS preload, CSP strict, Permissions-Policy étendu
  - `lib/crypto.ts` : AES-256-GCM + PBKDF2 + HMAC-SHA256 (Web Crypto API)
  - `lib/api-security.ts` : request signing + timestamp anti-replay + body hash anti-tampering
  - `secureFetch()` wrapper pour appels API sensibles
  - Cache-Control no-store sur dashboard/API routes
- Accessibilité : 17 `<div onClick>` corrigés avec `role="presentation"` / `role="dialog"` + `aria-modal`
- SonarCloud Reliability : correction issues HIGH/MEDIUM

### v0.7.0 — 2026-02-07 (Session 5–6)
- ESLint : 26 erreurs → 0 erreurs
- CI/CD GitHub Actions (lint, type check, build) — **CI PASS ✅**
- SonarCloud intégration complète — **Quality Gate PASSED ✅** (Security A, Maintainability A)
  - Organisation `bjhuntcom-oss` (Free plan)
  - Projet `bjhuntcom-oss_fluxdev-site` créé
  - AutoScan désactivé → analyse CI-based via `sonarqube-scan-action@v6`
  - 5 GitHub secrets configurés (SONAR_TOKEN, SUPABASE, CLERK)
- Upload fichiers messages corrigé (bucket `documents`)
- Toggle `features_unlocked` supprimé (verrouillage/déverrouillage fonctionnalités)
  - Toutes les actions admin préservées : suspendre, bannir, activer, changer rôle
- Vercel : déploiements automatiques OK

### v0.6.0 — 2026-02-07 (Session 4)
- Breadcrumb avec accents et casing corrects
- Sidebar staff visible pour les dev users
- Auth flow audit complet
- Custom user dropdown (remplacement Clerk UserButton)
- Bouton logout visible dans la sidebar

### v0.5.0 — 2026-02-07 (Session 3)
- Analytics page alimentée par audit_logs
- Système de logging complet (toutes actions trackées)

### v0.4.0 — 2026-02-06 (Session 2)
- Audit fonctionnel complet : 13 bugs corrigés
- RLS critique corrigé : `get_current_clerk_id` lit `x-clerk-id` header
- Toast erreurs sur toutes les opérations CRUD
- Staff conversations : filtrage par rôle (fuite données corrigée)
- Projects SELECT RLS restreint à own/staff

### v0.3.0 — 2026-02-06 (Session 1)
- i18n complet FR/EN pour tout le dashboard
- Messages : assigned_staff join, click-outside handler
- Admin API : Clerk sync non-fatal, audit_logs non-fatal

### v0.2.0 — 2026-02-05
- Deep audit : 9 bugs corrigés (RLS, API, race condition)
- Admin user management (rôles, statuts, validation)
- Notifications dropdown corrigé
- Rate limiting Upstash Redis
- Security headers CSP, HSTS

### v0.1.0 — 2026-01-24 → 2026-01-28
- Création initiale du projet
- Dashboard complet (messages, documents, projets, paramètres)
- Authentification Clerk + Supabase RLS
- Upload fichiers Supabase Storage
- Messages temps réel
- Pages vitrine (accueil, projets, équipe, contact, services)

---

## Commits (70 total)

<details>
<summary>Historique complet</summary>

| Date | Hash | Description |
|------|------|-------------|
| 2026-02-07 | `c591cf6` | security: hardened headers, AES-256-GCM crypto, HMAC API signing, a11y fixes |
| 2026-02-07 | `65ef873` | fix: realtime messages via smart polling fallback (3s messages, 10s conversations) |
| 2026-02-07 | `90e9a61` | docs: update README with admin actions verification |
| 2026-02-07 | `34072d8` | fix: upgrade sonarqube-scan-action to v6 + create SonarCloud project |
| 2026-02-07 | `72c9390` | fix: add contents:read permission to sonarcloud workflow |
| 2026-02-07 | `5d04c24` | ci: trigger workflows with configured secrets |
| 2026-02-07 | `2e78875` | chore: remove audit .md files, update .gitignore, rewrite README |
| 2026-02-07 | `3edca16` | fix: file upload uses documents bucket + remove features_unlocked |
| 2026-02-07 | `380f44b` | docs: add comprehensive platform audit report |
| 2026-02-07 | `23005d6` | feat: add SonarCloud + CI/CD GitHub Actions |
| 2026-02-07 | `968fd02` | fix: escape apostrophes and quotes in JSX |
| 2026-02-07 | `ce45cc9` | fix: ESLint critical errors - impure renders, unused imports |
| 2026-02-07 | `d796a08` | fix: staff sidebar visibility for dev users |
| 2026-02-07 | `4b373d0` | fix: breadcrumb display - accents and casing |
| 2026-02-07 | `a2ac255` | fix: custom user dropdown modal |
| 2026-02-07 | `bc5e1cb` | fix: visible logout button in sidebar |
| 2026-02-07 | `85de0af` | fix: auth flow deep audit |
| 2026-02-07 | `6e6e1a3` | feat: analytics page alimentée par audit_logs |
| 2026-02-07 | `a3f4da7` | feat: système de logging complet |
| 2026-02-06 | `5f5aedb` | fix: audit complet - toast + null checks + RLS |
| 2026-02-06 | `02bfa65` | fix: functional audit bugs |
| 2026-02-06 | `26c3173` | fix: maxSize translation 10MB → 50MB |
| 2026-02-06 | `b90622d` | feat: full i18n FR/EN dashboard |
| 2026-02-06 | `5dfa832` | fix: Clerk sync non-fatal in admin API |
| 2026-02-06 | `65e5105` | fix: messages page improvements |
| 2026-02-06 | `af7d3ac` | fix: admin API error handling |
| 2026-02-06 | `cca673c` | fix: NotificationDropdown + staff conversations |
| 2026-02-06 | `e5818c8` | feat: admin user management |
| 2026-02-05 | `3727527` | fix: sync route server client |
| 2026-02-05 | `036eeba` | fix: deep audit - 8 bugs |
| 2026-02-05 | `d036256` | fix: Supabase UUID for notifications |
| 2026-02-05 | `97af948` | fix: restore admin functionality |
| 2026-02-05 | `d8e1415` | fix: admin/staff/dev pages redirect |
| 2026-02-05 | `34512b1` | feat(security): fix all vulnerabilities |
| 2026-01-29 | `67c7a2d` | fix: remove locked/validation logic |
| 2026-01-28 | `367f964` | fix: file selection button |
| 2026-01-28 | `27a70c7` | fix: realtime messages |
| 2026-01-28 | `f43721e` | feat: file upload Supabase Storage |
| 2026-01-28 | `aa5ca2e` | feat: dashboard quick actions |
| 2026-01-28 | `8782430` | feat: show 'Moi' for own messages |
| 2026-01-28 | `5b87d77` | feat: loading states, spinners |
| 2026-01-28 | `83fd2fb` | fix: auto-sync user from Clerk |
| 2026-01-28 | `2e6401c` | fix: ensureClerkId for RLS |
| 2026-01-28 | `6ed2cfb` | fix: reload messages after sending |
| 2026-01-27 | `6a7ac0a` | docs: RLS documentation |
| 2026-01-27 | `c59e2e0` | fix: Proxy for supabase client |
| 2026-01-27 | `deaac65` | fix: HTTP headers for clerk_id |
| 2026-01-27 | `aca2080` | feat: RLS with clerk_id |
| 2026-01-27 | `9d727ba` | docs: schema corrections |
| 2026-01-27 | `228a382` | fix: anon key fallback |
| 2026-01-27 | `570c1b8` | fix: user role from Supabase |
| 2026-01-27 | `74ab681` | fix: admin client + strict RLS |
| 2026-01-27 | `203823c` | docs: relational schema + security audit |
| 2026-01-27 | `6542bf2` | docs: BUGS_REPORT with E2E tests |
| 2026-01-27 | `fe011fe` | fix: non-blocking user sync |
| 2026-01-27 | `12a25c2` | fix: anon key client with RLS |
| 2026-01-27 | `bacdc7e` | fix: admin Supabase client for sync |
| 2026-01-27 | `b8cc51f` | fix: user sync on dashboard load |
| 2026-01-27 | `a64bfa4` | fix: Wappalyzer decoy headers |
| 2026-01-27 | `dda7d4c` | fix: analytics/speed-insights deps |
| 2026-01-27 | `bb1c391` | fix: decoy headers via middleware |
| 2026-01-27 | `1f0de84` | feat: security hardening |
| 2026-01-27 | `129f8dd` | fix: remove broken Clerk proxy |
| 2026-01-27 | `2230839` | fix: proxyUrl ClerkProvider |
| 2026-01-27 | `231b7fb` | fix: Clerk proxy rewrite |
| 2026-01-26 | `2c35bd1` | fix: Clerk proxy Vercel |
| 2026-01-26 | `7b3869c` | feat: dashboard, auth, API, RBAC |
| 2026-01-26 | `5e367a9` | Initial commit - FluxDev Site |
| 2026-01-24 | `a90fec5` | Initial commit from Create Next App |

</details>

---

## Licence

Propriétaire — FluxDev Studio © 2026. Tous droits réservés.
