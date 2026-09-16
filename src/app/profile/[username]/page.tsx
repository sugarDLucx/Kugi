"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  ShieldCheck,
  Star,
  MapPin,
  Award,
  CheckCircle2,
  Lock,
  MessageSquare,
  FileCheck2,
  Clock,
  Briefcase,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { MOCK_FREELANCERS, MOCK_SERVICES } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/tax-calculator";
import { VerificationBadges } from "@/components/verification/VerificationBadges";

export default function FreelancerProfilePage() {
  const params = useParams();
  const username = params?.username as string;

  const freelancer =
    MOCK_FREELANCERS.find((f) => f.username === username) ||
    MOCK_FREELANCERS[1] ||
    MOCK_FREELANCERS[0];

  const freelancerServices = MOCK_SERVICES.filter(
    (s) => s.freelancerId === freelancer.id
  );

  const [activeTab, setActiveTab] = useState<"services" | "portfolio" | "reviews" | "credentials">("services");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Cover Banner */}
        <div className="h-44 sm:h-56 bg-gradient-to-r from-[#0A192F] via-[#0D1C32] to-cyan/40 relative p-6 flex items-end">
          <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-cyan-fixed text-xs font-semibold">
            {freelancer.cluster}
          </span>
        </div>

        {/* Profile Info Row */}
        <div className="p-6 sm:p-8 pt-0 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden bg-white p-1 ring-4 ring-emerald shadow-xl shrink-0">
                <Image
                  src={freelancer.avatarUrl}
                  alt={freelancer.fullName}
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-navy">
                    {freelancer.fullName}
                  </h1>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald" title="Available for DavNor contracts" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 max-w-xl">
                  {freelancer.title}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan" />
                  <span>{freelancer.municipality} • {freelancer.cluster}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/messages/KG-90241"
                className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4 text-cyan" />
                <span>Message</span>
              </Link>
              <Link
                href={`/checkout?serviceId=${freelancerServices[0]?.id || "srv-iot-cctv-02"}`}
                className="px-5 py-2.5 bg-cyan hover:bg-cyan-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>Book Service</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Verification Badges Stack */}
          <div className="pb-6 border-b border-slate-100">
            <VerificationBadges
              tier={freelancer.verificationTier}
              prcLicense={freelancer.prcLicense}
              isBirValid={freelancer.isBir2303Valid}
            />
          </div>

          {/* Quick Stats Matrix (4 Columns) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Contracts in DavNor
              </span>
              <span className="font-mono-currency text-xl font-bold text-navy">
                {freelancer.completedContracts} completed
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Client Rating
              </span>
              <div className="flex items-center gap-1 text-amber">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-mono-currency text-xl font-bold text-navy">
                  {freelancer.rating.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400">({freelancer.totalReviews})</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Escrow Release Rate
              </span>
              <span className="font-mono-currency text-xl font-bold text-emerald">
                {freelancer.onTimeRate}% on-time
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Response Time
              </span>
              <span className="font-mono-currency text-xl font-bold text-cyan">
                {freelancer.responseTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content & Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Columns: Tabs */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveTab("services")}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === "services"
                  ? "bg-navy text-white shadow-xs"
                  : "text-slate-600 hover:text-navy hover:bg-slate-100"
              }`}
            >
              Services &amp; Packages
            </button>
            <button
              onClick={() => setActiveTab("portfolio")}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === "portfolio"
                  ? "bg-navy text-white shadow-xs"
                  : "text-slate-600 hover:text-navy hover:bg-slate-100"
              }`}
            >
              Verified Deliverables &amp; CAD
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === "reviews"
                  ? "bg-navy text-white shadow-xs"
                  : "text-slate-600 hover:text-navy hover:bg-slate-100"
              }`}
            >
              Double-Blind Reviews ({freelancer.totalReviews})
            </button>
            <button
              onClick={() => setActiveTab("credentials")}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === "credentials"
                  ? "bg-navy text-white shadow-xs"
                  : "text-slate-600 hover:text-navy hover:bg-slate-100"
              }`}
            >
              PRC &amp; Licensure
            </button>
          </div>

          {/* TAB 1: SERVICES */}
          {activeTab === "services" && (
            <div className="space-y-4">
              {freelancerServices.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 hover:border-cyan/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-cyan font-mono-currency">
                        {srv.category}
                      </span>
                      <h3 className="text-base font-bold text-navy mt-0.5">
                        {srv.title}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-400 block">Initial Milestone</span>
                      <span className="font-mono-currency font-bold text-lg text-navy">
                        {formatCurrency(srv.startingDeposit)}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {srv.overview}
                  </p>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <span className="font-bold text-slate-700 block">Included Phased Milestones:</span>
                    <ul className="space-y-1 text-slate-600 list-disc list-inside">
                      {srv.milestones.map((m) => (
                        <li key={m.sequence}>
                          Phase {m.sequence}: {m.title} ({m.percentage}%) — {formatCurrency(m.amount)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-emerald font-bold flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>100% Escrow Protected</span>
                    </span>
                    <Link
                      href={`/checkout?serviceId=${srv.id}`}
                      className="px-4 py-2 bg-cyan hover:bg-cyan-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                    >
                      Fund Escrow &amp; Book Service
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: PORTFOLIO */}
          {activeTab === "portfolio" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
                  <div className="h-40 rounded-xl bg-slate-900 text-white p-4 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center opacity-15 rotate-[-15deg] pointer-events-none">
                      <span className="border-2 border-white px-4 py-2 font-mono-currency font-bold text-sm">
                        KUGI WATERMARK
                      </span>
                    </div>
                    <span className="text-[10px] font-mono-currency text-cyan">
                      Panabo Cold Chain Facility
                    </span>
                    <span className="font-bold text-xs">
                      Fiber Backbone &amp; Sensor Telemetry CAD
                    </span>
                    <span className="text-[9px] font-mono-currency text-slate-400">
                      SHA-256 Checksum Verified
                    </span>
                  </div>
                  <div className="text-xs text-slate-600">
                    Structured fiber distribution schematics and temperature sensor telemetry for export packing house.
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
                  <div className="h-40 rounded-xl bg-slate-900 text-white p-4 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center opacity-15 rotate-[-15deg] pointer-events-none">
                      <span className="border-2 border-white px-4 py-2 font-mono-currency font-bold text-sm">
                        KUGI WATERMARK
                      </span>
                    </div>
                    <span className="text-[10px] font-mono-currency text-cyan">
                      Kapalong Solar Plant
                    </span>
                    <span className="font-bold text-xs">
                      Solar Telemetry Remote Monitoring Node
                    </span>
                    <span className="text-[9px] font-mono-currency text-slate-400">
                      SHA-256 Checksum Verified
                    </span>
                  </div>
                  <div className="text-xs text-slate-600">
                    Custom IoT transmitter logic connecting agricultural irrigation pumps to central cloud dashboard.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: REVIEWS */}
          {activeTab === "reviews" && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-xs text-navy">
                      Davao Fresh Banana Corp. (Panabo Anflo Industrial Estate)
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Order #KG-88190 • Packing Line Sensor Calibration
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>5.0</span>
                  </div>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  “Engr. Daryl delivered the complete wiring and SCADA schematic 3 days ahead of the milestone deadline. Escrow release was smooth and BIR Form 2307 was generated automatically.”
                </p>
                <div className="grid grid-cols-4 gap-2 text-[10px] pt-2 border-t border-slate-100 text-slate-500">
                  <div>Quality: <strong>5.0</strong></div>
                  <div>Timeline: <strong>5.0</strong></div>
                  <div>Comms: <strong>5.0</strong></div>
                  <div>Compliance: <strong>5.0</strong></div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CREDENTIALS */}
          {activeTab === "credentials" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-navy uppercase tracking-wider">
                Audited Institutional Credentials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">PRC Registration</span>
                  <div className="font-mono-currency font-bold text-sm text-navy">
                    {freelancer.prcLicense || "Registered"}
                  </div>
                  <span className="text-[10px] text-emerald block">Verified in LERIS Database</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Tax Registration</span>
                  <div className="font-mono-currency font-bold text-sm text-navy">
                    TIN: {freelancer.tin || "284-***-***-000"}
                  </div>
                  <span className="text-[10px] text-emerald block">BIR Form 2303 Validated</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right 4 Columns: Sticky Hire Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-24 bg-white rounded-2xl p-6 border border-slate-200 shadow-lg space-y-5">
            <h3 className="font-bold text-sm text-navy uppercase tracking-wider">
              Direct Contract / Custom Scope
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Engage {freelancer.fullName} for a customized project in Davao del Norte with structured sequential milestones.
            </p>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                Standard Initial Deposit
              </span>
              <span className="font-mono-currency text-2xl font-bold text-navy">
                {formatCurrency(freelancer.startingDeposit)}
              </span>
              <span className="text-[11px] text-emerald font-semibold block">
                Vaulted in Kugi Escrow
              </span>
            </div>

            <div className="space-y-2">
              <Link
                href="/projects/new"
                className="w-full py-3 bg-cyan hover:bg-cyan-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>Propose Milestone Contract</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/messages/KG-90241"
                className="w-full py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-cyan" />
                <span>Send Confidential Inquiry</span>
              </Link>
            </div>

            <div className="bg-emerald/10 p-3 rounded-xl border border-emerald/20 text-emerald text-[11px] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% Protected by Kugi Milestone Escrow Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
