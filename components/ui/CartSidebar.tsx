"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
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
          "fixed inset-0 z-40 bg-ink/35 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={[
          "fixed inset-y-0 end-0 z-50 flex w-full max-w-md flex-col border-s border-border bg-bone text-ink shadow-gold-lg transition-transform duration-500",
          isOpen ? "translate-x-0" : "translate-x-full rtl:-translate-x-full",
        ].join(" ")}
        aria-hidden={!isOpen}
      >
        <header className="flex items-center justify-between border-b border-border px-6 py-6">
          <div>
            <p className="text-eyebrow font-medium uppercase text-tangier">
              {t("cart.title")}
            </p>
            <p className="mt-1 text-sm text-sand">
              {items.length} {t("cart.items")}
            </p>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center hover:text-tangier"
          >
            <X size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center border border-border-strong text-sand">
                <ShoppingBag size={30} />
              </div>
              <p className="mt-7 font-display text-4xl font-light text-ink">
                {t("cart.empty")}
              </p>
              <p className="mt-3 max-w-xs text-sm leading-7 text-ink-soft">
                {t("cart.emptySubtext")}
              </p>
              <button
                onClick={closeCart}
                className="mt-8 border-b border-tangier pb-2 text-xs font-medium uppercase tracking-[0.22em] text-tangier"
              >
                {t("cart.continueShopping")}
              </button>
            </div>
          ) : (
            <div className="grid gap-5">
              {items.map((item) => (
                <article
                  key={`${item.id}-${item.size}`}
                  className="grid grid-cols-[88px_1fr] gap-4 border-b border-border pb-5"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-bone-soft">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="88px" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="truncate font-display text-2xl font-light text-ink">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-sand">
                          {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        aria-label={t("cart.remove")}
                        className="text-sand hover:text-tangier"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-center border border-border-strong">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center hover:text-tangier"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="flex h-8 min-w-8 items-center justify-center border-x border-border-strong text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center hover:text-tangier"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="text-sm font-medium text-ink">
                        {item.price} {t("currency")}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-border bg-bone-soft px-6 py-6">
            <div className="flex items-center justify-between">
              <span className="text-sm uppercase tracking-[0.18em] text-sand">
                {t("cart.total")}
              </span>
              <span className="font-display text-4xl font-light text-ink">
                {total.toFixed(2)} {t("currency")}
              </span>
            </div>
            <a
              href={`https://wa.me/212665342318?text=${encodeURIComponent(
                `Bonjour Anar Perfumes,\n\nJe souhaite commander :\n${items.map((i) => `- ${i.name} (${i.size}) ×${i.quantity} — ${(i.price * i.quantity).toFixed(0)} DH`).join("\n")}\n\nTotal : ${total.toFixed(0)} DH`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeCart}
              className="mt-6 flex min-h-14 items-center justify-center border border-ink bg-ink px-6 text-xs font-medium uppercase tracking-[0.22em] text-bone hover:bg-tangier hover:border-tangier"
            >
              COMMANDER VIA WHATSAPP
            </a>
            <button
              onClick={closeCart}
              className="mt-4 w-full text-center text-xs font-medium uppercase tracking-[0.22em] text-sand hover:text-tangier"
            >
              {t("cart.continueShopping")}
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}
