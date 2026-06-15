"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { lang } = useLanguage();
  const isFr = lang === "fr";

  return (
    <section className="relative flex h-[55vh] min-h-[320px] w-full items-end overflow-hidden bg-[#1A1A18]">
      <Image
        src="/images/hero/hero.png"
        alt="Anar Perfumes"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 w-full px-4 pb-10 sm:px-6 sm:pb-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/60">
            {isFr ? "Anar Perfumes — Maroc" : "Anar Perfumes — Morocco"}
          </p>
          <h1 className="text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
            {isFr ? "Les Meilleures Fragrances" : "The Finest Fragrances"}
          </h1>
          <Link
            href="/products"
            className="mt-5 inline-flex items-center bg-white px-7 py-2.5 text-[11px] font-bold uppercase tracking-widest text-black transition-colors hover:bg-gray-100"
          >
            {isFr ? "Voir la Collection" : "Shop Now"}
          </Link>
        </div>
      </div>
    </section>
  );
}
