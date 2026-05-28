import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { showSuccess, showError } from "@/lib/hotToast";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword) {
      showError("Password is required");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${import.meta.env.VITE_API_URL}/api/reset-password`, {
        token,
        newPassword,
      });

      showSuccess("Password reset successful");
      navigate("/");
    } catch (err: any) {
      const message = err?.response?.data?.message || "Reset failed";

      showError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleReset}
        className="w-full max-w-md bg-white p-8 rounded-2xl space-y-5"
      >
        <h1 className="text-2xl font-bold">Reset Password</h1>

        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full h-12 border rounded-xl px-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-purple-600 text-white rounded-xl"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
