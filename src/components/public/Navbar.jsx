// src/components/public/Navbar.jsx
export default function Navbar({ onLogin, onCart }) {
  const handleLogin = () => {
    if (onLogin) onLogin();
  };

  const handleCart = () => {
    if (onCart) onCart();
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Product Store</h1>
        <div className="flex gap-2">
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100"
          >
            Login
          </button>
          <button
            onClick={handleCart}
            className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100"
          >
            Cart
          </button>
        </div>
      </div>
    </nav>
  );
}