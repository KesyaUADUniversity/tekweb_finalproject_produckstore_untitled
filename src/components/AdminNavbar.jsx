// src/components/admin/AdminNavbar.jsx
import { useNavigate } from "react-router-dom";

export default function AdminNavbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Panggil fungsi logout dari App.jsx
    navigate("/"); // Redirect ke beranda (atau "/login" jika mau)
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">🛡️ Admin Panel</h1>
        <div className="flex gap-2">
          <button 
            onClick={handleLogout}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}