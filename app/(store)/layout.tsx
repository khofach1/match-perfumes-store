import Providers from "@/app/providers";
import Navbar from "@/components/layout/Navbar";
import TrustBar from "@/components/layout/TrustBar";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/ui/CartSidebar";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Navbar />
      {/* pt accounts for fixed 2-row navbar: 64px row1 + 36px row2 + 2px borders */}
      <div className="pt-[102px]">
        <TrustBar />
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
      <CartSidebar />
      <WhatsAppButton />
    </Providers>
  );
}
