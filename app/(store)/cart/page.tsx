"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const { t, lang } = useLanguage();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const discount = promoApplied ? total * 0.1 : 0;
  const subtotalAfterDiscount = total - discount;
  const delivery = subtotalAfterDiscount >= 100 ? 0 : 20;
  const grandTotal = subtotalAfterDiscount + delivery;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "ANAR10") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError(lang === "fr" ? "Code promo invalide" : "Invalid promo code");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-bg dark:bg-[#0F0D0A] flex flex-col items-center justify-center gap-6 px-4">
        <div className="w-24 h-24 rounded-full bg-brand-card dark:bg-[#242018] border border-brand-border dark:border-[#3A3228] flex items-center justify-center">
          <ShoppingBag size={40} className="text-brand-text-secondary dark:text-[#A09080]" />
        </div>
        <div className="text-center">
          <h1 className="text-brand-text-primary dark:text-[#F5F0E8] text-2xl font-semibold mb-2">
            {t("cart.empty")}
          </h1>
          <p className="text-brand-text-secondary dark:text-[#A09080]">{t("cart.emptySubtext")}</p>
        </div>
        <Link
          href="/products"
          className="bg-brand-gold text-brand-bg font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-gold-hover transition-all duration-300 shadow-gold"
        >
          {t("cart.continueShopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-[#0F0D0A] py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-8 bg-brand-gold" />
            <span className="text-brand-gold text-xs uppercase tracking-widest">Shopping</span>
          </div>
          <h1
            className={[
              "text-3xl font-bold text-brand-text-primary dark:text-[#F5F0E8]",
              "font-heading",
            ].join(" ")}
          >
            {t("cart.title")}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="bg-brand-card dark:bg-[#242018] border border-brand-border dark:border-[#3A3228] rounded-2xl p-4 flex gap-4"
              >
                {/* Image */}
                <div className="relative w-24 h-28 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-brand-text-primary dark:text-[#F5F0E8] font-semibold text-base truncate">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-brand-text-secondary dark:text-[#A09080] hover:text-red-400 transition-colors flex-shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-brand-text-secondary dark:text-[#A09080] text-sm mb-3">{item.size}</p>

                  <div className="flex items-center justify-between">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-brand-border dark:border-[#3A3228] rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-brand-text-secondary dark:text-[#A09080] hover:bg-brand-surface dark:hover:bg-[#1A1714] hover:text-brand-gold dark:hover:text-[#C19A6B] transition-all"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="px-3 text-brand-text-primary dark:text-[#F5F0E8] text-sm font-semibold min-w-[32px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-brand-text-secondary dark:text-[#A09080] hover:bg-brand-surface dark:hover:bg-[#1A1714] hover:text-brand-gold dark:hover:text-[#C19A6B] transition-all"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Item total */}
                    <span className="text-brand-gold font-bold text-lg">
                      {(item.price * item.quantity).toFixed(2)} {t("currency")}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear cart */}
            <button
              onClick={clearCart}
              className="text-brand-text-secondary dark:text-[#A09080] text-sm hover:text-red-400 transition-colors duration-200 flex items-center gap-1"
            >
              <Trash2 size={14} />
              {lang === "fr" ? "Vider le panier" : "Clear Cart"}
            </button>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            {/* Promo Code */}
            <div className="bg-brand-card dark:bg-[#242018] border border-brand-border dark:border-[#3A3228] rounded-2xl p-5">
              <h3 className="text-brand-text-primary dark:text-[#F5F0E8] font-semibold mb-4 flex items-center gap-2">
                <Tag size={16} className="text-brand-gold" />
                {lang === "fr" ? "Code promo" : "Promo Code"}
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value);
                    setPromoError("");
                  }}
                  placeholder={lang === "fr" ? "Entrez le code" : "Enter code"}
                  className="flex-1 bg-brand-surface dark:bg-[#1A1714] border border-brand-border dark:border-[#3A3228] rounded-lg px-3 py-2 text-sm text-brand-text-primary dark:text-[#F5F0E8] placeholder-brand-text-secondary dark:placeholder-[#A09080] focus:outline-none focus:border-brand-gold dark:focus:border-[#C19A6B]"
                />
                <button
                  onClick={handleApplyPromo}
                  disabled={promoApplied}
                  className="bg-brand-gold text-brand-bg text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-gold-hover transition-all duration-200 disabled:opacity-50"
                >
                  {lang === "fr" ? "Appliquer" : "Apply"}
                </button>
              </div>
              {promoError && (
                <p className="text-red-400 text-xs mt-2">{promoError}</p>
              )}
              {promoApplied && (
                <p className="text-emerald-400 text-xs mt-2">
                  {lang === "fr" ? "✓ Remise de 10% appliquée !" : "✓ 10% discount applied!"}
                </p>
              )}
              <p className="text-brand-text-secondary dark:text-[#A09080] text-xs mt-3">
                {lang === "fr" ? "Essayez : ANAR10" : "Try: ANAR10"}
              </p>
            </div>

            {/* Summary */}
            <div className="bg-brand-card dark:bg-[#242018] border border-brand-border dark:border-[#3A3228] rounded-2xl p-5 space-y-4">
              <h3 className="text-brand-text-primary dark:text-[#F5F0E8] font-semibold text-lg">
                {lang === "fr" ? "Récapitulatif" : "Order Summary"}
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-brand-text-secondary dark:text-[#A09080]">{t("cart.subtotal")}</span>
                  <span className="text-brand-text-primary dark:text-[#F5F0E8]">
                    {total.toFixed(2)} {t("currency")}
                  </span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-emerald-400">
                    <span>{lang === "fr" ? "Remise (10%)" : "Discount (10%)"}</span>
                    <span>-{discount.toFixed(2)} {t("currency")}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-brand-text-secondary dark:text-[#A09080]">
                    {lang === "fr" ? "Livraison" : "Delivery"}
                  </span>
                  {delivery === 0 ? (
                    <span className="text-brand-gold dark:text-[#C19A6B] font-semibold">
                      {lang === "fr" ? "Gratuite" : "Free"}
                    </span>
                  ) : (
                    <span className="text-brand-text-primary dark:text-[#F5F0E8]">
                      {delivery} {t("currency")}
                    </span>
                  )}
                </div>
              </div>

              <div className="h-px bg-brand-border dark:bg-[#3A3228]" />

              <div className="flex justify-between items-center">
                <span className="text-brand-text-primary dark:text-[#F5F0E8] font-bold text-lg">
                  {t("cart.total")}
                </span>
                <span className="text-brand-gold font-bold text-2xl">
                  {grandTotal.toFixed(2)} {t("currency")}
                </span>
              </div>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center bg-brand-gold text-brand-bg font-bold py-4 rounded-xl hover:bg-brand-gold-hover transition-all duration-300 shadow-gold hover:shadow-gold-lg text-base mt-2"
              >
                {t("cart.checkout")}
              </Link>

              <p className="text-center text-xs mt-1" style={{ color: "#A07D4F" }}>
                {lang === "fr"
                  ? "Un compte est requis pour finaliser votre commande."
                  : "An account is required to complete your order."}
              </p>

              {/* Trust signals */}
              <div className="pt-1 space-y-1.5">
                <div className="flex items-center justify-center gap-1.5 text-brand-text-secondary dark:text-[#A09080] text-xs">
                  <span className="text-brand-gold dark:text-[#C19A6B]">✓</span>
                  <span>Paiement à la livraison</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-brand-text-secondary dark:text-[#A09080] text-xs">
                  <span className="text-brand-gold dark:text-[#C19A6B]">✓</span>
                  <span>Livraison partout au Maroc</span>
                </div>
              </div>

              <Link
                href="/products"
                className="w-full flex items-center justify-center text-brand-text-secondary dark:text-[#A09080] text-sm hover:text-brand-gold dark:hover:text-[#C19A6B] transition-colors duration-200 py-2"
              >
                {t("cart.continueShopping")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
