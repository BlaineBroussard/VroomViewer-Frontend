import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styles } from "../styles/globalStyles";
import CustomerCard from "./customerCard";
import api, { getToken, showSnackbar } from "../api/api";
import * as yup from "yup";
import FormTemplate, { FormDefinition } from "../utility/FormTemplate";
import { useUserContext } from "../App";
import AddIcon from "@mui/icons-material/Add";

interface Customer {
  record_id: number;
  email: string;
  phone: number;
  name: string;
}

const CustomerPage = () => {
  const [allCustomers, setAllCustomers] = useState<Customer[]>();
  const [customers, setCustomers] = useState<Customer[]>();
  const [currentCustomer, setCurrentCustomer] = useState<Customer>();
  const [addMode, setAddMode] = useState<boolean>();
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const { setValue } = useUserContext();
  const getAllCustomer = async () => {
    setLoading(true);
    const returnResponse = await api("/customer/getAll", "Get", getToken());
    setCustomers(returnResponse.body);
    setAllCustomers(returnResponse.body);
    setCurrentCustomer(returnResponse.body[0]);
    setLoading(false);
  };

  const customerEditForm: FormDefinition[] = [
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
  ];

  const customerAddForm: FormDefinition[] = [
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
  const searchCustomers = (inputString: string) => {
    setLoading(true);
    setTimeout(() => {
      if (!inputString) {
        // Show all customers if input is empty
        setCustomers(allCustomers);
      } else {
        // Filter against the full list
        const filteredCustomers = allCustomers?.filter((customer) =>
          customer.name.toLowerCase().includes(inputString.toLowerCase())
        );
        setCustomers(filteredCustomers);
      }
      setLoading(false);
    }, 500); // debounce 500ms
  };
  const changeCurrentCustomer = (currentCustomer: Customer) => {
    setCurrentCustomer(currentCustomer);
    setAddMode(false);
  };
  const submitCustomerEdit = async (payload: any): Promise<void> => {
    payload.record_id = currentCustomer?.record_id;
    const returnResponse = await api(
      "/customer/updateCustomer",
      "Put",
      getToken(),
      payload
    );
    showSnackbar(returnResponse, setValue);
    getAllCustomer();
  };

  const submitCustomerNew = async (payload: any): Promise<void> => {
    payload.record_id = currentCustomer?.record_id;
    const returnResponse = await api(
      "/customer/createCustomer",
      "Post",
      getToken(),
      payload
    );
    showSnackbar(returnResponse, setValue);
    getAllCustomer();
  };
  useEffect(() => {
    getAllCustomer();
  }, []);
  return (
    <Box sx={styles.container}>
      <Box sx={styles.sidebar}>
        <Box sx={styles.search}>
          <TextField
            sx={{
              "& .MuiInputBase-input": {
                color: "black", // text color
              },
              width: "100%",
              "&:hover fieldset": {
                borderColor: "black", // hover border color
              },
            }}
            id="outlined-search"
            label="Search Customers"
            type="search"
            onChange={(e) => searchCustomers(e.target.value)}
          />
        </Box>
        <Box>
          {customers && !loading ? (
            customers.map((customer) => (
              <Button onClick={(e) => changeCurrentCustomer(customer)}>
                <CustomerCard
                  email={customer.email}
                  phone={customer.phone}
                  name={customer.name}
                />
              </Button>
            ))
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Box>
      <Box sx={styles.mainContent}>
        <Box>
          <Button
            onClick={() => {
              setAddMode(true);
            }}
            variant="contained"
          >
            <AddIcon />
          </Button>
        </Box>
        <Box sx={styles.customerEditForm}>
          {" "}
          {addMode ? (
            <>
              <Typography>Add new customer</Typography>
              <FormTemplate
                key={"add-customer-form"}
                loading={loading}
                size={12}
                lightForm={true}
                submit={submitCustomerNew}
                formDef={customerAddForm}
              />
            </>
          ) : (
            <>
              <Typography>Edit Customer: {currentCustomer?.name}</Typography>
              <FormTemplate
                key={"signup-form"}
                loading={loading}
                size={12}
                lightForm={true}
                submit={submitCustomerEdit}
                formDef={customerEditForm}
              />
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerPage;
