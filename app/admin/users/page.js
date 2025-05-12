"use client";

import { useEffect, useState } from "react";
import fetcher from "@/lib/fetcher";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetcher("/users")
      .then((res) => {
        setUsers(res.data);
        console.log("Fetched users:", res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
  const confirmDelete = confirm("Are you sure you want to delete this user?");
  if (!confirmDelete) return;

  try {
    console.log("Deleting user with ID:", id);
    // Make a DELETE request to the server
    const res = await fetcher(`/delete-user?id=${id}`, "DELETE");

    if (res.success) {
      alert("User deleted successfully.");
      setUsers(users.filter((user) => user._id !== id));
    } else {
      alert("Error deleting user.");
    }
  } catch (err) {
    console.error("Error deleting user:", err);
    alert("Error deleting user.");
  }
};


  if (loading) return <p className="pt-40 text-center text-2xl">Loading...</p>;

  return (
    <div className="p-6 pt-20 bg-gray- min-h-screen text-gray-50 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-8 ">Admin - Users</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.user_id}
            className="bg-neutral-800 shadow-md flex flex-col justify-center items-center rounded-lg p-4 border "
          >
            <div className="flex items-center mb-4 ">
              <img
                src={user.doodle}
                alt="User Avatar"
                className={`w-40 h-40 object-cover rounded-full border-4 ${user.role === "admin" ? "border-blue-500": "border-neutral-50"}`}
              />
            </div>
            <div className="w-full bg-neutral-700 p-6 rounded-sm">
              <p className="font-bold text-blue-300">User ID: {user.user_id}</p>
              <p className="font-semibold">Email: {user.email}</p>
              <p className="text-sm">Contact: {user.contact}</p>
              <p className="text-sm">
                <span className="font-medium">Joined on:</span> {new Date(user.created_at).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className="font-medium">Verified:</span>{" "}
                {user.verified ? "Yes" : "No"}
              </p>
              <p className="text-sm">
                <span className="font-medium">Role:</span> {user.role}
              </p>
            </div>
            <h2>Interests:</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {user.interests.map((interest, index) => (
                <span
                  key={`${user.user_id}-${index}`}
                  className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full"
                >
                  #{interest}
                </span>
              ))}
            </div>

            <button
              className="text-white bg-red-500 w-full p-2 rounded-sm text-sm font-medium hover:underline"
              onClick={() => handleDelete(user.user_id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
