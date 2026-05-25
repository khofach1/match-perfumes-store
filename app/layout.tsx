import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#9A7235",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://anarperfumes.ma"),
  title: "Anar Perfumes | Inspired Luxury Fragrances — Morocco",
  description:
    "Discover Anar Perfumes — luxury inspired fragrances crafted for the modern Moroccan. Free delivery on orders over 100 DH.",
  keywords: [
    "parfums inspirés",
    "inspired perfumes",
    "luxury fragrances Morocco",
    "anar perfumes",
    "parfums de luxe Maroc",
    "fragrances inspirées",
    "parfums maroc",
    "inspired perfumes maroc",
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
    title: "Anar Perfumes | Inspired Luxury Fragrances — Morocco",
    description:
      "Discover Anar Perfumes — luxury inspired fragrances crafted for the modern Moroccan. Free delivery on orders over 100 DH.",
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
        alt: "Anar Perfumes — Luxury Inspired Fragrances Morocco",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anar Perfumes | Inspired Luxury Fragrances — Morocco",
    description:
      "Discover Anar Perfumes — luxury inspired fragrances crafted for the modern Moroccan. Free delivery on orders over 100 DH.",
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
      className={`${cormorant.variable} ${manrope.variable}`}
    >
      <head />
      <body className="bg-brand-bg text-brand-text-primary min-h-screen flex flex-col antialiased font-body">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
