// src/pages/UserPage.jsx
import { useState } from "react";
import Navbar from "@/components/public/Navbar";
import ProductCard from "@/components/public/ProductCard";
import Footer from "@/components/public/Footer";
import { useProducts } from "@/hooks/useProducts";

export default function UserPage({ cart, setCart }) {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(product =>
    product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar cart={cart} onSearch={(term) => setSearchTerm(term)} />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-6">Produk Kami</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                cart={cart}
                setCart={setCart}
              />
            ))
          ) : (
            <p className="col-span-3 text-center">Produk tidak ditemukan.</p>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}