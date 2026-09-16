# Kugi.ph Setup & Escrow Operational Guide

This document provides complete, step-by-step instructions for running, configuring, and operating **Kugi (`Kugi.ph`)**, with specific focus on setting up the **Tripartite Milestone Escrow Engine**, Philippine payment rails, and statutory compliance.

---

## 1. Prerequisites & Environment Setup

Ensure you have the following installed on your operating system:
- **Node.js:** v20.x or v24.x LTS (Recommended: Node v24+)
- **npm:** v10+ or v11+
- **Git:** Installed and configured
- **Database:** PostgreSQL (v15+) or hosted database (Neon, Supabase, Railway, or AWS RDS)

---

## 2. Local Development Setup

### Step 2.1: Clone and Install
```bash
git clone https://github.com/sugarDLucx/Kugi.git
cd Kugi
npm install
```

### Step 2.2: Environment Configuration
Create a `.env` file in the project root:
```env
# Database Connection (PostgreSQL)
DATABASE_URL="postgresql://kugi_user:your_password@localhost:5432/kugi_db?schema=public"

# App URL & Domain
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_DOMAIN="kugi.ph"

# Philippine Payment Gateway (PayMongo or Xendit)
PAYMONGO_SECRET_KEY="sk_test_..."
PAYMONGO_PUBLIC_KEY="pk_test_..."
PAYMONGO_WEBHOOK_SECRET="whsec_..."

# Escrow Custody Account
ESCROW_MERCHANT_WALLET="0917-000-0000"
ESCROW_TRUST_ACCOUNT_NAME="Kugi Escrow Technologies Inc. Custody"

# BIR Statutory Settings (RDO 112 Tagum City)
BIR_RDO_CODE="112"
BIR_WITHHOLDING_RATE="0.005"
BIR_ANNUAL_CWT_THRESHOLD="500000"
```

### Step 2.3: Run Verification Suite
Verify the regex filters, tax math, and escrow state machine:
```bash
npm test
```

### Step 2.4: Launch the Local Development Server
```bash
npm run dev
```
Navigate to **`http://localhost:3000`** in your browser.

---

## 3. Database Setup (Prisma + PostgreSQL)

The platform comes with a complete transactional schema defined in `prisma/schema.prisma`.

### Step 3.1: Generate Prisma Client
```bash
npx prisma generate
```

### Step 3.2: Apply Schema to PostgreSQL
For development:
```bash
npx prisma db push
```

For production migrations:
```bash
npx prisma migrate dev --name init_kugi_schema
npx prisma migrate deploy
```

> **Note on Local Offline Testing:**  
> The codebase includes an integrated mock data store (`src/lib/mock-data.ts`) containing realistic Davao del Norte listings, contracts, milestones, and dispute logs across Tagum, Panabo, Kapalong, and Samal Island. All UI pages and API endpoints function offline without an active database connection.

---

## 4. Setting Up the Escrow Engine (Step-by-Step)

The core value proposition of Kugi is its **Deposit-First Milestone Escrow Engine**. Here is how to configure and operate it for production:

```
[Contract Created]
       │
       ▼
[Buyer Funds Milestone 1] (via GCash / Maya / QR Ph)
       │
       ▼
[Webhook Callback Confirms Deposit] ──> Status: ESCROW_LOCKED
       │
       ▼
[Freelancer Notified to Begin Work]
       │
       ▼
[Freelancer Submits Milestone Deliverables] (SHA-256 Logged)
       │
       ▼
[72-Hour Inspection Clock Commences]
       │
       ├─────────────────────────────────────────┐
       ▼                                         ▼
[Buyer Approves Deliverable]          [72-Hour Window Expires]
       │                                         │
       └────────────────────┬────────────────────┘
                            │
                            ▼
           [Deduct 0.5% BIR 2307 Withholding]
           [Disburse Net Funds to Freelancer GCash]
```

### Step 4.1: Integrate Philippine Payment Gateway (GCash & Maya Rails)
Kugi is built to connect with licensed Philippine payment facilitators (such as **PayMongo** or **Xendit**):

1. **Sign up with PayMongo / Xendit:**
   - Obtain your Test and Live API keys.
   - Activate **GCash**, **Maya**, and **QR Ph (Universal BSP Standard)** payment channels.
2. **Configure Webhook Endpoint:**
   - In your payment gateway dashboard, set the webhook callback URL to:
     `https://kugi.ph/api/escrow/webhook`
   - Subscribe to event: `payment.paid` or `source.chargeable`.
3. **Escrow Holding Account:**
   - Establish an isolated corporate bank account (e.g. LandBank of the Philippines or UnionBank) designated strictly for escrow custody.
   - When a buyer pays for Milestone 1, the payment gateway deposits funds into this segregated custody balance.
   - The platform updates the milestone status to `ESCROW_LOCKED`. Work does **not** start until this status is set.

---

### Step 4.2: Operating the 72-Hour Inspection Protocol
When the contractor completes work and uploads deliverables (`src/app/messages/[orderId]/page.tsx`):

1. **Cryptographic Deliverable Checksum:**
   - Deliverable files are hashed using SHA-256 (`src/lib/escrow-engine.ts:generateDeliverableHash`).
   - The checksum is recorded on the contract ledger for tamper-proof verification.
2. **72-Hour Countdown Clock:**
   - The platform sets `inspectionEndAt` to current UTC timestamp + 72 hours.
   - The countdown is displayed on both the client's and freelancer's Workroom view (`InspectionTimer.tsx`).
3. **Client Options during the 72-Hour Window:**
   - **Approve:** Client clicks *"Approve Deliverable"*. Status transitions to `FUNDS_RELEASED`. Funds disburse to the contractor's GCash wallet.
   - **Request Revision:** Client clicks *"Request Revision"*. The 72-hour timer **pauses immediately**. Milestone transitions to `REVISION_REQUESTED`.
   - **File Dispute:** Freezes the escrow balance and moves milestone into `DISPUTED` status.
4. **Automated Auto-Release Sweep:**
   - If 72 hours elapse with no dispute and no revision request, the milestone is eligible for autonomous release.
   - Set up a scheduled cron job (e.g. Cloudflare Worker Cron, Vercel Cron, or GitHub Actions) calling your sweep endpoint every 15 minutes:
     ```bash
     curl -X POST https://kugi.ph/api/escrow/sweep \
       -H "Authorization: Bearer YOUR_CRON_SECRET"
     ```

---

### Step 4.3: BIR Revenue Regulations No. 16-2023 Tax Compliance
Under BIR RR 16-2023 (clarified by RMC 8-2024), digital marketplaces must withhold 0.5% Creditable Withholding Tax (CWT) on qualifying remittances:

1. **Threshold Tracking:**
   - The platform accounting engine (`src/lib/tax-calculator.ts`) monitors cumulative annual gross remittances for each freelancer.
   - Once gross earnings exceed **₱500,000.00**, the 0.5% CWT automatically deducts from the gross milestone before disbursement.
2. **Generating BIR Form 2307:**
   - The platform automatically generates Form 2307 data vouchers:
     - ATC Code: `WI700`
     - Jurisdiction: `RDO 112 - Tagum City, Davao del Norte`
   - Users can export signed quarterly tax dossiers directly from their settings page (`/settings` or `/api/tax/bir2307`).

---

### Step 4.4: Anti-Scam Shield & Disintermediation Protection
To prevent off-platform scams and protect the escrow guarantee:
- All messages entered in the Workroom chat are scanned in real-time by `src/lib/anti-scam-regex.ts`.
- The regex detects private phone numbers (`09\d{9}`, `+639\d{9}`), solicitations for direct GCash/Maya transfers, and external links (Telegram, WhatsApp, Viber).
- When triggered, a **Signal Crimson (`#DC2626`)** banner appears, warning both parties that off-platform transactions void all Kugi 100% Escrow protections and violate RA 11967.

---

### Step 4.5: Dispute Mediation Desk Workflow
If direct negotiation fails, the 3-tier dispute workflow activates:
1. **Tier 1 (48-Hour Direct Negotiation):** The parties are given a 48-hour mutual window in the encrypted Workroom to reach a compromise.
2. **Tier 2 (Provincial Mediation Desk Review):** A Kugi Compliance Officer in Mankilam, Tagum City audits the contract scope, deliverable SHA-256 hashes, and chat logs to issue a binding refund or release.
3. **Tier 3 (External Legal Redress):** If unresolved, Kugi exports a certified audit log dossier for formal referral to the Department of Trade and Industry (DTI Region XI) or the Tagum City Chamber of Commerce.

---

## 5. Packaging for Mobile with Capacitor

Kugi includes full Capacitor support for mobile deployment on Android and iOS:

### Step 5.1: Export the Web Bundle
```bash
npm run build
npx cap sync
```

### Step 5.2: Run Android Wrapper
```bash
npx cap open android
```
*(Requires Android Studio installed with SDK tools)*

### Step 5.3: Run iOS Wrapper (macOS only)
```bash
npx cap open ios
```
*(Requires Xcode installed)*

---

## 6. Production Deployment Guide

### Deploying to Vercel
1. Push your repository to GitHub.
2. Link the repository in the Vercel Dashboard.
3. Configure the environment variables specified in Section 2.2 (`DATABASE_URL`, `PAYMONGO_SECRET_KEY`, etc.).
4. Deploy! Next.js 15 App Router and Route Handlers are natively optimized for Vercel edge and serverless runtime.

### Custom Domain Configuration
- In Vercel / Cloudflare DNS:
  - Add an `A` record pointing `@` to `76.76.21.21` (or your edge IP).
  - Add a `CNAME` record pointing `www` to `cname.vercel-dns.com`.
  - Set your custom domain to **`Kugi.ph`**.

---

## 7. Operational Checklist Before Public Launch

- [ ] Connect production PostgreSQL cluster with connection pooling.
- [ ] Swap PayMongo / Xendit API keys from Test mode to Live mode.
- [ ] Verify DTI E-Commerce Philippine Trustmark dynamic QR code links to your official Online Business Database (OBD) entry.
- [ ] Establish business partnership with Kugi Provincial Mediation Desk in Mankilam, Tagum City.
- [ ] Test real GCash and Maya micro-deposits (₱50.00 test milestone) to ensure webhook callbacks disburse funds accurately.
- [ ] Confirm BIR Form 2307 PDF template formatting matches BIR RDO 112 requirements.
