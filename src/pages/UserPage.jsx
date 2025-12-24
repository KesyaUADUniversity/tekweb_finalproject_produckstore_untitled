// src/pages/UserPage.jsx
import { useState } from "react";
import Toast from "@/ui/Toast";
import Navbar from "@/components/public/Navbar";
import ProductCard from "@/components/public/ProductCard";
import Footer from "@/components/public/Footer";
import { useProducts } from "@/hooks/useProducts";

export default function UserPage() {
  const { products } = useProducts();
  const [toast, setToast] = useState({ message: "", isVisible: false });

  const showToast = (message) => {
    setToast({ message, isVisible: true });
    setTimeout(() => {
      setToast({ message: "", isVisible: false });
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar 
        onLogin={() => showToast("Silakan login untuk melanjutkan!")}
        onCart={() => showToast("Keranjang Anda saat ini kosong.")}
      />
      <main className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-6">Produk Kami</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onBeli={(name) => showToast(`Berhasil menambahkan ${name} ke keranjang!`)} 
            />
          ))}
        </div>
      </main>
      <Footer />

      {/* Toast Notification */}
      <Toast 
        message={toast.message} 
        isVisible={toast.isVisible} 
        onClose={() => setToast({ message: "", isVisible: false })} 
      />
    </div>
  );
}