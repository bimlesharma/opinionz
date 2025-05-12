'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { NavbarButton } from "@/components/ui/resizable-navbar";
import { useAuth } from "@/context/AuthContext";
import toast from 'react-hot-toast';


export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
    const { setIsLoggedIn } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
          setIsLoggedIn(true); // Update the context state
          toast.success("Logged in successfully!");
          router.push("/");
      } else {
        setError(data.message || "Login failed");
        toast.error(data.message || "Login failed");
        console.error("Login error:", data.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-neutral-800 dark:text-white mb-6">
          Log In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password + Visibility Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 pr-10 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-neutral-600 dark:text-neutral-400 text-sm focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="flex items-center justify-between">
            <p></p>
            <button onClick={(e) => { e.preventDefault()}} disabled className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mt-1 text-center">{error}</p>
          )}

          <button type="submit" className="w-full" disabled={loading}>
            <NavbarButton className="w-full">{loading ? "Logging in..." : "Login"}</NavbarButton>
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-neutral-600 dark:text-neutral-400">
          Don’t have an account?{" "}
          <a href="/signup" className="text-white font-bold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
