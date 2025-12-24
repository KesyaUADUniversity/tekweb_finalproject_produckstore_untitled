// src/components/public/ProductCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

export default function ProductCard({ product, onBeli }) {
  const handleBeli = () => {
    if (onBeli) onBeli(product.name);
  };

  return (
    <Card className="hover:shadow-lg transition">
      {/* Gambar */}
      <div className="p-4 flex items-center justify-center bg-white rounded-t-md">
        <img 
          src={product.image} 
          alt={product.name} 
          className="max-w-full max-h-40 object-contain rounded-md"
        />
      </div>

      {/* Konten */}
      <CardContent>
        <CardTitle>{product.name}</CardTitle>
        <p className="text-gray-600 mt-2">Rp {product.price.toLocaleString()}</p>
        <p className="text-sm mt-2 text-gray-500">{product.description}</p>
        <button
          onClick={handleBeli}
          className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Beli
        </button>
      </CardContent>
    </Card>
  );
}