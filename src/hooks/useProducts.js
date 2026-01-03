// src/hooks/useProducts.js
import { useState } from 'react';


import product1Img from "@/assets/images/product1.jpg";
import product2Img from "@/assets/images/product2.jpg";
import product3Img from "@/assets/images/product3.jpg";
import product4Img from "@/assets/images/usb-c.jpg";
import product5Img from "@/assets/images/product5.jpg"; 
import product6Img from "@/assets/images/product6.jpg";     


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
    },
    {
      id: 4,
      name: "USB-C Fast Charger",
      price: 199000,
      description: "Supports 65W fast charging for laptops and phones.",
      image: product4Img 
    },
    {
      id: 5,
      name: "Power Bank 20.000mAh",
      price: 349000,
      description: "High-capacity portable charger with USB-C and dual USB ports. Perfect for travel.",
      image: product5Img
    },
    {
      id: 6,
      name: "True Wireless Earbuds",
      price: 249000,
      description: "Sleek, lightweight earbuds with touch controls and 20-hour battery life with case.",
      image: product6Img
    }
  ]);

  return { products };
};