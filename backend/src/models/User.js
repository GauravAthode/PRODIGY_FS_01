import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  isVerified: { type: Boolean, default: false },

  refreshToken: String,

  otp: String,
  otpExpire: Date,

  resetOtp: String,
  resetOtpExpire: Date,
});

export default mongoose.model("User", userSchema);