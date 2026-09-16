# Kugi (Kugi.ph)

> **"Trabahong lokal, kalidad nga kasaligan"**  
> *Localized High-Trust Escrow Marketplace & Enterprise Contracting Infrastructure for Davao del Norte, Region XI, Philippines.*

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5.25-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.3.0-61DAFB?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.19-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19.3-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)
[![Capacitor](https://img.shields.io/badge/Capacitor-7.6.9-119EFF?style=flat&logo=ionic)](https://capacitorjs.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0.15-brown?style=flat)](https://zustand-demo.pmnd.rs/)
[![Compliance](https://img.shields.io/badge/Compliance-RA_11967_|_BIR_RR_16--2023-10B981?style=flat)]()

---

## 🏛️ Executive Overview

**Kugi (`Kugi.ph`)** is a specialized freelance and enterprise contracting platform engineered specifically for **Davao del Norte**, Philippines. It replaces precarious informal cash arrangements with:

1. **Autonomous Tripartite Milestone Escrow:** Deposit-first funding via Philippine mobile wallets (GCash, Maya, QR Ph, LandBank/UnionBank) with an automated **72-Hour Inspection Protocol**.
2. **Three-Tier e-KYC Identity Verification:**
   - **Level 1:** PhilSys National ID / ePhilID with biometric liveness validation (₱15,000 milestone ceiling).
   - **Level 2:** Professional Regulation Commission (PRC) LERIS licensure + BIR Form 2303 registration (unlimited milestone volume).
   - **Level 3:** Portfolio cryptographic fingerprinting (SHA-256 deliverable auditing & plagiarism prevention).
3. **Automated Philippine Statutory Compliance:**
   - **BIR RR 16-2023:** Automated 0.5% Creditable Withholding Tax (CWT) deduction for annual contractor earnings exceeding ₱500,000.00.
   - **BIR Form 2307 Dossiers:** Quarterly signed withholding certificate generation for Tagum City (RDO 112).
   - **Republic Act No. 11967 (Internet Transactions Act of 2023):** Integrated DTI E-Commerce Philippine Trustmark linked to the National Online Business Database (OBD).
   - **Republic Act No. 10173 (Data Privacy Act of 2012):** AES-256 encrypted biometric storage and automated subject erasure controls.
4. **Anti-Disintermediation Regex Shield:** Real-time chat scanning that detects off-platform payment solicitations (private phone numbers, personal GCash wallets, external links) and triggers **Signal Crimson** alerts.

---

## 📍 Davao del Norte Economic Clusters

All talent, contracts, listings, and searches are natively partitioned across the 4 provincial economic zones:

- **Cluster 1: Tagum Commercial & Institutional Core** *(Tagum City - Provincial Capital)*  
  *Domains:* Commercial CAD Blueprints, Building Permitting, Enterprise Web Software, BIR Tax Audits, Legal Drafting.
- **Cluster 2: Northern Agro-Industrial Hinterlands** *(Kapalong, Asuncion, Sawata, Talaingod, New Corella)*  
  *Domains:* Agrarian Cooperative ERPs, Banana & Cacao Farm Telemetry, Drone Topographic Mapping, Solar Irrigation.
- **Cluster 3: Agro-Economic & Logistics Corridor** *(Panabo City, Carmen, Sto. Tomas, Braulio E. Dujali)*  
  *Domains:* Anflo Industrial Estate (PEZA SEZ), Packing Plant PLC Automation, Cold Storage SCADA, Industrial Fiber/CCTV.
- **Cluster 4: Tourism, Coastal & Creative Hub** *(Island Garden City of Samal - IGaCoS)*  
  *Domains:* Beach Resort Booking Engines, Marine Conservation Portals, 4K Drone Media, Remote Creative Branding.

---

## 🎨 Institutional Design Tokens

| Token Name | Hex Code | Primary Usage |
| :--- | :--- | :--- |
| **Davao Deep Navy** | `#0A192F` | Primary headers, navigation, dark surface cards, and authority badges |
| **Vibrant Tech Cyan** | `#00B4D8` | Primary CTAs, active proposal vectors, interactive controls, and links |
| **Escrow Emerald** | `#10B981` | Vaulted escrow deposits, verified milestone approvals, and trust badges |
| **DavNor Harvest Amber** | `#F59E0B` / `#D97706` | Cluster badges, ratings, pending inspection states, and tax alerts |
| **Signal Crimson** | `#DC2626` | Anti-scam disintermediation triggers and active dispute flags |
| **Canvas Off-White** | `#F8FAFC` | Platform background canvas (`bg-canvas`) |
| **Card Surface** | `#FFFFFF` | Elevated components with 1px border (`#E2E8F0`) |

*Typography:* **Plus Jakarta Sans** for UI and headlines; **JetBrains Mono** (`font-mono-currency`) for financial ledgers, currency figures (`₱`), and deliverable SHA-256 checksums.

---

## 📱 Verified Technical Stack & Ecosystem

Every dependency in the repository is audited and locked to LTS-compatible, production-grade releases:

| Component / Layer | Technology | Exact Version Installed | Architectural Role & Implementation in Kugi |
| :--- | :--- | :--- | :--- |
| **Runtime Environment** | Node.js | `v24.16.0` LTS | Core JavaScript execution runtime with active LTS support |
| **Package Manager** | npm | `11.13.0` | Deterministic dependency tree resolution with `package-lock.json` |
| **Web Framework** | Next.js (App Router) | `15.5.25` | Hybrid SSR, static generation, Route Handlers, and Server Actions |
| **UI Library** | React | `19.3.0` | Concurrent rendering engine powering all 13 interactive screens |
| **Type Safety** | TypeScript | `5.9.3` | Strict type checking across state machines, props, and schemas |
| **Styling Engine** | Tailwind CSS | `3.4.19` | Utility CSS configured with custom institutional tokens in `tailwind.config.ts` |
| **Post-Processor** | PostCSS / Autoprefixer | `8.5.28` / `10.6.1` | Cross-browser vendor prefixing and CSS minification |
| **State Management** | Zustand | `5.0.15` | Global client store managing Dual-Role switcher and active cluster |
| **Mobile Runtime Bridge**| Capacitor Core & CLI | `7.6.9` | Native wrapper bridging Next.js to Android APK and iOS with biometrics |
| **ORM & Data Layer** | Prisma Client & CLI | `6.19.3` | Type-safe query engine and relational migration tooling (`schema.prisma`) |
| **Iconography** | Lucide React | `0.475.0` | Lightweight SVG icons for navigation, trust badges, and payment rails |
| **CSS Utilities** | clsx & tailwind-merge | `2.1.1` / `3.7.0` | Conditional class resolution and conflict avoidance |
| **Typography** | Google Fonts | Web (Next/Font) | Plus Jakarta Sans (UI) & JetBrains Mono (Financials & SHA-256) |

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Automated Verification Tests
```bash
npm test
```

### 3. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build
```bash
npm run build
```

---

## 📂 Repository Structure

```
.
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout (Plus Jakarta Sans, JetBrains Mono)
│   │   ├── page.tsx                      # Screen 1: Homepage & Service Discovery Hub (/)
│   │   ├── services/
│   │   │   ├── page.tsx                  # Screen 2: Service Marketplace & Advanced Search (/services)
│   │   │   └── [id]/page.tsx             # Screen 3: Service Detail & Escrow Milestone (/services/[id])
│   │   ├── dashboard/page.tsx            # Screen 4: Dual-Role Switcher & Unified Dashboard (/dashboard)
│   │   ├── checkout/page.tsx             # Screen 5: Escrow Checkout & Payment Gateway (/checkout)
│   │   ├── messages/[orderId]/page.tsx   # Screen 6: Real-Time Workroom & Anti-Scam Shield (/messages/[id])
│   │   ├── reviews/submit/page.tsx       # Screen 7: Double-Blind Review & Rating Modal (/reviews/submit)
│   │   ├── trust-center/page.tsx         # Screen 8: Trust & e-KYC Verification Center (/trust-center)
│   │   ├── signup/page.tsx               # Screen 9: Dual-Track Registration (/signup)
│   │   ├── login/page.tsx                # Screen 10: Secure Authentication (/login)
│   │   ├── settings/page.tsx             # Screen 11: Account & Security Preferences (/settings)
│   │   ├── profile/[username]/page.tsx   # Screen 12: Public Freelancer Profile (/profile/[username])
│   │   ├── projects/new/page.tsx         # Screen 13: Project Posting & Milestone Builder (/projects/new)
│   │   ├── escrow-dispute-terms/page.tsx # Statutory Terms, RA 11967, and Mediation Desk
│   │   └── api/
│   │       ├── escrow/route.ts           # Escrow state transitions
│   │       ├── chat/route.ts             # Messaging with anti-disintermediation scan
│   │       └── tax/bir2307/route.ts      # BIR Form 2307 voucher generator
│   ├── components/
│   │   ├── layout/ (Navbar, Footer)
│   │   ├── escrow/ (InspectionTimer, EscrowTimeline)
│   │   ├── chat/ (AntiScamBanner)
│   │   └── verification/ (VerificationBadges)
│   ├── lib/
│   │   ├── store.ts                      # Zustand store (role toggle, cluster filter, escrow actions)
│   │   ├── escrow-engine.ts              # 72-hour timer, state machine & SHA-256 hashing
│   │   ├── anti-scam-regex.ts            # Disintermediation regex filters
│   │   ├── tax-calculator.ts             # BIR RR 16-2023 CWT calculator
│   │   └── mock-data.ts                  # DavNor listings, freelancers, and contracts
│   └── styles/globals.css
├── prisma/
│   └── schema.prisma                     # Relational transactional schema
├── public/
│   ├── logo.png                          # Kugi brand logo
│   ├── avatar.png                        # Verified profile headshot
│   └── manifest.json                     # PWA Web App Manifest
├── capacitor.config.ts                   # Mobile wrapper configuration
└── tailwind.config.ts
```

---

## ⚖️ Legal & Regulatory Alignment

- **Republic Act No. 11967 (Internet Transactions Act of 2023):** Platform compliance, merchant identity registry, and DTI E-Commerce Philippine Trustmark accreditation.
- **BIR Revenue Regulations No. 16-2023:** 0.5% Creditable Withholding Tax automated deduction and quarterly Form 2307 issuance under BIR RDO 112 (Tagum City).
- **Republic Act No. 10173 (Data Privacy Act of 2012):** Strict personal information controller standards registered with the National Privacy Commission (NPC).

---

## 📄 License

Proprietary enterprise software developed for **Kugi Technologies Inc.** All rights reserved. Co-incubated under the **Start in DavNor** regional economic initiative.
