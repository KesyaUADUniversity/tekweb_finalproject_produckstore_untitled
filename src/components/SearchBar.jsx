// src/components/public/SearchBar.jsx
import { useState } from "react";
import { Button } from "@/ui/button";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim()) {
      alert(`Mencari: "${searchTerm}"`);
    }
  };

  return (
    <div className="flex items-center">
      {/* Dropdown Kategori */}
      <select 
        className="border border-gray-300 rounded-l-md px-3 py-2 bg-white text-gray-700"
      >
        <option>All</option>
        <option>usb-c</option>
        <option>wireless headphones</option>
        <option>speaker bluetooth</option>
        <option>smart watch</option>
      </select>

      {/* Input Pencarian */}
      <input 
        type="text" 
        placeholder="Search Product Store" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        className="border-y border-r border-gray-300 px-3 py-2 w-full md:w-64 lg:w-80 focus:outline-none"
      />

      
      <Button 
        onClick={handleSearch}
        variant="default" 
        className="bg-orange-500 hover:bg-orange-600 text-white rounded-l-none rounded-r-md px-4 py-2"
      >
        🔍
      </Button>
    </div>
  );
}