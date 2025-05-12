"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    email: "",
    contact: "",
    interests: [""],
    doodle: "",
  });

  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/user-profile", {
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Unauthorized or failed to fetch data");
        const data = await res.json();
        setProfile(data.data.user);
        setPosts(data.data.posts || []); // Ensure posts is always an array
        setForm({
          email: data.data.user.email,
          contact: data.data.user.contact,
          interests: Array.isArray(data.data.user.interests)
            ? data.data.user.interests.join(", ")
            : "",
          doodle: data.data.user.doodle ?? "",
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load profile. Please log in again.");
        router.push("/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/user-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...form,
          interests: form.interests
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item.length > 0),
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      const data = await res.json();
      setProfile(data.data);
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-neutral-700 dark:text-white">
        Loading your profile...
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-white mb-4">
          My Profile
        </h1>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-white">
            Profile Info
          </h2>
          <button
            className="text-blue-600 dark:text-blue-400 text-sm underline"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>

        {editMode ? (
          <div className="space-y-4 mb-8">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleFormChange}
              className="w-full px-4 py-2 rounded border bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-white"
            />
            <input
              name="contact"
              type="tel"
              placeholder="Contact"
              value={form.contact}
              onChange={handleFormChange}
              className="w-full px-4 py-2 rounded border bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-white"
            />
            <input
              name="interests"
              type="text"
              placeholder="Interests (comma-separated)"
              value={form.interests}
              onChange={handleFormChange}
              className="w-full px-4 py-2 rounded border bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-white"
            />
            <input
              name="doodle"
              type="url"
              placeholder="Doodle image URL"
              value={form.doodle}
              onChange={handleFormChange}
              className="w-full px-4 py-2 rounded border bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-white"
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleUpdate}
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4 mb-8">
            {profile.doodle ? (
              <img
                src={profile.doodle}
                alt="Profile Picture"
                className="w-24 h-24 rounded-full object-cover border-2 border-neutral-300 dark:border-neutral-600"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-neutral-200 dark:bg-neutral-600 flex items-center justify-center">
                <span className="text-neutral-500 dark:text-neutral-300">
                  No Image
                </span>
              </div>
            )}
            <div>
              <p className="text-neutral-700 dark:text-neutral-300">
                <strong>Email:</strong> {profile.email}
              </p>
              <p className="text-neutral-700 dark:text-neutral-300">
                <strong>Contact:</strong> {profile.contact}
              </p>
              <p className="text-neutral-700 dark:text-neutral-300">
                <strong>Interests:</strong>{" "}
                {profile.interests ? (
                  Array.isArray(profile.interests) &&
                  profile.interests.length > 0
                    ? profile.interests.join(", ")
                    : "None"
                ) : (
                  "No interests set"
                )}
              </p>
            </div>
          </div>
        )}

        <h2 className="text-xl font-semibold text-neutral-800 dark:text-white mb-3">
          My Posts
        </h2>
        {posts.length === 0 ? (
          <p className="text-neutral-600 dark:text-neutral-400">
            You haven't posted anything yet.
          </p>
        ) : (
          <div className="space-y-6">
            {posts.map((postData, index) => (
              <div
                key={index}
                className="bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg p-4"
              >
                <p className="text-neutral-800 dark:text-white mb-2">
                  <strong>Content:</strong> {postData?.post?.content ?? "N/A"}
                </p>
                <p className="text-neutral-700 dark:text-neutral-300">
                  <strong>Tags:</strong>{" "}
                  {(postData?.post?.tags ?? []).length > 0
                    ? postData?.post?.tags.join(", ")
                    : "-"}
                </p>
                {postData?.post?.images?.length > 0 && (
                  <div className="mt-4">
                    <strong className="text-neutral-800 dark:text-white">
                      Images:
                    </strong>
                    <div className="flex space-x-2 mt-2">
                      {postData.post.images.map((image, idx) => (
                        <img
                          key={idx}
                          src={image}
                          alt={`Post image ${idx}`}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}
                <p className="text-neutral-700 dark:text-neutral-300">
                  <strong>Upvotes:</strong> {postData.upvotes ?? 0}
                </p>
                <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                  <strong>Downvotes:</strong> {postData.downvotes ?? 0}
                </p>
                <div>
                  <strong className="text-neutral-800 dark:text-white">
                    Comments:
                  </strong>
                  {Array.isArray(postData?.comments) &&
                  postData.comments.length > 0 ? (
                    <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 mt-1">
                      {postData.comments.map((comment, idx) => (
                        <li key={idx}>{comment.content}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 italic">
                      No comments yet.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
