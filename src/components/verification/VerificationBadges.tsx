import React from "react";
import { ShieldCheck, Award, FileCheck2 } from "lucide-react";

interface VerificationBadgeProps {
  tier?: 1 | 2 | 3;
  prcLicense?: string;
  isBirValid?: boolean;
}

export function VerificationBadges({
  tier = 2,
  prcLicense,
  isBirValid = true,
}: VerificationBadgeProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {tier >= 1 && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald/15 text-emerald-600 text-[11px] font-bold border border-emerald/20">
          <ShieldCheck className="w-3 h-3 text-emerald" />
          <span>PhilSys Verified</span>
        </span>
      )}

      {tier >= 2 && prcLicense && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber/15 text-amber-700 text-[11px] font-bold border border-amber/30">
          <Award className="w-3 h-3 text-amber" />
          <span>{prcLicense}</span>
        </span>
      )}

      {tier >= 2 && isBirValid && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-navy/10 text-navy text-[11px] font-bold border border-slate-200">
          <FileCheck2 className="w-3 h-3 text-cyan" />
          <span>BIR 2303 & 2307 Ready</span>
        </span>
      )}

      {tier >= 3 && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan/15 text-cyan-600 text-[11px] font-bold border border-cyan/30">
          <ShieldCheck className="w-3 h-3 text-cyan" />
          <span>Authenticity Certified</span>
        </span>
      )}
    </div>
  );
}
