"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const brands = [
  { name: "Afnan",              href: "/products?brand=Afnan"              },
  { name: "Lattafa",            href: "/products?brand=Lattafa"            },
  { name: "Armaf",              href: "/products?brand=Armaf"              },
  { name: "Fragrance World",    href: "/products?brand=Fragrance+World"    },
  { name: "Ibrahim Al Qurashi", href: "/products?brand=Ibrahim+Al+Qurashi" },
  { name: "Gissah",             href: "/products?brand=Gissah"             },
  { name: "Maison Alhambra",    href: "/products?brand=Maison+Alhambra"    },
  { name: "French Avenue",      href: "/products?brand=French+Avenue"      },
];

export default function BrandLogos() {
  const { lang } = useLanguage();

  return (
    <section className="border-y border-gray-100 bg-white py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-black">
            {lang === "fr" ? "Toutes les Marques" : "All Brands"}
          </h2>
          <Link
            href="/products"
            className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-black transition-colors"
          >
            {lang === "fr" ? "Voir tout →" : "View all →"}
          </Link>
        </div>

        {/* Scrollable row */}
        <div className="flex items-start gap-5 overflow-x-auto scrollbar-hide pb-2">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href={brand.href}
              className="group flex flex-shrink-0 flex-col items-center gap-2"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gray-200 bg-white transition-colors duration-200 group-hover:border-black">
                <span className="px-2 text-center text-[9px] font-semibold uppercase leading-snug tracking-wide text-gray-500 transition-colors group-hover:text-black">
                  {brand.name.split(" ").map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </span>
              </div>
              <span className="max-w-[88px] text-center text-[10px] font-medium leading-tight text-gray-500 transition-colors group-hover:text-black">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
