// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, Outlet, Link, useLocation } from "react-router-dom";

// Pages
import Navbar from "@/components/public/Navbar";
import UserPage from "@/pages/UserPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import AdminPage from "@/pages/AdminPage";
import SearchPage from "@/pages/SearchPage"; 



const UserLayout = ({ cart, user, onLogout }) => (
  <>
    <Navbar cart={cart} user={user} onLogout={onLogout} /> 
    <div className="pt-16">
      <Outlet />
    </div>
  </>
);

const AdminLayout = ({ onLogout }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

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
        <aside className="w-64 bg-gray-800 text-white p-4 min-h-screen">
          <h2 className="font-bold text-lg mb-4">Menu</h2>
          <nav className="space-y-2">
            <Link 
              to="/admin" 
              className={`block px-4 py-2 rounded ${isActive("/admin") ? "bg-gray-700" : "hover:bg-gray-700"}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/admin/live" 
              className={`block px-4 py-2 rounded ${isActive("/admin/live") ? "bg-gray-700" : "hover:bg-gray-700"}`}
            >
              🎥 Live Jualan
            </Link>
            <Link 
              to="/admin/add" 
              className={`block px-4 py-2 rounded ${isActive("/admin/add") ? "bg-gray-700" : "hover:bg-gray-700"}`}
            >
              ➕ Tambah Produk
            </Link>
            <Link 
              to="/admin/products" 
              className={`block px-4 py-2 rounded ${isActive("/admin/products") ? "bg-gray-700" : "hover:bg-gray-700"}`}
            >
              📋 Daftar Produk
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-6 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};


const ProtectedRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const AdminRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/login" replace />;
  return children;
};



export default function App() {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  });

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user") || "null");
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleLogin = (userData) => {
    let userObject;
    if (typeof userData === "string") {
      userObject = {
        id: Date.now(),
        email: userData,
        name: userData.split("@")[0]
      };
    } else {
      userObject = {
        id: userData.id || Date.now(),
        username: userData.username,
        name: userData.name
      };
    }
    setUser(userObject);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Routes>
      {/* Halaman publik */}
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/register" element={<RegisterPage onRegister={handleLogin} />} />
      <Route path="/search" element={<SearchPage />} /> 

      {/* Layout user */}
      <Route element={<UserLayout cart={cart} user={user} onLogout={handleLogout} />}>
        <Route path="/" element={<UserPage cart={cart} setCart={setCart} />} />
        <Route path="/product/:id" element={<ProductDetailPage cart={cart} setCart={setCart} />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute user={user}>
              <CartPage cart={cart} setCart={setCart} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute user={user}>
              <CheckoutPage cart={cart} />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Layout admin */}
      <Route
        path="/admin"
        element={
          <AdminRoute user={user}>
            <AdminLayout onLogout={handleLogout} />
          </AdminRoute>
        }
      >
        <Route index element={<AdminPage />} />
        <Route path="live" element={<AdminPage />} />
        <Route path="add" element={<AdminPage />} />
        <Route path="products" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}