// src/pages/CheckoutPage.jsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function CheckoutPage({ cart }) {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");

  const [addresses, setAddresses] = useState([
    "Jl. Merdeka No. 10, Jakarta Pusat",
    "Jl. Sudirman No. 25, Bandung",
    "Jl. Diponegoro No. 5, Yogyakarta"
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [isStockValid, setIsStockValid] = useState(true);

  const paymentMethods = [
    { id: "cod", name: "Bayar di Tempat (COD)" },
    { id: "transfer", name: "Transfer Bank" },
    { id: "ewallet", name: "E-Wallet (GoPay, OVO, DANA)" }
  ];

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const isValid = cart.every(item => item.quantity <= item.stock);
    setIsStockValid(isValid);
  }, [cart]);

  const handleAddAddress = () => {
    if (!newAddress.trim()) {
      alert("Alamat tidak boleh kosong!");
      return;
    }
    setAddresses([...addresses, newAddress.trim()]);
    setNewAddress("");
    setIsModalOpen(false);
    alert("Alamat baru berhasil ditambahkan!");
  };

  const handleSubmit = () => {
    if (!selectedAddress || !selectedPayment) {
      alert("Harap pilih alamat dan metode pembayaran!");
      return;
    }

    if (!isStockValid) {
      alert("Maaf, jumlah produk melebihi stok tersedia.");
      return;
    }

    alert("Pesanan berhasil dikirim! Terima kasih.");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">📦 Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Kolom Kiri: Produk, Alamat & Pembayaran */}
          <div>
            {/* Produk yang Dibeli */}
            <Card className="mb-6 bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-bold">🛒 Produk yang Dibeli</CardTitle>
              </CardHeader>
              <CardContent>
                {cart.map(item => (
                  <div 
                    key={item.id} 
                    className={`flex justify-between items-center p-3 mb-2 rounded ${
                      item.quantity > item.stock ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-600">
                            Qty: {item.quantity}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            item.quantity > item.stock 
                              ? 'bg-red-100 text-red-800 border border-red-300' 
                              : 'bg-green-100 text-green-800 border border-green-300'
                          }`}>
                            Stok: {item.stock}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-blue-600 font-bold">
                      Rp {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}

                {!isStockValid && (
                  <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                    ⚠️ Ada produk yang jumlahnya melebihi stok tersedia. Silakan kembali ke keranjang untuk mengedit.
                  </div>
                )}
              </CardContent>
            </Card>

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
                      <label htmlFor={`addr-${index}`} className="text-gray-700">{addr}</label>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    className="mt-3 w-full"
                    onClick={() => setIsModalOpen(true)} 
                  >
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
                      <label htmlFor={method.id} className="text-gray-700">{method.name}</label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Kolom Kanan: Maps & Ringkasan */}
          <div className="space-y-6">
            {/* Google Maps */}
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
                    <div key={item.id} className="flex justify-between text-gray-700">
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
                  disabled={!isStockValid || !selectedAddress || !selectedPayment}
                  className={`w-full mt-4 ${
                    isStockValid && selectedAddress && selectedPayment 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-gray-400 cursor-not-allowed'
                  } text-white`}
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

        {/* Modal Tambah Alamat */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">Tambah Alamat Baru</h3>
              <textarea
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="Masukkan alamat lengkap (jalan, kota, provinsi, kode pos)..."
                className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
                rows={4}
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </Button>
                <Button
                  onClick={handleAddAddress}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Simpan
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}