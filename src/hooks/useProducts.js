// src/hooks/useProducts.js
import { useState } from 'react';


import product1Img from "@/assets/images/product1.jpg";
import product2Img from "@/assets/images/product2.jpg";
import product3Img from "@/assets/images/product3.jpg";

export const useProducts = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 299000,
      description: "High-quality sound with noise cancellation.",
      image: product1Img 
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 899000,
      description: "Track your health and stay connected.",
      image: product2Img
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 159000,
      description: "Portable and powerful audio.",
      image: product3Img
    }
  ]);

  return { products };
};