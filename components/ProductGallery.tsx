"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  return (
    <motion.div {...reveal}>
      {/* Mobile horizontal gallery */}
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scrollbar-hide lg:hidden">
        {images.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="relative aspect-[4/5] w-full shrink-0 snap-center"
          >
            <Image
              src={image}
              alt={`${name} ${index + 1}`}
              fill
              priority={index === 0}
              className="object-contain"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Desktop stacked gallery */}
      <div className="hidden space-y-5 lg:block">
        {images.map((image, index) => (
          <div key={`${image}-${index}`} className="relative aspect-[4/5]">
            <Image
              src={image}
              alt={`${name} ${index + 1}`}
              fill
              priority={index === 0}
              className="object-contain"
              sizes="28rem"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
