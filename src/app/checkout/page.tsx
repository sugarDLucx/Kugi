"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  QrCode,
  Smartphone,
  Building,
  CreditCard,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { MOCK_SERVICES } from "@/lib/mock-data";
import { formatCurrency, calculateTaxWithholding } from "@/lib/tax-calculator";
import { useKugiStore } from "@/lib/store";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const serviceId = searchParams.get("serviceId") || "srv-blueprint-01";
  const customDeposit = searchParams.get("deposit");

  const service =
    MOCK_SERVICES.find((s) => s.id === serviceId) || MOCK_SERVICES[0];

  const depositAmount = customDeposit
    ? parseFloat(customDeposit)
    : service.startingDeposit;

  const taxCalculation = calculateTaxWithholding(depositAmount);

  const [paymentRail, setPaymentRail] = useState<"gcash" | "maya" | "qrph" | "bank">("gcash");
  const [mobileNumber, setMobileNumber] = useState("0917 842 1920");
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successPaid, setSuccessPaid] = useState(false);

  const { fundMilestone } = useKugiStore();

  const handleAuthorizePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) return;

    setIsProcessing(true);
    setTimeout(() => {
      fundMilestone("KG-90241", 1);
      setIsProcessing(false);
      setSuccessPaid(true);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Secure Header Banner */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-navy flex items-center justify-center">
            <Image src="/logo.png" alt="Kugi Logo" fill className="object-contain p-1" />
          </div>
          <div>
            <span className="font-bold text-lg text-navy">
              Kugi<span className="text-cyan font-semibold">.ph</span> Escrow Gateway
            </span>
            <span className="block text-[11px] text-slate-500">
              Isolated Trust Account Custody
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-1 text-emerald font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encrypted</span>
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <div className="hidden sm:flex items-center gap-1 text-cyan font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DTI Trustmark Verified</span>
          </div>
        </div>
      </div>

      {successPaid ? (
        <div className="bg-white rounded-2xl p-10 border border-slate-200 shadow-lg text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 bg-emerald/15 rounded-full flex items-center justify-center text-emerald mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-navy">
            Milestone Escrow Deposit Locked!
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your deposit of <strong>{formatCurrency(depositAmount)}</strong> has been received and vaulted in Kugi’s isolated trust escrow account via GCash. The freelancer has been notified to commence work.
          </p>

          <div className="bg-slate-50 p-4 rounded-xl text-left text-xs font-mono-currency space-y-1 text-slate-700">
            <div>Transaction Ref: KG-GCASH-{Math.floor(10000000 + Math.random() * 90000000)}</div>
            <div>Order ID: #KG-90241</div>
            <div>Custody: Kugi Segregated Trust Account (Davao del Norte)</div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/messages/KG-90241"
              className="w-full py-3 bg-navy hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Enter Project Workroom
            </Link>
            <Link
              href="/dashboard"
              className="w-full py-2.5 text-xs text-slate-600 hover:text-navy font-semibold"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: PAYMENT RAILS (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
              <h2 className="text-base font-bold text-navy uppercase tracking-wider">
                Select Philippine Payment Rail
              </h2>

              <div className="space-y-3">
                {/* GCash */}
                <label
                  onClick={() => setPaymentRail("gcash")}
                  className={`p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                    paymentRail === "gcash"
                      ? "border-cyan bg-cyan/5 ring-1 ring-cyan"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="rail"
                    checked={paymentRail === "gcash"}
                    onChange={() => setPaymentRail("gcash")}
                    className="mt-1 text-cyan focus:ring-cyan"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-blue-600">GCash Mobile Wallet</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                        Most Popular in DavNor
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Instant zero-fee milestone funding directly from your GCash app balance.
                    </p>
                  </div>
                </label>

                {/* Maya */}
                <label
                  onClick={() => setPaymentRail("maya")}
                  className={`p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                    paymentRail === "maya"
                      ? "border-cyan bg-cyan/5 ring-1 ring-cyan"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="rail"
                    checked={paymentRail === "maya"}
                    onChange={() => setPaymentRail("maya")}
                    className="mt-1 text-cyan focus:ring-cyan"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-green-700">Maya Wallet</span>
                      <span className="text-[10px] text-slate-400">Scan or Phone</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Fund your milestone using your verified Maya wallet account.
                    </p>
                  </div>
                </label>

                {/* QR Ph */}
                <label
                  onClick={() => setPaymentRail("qrph")}
                  className={`p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                    paymentRail === "qrph"
                      ? "border-cyan bg-cyan/5 ring-1 ring-cyan"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="rail"
                    checked={paymentRail === "qrph"}
                    onChange={() => setPaymentRail("qrph")}
                    className="mt-1 text-cyan focus:ring-cyan"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-navy">QR Ph National Standard</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        Universal BSP
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Scan using BPI, UnionBank, LandBank, SeaBank, or any Philippine banking app.
                    </p>
                  </div>
                </label>

                {/* Online Banking */}
                <label
                  onClick={() => setPaymentRail("bank")}
                  className={`p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                    paymentRail === "bank"
                      ? "border-cyan bg-cyan/5 ring-1 ring-cyan"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="rail"
                    checked={paymentRail === "bank"}
                    onChange={() => setPaymentRail("bank")}
                    className="mt-1 text-cyan focus:ring-cyan"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-amber-800">UnionBank / LandBank Direct</span>
                      <span className="text-[10px] text-slate-400">Enterprise Clearing</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Direct corporate account deposit for provincial cooperatives and businesses.
                    </p>
                  </div>
                </label>
              </div>

              {/* Dynamic Payment Input (GCash / Maya) */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Philippine Mobile Wallet Number
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="+63 9XX XXX XXXX"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono-currency text-slate-900 focus:outline-none focus:border-cyan"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                  <strong>Trust Explainer:</strong> You will authorize the transaction securely inside your GCash app. The money is deposited directly into Kugi’s isolated trust escrow account, <em>NOT</em> to the contractor’s personal account.
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTRACT & ESCROW SUMMARY (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg space-y-5">
              <h2 className="text-base font-bold text-navy uppercase tracking-wider">
                Escrow Milestone Summary
              </h2>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[11px] font-bold text-cyan">Contract Scope</div>
                <div className="font-bold text-xs text-navy leading-snug">{service.title}</div>
                <div className="text-[11px] text-slate-500 pt-1">
                  Contractor: {service.freelancer.fullName} ({service.municipality})
                </div>
              </div>

              {/* Financial Breakdown Table */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Total Agreed Contract Value:</span>
                  <span className="font-mono-currency font-semibold text-slate-900">
                    {formatCurrency(service.fullContractPrice)}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Milestone 1 Escrow Deposit (Phase 1):</span>
                  <span className="font-mono-currency font-semibold text-slate-900">
                    {formatCurrency(depositAmount)}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Platform Escrow Protection Fee:</span>
                  <span className="font-mono-currency font-semibold text-emerald">
                    ₱0.00 (Start in DavNor Free)
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Est. BIR 2307 Withholding (0.5%):</span>
                  <span className="font-mono-currency font-semibold text-amber">
                    {formatCurrency(taxCalculation.withholdingTaxAmount)}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-bold text-navy text-sm">Total Payable Today:</span>
                  <span className="font-mono-currency font-bold text-2xl text-navy">
                    {formatCurrency(depositAmount)}
                  </span>
                </div>
              </div>

              {/* Prominent Escrow Safety Guarantee Banner */}
              <div className="bg-emerald text-white p-4 rounded-xl space-y-1.5 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Escrow Guarantee</span>
                </div>
                <p className="text-[11px] text-emerald-100 leading-relaxed">
                  Your funds remain locked in escrow. The local expert only gets paid once you inspect and approve the completed milestone deliverables.
                </p>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 text-cyan focus:ring-cyan rounded"
                />
                <span>
                  I agree to the Kugi Escrow Agreement, 72-Hour Inspection Protocol, and RA 10173 Data Privacy Policy.
                </span>
              </label>

              {/* Authorize Action Button */}
              <button
                onClick={handleAuthorizePayment}
                disabled={!agreedToTerms || isProcessing}
                className="w-full py-3.5 bg-cyan hover:bg-cyan-600 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md"
              >
                {isProcessing ? (
                  <span>Contacting GCash Rails...</span>
                ) : (
                  <>
                    <span>Authorize {formatCurrency(depositAmount)} Deposit</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EscrowCheckoutPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500">Loading escrow gateway...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
