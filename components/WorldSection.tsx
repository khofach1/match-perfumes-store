"use client";

import { motion } from "framer-motion";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

export default function WorldSection() {
  return (
    <section id="world" className="min-h-[80vh] bg-bone flex items-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2">
        {/* Dark panel — left 50% */}
        <motion.div
          {...reveal}
          className="relative aspect-[3/4] lg:aspect-auto lg:min-h-[80vh] bg-[#1A1A18] flex items-end overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(255,255,255,0.03)_0%,transparent_100%)]" />
          <p className="relative z-10 px-10 pb-10 text-[10px] font-medium uppercase tracking-[0.28em] text-white/30">
            Maison A — Tanger, Maroc
          </p>
        </motion.div>

        {/* Text — right 50% */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-24 xl:px-24"
        >
          <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.28em] text-tangier">
            Maison A — Tanger
          </p>

          <h2 className="font-display text-display-lg font-light text-ink leading-none">
            Le parfum comme mémoire.
          </h2>

          <p className="mt-10 max-w-prose text-base leading-8 text-ink-soft">
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
