# PRODIGY_FS_01

Full-stack authentication app with email OTP verification and password reset support.

## Project Structure

- `backend/` - Express/MongoDB API server
  - `src/controllers/` - Authentication and OTP logic
  - `src/models/` - Mongoose user schema
  - `src/routes/` - Auth routes
  - `src/middleware/` - Validation, error handling, rate limiting
  - `src/utils/` - Email templates and email helper

- `frontend/` - React app built with Vite
  - `src/pages/` - Login, Register, Forgot Password, Reset Password, Verify Email, Dashboard
  - `src/api/` - Axios API wrappers for auth endpoints
  - `src/context/` - Auth state management
  - `src/components/` - Protected route support

## Features

- Email/password registration
- OTP email verification for registration
- Login with JWT access and refresh tokens
- Forgot password flow with reset OTP
- Password reset with new password
- Protected dashboard after authentication

## Setup

### Backend

1. Open a terminal in `backend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with keys like:
   ```env
   PORT=5000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   EMAIL_HOST=smtp.example.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend

1. Open a terminal in `frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development app:
   ```bash
   npm run dev
   ```

## Notes

- Frontend expects the backend API on `http://localhost:5000/api`
- Update `frontend/src/api/authApi.js` if the backend URL changes
- The backend uses email sending helpers for OTP and reset flows

## Troubleshooting

- If login fails after password reset, verify the backend and frontend are using the same API and the user record is updated correctly.
- Ensure MongoDB is running and the `MONGO_URI` is correct.
- Check console logs in both backend and frontend for request errors.
