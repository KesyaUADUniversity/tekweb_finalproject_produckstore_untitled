// src/pages/AdminPage.jsx
import { useState } from "react";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Link } from "react-router-dom";

// Impor gambar produk
import product1Img from "@/assets/images/product1.jpg";
import product2Img from "@/assets/images/product2.jpg";
import product3Img from "@/assets/images/product3.jpg";
import product4Img from "@/assets/images/usb-c.jpg";
import product5Img from "@/assets/images/product5.jpg";
import product6Img from "@/assets/images/product6.jpg";

export default function AdminPage() {
  // State produk — TAMBAH `stock` di setiap produk
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 299000,
      description: "High-quality sound with noise cancellation.",
      image: product1Img,
      stock: 100
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 899000,
      description: "Track your health and stay connected.",
      image: product2Img,
      stock: 100
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 159000,
      description: "Portable and powerful audio.",
      image: product3Img,
      stock: 100
    },
    {
      id: 4,
      name: "USB-C Fast Charger",
      price: 199000,
      description: "Supports 65W fast charging for laptops and phones.",
      image: product4Img,
      stock: 100
    },
    {
      id: 5,
      name: "Power Bank 20.000mAh",
      price: 349000,
      description: "High-capacity portable charger with USB-C and dual USB ports. Perfect for travel.",
      image: product5Img,
      stock: 100
    },
    {
      id: 6,
      name: "True Wireless Earbuds",
      price: 249000,
      description: "Sleek, lightweight earbuds with touch controls and 20-hour battery life with case.",
      image: product6Img,
      stock: 100
    }
  ]);

  
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    stock: "" 
  });

  
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert("Nama, harga, dan stok wajib diisi!");
      return;
    }
    
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    const product = {
      id: newId,
      name: newProduct.name,
      price: parseInt(newProduct.price),
      description: newProduct.description,
      stock: parseInt(newProduct.stock) 
    };

    setProducts([...products, product]);
    setNewProduct({ name: "", price: "", description: "", stock: "" }); 
    alert("Produk berhasil ditambahkan!");
  };

  // Fungsi hapus & edit — tetap sama
  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    alert("Produk berhasil dihapus!");
  };

  const handleEditProduct = (id) => {
    alert(`Edit produk dengan ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">🛡️ Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button 
              asChild 
              className="bg-white text-blue-800 hover:bg-gray-100 border border-white"
            >
              <Link to="/">← Kembali ke Toko</Link>
            </Button>
            <Button 
              onClick={() => alert("Anda telah logout!")}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-6 px-4">
        <main>
          <h2 className="text-2xl font-bold mb-6">Dashboard Admin</h2>

          {/* Fitur Live Jualan */}
          <Card className="mb-6 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200">
            <CardHeader>
              <CardTitle className="text-red-700">🎥 Mulai Live Jualan</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const title = formData.get("title");
                  const product = formData.get("product");
                  alert(`Live dimulai!\nJudul: ${title}\nProduk: ${product}`);
                }}
              >
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Judul Live</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Contoh: Diskon 50% Hari Ini!"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Pilih Produk</label>
                  <select
                    name="product"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  >
                    <option value="">-- Pilih Produk --</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.name}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2"
                >
                  🎥 MULAI LIVE SEKARANG
                </Button>
              </form>
            </CardContent>
          </Card>

         
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tambah Produk Baru</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Nama Produk</label>
                  <input
                    type="text"
                    placeholder="Contoh: Wireless Headphones"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Harga (Rp)</label>
                  <input
                    type="number"
                    placeholder="Contoh: 299000"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Stok</label>
                  <input
                    type="number"
                    placeholder="Contoh: 20"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Deskripsi</label>
                  <textarea
                    placeholder="Deskripsi produk..."
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    rows={4}
                  />
                </div>
                <Button 
                  type="button" 
                  onClick={handleAddProduct} 
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Tambah Produk
                </Button>
              </form>
            </CardContent>
          </Card>

          
          <Card>
            <CardHeader>
              <CardTitle>Daftar Produk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gambar
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nama
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Harga
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stok
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-10 h-10 object-cover rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          Rp {product.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.stock} 
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditProduct(product.id)}
                            className="mr-2"
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            Hapus
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}