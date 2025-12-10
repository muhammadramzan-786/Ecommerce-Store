import * as yup from "yup";
import { cityField, emailField, passwordField, phoneField } from "./commonFields";

export const updateProfileSchema = yup.object({
    fullName: yup.string().required("Name is required").min(3, "Min 3 characters"),
    email:emailField,
    phone: phoneField,
    city: cityField,
    password: passwordField
})