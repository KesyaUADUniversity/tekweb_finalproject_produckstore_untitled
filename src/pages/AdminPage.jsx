// src/pages/AdminPage.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 

// shadcn/ui imports
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Hook untuk integrasi MockAPI
import { useProducts } from "@/hooks/useProducts";

export default function AdminPage() {
  const location = useLocation();

  const getActivePage = () => {
    if (location.pathname === "/admin/live") return "live";
    if (location.pathname === "/admin/add") return "add";
    if (location.pathname === "/admin/products") return "products";
    return "dashboard";
  };

  const [activePage, setActivePage] = useState(getActivePage());
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  const { products, loading, error, addProduct, deleteProduct } = useProducts();

  useEffect(() => {
    setActivePage(getActivePage());
  }, [location.pathname]);

  // Tambah atau Update Produk
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert("Nama, harga, dan stok wajib diisi!");
      return;
    }

    // Cek apakah produk sudah ada (untuk edit)
    const existing = products.find(p => p.name === newProduct.name);
    if (existing) {
      existing.price = Number(newProduct.price);
      existing.stock = Number(newProduct.stock);
      existing.description = newProduct.description || "No description";
      alert("Produk berhasil diperbarui!");
    } else {
      const newItem = {
        name: newProduct.name,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        description: newProduct.description || "No description",
        image: "/images/product1.jpg",
      };
      addProduct(newItem);
      alert("Produk berhasil ditambahkan!");
    }

    setNewProduct({ name: "", price: "", stock: "", description: "" });
  };

  // Hapus Produk
  const handleDeleteProduct = (id) => {
    if (window.confirm("Yakin ingin menghapus produk ini?")) {
      deleteProduct(id);
    }
  };

  // Edit Produk
  const handleEditProduct = (id) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setNewProduct({
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description,
      });
      setActivePage("add");
    }
  };

  // Mulai Live
  const handleStartLive = () => {
    alert("🎥 Live Jualan Dimulai!\nSilakan siapkan produk dan promosi.");
  };

  // Loading
  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading data admin...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  const renderContent = () => {
    if (activePage === "live") {
      return (
        <Card className="shadow-lg border-l-4 border-red-500">
          <CardHeader>
            <CardTitle className="text-xl text-red-600">🎥 Mulai Live Jualan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-700">Judul Live</Label>
              <Input placeholder="Diskon Besar Hari Ini!" className="mt-1" />
            </div>
            <div>
              <Label className="text-gray-700">Pilih Produk</Label>
              <select className="w-full p-2 border rounded mt-1">
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <Button
              className="w-full bg-red-600 hover:bg-red-700 text-white mt-2"
              onClick={handleStartLive}
            >
              🎥 Mulai Live Sekarang
            </Button>
          </CardContent>
        </Card>
      );
    }

    if (activePage === "add") {
      return (
        <Card className="shadow-lg border-l-4 border-green-500">
          <CardHeader>
            <CardTitle className="text-xl text-green-600">➕ Tambah Produk Baru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-700">Nama Produk</Label>
              <Input
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                placeholder="Wireless Headphones"
              />
            </div>
            <div>
              <Label className="text-gray-700">Harga (Rp)</Label>
              <Input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                placeholder="299000"
              />
            </div>
            <div>
              <Label className="text-gray-700">Stok</Label>
              <Input
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                placeholder="100"
              />
            </div>
            <div>
              <Label className="text-gray-700">Deskripsi</Label>
              <Textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                placeholder="Kualitas suara tinggi dengan noise cancellation."
                className="min-h-[100px]"
              />
            </div>
            <Button
              onClick={handleAddProduct}
              className="bg-green-600 hover:bg-green-700 text-white mt-2"
            >
              Tambah Produk
            </Button>
          </CardContent>
        </Card>
      );
    }

    if (activePage === "products") {
      return (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">📦 Daftar Produk (Real-Time)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead>Gambar</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Stok</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        Tidak ada produk.
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map((p) => (
                      <TableRow key={p.id} className="hover:bg-gray-50">
                        <TableCell>
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 object-cover rounded"
                            onError={(e) => {
                              e.currentTarget.src = "/images/placeholder.jpg";
                            }}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell>Rp {p.price.toLocaleString()}</TableCell>
                        <TableCell className={p.stock <= 5 ? "text-red-600 font-bold" : ""}>
                          {p.stock}
                        </TableCell>
                        <TableCell className="flex gap-1">
                          {/* Tombol Edit hijau */}
                          <Button
                            size="sm"
                            className="text-xs px-2 py-1 bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleEditProduct(p.id)}
                          >
                            Edit
                          </Button>

                          {/* Tombol Hapus */}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteProduct(p.id)}
                            className="text-xs px-2 py-1"
                          >
                            Hapus
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      );
    }

    // Dashboard default
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
            <CardHeader>
              <CardTitle>Total Produk</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{products.length}</CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
            <CardHeader>
              <CardTitle>Stok Total</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              {products.reduce((a, b) => a + b.stock, 0)}
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent className="text-xl font-bold">Aktif ✅</CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>🎥 Mulai Live Cepat</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                onClick={handleStartLive}
              >
                Mulai Live Sekarang
              </Button>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>➕ Tambah Produk Cepat</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => setActivePage("add")}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Tambah Produk
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {activePage === "dashboard" && "Dashboard Admin"}
          {activePage === "live" && "🎥 Live Jualan"}
          {activePage === "add" && "➕ Tambah Produk"}
          {activePage === "products" && "📦 Manajemen Produk"}
        </h1>
      </header>

      {renderContent()}
    </div>
  );
}