// src/components/public/ProductCard.jsx
import { Card, CardContent, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { Link } from "react-router-dom";

export default function ProductCard({ product, cart, setCart }) {
  const handleAddToCart = () => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <Card className="hover:shadow-xl transition border-2 border-green-500">
      <Link to={`/product/${product.id}`} className="block">
        <div className="p-4 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="max-w-full max-h-40 object-contain"
          />
        </div>
        <CardContent>
          <CardTitle>{product.name}</CardTitle>
          <p className="text-red-600 font-bold mt-2">Rp {product.price.toLocaleString()}</p>
          <p className="text-sm mt-2 text-gray-600 line-clamp-2">
            {product.description}
          </p>
        </CardContent>
      </Link>

      <div className="px-4 pb-4 flex gap-2">
        <Button
          asChild
          className="flex-1 bg-red-600 hover:bg-red-700 text-white"
        >
          <Link to={`/product/${product.id}`}>Detail</Link>
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={handleAddToCart}
          className="border-green-500 text-green-500 hover:bg-green-50"
        >
          🛒
        </Button>
      </div>
    </Card>
  );
}