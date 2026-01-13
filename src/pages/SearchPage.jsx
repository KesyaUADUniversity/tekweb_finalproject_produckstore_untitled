// src/pages/SearchPage.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProducts } from "@/hooks/useProducts";

export default function SearchPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const [results, setResults] = useState([]);

  const { products, loading, error } = useProducts();

  useEffect(() => {
    if (query && products.length > 0) {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults(products);
    }
  }, [query, products]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Hasil pencarian untuk "{query}"
      </h1>
      {results.length === 0 ? (
        <p>Tidak ada produk ditemukan.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((p) => (
            <Card key={p.id} className="shadow-lg">
              <CardHeader>
                <CardTitle>{p.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={p.image} alt={p.name} className="w-full h-48 object-cover rounded mb-4" />
                <p>Rp {p.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{p.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}