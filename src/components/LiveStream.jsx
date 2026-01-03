// src/components/LiveStream.jsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { Link } from "react-router-dom";

export default function LiveStream({ productId }) {
  const [comments, setComments] = useState([
    { id: 1, user: "User123", text: "Produknya bagus banget!" },
    { id: 2, user: "BeliCepat", text: "Ada diskon lagi?" }
  ]);
  const [commentText, setCommentText] = useState(""); 

  const handleSendComment = () => {
    if (!commentText.trim()) return; 

    const newComment = {
      id: Date.now(),
      user: "You",
      text: commentText.trim() 
    };

    setComments([...comments, newComment]);
    setCommentText(""); 
  };

  return (
    <Card className="bg-white shadow-lg mt-8">
      <CardHeader>
        <CardTitle className="text-red-600">🎥 LIVE: Diskon Spesial Hari Ini!</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Simulasi Video */}
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center mb-4">
          <span className="text-gray-500">🎥 Video Streaming Preview</span>
        </div>

        {/* Chat Box */}
        <div className="border border-gray-300 rounded-lg p-3 mb-4 max-h-40 overflow-y-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="mb-2 text-sm">
              <strong className="text-blue-600">{comment.user}</strong>: {comment.text}
            </div>
          ))}
        </div>

        {/* Input Comment */}
        <div className="flex gap-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendComment()}
            placeholder="Ketik komentar..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded"
          />
          <Button onClick={handleSendComment} size="sm">
            Kirim
          </Button>
        </div>

        {/* Tombol Beli Cepat */}
        <div className="mt-4">
          <Button
            asChild
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg shadow-md"
          >
            <Link to="/checkout">🎁 BELI SEKARANG (Diskon 50%!)</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}