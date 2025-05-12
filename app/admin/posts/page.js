"use client";

import { useEffect, useState } from "react";
import fetcher from "@/lib/fetcher";
import PostCard from "@/components/PostCard";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetcher("/posts")
      .then((res) => {
        setPosts(res.data);
        console.log("Fetched posts:", res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await fetcher(`/delete-post?id=${id}`, "DELETE");
      setPosts(posts.filter((post) => post.post_id !== id));
    } catch (err) {
      alert("Error deleting post.");
    }
  };

  if (loading) return <p className='text-center text-2xl pt-40'>Loading...</p>;

  return (
    <div className="p-6 pt-20 bg-gray- min-h-screen text-gray-50 max-w-7xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Admin - Posts</h1>
      <ul className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <li
              key={index}
              onClick={() => router.push(`/post/${post.post_id}`)}
              className="inline-block min-w-[250px] cursor-pointer border border-neutral-500 p-2 rounded-lg"
            >
              <PostCard post={post} />
              <button
                className="text-white text-center w-full -mt-10 p-2 hover:underline rounded-lg bg-red-500"
                onClick={() => handleDelete(post.post_id)}
              >
                Delete this post
              </button>
            </li>
          ))}
        </div>
        {/* {posts.map(post => (
          <li key={post.post_id} className="flex justify-between items-center border p-2 rounded">
            <div>
              <p className="font-medium">ID: {post.post_id}</p>
              <p className="text-sm text-gray-500">Author: {post.user_id}</p>
            </div>
            <button
              className="text-red-600 hover:underline"
              onClick={() => handleDelete(post.post_id)}
            >
              Delete
            </button>
          </li>
        ))} */}
      </ul>
    </div>
  );
}
