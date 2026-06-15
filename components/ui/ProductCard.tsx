"use client";

import { MouseEvent, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

function BottlePlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-bone-soft">
      <svg
        viewBox="0 0 40 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[60px] w-auto opacity-30"
        aria-hidden="true"
      >
        {/* Cap */}
        <rect x="14" y="0" width="12" height="7" rx="2" fill="#8B7E6A" />
        {/* Neck */}
        <rect x="16" y="7" width="8" height="11" rx="1" fill="#8B7E6A" />
        {/* Collar */}
        <rect x="11" y="16" width="18" height="4" rx="1" fill="#8B7E6A" />
        {/* Body */}
        <path
          d="M11 20 Q7 30 7 40 L7 70 Q7 74 11 74 L29 74 Q33 74 33 70 L33 40 Q33 30 29 20 Z"
          fill="#8B7E6A"
        />
      </svg>
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { lang, t } = useLanguage();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
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
      <article>
        {/* Image — dominant */}
        <div className="relative aspect-[3/4] overflow-hidden bg-bone-soft">
          {imgError ? (
            <BottlePlaceholder />
          ) : (
            <img
              src={product.image}
              alt={name}
              onError={() => setImgError(true)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          )}

          {/* Hover overlay */}
          <div className="pointer-events-none absolute inset-0 bg-ink/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Add to cart — slides up from bottom */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={[
              "absolute inset-x-0 bottom-0 translate-y-full py-4 text-[0.65rem] font-medium uppercase tracking-[0.25em] transition-all duration-300 ease-out group-hover:translate-y-0",
              product.inStock
                ? added
                  ? "bg-tangier text-bone"
                  : "bg-ink text-bone hover:bg-tangier"
                : "cursor-not-allowed bg-sand text-bone",
            ].join(" ")}
          >
            {!product.inStock
              ? lang === "fr"
                ? "Rupture de stock"
                : "Out of Stock"
              : added
              ? t("product.addedToCart")
              : t("product.addToCart")}
          </button>

          {/* New badge — minimal */}
          {product.isNew && (
            <span className="absolute left-4 top-4 bg-bone/80 px-2.5 py-1 text-[0.55rem] font-medium uppercase tracking-[0.22em] text-ink backdrop-blur-sm">
              {lang === "fr" ? "Nouveau" : "New"}
            </span>
          )}

          {/* Offer indicator — price line, not a badge */}
          {product.isOffer && product.originalPrice && (
            <span className="absolute right-4 top-4 bg-ink/80 px-2.5 py-1 text-[0.55rem] font-medium uppercase tracking-[0.22em] text-bone backdrop-blur-sm">
              Sale
            </span>
          )}
        </div>

        {/* Product info */}
        <div className="pt-5">
          <p className="mb-1.5 text-[0.6rem] font-medium uppercase tracking-[0.24em] text-sand">
            {product.brand}
          </p>
          <h3 className="font-display text-xl font-medium leading-snug text-ink transition-colors duration-300 group-hover:text-ink-soft">
            {name}
          </h3>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-sm text-ink-soft">
              {product.price} {t("currency")}
            </span>
            {product.originalPrice && product.isOffer && (
              <span className="text-xs text-sand line-through">
                {product.originalPrice} {t("currency")}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
