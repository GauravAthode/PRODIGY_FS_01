import { body, validationResult } from "express-validator";

// ─── Reusable field validators ───────────────────────────────────────────────

const nameValidator = body("name")
  .trim()
  .notEmpty()
  .withMessage("Name is required")
  .isLength({ min: 2, max: 50 })
  .withMessage("Name must be between 2 and 50 characters");

const emailValidator = body("email")
  .trim()
  .notEmpty()
  .withMessage("Email is required")
  .isEmail()
  .withMessage("Please enter a valid email")
  .normalizeEmail();

const passwordValidator = body("password")
  .notEmpty()
  .withMessage("Password is required")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters long")
  .matches(/[A-Z]/)
  .withMessage("Password must contain at least one uppercase letter")
  .matches(/[a-z]/)
  .withMessage("Password must contain at least one lowercase letter")
  .matches(/\d/)
  .withMessage("Password must contain at least one number")
  .matches(/[@$!%*?&]/)
  .withMessage("Password must contain at least one special character (@$!%*?&)");

const otpValidator = body("otp")
  .notEmpty()
  .withMessage("OTP is required")
  .isLength({ min: 6, max: 6 })
  .withMessage("OTP must be exactly 6 digits")
  .isNumeric()
  .withMessage("OTP must contain only numbers");

// ─── Middleware to check validation results ──────────────────────────────────

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }
  next();
};

// ─── Route-specific validation chains ────────────────────────────────────────

export const registerValidation = [
  nameValidator,
  emailValidator,
  passwordValidator,
];

export const loginValidation = [emailValidator, passwordValidator];

export const verifyOtpValidation = [emailValidator, otpValidator];

export const forgotPasswordValidation = [emailValidator];

export const resetPasswordValidation = [
  emailValidator,
  otpValidator,
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("New password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("New password must contain at least one lowercase letter")
    .matches(/\d/)
    .withMessage("New password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage(
      "New password must contain at least one special character (@$!%*?&)"
    ),
];

export const resendOtpValidation = [emailValidator];

