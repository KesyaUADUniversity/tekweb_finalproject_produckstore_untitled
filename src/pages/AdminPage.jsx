// src/pages/AdminPage.jsx
import { useState } from "react";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Link } from "react-router-dom";

import product1Img from "@/assets/images/product1.jpg";
import product2Img from "@/assets/images/product2.jpg";
import product3Img from "@/assets/images/product3.jpg";
import product4Img from "@/assets/images/usb-c.jpg";
import product5Img from "@/assets/images/product5.jpg";
import product6Img from "@/assets/images/product6.jpg";

export default function AdminPage() {
  const [products, setProducts] = useState([
    { id: 1, name: "Wireless Headphones", price: 299000, image: product1Img, stock: 50 },
    { id: 2, name: "Smart Watch", price: 899000, image: product2Img, stock: 30 },
    { id: 3, name: "Bluetooth Speaker", price: 159000, image: product3Img, stock: 40 },
    { id: 4, name: "USB-C Fast Charger", price: 199000, image: product4Img, stock: 25 },
    { id: 5, name: "Power Bank 20.000mAh", price: 349000, image: product5Img, stock: 20 },
    { id: 6, name: "True Wireless Earbuds", price: 249000, image: product6Img, stock: 60 },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    image: "",
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert("Semua data wajib diisi");
      return;
    }

    setProducts([
      ...products,
      {
        id: Date.now(),
        name: newProduct.name,
        price: parseInt(newProduct.price),
        stock: parseInt(newProduct.stock),
        image: product1Img, // صورة افتراضية
      },
    ]);

    setNewProduct({ name: "", price: "", stock: "", image: "" });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-slate-800 text-white shadow">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="flex gap-3">
            <Link to="/">
              <Button className="bg-slate-600 hover:bg-slate-700">Kembali</Button>
            </Link>
            <Button className="bg-rose-600 hover:bg-rose-700">Logout</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6 space-y-6">
        {/* Tambah Produk */}
        <Card>
          <CardHeader>
            <CardTitle>Tambah Produk</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Nama Produk"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="border rounded px-3 py-2"
            />
            <input
              type="number"
              placeholder="Harga"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="border rounded px-3 py-2"
            />
            <input
              type="number"
              placeholder="Stok"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
              className="border rounded px-3 py-2"
            />
            <Button
              onClick={handleAddProduct}
              className="md:col-span-3 bg-emerald-600 hover:bg-emerald-700"
            >
              Simpan Produk
            </Button>
          </CardContent>
        </Card>

        {/* Daftar Produk */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Produk</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead className="bg-slate-200">
                <tr>
                  <th className="p-2">Gambar</th>
                  <th className="p-2 text-left">Nama</th>
                  <th className="p-2">Harga</th>
                  <th className="p-2">Stok</th>
                  <th className="p-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="p-2 text-center">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded mx-auto"
                      />
                    </td>
                    <td className="p-2">{p.name}</td>
                    <td className="p-2 text-center">
                      Rp {p.price.toLocaleString()}
                    </td>
                    <td className="p-2 text-center">{p.stock}</td>
                    <td className="p-2 text-center">
                      <Button
                        size="sm"
                        className="bg-rose-500 hover:bg-rose-600"
                        onClick={() => handleDelete(p.id)}
                      >
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
