import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Eye, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "@/components/shared/Footer";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/shared/Logo";
import { showError } from "@/lib/alert";
import { jwtDecode } from "jwt-decode";
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
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
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
                }
                else {
                    navigate("/");
                }
            }
            else {
                navigate("/");
            }
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Somethind Went Wrong!";
            showError(message);
        }
        finally {
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
            const decoded = jwtDecode(token);
            if (decoded.role === "admin") {
                navigate("/admin/dashboard");
            }
            else {
                navigate("/");
            }
        }
    }, []);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "fixed inset-0 z-0 overflow-hidden pointer-events-none", children: [_jsx("div", { className: "absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" }), _jsx("div", { className: "absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" })] }), _jsx("header", { className: "relative z-10 w-full px-8 py-5 mt-5 flex justify-center items-center", children: _jsx(Logo, { className: "h-24" }) }), _jsx("div", { className: "relative z-10 flex-grow flex items-center justify-center px-4 pb-1", children: error && (_jsx("div", { className: "w-full max-w-[440px] mb-2 text-sm p-5 m-3 rounded-lg bg-red-500 text-white text-center", children: error })) }), _jsx("main", { className: "relative z-10 flex-grow flex items-center justify-center px-4 pb-20", children: _jsxs("div", { className: "w-full max-w-[440px] bg-white border border-slate-200 shadow-sm rounded-xl p-8 lg:p-10", children: [_jsxs("div", { className: "text-center mb-10", children: [_jsx("h1", { className: "text-3xl font-bold mb-2 text-slate-900", children: "Welcome Back" }), _jsx("p", { className: "text-base text-slate-500", children: "Login to access your ticketing dashboard" })] }), _jsx("div", { className: "grid grid-cols-1 gap-3 mb-8", children: _jsxs("button", { type: "button", onClick: handleGoogleLogin, className: "flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors", children: [_jsx(FcGoogle, {}), _jsx("span", { children: "Continue with Google" })] }) }), _jsxs("div", { className: "relative flex items-center justify-center mb-8", children: [_jsx("div", { className: "w-full border-t border-slate-200" }), _jsx("span", { className: "absolute px-4 bg-white text-[10px] font-bold text-slate-500 uppercase tracking-widest", children: "Or continue with" })] }), _jsxs("form", { className: "space-y-6", onSubmit: handleSubmit, children: [!isLogin && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: "Name" }), _jsx("input", { className: "w-full px-4 py-2.5 bg-white border border-slate-200 rounded-md text-slate-900 text-base\nfocus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-600\ntransition-all", id: "name", name: "name", placeholder: "JohnDoe@gmail.com", required: true, type: "text", value: form.name, onChange: handleChange })] })), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: "Email address" }), _jsx("input", { className: "w-full px-4 py-2.5 bg-white border border-slate-200 rounded-md text-slate-900 text-base\nfocus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-600\ntransition-all", id: "email", name: "email", placeholder: "JohnDoe@gmail.com", required: true, type: "email", value: form.email, onChange: handleChange })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("label", { className: "block text-sm font-medium text-slate-700", children: "Password" }), _jsx("a", { className: "text-sm font-medium text-indigo-600 hover:underline", href: "#", children: "Forgot password?" })] }), _jsxs("div", { className: "relative", children: [_jsx("input", { name: "password", value: form.password, onChange: handleChange, type: showPassword ? "text" : "password", placeholder: "Enter your password", className: "w-full px-4 py-2.5 bg-white border border-slate-200 rounded-md text-slate-900 text-base\nfocus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-600\ntransition-all", required: true }), _jsx("button", { type: "button", onClick: () => setShowPassword((prev) => !prev), className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600", children: _jsx(Eye, { size: 18 }) })] })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { className: "w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500/20", id: "remember", type: "checkbox" }), _jsx("label", { className: "ml-2 text-sm text-slate-500", children: "Remember me!" })] }), _jsx("button", { type: "submit", disabled: loading, className: "w-full bg-indigo-600 text-white py-3 px-4 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors active:scale-[0.98] duration-150 shadow-md shadow-indigo-600/20 disabled:opacity-50", children: loading ? "Signing in..." : "Sign In to Dashboard" })] }), _jsx("div", { className: "text-center mt-5 mb-5", children: _jsxs("p", { className: "text-xs text-on-surface font-medium", children: [isLogin ? "No account?" : "Already have account?", _jsx("button", { className: "text-indigo-600 font-bold ml-2 hover:underline underline-offset-4 cursor-pointer", onClick: () => {
                                            setIsLogin(!isLogin);
                                            resetForm();
                                        }, children: isLogin ? "Register" : "Login" })] }) }), _jsx("div", { className: "mt-10 flex flex-col items-center", children: _jsxs("div", { className: "flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-200 mb-3", children: [_jsx(Lock, {}), _jsx("span", { className: "text-xs font-semibold text-slate-600", children: "Secure Session" })] }) })] }) }), _jsx(Footer, {})] }));
}
