import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const email = form.email.trim();
    const password = form.password.trim();

    if (!emailRegex.test(email)) {
      return setError("Invalid email format");
    }

    if (!password) {
      return setError("Password is required");
    }

    setLoading(true);

    try {
      const { data } = await login({ email, password });

      // 🔐 Not verified → go OTP page
      if (data?.requiresVerification) {
        return navigate("/verify-email", { state: { email } });
      }

      loginUser(data);
      navigate("/dashboard");

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">

      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">

        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back 👋
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {/* Forgot */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;