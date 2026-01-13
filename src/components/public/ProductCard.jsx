// src/components/public/ProductCard.jsx
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ProductCard({ product, cart, setCart }) {
  const handleAddToCart = (e) => {
    e.preventDefault(); // Cegah Link ter-trigger saat klik tombol
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert(`✅ ${product.name} ditambahkan ke keranjang!`);
  };

  return (
    <div className="border-2 border-green-500 rounded-lg hover:shadow-xl transition-shadow bg-white flex flex-col h-full">
      {/* Area Klik untuk Detail Produk */}
      <Link 
        to={`/product/${product.id}`} 
        className="flex-1 p-4 flex flex-col items-center text-center"
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="max-w-full max-h-40 object-contain mb-3"
        />
        <h3 className="font-bold text-gray-800 line-clamp-2 mb-2">
          {product.name}
        </h3>
        <p className="text-red-600 font-bold text-lg">
          Rp {product.price.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600 line-clamp-2 mt-2">
          {product.description}
        </p>
        
        {/* Opsional: Tambahkan rating seperti Amazon */}
        <div className="flex items-center mt-2 text-yellow-500">
          <span>★★★★☆</span>
          <span className="text-xs text-gray-500 ml-1">(42)</span>
        </div>
      </Link>

      {/* Tombol Aksi - Tetap di bawah */}
      <div className="px-4 pb-4 flex gap-2">
        <Button
          asChild
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium"
        >
          <Link to={`/product/${product.id}`}>Detail</Link>
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={handleAddToCart}
          className="border-green-500 text-green-500 hover:bg-green-50 w-10 h-10"
        >
          🛒
        </Button>
      </div>
    </div>
  );
}