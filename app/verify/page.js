"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { NavbarButton } from "@/components/ui/resizable-navbar";

const VerifyPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [emailInput, setEmailInput] = useState(email); // Make email editable

  const handleVerify = async () => {
    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      const response = await fetch("http://localhost:8080/api/v1/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailInput, otp }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        console.log("OTP verified:", data);
        router.push("/login");
        return; // ✅ Prevents further execution
      } 
      
      if (data.message?.toLowerCase().includes("already verified")) {
        console.log("User already verified:", data);
        router.push("/login");
        return; // ✅ Prevents setLoading or setError from firing
      }
  
      setError(data.message || "OTP verification failed");
    } catch (err) {
      console.error("Verification error:", err);
      setError("An error occurred while verifying OTP.");
    } finally {
      setLoading(false);
    }
  };
  
  
  const handleResend = async () => {
    setResendLoading(true);
    setError("");

    try {
      // Reuse the same registration endpoint to resend OTP
      const response = await fetch("http://localhost:8080/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailInput }), // Send updated email for resend
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log("OTP resent:", data);
        setError(""); // Clear any previous errors
      } else {
        setError(data.message || "Failed to resend OTP.");
      }
    } catch (err) {
      console.error("Resend error:", err);
      setError("An error occurred while resending OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg">
        
        <h2 className="text-2xl font-bold text-center text-neutral-800 dark:text-white mb-4">
          Verify Your Email
        </h2>
        
        <form onSubmit={(e) => { e.preventDefault(); handleVerify(); }} className="space-y-6">
          <div>
            <input
              type="email"
              name="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            //   disabled // Optionally disable the email field if you want to prevent the user from changing it
            />
          </div>

          <div>
            <input
              type="text"
              name="otp"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter OTP"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button type="submit" className="w-full">
            <NavbarButton className="w-full">Verify</NavbarButton>
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-neutral-600 dark:text-neutral-400">
          Didn't receive the code?{" "}
          <button
            onClick={handleResend}
            className="text-white font-bold hover:underline"
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyPage;
