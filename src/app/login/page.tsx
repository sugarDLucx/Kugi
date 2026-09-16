"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  Smartphone,
  Fingerprint,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"otp" | "password" | "passkey">("password");
  const [identifier, setIdentifier] = useState("marktan@architect.ph");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 py-12 bg-canvas">
      <div className="max-w-[480px] w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
        {/* Top Branding */}
        <div className="text-center space-y-2">
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-navy mx-auto flex items-center justify-center shadow-md">
            <Image src="/logo.png" alt="Kugi Logo" fill className="object-contain p-2" priority />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy">
              Welcome Back to Kugi<span className="text-cyan font-semibold">.ph</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Trabahong lokal, kalidad nga kasaligan
            </p>
          </div>
        </div>

        {/* 3 Authentication Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
          <button
            type="button"
            onClick={() => setTab("password")}
            className={`py-2 rounded-lg transition-all ${
              tab === "password" ? "bg-white text-navy shadow-xs" : "hover:text-navy"
            }`}
          >
            Password
          </button>
          <button
            type="button"
            onClick={() => setTab("otp")}
            className={`py-2 rounded-lg transition-all ${
              tab === "otp" ? "bg-white text-navy shadow-xs" : "hover:text-navy"
            }`}
          >
            Mobile OTP
          </button>
          <button
            type="button"
            onClick={() => setTab("passkey")}
            className={`py-2 rounded-lg transition-all ${
              tab === "passkey" ? "bg-white text-navy shadow-xs" : "hover:text-navy"
            }`}
          >
            Biometric
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleLogin} className="space-y-4">
          {tab === "password" && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Email or GCash Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. 0917-XXX-XXXX or name@email.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-cyan"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-10 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-cyan"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-cyan focus:ring-cyan"
                  />
                  <span>Remember this device (30 days)</span>
                </label>
                <a href="#" className="text-cyan font-semibold hover:underline">
                  Forgot?
                </a>
              </div>
            </>
          )}

          {tab === "otp" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Philippine Mobile Number (GCash)
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    placeholder="+63 9XX XXX XXXX"
                    defaultValue="+63 917 842 1920"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 font-mono-currency focus:outline-none focus:border-cyan"
                  />
                </div>
              </div>
              <p className="text-[11px] text-slate-500">
                A 6-digit one-time verification code will be sent via SMS to verify your mobile identity.
              </p>
            </div>
          )}

          {tab === "passkey" && (
            <div className="text-center py-6 space-y-3 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="w-14 h-14 rounded-full bg-cyan/15 flex items-center justify-center text-cyan mx-auto">
                <Fingerprint className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-sm text-navy">
                Fast Biometric Authentication
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Sign in using Windows Hello, Face ID, or PhilSys eGov digital credentials.
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-cyan hover:bg-cyan-600 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 mt-2"
          >
            <span>Sign In to Kugi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security Trust Callout */}
        <div className="p-3.5 rounded-xl bg-emerald/10 border border-emerald/20 flex items-start gap-2.5 text-xs text-emerald-900">
          <ShieldCheck className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
          <p className="text-[11px] text-emerald-800 leading-relaxed">
            <strong>256-Bit SSL Encrypted Session.</strong> Kugi will never ask for your GCash MPIN or one-time payment PIN over chat, phone, or email.
          </p>
        </div>

        {/* Footer Link */}
        <div className="text-center pt-2 text-xs text-slate-500">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-cyan font-bold hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
