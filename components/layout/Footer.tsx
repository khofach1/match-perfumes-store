"use client";

import Link from "next/link";
import { FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();
  const isFr = lang === "fr";

  return (
    <footer className="border-t border-border bg-bone-soft px-5 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-14 py-20 md:grid-cols-[1.5fr_1fr_1fr]">
        {/* BRAND */}
        <div>
          <Link href="/" className="inline-block">
            <span className="block font-display text-5xl font-light leading-none text-ink">
              Anar
            </span>
            <span className="mt-2 block text-[0.62rem] font-medium uppercase tracking-[0.34em] text-tangier">
              Perfumes
            </span>
          </Link>
          <p className="mt-7 max-w-sm text-sm leading-7 text-ink-soft">
            {isFr
              ? "Des fragrances authentiques, soigneusement sélectionnées et livrées partout au Maroc."
              : "Authentic fragrances, carefully curated and delivered across Morocco."}
          </p>
        </div>

        {/* SHOP */}
        <div>
          <p className="mb-5 text-eyebrow font-medium uppercase text-sand">SHOP</p>
          <div className="grid gap-3">
            <Link href="/products" className="text-sm text-ink-soft hover:text-tangier">
              {isFr ? "Parfums" : "Fragrances"}
            </Link>
            <Link href="/products?new=true" className="text-sm text-ink-soft hover:text-tangier">
              {isFr ? "Nouveautés" : "New arrivals"}
            </Link>
            <Link href="/products?category=gifts" className="text-sm text-ink-soft hover:text-tangier">
              {isFr ? "Coffrets" : "Gift sets"}
            </Link>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <p className="mb-5 text-eyebrow font-medium uppercase text-sand">CONTACT</p>
          <div className="grid gap-3">
            <a
              href="https://wa.me/212665342318"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-ink-soft hover:text-tangier"
            >
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/anarperfumes"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-ink-soft hover:text-tangier"
            >
              <FaInstagram size={14} />
              Instagram
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-sm text-ink-soft hover:text-tangier"
            >
              <FaTiktok size={14} />
              TikTok
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-sm text-ink-soft hover:text-tangier"
            >
              <FaFacebook size={14} />
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl border-t border-border py-6 text-center text-xs text-sand">
        <p>© 2026 ANAR PERFUMES · TANGER · CASABLANCA · TOUS DROITS RÉSERVÉS</p>
      </div>
    </footer>
  );
}
