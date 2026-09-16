"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Wallet,
  Lock,
  FileCheck2,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Repeat,
  ChevronRight,
  Upload,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { useKugiStore } from "@/lib/store";
import { formatCurrency } from "@/lib/tax-calculator";
import { VerificationBadges } from "@/components/verification/VerificationBadges";

export default function UnifiedDashboardPage() {
  const { activeRole, toggleRole, orders } = useKugiStore();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedOrderForUpload, setSelectedOrderForUpload] = useState<string>("KG-90241");
  const [fileNameInput, setFileNameInput] = useState("final_deliverable_v1.zip");

  const { submitDeliverable } = useKugiStore();

  const handleDeliverableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitDeliverable(selectedOrderForUpload, 2, fileNameInput);
    setUploadModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dashboard Top Header with Dual Role Switcher */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            <span>Unified Provincial Workspace</span>
            <span>•</span>
            <span className={activeRole === "BUYER" ? "text-cyan font-bold" : "text-emerald font-bold"}>
              {activeRole === "BUYER" ? "Buyer / Enterprise Mode" : "Freelancer / Pro Mode"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy">
            Welcome back, Ar. Mark Tan
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            PRC Architect #0038291 • Tagum City, Davao del Norte (Cluster 1 Core)
          </p>
        </div>

        {/* Animated Dual-Role Mode Switcher */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
          <button
            onClick={activeRole === "BUYER" ? undefined : toggleRole}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeRole === "BUYER"
                ? "bg-cyan text-white shadow-sm"
                : "text-slate-600 hover:text-navy"
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>Buyer Mode</span>
          </button>

          <button
            onClick={activeRole === "FREELANCER" ? undefined : toggleRole}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeRole === "FREELANCER"
                ? "bg-[#0A192F] text-white shadow-sm"
                : "text-slate-600 hover:text-navy"
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>Freelancer Mode</span>
          </button>
        </div>
      </div>

      {/* 4 Financial & Operational Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Withdrawable Balance */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase text-[10px] tracking-wider">Withdrawable Balance</span>
            <Wallet className="w-4 h-4 text-cyan" />
          </div>
          <div className="font-mono-currency text-2xl sm:text-3xl font-bold text-navy">
            ₱38,500.00
          </div>
          <p className="text-[11px] text-slate-500">
            Ready for instant sweep to GCash / Bank
          </p>
        </div>

        {/* Card 2: Funds Held in Escrow */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase text-[10px] tracking-wider">Funds in Escrow Vault</span>
            <Lock className="w-4 h-4 text-emerald" />
          </div>
          <div className="font-mono-currency text-2xl sm:text-3xl font-bold text-emerald">
            ₱21,000.00
          </div>
          <p className="text-[11px] text-slate-500">
            Locked across 3 active project milestones
          </p>
        </div>

        {/* Card 3: Projected BIR 2307 Tax Withholding */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase text-[10px] tracking-wider">BIR 2307 Tax Reserve</span>
            <FileCheck2 className="w-4 h-4 text-amber" />
          </div>
          <div className="font-mono-currency text-2xl sm:text-3xl font-bold text-amber">
            ₱192.50
          </div>
          <p className="text-[11px] text-slate-500">
            0.5% Creditable Withholding Tax (RR 16-2023)
          </p>
        </div>

        {/* Card 4: Active Contracts */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase text-[10px] tracking-wider">Active Contracts</span>
            <Briefcase className="w-4 h-4 text-navy" />
          </div>
          <div className="font-mono-currency text-2xl sm:text-3xl font-bold text-navy">
            {orders.length} In Execution
          </div>
          <p className="text-[11px] text-slate-500">
            100% on-time milestone delivery record
          </p>
        </div>
      </div>

      {/* Two-Column Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Active Escrow Contracts (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-navy uppercase tracking-wider">
              Active Milestone Contracts
            </h2>
            <Link
              href="/messages/KG-90241"
              className="text-xs font-bold text-cyan hover:text-navy transition-colors flex items-center gap-1"
            >
              <span>Go to Workroom</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {orders.map((ord) => {
              const activeMilestone =
                ord.milestones.find((m) => m.status === "UNDER_INSPECTION") ||
                ord.milestones.find((m) => m.status === "ESCROW_LOCKED" || m.status === "IN_PROGRESS") ||
                ord.milestones[0];

              return (
                <div
                  key={ord.orderNumber}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 hover:border-cyan/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono-currency text-cyan">
                          #{ord.orderNumber}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-600">{ord.cluster}</span>
                      </div>
                      <h3 className="font-bold text-base text-navy mt-0.5">
                        {ord.contractTitle}
                      </h3>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                        Total Contract
                      </span>
                      <span className="font-mono-currency font-bold text-base text-navy">
                        {formatCurrency(ord.totalAmount)}
                      </span>
                    </div>
                  </div>

                  {/* Buyer / Contractor Details */}
                  <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Client / Buyer:</span>
                      <span className="font-bold text-slate-800">{ord.buyerCompany} ({ord.buyerName})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px]">Active Phase:</span>
                      <span className="font-bold text-cyan">{activeMilestone?.title.split(":")[0]}</span>
                    </div>
                  </div>

                  {/* Status Banner & Action */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase ${
                          activeMilestone?.status === "UNDER_INSPECTION"
                            ? "bg-cyan/15 text-cyan-700"
                            : activeMilestone?.status === "FUNDS_RELEASED"
                            ? "bg-emerald/15 text-emerald-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        Status: {activeMilestone?.status.replace("_", " ")}
                      </span>
                      <span className="font-mono-currency text-xs font-semibold text-slate-700">
                        {formatCurrency(activeMilestone?.escrowDeposit || 0)} Locked
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedOrderForUpload(ord.orderNumber);
                          setUploadModalOpen(true);
                        }}
                        className="px-3.5 py-2 bg-cyan hover:bg-cyan-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Submit Deliverable</span>
                      </button>

                      <Link
                        href={`/messages/${ord.orderNumber}`}
                        className="px-3.5 py-2 bg-navy hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                      >
                        Open Workroom
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Provincial Trust & Compliance Widget (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* e-KYC Verification Status Widget */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-navy uppercase tracking-wider">
                Provincial e-KYC Status
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald text-white">
                100% Audited
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald mt-0.5 shrink-0" />
                <div>
                  <strong className="text-navy block">Level 1: PhilSys National ID</strong>
                  <span className="text-slate-500 text-[11px]">Biometric liveness check passed.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald mt-0.5 shrink-0" />
                <div>
                  <strong className="text-navy block">Level 2: PRC & BIR Tax Registered</strong>
                  <span className="text-slate-500 text-[11px]">LERIS database & BIR Form 2303 validated.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald mt-0.5 shrink-0" />
                <div>
                  <strong className="text-navy block">Level 3: Portfolio Plagiarism Scan</strong>
                  <span className="text-slate-500 text-[11px]">SHA-256 deliverable authenticity certified.</span>
                </div>
              </div>
            </div>

            <Link
              href="/trust-center"
              className="w-full block text-center py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
            >
              Manage Credentials & Badges
            </Link>
          </div>

          {/* Connected Payout GCash Wallet */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-navy uppercase tracking-wider">
              Verified Payout Rails
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Primary Wallet</div>
                <div className="font-bold text-xs text-blue-600">GCash Wallet</div>
                <div className="font-mono-currency text-xs text-slate-700 mt-0.5">
                  +63 917 *** 4921
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald/15 text-emerald">
                Verified
              </span>
            </div>

            <div className="text-[11px] text-slate-500">
              Approved milestone escrow funds sweep automatically to your connected GCash wallet within 10 minutes.
            </div>

            <Link
              href="/settings"
              className="w-full block text-center py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              Configure Banking & Payouts
            </Link>
          </div>
        </div>
      </div>

      {/* Deliverable Submission Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-navy">
                Upload Milestone Deliverable
              </h3>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Uploading a deliverable initiates the <strong>72-Hour Inspection Protocol</strong>. Kugi will cryptographically hash (SHA-256) and watermark the deliverable.
            </p>

            <form onSubmit={handleDeliverableSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Deliverable File Name / Package
                </label>
                <input
                  type="text"
                  value={fileNameInput}
                  onChange={(e) => setFileNameInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-mono-currency focus:outline-none focus:border-cyan"
                  placeholder="e.g. structural_permit_v2.zip"
                  required
                />
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center text-xs text-slate-500 bg-slate-50">
                <Upload className="w-6 h-6 text-cyan mx-auto mb-2" />
                <span>Drag and drop blueprints, CAD files, or source archives</span>
                <span className="block text-[10px] text-slate-400 mt-1">
                  Supports .zip, .dwg, .pdf up to 150MB
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan hover:bg-cyan-600 text-white text-xs font-bold shadow-sm"
                >
                  Submit & Start 72-Hr Inspection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
