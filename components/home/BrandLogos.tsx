"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const brands = [
  { name: "Afnan",              href: "/products?brand=Afnan",              logo: "/images/brands/afnan.png"              },
  { name: "Lattafa",            href: "/products?brand=Lattafa",            logo: "/images/brands/lattafa.png"            },
  { name: "Armaf",              href: "/products?brand=Armaf",              logo: "/images/brands/armaf.png"              },
  { name: "Fragrance World",    href: "/products?brand=Fragrance+World",    logo: "/images/brands/fragrance-world.png"    },
  { name: "Ibrahim Al Qurashi", href: "/products?brand=Ibrahim+Al+Qurashi", logo: "/images/brands/ibrahim-al-qurashi.png" },
  { name: "Gissah",             href: "/products?brand=Gissah",             logo: "/images/brands/gissah.png"             },
  { name: "Maison Alhambra",    href: "/products?brand=Maison+Alhambra",    logo: "/images/brands/maison-alhambra.png"    },
  { name: "French Avenue",      href: "/products?brand=French+Avenue",      logo: "/images/brands/french-avenue.png"      },
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
              <div className="flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white p-2 transition-colors duration-200 group-hover:border-black">
                <img src={brand.logo} alt={brand.name} className="h-full w-full object-contain" />
              </div>
              <span className="max-w-[120px] text-center text-[11px] font-semibold uppercase tracking-wide text-gray-600 transition-colors group-hover:text-black">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
