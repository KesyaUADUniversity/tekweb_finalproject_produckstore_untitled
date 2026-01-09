// src/pages/ProductDetailPage.jsx
import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button"; 
import { Link, useParams } from "react-router-dom";
import ReviewSection from "@/components/public/ReviewSection";
import LiveStream from "@/components/LiveStream";

export default function ProductDetailPage({ cart, setCart }) {
  const { id } = useParams();
  const { products, loading, error } = useProducts();

  // Cari produk berdasarkan id (string, karena MockAPI kirim string)
  const product = products.find(p => p.id === id);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg">Loading produk...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-500 text-lg">Gagal memuat produk: {error}</p>
      </div>
    );
  }

  // Not found
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg">Produk tidak ditemukan.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      alert("Maaf, stok produk ini habis.");
      return;
    }

    const existingItem = cart.find(item => item.id === product.id);
    const currentQty = existingItem ? existingItem.quantity : 0;

    if (currentQty >= product.stock) {
      alert(`Maaf, stok hanya tersedia ${product.stock} item.`);
      return;
    }

    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert(`${product.name} ditambahkan ke keranjang!`);
  };

  const handleBuyNow = () => {
    if (product.stock <= 0) {
      alert("Maaf, stok produk ini habis.");
      return;
    }

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        alert(`Maaf, stok hanya tersedia ${product.stock} item.`);
        return;
      }
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: existingItem.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    alert(`${product.name} berhasil ditambahkan ke keranjang!`);
    window.location.href = "/checkout";
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button 
          variant="outline" 
          asChild
          className="mb-6 py-2 px-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          <Link to="/">← Kembali ke Toko</Link>
        </Button>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 flex justify-center">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-w-full max-h-96 object-contain rounded-lg border"
              onError={(e) => {
                e.currentTarget.src = "/images/placeholder.jpg";
              }}
            />
          </div>

          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <p className="text-red-600 text-2xl font-bold mb-2">
              Rp {product.price.toLocaleString()}
            </p>

            <div className="mb-3 flex items-center">
              <div className="text-yellow-500 text-lg mr-2">★★★★☆</div>
              <span className="text-sm text-gray-600">(42 ulasan)</span>
            </div>

            <div className="mb-4">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                product.stock <= 5 
                  ? 'bg-red-100 text-red-800 border-red-300' 
                  : 'bg-green-100 text-green-800 border-green-300'
              }`}>
                {product.stock <= 5 ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 17h.01M12 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.767A9.863 9.863 0 0112 12zm0-2V9M7 9a2 2 0 012-2h6a2 2 0 012 2v6H7z" />
                    </svg>
                    Hanya {product.stock} tersisa!
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.677V1H9.663v16z" />
                    </svg>
                    Stok tersedia: {product.stock} item
                  </>
                )}
              </div>
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="flex gap-3">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 flex items-center justify-center gap-1"
                disabled={product.stock <= 0}
              >
                🛒 Tambah ke Keranjang
              </Button>

              <Button 
                onClick={handleBuyNow}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 flex items-center justify-center gap-1"
                disabled={product.stock <= 0}
              >
                💳 Beli Sekarang
              </Button>
            </div>
          </div>
        </div>

        <ReviewSection productId={product.id} />
        <LiveStream productId={product.id} />
      </div>
    </div>
  );
}