import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/authApi";
import { Eye, EyeOff } from "lucide-react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const name = form.name.trim();
    const email = form.email.trim();
    const password = form.password.trim();

    if (!name) return setError("Name is required");

    if (!emailRegex.test(email)) {
      return setError("Invalid email format");
    }

    if (!passwordRegex.test(password)) {
      return setError(
        "Password must be strong (8+, upper, lower, number, special char)"
      );
    }

    setLoading(true);

    try {
      await register({ name, email, password });

      // 📧 Go to OTP verification
      navigate("/verify-email", {
        state: { email },
      });

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">

      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">

        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account 🚀
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg"
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
              className="w-full px-4 py-2 border rounded-lg"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <p className="text-xs text-gray-500">
            Must include uppercase, lowercase, number & special character
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;