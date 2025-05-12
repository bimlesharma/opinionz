"use client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

export default function CommentSection({ postId, comm }) {
  const [comments, setComments] = useState(comm || []);
  const [newComment, setNewComment] = useState("");

  const handleComment = async () => {
    // const token = localStorage.getItem("token");
    // if (!token) return alert("Login required");

    const res = await fetch("http://localhost:8080/api/v1/create-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ post_id: postId, content: newComment }),
    });

    if (res.ok) {
      setNewComment("");
      const updated = await res.json();
      console.log("Comment added:", updated);
      setComments((prev) => [updated.data, ...prev]);
    } else {
      // alert("Failed to add comment");
      console.error("Error adding comment:", res);
    }
  };

  return (
    <div className="w-full mt-4">
      <div className="borde -pt-3 flex items-center gap-3">
        <input
          type="text"
          className="flex-1 bg-transparent border rounded-sm text-sm p-2  focus:outline-none"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleComment}
          className="text-black p-2 bg-neutral-300 disabled:bg-neutral-700 rounded-sm font-semibold text-sm disabled:text-gray-400"
          disabled={!newComment.trim()}
        >
          Comment
        </button>
      </div>
      <div className="mt-4">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-400">No comments yet.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li key={comment.comment_id} className="flex items-start gap-3">
                {/* <div className="w-9 h-9 bg-gray-700 rounded-full" /> */}
                {/* Placeholder for user avatar */}
                <FaUser className="w-10 h-10 border rounded-full p-1 text-gray-500" />
                <div className="flex-1 ">
                  <p className="text-sm flex lg:flex-row flex-col lg:justify-between text-neutral-400">
                    <span className="font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                      @{comment.user_id.slice(0)}
                    </span>{" "}
                    {/* {comment.content} */}
                    <span className="text-xs text-gray-400 mt-1">
                      {new Date(comment.created_at).toLocaleString()}
                    </span>
                  </p>
                  <div className="text-neutral-200 my-1">{comment.content}</div>
                  <hr />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      
    </div>
  );
}
