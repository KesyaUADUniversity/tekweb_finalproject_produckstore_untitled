// src/hooks/useProducts.js
import { useState, useEffect, useCallback } from "react";


const API_URL = "https://695e732d2556fd22f6787ecb.mockapi.io/api/v1/products";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Gagal mengambil data");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error("Fetch products error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Tambah produk
  const addProduct = async (newProduct) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) throw new Error("Gagal menambah produk");
      fetchProducts(); 
    } catch (err) {
      alert("Gagal menambah produk: " + err.message);
    }
  };

  // Hapus produk
  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal menghapus produk");
      fetchProducts(); 
    } catch (err) {
      alert("Gagal menghapus produk: " + err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, addProduct, deleteProduct };
};