"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SocialMediaDashboard() {
  const [post, setPost] = useState("");
  const Router = useRouter();

  async function handleLogout(e){
    e.preventDefault();
    try {
        const res = await fetch ("http://localhost:8080/api/v1/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const data = await res.json();
        if (res.ok && data.success) {
            console.log("Logout successful");
            Router.push("/"); // Redirect to login page after logout
        } else {
            console.error("Logout failed:", data.message);
        }
    
    } catch (error) {
        console.error("Error during logout:", error);
    }
  };


  return (
    <div className="min-h-screen h-[200vh] pt-40 bg-neutral-100 dark:bg-neutral-900 px-4 py-6">
      <div className="max-w-xl mx-auto gap-6">
        <button onClick={handleLogout} className="p-2 mb-6 w-full mx-auto bg-neutral-600 rounded-md">
            Logout
        </button>
        
        {/* Feed */}
        <section className="space-y-6">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4">
              Create Post
            </h2>
            <textarea
              rows={3}
              value={post}
              onChange={(e) => setPost(e.target.value)}
              className="w-full p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What's on your mind?"
            />
            <button
            //   onClick={handlePost}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Post
            </button>
          </div>

          {/* Recent Posts (Static for now) */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-neutral-800 p-5 rounded-lg shadow">
                <h3 className="font-semibold text-neutral-800 dark:text-white">
                  User {i}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 mt-2">
                  This is a sample post from user {i}.
                </p>
              </div>
            ))}
          </div>
        </section>

        
      </div>
    </div>
  );
}
