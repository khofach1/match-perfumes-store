"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { count, openCart } = useCart();
  const { user } = useAuth();
  const { lang, t, toggleLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled && !mobileOpen && !searchOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchQuery.trim();
    if (query) router.push(`/products?search=${encodeURIComponent(query)}`);
    setSearchOpen(false);
  }

  const navItems = [
    { label: "SHOP", href: "/products" },
    { label: "WORLD", href: "/#world" },
  ];

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
        isTransparent
          ? "border-transparent bg-transparent text-bone"
          : "border-border bg-bone/94 text-ink backdrop-blur-md",
      ].join(" ")}
    >
      <nav className="mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8">
        {/* Left navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.slice(0, 2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-medium uppercase tracking-[0.22em] opacity-[0.82] hover:text-tangier"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen((value) => !value)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="flex h-11 w-11 items-center justify-center lg:hidden"
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        {/* Center logo */}
        <Link href="/" className="text-center" aria-label="Maison A home">
          <span className="block font-display text-3xl font-light leading-none tracking-normal sm:text-4xl">
            Maison A
          </span>
          <span className="mt-1 block text-[0.58rem] font-medium uppercase tracking-[0.38em]">
            Perfumes
          </span>
        </Link>

        {/* Right navigation and actions */}
        <div className="flex items-center justify-end gap-3">
          <div className="hidden items-center gap-8 lg:flex">
            {navItems.slice(2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-medium uppercase tracking-[0.22em] opacity-[0.82] hover:text-tangier"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setSearchOpen((value) => !value)}
            aria-label={searchOpen ? "Close search" : "Open search"}
            className="hidden h-10 w-10 items-center justify-center hover:text-tangier sm:flex"
          >
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>

          <button
            onClick={toggleLanguage}
            className="hidden text-xs font-medium uppercase tracking-[0.22em] hover:text-tangier sm:block"
            aria-label={lang === "en" ? "Switch to French" : "Switch to English"}
          >
            {lang === "en" ? "FR" : "EN"}
          </button>

          <Link
            href="/account"
            aria-label="Account"
            className="hidden h-10 w-10 items-center justify-center hover:text-tangier sm:flex"
          >
            <User size={18} />
            {user && <span className="ms-1 h-1.5 w-1.5 rounded-full bg-tangier" />}
          </Link>

          <button
            onClick={openCart}
            aria-label="Cart"
            className="relative flex h-11 w-11 items-center justify-center hover:text-tangier"
          >
            <ShoppingBag size={19} />
            {count > 0 && (
              <span className="absolute end-0 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-tangier px-1 text-[10px] font-medium text-bone">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Search field */}
      <div
        className={[
          "overflow-hidden border-t border-border bg-bone transition-all duration-300",
          searchOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <form onSubmit={onSearch} className="mx-auto flex max-w-3xl items-center gap-3 px-5 py-4 sm:px-8">
          <Search size={18} className="text-tangier" />
          <input
            autoFocus={searchOpen}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={t("nav.search")}
            className="min-h-11 flex-1 bg-transparent text-sm text-ink placeholder:text-sand focus:outline-none"
          />
        </form>
      </div>

      {/* Mobile menu */}
      <div
        className={[
          "overflow-hidden border-t border-border bg-bone transition-all duration-300 lg:hidden",
          mobileOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="px-5 py-5">
          <div className="grid gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-4 text-sm font-medium uppercase tracking-[0.2em] text-ink"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={toggleLanguage}
              className="py-4 text-start text-sm font-medium uppercase tracking-[0.2em] text-tangier"
            >
              {lang === "en" ? "Français" : "English"}
            </button>
            <Link
              href="/account"
              onClick={() => setMobileOpen(false)}
              className="py-4 text-sm font-medium uppercase tracking-[0.2em] text-ink"
            >
              {lang === "fr" ? "Mon compte" : "My account"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
