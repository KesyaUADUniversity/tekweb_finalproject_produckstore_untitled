// src/pages/CartPage.jsx
import { Button } from "@/components/ui/button"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 
import { Link } from "react-router-dom";

export default function CartPage({ cart, setCart }) {
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8"> 
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">🛒 Keranjang Belanja</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛍️</div>
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Keranjang Anda Kosong</h2>
            <p className="text-gray-500 mb-6">Yuk belanja produk menarik di toko kami!</p>
            <Button asChild>
              <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md">
                ← Kembali ke Toko
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Daftar Produk */}
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <Card 
                  key={item.id} 
                  className="hover:shadow-xl transition-all duration-300 border border-gray-200"
                >
                  <CardHeader className="flex flex-row items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded-md shadow-sm"
                      />
                      <div>
                        <CardTitle className="text-lg font-medium text-gray-800">{item.name}</CardTitle>
                        <p className="text-sm text-gray-500">Rp {item.price.toLocaleString()} × {item.quantity}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => removeFromCart(item.id)}
                      className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-colors"
                    >
                      Hapus
                    </Button>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Total & Checkout */}
            <Card className="bg-white shadow-2xl rounded-xl">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-gray-700">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">Rp {total.toLocaleString()}</span>
                </div>
                
                <Button 
                  asChild
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 text-lg font-medium rounded-lg shadow-lg transform hover:scale-105 transition-transform"
                  
                >
                  <Link to="/checkout" className="flex items-center justify-center gap-2">
                    🛒 Lanjutkan ke Pembayaran
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Tombol Kembali */}
            <div className="mt-6">
              <Button 
                asChild 
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-800 transition-colors"
              >
                <Link to="/" className="flex items-center justify-center gap-2">
                  ← Kembali ke Toko
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}