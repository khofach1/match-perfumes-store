"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Star, ShoppingBag, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

type Tab = "description" | "notes" | "howToUse";

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={s <= Math.round(rating) ? "fill-brand-gold text-brand-gold dark:fill-[#C19A6B] dark:text-[#C19A6B]" : "text-brand-border dark:text-[#3A3228]"}
        />
      ))}
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();

  const product = products.find((p) => p.slug === slug);
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.slug !== slug)
    .slice(0, 4);

  const [selectedSize, setSelectedSize] = useState(product?.sizes[1] ?? product?.sizes[0] ?? "50ml");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-bg dark:bg-[#0F0D0A] flex flex-col items-center justify-center gap-4">
        <h1 className="text-brand-text-primary dark:text-[#F5F0E8] text-2xl font-semibold">
          Product not found
        </h1>
        <Link
          href="/products"
          className="border border-brand-gold text-brand-gold px-6 py-2.5 rounded-lg hover:bg-brand-gold hover:text-brand-bg transition-all duration-300"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const name = lang === "fr" ? product.name.fr : product.name.en;
  const description = lang === "fr" ? product.description.fr : product.description.en;
  const images = product.images ?? [product.image];
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "description", label: t("product.description") },
    { key: "notes", label: t("product.notes") },
    { key: "howToUse", label: t("product.howToUse") },
  ];

  const tabContent: Record<Tab, string> = {
    description,
    notes: lang === "fr"
      ? "Notes de tête : Agrumes & Épices • Cœur : Floraux & Musc • Notes de fond : Oud, Ambre & Bois de Santal"
      : "Top Notes: Citrus & Spice • Heart: Florals & Musk • Base Notes: Oud, Amber & Sandalwood",
    howToUse: lang === "fr"
      ? "Vaporisez sur les points de pulsion : poignets, nuque et derrière les oreilles. Pour une meilleure tenue, appliquez sur une peau hydratée. Ne pas frotter après vaporisation."
      : "Spray on pulse points: wrists, neck, and behind ears. For best longevity, apply to moisturized skin. Do not rub after spraying.",
  };

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-[#0F0D0A]">
      {/* Breadcrumb */}
      <div className="bg-brand-surface dark:bg-[#1A1714] border-b border-brand-border dark:border-[#3A3228] py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-brand-text-secondary dark:text-[#A09080]">
          <Link href="/" className="hover:text-brand-gold dark:hover:text-[#C19A6B] transition-colors">
            {lang === "fr" ? "Accueil" : "Home"}
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-brand-gold dark:hover:text-[#C19A6B] transition-colors">
            {lang === "fr" ? "Parfums" : "Products"}
          </Link>
          <span>/</span>
          <span className="text-brand-text-primary dark:text-[#F5F0E8] truncate max-w-[200px]">{name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
          {/* Image Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-brand-surface dark:bg-[#1A1714] border border-brand-border dark:border-[#3A3228] group">
              <Image
                src={images[activeImage]}
                alt={name}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product.isNew && (
                <span className="absolute top-4 start-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {t("common.newArrival")}
                </span>
              )}
              {discount && (
                <span className="absolute top-4 end-4 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  -{discount}%
                </span>
              )}

              {/* Image nav arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((p) => (p - 1 + images.length) % images.length)}
                    className="absolute start-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-brand-bg/70 dark:bg-[#0F0D0A]/70 flex items-center justify-center text-brand-text-primary dark:text-[#F5F0E8] hover:bg-brand-gold hover:text-brand-bg transition-all duration-200"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setActiveImage((p) => (p + 1) % images.length)}
                    className="absolute end-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-brand-bg/70 dark:bg-[#0F0D0A]/70 flex items-center justify-center text-brand-text-primary dark:text-[#F5F0E8] hover:bg-brand-gold hover:text-brand-bg transition-all duration-200"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={[
                      "relative w-20 h-24 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all duration-200",
                      i === activeImage
                        ? "border-brand-gold"
                        : "border-brand-border dark:border-[#3A3228] hover:border-brand-gold/50",
                    ].join(" ")}
                  >
                    <Image
                      src={img}
                      alt={`${name} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-brand-text-primary dark:text-[#F5F0E8] mb-3 font-heading">
                {name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={product.rating} />
                <span className="text-brand-gold dark:text-[#C19A6B] font-semibold">{product.rating}</span>
                <span className="text-brand-text-secondary dark:text-[#A09080] text-sm">
                  ({product.reviewCount} {t("product.reviews")})
                </span>
              </div>

              {/* Stock status */}
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${product.inStock ? "bg-emerald-500" : "bg-red-500"}`}
                />
                <span
                  className={`text-sm font-medium ${product.inStock ? "text-emerald-400" : "text-red-400"}`}
                >
                  {product.inStock ? t("product.inStock") : t("product.outOfStock")}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-brand-gold dark:text-[#C19A6B] font-bold text-3xl">
                {product.price} {t("currency")}
              </span>
              {product.originalPrice && (
                <span className="text-brand-text-secondary dark:text-[#A09080] text-lg line-through">
                  {product.originalPrice} {t("currency")}
                </span>
              )}
              {discount && (
                <span className="text-sm text-emerald-400 font-semibold">
                  {lang === "fr" ? `Économisez ${discount}%` : `Save ${discount}%`}
                </span>
              )}
            </div>

            <div className="h-px bg-brand-border dark:bg-[#3A3228]" />

            {/* Size — static label */}
            <div className="flex items-center gap-3">
              <span className="text-brand-text-secondary dark:text-[#A09080] text-sm uppercase tracking-widest font-medium">
                {t("product.size")}:
              </span>
              <span className="px-5 py-2 rounded-xl text-sm font-semibold bg-brand-gold/10 border border-brand-gold/40 text-brand-gold uppercase tracking-wider">
                50ML
              </span>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-brand-text-primary dark:text-[#F5F0E8] font-medium text-sm mb-3 block uppercase tracking-widest">
                {t("product.quantity")}
              </label>
              <div className="flex items-center gap-0 border border-brand-border dark:border-[#3A3228] rounded-xl overflow-hidden w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-brand-text-secondary dark:text-[#A09080] hover:bg-brand-card dark:hover:bg-[#242018] hover:text-brand-gold dark:hover:text-[#C19A6B] transition-all duration-200"
                >
                  −
                </button>
                <span className="w-12 h-11 flex items-center justify-center text-brand-text-primary dark:text-[#F5F0E8] font-semibold border-x border-brand-border dark:border-[#3A3228]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-11 h-11 flex items-center justify-center text-brand-text-secondary dark:text-[#A09080] hover:bg-brand-card dark:hover:bg-[#242018] hover:text-brand-gold dark:hover:text-[#C19A6B] transition-all duration-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={[
                  "flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-base transition-all duration-300",
                  product.inStock
                    ? added
                      ? "bg-emerald-600 text-white"
                      : "bg-brand-gold text-brand-bg hover:bg-brand-gold-hover shadow-gold hover:shadow-gold-lg"
                    : "bg-brand-card dark:bg-[#242018] text-brand-text-secondary dark:text-[#A09080] cursor-not-allowed",
                ].join(" ")}
              >
                <ShoppingBag size={18} />
                {added ? t("product.addedToCart") : t("product.addToCart")}
              </button>
              <button
                onClick={() => setWishlisted((p) => !p)}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className={[
                  "w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-200",
                  wishlisted
                    ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                    : "border-brand-border dark:border-[#3A3228] text-brand-text-secondary dark:text-[#A09080] hover:border-brand-gold/50 hover:text-brand-gold dark:hover:text-[#C19A6B]",
                ].join(" ")}
              >
                <Heart size={18} className={wishlisted ? "fill-brand-gold" : ""} />
              </button>
              <button
                aria-label="Share product"
                className="w-12 h-12 rounded-xl border-2 border-brand-border dark:border-[#3A3228] text-brand-text-secondary dark:text-[#A09080] hover:border-brand-gold/50 hover:text-brand-gold dark:hover:text-[#C19A6B] transition-all duration-200 flex items-center justify-center"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <div className="border-b border-brand-border dark:border-[#3A3228] flex gap-0 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={[
                  "px-6 py-3 text-sm font-medium transition-all duration-200 relative",
                  activeTab === tab.key
                    ? "text-brand-gold dark:text-[#C19A6B]"
                    : "text-brand-text-secondary dark:text-[#A09080] hover:text-brand-text-primary dark:hover:text-[#F5F0E8]",
                ].join(" ")}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 start-0 end-0 h-0.5 bg-brand-gold dark:bg-[#C19A6B]" />
                )}
              </button>
            ))}
          </div>
          <div className="bg-brand-card dark:bg-[#242018] border border-brand-border dark:border-[#3A3228] rounded-2xl p-6 sm:p-8">
            <p className="text-brand-text-secondary dark:text-[#A09080] leading-relaxed text-base">
              {tabContent[activeTab]}
            </p>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-brand-gold dark:bg-[#C19A6B]" />
              <h2 className="text-2xl font-bold text-brand-text-primary dark:text-[#F5F0E8] font-heading">
                {t("product.relatedProducts")}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
