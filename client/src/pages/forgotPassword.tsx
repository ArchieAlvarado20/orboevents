import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { showSuccess, showError } from "../lib/hotToast";
import BackButton from "@/components/shared/BackButton";
import { Mail } from "lucide-react";
import Logo from "@/components/shared/Logo";
import OrboeventsLogo from "@/components/shared/LogoIcon";
import { Link } from "react-router-dom";
import axios from "axios";

export default function UserForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      showError("Email is required");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${import.meta.env.VITE_API_URL}/api/forgot-password`, {
        email,
      });

      showSuccess("Reset link sent to your email");
      setEmail("");
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Failed to send reset link";

      showError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-purple-300 flex items-center justify-center p-6">
      <BackButton className="absolute top-4 left-4 text-gray-700" />

      <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mt-4">Forgot Password</h1>
          <p className="text-gray-500 text-sm">
            Enter your email to receive reset link
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleReset} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-purple-600/10 focus:border-purple-600 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 transition-all"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Remember your password?{" "}
          <Link to={"/"} className="text-purple-600 font-bold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
