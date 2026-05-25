"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const GREETING = encodeURIComponent(
  "Bonjour Anar Perfumes, j'aimerais avoir plus d'informations."
);

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const number = (process.env.NEXT_PUBLIC_OWNER_WHATSAPP ?? "").replace(/[^0-9]/g, "");
  const href = `https://wa.me/${number}?text=${GREETING}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp — Support 7j/7"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-20 right-4 sm:bottom-5 sm:right-5 z-50 flex items-center gap-2 group"
    >
      {/* Tooltip */}
      <span
        className={[
          "hidden sm:flex items-center whitespace-nowrap bg-brand-bg border border-brand-border text-brand-text-secondary text-xs px-3 py-1.5 rounded-full shadow-gold transition-all duration-200",
          hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none",
        ].join(" ")}
      >
        Support WhatsApp 7j/7
      </span>

      {/* Button */}
      <div className="w-[52px] h-[52px] sm:w-14 sm:h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95">
        <FaWhatsapp size={28} color="#ffffff" />
      </div>
    </a>
  );
}
