import { Eye, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "@/components/shared/Footer";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/shared/Logo";
import { showError } from "@/lib/alert";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  id: string;
  role: "admin" | "user";
};

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      password: "",
    });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = isLogin
        ? `${import.meta.env.VITE_API_URL}/api/login`
        : `${import.meta.env.VITE_API_URL}/api/register`;

      const res = await axios.post(url, form);

      console.log("SUCCESS:", res.data);

      if (isLogin) {
        const { accessToken, user } = res.data;

        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Somethind Went Wrong!";

      showError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      window.history.replaceState({}, "", "/auth");

      const decoded = jwtDecode<JwtPayload>(token);

      if (decoded.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, []);
  return (
    <>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>
      {/* <!-- Header (Brand Only) --> */}
      <header className="relative z-10 w-full px-8 py-5 mt-5 flex justify-center items-center">
        <Logo className="h-24" />
      </header>
      <div className="relative z-10 flex-grow flex items-center justify-center px-4 pb-1">
        {error && (
          <div className="w-full max-w-[440px] mb-2 text-sm p-5 m-3 rounded-lg bg-red-500 text-white text-center">
            {error}
          </div>
        )}
      </div>

      {/* <!-- Main Login Content --> */}
      <main className="relative z-10 flex-grow flex items-center justify-center px-4 pb-20">
        <div className="w-full max-w-[440px] bg-white border border-slate-200 shadow-sm rounded-xl p-8 lg:p-10">
          {/* <!-- Header Section --> */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2 text-slate-900">
              Welcome Back
            </h1>
            <p className="text-base text-slate-500">
              Login to access your ticketing dashboard
            </p>
          </div>
          {/* <!-- Social Login --> */}
          <div className="grid grid-cols-1 gap-3 mb-8">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              <FcGoogle />
              <span>Continue with Google</span>
            </button>
          </div>
          <div className="relative flex items-center justify-center mb-8">
            <div className="w-full border-t border-slate-200"></div>
            <span className="absolute px-4 bg-white text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Or continue with
            </span>
          </div>
          {/* <!-- Login Form --> */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Name
                </label>
                <input
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-md text-slate-900 text-base
focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-600
transition-all"
                  id="name"
                  name="name"
                  placeholder="JohnDoe@gmail.com"
                  required
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email address
              </label>
              <input
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-md text-slate-900 text-base
focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-600
transition-all"
                id="email"
                name="email"
                placeholder="JohnDoe@gmail.com"
                required
                type="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>

                <a
                  className="text-sm font-medium text-indigo-600 hover:underline"
                  href="#"
                >
                  Forgot password?
                </a>
              </div>

              <div className="relative">
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-md text-slate-900 text-base
focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-600
transition-all"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <input
                className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500/20"
                id="remember"
                type="checkbox"
              />
              <label className="ml-2 text-sm text-slate-500">
                Remember me!
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors active:scale-[0.98] duration-150 shadow-md shadow-indigo-600/20 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In to Dashboard"}
            </button>
          </form>

          {/* TOGGLE */}
          <div className="text-center mt-5 mb-5">
            <p className="text-xs text-on-surface font-medium">
              {isLogin ? "No account?" : "Already have account?"}
              <button
                className="text-indigo-600 font-bold ml-2 hover:underline underline-offset-4 cursor-pointer"
                onClick={() => {
                  setIsLogin(!isLogin);
                  resetForm();
                }}
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </div>

          {/* <!-- Security Badge --> */}
          <div className="mt-10 flex flex-col items-center">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-200 mb-3">
              <Lock />
              <span className="text-xs font-semibold text-slate-600">
                Secure Session
              </span>
            </div>
          </div>
        </div>
      </main>
      {/* <!-- Footer --> */}
      <Footer />
    </>
  );
}
