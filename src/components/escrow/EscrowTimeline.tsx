import React from "react";
import { CheckCircle2, Lock, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import { MilestoneState } from "@/lib/escrow-engine";
import { formatCurrency } from "@/lib/tax-calculator";

interface EscrowTimelineProps {
  milestones: MilestoneState[];
  currentMilestoneIndex?: number;
}

export function EscrowTimeline({ milestones }: EscrowTimelineProps) {
  return (
    <div className="w-full bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center justify-between">
        <span>Milestone Escrow Schedule</span>
        <span className="text-[11px] font-mono-currency text-emerald font-semibold">
          100% Protected
        </span>
      </h4>

      <div className="space-y-3">
        {milestones.map((m, idx) => {
          const isReleased = m.status === "FUNDS_RELEASED";
          const isInspection = m.status === "UNDER_INSPECTION";
          const isLocked = m.status === "ESCROW_LOCKED" || m.status === "IN_PROGRESS";
          const isPending = m.status === "PENDING_DEPOSIT";
          const isDisputed = m.status === "DISPUTED";
          const isRevision = m.status === "REVISION_REQUESTED";

          return (
            <div
              key={m.id || idx}
              className={`p-3 rounded-lg border transition-all ${
                isInspection
                  ? "border-cyan bg-cyan/5 ring-1 ring-cyan/20"
                  : isReleased
                  ? "border-emerald/30 bg-emerald/5"
                  : isDisputed
                  ? "border-crimson/40 bg-crimson/5"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5">
                    {isReleased && <CheckCircle2 className="w-4 h-4 text-emerald" />}
                    {isInspection && <Clock className="w-4 h-4 text-cyan animate-spin" />}
                    {isLocked && <Lock className="w-4 h-4 text-slate-600" />}
                    {isRevision && <AlertTriangle className="w-4 h-4 text-amber" />}
                    {isDisputed && <AlertTriangle className="w-4 h-4 text-crimson" />}
                    {isPending && <Lock className="w-4 h-4 text-slate-400" />}
                  </div>

                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Phase {m.sequenceOrder}: {m.title}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">
                      {m.description}
                    </div>
                    {m.deliverableHash && (
                      <div className="text-[10px] font-mono-currency text-slate-500 mt-1 truncate max-w-xs">
                        Audit: {m.deliverableHash}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold font-mono-currency text-navy">
                    {formatCurrency(m.escrowDeposit)}
                  </div>
                  <span
                    className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      isReleased
                        ? "bg-emerald text-white"
                        : isInspection
                        ? "bg-cyan text-white"
                        : isRevision
                        ? "bg-amber text-white"
                        : isDisputed
                        ? "bg-crimson text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {m.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
