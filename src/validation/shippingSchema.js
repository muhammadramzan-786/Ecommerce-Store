import * as yup from "yup";
import { cityField, emailField, passwordField, phoneField } from "./commonFields";

export const shippingSchema=yup.object({
        fullName: yup.string().required("Name is required").min(3, "Min 3 characters"),
        email:emailField,
        streetAddress:yup.string().required("Street Address is required"),
        phone: phoneField,
        city: cityField,
        postalCode : yup.string().required("Postal Code is required").min(5, "Min 5 characters")
})