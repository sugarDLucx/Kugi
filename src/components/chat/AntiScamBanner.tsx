"use client";

import React from "react";
import { AlertOctagon, X, ShieldAlert } from "lucide-react";
import { useKugiStore } from "@/lib/store";

export function AntiScamBanner() {
  const { antiScamAlertTriggered, lastScamWarning, dismissScamAlert } = useKugiStore();

  if (!antiScamAlertTriggered && !lastScamWarning) {
    return (
      <div className="bg-amber/10 border border-amber/30 text-slate-800 p-2.5 rounded-lg flex items-center justify-between text-xs mb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber shrink-0" />
          <span>
            <strong>Security Reminder:</strong> Keep all files, chats, and milestone payments inside Kugi. Never pay outside escrow.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-crimson/15 border-2 border-crimson text-crimson p-3 rounded-xl flex items-start justify-between gap-3 text-xs mb-3 animate-pulse shadow-md">
      <div className="flex items-start gap-2.5">
        <AlertOctagon className="w-5 h-5 text-crimson shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-sm text-crimson">
            SIGNAL CRIMSON: Anti-Disintermediation Triggered
          </div>
          <div className="text-slate-800 font-medium mt-0.5">
            {lastScamWarning ||
              "Off-platform transaction solicitation detected (private phone number, personal GCash, or external link). Off-platform payments violate RA 11967 (ITA) and void all Kugi 100% Milestone Escrow guarantees."}
          </div>
        </div>
      </div>

      <button
        onClick={dismissScamAlert}
        className="text-slate-500 hover:text-crimson p-1 rounded-md"
        aria-label="Dismiss Alert"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
