// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

export default function AdminLayout({ onLogout }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Admin */}
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">🛡️ Admin Dashboard</h1>
          <button 
            onClick={onLogout}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Logout
          </button>
        </div>
      </nav>
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white p-4 min-h-screen">
          <h2 className="font-bold text-xl mb-6">Menu</h2>
          <nav className="space-y-2">
            <Link 
              to="/admin" 
              className={`block px-4 py-2 rounded hover:bg-gray-700 ${location.pathname === "/admin" ? "bg-gray-700" : ""}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/admin/live" 
              className={`block px-4 py-2 rounded hover:bg-gray-700 ${location.pathname === "/admin/live" ? "bg-gray-700" : ""}`}
            >
              🎥 Live Jualan
            </Link>
            <Link 
              to="/admin/add" 
              className={`block px-4 py-2 rounded hover:bg-gray-700 ${location.pathname === "/admin/add" ? "bg-gray-700" : ""}`}
            >
              ➕ Tambah Produk
            </Link>
            <Link 
              to="/admin/products" 
              className={`block px-4 py-2 rounded hover:bg-gray-700 ${location.pathname === "/admin/products" ? "bg-gray-700" : ""}`}
            >
              📋 Daftar Produk
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}