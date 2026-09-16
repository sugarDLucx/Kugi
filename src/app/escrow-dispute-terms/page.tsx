import React from "react";
import Link from "next/link";
import { ShieldCheck, Scale, AlertTriangle, FileText, CheckCircle2 } from "lucide-react";

export default function EscrowDisputeTermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <div className="text-xs text-slate-500 mb-1">
          <Link href="/" className="hover:text-cyan">Home</Link> / <span>Institutional Terms</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy">
          Kugi Escrow Dispute &amp; Statutory Terms (Kugi.ph)
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Governing freelance transactions, capital custody, and statutory tax compliance in Davao del Norte, Philippines.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 text-xs text-slate-700 leading-relaxed">
        {/* Section 1: Escrow Custody */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-navy uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald" />
            <span>1. Tripartite Deposit-First Escrow Vault</span>
          </h2>
          <p>
            All contract disbursements on Kugi.ph operate under a deposit-first milestone model. Buyers must fund the active milestone into Kugi’s segregated trust escrow account prior to the commencement of work. Funds cannot be claimed by the freelancer until the buyer reviews and approves the deliverable, or until the 72-Hour Inspection window expires without objection.
          </p>
        </section>

        {/* Section 2: 72-Hour Inspection Protocol */}
        <section className="space-y-2 border-t border-slate-100 pt-4">
          <h2 className="text-sm font-bold text-navy uppercase tracking-wider flex items-center gap-2">
            <Scale className="w-4 h-4 text-cyan" />
            <span>2. The 72-Hour Inspection Protocol</span>
          </h2>
          <p>
            Upon deliverable submission by the contractor, an automated 72-hour countdown commences. During this window, the client may:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
            <li><strong>Approve:</strong> Immediately disburses net funds to the contractor’s verified GCash/Maya wallet.</li>
            <li><strong>Request Revision:</strong> Pauses the 72-hour countdown immediately and places the milestone into <em>REVISION_REQUESTED</em> status.</li>
            <li><strong>Lodge Dispute:</strong> Freezes escrow funds immediately and alerts the Kugi Mediation Officer.</li>
          </ul>
          <p className="text-slate-500 italic">
            If 72 consecutive hours elapse with no client objection or revision request, the milestone funds automatically sweep to the freelancer’s balance.
          </p>
        </section>

        {/* Section 3: BIR RR 16-2023 Tax Withholding */}
        <section className="space-y-2 border-t border-slate-100 pt-4">
          <h2 className="text-sm font-bold text-navy uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber" />
            <span>3. Bureau of Internal Revenue (BIR) RR 16-2023 Withholding</span>
          </h2>
          <p>
            In compliance with BIR Revenue Regulations No. 16-2023, Kugi withholds 0.5% Creditable Withholding Tax (CWT) on gross milestone remittances for individual providers whose annual gross volume exceeds ₱500,000.00. The platform auto-generates signed quarterly BIR Form 2307 vouchers filed under BIR RDO 112 (Tagum City, Davao del Norte).
          </p>
        </section>

        {/* Section 4: Dispute Redress */}
        <section className="space-y-2 border-t border-slate-100 pt-4">
          <h2 className="text-sm font-bold text-navy uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-crimson" />
            <span>4. Three-Tier Dispute Escalation Workflow</span>
          </h2>
          <ol className="list-decimal list-inside space-y-1 pl-2 text-slate-600">
            <li><strong>48-Hour Direct Negotiation:</strong> Mutual direct dialogue inside the encrypted Workroom.</li>
            <li><strong>Administrative Arbitration:</strong> Review by the Kugi Provincial Mediation Officer at Mankilam, Tagum City.</li>
            <li><strong>External Legal Redress:</strong> Certified audit log export for formal mediation through DTI Region XI or the Tagum City Chamber of Commerce.</li>
          </ol>
        </section>
      </div>
    </div>
  );
}
