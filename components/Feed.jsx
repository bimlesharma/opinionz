"use client";
import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";

export default function DashboardPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/v1/recommended-posts", {
          credentials: "include",
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setPosts(data.data);
          console.log(data.data);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error("Failed to load posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-6 pt-20 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Feed</h1>

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts to show.</p>
      ) : (
        posts.map((post) => <PostCard key={post.post_id} post={post} />)
      )}
    </div>
  );
}
