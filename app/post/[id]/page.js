"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CommentSection from "@/components/CommentSection";

export default function ViewPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`http://localhost:8080/api/v1/view-post/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setPost(data.post))
      .catch(err => console.error("Failed to load post:", err));
  }, [id]);

  if (!post) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="mb-6">{post.content}</p>
      <CommentSection postId={id} />
    </div>
  );
}
