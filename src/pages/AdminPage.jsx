// src/pages/AdminPage.jsx
import { useState } from "react";
import Toast from "@/ui/Toast";
import AdminHeader from "@/components/admin/AdminHeader";
import FormData from "@/components/admin/FormData";
import DataTable from "@/components/admin/DataTable";
import { useProducts } from "@/hooks/useProducts";

export default function AdminPage() {
  const { products } = useProducts();
  const [toast, setToast] = useState({ message: "", isVisible: false });

  const showToast = (message) => {
    setToast({ message, isVisible: true });
    setTimeout(() => setToast({ message: "", isVisible: false }), 3000);
  };

  const handleLogout = () => {
    showToast("Logout berhasil! Kembali ke halaman utama.");
   
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FormData onSubmitSuccess={() => showToast("Produk berhasil ditambahkan!")} />
          </div>
          <div>
            <DataTable 
              products={products} 
              onRemove={(id) => showToast(`Produk ID ${id} berhasil dihapus!`)} 
            />
          </div>
        </div>
      </main>

      {/* Toast di root level */}
      <Toast 
        message={toast.message} 
        isVisible={toast.isVisible} 
        onClose={() => setToast({ message: "", isVisible: false })} 
      />
    </div>
  );
}