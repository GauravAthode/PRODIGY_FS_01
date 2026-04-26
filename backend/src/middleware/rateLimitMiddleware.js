import rateLimit from "express-rate-limit";

// ─── Login rate limiter ──────────────────────────────────────────────────────
// 5 attempts per 15 minutes per IP
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
  skipSuccessfulRequests: false,
});

// ─── Registration rate limiter ───────────────────────────────────────────────
// 3 attempts per hour per IP
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many registration attempts. Please try again after an hour.",
  },
});

// ─── OTP request rate limiter ────────────────────────────────────────────────
// 3 OTP requests per 15 minutes per IP
export const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many OTP requests. Please try again after 15 minutes.",
  },
});

// ─── General API rate limiter ────────────────────────────────────────────────
// 100 requests per 15 minutes per IP
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many requests. Please slow down.",
  },
});

