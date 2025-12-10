import * as yup from "yup"
import { emailField, passwordField } from "./commonFields"

export const loginSchema=yup.object().shape({
    email : emailField,
    password : passwordField
})