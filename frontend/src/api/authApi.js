import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});
export const register = (data) => API.post("/auth/register", data);
export const verifyOtp = (data) => API.post("/auth/verify-otp", data);
export const login = (data) => API.post("/auth/login", data);
export const forgotPassword = (data) => API.post("/auth/forgot-password", data);
export const resetPassword = (data) => API.post("/auth/reset-password", data);

