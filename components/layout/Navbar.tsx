"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import MegaMenu from "./MegaMenu";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface NavItem {
  label: string;
  href: string;
  isOffer?: boolean;
  isNew?: boolean;
  hasMegaMenu?: boolean;
}

export default function Navbar() {
  const { t, lang } = useLanguage();
  const { count, openCart } = useCart();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: t("nav.offers"), href: "/products?offer=true", isOffer: true },
    { label: t("nav.perfumes"), href: "/products", hasMegaMenu: true },
    { label: t("nav.giftsAndSets"), href: "/products?category=gifts" },
    { label: t("nav.newArrival"), href: "/products?new=true", isNew: true },
    { label: t("nav.matchBeauty"), href: "/products?category=beauty" },
  ];

  const handleMegaEnter = () => {
    if (megaMenuTimer.current) clearTimeout(megaMenuTimer.current);
    setMegaMenuOpen(true);
  };

  const handleMegaLeave = () => {
    megaMenuTimer.current = setTimeout(() => setMegaMenuOpen(false), 150);
  };

  return (
    <>
      <nav
        className={[
          "sticky top-0 z-40 bg-brand-bg dark:bg-[#0F0D0A] border-b border-brand-border dark:border-[#3A3228] transition-all duration-300",
          scrolled ? "shadow-gold" : "",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col items-center group">
              <span className="text-brand-gold dark:text-[#C19A6B] font-heading text-2xl md:text-3xl font-bold tracking-widest leading-none group-hover:text-brand-gold-hover transition-colors duration-200">
                ANAR
              </span>
              <span className="text-brand-text-secondary dark:text-[#A09080] text-[9px] tracking-[0.3em] uppercase font-medium">
                PERFUMES
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) =>
                item.hasMegaMenu ? (
                  <div
                    key={item.href}
                    className="relative"
                    ref={megaMenuRef}
                    onMouseEnter={handleMegaEnter}
                    onMouseLeave={handleMegaLeave}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-1 px-3 py-2 text-sm text-brand-text-secondary dark:text-[#A09080] hover:text-brand-gold dark:hover:text-[#C19A6B] transition-colors duration-200 relative group"
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${megaMenuOpen ? "rotate-180" : ""}`}
                      />
                      <span className="absolute bottom-0 start-0 end-0 h-0.5 bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-start" />
                    </Link>
                    {megaMenuOpen && (
                      <div onMouseEnter={handleMegaEnter} onMouseLeave={handleMegaLeave}>
                        <MegaMenu onClose={() => setMegaMenuOpen(false)} />
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "relative px-3 py-2 text-sm transition-colors duration-200 group",
                      item.isOffer
                        ? "text-red-400 hover:text-red-300 font-semibold"
                        : "text-brand-text-secondary dark:text-[#A09080] hover:text-brand-gold dark:hover:text-[#C19A6B]",
                    ].join(" ")}
                  >
                    {item.label}
                    {item.isNew && (
                      <span className="absolute -top-1 -end-1 w-2 h-2 rounded-full bg-emerald-500" />
                    )}
                    <span className="absolute bottom-0 start-0 end-0 h-0.5 bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-start" />
                  </Link>
                )
              )}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                {searchOpen && (
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("nav.search")}
                    className="absolute end-10 top-1/2 -translate-y-1/2 w-52 bg-brand-surface dark:bg-[#1A1714] border border-brand-gold/50 rounded-lg px-3 py-1.5 text-sm text-brand-text-primary dark:text-[#F5F0E8] placeholder-brand-text-secondary dark:placeholder-[#6B5E50] focus:outline-none animate-slideUp"
                  />
                )}
                <button
                  onClick={() => setSearchOpen((p) => !p)}
                  aria-label={searchOpen ? "Close search" : "Open search"}
                  className="w-9 h-9 flex items-center justify-center text-brand-text-secondary dark:text-[#A09080] hover:text-brand-gold dark:hover:text-[#C19A6B] transition-colors duration-200 rounded-full hover:bg-brand-card dark:hover:bg-[#242018]"
                >
                  {searchOpen ? <X size={18} /> : <Search size={18} />}
                </button>
              </div>

              {/* Theme toggle — between search and cart */}
              <ThemeToggle />

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative w-9 h-9 flex items-center justify-center text-brand-text-secondary dark:text-[#A09080] hover:text-brand-gold dark:hover:text-[#C19A6B] transition-colors duration-200 rounded-full hover:bg-brand-card dark:hover:bg-[#242018]"
              >
                <ShoppingBag size={18} />
                {count > 0 && (
                  <span className="absolute -top-1 -end-1 w-5 h-5 bg-brand-gold text-brand-bg text-[10px] font-bold rounded-full flex items-center justify-center">
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </button>

              {/* User / Account */}
              <Link
                href="/account"
                aria-label="Account"
                className={[
                  "relative hidden sm:flex w-9 h-9 items-center justify-center transition-colors duration-200 rounded-full hover:bg-brand-card dark:hover:bg-[#242018]",
                  user
                    ? "text-brand-text-secondary dark:text-[#A09080] hover:text-brand-gold dark:hover:text-[#C19A6B]"
                    : "text-brand-gold/70 dark:text-[#C19A6B]/70 hover:text-brand-gold dark:hover:text-[#C19A6B] ring-1 ring-brand-gold/40 dark:ring-[#C19A6B]/40",
                ].join(" ")}
              >
                <User size={18} />
                {user && (
                  <span className="absolute -top-0.5 -end-0.5 w-2.5 h-2.5 rounded-full bg-brand-gold dark:bg-[#C19A6B] border-2 border-brand-bg dark:border-[#0F0D0A]" />
                )}
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen((p) => !p)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className="lg:hidden w-11 h-11 flex items-center justify-center text-brand-text-secondary dark:text-[#A09080] hover:text-brand-gold dark:hover:text-[#C19A6B] transition-colors duration-200 rounded-full hover:bg-brand-card dark:hover:bg-[#242018]"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={[
            "lg:hidden border-t border-brand-border dark:border-[#3A3228] bg-brand-surface dark:bg-[#1A1714] overflow-hidden transition-all duration-300",
            mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={[
                  "flex items-center px-4 py-3 rounded-xl text-sm transition-all duration-200",
                  item.isOffer
                    ? "text-red-400 hover:bg-brand-red/10 font-semibold"
                    : "text-brand-text-secondary dark:text-[#A09080] hover:text-brand-gold dark:hover:text-[#C19A6B] hover:bg-brand-card dark:hover:bg-[#242018]",
                ].join(" ")}
              >
                {item.label}
                {item.isNew && (
                  <span className="ms-2 w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                )}
              </Link>
            ))}
            <div className="pt-3 border-t border-brand-border dark:border-[#3A3228] space-y-1">
              <Link
                href="/cart"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-brand-text-secondary dark:text-[#A09080] hover:text-brand-gold dark:hover:text-[#C19A6B] hover:bg-brand-card dark:hover:bg-[#242018] transition-all duration-200"
              >
                <ShoppingBag size={16} />
                {t("nav.cart")}
                {count > 0 && (
                  <span className="ms-auto bg-brand-gold text-brand-bg text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-brand-text-secondary dark:text-[#A09080] hover:text-brand-gold dark:hover:text-[#C19A6B] hover:bg-brand-card dark:hover:bg-[#242018] transition-all duration-200"
              >
                <User size={16} />
                {lang === "fr" ? "Mon Compte" : "My Account"}
                {user && (
                  <span className="ms-auto w-2 h-2 rounded-full bg-brand-gold dark:bg-[#C19A6B]" />
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
