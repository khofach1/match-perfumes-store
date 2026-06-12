"use client";

import { motion } from "framer-motion";

export default function WorldSection() {
  return (
    <section id="world" className="bg-[#1A1A18] py-28 px-4 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-8 text-[10px] font-medium uppercase tracking-[0.32em] text-bone/40">
            Anar Perfumes — Tanger
          </p>

          <h2 className="font-display text-display-md font-light leading-none text-bone">
            Le parfum comme mémoire.
          </h2>

          <div className="my-10 h-px w-16 bg-bone/20" />

          <p className="max-w-2xl text-base leading-8 text-bone/60">
            Chaque flacon est composé comme une lettre depuis une terrasse tangéroise — lentement,
            à la lumière de cinq heures. Nous travaillons avec des parfumeurs de Grasse et de Fès
            pour des matières premières qui portent leur propre histoire. Pas de scintillement.
            Pas d&apos;opulence. La grâce d&apos;un lieu qui n&apos;a rien à prouver.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
