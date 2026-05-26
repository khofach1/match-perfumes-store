"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, User, Truck } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

function AuthGate({ lang }: { lang: string }) {
  return (
    <div className="min-h-screen bg-brand-bg dark:bg-[#0F0D0A] flex items-center justify-center px-4 py-16">
      <div
        className="w-full bg-brand-bg dark:bg-[#1A1714] rounded-2xl px-8 sm:px-12 py-12 text-center"
        style={{
          maxWidth: 460,
          border: "1px solid rgba(160,125,79,0.3)",
          boxShadow: "0 8px 48px rgba(160,125,79,0.06), 0 1px 8px rgba(0,0,0,0.04)",
        }}
      >
        <p className="font-body mb-3" style={{ fontSize: 10, letterSpacing: "0.35em", color: "#A07D4F" }}>
          A N A R &nbsp; P E R F U M E S
        </p>
        <div className="flex justify-center mb-8">
          <span className="block h-px w-8" style={{ background: "#A07D4F" }} />
        </div>

        <h1 className="font-heading text-brand-text-primary dark:text-[#F5F0E8] font-normal mb-2" style={{ fontSize: 28 }}>
          {lang === "fr" ? "Connectez-vous pour continuer" : "Log in to complete your order"}
        </h1>
        <p className="text-brand-text-secondary dark:text-[#A09080] text-sm leading-relaxed mb-8 max-w-xs mx-auto">
          {lang === "fr"
            ? "Créez un compte pour passer votre commande et suivre vos livraisons."
            : "Create an account to place your order and track your deliveries."}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/account?redirect=/checkout"
            className="flex-1 bg-brand-gold text-brand-bg font-semibold py-3.5 rounded-xl hover:bg-brand-gold-hover transition-all duration-300 shadow-gold text-sm text-center"
          >
            {lang === "fr" ? "Se connecter" : "Sign in"}
          </Link>
          <Link
            href="/account?redirect=/checkout&tab=register"
            className="flex-1 border border-brand-gold dark:border-[#A07D4F] text-brand-gold dark:text-[#C19A6B] font-semibold py-3.5 rounded-xl hover:bg-brand-gold/10 transition-all duration-300 text-sm text-center"
          >
            {lang === "fr" ? "Créer un compte" : "Create an account"}
          </Link>
        </div>
      </div>
    </div>
  );
}

interface FormData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  orderNote: string;
  website: string; // honeypot — must stay empty
}

interface OrderSnapshot {
  items: CartItem[];
  total: number;
  grandTotal: number;
  deliveryFee: number;
  fullName: string;
  address: string;
  city: string;
  orderId: string;
  whatsappUrl: string | null;
}

const moroccanCities = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fès",
  "Tanger",
  "Agadir",
  "Meknès",
  "Oujda",
  "Kénitra",
  "Salé",
  "Tétouan",
  "Mohammedia",
  "El Jadida",
  "Safi",
  "Beni Mellal",
  "Nador",
  "Khouribga",
  "Settat",
  "Larache",
  "Taza",
  "Khémisset",
  "Berrechid",
  "Khénifra",
  "Guelmim",
  "Laâyoune",
];

const MOROCCAN_PHONE_RE = /^0[67]\d{8}$/;

function generateOrderId() {
  return "ANR-" + Date.now();
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { t, lang } = useLanguage();
  const { session, user, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    orderNote: "",
    website: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [orderSnapshot, setOrderSnapshot] = useState<OrderSnapshot | null>(null);

  const delivery = total >= 100 ? 0 : 20;
  const grandTotal = total + delivery;

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.fullName.trim()) newErrors.fullName = lang === "fr" ? "Requis" : "Required";
    if (!formData.phone.trim()) {
      newErrors.phone = lang === "fr" ? "Requis" : "Required";
    } else if (!MOROCCAN_PHONE_RE.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = lang === "fr"
        ? "Format invalide (ex: 06XXXXXXXX)"
        : "Invalid format (e.g. 06XXXXXXXX)";
    }
    if (!formData.address.trim()) newErrors.address = lang === "fr" ? "Requis" : "Required";
    if (!formData.city) newErrors.city = lang === "fr" ? "Requis" : "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const id = generateOrderId();
    const cartItems = items.map((i) => ({ ...i }));
    let whatsappUrl: string | null = null;

    try {
      const fetchHeaders: Record<string, string> = { "Content-Type": "application/json" };
      if (session?.access_token) {
        fetchHeaders["Authorization"] = `Bearer ${session.access_token}`;
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: fetchHeaders,
        body: JSON.stringify({
          orderId: id,
          fullName: formData.fullName,
          phone: formData.phone,
          city: formData.city,
          address: formData.address,
          note: formData.orderNote,
          website: formData.website,
          items: cartItems.map((i) => ({
            name: i.name,
            size: i.size,
            quantity: i.quantity,
            price: i.price,
          })),
          subtotal: total,
          deliveryFee: delivery,
          total: grandTotal,
        }),
      });
      const data = await res.json();
      if (data.whatsappUrl) whatsappUrl = data.whatsappUrl;
    } catch {
      // silent — never block the customer flow
    }

    clearCart();
    setOrderSnapshot({
      items: cartItems,
      total,
      grandTotal,
      deliveryFee: delivery,
      fullName: formData.fullName,
      address: formData.address,
      city: formData.city,
      orderId: id,
      whatsappUrl,
    });
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-brand-bg dark:bg-[#0F0D0A] flex items-center justify-center">
        <svg className="animate-spin h-6 w-6 text-brand-gold dark:text-[#C19A6B]" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  if (!user) {
    return <AuthGate lang={lang} />;
  }

  if (orderSnapshot) {
    return (
      <div className="min-h-screen bg-brand-bg dark:bg-[#0F0D0A] flex items-start justify-center px-4 py-16">
        <div
          className="animate-confirmation w-full bg-white dark:bg-[#1A1714] rounded-2xl px-8 sm:px-12 py-12"
          style={{
            maxWidth: 520,
            border: "1px solid rgba(160,125,79,0.3)",
            boxShadow: "0 8px 48px rgba(160,125,79,0.08), 0 1px 8px rgba(0,0,0,0.04)",
          }}
        >
          {/* 1 — Brand line */}
          <p
            className="text-center font-body"
            style={{ fontSize: 11, letterSpacing: "0.3em", color: "#A07D4F" }}
          >
            A N A R &nbsp; P E R F U M E S
          </p>

          {/* 2 — Decorative divider */}
          <div className="flex justify-center mt-3 mb-7">
            <span className="block h-px w-10" style={{ background: "#A07D4F" }} />
          </div>

          {/* 3 — Elegant checkmark circle */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ border: "1.5px solid #A07D4F" }}
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
              <path
                d="M1.5 7L7.5 13L18.5 1"
                stroke="#A07D4F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* 4 — Heading */}
          <h1
            className="font-heading text-center font-normal text-brand-text-primary dark:text-[#F5F0E8] leading-snug mb-3"
            style={{ fontSize: 30 }}
          >
            {lang === "fr" ? (
              <>Votre commande<br />est confirmée</>
            ) : (
              <>Your order<br />is confirmed</>
            )}
          </h1>

          {/* 5 — Order number */}
          <p
            className="text-center font-body uppercase mb-6"
            style={{ fontSize: 12, letterSpacing: "0.15em", color: "#A07D4F" }}
          >
            Commande &nbsp;#{orderSnapshot.orderId}
          </p>

          {/* 6 — Full-width gold divider */}
          <div className="h-px w-full mb-6" style={{ background: "rgba(160,125,79,0.25)" }} />

          {/* 7 — Receipt-style order summary with dot leaders */}
          <div className="mb-6 space-y-2">
            {orderSnapshot.items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex items-baseline gap-1">
                <span
                  className="font-body text-brand-text-primary shrink-0 truncate"
                  style={{ fontSize: 13, maxWidth: "55%" }}
                >
                  {item.name} <span className="text-brand-text-secondary dark:text-[#A09080]">×{item.quantity}</span>
                </span>
                <span
                  className="flex-1 mx-1.5"
                  style={{
                    borderBottom: "1px dotted rgba(160,125,79,0.35)",
                    minWidth: 16,
                    marginBottom: 3,
                  }}
                />
                <span
                  className="font-body font-medium text-brand-text-primary dark:text-[#F5F0E8] flex-shrink-0"
                  style={{ fontSize: 13 }}
                >
                  {(item.price * item.quantity).toFixed(2)} DH
                </span>
              </div>
            ))}

            <div className="pt-1 space-y-1.5">
              <div className="flex items-baseline gap-1">
                <span className="font-body text-brand-text-secondary dark:text-[#A09080] flex-shrink-0" style={{ fontSize: 13 }}>
                  {lang === "fr" ? "Sous-total" : "Subtotal"}
                </span>
                <span
                  className="flex-1 mx-1.5"
                  style={{
                    borderBottom: "1px dotted rgba(160,125,79,0.35)",
                    minWidth: 16,
                    marginBottom: 3,
                  }}
                />
                <span className="font-body text-brand-text-secondary dark:text-[#A09080] flex-shrink-0" style={{ fontSize: 13 }}>
                  {orderSnapshot.total.toFixed(2)} DH
                </span>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="font-body text-brand-text-secondary dark:text-[#A09080] flex-shrink-0" style={{ fontSize: 13 }}>
                  {lang === "fr" ? "Livraison" : "Delivery"}
                </span>
                <span
                  className="flex-1 mx-1.5"
                  style={{
                    borderBottom: "1px dotted rgba(160,125,79,0.35)",
                    minWidth: 16,
                    marginBottom: 3,
                  }}
                />
                <span
                  className="font-body flex-shrink-0"
                  style={{ fontSize: 13, color: orderSnapshot.deliveryFee === 0 ? "#A07D4F" : "inherit" }}
                >
                  {orderSnapshot.deliveryFee === 0
                    ? (lang === "fr" ? "Gratuite" : "Free")
                    : `${orderSnapshot.deliveryFee} DH`}
                </span>
              </div>
            </div>

            <div className="h-px w-full" style={{ background: "rgba(160,125,79,0.2)" }} />

            <div className="flex items-baseline gap-1 pt-0.5">
              <span className="font-body font-semibold text-brand-text-primary dark:text-[#F5F0E8] flex-shrink-0 tracking-widest uppercase" style={{ fontSize: 12 }}>
                Total
              </span>
              <span
                className="flex-1 mx-1.5"
                style={{
                  borderBottom: "1px dotted rgba(160,125,79,0.35)",
                  minWidth: 16,
                  marginBottom: 3,
                }}
              />
              <span className="font-body font-bold flex-shrink-0" style={{ fontSize: 16, color: "#A07D4F" }}>
                {orderSnapshot.grandTotal.toFixed(2)} DH
              </span>
            </div>
          </div>

          {/* 8 — Delivery info block */}
          <div
            className="flex items-start gap-3 rounded-xl px-4 py-3.5 mb-6"
            style={{ background: "rgba(160,125,79,0.06)" }}
          >
            <MapPin
              size={14}
              className="flex-shrink-0 mt-0.5"
              style={{ color: "#A07D4F" }}
            />
            <p className="font-body text-brand-text-secondary dark:text-[#A09080] leading-relaxed" style={{ fontSize: 13 }}>
              <span className="font-medium text-brand-text-primary dark:text-[#F5F0E8]">{orderSnapshot.city}</span>
              {" — "}
              {lang === "fr" ? "Livraison estimée sous 24–48h" : "Estimated delivery within 24–48h"}
            </p>
          </div>

          {/* 9 — WhatsApp button */}
          {orderSnapshot.whatsappUrl && (
            <button
              onClick={() => window.open(orderSnapshot.whatsappUrl!, "_blank")}
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl text-white font-semibold font-body transition-all duration-200 hover:opacity-90 active:scale-[0.98] mb-2"
              style={{ backgroundColor: "#25D366", fontSize: 14 }}
            >
              <FaWhatsapp size={18} />
              {lang === "fr"
                ? "Confirmer ma commande sur WhatsApp"
                : "Confirm my order on WhatsApp"}
            </button>
          )}

          <p className="font-body text-brand-text-secondary dark:text-[#A09080] text-center mb-6" style={{ fontSize: 12 }}>
            {lang === "fr"
              ? "Notre équipe vous contactera également par téléphone."
              : "Our team will also contact you by phone."}
          </p>

          {/* Back to boutique */}
          <div
            className="text-center pt-5"
            style={{ borderTop: "1px solid rgba(160,125,79,0.15)" }}
          >
            <Link
              href="/"
              className="font-body uppercase transition-opacity duration-200 hover:opacity-60"
              style={{ fontSize: 11, letterSpacing: "0.12em", color: "#A07D4F" }}
            >
              {lang === "fr" ? "Retour à la boutique" : "Back to the boutique"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-bg dark:bg-[#0F0D0A] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-brand-text-secondary dark:text-[#A09080] mb-4">{t("cart.empty")}</p>
          <Link
            href="/products"
            className="border border-brand-gold text-brand-gold px-6 py-2.5 rounded-lg hover:bg-brand-gold hover:text-brand-bg transition-all duration-300"
          >
            {t("cart.continueShopping")}
          </Link>
        </div>
      </div>
    );
  }

  const inputClass = (field: keyof FormData) =>
    [
      "w-full bg-brand-surface dark:bg-[#1A1714] border rounded-xl px-4 py-3 text-brand-text-primary dark:text-[#F5F0E8] text-sm placeholder-brand-text-secondary dark:placeholder-[#A09080] focus:outline-none transition-all duration-200",
      errors[field]
        ? "border-red-500 focus:border-red-400"
        : "border-brand-border dark:border-[#3A3228] focus:border-brand-gold dark:focus:border-[#C19A6B]",
    ].join(" ");

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-[#0F0D0A] py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-8 bg-brand-gold dark:bg-[#C19A6B]" />
            <span className="text-brand-gold dark:text-[#C19A6B] text-xs uppercase tracking-widest">Checkout</span>
          </div>
          <h1 className="text-3xl font-bold text-brand-text-primary dark:text-[#F5F0E8] font-heading">
            {t("checkout.title")}
          </h1>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Info */}
              <div className="bg-brand-card dark:bg-[#242018] border border-brand-border dark:border-[#3A3228] rounded-2xl p-6">
                <h2 className="text-brand-text-primary dark:text-[#F5F0E8] font-semibold text-base mb-5 flex items-center gap-2">
                  <MapPin size={18} className="text-brand-gold" />
                  {t("checkout.shippingInfo")}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="text-brand-text-secondary dark:text-[#A09080] text-xs uppercase tracking-wider mb-2 flex items-center gap-1"
                    >
                      <User size={12} />
                      {t("checkout.fullName")}
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder={lang === "fr" ? "Jean Dupont" : "John Doe"}
                      autoComplete="name"
                      className={inputClass("fullName")}
                    />
                    {errors.fullName && (
                      <p className="text-red-400 text-xs mt-1" role="alert">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="text-brand-text-secondary dark:text-[#A09080] text-xs uppercase tracking-wider mb-2 flex items-center gap-1"
                    >
                      <Phone size={12} />
                      {t("checkout.phone")}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="06XX XXX XXX"
                      autoComplete="tel"
                      dir="ltr"
                      className={inputClass("phone")}
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1" role="alert">{errors.phone}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="text-brand-text-secondary dark:text-[#A09080] text-xs uppercase tracking-wider mb-2 block"
                    >
                      {t("checkout.address")}
                    </label>
                    <input
                      id="address"
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder={lang === "fr" ? "Numéro, nom de rue, quartier" : "Building No, Street Name, District"}
                      autoComplete="street-address"
                      className={inputClass("address")}
                    />
                    {errors.address && (
                      <p className="text-red-400 text-xs mt-1" role="alert">{errors.address}</p>
                    )}
                  </div>

                  {/* City */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="city"
                      className="text-brand-text-secondary dark:text-[#A09080] text-xs uppercase tracking-wider mb-2 block"
                    >
                      {t("checkout.city")}
                    </label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      autoComplete="address-level2"
                      className={[inputClass("city"), "cursor-pointer"].join(" ")}
                    >
                      <option value="">{t("checkout.selectCity")}</option>
                      {moroccanCities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    {errors.city && (
                      <p className="text-red-400 text-xs mt-1" role="alert">{errors.city}</p>
                    )}
                  </div>

                  {/* Order Note */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="orderNote"
                      className="text-brand-text-secondary dark:text-[#A09080] text-xs uppercase tracking-wider mb-2 block"
                    >
                      {lang === "fr" ? "Note de commande" : "Order Note"}
                      <span className="normal-case text-brand-text-secondary/60 dark:text-[#A09080]/60 ms-2 font-normal">
                        ({lang === "fr" ? "optionnel" : "optional"})
                      </span>
                    </label>
                    <textarea
                      id="orderNote"
                      name="orderNote"
                      value={formData.orderNote}
                      onChange={handleChange}
                      rows={3}
                      placeholder={
                        lang === "fr"
                          ? "Ajoutez une note à votre commande — message cadeau, instructions de livraison, etc."
                          : "Add a note to your order — gift message, delivery instructions, etc."
                      }
                      className="w-full bg-brand-surface dark:bg-[#1A1714] border border-brand-border dark:border-[#3A3228] rounded-xl px-4 py-3 text-brand-text-primary dark:text-[#F5F0E8] text-sm placeholder-brand-text-secondary dark:placeholder-[#A09080] focus:outline-none focus:border-brand-gold dark:focus:border-[#C19A6B] transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Honeypot — hidden from real users, catches bots */}
                  <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      autoComplete="off"
                      tabIndex={-1}
                    />
                  </div>
                </div>
              </div>

              {/* Payment — Cash on Delivery only */}
              <div className="bg-brand-card dark:bg-[#242018] border border-brand-border dark:border-[#3A3228] rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center flex-shrink-0">
                    <Truck size={18} className="text-brand-gold dark:text-[#C19A6B]" />
                  </div>
                  <p className="text-brand-text-secondary dark:text-[#A09080] text-sm leading-relaxed">
                    {lang === "fr"
                      ? "Paiement à la livraison — payez en espèces à la réception de votre commande."
                      : "Payment on Delivery — pay in cash when your order arrives."}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <div className="bg-brand-card dark:bg-[#242018] border border-brand-border dark:border-[#3A3228] rounded-2xl p-5 lg:sticky lg:top-24">
                <h3 className="text-brand-text-primary dark:text-[#F5F0E8] font-semibold text-lg mb-5">
                  {t("checkout.orderSummary")}
                </h3>

                {/* Items list */}
                <div className="space-y-3 mb-5">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="flex items-center gap-3"
                    >
                      <div className="relative w-12 h-14 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-brand-text-primary dark:text-[#F5F0E8] text-xs font-medium truncate">
                          {item.name}
                        </p>
                        <p className="text-brand-text-secondary dark:text-[#A09080] text-xs">
                          {item.size} × {item.quantity}
                        </p>
                      </div>
                      <p className="text-brand-gold text-xs font-semibold flex-shrink-0">
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-brand-border dark:bg-[#3A3228] mb-4" />

                {/* Totals */}
                <div className="space-y-2.5 text-sm mb-5">
                  <div className="flex justify-between">
                    <span className="text-brand-text-secondary dark:text-[#A09080]">{t("cart.subtotal")}</span>
                    <span className="text-brand-text-primary dark:text-[#F5F0E8]">
                      {total.toFixed(2)} {t("currency")}
                    </span>
                  </div>
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

                <div className="h-px bg-brand-border dark:bg-[#3A3228] mb-4" />

                <div className="flex justify-between items-center mb-5">
                  <span className="text-brand-text-primary dark:text-[#F5F0E8] font-bold">
                    {t("cart.total")}
                  </span>
                  <span className="text-brand-gold font-bold text-2xl">
                    {grandTotal.toFixed(2)} {t("currency")}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-brand-gold text-brand-bg font-bold py-4 rounded-xl hover:bg-brand-gold-hover transition-all duration-300 shadow-gold hover:shadow-gold-lg text-base disabled:opacity-70 min-h-[56px]"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {lang === "fr" ? "Traitement..." : "Processing..."}
                    </>
                  ) : (
                    t("checkout.placeOrder")
                  )}
                </button>

                {/* Trust signals */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-center gap-1.5 text-brand-text-secondary dark:text-[#A09080] text-xs">
                    <span className="text-brand-gold dark:text-[#C19A6B]">✓</span>
                    <span>Paiement à la livraison</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-brand-text-secondary dark:text-[#A09080] text-xs">
                    <span className="text-brand-gold dark:text-[#C19A6B]">✓</span>
                    <span>Livraison partout au Maroc</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-brand-text-secondary dark:text-[#A09080] text-xs">
                    <span>🔒</span>
                    <span>Vos informations sont sécurisées</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
