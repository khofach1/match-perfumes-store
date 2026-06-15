"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const brands = [
  { name: "Afnan",               href: "/products?brand=Afnan"               },
  { name: "Lattafa",             href: "/products?brand=Lattafa"             },
  { name: "Armaf",               href: "/products?brand=Armaf"               },
  { name: "Fragrance World",     href: "/products?brand=Fragrance+World"     },
  { name: "Ibrahim Al Qurashi",  href: "/products?brand=Ibrahim+Al+Qurashi"  },
  { name: "Gissah",              href: "/products?brand=Gissah"              },
  { name: "Maison Alhambra",     href: "/products?brand=Maison+Alhambra"     },
  { name: "French Avenue",       href: "/products?brand=French+Avenue"       },
];

export default function BrandLogos() {
  const { lang } = useLanguage();

  return (
    <section className="border-y border-gray-100 bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-widest text-gray-400">
          {lang === "fr" ? "Nos Marques" : "Our Brands"}
        </p>
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide pb-2">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href={brand.href}
              className="flex flex-shrink-0 flex-col items-center gap-2 group"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-200 bg-[#F5F5F5] transition-all duration-200 group-hover:border-black">
                <span className="text-center text-[9px] font-bold uppercase leading-tight tracking-wide text-gray-600 group-hover:text-black px-1">
                  {brand.name.split(" ").map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </span>
              </div>
              <span className="text-[10px] font-medium text-gray-500 group-hover:text-black whitespace-nowrap">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
