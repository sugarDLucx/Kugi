"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

export default function ReviewSubmitPage() {
  const router = useRouter();
  const [qualityRating, setQualityRating] = useState(5);
  const [commsRating, setCommsRating] = useState(5);
  const [timelineRating, setTimelineRating] = useState(5);
  const [integrityRating, setIntegrityRating] = useState(5);
  const [testimonial, setTestimonial] = useState("");
  const [offPlatformAttempt, setOffPlatformAttempt] = useState<"no" | "yes">("no");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  const renderStarPicker = (value: number, setValue: (val: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setValue(star)}
            className="p-1 hover:scale-110 transition-transform"
            aria-label={`${star} star`}
          >
            <Star
              className={`w-6 h-6 ${
                star <= value ? "fill-amber text-amber" : "text-slate-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl space-y-6">
        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 bg-emerald/15 rounded-full flex items-center justify-center text-emerald mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-navy">
              Confidential Review Vaulted!
            </h2>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Your evaluation has been encrypted. It will remain locked until both parties have submitted feedback or until 14 days elapse.
            </p>
            <p className="text-[11px] text-cyan font-mono-currency">
              Redirecting to Dashboard...
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald uppercase tracking-wider mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>Double-Blind Reputation Engine</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-navy">
                Rate Your Project Experience with Ar. Mark Tan
              </h1>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Neither party can view the other’s feedback until both have submitted evaluations or until 14 days elapse. This eliminates retaliatory reviews and preserves provincial marketplace integrity.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 4 Rating Dimensions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="font-bold text-xs text-navy block">
                      1. Technical Quality & Scope Delivery
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Adherence to National Building Code and LGU permit specs.
                    </span>
                  </div>
                  {renderStarPicker(qualityRating, setQualityRating)}
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="font-bold text-xs text-navy block">
                      2. Communication & Response Time
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Clarity and promptness during milestone discussions.
                    </span>
                  </div>
                  {renderStarPicker(commsRating, setCommsRating)}
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="font-bold text-xs text-navy block">
                      3. Adherence to Agreed Timelines
                    </span>
                  </div>
                  {renderStarPicker(timelineRating, setTimelineRating)}
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="font-bold text-xs text-navy block">
                      4. Professional Integrity & Compliance
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Transparency and avoidance of off-platform bypasses.
                    </span>
                  </div>
                  {renderStarPicker(integrityRating, setIntegrityRating)}
                </div>
              </div>

              {/* Written Testimonial */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Written Feedback (Visible after mutual reveal)
                </label>
                <textarea
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                  placeholder="Describe your collaboration with this local DavNor professional..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-cyan h-28"
                  required
                />
              </div>

              {/* Private Compliance Check */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-xs text-slate-800 block">
                  Private Anti-Scam Audit (Admin & AI Trust Score Only)
                </span>
                <p className="text-[11px] text-slate-500">
                  Did the freelancer attempt to request cash transfers, private GCash payments, or transactions outside the Kugi Escrow system?
                </p>
                <div className="flex items-center gap-4 pt-1 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="offPlatform"
                      checked={offPlatformAttempt === "no"}
                      onChange={() => setOffPlatformAttempt("no")}
                      className="text-cyan focus:ring-cyan"
                    />
                    <span className="font-semibold text-emerald">No, 100% compliant inside Kugi</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="offPlatform"
                      checked={offPlatformAttempt === "yes"}
                      onChange={() => setOffPlatformAttempt("yes")}
                      className="text-crimson focus:ring-crimson"
                    />
                    <span className="font-semibold text-crimson">Yes, solicited off-platform</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Skip for Now
                </Link>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-cyan hover:bg-cyan-600 text-white text-xs font-bold transition-all shadow-sm"
                >
                  Submit Confidential Rating
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
