"use client";
import { useEffect, useState } from "react";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Fetch post comments here if you have a separate API
  }, [postId]);

  const handleComment = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Login required");

    const res = await fetch("http://localhost:8080/api/v1/create-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postId, content: newComment }),
    });

    if (res.ok) {
      setNewComment("");
      // refresh comments if needed
    } else {
      alert("Failed to add comment");
    }
  };

  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">Comments</h4>
      <textarea
        className="w-full border rounded p-2"
        rows={3}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
      />
      <button
        onClick={handleComment}
        className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
      >
        Post Comment
      </button>
      {/* Optionally map through comments */}
    </div>
  );
}
