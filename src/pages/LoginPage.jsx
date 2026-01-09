// src/pages/LoginPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Daftar user valid
const VALID_USERS = [
  { username: "admin", password: "admin123" },
  { username: "kesya", password: "kesya123" },
  { username: "wulan", password: "wulan123" }
];

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const user = VALID_USERS.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      onLogin({ id: Date.now(), username: user.username });
      navigate("/");
    } else {
      setError("Username atau password salah!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-white opacity-70"></div>
      
      {/* Salju jatuh — inline style */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          animation: 'snowflakes-fall 10s linear infinite',
        }}
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 text-2xl"
            style={{
              left: `${10 + i * 10}%`,
              animation: `snowflakes-fall 10s linear ${i}s infinite, snowflakes-shake 2s ease-in-out infinite`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      <div className="flex items-center gap-8 max-w-4xl w-full px-6 z-10">
        {/* Gambar Santa */}
        <div className="w-1/3 flex justify-center">
          <img 
            src="/images/santaclaus.jpg" 
            alt="Santa Claus"
            className="w-full max-w-[200px] h-auto object-contain"
          />
        </div>

        {/* Card Login */}
        <div className="w-2/3 max-w-md p-8 rounded-xl shadow-lg bg-white/90 backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Log into your account</h1>
          
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            
            <button 
              type="submit"
              className="w-full py-3 bg-pink-500 text-white text-center rounded-lg hover:bg-pink-600 transition"
            >
              LOG IN
            </button>
          </form>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            <a href="#" className="text-pink-500 hover:underline">Forgot your password?</a>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            If you don't have an account, <Link to="/register" className="text-pink-500 hover:underline">sign up.</Link>
          </div>
        </div>
      </div>

      {/* CSS Animasi Salju — inline di global style */}
      <style>
        {`
        @keyframes snowflakes-fall {
          to { transform: translateY(100vh); }
        }
        @keyframes snowflakes-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        `}
      </style>
    </div>
  ); 
}