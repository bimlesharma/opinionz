"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [doodle, setDoodle] = useState("");
  const [images, setImages] = useState([""]);
  const [loading, setLoading] = useState(false);
  const defaultTags = ["default"];

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const tagArray = tags.split(",").map((tag) => tag.trim()).filter(Boolean);

    const res = await fetch("http://localhost:8080/api/v1/create-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        content,
        tags: [...defaultTags, ...tagArray],
        anonymous,
        doodle,
        images: images.filter((img) => img.trim() !== ""),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("Post created successfully");
      router.push("/");
    } else {
      alert(data.message || "Failed to create post");
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => {
    setImages([...images, ""]);
  };

  return (
    <div className="p-6 max-w-xl mx-auto pt-20">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Write your content here..."
          className="w-full border px-3 py-2 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="w-full border px-3 py-2 rounded"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
          />
          <span>Post Anonymously</span>
        </label>

        {/* <input
          type="text"
          placeholder="Doodle (optional URL)"
          className="w-full border px-3 py-2 rounded"
          value={doodle}
          onChange={(e) => setDoodle(e.target.value)}
        /> */}

        <div className="space-y-2">
          <label className="block font-medium">Image URLs</label>
          {images.map((img, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Image ${index + 1}`}
              value={img}
              onChange={(e) => handleImageChange(index, e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="text-blue-500 underline"
          >
            + Add another image
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Posting..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
