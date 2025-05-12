"use client";
import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";
import { useRouter } from "next/navigation";
import {NavbarButton} from "@/components/ui/resizable-navbar";

export default function DashboardPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/v1/recommended-posts",
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (res.ok && data.success) {
          setPosts(data.data);
        } else {
          setError(data.message || "Failed to load posts.");
        }
      } catch (err) {
        setError("Failed to load posts.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6 pt-20 px-4 max-w-7xl mx-auto">
      {/* Left Sidebar */}
      <div className="sticky hidden lg:block top-20 h-fit bg-neutral-900 p-6 rounded-lg shadow-md space-y-6">
        <h1 className="text-2xl font-bold mb-6">Menu</h1>
        <NavbarButton
          href="/create-post"
          onClick={() => setIsMobileMenuOpen(false)}
          variant="primary"
          className="w-full"
        >
          Create Post
        </NavbarButton>
      </div>

      {/* Feed */}
      <div className="col-span-1 lg:col-span-2 bg-neutral-900 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Feed</h1>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse h-32 bg-neutral-800 rounded-md"
              ></div>
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : posts.length === 0 ? (
          <p>No posts to show.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.post_id}
              onClick={() => router.push(`/post/${post.post_id}`)}
              className="cursor-"
            >
              <PostCard post={post} />
            </div>
          ))
        )}
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block sticky top-20 h-fit bg-neutral-900 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">User</h1>
        <NavbarButton
          href="/profile"
          onClick={() => setIsMobileMenuOpen(false)}
          variant="primary"
          className="w-full"
        >
          My Profile
        </NavbarButton>
      </div>
    </div>
  );
}
