"use client";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PostCard = ({ post }) => {
  const [upvotes, setUpvotes] = useState(post.upvotes_user_ids?.length || 0);
  const [downvotes, setDownvotes] = useState(post.downvotes_user_ids?.length || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleVote = async (type) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8080/api/v1/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          post_id: post.post_id,
          vote: type,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to vote");
      }

      const data = await res.json();
      // Optimistically update vote counts
      if (type === "upvote") {
        setUpvotes(upvotes + 1);
        setDownvotes(downvotes > 0 ? downvotes - 1 : 0);
      } else if (type === "downvote") {
        setDownvotes(downvotes + 1);
        setUpvotes(upvotes > 0 ? upvotes - 1 : 0);
      }
      console.log("Vote successful:", data);
    } catch (error) {
      setError(error.message);
      console.error("Voting error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-6 bg-neutral-50 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <img
            src={post.doodle || "https://via.placeholder.com/40"}
            alt="User Avatar"
            className="w-10 h-10 object-cover rounded-full mr-3"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">
              {post.anonymous ? "Anonymous" : post.user_id || "Unknown User"}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(post.created_at).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-lg text-gray-800 mb-4">{post.content}</p>

      {/* Image Carousel */}
      {post.images?.length > 0 && (
        <div className="relative w-full mt-4">
          <Carousel className="rounded-lg w-full h-full">
            <CarouselContent>
              {post.images.map((url, idx) => (
                <CarouselItem key={idx}>
                  <div className="relative w-full h-0 pb-[133.33%]">
                    <img
                      src={url}
                      alt={`Post Image ${idx + 1}`}
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-md"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full" />
            <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full" />
          </Carousel>
        </div>
      )}

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Vote */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => handleVote("upvote")}
            className="text-green-500 hover:text-green-700"
          >
            Upvote {upvotes}
          </button>
          <button
            onClick={() => handleVote("downvote")}
            className="text-red-500 hover:text-red-700"
          >
            Downvote {downvotes}
          </button>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default PostCard;
