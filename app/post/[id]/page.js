"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import PostCard from "@/components/PostCard";
import CommentSection from "@/components/CommentSection";

const ViewPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPostData = useCallback(async () => {
    try {
      if (!id) return;

      // const url = `http://localhost:8080/api/v1/view/${id}`;
      const url = `http://localhost:8080/api/v1/view-post/${id}`;
      // console.log("Fetching from URL:", url); // Log the URL
      const response = await fetch(url, {
        method: "GET",
        credentials: "include", // required for session cookies
      });

      // console.log("Response status:", response);

      if (!response.ok) {
        console.error("Error fetching post data:", response.statusText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      // console.log("Post data:", data);

      if (!data.success) {
        throw new Error(data.message || "Unable to fetch post");
      }

      setPost(data.data.post);
      console.log("Post:", data.data.post);
      setComments(data.data.comments || []);
      console.log("Comments:", data.data.comments);
    } catch (err) {
      console.error("Fetch post error:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPostData();
  }, [fetchPostData]);

  if (loading)
    return <div className="text-center pt-40 text-2xl">Loading post...</div>;
  if (error)
    return (
      <div className="text-center pt-40 text-2xl" style={{ color: "red" }}>
        Error: {error}
      </div>
    );
  if (!post)
    return <div className="text-center pt-40 text-2xl">Post not found.</div>;

  return (
    // <div className="pt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 px-4 max-w-7xl mx-auto">
    //   <div className="hidden lg:block"></div>
    //   <div className=" col-span-1 md:col-span-1 lg:col-span-2 p-6 rounded-lg shadow-md bg-neutral-900">
    //     <PostCard key={post.post_id} post={post} />
    //   </div>
    //   <div className="h-fit mb-40 bg-neutral-900 p-6 rounded-lg shadow-md space-y-6">
    //     <h2>Comments</h2>
    //     <CommentSection postId={post.post_id} comm={comments} />
    //   </div>
    // </div>
    <div className="pt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">

      {/* Post content */}
      <div className="col-span-1 md:col-span-1 lg:col-span-2 p-6 rounded-lg shadow-md bg-neutral-900">
        <PostCard key={post.post_id} post={post} />
      </div>

      {/* Comment section */}
      <div className="col-span-1 md:col-span-1 lg:col-span-2 h-fit mb-40 bg-neutral-900 p-6 rounded-lg shadow-md space-y-6">
        <h2 className="text-xl font-semibold">Comments</h2>
        <CommentSection postId={post.post_id} comm={comments} />
      </div>
    </div>
  );
};

export default ViewPostPage;
