"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  ShieldCheck,
  Star,
  SlidersHorizontal,
  X,
  Filter,
  CheckCircle2,
  Lock,
  ArrowUpDown,
} from "lucide-react";
import { DAVNOR_CLUSTERS, MOCK_SERVICES, MarketplaceService } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/tax-calculator";
import { VerificationBadges } from "@/components/verification/VerificationBadges";

export default function ServicesMarketplacePage() {
  const [selectedCluster, setSelectedCluster] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [verificationFilter, setVerificationFilter] = useState<number>(0);
  const [maxBudget, setMaxBudget] = useState<number>(100000);
  const [sortBy, setSortBy] = useState<string>("rating");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter and sort services
  const filteredServices = useMemo(() => {
    return MOCK_SERVICES.filter((srv) => {
      // Cluster filter
      if (selectedCluster !== "all" && srv.clusterCode !== selectedCluster && srv.cluster !== selectedCluster) {
        // match cluster-1, cluster-2 etc
        const clusterMatch =
          (selectedCluster === "cluster-1" && srv.clusterCode === "CLUSTER_1_TAGUM") ||
          (selectedCluster === "cluster-2" && srv.clusterCode === "CLUSTER_2_KAPALONG_ASUNCION") ||
          (selectedCluster === "cluster-3" && srv.clusterCode === "CLUSTER_3_PANABO_CORRIDOR") ||
          (selectedCluster === "cluster-4" && srv.clusterCode === "CLUSTER_4_SAMAL_ISLAND");
        if (!clusterMatch) return false;
      }

      // Keyword query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = srv.title.toLowerCase().includes(q);
        const matchesCategory = srv.category.toLowerCase().includes(q);
        const matchesPro = srv.freelancer.fullName.toLowerCase().includes(q);
        const matchesLoc = srv.municipality.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCategory && !matchesPro && !matchesLoc) return false;
      }

      // Verification tier
      if (verificationFilter > 0 && srv.freelancer.verificationTier < verificationFilter) {
        return false;
      }

      // Budget filter
      if (srv.fullContractPrice > maxBudget) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "lowest-deposit") return a.startingDeposit - b.startingDeposit;
      if (sortBy === "price-low") return a.fullContractPrice - b.fullContractPrice;
      if (sortBy === "price-high") return b.fullContractPrice - a.fullContractPrice;
      return 0;
    });
  }, [selectedCluster, searchQuery, verificationFilter, maxBudget, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <div className="text-xs text-slate-500 mb-1">
          <Link href="/" className="hover:text-cyan">Home</Link> / <span>Marketplace</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy">
              Davao del Norte Service Marketplace
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Showing {filteredServices.length} verified services with 100% deposit-first milestone escrow protection.
            </p>
          </div>

          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800"
          >
            <Filter className="w-4 h-4 text-cyan" />
            <span>Filter Services</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* LEFT SIDEBAR: FILTERS */}
        <aside className={`fixed inset-0 z-50 bg-black/50 p-4 lg:p-0 lg:static lg:bg-transparent lg:z-auto ${mobileFilterOpen ? "block" : "hidden lg:block"}`}>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm max-h-[90vh] overflow-y-auto lg:max-h-none">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-sm text-navy">
                <SlidersHorizontal className="w-4 h-4 text-cyan" />
                <span>Filter Directory</span>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="lg:hidden p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Keyword Search */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Keywords
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="E.g. CAD, BIR, ERP, IoT..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-cyan"
                  />
                </div>
              </div>

              {/* Cluster Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Davao del Norte Cluster
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="cluster"
                      checked={selectedCluster === "all"}
                      onChange={() => setSelectedCluster("all")}
                      className="text-cyan focus:ring-cyan"
                    />
                    <span>All 11 Municipalities</span>
                  </label>
                  {DAVNOR_CLUSTERS.map((c) => (
                    <label key={c.id} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="cluster"
                        checked={selectedCluster === c.id}
                        onChange={() => setSelectedCluster(c.id)}
                        className="text-cyan focus:ring-cyan"
                      />
                      <span>{c.shortName}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Verification Tier */}
              <div className="pt-3 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Verification Badge
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="verification"
                      checked={verificationFilter === 0}
                      onChange={() => setVerificationFilter(0)}
                      className="text-cyan focus:ring-cyan"
                    />
                    <span>All Talent</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="verification"
                      checked={verificationFilter === 1}
                      onChange={() => setVerificationFilter(1)}
                      className="text-cyan focus:ring-cyan"
                    />
                    <span>Level 1: PhilSys Verified</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="verification"
                      checked={verificationFilter === 2}
                      onChange={() => setVerificationFilter(2)}
                      className="text-cyan focus:ring-cyan"
                    />
                    <span>Level 2: PRC / BIR Audited</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="verification"
                      checked={verificationFilter === 3}
                      onChange={() => setVerificationFilter(3)}
                      className="text-cyan focus:ring-cyan"
                    />
                    <span>Level 3: Portfolio Certified</span>
                  </label>
                </div>
              </div>

              {/* Budget Range */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  <span>Max Budget</span>
                  <span className="font-mono-currency text-cyan">
                    {formatCurrency(maxBudget)}
                  </span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={100000}
                  step={5000}
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  className="w-full accent-cyan"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono-currency">
                  <span>₱5,000</span>
                  <span>₱100,000+</span>
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSelectedCluster("all");
                  setSearchQuery("");
                  setVerificationFilter(0);
                  setMaxBudget(100000);
                }}
                className="w-full py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200 mt-2"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="lg:col-span-3 space-y-6">
          {/* Active Filter Chips & Sort Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Active:</span>
              {selectedCluster !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan/15 text-cyan-700 text-xs font-semibold">
                  <span>{selectedCluster}</span>
                  <button onClick={() => setSelectedCluster("all")}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
              {verificationFilter > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald/15 text-emerald-700 text-xs font-semibold">
                  <span>Tier {verificationFilter}+</span>
                  <button onClick={() => setVerificationFilter(0)}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                  <span>"{searchQuery}"</span>
                  <button onClick={() => setSearchQuery("")}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs font-semibold rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none"
              >
                <option value="rating">Highest Rated</option>
                <option value="lowest-deposit">Lowest Milestone Deposit</option>
                <option value="price-low">Lowest Full Contract</option>
                <option value="price-high">Highest Full Contract</option>
              </select>
            </div>
          </div>

          {/* 3-Column Services Grid */}
          {filteredServices.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-3">
              <p className="text-sm font-bold text-slate-700">No verified listings match your selected filters.</p>
              <p className="text-xs text-slate-400">Try loosening your budget, clearing search terms, or exploring other DavNor clusters.</p>
              <button
                onClick={() => {
                  setSelectedCluster("all");
                  setSearchQuery("");
                  setVerificationFilter(0);
                  setMaxBudget(100000);
                }}
                className="px-4 py-2 bg-navy text-white text-xs font-bold rounded-xl"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Work Preview / Escrow Banner */}
                    <div className="h-40 bg-slate-900 relative overflow-hidden flex items-center justify-center p-4 text-center">
                      <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-90" />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-emerald text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        <Lock className="w-3 h-3" />
                        <span>Escrow Protected</span>
                      </span>

                      <div className="relative z-10 text-white space-y-1">
                        <span className="text-[11px] font-mono-currency text-cyan uppercase tracking-wider">
                          {service.category}
                        </span>
                        <div className="text-xs font-bold text-slate-200 line-clamp-2">
                          {service.title}
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-100 ring-1 ring-slate-200 shrink-0">
                          <Image
                            src={service.freelancer.avatarUrl}
                            alt={service.freelancer.fullName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-bold text-navy truncate">
                            {service.freelancer.fullName}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">
                            {service.municipality}
                          </div>
                        </div>
                      </div>

                      {/* Credential Tag */}
                      <div>
                        <VerificationBadges
                          tier={service.freelancer.verificationTier}
                          prcLicense={service.freelancer.prcLicense}
                        />
                      </div>

                      {/* Rating & Turnaround */}
                      <div className="flex items-center justify-between text-xs pt-1">
                        <div className="flex items-center gap-1 text-amber">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="font-bold">{service.rating.toFixed(2)}</span>
                          <span className="text-slate-400">({service.reviewsCount})</span>
                        </div>
                        <span className="text-[11px] text-slate-500">
                          ~{service.deliveryDays} days turnaround
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Deposits & Action */}
                  <div className="p-5 bg-slate-50 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Initial Milestone</span>
                        <span className="font-mono-currency font-bold text-navy text-sm">
                          {formatCurrency(service.startingDeposit)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block">Full Contract</span>
                        <span className="font-mono-currency font-semibold text-slate-700">
                          {formatCurrency(service.fullContractPrice)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Link
                        href={`/services/${service.id}`}
                        className="py-2 text-center rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-colors"
                      >
                        Quick Scope
                      </Link>
                      <Link
                        href={`/checkout?serviceId=${service.id}`}
                        className="py-2 text-center rounded-xl bg-cyan hover:bg-cyan-600 text-white text-xs font-bold transition-all shadow-sm"
                      >
                        Fund Escrow
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
