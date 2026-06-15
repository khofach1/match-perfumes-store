import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://anarperfumes.ma"),
  title: "Anar Perfumes | Fragrances Authentiques — Maroc",
  description:
    "Découvrez Anar Perfumes — fragrances authentiques livrées partout au Maroc. Livraison gratuite dès 100 DH.",
  keywords: [
    "anar perfumes",
    "parfums maroc",
    "parfums de luxe Maroc",
    "fragrances authentiques Maroc",
    "parfumerie Maroc",
  ],
  authors: [{ name: "Anar Perfumes" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://anarperfumes.ma",
  },
  openGraph: {
    title: "Anar Perfumes | Fragrances Authentiques — Maroc",
    description:
      "Découvrez Anar Perfumes — fragrances authentiques livrées partout au Maroc. Livraison gratuite dès 100 DH.",
    type: "website",
    url: "https://anarperfumes.ma",
    locale: "fr_MA",
    alternateLocale: "en_MA",
    siteName: "Anar Perfumes",
    images: [
      {
        url: "/images/hero/hero-collection.png",
        width: 1200,
        height: 630,
        alt: "Anar Perfumes — Fragrances Authentiques Maroc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anar Perfumes | Fragrances Authentiques — Maroc",
    description:
      "Découvrez Anar Perfumes — fragrances authentiques livrées partout au Maroc. Livraison gratuite dès 100 DH.",
    images: ["/images/hero/hero-collection.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      dir="ltr"
      suppressHydrationWarning
      className={cairo.variable}
    >
      <head />
      <body className="min-h-screen bg-bone text-ink flex flex-col antialiased font-body">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
