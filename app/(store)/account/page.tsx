"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LogOut, Package, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabaseClient } from "@/lib/supabase-client";
import { useLanguage } from "@/context/LanguageContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OrderItem {
  name: string;
  size: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  order_number: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  created_at: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateString: string) {
  const d = new Date(dateString);
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

const STATUS_CONFIG = {
  pending:   { label_fr: "En attente", label_en: "Pending",   className: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  confirmed: { label_fr: "Confirmé",   label_en: "Confirmed", className: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  shipped:   { label_fr: "Expédié",    label_en: "Shipped",   className: "bg-purple-500/15 text-purple-400 border-purple-500/30" },
  delivered: { label_fr: "Livré",      label_en: "Delivered", className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
};

// ─── Auth form (not logged in) ────────────────────────────────────────────────

function AuthForm() {
  const { signIn, signUp } = useAuth();
  const { lang } = useLanguage();
  const [tab, setTab] = useState<"login" | "register">("login");

  // Shared
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Register only
  const [confirm, setConfirm] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);

  const switchTab = (t: "login" | "register") => {
    setTab(t);
    setError("");
    setEmail("");
    setPassword("");
    setConfirm("");
    setCheckEmail(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) setError(lang === "fr" ? "Email ou mot de passe incorrect." : "Incorrect email or password.");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError(lang === "fr" ? "Le mot de passe doit comporter au moins 8 caractères." : "Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError(lang === "fr" ? "Les mots de passe ne correspondent pas." : "Passwords do not match.");
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password);
    setLoading(false);
    if (error === "CHECK_EMAIL") {
      setCheckEmail(true);
    } else if (error) {
      setError(error);
    }
  };

  const inputClass = "w-full bg-brand-surface dark:bg-[#1A1714] border border-brand-border dark:border-[#3A3228] rounded-xl px-4 py-3 text-sm text-brand-text-primary dark:text-[#F5F0E8] placeholder-brand-text-secondary dark:placeholder-[#A09080] focus:outline-none focus:border-brand-gold dark:focus:border-[#C19A6B] transition-all duration-200";

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-[#0F0D0A] flex items-center justify-center px-4 py-16">
      <div
        className="w-full bg-brand-bg dark:bg-[#1A1714] rounded-2xl px-8 sm:px-12 py-10"
        style={{
          maxWidth: 460,
          border: "1px solid rgba(160,125,79,0.3)",
          boxShadow: "0 8px 48px rgba(160,125,79,0.06), 0 1px 8px rgba(0,0,0,0.04)",
        }}
      >
        {/* Brand */}
        <p className="text-center font-body mb-2" style={{ fontSize: 10, letterSpacing: "0.35em", color: "#A07D4F" }}>
          A N A R &nbsp; P E R F U M E S
        </p>
        <div className="flex justify-center mb-6">
          <span className="block h-px w-8" style={{ background: "#A07D4F" }} />
        </div>

        <h1 className="font-heading text-center text-brand-text-primary dark:text-[#F5F0E8] font-normal mb-6" style={{ fontSize: 28 }}>
          {lang === "fr" ? "Mon Compte" : "My Account"}
        </h1>

        {/* Tabs */}
        <div className="flex rounded-xl bg-brand-surface dark:bg-[#242018] p-1 mb-7">
          {(["login", "register"] as const).map((t) => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              className={[
                "flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                tab === t
                  ? "bg-brand-gold text-brand-bg shadow-sm"
                  : "text-brand-text-secondary dark:text-[#A09080] hover:text-brand-text-primary dark:hover:text-[#F5F0E8]",
              ].join(" ")}
            >
              {t === "login"
                ? (lang === "fr" ? "Se connecter" : "Sign in")
                : (lang === "fr" ? "Créer un compte" : "Register")}
            </button>
          ))}
        </div>

        {/* Check-email notice (after register with email confirm) */}
        {checkEmail && (
          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-sm text-emerald-400 text-center mb-6">
            {lang === "fr"
              ? "Vérifiez votre email pour confirmer votre compte."
              : "Check your email to confirm your account."}
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm text-center mb-5">{error}</p>
        )}

        {/* Login form */}
        {tab === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="flex items-center gap-1.5 text-brand-text-secondary dark:text-[#A09080] text-xs uppercase tracking-wider mb-2">
                <Mail size={12} />
                {lang === "fr" ? "Email" : "Email"}
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-brand-text-secondary dark:text-[#A09080] text-xs uppercase tracking-wider mb-2">
                <Lock size={12} />
                {lang === "fr" ? "Mot de passe" : "Password"}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputClass + " pr-11"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-brand-text-secondary dark:text-[#A09080] hover:text-brand-gold dark:hover:text-[#C19A6B] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-gold text-brand-bg font-semibold py-3.5 rounded-xl hover:bg-brand-gold-hover transition-all duration-300 shadow-gold text-sm mt-2 disabled:opacity-70"
            >
              {loading
                ? (lang === "fr" ? "Connexion…" : "Signing in…")
                : (lang === "fr" ? "Se connecter" : "Sign in")}
            </button>
          </form>
        )}

        {/* Register form */}
        {tab === "register" && !checkEmail && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="flex items-center gap-1.5 text-brand-text-secondary dark:text-[#A09080] text-xs uppercase tracking-wider mb-2">
                <Mail size={12} />
                Email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-brand-text-secondary dark:text-[#A09080] text-xs uppercase tracking-wider mb-2">
                <Lock size={12} />
                {lang === "fr" ? "Mot de passe" : "Password"}
                <span className="normal-case font-normal text-brand-text-secondary/60 dark:text-[#A09080]/60">
                  ({lang === "fr" ? "min. 8 caractères" : "min. 8 chars"})
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputClass + " pr-11"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-brand-text-secondary dark:text-[#A09080] hover:text-brand-gold dark:hover:text-[#C19A6B] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-brand-text-secondary dark:text-[#A09080] text-xs uppercase tracking-wider mb-2">
                <Lock size={12} />
                {lang === "fr" ? "Confirmer le mot de passe" : "Confirm password"}
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-gold text-brand-bg font-semibold py-3.5 rounded-xl hover:bg-brand-gold-hover transition-all duration-300 shadow-gold text-sm mt-2 disabled:opacity-70"
            >
              {loading
                ? (lang === "fr" ? "Création…" : "Creating…")
                : (lang === "fr" ? "Créer mon compte" : "Create my account")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Logged-in dashboard ──────────────────────────────────────────────────────

function Dashboard() {
  const { user, signOut } = useAuth();
  const { lang } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      if (!session?.access_token) {
        setOrdersLoading(false);
        return;
      }
      fetch("/api/account/orders", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      })
        .then((r) => r.json())
        .then((json) => {
          if (json.orders) setOrders(json.orders as Order[]);
        })
        .catch(() => {})
        .finally(() => setOrdersLoading(false));
    }).catch(() => setOrdersLoading(false));
  }, [user]);

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-[#0F0D0A] py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-brand-text-secondary dark:text-[#A09080] text-xs mb-1">
              {lang === "fr" ? "Bonjour," : "Hello,"} {user?.email}
            </p>
            <h1 className="font-heading text-brand-text-primary dark:text-[#F5F0E8] font-normal" style={{ fontSize: 32 }}>
              {lang === "fr" ? "Mon Compte" : "My Account"}
            </h1>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-1.5 text-brand-gold dark:text-[#C19A6B] text-sm hover:opacity-70 transition-opacity mt-1"
          >
            <LogOut size={14} />
            {lang === "fr" ? "Se déconnecter" : "Sign out"}
          </button>
        </div>

        {/* Decorative divider */}
        <div className="h-px w-full bg-brand-border dark:bg-[#3A3228] mb-10" />

        {/* Orders section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-brand-gold dark:bg-[#C19A6B]" />
            <h2 className="text-brand-text-primary dark:text-[#F5F0E8] font-semibold text-lg flex items-center gap-2">
              <Package size={18} className="text-brand-gold dark:text-[#C19A6B]" />
              {lang === "fr" ? "Mes Commandes" : "My Orders"}
            </h2>
          </div>

          {ordersLoading ? (
            <div className="flex justify-center py-16">
              <svg className="animate-spin h-6 w-6 text-brand-gold dark:text-[#C19A6B]" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ border: "1px solid rgba(160,125,79,0.3)", background: "rgba(160,125,79,0.05)" }}
              >
                <Package size={24} style={{ color: "#A07D4F" }} />
              </div>
              <p className="text-brand-text-secondary dark:text-[#A09080] text-sm">
                {lang === "fr" ? "Vous n'avez pas encore de commande." : "You have no orders yet."}
              </p>
              <Link
                href="/products"
                className="inline-block mt-5 border border-brand-gold dark:border-[#A07D4F] text-brand-gold dark:text-[#C19A6B] text-sm px-6 py-2.5 rounded-lg hover:bg-brand-gold hover:text-brand-bg transition-all duration-300"
              >
                {lang === "fr" ? "Découvrir nos parfums" : "Explore our perfumes"}
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const cfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
                const items = Array.isArray(order.items) ? (order.items as OrderItem[]) : [];
                return (
                  <div
                    key={order.id}
                    className="bg-brand-card dark:bg-[#1A1714] border border-brand-border dark:border-[#3A3228] rounded-2xl p-5 hover:border-brand-gold/30 dark:hover:border-[#A07D4F]/30 transition-colors duration-200"
                  >
                    {/* Order header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="text-brand-gold dark:text-[#C19A6B] font-bold text-base font-heading">
                          #{order.order_number}
                        </span>
                        <p className="text-brand-text-secondary dark:text-[#A09080] text-xs mt-0.5">
                          {formatDate(order.created_at)}
                        </p>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${cfg.className}`}>
                        {lang === "fr" ? cfg.label_fr : cfg.label_en}
                      </span>
                    </div>

                    {/* Items */}
                    <div className="space-y-1 mb-3">
                      {items.map((item, i) => (
                        <div key={i} className="flex items-baseline justify-between text-sm">
                          <span className="text-brand-text-primary dark:text-[#F5F0E8] truncate max-w-[65%]">
                            {item.name}
                            <span className="text-brand-text-secondary dark:text-[#A09080] text-xs ml-1">
                              ×{item.quantity}
                            </span>
                          </span>
                          <span className="text-brand-text-secondary dark:text-[#A09080] text-xs flex-shrink-0">
                            {(item.price * item.quantity).toFixed(2)} DH
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="flex items-center justify-between pt-3 border-t border-brand-border dark:border-[#3A3228]">
                      <span className="text-brand-text-secondary dark:text-[#A09080] text-xs uppercase tracking-widest">
                        Total
                      </span>
                      <span className="text-brand-gold dark:text-[#C19A6B] font-bold">
                        {order.total.toFixed(2)} DH
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AccountPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg dark:bg-[#0F0D0A] flex items-center justify-center">
        <svg className="animate-spin h-6 w-6 text-brand-gold dark:text-[#C19A6B]" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return user ? <Dashboard /> : <AuthForm />;
}
