import type { Metadata, Viewport } from "next";
import { Cairo, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-display",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F4EFE6",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://anarperfumes.ma"),
  title: "Anar Perfumes | Authentic Gulf Fragrances — Morocco",
  description:
    "Discover Anar Perfumes — authentic Afnan, Lattafa, Armaf & Gulf fragrances delivered across Morocco. Free delivery on orders over 100 DH.",
  keywords: [
    "Gulf fragrances Morocco",
    "Afnan perfumes Maroc",
    "Lattafa perfumes Maroc",
    "Armaf perfumes Maroc",
    "parfums du Golfe Maroc",
    "anar perfumes",
    "parfums de luxe Maroc",
    "parfums maroc",
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
    title: "Anar Perfumes | Authentic Gulf Fragrances — Morocco",
    description:
      "Discover Anar Perfumes — authentic Afnan, Lattafa, Armaf & Gulf fragrances delivered across Morocco. Free delivery on orders over 100 DH.",
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
        alt: "Anar Perfumes — Authentic Gulf Fragrances Morocco",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anar Perfumes | Authentic Gulf Fragrances — Morocco",
    description:
      "Discover Anar Perfumes — authentic Afnan, Lattafa, Armaf & Gulf fragrances delivered across Morocco. Free delivery on orders over 100 DH.",
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
      className={`${cormorant.variable} ${cairo.variable}`}
    >
      <head />
      <body className="min-h-screen bg-bone text-ink flex flex-col antialiased font-body">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
