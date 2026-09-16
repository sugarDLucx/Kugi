"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  ShieldCheck,
  Star,
  MapPin,
  Lock,
  FileCheck2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building,
  QrCode,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { MOCK_SERVICES } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/tax-calculator";
import { VerificationBadges } from "@/components/verification/VerificationBadges";

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params?.id as string;

  // Find service or fallback to first
  const service =
    MOCK_SERVICES.find((s) => s.id === serviceId) || MOCK_SERVICES[0];

  const [selectedPackage, setSelectedPackage] = useState<"basic" | "permit" | "enterprise">("permit");

  const packagePricing = {
    basic: { name: "Basic Drafting & Layout", deposit: 2000, total: 8000, days: 7 },
    permit: { name: "Full LGU Permit Package", deposit: service.startingDeposit, total: service.fullContractPrice, days: service.deliveryDays },
    enterprise: { name: "Commercial Enterprise Scope", deposit: 6000, total: 30000, days: 28 },
  };

  const activePlan = packagePricing[selectedPackage];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="text-xs text-slate-500 mb-3">
        <Link href="/" className="hover:text-cyan">Home</Link> /{" "}
        <Link href="/services" className="hover:text-cyan">Services</Link> /{" "}
        <span className="text-slate-800 font-semibold">{service.category}</span>
      </div>

      {/* Title & Provider Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-navy leading-tight mb-4">
          {service.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-emerald bg-slate-100">
              <Image
                src={service.freelancer.avatarUrl}
                alt={service.freelancer.fullName}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-navy">
                  {service.freelancer.fullName}
                </span>
                <span className="text-xs text-slate-500">• {service.freelancer.municipality} ({service.cluster})</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <VerificationBadges
                  tier={service.freelancer.verificationTier}
                  prcLicense={service.freelancer.prcLicense}
                  isBirValid={service.freelancer.isBir2303Valid}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-1 text-amber">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold text-sm">{service.rating.toFixed(2)}</span>
              <span className="text-slate-400">({service.reviewsCount} DavNor contracts)</span>
            </div>
            <div className="hidden sm:block h-6 w-px bg-slate-200" />
            <div className="text-emerald font-bold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Escrow Protected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: 65% DETAILED SCOPE */}
        <div className="lg:col-span-8 space-y-8">
          {/* Watermarked Portfolio Preview */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden relative border border-slate-800 shadow-md">
            <div className="h-64 sm:h-80 bg-gradient-to-tr from-navy via-slate-900 to-cyan/20 flex items-center justify-center p-6 text-center relative">
              {/* Security Watermark Stamp */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 rotate-[-15deg] select-none">
                <div className="border-4 border-white px-8 py-4 rounded-2xl text-2xl font-bold tracking-widest text-white uppercase font-mono-currency">
                  VERIFIED BY KUGI ESCROW ENGINE • DVO-2026
                </div>
              </div>

              <div className="relative z-10 space-y-2 text-white max-w-lg">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald text-white text-xs font-bold shadow-md">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticity Verified & Cryptographically Watermarked</span>
                </div>
                <h3 className="text-lg font-bold text-slate-100">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-400 font-mono-currency">
                  SHA-256 Checksum: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                </p>
              </div>
            </div>
            <div className="bg-slate-950 px-4 py-2.5 flex items-center justify-between text-[11px] text-slate-400">
              <span>Full un-watermarked high-res CAD & blueprints released upon final milestone approval.</span>
              <span className="text-cyan font-mono-currency font-semibold">Protected Asset</span>
            </div>
          </div>

          {/* Scope Breakdown */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-navy uppercase tracking-wider">
              Scope of Work & Institutional Compliance
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              {service.overview} All architectural, civil, and software blueprints comply with the National Building Code of the Philippines (PD 1096), Fire Code of the Philippines (RA 9514), and Davao del Norte municipal building official regulations (Tagum City Hall, Panabo Engineering Office, and Samal LGU).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald mt-0.5 shrink-0" />
                <div className="text-xs">
                  <strong className="text-navy block">LGU Permitting Readiness</strong>
                  <span className="text-slate-500">Drafted to pass the Office of the Building Official (OBO) scrutiny.</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald mt-0.5 shrink-0" />
                <div className="text-xs">
                  <strong className="text-navy block">PRC Signed & Sealed</strong>
                  <span className="text-slate-500">Includes official license verification stamps for local submission.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phased Milestone Delivery Schedule Table */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-navy uppercase tracking-wider">
                Milestone Escrow Delivery Plan
              </h2>
              <span className="text-xs text-emerald font-bold">
                Sequential Deposit-First Escrow
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Work is executed in phased milestones. You fund each milestone deposit sequentially. Funds are held in escrow and released only after your 72-hour review and sign-off.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Phase</th>
                    <th className="p-3">Deliverable Scope</th>
                    <th className="p-3">Split</th>
                    <th className="p-3 text-right">Escrow Deposit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {service.milestones.map((m) => (
                    <tr key={m.sequence} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-bold text-navy">Milestone {m.sequence}</td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-900">{m.title}</div>
                        <div className="text-[11px] text-slate-500">{m.description}</div>
                      </td>
                      <td className="p-3 font-mono-currency text-slate-600 font-medium">
                        {m.percentage}%
                      </td>
                      <td className="p-3 text-right font-mono-currency font-bold text-navy">
                        {formatCurrency(m.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Professional Credentials & Tax Licensure */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-navy uppercase tracking-wider">
              Verified Professional Licensure
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">PRC License No.</span>
                <span className="font-mono-currency font-bold text-sm text-navy">
                  {service.freelancer.prcLicense || "Verified Professional"}
                </span>
                <span className="text-[10px] text-emerald block mt-1">Active in LERIS Database</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">TIN Verification</span>
                <span className="font-mono-currency font-bold text-sm text-navy">
                  {service.freelancer.tin || "284-***-***-000"}
                </span>
                <span className="text-[10px] text-emerald block mt-1">BIR Form 2303 Registered</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Local Jurisdiction</span>
                <span className="font-bold text-sm text-navy">
                  {service.freelancer.municipality}
                </span>
                <span className="text-[10px] text-cyan block mt-1">RDO 112 - Tagum Core</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 35% STICKY ESCROW CHECKOUT CARD */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-white rounded-2xl p-6 border border-slate-200 shadow-lg space-y-5">
            {/* Package Switcher */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Select Package
              </label>
              <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl text-[11px] font-bold">
                <button
                  onClick={() => setSelectedPackage("basic")}
                  className={`py-2 rounded-lg transition-all ${
                    selectedPackage === "basic" ? "bg-white text-navy shadow-xs" : "text-slate-600"
                  }`}
                >
                  Basic
                </button>
                <button
                  onClick={() => setSelectedPackage("permit")}
                  className={`py-2 rounded-lg transition-all ${
                    selectedPackage === "permit" ? "bg-white text-navy shadow-xs" : "text-slate-600"
                  }`}
                >
                  Permit
                </button>
                <button
                  onClick={() => setSelectedPackage("enterprise")}
                  className={`py-2 rounded-lg transition-all ${
                    selectedPackage === "enterprise" ? "bg-white text-navy shadow-xs" : "text-slate-600"
                  }`}
                >
                  Enterprise
                </button>
              </div>
            </div>

            {/* Total Contract & Scope */}
            <div>
              <span className="text-xs text-slate-500 block">Total Agreed Contract Amount</span>
              <div className="font-mono-currency text-3xl font-bold text-navy mt-0.5">
                {formatCurrency(activePlan.total)}
              </div>
              <p className="text-xs text-slate-500 mt-1">{activePlan.name} • ~{activePlan.days} days delivery</p>
            </div>

            {/* Escrow Protection Box */}
            <div className="bg-emerald text-white p-4 rounded-xl space-y-1.5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Milestone Escrow Guarantee</span>
              </div>
              <p className="text-[11px] text-emerald-100 leading-relaxed">
                Your capital remains safely vaulted in an isolated trust account. The contractor only gets disbursed once you inspect and approve each milestone deliverable.
              </p>
            </div>

            {/* Initial Deposit Required Today */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                Deposit Due Today to Start
              </span>
              <div className="flex items-baseline justify-between">
                <span className="font-mono-currency text-2xl font-bold text-navy">
                  {formatCurrency(activePlan.deposit)}
                </span>
                <span className="text-[11px] text-emerald font-semibold">Milestone 1 Vault</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <Link
                href={`/checkout?serviceId=${service.id}&deposit=${activePlan.deposit}`}
                className="w-full py-3.5 px-4 bg-cyan hover:bg-cyan-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Fund Escrow & Start Milestone 1</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/messages/KG-90241"
                className="w-full py-2.5 px-4 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-slate-500" />
                <span>Message {service.freelancer.fullName}</span>
              </Link>
            </div>

            {/* Supported Local Payment Rails */}
            <div className="pt-3 border-t border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                Instant Settlement Rails
              </span>
              <div className="flex items-center justify-center gap-3 text-xs font-bold text-slate-600">
                <span className="px-2 py-0.5 rounded bg-slate-100 text-blue-600">GCash</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-green-600">Maya</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800">QR Ph</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-amber-700">UnionBank</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
