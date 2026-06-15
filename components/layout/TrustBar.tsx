"use client";

import { useLanguage } from "@/context/LanguageContext";
import { CheckCircle } from "lucide-react";

const badges = [
  { fr: "100% Produits Originaux", en: "100% Authentic Products" },
  { fr: "Meilleurs Prix",          en: "Best Prices"             },
  { fr: "Paiement à la Livraison", en: "Cash on Delivery"       },
  { fr: "Livraison Rapide",        en: "Fast Delivery"           },
];

export default function TrustBar() {
  const { lang } = useLanguage();

  return (
    <div className="bg-[#0f172a] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center divide-x divide-white/10 overflow-x-auto scrollbar-hide">
        {badges.map((b, i) => (
          <div key={i} className="flex flex-shrink-0 items-center gap-2 px-6 py-2.5 text-[11px] font-medium tracking-wide">
            <CheckCircle size={13} className="text-green-400 flex-shrink-0" />
            <span>{lang === "fr" ? b.fr : b.en}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
