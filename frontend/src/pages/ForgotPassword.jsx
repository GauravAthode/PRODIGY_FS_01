import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { forgotPassword } from "../api/authApi";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const trimmedEmail = email.trim();

    if (!emailRegex.test(trimmedEmail)) {
      return setError("Invalid email format");
    }

    setLoading(true);

    try {
      await forgotPassword({ email: trimmedEmail });
      setSuccess("Reset OTP sent to your email.");
      setTimeout(() => {
        navigate("/reset-password", { state: { email: trimmedEmail } });
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send reset OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">
          Forgot Password 🔐
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
          <p className="text-sm text-gray-600 text-center">
            Enter your email and we will send you an OTP to reset your password.
          </p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {loading ? "Sending OTP..." : "Send Reset OTP"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Remember your password?{" "}
          <Link to="/login" className="text-indigo-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

