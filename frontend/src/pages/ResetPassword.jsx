import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { resetPassword } from "../api/authApi";
import { Eye, EyeOff } from "lucide-react";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

const ResetPassword = () => {
  const location = useLocation();
  const initialEmail = location.state?.email || "";

  const [form, setForm] = useState({
    email: initialEmail,
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const email = form.email.trim();
    const otp = form.otp.trim();
    const newPassword = form.newPassword.trim();
    const confirmPassword = form.confirmPassword.trim();

    if (!email || !otp || !newPassword || !confirmPassword) {
      return setError("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (!passwordRegex.test(newPassword)) {
      return setError(
        "Password must be strong (8+, upper, lower, number, special char)"
      );
    }

    setLoading(true);

    try {
      await resetPassword({ email, otp, newPassword });
      setSuccess("Password reset successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">
          Reset Password 🔄
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-600 rounded-lg text-sm">
            {success}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="text"
            placeholder="OTP"
            value={form.otp}
            onChange={(e) =>
              setForm({ ...form, otp: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={form.newPassword}
              onChange={(e) =>
                setForm({ ...form, newPassword: e.target.value })
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

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <p className="text-xs text-gray-500">
            Must include uppercase, lowercase, number & special character
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Didn&apos;t receive OTP?{" "}
          <Link to="/forgot-password" className="text-indigo-600 font-medium">
            Resend
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;

