// src/pages/CheckoutPage.jsx
import { useState } from "react";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Link } from "react-router-dom";

export default function CheckoutPage({ cart }) {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");

  const addresses = [
    "Jl. Merdeka No. 10, Jakarta Pusat",
    "Jl. Sudirman No. 25, Bandung",
    "Jl. Diponegoro No. 5, Yogyakarta"
  ];

  const paymentMethods = [
    { id: "cod", name: "Bayar di Tempat (COD)" },
    { id: "transfer", name: "Transfer Bank" },
    { id: "ewallet", name: "E-Wallet (GoPay, OVO, DANA)" }
  ];

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = () => {
    if (!selectedAddress || !selectedPayment) {
      alert("Harap pilih alamat dan metode pembayaran!");
      return;
    }
    alert("Pesanan berhasil dikirim! Terima kasih.");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">📦 Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Kolom Kiri: Alamat & Metode Pembayaran */}
          <div>
            {/* Alamat Pengiriman */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>📍 Alamat Pengiriman</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {addresses.map((addr, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        id={`addr-${index}`}
                        name="address"
                        checked={selectedAddress === addr}
                        onChange={() => setSelectedAddress(addr)}
                        className="mr-3"
                      />
                      <label htmlFor={`addr-${index}`}>{addr}</label>
                    </div>
                  ))}
                  <Button variant="outline" className="mt-3 w-full">
                    + Tambah Alamat Baru
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Metode Pembayaran */}
            <Card>
              <CardHeader>
                <CardTitle>💳 Metode Pembayaran</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center">
                      <input
                        type="radio"
                        id={method.id}
                        name="payment"
                        checked={selectedPayment === method.id}
                        onChange={() => setSelectedPayment(method.id)}
                        className="mr-3"
                      />
                      <label htmlFor={method.id}>{method.name}</label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Kolom Kanan: Google Maps + Ringkasan */}
          <div className="space-y-6">
            {/* Google Maps (Placeholder) */}
            <Card>
              <CardHeader>
                <CardTitle>🗺️ Lokasi Pengiriman</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center">
                  <span className="text-gray-500">Google Maps Preview</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {selectedAddress || "Pilih alamat untuk melihat lokasi"}
                </p>
              </CardContent>
            </Card>

            {/* Ringkasan Pesanan */}
            <Card>
              <CardHeader>
                <CardTitle>📝 Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name} × {item.quantity}</span>
                      <span>Rp {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xl font-bold border-t pt-2">
                  <span>Total:</span>
                  <span className="text-blue-600">Rp {total.toLocaleString()}</span>
                </div>

                <Button 
                  onClick={handleSubmit}
                  className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
                >
                  Konfirmasi Pesanan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tombol Kembali */}
        <div className="mt-6 text-center">
          <Button asChild variant="outline">
            <Link to="/cart">← Kembali ke Keranjang</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}