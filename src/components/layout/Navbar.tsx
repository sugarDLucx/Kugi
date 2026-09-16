"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  ShieldCheck,
  PlusCircle,
  Bell,
  MessageSquare,
  Repeat,
  Menu,
  X,
} from "lucide-react";
import { useKugiStore } from "@/lib/store";
import { DAVNOR_CLUSTERS } from "@/lib/mock-data";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    activeRole,
    toggleRole,
    selectedCluster,
    setSelectedCluster,
    searchQuery,
    setSearchQuery,
  } = useKugiStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/services?q=${encodeURIComponent(searchQuery)}&cluster=${selectedCluster}`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-navy flex items-center justify-center shadow-md">
              <Image
                src="/logo.png"
                alt="Kugi Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-navy group-hover:text-cyan transition-colors">
                Kugi<span className="text-cyan font-semibold">.ph</span>
              </span>
              <span className="text-[10px] text-slate-500 hidden xl:inline font-medium">
                Trabahong lokal, kalidad nga kasaligan
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Search & 4-Cluster Dropdown */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden lg:flex items-center bg-slate-100 rounded-xl px-3 py-1.5 flex-1 max-w-xl border border-slate-200 focus-within:border-cyan focus-within:ring-2 focus-within:ring-cyan/20 transition-all"
        >
          <div className="flex items-center gap-1.5 pr-2 border-r border-slate-300 shrink-0 text-slate-700">
            <MapPin className="w-4 h-4 text-cyan" />
            <select
              value={selectedCluster}
              onChange={(e) => setSelectedCluster(e.target.value)}
              aria-label="Select Davao del Norte Cluster"
              className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer pr-1"
            >
              <option value="all">All Davao del Norte</option>
              {DAVNOR_CLUSTERS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center flex-1 pl-3 gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 'CAD blueprints', 'BIR 2307 bookkeeper'..."
              className="w-full bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </form>

        {/* Right Actions & Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/services"
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
              pathname.startsWith("/services")
                ? "bg-navy text-white shadow-sm"
                : "text-slate-700 hover:text-navy hover:bg-slate-100"
            }`}
          >
            Marketplace
          </Link>
          <Link
            href="/messages/KG-90241"
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
              pathname.startsWith("/messages")
                ? "bg-navy text-white shadow-sm"
                : "text-slate-700 hover:text-navy hover:bg-slate-100"
            }`}
          >
            Workroom
          </Link>
          <Link
            href="/trust-center"
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
              pathname.startsWith("/trust-center")
                ? "bg-navy text-white shadow-sm"
                : "text-slate-700 hover:text-navy hover:bg-slate-100"
            }`}
          >
            Trust Center
          </Link>
          <Link
            href="/dashboard"
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
              pathname.startsWith("/dashboard")
                ? "bg-navy text-white shadow-sm"
                : "text-slate-700 hover:text-navy hover:bg-slate-100"
            }`}
          >
            Dashboard
          </Link>
        </nav>

        {/* Dual-Role Toggle & Post Project CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Dual Role Switcher Button */}
          <button
            onClick={toggleRole}
            title={`Switch mode. Currently: ${activeRole} Mode`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[11px] font-semibold text-slate-800 transition-all shadow-2xs"
          >
            <Repeat className="w-3.5 h-3.5 text-cyan" />
            <span className="hidden sm:inline">Mode:</span>
            <span className={activeRole === "BUYER" ? "text-cyan font-bold" : "text-emerald font-bold"}>
              {activeRole === "BUYER" ? "Buyer" : "Pro"}
            </span>
          </button>

          {/* Post a Project Button */}
          <Link
            href="/projects/new"
            className="hidden sm:flex items-center gap-1.5 bg-cyan hover:bg-cyan-600 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-all shadow-sm hover:shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post a Project</span>
          </Link>

          {/* User Profile Avatar with Verification Badge */}
          <Link href="/profile/marktan_architect" className="relative shrink-0 group">
            <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-emerald ring-offset-2 bg-slate-100">
              <Image
                src="/avatar.png"
                alt="User Profile"
                width={36}
                height={36}
                className="object-cover"
              />
            </div>
            <span
              className="absolute -bottom-1 -right-1 bg-emerald text-white rounded-full p-0.5 shadow-xs"
              title="Level 2: PhilSys & PRC Verified"
            >
              <ShieldCheck className="w-3 h-3" />
            </span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="flex flex-col gap-2">
            <select
              value={selectedCluster}
              onChange={(e) => setSelectedCluster(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2 text-xs font-semibold text-slate-800"
            >
              <option value="all">All Davao del Norte</option>
              {DAVNOR_CLUSTERS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2 border border-slate-200">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services..."
                className="w-full bg-transparent text-xs text-slate-800 focus:outline-none"
              />
            </div>
          </form>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg text-center text-xs font-semibold bg-slate-100 text-slate-800"
            >
              Marketplace
            </Link>
            <Link
              href="/messages/KG-90241"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg text-center text-xs font-semibold bg-slate-100 text-slate-800"
            >
              Workroom
            </Link>
            <Link
              href="/trust-center"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg text-center text-xs font-semibold bg-slate-100 text-slate-800"
            >
              Trust Center
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg text-center text-xs font-semibold bg-slate-100 text-slate-800"
            >
              Dashboard
            </Link>
          </div>

          <Link
            href="/projects/new"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 bg-cyan text-white text-xs font-bold py-2.5 rounded-lg shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post a Project</span>
          </Link>
        </div>
      )}
    </header>
  );
}
