import * as yup from "yup";
import { Customer, FormDefinition } from "../types";

const customerEditForm = (
  add: boolean,
  currentCustomer?: Customer
): FormDefinition[] =>
  !add
    ? [
        {
          label: "Name",
          field: "name",
          type: "TextField",
          placeholder: currentCustomer?.name ? currentCustomer.name : undefined,
          validationSchema: yup.string(),
          errorText: "Name must be a string",
        },
        {
          label: "Phone Number",
          type: "Phone",
          field: "phone",
          placeholder: currentCustomer?.phone.toString()
            ? currentCustomer.phone.toString()
            : undefined,
          validationSchema: yup
            .string()
            .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
            .required("Phone number is required"),
          errorText: "Phone number must be ten digits",
        },
        {
          label: "Email",
          field: "email",
          type: "TextField",
          placeholder: currentCustomer?.email.toString()
            ? currentCustomer.email.toString()
            : undefined,
          validationSchema: yup.string().email(),
          errorText: "Email must end in .com or .org",
        },
      ]
    : [
        {
          label: "Name",
          field: "name",
          type: "TextField",
          placeholder: "",
          validationSchema: yup.string(),
          errorText: "Name must be a string",
        },
        {
          label: "Phone Number",
          type: "Phone",
          field: "phone",
          placeholder: "Enter Phone",
          validationSchema: yup
            .string()
            .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
            .required("Phone number is required"),
          errorText: "Phone number must be ten digits",
        },
        {
          label: "Email",
          field: "email",
          type: "TextField",
          placeholder: "",
          validationSchema: yup.string().email(),
          errorText: "Email must end in .com or .org",
        },
      ];
export default customerEditForm;
