import express from "express";
import rateLimit from "express-rate-limit";
import {
  registerUser,
  verifyOtp,
  loginUser,
  refreshTokenHandler,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts",
});

router.post("/register", registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginLimiter, loginUser);
router.post("/refresh", refreshTokenHandler);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;