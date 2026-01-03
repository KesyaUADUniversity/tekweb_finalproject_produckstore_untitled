// src/components/admin/AdminHeader.jsx
import { useNavigate } from "react-router-dom"; 

export default function AdminHeader() {
  const navigate = useNavigate(); 

  const handleBackToStore = () => {
    navigate("/"); 
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          
          <button 
            onClick={handleBackToStore}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            ← Kembali ke Toko
          </button>
          
         
          <button 
            onClick={() => alert("Logout berhasil!")}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}