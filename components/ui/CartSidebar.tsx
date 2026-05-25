"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, total } = useCart();
  const { t } = useLanguage();

  return (
    <>
      {/* Backdrop */}
      <div
        className={[
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={[
          "fixed top-0 right-0 z-50 h-full w-full max-w-md bg-brand-surface dark:bg-[#1A1714] border-s border-brand-border dark:border-[#3A3228] shadow-gold-lg flex flex-col transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border dark:border-[#3A3228]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-brand-gold dark:text-[#C19A6B]" />
            <h2 className="text-brand-text-primary dark:text-[#F5F0E8] font-semibold text-lg">
              {t("cart.title")}
            </h2>
            {items.length > 0 && (
              <span className="bg-brand-gold text-brand-bg text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-brand-card dark:hover:bg-[#242018] transition-colors duration-200 text-brand-text-secondary dark:text-[#A09080] hover:text-brand-text-primary dark:hover:text-[#F5F0E8]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
              <div className="w-20 h-20 rounded-full bg-brand-card dark:bg-[#242018] border border-brand-border dark:border-[#3A3228] flex items-center justify-center">
                <ShoppingBag size={32} className="text-brand-text-secondary dark:text-[#A09080]" />
              </div>
              <div>
                <p className="text-brand-text-primary dark:text-[#F5F0E8] font-medium mb-1">
                  {t("cart.empty")}
                </p>
                <p className="text-brand-text-secondary dark:text-[#A09080] text-sm">
                  {t("cart.emptySubtext")}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="border border-brand-gold dark:border-[#A07D4F] text-brand-gold dark:text-[#C19A6B] px-6 py-2.5 rounded-lg text-sm hover:bg-brand-gold hover:text-brand-bg transition-all duration-300"
              >
                {t("cart.continueShopping")}
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-3 p-3 bg-brand-card dark:bg-[#242018] rounded-xl border border-brand-border dark:border-[#3A3228]"
              >
                {/* Image */}
                <div className="relative w-20 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-brand-text-primary dark:text-[#F5F0E8] text-sm font-medium truncate mb-0.5">
                    {item.name}
                  </h4>
                  <p className="text-brand-text-secondary dark:text-[#A09080] text-xs mb-2">
                    {item.size}
                  </p>
                  <p className="text-brand-gold dark:text-[#C19A6B] font-bold text-sm mb-3">
                    {item.price} {t("currency")}
                  </p>

                  {/* Quantity + Remove */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 border border-brand-border dark:border-[#3A3228] rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-brand-surface dark:hover:bg-[#1A1714] text-brand-text-secondary dark:text-[#A09080] hover:text-brand-gold dark:hover:text-[#C19A6B] transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-2 text-brand-text-primary dark:text-[#F5F0E8] text-sm min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-brand-surface dark:hover:bg-[#1A1714] text-brand-text-secondary dark:text-[#A09080] hover:text-brand-gold dark:hover:text-[#C19A6B] transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-brand-text-secondary dark:text-[#A09080] hover:text-red-400 transition-colors duration-200"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-brand-border dark:border-[#3A3228] space-y-4 bg-brand-surface dark:bg-[#1A1714]">
            <div className="flex items-center justify-between">
              <span className="text-brand-text-secondary dark:text-[#A09080] text-sm">
                {t("cart.total")}
              </span>
              <span className="text-brand-gold dark:text-[#C19A6B] font-bold text-xl">
                {total.toFixed(2)} {t("currency")}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full flex items-center justify-center bg-brand-gold text-brand-bg font-semibold py-3.5 rounded-xl hover:bg-brand-gold-hover transition-all duration-300 shadow-gold"
            >
              {t("cart.checkout")}
            </Link>
            <button
              onClick={closeCart}
              className="w-full text-center text-brand-text-secondary dark:text-[#A09080] text-sm hover:text-brand-gold dark:hover:text-[#C19A6B] transition-colors duration-200 py-1"
            >
              {t("cart.continueShopping")}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
