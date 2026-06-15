"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, Share2, ShoppingBag, Star } from "lucide-react";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ui/ProductCard";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { products } from "@/data/products";

type Tab = "description" | "notes" | "howToUse";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= Math.round(rating) ? "fill-tangier text-tangier" : "text-border-strong"}
        />
      ))}
    </div>
  );
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const { lang, t } = useLanguage();
  const product = products.find((item) => item.slug === slug);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-bone px-5 pt-40 text-center">
        <h1 className="font-display text-5xl font-light text-ink">Product not found</h1>
        <Link href="/products" className="mt-8 inline-flex border-b border-tangier pb-2 text-tangier">
          Back to Products
        </Link>
      </div>
    );
  }

  const currentProduct = product;
  const name = lang === "fr" ? currentProduct.name.fr : currentProduct.name.en;
  const description = lang === "fr" ? currentProduct.description.fr : currentProduct.description.en;
  const selectedSize = currentProduct.sizes[0] ?? "50ml";
  const images = currentProduct.images?.length ? currentProduct.images : [currentProduct.image];
  const relatedProducts = products
    .filter((item) => item.category === currentProduct.category && item.slug !== currentProduct.slug)
    .slice(0, 4);

  const tabContent: Record<Tab, string> = {
    description,
    notes:
      lang === "fr"
        ? "Notes de tête : agrumes, épices douces. Coeur : fleurs blanches, musc propre. Fond : ambre, bois clairs, santal."
        : "Top notes: citrus, soft spice. Heart: white florals, clean musk. Base: amber, pale woods, sandalwood.",
    howToUse:
      lang === "fr"
        ? "Vaporisez sur les points de pulsation et laissez sécher naturellement. Le parfum se déploie mieux sur une peau hydratée."
        : "Spray on pulse points and let the fragrance dry naturally. It blooms best on moisturized skin.",
  };

  function handleAddToCart() {
    addToCart({
      id: currentProduct.id,
      name,
      price: currentProduct.price,
      image: currentProduct.image,
      size: selectedSize,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div className="min-h-screen bg-bone pt-28">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-5 py-6 text-xs uppercase tracking-[0.18em] text-sand sm:px-8">
        <Link href="/" className="hover:text-tangier">
          {lang === "fr" ? "Accueil" : "Home"}
        </Link>
        <span className="px-3">/</span>
        <Link href="/products" className="hover:text-tangier">
          {lang === "fr" ? "Parfums" : "Products"}
        </Link>
        <span className="px-3">/</span>
        <span className="text-ink">{name}</span>
      </div>

      {/* 60/40 gallery PDP */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-28 sm:px-8 lg:grid-cols-[28rem_1fr] lg:gap-20">
        <ProductGallery images={images} name={name} />

        <motion.aside {...reveal} className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-4 text-eyebrow font-medium uppercase text-tangier">
            {currentProduct.category}
          </p>
          <h1 className="font-display text-display-md font-light text-ink">
            {name}
          </h1>

          <div className="mt-6 flex items-center gap-4">
          <Rating rating={currentProduct.rating} />
            <span className="text-sm text-ink-soft">
              {currentProduct.reviewCount} {t("product.reviews")}
            </span>
          </div>

          <p className="mt-7 text-3xl font-medium text-ink">
            {currentProduct.price} {t("currency")}
          </p>

          <p className="mt-8 text-base leading-8 text-ink-soft">
            {description}
          </p>

          <div className="mt-10 border-y border-border py-7">
            <div className="flex items-center justify-between gap-5">
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-sand">
                {t("product.size")}
              </span>
              <span className="border border-border-strong px-5 py-2 text-xs font-medium uppercase tracking-[0.18em] text-ink">
                {selectedSize}
              </span>
            </div>

            <div className="mt-6 flex items-center justify-between gap-5">
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-sand">
                {t("product.quantity")}
              </span>
              <div className="flex items-center border border-border-strong">
                <button
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="flex h-11 w-11 items-center justify-center hover:text-tangier"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="flex h-11 w-12 items-center justify-center border-x border-border-strong text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((value) => value + 1)}
                  className="flex h-11 w-11 items-center justify-center hover:text-tangier"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-7 flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!currentProduct.inStock}
              className="flex min-h-14 flex-1 items-center justify-center gap-3 border border-ink bg-ink px-6 text-xs font-medium uppercase tracking-[0.2em] text-bone hover:bg-tangier hover:border-tangier disabled:border-border-strong disabled:bg-bone-soft disabled:text-sand"
            >
              <ShoppingBag size={17} />
              {added ? t("product.addedToCart") : t("product.addToCart")}
            </button>
            <button
              onClick={() => setWishlisted((value) => !value)}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className="flex h-14 w-14 items-center justify-center border border-border-strong text-ink hover:border-tangier hover:text-tangier"
            >
              <Heart size={18} className={wishlisted ? "fill-tangier text-tangier" : ""} />
            </button>
            <button
              aria-label={t("product.shareProduct")}
              className="flex h-14 w-14 items-center justify-center border border-border-strong text-ink hover:border-tangier hover:text-tangier"
            >
              <Share2 size={18} />
            </button>
          </div>

          <div className="mt-10">
            <div className="flex border-b border-border">
              {(["description", "notes", "howToUse"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={[
                    "flex-1 px-2 py-4 text-xs font-medium uppercase tracking-[0.18em]",
                    activeTab === tab ? "border-b border-tangier text-tangier" : "text-sand",
                  ].join(" ")}
                >
                  {t(`product.${tab}`)}
                </button>
              ))}
            </div>
            <p className="py-6 text-sm leading-8 text-ink-soft">
              {tabContent[activeTab]}
            </p>
          </div>
        </motion.aside>
      </section>

      {relatedProducts.length > 0 && (
        <section className="bg-bone-soft px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="mb-4 text-eyebrow font-medium uppercase text-tangier">
              {t("product.relatedProducts")}
            </p>
            <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
