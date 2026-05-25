import Providers from "@/app/providers";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
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
      <TopBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartSidebar />
      <WhatsAppButton />
    </Providers>
  );
}
