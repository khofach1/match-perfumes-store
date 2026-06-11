"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const WORLD_IMAGE = "https://images.unsplash.com/photo-1548013146-72479768bada?w=900&q=80";

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
        {/* Image — left 50% */}
        <motion.div
          {...reveal}
          className="relative aspect-[3/4] lg:aspect-auto lg:min-h-[80vh] overflow-hidden bg-bone-soft"
        >
          <Image
            src={WORLD_IMAGE}
            alt="Une terrasse tangéroise — Maison A"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
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

          <p lang="ar" className="mt-4 font-arabic text-xl text-sand">
            العطر كذاكرة
          </p>

          <p className="mt-10 max-w-prose text-base leading-8 text-ink-soft">
            Chaque flacon est composé comme une lettre depuis une terrasse tangéroise — lentement,
            à la lumière de cinq heures. Nous travaillons avec des parfumeurs de Grasse et de Fès
            pour des matières premières qui portent leur propre histoire. Pas de scintillement.
            Pas d&apos;opulence. La grâce d&apos;un lieu qui n&apos;a rien à prouver.
          </p>

          <p lang="ar" className="mt-6 max-w-prose text-sm leading-8 text-sand font-arabic">
            كل قارورة تُصاغ كرسالة من شرفة طنجاوية — ببطء، في ضوء الساعة الخامسة. نعمل مع عطّارين
            من غراس وفاس لاستخدام مواد خام تحمل حكاياتها الخاصة. لا بريق. لا ثراء مبهرج.
            فقط رشاقة مكان لا يحتاج إلى إثبات شيء.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
