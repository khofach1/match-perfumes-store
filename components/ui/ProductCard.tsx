"use client";

import { MouseEvent, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { lang } = useLanguage();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const name = lang === "fr" ? product.name.fr : product.name.en;

  function handleAddToCart(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (!product.inStock) return;
    addToCart({ id: product.id, name, price: product.price, image: product.image, size: product.sizes[0] });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block bg-white">
      <article>
        {/* Image area */}
        <div className="relative aspect-square overflow-hidden bg-[#F5F5F5]">
          {imgError ? (
            <div className="flex h-full w-full items-center justify-center">
              <svg viewBox="0 0 40 80" fill="none" className="h-16 w-auto opacity-20">
                <rect x="14" y="0" width="12" height="7" rx="2" fill="#999" />
                <rect x="16" y="7" width="8" height="11" rx="1" fill="#999" />
                <rect x="11" y="16" width="18" height="4" rx="1" fill="#999" />
                <path d="M11 20 Q7 30 7 40 L7 70 Q7 74 11 74 L29 74 Q33 74 33 70 L33 40 Q33 30 29 20 Z" fill="#999" />
              </svg>
            </div>
          ) : (
            <img
              src={product.image}
              alt={name}
              onError={() => setImgError(true)}
              className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            />
          )}

          {/* Wishlist button */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            aria-label="Add to wishlist"
          >
            <Heart size={15} className="text-gray-400 hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* Product info */}
        <div className="p-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-black">
            {product.brand}
          </p>
          <h3 className="mt-0.5 text-sm font-medium leading-tight text-gray-700 line-clamp-2">
            {name}
          </h3>

          {/* Price */}
          <div className="mt-2 flex items-baseline gap-2">
            {product.isOffer && product.originalPrice ? (
              <>
                <span className="text-sm font-bold text-red-600">{product.price} DH</span>
                <span className="text-xs text-gray-400 line-through">{product.originalPrice} DH</span>
              </>
            ) : (
              <span className="text-sm font-bold text-black">{product.price} DH</span>
            )}
          </div>

          {/* Add to cart / Out of stock */}
          {product.inStock ? (
            <button
              onClick={handleAddToCart}
              className={[
                "mt-3 w-full py-2.5 text-[11px] font-semibold uppercase tracking-wider transition-colors",
                added
                  ? "bg-gray-700 text-white"
                  : "bg-black text-white hover:bg-gray-800",
              ].join(" ")}
            >
              {added
                ? (lang === "fr" ? "Ajouté ✓" : "Added ✓")
                : (lang === "fr" ? "Ajouter au panier" : "Add to Cart")}
            </button>
          ) : (
            <button
              disabled
              className="mt-3 w-full cursor-not-allowed bg-gray-200 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400"
            >
              {lang === "fr" ? "Rupture de stock" : "Out of Stock"}
            </button>
          )}
        </div>
      </article>
    </Link>
  );
}
