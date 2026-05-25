"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star, Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          className={
            star <= Math.round(rating)
              ? "fill-brand-gold text-brand-gold dark:fill-[#C19A6B] dark:text-[#C19A6B]"
              : "text-brand-border dark:text-[#3A3228]"
          }
        />
      ))}
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const name = lang === "fr" ? product.name.fr : product.name.en;
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name,
      price: product.price,
      image: product.image,
      size: product.sizes[1] ?? product.sizes[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((prev) => !prev);
  };

  return (
    <Link href={`/products/${product.slug}`} className="block group">
      <div className="bg-brand-card dark:bg-[#1A1714] border border-brand-border dark:border-[#3A3228] rounded-xl overflow-hidden transition-all duration-300 hover:border-brand-gold/40 hover:shadow-gold">
        {/* Image container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-brand-surface dark:bg-[#242018]">
          <Image
            src={product.image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 start-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                {t("common.newArrival")}
              </span>
            )}
            {product.isOffer && (
              <span className="bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                {discount ? `-${discount}%` : t("common.onSale")}
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-3 end-3 w-8 h-8 rounded-full bg-brand-bg/80 dark:bg-[#0F0D0A]/80 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:bg-brand-gold/20 border border-brand-border dark:border-[#3A3228] hover:border-brand-gold/50"
          >
            <Heart
              size={14}
              className={
                wishlisted
                  ? "fill-brand-gold text-brand-gold dark:fill-[#C19A6B] dark:text-[#C19A6B]"
                  : "text-brand-text-secondary dark:text-[#A09080]"
              }
            />
          </button>

          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-brand-bg/70 dark:bg-[#0F0D0A]/70 flex items-center justify-center">
              <span className="text-brand-text-secondary dark:text-[#A09080] text-sm font-medium border border-brand-border dark:border-[#3A3228] px-3 py-1 rounded-full bg-brand-card/80 dark:bg-[#1A1714]/80">
                {t("product.outOfStock")}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-brand-text-primary dark:text-[#F5F0E8] font-semibold text-sm mb-1 truncate group-hover:text-brand-gold dark:group-hover:text-[#C19A6B] transition-colors duration-200">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <StarRating rating={product.rating} />
            <span className="text-brand-text-secondary dark:text-[#A09080] text-xs">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-brand-gold dark:text-[#C19A6B] font-bold text-base">
              {product.price} {t("currency")}
            </span>
            {product.originalPrice && (
              <span className="text-brand-text-secondary dark:text-[#A09080] text-xs line-through">
                {product.originalPrice} {t("currency")}
              </span>
            )}
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={[
              "w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300",
              product.inStock
                ? added
                  ? "bg-emerald-600 text-white border border-emerald-600"
                  : "border border-brand-gold dark:border-[#A07D4F] text-brand-gold dark:text-[#C19A6B] hover:bg-brand-gold hover:text-brand-bg dark:bg-[#1A1714] dark:hover:bg-brand-gold dark:hover:text-brand-bg"
                : "border border-brand-border dark:border-[#3A3228] text-brand-text-secondary dark:text-[#A09080] cursor-not-allowed opacity-50",
            ].join(" ")}
          >
            <ShoppingBag size={15} />
            {added ? t("product.addedToCart") : t("product.addToCart")}
          </button>
        </div>
      </div>
    </Link>
  );
}
