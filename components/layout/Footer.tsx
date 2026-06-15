"use client";

import Link from "next/link";
import { FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();
  const isFr = lang === "fr";

  return (
    <footer className="border-t border-gray-100 bg-white px-5 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-14 py-20 md:grid-cols-[1.5fr_1fr_1fr]">
        {/* BRAND */}
        <div>
          <Link href="/" className="inline-block">
            <span className="block text-xl font-black uppercase tracking-widest text-black">
              ANAR
            </span>
            <span className="block text-[8px] font-semibold uppercase tracking-[0.4em] text-gray-400 -mt-0.5">
              Perfumes
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-gray-500">
            {isFr
              ? "Des fragrances authentiques, soigneusement sélectionnées et livrées partout au Maroc."
              : "Authentic fragrances, carefully curated and delivered across Morocco."}
          </p>
        </div>

        {/* SHOP */}
        <div>
          <p className="mb-5 text-[11px] font-bold uppercase tracking-widest text-black">SHOP</p>
          <div className="grid gap-3">
            <Link href="/products" className="text-sm text-gray-500 hover:text-black">
              {isFr ? "Parfums" : "Fragrances"}
            </Link>
            <Link href="/products?new=true" className="text-sm text-gray-500 hover:text-black">
              {isFr ? "Nouveautés" : "New arrivals"}
            </Link>
            <Link href="/products?category=gifts" className="text-sm text-gray-500 hover:text-black">
              {isFr ? "Coffrets" : "Gift sets"}
            </Link>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <p className="mb-5 text-[11px] font-bold uppercase tracking-widest text-black">CONTACT</p>
          <div className="grid gap-3">
            <a
              href="https://wa.me/212665342318"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-black"
            >
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/anarperfumes"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-black"
            >
              <FaInstagram size={14} />
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@anae"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-black"
            >
              <FaTiktok size={14} />
              TikTok
            </a>
            <a
              href="https://www.facebook.com/anar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-black"
            >
              <FaFacebook size={14} />
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl border-t border-gray-100 py-6 text-center text-xs text-gray-400">
        <p>© 2026 ANAR PERFUMES · TANGER · CASABLANCA · TOUS DROITS RÉSERVÉS</p>
      </div>
    </footer>
  );
}
