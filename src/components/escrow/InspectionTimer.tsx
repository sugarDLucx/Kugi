"use client";

import React, { useState, useEffect } from "react";
import { Clock, ShieldAlert, CheckCircle2 } from "lucide-react";
import { calculateInspectionTimer, InspectionTimerState } from "@/lib/escrow-engine";

interface InspectionTimerProps {
  inspectionEndAt?: string;
  onTimerExpire?: () => void;
}

export function InspectionTimer({ inspectionEndAt, onTimerExpire }: InspectionTimerProps) {
  const [timerState, setTimerState] = useState<InspectionTimerState>(() =>
    calculateInspectionTimer(inspectionEndAt)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = calculateInspectionTimer(inspectionEndAt);
      setTimerState(updated);
      if (updated.isExpired && onTimerExpire) {
        onTimerExpire();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [inspectionEndAt, onTimerExpire]);

  return (
    <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 shadow-md">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan" />
          <span className="text-xs font-bold text-slate-200">
            72-Hour Inspection Protocol
          </span>
        </div>
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
            timerState.isExpired
              ? "bg-emerald/20 text-emerald"
              : "bg-cyan/20 text-cyan animate-pulse"
          }`}
        >
          {timerState.isExpired ? "Auto-Release Window" : "Inspection Clock Active"}
        </span>
      </div>

      <div className="py-3 text-center">
        <div className="font-mono-currency text-3xl font-bold tracking-tight text-white">
          {timerState.formattedDisplay}
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          {timerState.isExpired
            ? "Inspection window elapsed without dispute. Funds are eligible for immediate automated release."
            : "Remaining for buyer to review deliverables or request revisions before funds auto-release."}
        </p>
      </div>

      <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
        <ShieldAlert className="w-3.5 h-3.5 text-amber shrink-0" />
        <span>Submitting revision requests pauses this clock immediately.</span>
      </div>
    </div>
  );
}
