// src/components/public/ReviewSection.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button"; 

export default function ReviewSection({ productId }) {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5); // Default 5 bintang
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "User123",
      rating: 5,
      text: "Produknya sangat bagus, pengiriman cepat!",
      date: "2025-12-28"
    },
    {
      id: 2,
      user: "Buyer456",
      rating: 4,
      text: "Kualitas sesuai harga, saya suka!",
      date: "2025-12-27"
    }
  ]);

  const handleAddReview = () => {
    if (reviewText.trim()) {
      const newReview = {
        id: reviews.length + 1,
        user: "You",
        rating: rating,
        text: reviewText,
        date: new Date().toLocaleDateString()
      };
      setReviews([...reviews, newReview]);
      setReviewText("");
      setRating(5);
      alert("Review Anda berhasil dikirim!");
    }
  };

  return (
    <div className="mt-8 p-6 border-2 border-blue-500 rounded-lg bg-white shadow-sm">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="text-yellow-500 mr-2">⭐</span> Ulasan Pelanggan
      </h3>

      {/* Form Tambah Review */}
      <div className="mb-6">
        {/* Rating Star Selector */}
        <div className="flex items-center mb-2">
          <span className="mr-2">Rating:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"} hover:text-yellow-400`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Tulis ulasan Anda..."
          className="w-full p-3 border border-gray-300 rounded-md resize-none"
          rows={4}
        />
        <Button 
          onClick={handleAddReview}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Kirim Ulasan
        </Button>
      </div>

      {/* Daftar Review */}
      <div className="space-y-4">
        {reviews.map(review => (
          <div 
            key={review.id} 
            className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition border-blue-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <strong>{review.user}</strong>
                <div className="text-yellow-500">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </div>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <p className="mt-2 text-gray-700">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}