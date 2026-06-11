"use client";

import { MouseEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { lang, t } = useLanguage();
  const [added, setAdded] = useState(false);
  const name = lang === "fr" ? product.name.fr : product.name.en;

  function handleAddToCart(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    addToCart({
      id: product.id,
      name,
      price: product.price,
      image: product.image,
      size: product.sizes[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <article className="relative">
        {/* Product image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-bone-soft">
          <Image
            src={product.image}
            alt={name}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/[0.08]" />

          {product.isNew && (
            <span className="absolute start-4 top-4 bg-bone/88 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-ink">
              {t("common.newArrival")}
            </span>
          )}

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={[
              "absolute inset-x-4 bottom-4 flex min-h-12 translate-y-4 items-center justify-center gap-2 border px-4 text-xs font-medium uppercase tracking-[0.2em] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
              product.inStock
                ? "border-ink bg-ink text-bone hover:bg-tangier hover:border-tangier"
                : "border-border-strong bg-bone text-sand",
            ].join(" ")}
          >
            <ShoppingBag size={15} />
            {added ? t("product.addedToCart") : t("product.addToCart")}
          </button>
        </div>

        {/* Product information */}
        <div className="pt-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-light leading-tight text-ink transition-colors duration-300 group-hover:text-tangier">
                {name}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-sand">
                {product.category}
              </p>
            </div>
            <p className="shrink-0 text-sm font-medium text-ink">
              {product.price} {t("currency")}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
