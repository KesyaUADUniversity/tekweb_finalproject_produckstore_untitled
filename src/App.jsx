// src/App.jsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom"; 
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import AdminPage from "./pages/AdminPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<UserPage cart={cart} setCart={setCart} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/product/:id" element={<ProductDetailPage cart={cart} setCart={setCart} />} />
    </Routes>
  );
}