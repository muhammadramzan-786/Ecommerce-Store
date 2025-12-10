import * as yup from "yup";
import { passwordField } from "./commonFields";

export const resetPasswordSchema=yup.object({
    password: passwordField,
    confirmPassword: yup.string().required("Confirm Password is required").oneOf([yup.ref("password"), null], "Passwords must match")
})