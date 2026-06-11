"use client";

import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="bg-bone-soft px-5 py-24 sm:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-display text-display-md font-light text-ink">Merci.</p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="bg-bone-soft px-5 py-24 sm:px-8 lg:py-32">
      <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-display-md font-light text-ink">
          Entrer dans la maison.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-ink-soft">
          Pour les nouvelles compositions, les éditions limitées, et les correspondances de la terrasse.
        </p>
        <form
          onSubmit={onSubmit}
          className="mx-auto mt-10 flex max-w-md items-center border-b border-ink/20 pb-2"
        >
          <input
            type="email"
            required
            placeholder="votre@email.com"
            className="min-h-12 flex-1 bg-transparent text-sm text-ink placeholder:text-sand focus:outline-none"
          />
          <button
            type="submit"
            aria-label="S'inscrire"
            className="flex h-10 w-10 items-center justify-center text-ink hover:text-tangier"
          >
            <ArrowRight size={18} />
          </button>
        </form>
      </motion.div>
    </section>
  );
}
