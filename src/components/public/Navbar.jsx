// src/components/public/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ cart, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Untitled Electronic Store</Link>
        
        <div className="flex items-center mx-auto">
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 px-3 py-2 w-full md:w-64 rounded-l-md focus:outline-none"
          />
          <button
            onClick={() => onSearch && onSearch(searchTerm)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-md"
          >
            🔍
          </button>
        </div>

        <div className="flex gap-2">
          <Link to="/cart" className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100">
            Cart ({cart.length})
          </Link>
          <Link to="/login" className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100">
            Login
          </Link>
          <Link to="/admin" className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}