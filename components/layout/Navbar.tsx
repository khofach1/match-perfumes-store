"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

const navLinks = [
  { labelFr: "Hommes",            labelEn: "Men",           href: "/products?category=men"    },
  { labelFr: "Femmes",            labelEn: "Women",         href: "/products?category=women"  },
  { labelFr: "Unisexe",           labelEn: "Unisex",        href: "/products?category=unisex" },
  { labelFr: "Meilleures Ventes", labelEn: "Best Sellers",  href: "/products?new=true"        },
  { labelFr: "Marques",           labelEn: "Brands",        href: "/products"                 },
  { labelFr: "Tous les produits", labelEn: "All Products",  href: "/products"                 },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { count, openCart } = useCart();
  const { user } = useAuth();
  const { lang, toggleLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = searchQuery.trim();
    if (q) router.push(`/products?search=${encodeURIComponent(q)}`);
    setSearchQuery("");
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm">
      {/* Row 1 — Logo | Search | Icons */}
      <div className="border-b border-gray-100">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center text-gray-700 lg:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="Anar Perfumes">
            <span className="block text-xl font-black uppercase tracking-widest text-black">
              ANAR
            </span>
            <span className="block text-[8px] font-semibold uppercase tracking-[0.4em] text-gray-400 -mt-0.5">
              Perfumes
            </span>
          </Link>

          {/* Search bar — grows to fill center */}
          <form
            onSubmit={onSearch}
            className="mx-4 flex flex-1 items-center overflow-hidden rounded-none border border-gray-300 bg-white focus-within:border-black transition-colors"
          >
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "fr" ? "Rechercher un parfum, une marque..." : "Search a fragrance or brand..."}
              className="h-10 flex-1 bg-transparent px-4 text-sm text-black placeholder:text-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="flex h-10 w-11 flex-shrink-0 items-center justify-center bg-black text-white hover:bg-gray-900 transition-colors"
              aria-label="Search"
            >
              <Search size={16} />
            </button>
          </form>

          {/* Right icons */}
          <div className="flex flex-shrink-0 items-center gap-1">
            <button
              onClick={toggleLanguage}
              className="hidden h-9 items-center px-2 text-xs font-semibold uppercase text-gray-500 hover:text-black sm:flex"
            >
              {lang === "en" ? "FR" : "EN"}
            </button>

            <Link
              href="/account"
              className="flex h-9 w-9 items-center justify-center text-gray-700 hover:text-black"
              aria-label="Account"
            >
              <User size={19} />
              {user && <span className="absolute top-3 h-1.5 w-1.5 rounded-full bg-black" />}
            </Link>

            <button
              onClick={openCart}
              className="relative flex h-9 w-9 items-center justify-center text-gray-700 hover:text-black"
              aria-label="Cart"
            >
              <ShoppingBag size={19} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-0.5 text-[9px] font-bold text-white">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Row 2 — Nav links (desktop only) */}
      <div className="hidden border-b border-gray-100 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-6 h-9">
          {navLinks.map((item) => (
            <Link
              key={item.href + item.labelFr}
              href={item.href}
              className="text-[11px] font-semibold uppercase tracking-wider text-gray-600 hover:text-black transition-colors whitespace-nowrap"
            >
              {lang === "fr" ? item.labelFr : item.labelEn}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white lg:hidden">
          <div className="px-4 py-3 flex flex-col gap-0.5">
            {navLinks.map((item) => (
              <Link
                key={item.href + item.labelFr}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-sm font-medium text-gray-700 border-b border-gray-50"
              >
                {lang === "fr" ? item.labelFr : item.labelEn}
              </Link>
            ))}
            <button
              onClick={toggleLanguage}
              className="py-3 text-left text-sm font-medium text-gray-500"
            >
              {lang === "fr" ? "Switch to English" : "Passer en Français"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
