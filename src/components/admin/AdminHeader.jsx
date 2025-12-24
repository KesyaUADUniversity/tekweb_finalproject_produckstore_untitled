// src/components/admin/AdminHeader.jsx
import Toast from "@/ui/Toast"; // ✅ Import Toast

export default function AdminHeader({ onLogout }) {
  const handleLogout = () => {
    console.log("Logout diklik!");
    if (onLogout) onLogout(); // ✅ Kirim ke parent
  };

  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
}