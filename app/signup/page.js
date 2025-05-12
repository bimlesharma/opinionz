"use client";
import { useState } from "react";
import { NavbarButton } from "@/components/ui/resizable-navbar";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const newErrors = {
      email: "",
      contact: "",
      password: "",
      confirmPassword: "",
    };

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!form.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(form.email))
      newErrors.email = "Please enter a valid email address";

    // Contact validation
    const contactRegex = /^\+?[0-9]{7,15}$/;
    if (!form.contact) newErrors.contact = "Contact number is required";
    else if (!contactRegex.test(form.contact))
      newErrors.contact = "Please enter a valid contact number";

    // Password validation
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    // Confirm password validation
    if (!form.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
  
  
    try {
      const response = await fetch("http://localhost:8080/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          contact: form.contact,
          password: form.password,
          interests: ["default"],
          doodle: "/logo.png",
        }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        console.log("User created:", data.data);
        toast.success("Signup successful! Verify your email.");
        router.push(`/verify?email=${encodeURIComponent(form.email)}`);
      } else if (data.message === "User already exists and is verified.") {
        toast.error("User already verified. Please log in.");
        // console.log("User :", data.data, "already exists and is verified.");
        // Redirect to verification page
        router.push(`/login`);
      } else {
        // console.error("Registration failed:", data.message);
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      // console.error("Error submitting registration form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-neutral-800 dark:text-white mb-6">
          Create an Account
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
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Contact */}
          <div>
            <input
              type="tel"
              name="contact"
              required
              value={form.contact}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your contact number"
            />
            {errors.contact && (
              <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button type="submit" className="w-full" disabled={loading}>
            <NavbarButton className="w-full">{loading ? "Signing up..." : "Sign Up"}</NavbarButton>
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-neutral-600 dark:text-neutral-400">
          Already have an account?{" "}
          <a href="/login" className="text-white font-bold hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
