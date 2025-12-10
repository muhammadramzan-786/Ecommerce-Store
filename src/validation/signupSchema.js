import * as yup from "yup";
import { emailField, passwordField } from "./commonFields";

export const signupSchema = yup.object({
  name: yup
    .string()
    .min(3)
    .max(20)
    .required("name required"),
  email: emailField,
  password: passwordField,
});
