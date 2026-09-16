"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Briefcase,
  UserCheck,
  Building,
  Smartphone,
  Check,
} from "lucide-react";
import { DAVNOR_CLUSTERS } from "@/lib/mock-data";

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [role, setRole] = useState<"BUYER" | "FREELANCER">("FREELANCER");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cluster, setCluster] = useState("cluster-1");
  const [municipality, setMunicipality] = useState("Tagum City");
  const [barangay, setBarangay] = useState("Mankilam");
  const [password, setPassword] = useState("");
  const [consentPrivacy, setConsentPrivacy] = useState(true);
  const [consentEscrow, setConsentEscrow] = useState(true);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row bg-canvas">
      {/* Left 40% Branded Showcase (Davao Deep Navy) */}
      <div className="lg:w-5/12 bg-[#0A192F] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-cyan/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-emerald/10 blur-3xl pointer-events-none" />

        <div className="space-y-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center">
              <Image src="/logo.png" alt="Kugi Logo" fill className="object-contain p-1" />
            </div>
            <div>
              <span className="font-bold text-2xl tracking-tight text-white">
                Kugi<span className="text-cyan font-semibold">.ph</span>
              </span>
              <span className="block text-xs text-cyan-fixed">
                Trabahong lokal, kalidad nga kasaligan
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
              Join Davao del Norte’s Institutional Escrow Network.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Create your account to contract verified local engineers, architects, accountants, software developers, and creatives with 100% milestone protection.
            </p>
          </div>

          {/* Provincial Trust Highlights */}
          <div className="space-y-4 pt-4 text-xs">
            <div className="flex items-center gap-3 text-slate-200">
              <div className="w-7 h-7 rounded-lg bg-emerald/20 flex items-center justify-center text-emerald shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <span>Direct GCash &amp; Maya Milestone Escrow Payouts</span>
            </div>

            <div className="flex items-center gap-3 text-slate-200">
              <div className="w-7 h-7 rounded-lg bg-cyan/20 flex items-center justify-center text-cyan shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <span>PhilSys e-KYC Identity &amp; PRC Licensure Audits</span>
            </div>

            <div className="flex items-center gap-3 text-slate-200">
              <div className="w-7 h-7 rounded-lg bg-amber/20 flex items-center justify-center text-amber shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <span>Serving all 11 Municipalities across Davao del Norte</span>
            </div>
          </div>
        </div>

        {/* Incubation Credit */}
        <div className="pt-8 border-t border-slate-800 text-[11px] text-slate-400 relative z-10">
          Co-incubated under the <strong className="text-amber">Start in DavNor Challenge</strong>. Compliant with RA 11967 (ITA) and RA 10173 (DPA).
        </div>
      </div>

      {/* Right 60% Multi-Step Onboarding Form */}
      <div className="lg:w-7/12 p-6 sm:p-12 lg:p-16 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white rounded-2xl p-8 border border-slate-200 shadow-lg space-y-6">
          {/* Step Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
              <span className={step >= 1 ? "text-cyan" : ""}>1. Account Intent</span>
              <span className={step >= 2 ? "text-cyan" : ""}>2. DavNor Location</span>
              <span className={step >= 3 ? "text-cyan" : ""}>3. Security &amp; Legal</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-cyan h-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* STEP 1: ROLE SELECTION */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-bold text-navy">How will you use Kugi?</h3>
                <p className="text-xs text-slate-500 mt-1">
                  You can toggle roles anytime from your dashboard after registration.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setRole("BUYER")}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    role === "BUYER"
                      ? "border-cyan bg-cyan/5 shadow-md"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan/15 flex items-center justify-center text-cyan mb-3">
                    <Building className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-navy">I want to hire talent</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    For local enterprises, cooperatives, contractors &amp; MSMEs seeking verified experts.
                  </p>
                </div>

                <div
                  onClick={() => setRole("FREELANCER")}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    role === "FREELANCER"
                      ? "border-cyan bg-cyan/5 shadow-md"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald/15 flex items-center justify-center text-emerald mb-3">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-navy">I want to offer services</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    For PRC licensed professionals, coders, draftspersons, CPAs &amp; local creatives.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-3 bg-cyan hover:bg-cyan-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Continue to Step 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: LOCATION & CONTACT */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-navy">Contact &amp; Davao del Norte Residency</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Ensure details match your government-issued ID for PhilSys e-KYC.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Maria Carmela Santos"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-cyan"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-cyan"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Philippine Mobile (GCash / Maya linked)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+63 9XX XXX XXXX"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-mono-currency focus:outline-none focus:border-cyan"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    DavNor Cluster &amp; LGU
                  </label>
                  <select
                    value={cluster}
                    onChange={(e) => setCluster(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-cyan"
                  >
                    <option value="cluster-1">Cluster 1: Tagum City</option>
                    <option value="cluster-2">Cluster 2: Kapalong / Asuncion</option>
                    <option value="cluster-3">Cluster 3: Panabo Corridor</option>
                    <option value="cluster-4">Cluster 4: Samal Island</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Registered Barangay
                  </label>
                  <input
                    type="text"
                    value={barangay}
                    onChange={(e) => setBarangay(e.target.value)}
                    placeholder="e.g. Mankilam, Magugpo, San Vicente"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-cyan"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-2/3 py-3 bg-cyan hover:bg-cyan-600 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Continue to Step 3
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SECURITY & LEGAL CONSENT */}
          {step === 3 && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-navy">Security &amp; Statutory Agreements</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Protecting transactions under Philippine law (RA 11967 &amp; RA 10173).
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Account Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters, letters &amp; numbers"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-cyan"
                  required
                />
              </div>

              <div className="space-y-3 pt-2 text-xs text-slate-600">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentPrivacy}
                    onChange={(e) => setConsentPrivacy(e.target.checked)}
                    className="mt-0.5 text-cyan focus:ring-cyan rounded"
                    required
                  />
                  <span>
                    I consent to identity and professional credential verification under the <strong>Data Privacy Act of 2012 (RA 10173)</strong>.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentEscrow}
                    onChange={(e) => setConsentEscrow(e.target.checked)}
                    className="mt-0.5 text-cyan focus:ring-cyan rounded"
                    required
                  />
                  <span>
                    I agree to the <strong>Kugi Deposit-First Escrow Agreement</strong>, 72-Hour Inspection Protocol, and statutory BIR 2307 withholding rules.
                  </span>
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-1/3 py-3 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!consentPrivacy || !consentEscrow}
                  className="w-2/3 py-3 bg-cyan hover:bg-cyan-600 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Create My Kugi Account
                </button>
              </div>

              <div className="text-center pt-2 text-xs text-slate-500">
                Already have an account?{" "}
                <Link href="/login" className="text-cyan font-bold hover:underline">
                  Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
