import * as yup from "yup";

export const emailField = yup
  .string()
  .email("Invalid email format")
  .required("Email is required");

export const passwordField = yup
  .string()
  .required("Password is required")
  .min(4, "Minimum 4 characters");

export const phoneField = yup.string().required("Phone is required").min(11,"Min 11 characters").max(11)
export const cityField = yup.string().required("City is required")
