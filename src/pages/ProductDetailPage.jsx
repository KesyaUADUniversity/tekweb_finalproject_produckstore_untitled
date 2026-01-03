// src/pages/ProductDetailPage.jsx
import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/ui/button";
import { Link, useParams } from "react-router-dom";
import ReviewSection from "@/components/public/ReviewSection";
import LiveStream from "@/components/LiveStream";

export default function ProductDetailPage({ cart, setCart }) {
  const { id } = useParams();
  const { products } = useProducts();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Produk tidak ditemukan.</p>
      </div>
    );
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : "");
  const [quantity, setQuantity] = useState(1);

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
    setIsModalOpen(true);
  };

  const handleConfirmPurchase = () => {
    if (quantity > product.stock) {
      alert(`Maaf, stok hanya tersedia ${product.stock} item.`);
      return;
    }
    alert(`Anda akan membeli ${quantity}x ${product.name} warna ${selectedColor}`);
    setIsModalOpen(false);
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
              className="max-w-full max-h-96 object-contain"
            />
          </div>

          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-red-600 text-2xl font-bold mb-2">
              Rp {product.price.toLocaleString()}
            </p>

           
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
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                disabled={product.stock <= 0}
              >
                🛒 Tambah ke Keranjang
              </Button>

              <Button 
                onClick={handleBuyNow}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold"
                disabled={product.stock <= 0}
              >
                🛒 Beli Sekarang
              </Button>
            </div>
          </div>
        </div>

        <ReviewSection productId={product.id} />
        <LiveStream productId={product.id} />
      </div> 

      {/* Modal Pembelian */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-pink-50 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-pink-800">🛒 Konfirmasi Pembelian</h3>

            <div className="flex items-center mb-4">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-16 h-16 object-contain mr-4"
              />
              <div>
                <h4 className="font-semibold text-pink-800">{product.name}</h4>
                <p className="text-red-600">Rp {product.price.toLocaleString()}</p>
              </div>
            </div>

            {product.colors && (
              <div className="mb-4">
                <label className="block mb-2 text-pink-800">Warna:</label>
                <select 
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full p-2 border border-pink-300 rounded bg-white"
                >
                  {product.colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="mb-4">
              <label className="block mb-2 text-pink-800">Jumlah:</label>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-1 bg-pink-200 rounded-l text-pink-800"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-16 text-center border-y border-pink-300 bg-white"
                  min="1"
                  max={product.stock}
                />
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-2 py-1 bg-pink-200 rounded-r text-pink-800"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Maks: {product.stock} item</p>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-pink-800">Metode Pembayaran:</label>
              <select className="w-full p-2 border border-pink-300 rounded bg-white">
                <option>Pilih Metode</option>
                <option>Transfer Bank</option>
                <option>OVO</option>
                <option>ShopeePay</option>
                <option>Kartu Kredit</option>
              </select>
            </div>

            <div className="flex justify-between font-bold mb-4 text-pink-800">
              <span>Total:</span>
              <span>Rp {(product.price * quantity).toLocaleString()}</span>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={() => setIsModalOpen(false)}
                variant="outline"
                className="flex-1 border-pink-300 text-pink-800 hover:bg-pink-100"
              >
                Batal
              </Button>
              <Button 
                onClick={handleConfirmPurchase}
                className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
                disabled={quantity > product.stock}
              >
                Konfirmasi
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}