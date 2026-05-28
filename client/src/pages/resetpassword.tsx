import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { showSuccess, showError } from "@/lib/hotToast";
import OrboeventsLogo from "@/components/shared/LogoIcon";
import BackButton from "@/components/shared/BackButton";
import Button from "@/components/shared/Button";
import UserInput from "@/components/shared/usersPage/components/UserInput";
import { EyeIcon, LockIcon } from "lucide-react";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen bg-purple-300 flex items-center justify-center p-6">
      <BackButton className="absolute top-4 left-4 text-gray-700" />

      <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl space-y-6">
        {/* Logo */}
        <div className="flex w-full justify-center mx-auto">
          <OrboeventsLogo
            className="h-24 text-white"
            subClassName="text-white"
          />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold mt-2">Reset Password</h1>
        </div>
        <form
          onSubmit={handleReset}
          className="w-full max-w-md bg-white p-2 rounded-2xl space-y-5"
        >
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
              <LockIcon className="w-5 h-5" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full h-14 pl-12 pr-12 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 font-medium focus:bg-white focus:ring-4 focus:ring-purple-600/10 focus:border-purple-600 outline-none transition-all"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              name="password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <EyeIcon className="w-5 h-5" />
            </button>
          </div>

          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-purple-600 text-white rounded-xl"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
