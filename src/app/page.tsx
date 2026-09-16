"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Star,
  Building2,
  Code2,
  FileSpreadsheet,
  Palette,
  HardHat,
  Cpu,
  ChevronRight,
  Award,
} from "lucide-react";
import { DAVNOR_CLUSTERS, MOCK_FREELANCERS, MOCK_SERVICES } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/tax-calculator";
import { VerificationBadges } from "@/components/verification/VerificationBadges";

export default function HomePage() {
  const router = useRouter();
  const [selectedCluster, setSelectedCluster] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/services?q=${encodeURIComponent(searchQuery)}&cluster=${selectedCluster}`);
  };

  const categories = [
    {
      title: "IT & Web Software",
      icon: Code2,
      desc: "Custom POS, cooperative inventory management, and cloud database systems.",
      count: "42 experts in DavNor",
      color: "text-cyan",
      bg: "bg-cyan/10",
      query: "software",
    },
    {
      title: "Architecture & CAD Blueprints",
      icon: Building2,
      desc: "Commercial permit sets, structural load calculations, and BIM 3D models.",
      count: "38 licensed architects",
      color: "text-navy",
      bg: "bg-navy/10",
      query: "architecture",
    },
    {
      title: "Tax & Enterprise Compliance",
      icon: FileSpreadsheet,
      desc: "BIR Form 2307 vouchers, quarterly bookkeeping, and financial statement audits.",
      count: "29 certified CPAs",
      color: "text-amber",
      bg: "bg-amber/10",
      query: "tax-compliance",
    },
    {
      title: "Multimedia & Agri-Branding",
      icon: Palette,
      desc: "Banana & cacao export packaging design, corporate identity, and 4K drone cinematography.",
      count: "35 creative studios",
      color: "text-purple-600",
      bg: "bg-purple-100",
      query: "creative-media",
    },
    {
      title: "Civil & Farm Tech",
      icon: HardHat,
      desc: "Solar water pumping blueprints, drone elevation surveying, and drip irrigation plans.",
      count: "27 civil specialists",
      color: "text-emerald",
      bg: "bg-emerald/10",
      query: "industrial-tech",
    },
    {
      title: "Technical Equipment & SCADA",
      icon: Cpu,
      desc: "Cold storage SCADA telemetry, factory PLC automation, and industrial fiber networks.",
      count: "19 industrial engineers",
      color: "text-blue-600",
      bg: "bg-blue-100",
      query: "industrial-tech",
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* HERO SECTION (Davao Deep Navy) */}
      <section className="relative w-full bg-[#0A192F] text-white overflow-hidden py-16 md:py-24">
        {/* Ambient Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-emerald/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Provincial Network Pill */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-cyan-fixed text-xs font-semibold border border-white/15">
              <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
              <span>Davao del Norte Multi-Cluster Network</span>
            </div>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-xs text-slate-300 italic font-medium">
              “Trabahong lokal, kalidad nga kasaligan”
            </span>
          </div>

          {/* Main Headline & Search Dock */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Hire Verified <span className="text-cyan">Davao del Norte</span> Experts with 100% Milestone Escrow Protection.
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Empowering local enterprises, cooperatives, and MSMEs to collaborate with licensed engineers, software developers, certified accountants, and creative talent across all 11 LGUs of DavNor.
              </p>

              {/* Interactive Search & Cluster Filtration Dock */}
              <form
                onSubmit={handleSearch}
                className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-2 text-slate-800"
              >
                <div className="flex items-center w-full md:w-auto px-3 py-2 gap-2 bg-slate-100 rounded-xl md:bg-transparent">
                  <MapPin className="w-4 h-4 text-cyan shrink-0" />
                  <select
                    value={selectedCluster}
                    onChange={(e) => setSelectedCluster(e.target.value)}
                    className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer pr-2"
                  >
                    <option value="all">All 11 LGUs (All DavNor)</option>
                    {DAVNOR_CLUSTERS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="hidden md:block w-px h-8 bg-slate-200" />

                <div className="flex items-center flex-1 w-full px-3 py-2 gap-2">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 'CAD architectural permit', 'BIR 2307 bookkeeper'..."
                    className="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 rounded-xl bg-cyan hover:bg-cyan-600 text-white transition-all text-xs font-bold flex items-center justify-center gap-2 shrink-0 shadow-md"
                >
                  <span>Find DavNor Talent</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Category Discovery Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-300">
                <span className="text-slate-400 uppercase tracking-wider text-[11px] font-bold">Trending:</span>
                <Link href="/services?category=software" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  IT & Software
                </Link>
                <Link href="/services?category=architecture" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  Architectural Plans
                </Link>
                <Link href="/services?category=tax-compliance" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  BIR Bookkeeping
                </Link>
                <Link href="/services?category=creative-media" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  Agri-Branding
                </Link>
              </div>
            </div>

            {/* Right Hero Card: Live Autonomous Escrow Vault Simulation */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-white text-slate-900 shadow-2xl relative border border-slate-100">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald" />
                    <span className="text-xs font-bold text-navy uppercase tracking-wider">
                      Autonomous Escrow Engine
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono-currency bg-emerald/15 text-emerald font-bold uppercase">
                    Vault Secured
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Order #KG-90241</span>
                      <span className="text-emerald font-bold">Inspection Active</span>
                    </div>
                    <div className="font-bold text-sm text-navy">
                      Banana Packing Plant Inventory Web App
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-slate-500">Escrow Locked:</span>
                      <span className="font-mono-currency text-base font-bold text-navy">
                        ₱10,000.00
                      </span>
                    </div>
                  </div>

                  {/* 72-Hour Inspection Protocol Callout */}
                  <div className="bg-[#0A192F] text-white p-3.5 rounded-xl space-y-1 text-center">
                    <div className="text-[11px] text-cyan-fixed font-bold uppercase">
                      72-Hour Inspection Countdown
                    </div>
                    <div className="font-mono-currency text-2xl font-bold text-white">
                      36h 15m 42s
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Deliverable SHA-256 hash verified. Auto-release sweeps upon expiry.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="text-slate-500">Tax Withholding:</div>
                      <div className="font-mono-currency font-bold text-amber">0.5% BIR 2307</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="text-slate-500">Payout Rails:</div>
                      <div className="font-bold text-slate-800">GCash / Maya</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero 3 Interactive Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/10">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-emerald/20 flex items-center justify-center text-emerald shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="font-mono-currency text-xl font-bold text-white">₱0 Risk Deposit</div>
                <div className="text-xs text-slate-400">Funds locked until you inspect and approve</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-cyan/20 flex items-center justify-center text-cyan shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-mono-currency text-xl font-bold text-white">1,200+ Verified</div>
                <div className="text-xs text-slate-400">PhilSys National ID & PRC License Validated</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-amber/20 flex items-center justify-center text-amber shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="font-mono-currency text-xl font-bold text-white">DTI & BIR Compliant</div>
                <div className="text-xs text-slate-400">RA 11967 Trustmark & Form 2307 Automated</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY GRID SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="text-xs font-bold text-cyan uppercase tracking-wider mb-1">
              Provincial Competencies
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy">
              Explore Davao del Norte Service Sectors
            </h2>
          </div>
          <Link
            href="/services"
            className="text-xs font-bold text-cyan hover:text-navy transition-colors flex items-center gap-1 mt-3 md:mt-0"
          >
            <span>View all 160+ services</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                href={`/services?category=${cat.query}`}
                className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-cyan hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${cat.bg} flex items-center justify-center ${cat.color} mb-4 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-navy group-hover:text-cyan transition-colors mb-1.5">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {cat.desc}
                </p>
                <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span>{cat.count}</span>
                  <span className="text-cyan group-hover:translate-x-1 transition-transform">
                    Explore →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* HOW ESCROW PROTECTS YOUR CAPITAL (3-STEP PROGRESSION) */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold text-emerald uppercase tracking-wider mb-1">
              Guaranteed Trust Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy">
              How Kugi Protects Your Business Capital
            </h2>
            <p className="text-xs text-slate-600 mt-2">
              Every peso remains safe in segregated trust accounts. Freelancers are assured of payment, while clients only pay for verified, compliant deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-cyan text-white font-bold flex items-center justify-center mb-4 text-sm shadow-md">
                1
              </div>
              <h3 className="text-base font-bold text-navy mb-2">
                Deposit Milestone in Escrow
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Client funds the first milestone via GCash, Maya, QR Ph, or LandBank. Capital is securely vaulted in Kugi’s isolated trust escrow account.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-navy text-white font-bold flex items-center justify-center mb-4 text-sm shadow-md">
                2
              </div>
              <h3 className="text-base font-bold text-navy mb-2">
                Deliverables Upload & SHA-256 Audit
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                DavNor freelancer executes work and submits blueprints, source code, or audited accounts. Deliverable files are cryptographically watermarked and hashed.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-emerald text-white font-bold flex items-center justify-center mb-4 text-sm shadow-md">
                3
              </div>
              <h3 className="text-base font-bold text-navy mb-2">
                72-Hour Inspection & Release
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Buyer approves the milestone or requests revisions within 72 hours. Upon sign-off, net funds disburse directly to freelancer GCash with automated BIR 2307 deductions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROVINCIAL TALENT CAROUSEL / GRID */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-bold text-cyan uppercase tracking-wider mb-1">
              Verified Professionals
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy">
              Featured Davao del Norte Experts
            </h2>
          </div>
          <Link
            href="/services"
            className="text-xs font-bold text-cyan hover:text-navy transition-colors flex items-center gap-1"
          >
            <span>Explore all directory</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_FREELANCERS.slice(0, 3).map((f) => (
            <div
              key={f.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3.5 mb-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100 ring-2 ring-emerald shrink-0">
                    <Image
                      src={f.avatarUrl}
                      alt={f.fullName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-navy leading-snug">
                      {f.fullName}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{f.title}</p>
                    <div className="flex items-center gap-1 text-[11px] text-amber mt-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold">{f.rating.toFixed(2)}</span>
                      <span className="text-slate-400">({f.totalReviews} contracts)</span>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <VerificationBadges
                    tier={f.verificationTier}
                    prcLicense={f.prcLicense}
                    isBirValid={f.isBir2303Valid}
                  />
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {f.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Starting Milestone</div>
                  <div className="font-mono-currency font-bold text-sm text-navy">
                    {formatCurrency(f.startingDeposit)}
                  </div>
                </div>

                <Link
                  href={`/profile/${f.username}`}
                  className="px-3 py-1.5 rounded-lg bg-navy hover:bg-cyan text-white text-xs font-semibold transition-colors"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-cyan py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Ready to contract trusted DavNor talent?
            </h2>
            <p className="text-sm text-cyan-fixed">
              Post your project requirements and structure sequential milestones in under 5 minutes.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/projects/new"
              className="bg-navy hover:bg-navy-800 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-md"
            >
              Post a Project
            </Link>
            <Link
              href="/signup"
              className="bg-white hover:bg-slate-100 text-navy text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-md"
            >
              Join as Freelancer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
