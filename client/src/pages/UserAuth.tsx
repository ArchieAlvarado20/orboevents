import Logo from "@/components/shared/Logo";
import UserInput from "@/components/shared/usersPage/components/UserInput";
import { Mail, Lock, Eye, Apple, User } from "lucide-react";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../lib/toast";
import { useAuthForm } from "@/hooks/auth/useAuthForm";
import { useAuthActions } from "@/hooks/auth/useAuthActions";
import { validateAuthForm } from "@/hooks/auth/useValidateAuthForm";
import BackButton from "@/components/shared/BackButton";
import OrboeventsLogo from "@/components/shared/LogoIcon";

export default function UserAuth() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { form, handleChange, resetForm } = useAuthForm();
  const { login, register, handleGoogleLogin } = useAuthActions();

  const query = new URLSearchParams(location.search);
  const tab = query.get("tab");
  const [isLogin, setIsLogin] = useState(tab !== "register");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errorMsg = validateAuthForm(form, isLogin);

    if (errorMsg) {
      showError(errorMsg);
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const user = await login(form);

        showSuccess(`Welcome back, ${user.name}!`);
        navigate("/");
      } else {
        await register(form);
        showSuccess("Account created successfully");
        setIsLogin(true);
        navigate("/");
      }
    } catch (err: any) {
      showError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-purple-300  flex items-center justify-center p-0 md:p-6 font-sans">
        <BackButton className="absolute top-4 left-4 text-gray-700 hover:text-gray-900 transition-colors z-50" />
        <div className="max-w-5xl w-full bg-white rounded-0 md:rounded-[40px] overflow-hidden shadow-2xl shadow-purple-200/50 flex flex-col md:flex-row">
          {/* Left Side: Brand & Visuals */}
          <div className="md:w-1/2 bg-purple-500 relative overflow-hidden p-12 flex flex-col justify-between text-white min-h-[400px]">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-50" />
              <div className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-30" />
              <img
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200"
                alt="Concert crowd"
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
              />
            </div>

            <div className="relative z-10">
              <h1 className="text-4xl font-black tracking-tighter uppercase mb-6">
                <OrboeventsLogo
                  className="w-full h-24 mr-2 text-white"
                  subClassName="text-white"
                />
              </h1>
              <p className="text-lg text-purple-100 max-w-md leading-relaxed font-medium">
                Experience the heartbeat of your city. Join thousands of
                event-goers and community leaders.
              </p>
            </div>

            <div className="relative z-10">
              <div className="flex -space-x-3 mb-4">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/150?u=user${i}`}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-purple-700 object-cover"
                  />
                ))}
                <div className="w-10 h-10 rounded-full bg-purple-500 border-2 border-purple-700 flex items-center justify-center text-xs font-bold">
                  +2k
                </div>
              </div>
              <p className="text-sm font-semibold text-purple-200">
                Already joined by your local community
              </p>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
            <div className="max-w-sm w-full mx-auto space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">
                  Welcome Back
                </h2>
                <p className="text-gray-500 font-medium">
                  Sign in to continue your city adventure.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {!isLogin && (
                  <UserInput
                    label="Name"
                    name="name"
                    value={form.name}
                    placeholder="Jhon Doe"
                    onChange={handleChange}
                    icon={<User className="w-5 h-5" />}
                  />
                )}

                <UserInput
                  label="Email Address"
                  name="email"
                  value={form.email}
                  placeholder="name@example.com"
                  onChange={handleChange}
                  icon={<Mail className="w-5 h-5" />}
                />

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Password
                    </label>
                    {isLogin && (
                      <button
                        type="button"
                        className="text-xs font-bold text-purple-600 hover:text-purple-700"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full h-14 pl-12 pr-12 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 font-medium focus:bg-white focus:ring-4 focus:ring-purple-600/10 focus:border-purple-600 outline-none transition-all"
                      value={form.password}
                      onChange={handleChange}
                      name="password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Confirm Password
                      </label>
                    </div>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
                        <Lock className="w-5 h-5" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full h-14 pl-12 pr-12 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 font-medium focus:bg-white focus:ring-4 focus:ring-purple-600/10 focus:border-purple-600 outline-none transition-all"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        name="confirmPassword"
                      />
                      <button
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                <button className="w-full h-14 bg-purple-600 text-white rounded-2xl font-bold text-lg hover:bg-purple-700 transition-all shadow-xl shadow-purple-600/20 active:scale-[0.98]">
                  {isLogin
                    ? loading
                      ? "Signing in..."
                      : "Sign In"
                    : loading
                      ? "Creating account..."
                      : "Create Account"}
                </button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100" />
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                  <span className="bg-white px-4 text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center gap-3 h-14 border shadow-gray-900 border-gray-100 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FcGoogle className="w-5 h-5 text-red-500" />
                  Google
                </button>
                <button className="hidden items-center justify-center gap-3 h-14 border border-gray-100 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                  <Apple className="w-5 h-5" />
                  Apple
                </button>
              </div>

              <p className="text-center text-sm font-medium text-gray-500">
                {isLogin ? "No account?" : "Already have account?"}{" "}
                <button
                  className="text-purple-600 font-bold hover:underline"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    resetForm();
                  }}
                >
                  {isLogin ? "Create Account" : "Sign In"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
