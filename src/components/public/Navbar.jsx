// src/components/public/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ cart, user, onLogout }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <nav className="bg-red-600 text-white p-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold whitespace-nowrap">⚡ Untitled Electronic Store</Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (searchTerm.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
                  }
                }
              }}
              className="w-full px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none"
            />
            <button
              onClick={() => {
                if (searchTerm.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
                }
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-r-md font-bold"
            >
              🔍
            </button>
          </div>
        </div>

        {/* Aksi Kanan */}
        <div className="flex items-center gap-4 whitespace-nowrap">
          {/* Returns & Orders */}
          <div className="hidden md:block">
            <div className="text-xs">Returns</div>
            <div className="font-bold">& Orders</div>
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <div className="text-xs">Cart</div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10v8M5 5v6h6M11 11v6h6M13 3h4M3 21h18V5M16 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-yellow-500 text-black text-xs rounded-full px-1 min-w-[16px] h-4 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>
          </Link>

          {/* Login / Logout */}
          {user ? (
            <button 
              onClick={onLogout}
              className="text-left"
            >
              <div className="text-xs">Hello,</div>
              <div className="font-bold">Sign out</div>
            </button>
          ) : (
            <Link to="/login" className="text-left">
              <div className="text-xs">Hello,</div>
              <div className="font-bold">Sign in</div>
            </Link>
          )}

          {/* Admin */}
          <Link to="/admin" className="bg-yellow-500 text-black px-3 py-1 rounded font-bold hover:bg-yellow-600">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}