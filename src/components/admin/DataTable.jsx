// src/components/admin/DataTable.jsx
export default function DataTable({ products, onRemove }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Daftar Produk</h2>
      
      <div className="space-y-3">
        {products.map(product => (
          <div 
            key={product.id} 
            className="flex items-center justify-between p-3 border border-gray-200 rounded hover:bg-gray-50"
          >
            {/* Info Produk */}
            <div className="flex-1">
              <span className="font-mono text-sm text-gray-500 mr-2">#{product.id}</span>
              <span className="font-medium text-gray-800">{product.name}</span>
              <span className="ml-2 text-gray-600">Rp {product.price.toLocaleString()}</span>
            </div>

            {/* Tombol Hapus — di samping kanan */}
            <button
              onClick={() => onRemove(product.id)}
              className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}