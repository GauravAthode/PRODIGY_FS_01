import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { verifyOtp } from "../api/authApi";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VerifyEmail = () => {
  const location = useLocation();
  const initialEmail = location.state?.email || "";

  const [form, setForm] = useState({
    email: initialEmail,
    otp: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const email = form.email.trim();
    const otp = form.otp.trim();

    if (!emailRegex.test(email)) {
      return setError("Invalid email format");
    }

    if (!otp) {
      return setError("OTP is required");
    }

    setLoading(true);

    try {
      await verifyOtp({ email, otp });
      setSuccess("Account verified! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">
          Verify Email ✅
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
            Enter the OTP sent to your email to verify your account.
          </p>

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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {loading ? "Verifying..." : "Verify Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already verified?{" "}
          <Link to="/login" className="text-indigo-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;

