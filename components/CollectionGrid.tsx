"use client";

import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

export default function CollectionGrid() {
  return (
    <section className="bg-bone px-5 pb-28 sm:px-8 lg:pb-40">
      <div className="mx-auto max-w-7xl">
        {/* Collection heading */}
        <motion.div {...reveal} className="mb-14">
          <p className="mb-5 text-eyebrow font-medium uppercase text-tangier">
            LA COLLECTION
          </p>
          <h2 className="font-display text-display-md font-light text-ink">
            Sept fragrances. Une terrasse.
          </h2>
        </motion.div>

        {/* Product grid */}
        <motion.div
          {...reveal}
          className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
