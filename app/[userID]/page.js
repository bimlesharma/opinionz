// app/[userID]/page.tsx
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

// Fetch user data from your backend or DB
export async function getUserProfile(userID) {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/users/${userID}`, {
        cache: "no-store",
        next: { revalidate: 0 }, // for Next.js caching control
      });
  
      if (!res.ok) {
        console.error(`Failed to fetch user profile: ${res.statusText}`);
        return null;
      }
  
      const data = await res.json();
      console.log("User data:", data);
  
      if (!data.success) {
        console.warn(`API responded with failure: ${data.message}`);
        return null;
      }
  
      return data.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  }
  

export default async function UserProfilePage({ params }) {
  const userID = params.userID;
  const user = await getUserProfile(userID);

  if (!user) return notFound();

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 bg-white shadow-lg rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Profile Picture */}
            <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
              <img
                src={user.profile_image || "/default-avatar.png"} // Default avatar in case no profile picture
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">{user.user_id || "Unnamed User"}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>
          </div>

          {/* Edit Button */}
          <button
            // onClick={() => alert("Edit Profile functionality")}
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full transition-all"
          >
            Edit Profile
          </button>
        </div>

        {/* User Info */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Contact:</span>
            <span className="text-gray-600 dark:text-gray-400">{user.contact || "No contact info"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Role:</span>
            <span className="text-gray-600 dark:text-gray-400">{user.Role}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Verified:</span>
            <span className="text-gray-600 dark:text-gray-400">{user.Verified ? "Yes" : "No"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Joined:</span>
            <span className="text-gray-600 dark:text-gray-400">{new Date(user.CreatedAt).toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Bio:</span>
            <p className="text-gray-600 dark:text-gray-400">{user.bio || "No bio available"}</p>
          </div>
        </div>

        {/* User's Posts or Additional Information */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Posts</h2>
          {/* Render user's posts here */}
          <p className="text-gray-500 dark:text-gray-300">No recent posts available</p>
        </div>
      </div>
    </div>
  );
}
