// src/components/admin/FormData.jsx
export default function FormData() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Produk baru ditambahkan! (Simulasi Fase 2)");
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Tambah Produk Baru</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          placeholder="Nama Produk" 
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input 
          type="number" 
          placeholder="Harga (Rp)" 
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <textarea 
          placeholder="Deskripsi" 
          className="w-full p-2 border border-gray-300 rounded"
          rows="3"
        ></textarea>
        <button 
          type="submit" 
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Tambah Produk
        </button>
      </form>
    </div>
  );
}