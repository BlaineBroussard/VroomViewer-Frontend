import * as yup from "yup";
import { FormDefinition } from "../types";

export const loginForm: FormDefinition[] = [
  {
    label: "Email",
    field: "email",
    type: "TextField",
    validationSchema: yup.string().email(),
    errorText: "Email must end in .com or .org",
  },
  {
    label: "Password",
    type: "TextField",
    field: "password",
    validationSchema: yup
      .string()
      .required("Password is required")
      .min(8, "Must be at least 8 characters")
      .matches(/[A-Z]/, "Must include an uppercase letter")
      .matches(/[0-9]/, "Must include a number"),
    errorText: "Password must be 8 characters, include an uppercase, lowercase",
  },
  {
    field: "remember_me",
    label: "Remember Me",
    type: "Checkbox",
    validationSchema: yup.boolean(),
    errorText: "",
  },
];

export const signUpForm: FormDefinition[] = [
  {
    label: "Name",
    field: "name",
    type: "TextField",
    validationSchema: yup.string().required(),
    errorText: "Name can't be blank",
  },
  {
    label: "Shop Id",
    field: "shop",
    type: "TextField",
    validationSchema: yup.number().required(),
    errorText: "Shop ID must be a number",
  },
  {
    label: "Email",
    field: "email",
    type: "TextField",
    validationSchema: yup.string().email(),
    errorText: "Email must end in .com or .org",
  },
  {
    label: "Password",
    field: "password",
    type: "TextField",
    validationSchema: yup
      .string()
      .required("Password is required")
      .min(8, "Must be at least 8 characters")
      .matches(/[A-Z]/, "Must include an uppercase letter")
      .matches(/[0-9]/, "Must include a number"),
    errorText: "Password must be 8 characters, include an uppercase, lowercase",
  },
];
