import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, QrCode, Lock, CheckCircle2, Award } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0A192F] text-white border-t border-slate-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Kugi Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl tracking-tight text-white">
                  Kugi<span className="text-cyan font-semibold">.ph</span>
                </span>
                <span className="text-xs text-cyan-fixed font-medium">
                  Trabahong lokal, kalidad nga kasaligan
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-md">
              The institutional freelance and professional services contract marketplace for Davao del Norte. Built with autonomous deposit-first escrow protection, PhilSys biometric e-KYC, and automated BIR Form 2307 tax withholding.
            </p>

            {/* Statutory Compliance Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-[11px] text-emerald font-medium border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>RA 11967 (ITA) Trustmark</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-[11px] text-amber font-medium border border-slate-700">
                <Award className="w-3.5 h-3.5" />
                <span>BIR RR 16-2023 CWT</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-[11px] text-cyan font-medium border border-slate-700">
                <Lock className="w-3.5 h-3.5" />
                <span>RA 10173 Data Privacy</span>
              </div>
            </div>
          </div>

          {/* Column 2: Provincial Clusters */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Provincial Clusters
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/services?cluster=cluster-1" className="hover:text-cyan transition-colors">
                  Cluster 1: Tagum Core
                </Link>
              </li>
              <li>
                <Link href="/services?cluster=cluster-2" className="hover:text-cyan transition-colors">
                  Cluster 2: Kapalong / Asuncion
                </Link>
              </li>
              <li>
                <Link href="/services?cluster=cluster-3" className="hover:text-cyan transition-colors">
                  Cluster 3: Panabo Corridor
                </Link>
              </li>
              <li>
                <Link href="/services?cluster=cluster-4" className="hover:text-cyan transition-colors">
                  Cluster 4: Samal Island
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-cyan transition-colors">
                  All 11 DavNor Municipalities
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Escrow Engine */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Escrow & Security
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/trust-center" className="hover:text-cyan transition-colors">
                  PhilSys e-KYC Verification
                </Link>
              </li>
              <li>
                <Link href="/escrow-dispute-terms" className="hover:text-cyan transition-colors">
                  72-Hour Inspection Protocol
                </Link>
              </li>
              <li>
                <Link href="/escrow-dispute-terms" className="hover:text-cyan transition-colors">
                  Provincial Mediation Desk
                </Link>
              </li>
              <li>
                <Link href="/escrow-dispute-terms" className="hover:text-cyan transition-colors">
                  BIR Form 2307 Guidelines
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-cyan transition-colors">
                  GCash & Maya Trust Vaults
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional Accreditation & Trustmark */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Accreditation
            </h3>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-2">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-emerald" />
                <span className="text-[11px] font-bold text-white">
                  DTI E-Commerce Bureau
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Philippine Trustmark Certified. Linked to National Online Business Database (OBD).
              </p>
              <div className="text-[10px] font-mono-currency text-emerald">
                OBD-REG-DVO-2026-9921
              </div>
            </div>

            <p className="text-[10px] text-slate-400">
              Co-incubated under the <span className="text-amber">Start in DavNor</span> regional innovation initiative.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Kugi.ph (Kugi Technologies Inc.). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/escrow-dispute-terms" className="hover:text-slate-200 transition-colors">
              Terms of Service
            </Link>
            <Link href="/escrow-dispute-terms" className="hover:text-slate-200 transition-colors">
              Data Privacy (RA 10173)
            </Link>
            <Link href="/escrow-dispute-terms" className="hover:text-slate-200 transition-colors">
              Dispute Redress
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
