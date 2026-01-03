// src/pages/LoginPage.jsx
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 relative">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-white opacity-70"></div>
      
      {/* Salju jatuh */}
      <div className="snowflakes absolute inset-0 pointer-events-none">
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
      </div>

     
      <div className="flex items-center gap-8 max-w-4xl w-full px-6">
        
        
        <div className="w-1/3 flex justify-center">
          <img 
            src="src/assets/images/santaclaus.jpg" 
            alt="santaclauus"
            className="w-full max-w-[200px] h-auto object-contain"
          />
        </div>

        {/* Card Login - Di sisi kanan */}
        <div className="relative z-10 w-2/3 max-w-md p-8 rounded-xl shadow-lg bg-white/90 backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Log into your account</h1>
          
          <input 
            type="text" 
            placeholder="Username" 
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          
          <Link 
            to="/" 
            className="block w-full py-3 bg-pink-500 text-white text-center rounded-lg hover:bg-pink-600 transition"
          >
            LOG IN
          </Link>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            <a href="#" className="text-pink-500 hover:underline">Forgot your password?</a>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            If you don't have an account, <Link to="/register" className="text-pink-500 hover:underline">sign up.</Link>
          </div>
        </div>
      </div>
    </div>
  ); 
} 