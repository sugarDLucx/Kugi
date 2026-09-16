"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  CheckCircle2,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Building,
  Lock,
} from "lucide-react";
import { formatCurrency, calculateTaxWithholding } from "@/lib/tax-calculator";
import { DAVNOR_CLUSTERS } from "@/lib/mock-data";

interface MilestoneDraft {
  sequence: number;
  title: string;
  scopePercentage: number;
  depositAmount: number;
  estimatedDays: number;
}

export default function ProjectBuilderPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [title, setTitle] = useState("Automated Inventory & POS Software for Tagum Agricultural Supply");
  const [category, setCategory] = useState("IT & Software Systems");
  const [scopeDetails, setScopeDetails] = useState(
    "Development of a custom offline-first barcode inventory and point-of-sale system for wholesale agricultural fertilizers and seed supplies in Tagum City."
  );
  const [modality, setModality] = useState<"remote" | "onsite" | "hybrid">("hybrid");
  const [selectedCluster, setSelectedCluster] = useState("cluster-1");
  const [minTier, setMinTier] = useState(2);

  // Phased Milestones
  const [milestones, setMilestones] = useState<MilestoneDraft[]>([
    {
      sequence: 1,
      title: "Preliminary System Architecture & Database Schema",
      scopePercentage: 25,
      depositAmount: 5000,
      estimatedDays: 7,
    },
    {
      sequence: 2,
      title: "Core Module Coding & POS Hardware Integration",
      scopePercentage: 50,
      depositAmount: 10000,
      estimatedDays: 14,
    },
    {
      sequence: 3,
      title: "Final User Testing & Staff Training on-site in Tagum",
      scopePercentage: 25,
      depositAmount: 5000,
      estimatedDays: 5,
    },
  ]);

  const [agreeEscrow, setAgreeEscrow] = useState(true);
  const [published, setPublished] = useState(false);

  const totalContract = milestones.reduce((sum, m) => sum + m.depositAmount, 0);
  const initialDeposit = milestones[0]?.depositAmount || 0;
  const taxCalc = calculateTaxWithholding(initialDeposit);

  const addMilestone = () => {
    const nextSeq = milestones.length + 1;
    setMilestones([
      ...milestones,
      {
        sequence: nextSeq,
        title: `Milestone ${nextSeq}: Additional Deliverable Phase`,
        scopePercentage: 20,
        depositAmount: 3000,
        estimatedDays: 7,
      },
    ]);
  };

  const removeMilestone = (idx: number) => {
    if (milestones.length <= 1) return;
    setMilestones(milestones.filter((_, i) => i !== idx));
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setPublished(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs text-slate-500 mb-1">
          <Link href="/dashboard" className="hover:text-cyan">Dashboard</Link> / <span>Post a Project</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy">
          Create a Project &amp; Define Milestone Escrow Scope
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Hire verified talent across Tagum, Panabo, Kapalong, and Samal with protected sequential milestone payments.
        </p>
      </div>

      {/* 4-Step Wizard Stepper */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between text-xs font-bold">
          <button
            onClick={() => setStep(1)}
            className={`flex items-center gap-1.5 ${step >= 1 ? "text-cyan font-bold" : "text-slate-400"}`}
          >
            <span className="w-5 h-5 rounded-full bg-cyan/15 text-cyan flex items-center justify-center text-[10px]">1</span>
            <span className="hidden sm:inline">Project Basics</span>
          </button>
          <span className="text-slate-300">→</span>
          <button
            onClick={() => setStep(2)}
            className={`flex items-center gap-1.5 ${step >= 2 ? "text-cyan font-bold" : "text-slate-400"}`}
          >
            <span className="w-5 h-5 rounded-full bg-cyan/15 text-cyan flex items-center justify-center text-[10px]">2</span>
            <span className="hidden sm:inline">DavNor Location</span>
          </button>
          <span className="text-slate-300">→</span>
          <button
            onClick={() => setStep(3)}
            className={`flex items-center gap-1.5 ${step >= 3 ? "text-cyan font-bold" : "text-slate-400"}`}
          >
            <span className="w-5 h-5 rounded-full bg-cyan/15 text-cyan flex items-center justify-center text-[10px]">3</span>
            <span className="hidden sm:inline">Milestone Escrow</span>
          </button>
          <span className="text-slate-300">→</span>
          <button
            onClick={() => setStep(4)}
            className={`flex items-center gap-1.5 ${step >= 4 ? "text-cyan font-bold" : "text-slate-400"}`}
          >
            <span className="w-5 h-5 rounded-full bg-cyan/15 text-cyan flex items-center justify-center text-[10px]">4</span>
            <span className="hidden sm:inline">Publish</span>
          </button>
        </div>
      </div>

      {published ? (
        <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center shadow-lg space-y-4">
          <div className="w-16 h-16 bg-emerald/15 rounded-full flex items-center justify-center text-emerald mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-navy">
            Project Published to Davao del Norte Network!
          </h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Your project is now visible to licensed and verified contractors across Tagum, Panabo, and surrounding LGUs.
          </p>
          <p className="text-xs text-cyan font-mono-currency">Redirecting to Dashboard...</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          {/* STEP 1: PROJECT BASICS */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-navy uppercase tracking-wider">
                Step 1: Project Scope &amp; Category
              </h2>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-semibold focus:outline-none focus:border-cyan"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Primary Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-cyan"
                >
                  <option>IT &amp; Software Systems</option>
                  <option>Architecture &amp; CAD Blueprints</option>
                  <option>Tax &amp; Enterprise Compliance (BIR 2307)</option>
                  <option>Civil &amp; Agricultural Engineering</option>
                  <option>Multimedia &amp; Agri-Branding</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Detailed Scope Requirements
                </label>
                <textarea
                  value={scopeDetails}
                  onChange={(e) => setScopeDetails(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-cyan h-32 leading-relaxed"
                  required
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 bg-cyan hover:bg-cyan-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <span>Next: Location &amp; Cluster</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: LOCATION & CLUSTER */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-navy uppercase tracking-wider">
                Step 2: Davao del Norte Location Preferences
              </h2>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Work Modality
                </label>
                <div className="grid grid-cols-3 gap-3 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setModality("remote")}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      modality === "remote" ? "border-cyan bg-cyan/5 text-cyan" : "border-slate-200 text-slate-600"
                    }`}
                  >
                    Remote / Digital
                  </button>
                  <button
                    type="button"
                    onClick={() => setModality("hybrid")}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      modality === "hybrid" ? "border-cyan bg-cyan/5 text-cyan" : "border-slate-200 text-slate-600"
                    }`}
                  >
                    Hybrid (Recommended)
                  </button>
                  <button
                    type="button"
                    onClick={() => setModality("onsite")}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      modality === "onsite" ? "border-cyan bg-cyan/5 text-cyan" : "border-slate-200 text-slate-600"
                    }`}
                  >
                    On-Site Required
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Target Provincial Cluster
                </label>
                <select
                  value={selectedCluster}
                  onChange={(e) => setSelectedCluster(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-cyan"
                >
                  {DAVNOR_CLUSTERS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Minimum Verification Level
                </label>
                <select
                  value={minTier}
                  onChange={(e) => setMinTier(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-cyan"
                >
                  <option value={1}>Level 1: PhilSys Verified (Up to ₱15,000 per milestone)</option>
                  <option value={2}>Level 2: PRC Licensed &amp; BIR Tax Audited (Unlimited Escrow)</option>
                  <option value={3}>Level 3: Portfolio &amp; Authenticity Certified</option>
                </select>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 bg-cyan hover:bg-cyan-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <span>Next: Escrow Milestones</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: MILESTONE ESCROW SCHEDULE BUILDER */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-navy uppercase tracking-wider">
                  Step 3: Milestone Escrow Payment Schedule
                </h2>
                <button
                  type="button"
                  onClick={addMilestone}
                  className="text-xs font-bold text-cyan hover:text-cyan-700 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Phase</span>
                </button>
              </div>

              <div className="space-y-3">
                {milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-navy">
                        Phase {idx + 1}
                      </span>
                      {milestones.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMilestone(idx)}
                          className="text-slate-400 hover:text-crimson"
                          title="Remove phase"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                          Phase Title
                        </label>
                        <input
                          type="text"
                          value={m.title}
                          onChange={(e) => {
                            const copy = [...milestones];
                            copy[idx].title = e.target.value;
                            setMilestones(copy);
                          }}
                          className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-900"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                          Escrow Deposit (₱)
                        </label>
                        <input
                          type="number"
                          value={m.depositAmount}
                          onChange={(e) => {
                            const copy = [...milestones];
                            copy[idx].depositAmount = Number(e.target.value);
                            setMilestones(copy);
                          }}
                          className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-900 font-mono-currency"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Calculation Card */}
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Total Project Scope Value:</span>
                  <span className="font-mono-currency font-bold text-navy">
                    {formatCurrency(totalContract)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Deposit Required to Kickoff (Milestone 1):</span>
                  <span className="font-mono-currency font-bold text-emerald">
                    {formatCurrency(initialDeposit)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Est. BIR Form 2307 Withholding (0.5%):</span>
                  <span className="font-mono-currency font-bold text-amber">
                    {formatCurrency(taxCalc.withholdingTaxAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Platform Protection Fee:</span>
                  <span className="font-mono-currency text-emerald font-bold">
                    ₱0.00 (Start in DavNor Waived)
                  </span>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-2.5 bg-cyan hover:bg-cyan-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <span>Review &amp; Publish</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & PUBLISH */}
          {step === 4 && (
            <form onSubmit={handlePublish} className="space-y-5">
              <h2 className="text-base font-bold text-navy uppercase tracking-wider">
                Step 4: Final Agreement &amp; Publication
              </h2>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <h3 className="font-bold text-sm text-navy">{title}</h3>
                <p className="text-slate-600">{scopeDetails}</p>
                <div className="flex items-center gap-4 text-slate-500 pt-1">
                  <span>Category: <strong>{category}</strong></span>
                  <span>Modality: <strong>{modality}</strong></span>
                  <span>Phases: <strong>{milestones.length}</strong></span>
                </div>
              </div>

              <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeEscrow}
                  onChange={(e) => setAgreeEscrow(e.target.checked)}
                  className="mt-0.5 text-cyan focus:ring-cyan rounded"
                  required
                />
                <span>
                  I agree to deposit <strong>{formatCurrency(initialDeposit)}</strong> into Kugi Escrow once a freelancer proposal is accepted, in accordance with the 72-Hour Inspection Protocol.
                </span>
              </label>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!agreeEscrow}
                  className="px-6 py-3 bg-cyan hover:bg-cyan-600 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Publish Project to Davao del Norte Network
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
