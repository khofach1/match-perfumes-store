"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { lang } = useLanguage();
  const isFr = lang === "fr";

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-end overflow-hidden bg-[#1A1A18] pb-32">
      {/* Hero image */}
      <Image
        src="/images/hero/hero.png"
        alt="Anar Perfumes"
        fill
        priority
        className="object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Editorial copy */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 text-[10px] font-medium uppercase tracking-[0.28em] text-bone/60"
        >
          {isFr ? "Anar Perfumes — Maroc, Est. 2026" : "Anar Perfumes — Morocco, Est. 2026"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-display-xl font-light leading-none text-bone"
        >
          {isFr ? "Les Meilleures\nFragrances" : "The Finest\nFragrances"}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="my-6 h-px origin-center bg-bone/30"
          style={{ width: "60px" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-lg font-light italic text-bone/70"
        >
          {isFr
            ? "Les fragrances authentiques livrées partout au Maroc"
            : "Authentic fragrances delivered across Morocco"}
        </motion.p>

        <Link
          href="/products"
          className="mt-8 inline-flex items-center border border-bone/40 px-8 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-bone/80 transition-all duration-300 hover:border-bone/80 hover:bg-bone/10 hover:text-bone"
        >
          {isFr ? "Découvrir" : "Shop Now"}
        </Link>
      </div>

      {/* Scroll indicator */}
      <span className="absolute bottom-8 left-1/2 -translate-x-1/2 block text-[9px] font-medium uppercase tracking-[0.3em] text-bone/40">
        {isFr ? "↓ Découvrir" : "↓ Explore"}
      </span>
    </section>
  );
}
