import Hero from "@/components/Hero";
import BrandLogos from "@/components/home/BrandLogos";
import ProductCarousel from "@/components/home/ProductCarousel";
import { products } from "@/data/products";

const bestSellers = products.filter((p) => p.rating >= 5).slice(0, 10);
const newArrivals = products.filter((p) => p.isNew).slice(0, 10);

const afnan    = products.filter((p) => p.brand === "Afnan").slice(0, 8);
const lattafa  = products.filter((p) => p.brand === "Lattafa").slice(0, 8);
const armaf    = products.filter((p) => p.brand === "Armaf").slice(0, 8);

export default function Home() {
  return (
    <>
      <Hero />
      <BrandLogos />
      {bestSellers.length > 0 && (
        <ProductCarousel
          titleFr="Meilleures Ventes"
          titleEn="Best Sellers"
          products={bestSellers}
          viewAllHref="/products"
        />
      )}
      {newArrivals.length > 0 && (
        <ProductCarousel
          titleFr="Nouveautés"
          titleEn="New Arrivals"
          products={newArrivals}
          viewAllHref="/products?new=true"
        />
      )}
      {afnan.length > 0 && (
        <ProductCarousel
          titleFr="Afnan"
          titleEn="Afnan"
          products={afnan}
          viewAllHref="/products?brand=Afnan"
        />
      )}
      {lattafa.length > 0 && (
        <ProductCarousel
          titleFr="Lattafa"
          titleEn="Lattafa"
          products={lattafa}
          viewAllHref="/products?brand=Lattafa"
        />
      )}
      {armaf.length > 0 && (
        <ProductCarousel
          titleFr="Armaf"
          titleEn="Armaf"
          products={armaf}
          viewAllHref="/products?brand=Armaf"
        />
      )}
    </>
  );
}
