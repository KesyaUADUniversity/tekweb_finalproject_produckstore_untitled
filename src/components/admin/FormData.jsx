// src/components/admin/FormData.jsx
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";

export default function FormData({ onSubmitSuccess }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form disimpan!");
    if (onSubmitSuccess) onSubmitSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">Tambah Produk Baru</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Produk
          </label>
          <Input placeholder="Nama produk" className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Harga
          </label>
          <Input type="number" placeholder="Harga" className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi
          </label>
          <Input as="textarea" placeholder="Deskripsi" className="w-full h-20" />
        </div>
      </div>
      <div className="mt-6">
        <Button type="submit" className="w-full">Simpan Produk</Button>
      </div>
    </form>
  );
}