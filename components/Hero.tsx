"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { lang } = useLanguage();
  const isFr = lang === "fr";

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-end overflow-hidden bg-[#1A1A18] pb-32">
      {/* Subtle depth gradient — no image required */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,255,255,0.04)_0%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#1A1A18] to-transparent" />

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

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <Link
            href="/products"
            className="inline-flex items-center border border-bone/40 px-8 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-bone/80 transition-all duration-300 hover:border-bone/80 hover:bg-bone/10 hover:text-bone"
          >
            {isFr ? "Découvrir" : "Shop Now"}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block text-[9px] font-medium uppercase tracking-[0.3em] text-bone/40"
        >
          {isFr ? "↓ Découvrir" : "↓ Explore"}
        </motion.span>
      </motion.div>
    </section>
  );
}
