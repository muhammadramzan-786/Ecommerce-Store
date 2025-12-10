import * as yup from "yup";
import { emailField } from "./commonFields";

export const forgotPasswordSchema = yup.object({
  email: emailField,
});
