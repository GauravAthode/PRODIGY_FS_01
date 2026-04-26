import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import { otpEmailTemplate, resetPasswordEmailTemplate } from "../utils/emailTemplates.js";

// 🔐 Helpers
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const hashOtp = (otp) =>
  crypto.createHash("sha256").update(otp).digest("hex");

// 🔑 JWT
const generateAccessToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

const generateRefreshToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

// 📝 REGISTER (send OTP)
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP();
    const hashedOtp = hashOtp(otp);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp: hashedOtp,
      otpExpire: Date.now() + 10 * 60 * 1000,
    });

    await sendEmail(
      email,
      "OTP Verification",
      otpEmailTemplate(otp, "verification")
    );

    res.json({ message: "OTP sent to email" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ VERIFY OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "User not found" });

    const hashedOtp = hashOtp(otp);

    if (user.otp !== hashedOtp)
      return res.status(400).json({ message: "Invalid OTP" });

    if (user.otpExpire < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    user.isVerified = true;
    user.otp = null;
    user.otpExpire = null;

    await user.save();

    res.json({ message: "Account verified" });
  } catch {
    res.status(500).json({ message: "Error verifying OTP" });
  }
};

// 🔐 LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified)
      return res.status(403).json({ requiresVerification: true, message: "Verify OTP first" });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({ accessToken, refreshToken });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔁 REFRESH TOKEN
export const refreshTokenHandler = async (req, res) => {
  const { token } = req.body;

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== token)
      return res.sendStatus(403);

    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  } catch {
    res.sendStatus(403);
  }
};

// 🔐 FORGOT PASSWORD (send OTP)
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "User not found" });

    const otp = generateOTP();
    const hashedOtp = hashOtp(otp);

    user.resetOtp = hashedOtp;
    user.resetOtpExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendEmail(
      email,
      "Reset Password OTP",
      resetPasswordEmailTemplate(otp)
    );

    res.json({ message: "Reset OTP sent" });
  } catch {
    res.status(500).json({ message: "Error sending OTP" });
  }
};

// 🔄 RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "User not found" });

    const hashedOtp = hashOtp(otp);

    if (user.resetOtp !== hashedOtp)
      return res.status(400).json({ message: "Invalid OTP" });

    if (user.resetOtpExpire < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.isVerified = true;
    user.resetOtp = null;
    user.resetOtpExpire = null;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch {
    res.status(500).json({ message: "Error resetting password" });
  }
};