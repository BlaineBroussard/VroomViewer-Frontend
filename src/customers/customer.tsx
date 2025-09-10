import { Box, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styles } from "../styles/globalStyles";
import CustomerCard from "./customerCard";
import api, { getToken } from "../api/api";
interface Customer {
  email: string;
  phone: number;
  name: string;
}
const CustomerPage = () => {
  const [allCustomers, setAllCustomers] = useState<Customer[]>();
  const [customers, setCustomers] = useState<Customer[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const getAllCustomer = async () => {
    const returnResponse = await api("/customer/getAll", "Get", getToken());
    setCustomers(returnResponse.body);
    setAllCustomers(returnResponse.body);
  };
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
              <CustomerCard
                email={customer.email}
                phone={customer.phone}
                name={customer.name}
              />
            ))
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Box>
      <Box sx={styles.mainContent}>Test</Box>
    </Box>
  );
};

export default CustomerPage;
