// src/pages/RegisterPage.jsx
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-white opacity-70"></div>
      
      {/* Card Register */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-xl shadow-lg bg-white/90 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create your account</h1>
        
        <input 
          type="text" 
          placeholder="Full Name" 
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        
        <button 
          onClick={() => alert("Account created!")}
          className="block w-full py-3 bg-pink-500 text-white text-center rounded-lg hover:bg-pink-600 transition"
        >
          SIGN UP
        </button>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-pink-500 hover:underline">Log in.</Link>
        </div>
      </div>
    </div>
  );
}