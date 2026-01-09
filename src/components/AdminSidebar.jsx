// src/components/admin/AdminSidebar.jsx
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed left-0 top-0 p-4">
      <h2 className="text-xl font-bold mb-6">🛡️ Admin Menu</h2>
      <nav className="space-y-2">
        <Link 
          to="/admin" 
          className="block px-4 py-2 rounded hover:bg-gray-700"
        >
          Dashboard Utama
        </Link>
        <Link 
          to="/admin/live" 
          className="block px-4 py-2 rounded hover:bg-gray-700"
        >
          🎥 Mulai Live Jualan
        </Link>
        <Link 
          to="/admin/add-product" 
          className="block px-4 py-2 rounded hover:bg-gray-700"
        >
          ➕ Tambah Produk Baru
        </Link>
        <Link 
          to="/admin/products" 
          className="block px-4 py-2 rounded hover:bg-gray-700"
        >
          📋 Daftar Produk
        </Link>
      </nav>
    </div>
  );
}