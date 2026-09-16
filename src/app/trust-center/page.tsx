"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Lock,
  Upload,
  QrCode,
  FileCheck2,
  ExternalLink,
  Fingerprint,
} from "lucide-react";

export default function TrustCenterPage() {
  const [tier2ModalOpen, setTier2ModalOpen] = useState(false);
  const [prcNumber, setPrcNumber] = useState("0038291");
  const [tinNumber, setTinNumber] = useState("284-910-382-000");
  const [tier2Audited, setTier2Audited] = useState(true);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="bg-[#0A192F] text-white p-8 rounded-2xl shadow-xl space-y-3 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-cyan/20 blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald/20 text-emerald text-xs font-bold border border-emerald/30">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Institutional Trust Infrastructure</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Kugi Trust &amp; e-KYC Verification Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Complete your identity, licensure, and portfolio audits to unlock platform tiers, unlimited milestone escrow ceilings, and automated BIR Form 2307 tax issuance across all 11 LGUs of Davao del Norte.
        </p>
      </div>

      {/* 3-Tier Verification Progress Stack */}
      <div className="space-y-6">
        <h2 className="text-base font-bold text-navy uppercase tracking-wider">
          3-Tier Identity &amp; Licensure Stack
        </h2>

        {/* Tier 1 Card: PhilSys */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald/15 flex items-center justify-center text-emerald shrink-0">
              <Fingerprint className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-navy">
                  Level 1: PhilSys Core Identity &amp; Biometric Liveness
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald text-white text-[10px] font-bold uppercase">
                  Verified
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                Verified via Philippine National ID (PhilSys / ePhilID) and AI facial biometric liveness check. Confirms civil identity and unlocks milestone contracts up to ₱15,000.
              </p>
              <div className="text-[11px] font-mono-currency text-slate-500 pt-1">
                Reference: PHILSYS-DVO-99281-OK • Verified on 2026-08-14
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <div className="px-4 py-2 bg-emerald/10 text-emerald text-xs font-bold rounded-xl border border-emerald/20 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>PhilSys Cleared</span>
            </div>
          </div>
        </div>

        {/* Tier 2 Card: PRC & BIR Tax Compliance */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber/15 flex items-center justify-center text-amber shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-navy">
                  Level 2: Professional Licensure &amp; Tax Registration
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-amber text-white text-[10px] font-bold uppercase">
                  {tier2Audited ? "Audited & Active" : "Action Required"}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                Verification of Professional Regulation Commission (PRC) license via the LERIS registry, paired with BIR Form 2303 Certificate of Registration. Unlocks <strong>unlimited milestone escrow</strong> and quarterly BIR Form 2307 generation.
              </p>
              <div className="text-[11px] font-mono-currency text-slate-500 pt-1">
                PRC: Architect #0038291 • TIN: 284-910-382-000 (RDO 112 Tagum)
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => setTier2ModalOpen(true)}
              className="px-4 py-2.5 bg-cyan hover:bg-cyan-600 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Update PRC / BIR Records</span>
            </button>
          </div>
        </div>

        {/* Tier 3 Card: Portfolio Authenticity */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan/15 flex items-center justify-center text-cyan shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-navy">
                  Level 3: Portfolio Authenticity &amp; SHA-256 Fingerprinting
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan text-white text-[10px] font-bold uppercase">
                  Certified
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                Automated scanning against online repositories (Behance, GitHub, CAD portals) ensuring genuine local Davao del Norte authorship. Displays the "Authenticity Verified" badge in regional search.
              </p>
              <div className="text-[11px] font-mono-currency text-slate-500 pt-1">
                Originality Rating: 99.4% • 0 Plagiarism Flags Detected
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <div className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan" />
              <span>Authenticity Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Backing & Philippine Trustmark Section */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <h2 className="text-base font-bold text-navy uppercase tracking-wider">
          Government &amp; Statutory Accreditations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-emerald" />
              <h3 className="font-bold text-xs text-navy">
                DTI E-Commerce Philippine Trustmark
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complies with Section 21 of the Internet Transactions Act (RA 11967). Platform merchant registry connected with the National Online Business Database (OBD).
            </p>
            <div className="text-[10px] font-mono-currency text-emerald font-semibold">
              Reg # DTI-ITA-R11-2026-0811
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-cyan" />
              <h3 className="font-bold text-xs text-navy">
                RA 10173 Data Privacy Compliance
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Registered Data Processing System with the National Privacy Commission (NPC). Biometric scans and government ID numbers isolated in AES-256 encrypted vaults.
            </p>
            <div className="text-[10px] font-mono-currency text-cyan font-semibold">
              NPC Reg # PIC-0994-DAVNOR
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber" />
              <h3 className="font-bold text-xs text-navy">
                Start in DavNor Incubation
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Supported by provincial MSME modernization programs spanning Tagum, Panabo, Kapalong, and Samal Island to protect local freelance and enterprise capital.
            </p>
            <div className="text-[10px] font-mono-currency text-amber font-semibold">
              Cluster Network Partner 2026
            </div>
          </div>
        </div>
      </div>

      {/* Tier 2 Upload Modal */}
      {tier2ModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-navy">
                Update Professional Licensure &amp; Tax Info
              </h3>
              <button
                onClick={() => setTier2ModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setTier2Audited(true);
                setTier2ModalOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  PRC License Number (LERIS Verified)
                </label>
                <input
                  type="text"
                  value={prcNumber}
                  onChange={(e) => setPrcNumber(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-mono-currency focus:outline-none focus:border-cyan"
                  placeholder="e.g. 0038291"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Tax Identification Number (TIN)
                </label>
                <input
                  type="text"
                  value={tinNumber}
                  onChange={(e) => setTinNumber(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-mono-currency focus:outline-none focus:border-cyan"
                  placeholder="e.g. 284-910-382-000"
                  required
                />
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center text-xs text-slate-500 bg-slate-50">
                <Upload className="w-5 h-5 text-cyan mx-auto mb-1.5" />
                <span>Upload BIR Form 2303 / DTI Certificate / PRC ID</span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setTier2ModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan hover:bg-cyan-600 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Save &amp; Request Audit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
