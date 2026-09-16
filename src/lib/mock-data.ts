/**
 * Davao del Norte Mock Dataset for Kugi.ph
 * Provides rich, realistic data across all 4 provincial clusters,
 * verified PRC/PhilSys professionals, contracts, milestones, and dispute logs.
 */

import { MilestoneState } from "./escrow-engine";

export interface DavNorClusterInfo {
  id: string;
  name: string;
  shortName: string;
  code: string;
  municipalities: string[];
  primaryDomains: string[];
  economicAnchor: string;
}

export const DAVNOR_CLUSTERS: DavNorClusterInfo[] = [
  {
    id: "cluster-1",
    name: "Cluster 1: Tagum Commercial & Institutional Core",
    shortName: "Tagum Core",
    code: "CLUSTER_1_TAGUM",
    municipalities: ["Tagum City"],
    primaryDomains: [
      "Commercial CAD Blueprints",
      "BIR Tax Audits & Form 2307",
      "Enterprise Web Software",
      "Legal Documentation",
    ],
    economicAnchor: "Provincial Capital, Banking Hub & Regional Trading Center",
  },
  {
    id: "cluster-2",
    name: "Cluster 2: Northern Agro-Industrial Hinterlands",
    shortName: "Kapalong / Asuncion",
    code: "CLUSTER_2_KAPALONG_ASUNCION",
    municipalities: ["Kapalong", "Asuncion", "Sawata", "Talaingod", "New Corella"],
    primaryDomains: [
      "Farm Telemetry Systems",
      "Drone Topographic Mapping",
      "Agrarian Cooperative ERPs",
      "Solar Water Pump Engineering",
    ],
    economicAnchor: "Banana, Cacao, Palm Oil & Agrarian Cooperative Plantations",
  },
  {
    id: "cluster-3",
    name: "Cluster 3: Agro-Economic & Logistics Corridor",
    shortName: "Panabo Corridor",
    code: "CLUSTER_3_PANABO_CORRIDOR",
    municipalities: ["Panabo City", "Carmen", "Santo Tomas", "Braulio E. Dujali"],
    primaryDomains: [
      "Packing Plant PLC Automation",
      "Cold Storage SCADA Telemetry",
      "Industrial Fiber Optic & CCTV",
      "Logistics Fleet Telematics",
    ],
    economicAnchor: "Anflo Industrial Estate (PEZA SEZ), International Container Port & Cold Chain",
  },
  {
    id: "cluster-4",
    name: "Cluster 4: Tourism, Coastal & Creative Hub",
    shortName: "Samal Island (IGaCoS)",
    code: "CLUSTER_4_SAMAL_ISLAND",
    municipalities: ["Island Garden City of Samal (IGaCoS)"],
    primaryDomains: [
      "Resort Booking Engines",
      "Marine Tourism Portals",
      "Creative Branding & Packaging",
      "4K Commercial Drone Media",
    ],
    economicAnchor: "Coastal Eco-Tourism, Beach Resorts, Marine Sanctuaries & Remote Digital Nomads",
  },
];

export interface VerifiedFreelancer {
  id: string;
  username: string;
  fullName: string;
  title: string;
  avatarUrl: string;
  cluster: string;
  clusterCode: string;
  municipality: string;
  verificationTier: 1 | 2 | 3;
  prcLicense?: string;
  tin?: string;
  isBir2303Valid: boolean;
  rating: number;
  totalReviews: number;
  completedContracts: number;
  onTimeRate: number;
  responseTime: string;
  startingDeposit: number;
  bio: string;
  skills: string[];
}

export const MOCK_FREELANCERS: VerifiedFreelancer[] = [
  {
    id: "user-mark-tan",
    username: "marktan_architect",
    fullName: "Ar. Mark Tan, UAP",
    title: "PRC Licensed Architect & Commercial BIM Specialist",
    avatarUrl: "/avatar.png",
    cluster: "Cluster 1: Tagum City",
    clusterCode: "CLUSTER_1_TAGUM",
    municipality: "Tagum City",
    verificationTier: 2,
    prcLicense: "PRC Architect #0038291",
    tin: "284-910-382-000",
    isBir2303Valid: true,
    rating: 4.98,
    totalReviews: 42,
    completedContracts: 45,
    onTimeRate: 100,
    responseTime: "< 20 mins",
    startingDeposit: 3000,
    bio: "Over 12 years drafting commercial building permits, structural drawings, and BIM models compliant with the National Building Code and Tagum City LGU ordinances.",
    skills: ["AutoCAD", "Revit BIM", "LGU Permitting", "Commercial Blueprints", "Fire Code"],
  },
  {
    id: "user-daryl-alcantara",
    username: "engr_daryl",
    fullName: "Engr. Daryl John M. Alcantara, PECE",
    title: "Senior Electronics & Communications Engineer | Industrial IoT",
    avatarUrl: "/avatar.png",
    cluster: "Cluster 3: Panabo City Corridor",
    clusterCode: "CLUSTER_3_PANABO_CORRIDOR",
    municipality: "Panabo City",
    verificationTier: 2,
    prcLicense: "PRC Electronics Engineer #004921",
    tin: "392-108-442-000",
    isBir2303Valid: true,
    rating: 4.97,
    totalReviews: 48,
    completedContracts: 54,
    onTimeRate: 100,
    responseTime: "< 30 mins",
    startingDeposit: 4500,
    bio: "Specializing in packing plant fiber cabling, cold storage SCADA sensors, and factory CCTV telemetry across Panabo Anflo Industrial Estate and Carmen banana corridors.",
    skills: ["Industrial IoT", "Fiber Optic", "SCADA", "CCTV", "PLC Automation"],
  },
  {
    id: "user-maria-santos",
    username: "maria_cpa",
    fullName: "Maria Carmela Santos, CPA",
    title: "Certified Public Accountant | BIR Tax Compliance Specialist",
    avatarUrl: "/avatar.png",
    cluster: "Cluster 1: Tagum City",
    clusterCode: "CLUSTER_1_TAGUM",
    municipality: "Tagum City",
    verificationTier: 2,
    prcLicense: "PRC CPA #0119284",
    tin: "194-829-103-000",
    isBir2303Valid: true,
    rating: 4.95,
    totalReviews: 36,
    completedContracts: 40,
    onTimeRate: 98,
    responseTime: "< 15 mins",
    startingDeposit: 2500,
    bio: "Assisting DavNor enterprises, cooperatives, and MSMEs with BIR Form 2307 quarterly compliance, financial statements, and BIR RDO 112 tax filings.",
    skills: ["BIR Form 2307", "Financial Audits", "QuickBooks", "Tax Filing", "Cooperative Bookkeeping"],
  },
  {
    id: "user-kristoff-ramos",
    username: "kristoff_dev",
    fullName: "Kristoff Ramos",
    title: "Full-Stack Software Engineer & Agri-ERP Architect",
    avatarUrl: "/avatar.png",
    cluster: "Cluster 2: Kapalong / Asuncion",
    clusterCode: "CLUSTER_2_KAPALONG_ASUNCION",
    municipality: "Kapalong",
    verificationTier: 3,
    tin: "402-991-823-000",
    isBir2303Valid: true,
    rating: 4.92,
    totalReviews: 29,
    completedContracts: 33,
    onTimeRate: 100,
    responseTime: "< 45 mins",
    startingDeposit: 5000,
    bio: "Building custom web applications, cooperative inventory systems, and crop telemetry dashboards for banana and cacao cooperatives in Kapalong and Asuncion.",
    skills: ["Next.js", "PostgreSQL", "Tailwind CSS", "Inventory Management", "Offline Sync"],
  },
  {
    id: "user-bea-alonto",
    username: "bea_creative",
    fullName: "Bea Alonto",
    title: "Creative Director & Commercial Drone Cinematographer",
    avatarUrl: "/avatar.png",
    cluster: "Cluster 4: Samal Island (IGaCoS)",
    clusterCode: "CLUSTER_4_SAMAL_ISLAND",
    municipality: "Island Garden City of Samal",
    verificationTier: 1,
    isBir2303Valid: false,
    rating: 4.94,
    totalReviews: 22,
    completedContracts: 25,
    onTimeRate: 96,
    responseTime: "< 1 hour",
    startingDeposit: 3500,
    bio: "Producing cinematic 4K promotional drone footage, eco-tourism resort portals, and agricultural export brand packages in Samal Island and Davao Gulf.",
    skills: ["Drone Videography", "Resort Branding", "UI/UX Design", "Figma", "Digital Marketing"],
  },
];

export interface MarketplaceService {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  freelancerId: string;
  freelancer: VerifiedFreelancer;
  cluster: string;
  clusterCode: string;
  municipality: string;
  startingDeposit: number;
  fullContractPrice: number;
  rating: number;
  reviewsCount: number;
  deliveryDays: number;
  thumbnailUrl: string;
  overview: string;
  milestones: {
    sequence: number;
    title: string;
    percentage: number;
    amount: number;
    description: string;
  }[];
}

export const MOCK_SERVICES: MarketplaceService[] = [
  {
    id: "srv-blueprint-01",
    title: "Complete Structural Blueprint Design & BIR-Compliant Permit Package",
    category: "Architecture & CAD",
    categorySlug: "architecture",
    freelancerId: "user-mark-tan",
    freelancer: MOCK_FREELANCERS[0],
    cluster: "Cluster 1: Tagum City",
    clusterCode: "CLUSTER_1_TAGUM",
    municipality: "Tagum City",
    startingDeposit: 3000,
    fullContractPrice: 15000,
    rating: 4.98,
    reviewsCount: 42,
    deliveryDays: 14,
    thumbnailUrl: "/blueprint-thumb.jpg",
    overview: "I will draft complete structural blueprints, architectural permit sets, and plumbing/electrical layouts for commercial and residential buildings across Davao del Norte.",
    milestones: [
      {
        sequence: 1,
        title: "Site Inspection & Preliminary Architectural Concept",
        percentage: 20,
        amount: 3000,
        description: "Zoning review, structural layout draft, and client sign-off.",
      },
      {
        sequence: 2,
        title: "Structural CAD Drawings, Electrical & Plumbing Sets",
        percentage: 50,
        amount: 7500,
        description: "Complete CAD schematics with bills of materials and load calculations.",
      },
      {
        sequence: 3,
        title: "Signed & Sealed Blueprints with LGU Permit Dossier",
        percentage: 30,
        amount: 4500,
        description: "Official engineer seals and municipal submission preparation for Tagum City Hall.",
      },
    ],
  },
  {
    id: "srv-iot-cctv-02",
    title: "Structured Fiber Optic & Enterprise CCTV Network Design for Packing Plants",
    category: "Civil & Industrial Tech",
    categorySlug: "industrial-tech",
    freelancerId: "user-daryl-alcantara",
    freelancer: MOCK_FREELANCERS[1],
    cluster: "Cluster 3: Panabo City Corridor",
    clusterCode: "CLUSTER_3_PANABO_CORRIDOR",
    municipality: "Panabo City",
    startingDeposit: 4500,
    fullContractPrice: 18000,
    rating: 4.97,
    reviewsCount: 48,
    deliveryDays: 10,
    thumbnailUrl: "/industrial-thumb.jpg",
    overview: "Design and implementation blueprint for fiber backbone, cold-storage telemetry, and IP camera surveillance for agricultural packing facilities.",
    milestones: [
      {
        sequence: 1,
        title: "Site Survey & Industrial Bandwidth Topology",
        percentage: 25,
        amount: 4500,
        description: "Physical route walk-through in Panabo or Carmen packing house.",
      },
      {
        sequence: 2,
        title: "Core Fiber Splicing Plan & Equipment Bill of Materials",
        percentage: 50,
        amount: 9000,
        description: "Detailed wiring schematics and cold-storage sensor integration.",
      },
      {
        sequence: 3,
        title: "UAT Network Stress Test & Security Hardening",
        percentage: 25,
        amount: 4500,
        description: "Full throughput certification, failover test, and staff handover.",
      },
    ],
  },
  {
    id: "srv-agri-erp-03",
    title: "Custom Inventory & Cooperative ERP Web App for Banana Producers",
    category: "IT & Software Systems",
    categorySlug: "software",
    freelancerId: "user-kristoff-ramos",
    freelancer: MOCK_FREELANCERS[3],
    cluster: "Cluster 2: Kapalong / Asuncion",
    clusterCode: "CLUSTER_2_KAPALONG_ASUNCION",
    municipality: "Kapalong",
    startingDeposit: 5000,
    fullContractPrice: 20000,
    rating: 4.92,
    reviewsCount: 29,
    deliveryDays: 21,
    thumbnailUrl: "/software-thumb.jpg",
    overview: "Offline-first responsive web system for harvest recording, grower payroll, and pallet barcode tracking tailored to DavNor agri-cooperatives.",
    milestones: [
      {
        sequence: 1,
        title: "Preliminary System Architecture & Database Schema",
        percentage: 25,
        amount: 5000,
        description: "PostgreSQL ERD, Next.js scaffolding, and harvest data models.",
      },
      {
        sequence: 2,
        title: "Core Module Coding & Barcode Scanner Integration",
        percentage: 50,
        amount: 10000,
        description: "Pallet tracking, inventory deduction, and offline caching logic.",
      },
      {
        sequence: 3,
        title: "Final User Testing & Cooperative Staff Training",
        percentage: 25,
        amount: 5000,
        description: "On-site UAT in Kapalong, staff training, and data backup rollout.",
      },
    ],
  },
  {
    id: "srv-tax-audit-04",
    title: "BIR Form 2307 Tax Dossier & Annual Financial Statement Review",
    category: "Tax & Bookkeeping",
    categorySlug: "tax-compliance",
    freelancerId: "user-maria-santos",
    freelancer: MOCK_FREELANCERS[2],
    cluster: "Cluster 1: Tagum City",
    clusterCode: "CLUSTER_1_TAGUM",
    municipality: "Tagum City",
    startingDeposit: 2500,
    fullContractPrice: 10000,
    rating: 4.95,
    reviewsCount: 36,
    deliveryDays: 7,
    thumbnailUrl: "/tax-thumb.jpg",
    overview: "Professional CPA review of withholding tax vouchers under BIR RR 16-2023, quarterly ledger reconciliation, and RDO 112 preparation.",
    milestones: [
      {
        sequence: 1,
        title: "General Ledger Audit & 2307 Withholding Recomputation",
        percentage: 50,
        amount: 5000,
        description: "Review of invoices, official receipts, and CWT rate compliance.",
      },
      {
        sequence: 2,
        title: "Final Certified BIR Tax Dossier & Filing Package",
        percentage: 50,
        amount: 5000,
        description: "Stamped compilation package ready for submission to BIR Tagum.",
      },
    ],
  },
  {
    id: "srv-resort-media-05",
    title: "Samal Beach Resort 4K Drone Showcase & Direct Booking Engine",
    category: "Creative Media",
    categorySlug: "creative-media",
    freelancerId: "user-bea-alonto",
    freelancer: MOCK_FREELANCERS[4],
    cluster: "Cluster 4: Samal Island (IGaCoS)",
    clusterCode: "CLUSTER_4_SAMAL_ISLAND",
    municipality: "Island Garden City of Samal",
    startingDeposit: 3500,
    fullContractPrice: 14000,
    rating: 4.94,
    reviewsCount: 22,
    deliveryDays: 12,
    thumbnailUrl: "/drone-thumb.jpg",
    overview: "Stunning 4K coastal drone videography paired with a responsive reservation microsite for tourism operators in Samal Island.",
    milestones: [
      {
        sequence: 1,
        title: "Samal Island Drone Flight & Raw Footage Logging",
        percentage: 30,
        amount: 4200,
        description: "Aerial sweeps of beachfront, villas, and water sports amenities.",
      },
      {
        sequence: 2,
        title: "Color Graded 4K Commercial Video & Brand Collateral",
        percentage: 40,
        amount: 5600,
        description: "Edited 60s promo and vertical reels for social channels.",
      },
      {
        sequence: 3,
        title: "Booking Microsite Deployment & GCash Payment Hook",
        percentage: 30,
        amount: 4200,
        description: "Mobile reservation form integrated with GCash QR rails.",
      },
    ],
  },
];

export interface ActiveContractOrder {
  orderNumber: string;
  contractTitle: string;
  buyerName: string;
  buyerCompany: string;
  freelancerName: string;
  freelancerTitle: string;
  freelancerAvatar: string;
  cluster: string;
  totalAmount: number;
  totalMilestones: number;
  currentMilestoneIndex: number;
  status: "ACTIVE" | "COMPLETED" | "DISPUTED";
  milestones: MilestoneState[];
  chatHistory: {
    id: string;
    sender: "BUYER" | "FREELANCER" | "SYSTEM";
    senderName: string;
    text: string;
    timestamp: string;
    isSystemAlert?: boolean;
    severity?: "LOW" | "CRITICAL";
  }[];
}

export const INITIAL_ORDERS: ActiveContractOrder[] = [
  {
    orderNumber: "KG-90241",
    contractTitle: "Custom Inventory Web App for Banana Packing House",
    buyerName: "Don Ricardo Floirendo",
    buyerCompany: "Panabo Distribution Logistics Inc.",
    freelancerName: "Kristoff Ramos",
    freelancerTitle: "Full-Stack Software Engineer (Kapalong)",
    freelancerAvatar: "/avatar.png",
    cluster: "Cluster 3: Panabo City Corridor",
    totalAmount: 20000,
    totalMilestones: 3,
    currentMilestoneIndex: 1, // Milestone 2 active
    status: "ACTIVE",
    milestones: [
      {
        id: "m-90241-1",
        contractId: "KG-90241",
        sequenceOrder: 1,
        title: "Milestone 1: Preliminary System Architecture & Database Schema",
        description: "PostgreSQL schema, Next.js scaffolding, and harvest data models.",
        escrowDeposit: 5000,
        withholdingTax: 25,
        platformFee: 0,
        netDisbursement: 4975,
        status: "FUNDS_RELEASED",
        deliverableFileName: "schema_v1_architecture.zip",
        deliverableHash: "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852a101",
        approvedAt: "2026-09-10T09:30:00Z",
      },
      {
        id: "m-90241-2",
        contractId: "KG-90241",
        sequenceOrder: 2,
        title: "Milestone 2: Database Setup & Barcode Scanner Integration",
        description: "Pallet tracking, inventory deduction, and offline caching logic.",
        escrowDeposit: 10000,
        withholdingTax: 50,
        platformFee: 0,
        netDisbursement: 9950,
        status: "UNDER_INSPECTION",
        deliverableFileName: "api_inventory_v2_barcode.zip",
        deliverableHash: "sha256:4f82c0b9148d2bc01a39f1c7d21b34e569a19c8f00127e3d12a9bc4123de7718",
        deliverableSubmittedAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
        inspectionEndAt: new Date(Date.now() + 36 * 3600 * 1000).toISOString(), // 36 hours remaining
      },
      {
        id: "m-90241-3",
        contractId: "KG-90241",
        sequenceOrder: 3,
        title: "Milestone 3: Final User Testing & Cooperative Staff Training",
        description: "On-site UAT in Panabo/Kapalong, staff training, and data backup rollout.",
        escrowDeposit: 5000,
        withholdingTax: 25,
        platformFee: 0,
        netDisbursement: 4975,
        status: "PENDING_DEPOSIT",
      },
    ],
    chatHistory: [
      {
        id: "c-1",
        sender: "SYSTEM",
        senderName: "Kugi Escrow Engine",
        text: "Contract KG-90241 initiated. Milestone 1 deposit of ₱5,000.00 vaulted in segregated trust account via GCash.",
        timestamp: "2026-09-08 08:30 AM",
        isSystemAlert: true,
      },
      {
        id: "c-2",
        sender: "BUYER",
        senderName: "Don Ricardo Floirendo",
        text: "Maayong adlaw, Kristoff! Please make sure the barcode schema supports both 12-digit and 14-digit standard packing boxes.",
        timestamp: "2026-09-08 09:15 AM",
      },
      {
        id: "c-3",
        sender: "FREELANCER",
        senderName: "Kristoff Ramos",
        text: "Good day, sir! Yes, I tested both EAN-13 and Code-128 barcode standards during Milestone 1. Deliverable for Milestone 1 is ready.",
        timestamp: "2026-09-10 09:00 AM",
      },
      {
        id: "c-4",
        sender: "SYSTEM",
        senderName: "Kugi Escrow Engine",
        text: "Milestone 1 Approved! ₱4,975.00 disbursed to Kristoff Ramos GCash. ₱25.00 reserved for BIR Form 2307 (RR 16-2023).",
        timestamp: "2026-09-10 09:30 AM",
        isSystemAlert: true,
      },
      {
        id: "c-5",
        sender: "SYSTEM",
        senderName: "Kugi Escrow Engine",
        text: "Milestone 2 deposit of ₱10,000.00 received and verified via GCash. Funds locked in Escrow.",
        timestamp: "2026-09-11 10:00 AM",
        isSystemAlert: true,
      },
      {
        id: "c-6",
        sender: "FREELANCER",
        senderName: "Kristoff Ramos",
        text: "Sir Don Ricardo, I have finished Milestone 2: Barcode integration & API endpoints. Submitted `api_inventory_v2_barcode.zip` (18.4 MB) with SHA-256 Checksum.",
        timestamp: "Yesterday at 10:15 AM",
      },
      {
        id: "c-7",
        sender: "SYSTEM",
        senderName: "Kugi Escrow Engine",
        text: "Deliverable uploaded: api_inventory_v2_barcode.zip. 72-Hour Inspection Clock initiated. Auto-release scheduled if no revisions requested.",
        timestamp: "Yesterday at 10:16 AM",
        isSystemAlert: true,
      },
    ],
  },
];
