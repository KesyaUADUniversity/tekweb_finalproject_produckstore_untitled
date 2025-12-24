// src/ui/Toast.jsx
export default function Toast({ message, isVisible, onClose }) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-green-600 text-white px-4 py-2 rounded-md shadow-lg">
        {message}
        <button 
          onClick={onClose}
          className="ml-2 text-white hover:text-gray-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
}