"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const HERO_IMAGE = "https://images.unsplash.com/photo-1539020140153-e479b8c08e3a?w=1920&q=80";

export default function Hero() {
  const { lang } = useLanguage();
  const isFr = lang === "fr";

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Full-bleed image */}
      <Image
        src={HERO_IMAGE}
        alt="Gulf fragrances — authentic Afnan, Lattafa, Armaf delivered across Morocco"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark veil for legibility */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,22,20,0.25)_0%,rgba(26,22,20,0.15)_50%,rgba(26,22,20,0.38)_100%)]" />

      {/* Bottom bone gradient lifts text off image */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bone/40 to-transparent" />

      {/* Editorial copy — bottom third */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-32 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 text-[10px] font-medium uppercase tracking-[0.28em] text-bone/80"
        >
          {isFr ? "Fragrances du Golfe — Maroc, Est. 2026" : "Gulf Fragrances — Morocco, Est. 2026"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-display-xl font-light text-bone leading-none"
        >
          {isFr ? "Les Meilleures Fragrances du Golfe" : "The Finest Gulf Fragrances"}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="my-6 h-px w-15 bg-bone/50 origin-center"
          style={{ width: "60px" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-lg italic font-light text-bone/85"
        >
          {isFr
            ? "Afnan, Lattafa, Armaf et bien plus — livrés partout au Maroc"
            : "Authentic Afnan, Lattafa, Armaf & more — delivered across Morocco"}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <Link
            href="/products"
            className="inline-flex items-center border border-bone/60 px-8 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-bone/90 hover:bg-bone/10 transition-colors duration-300"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-[9px] font-medium uppercase tracking-[0.3em] text-bone/50"
        >
          {isFr ? "↓ Découvrir" : "↓ Explore"}
        </motion.span>
      </motion.div>
    </section>
  );
}
