import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { styles } from "../styles/globalStyles";
import CustomerCard from "./customerCard";
import api, { getToken, showSnackbar } from "../api/api";
import FormTemplate from "../utility/FormTemplate";
import { useUserContext } from "../App";
import AddIcon from "@mui/icons-material/Add";
import customerEditForm from "../utility/formDefs/customerFormDef";
import ScrollContainer from "../utility/scrollContainer";
import { Customer } from "../utility/types";

const CustomerPage = () => {
  const [currentCustomer, setCurrentCustomer] = useState<Customer>();
  const [addMode, setAddMode] = useState<boolean>(true);
  const { setValue } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const changeCurrentCustomer = (currentCustomer: Customer) => {
    setCurrentCustomer(currentCustomer);
    setAddMode(false);
  };
  const submitCustomerEdit = async (payload: any): Promise<void> => {
    setLoading(true);
    payload.record_id = currentCustomer?.record_id;
    const returnResponse = await api(
      "/customer/updateCustomer",
      "Put",
      getToken(),
      payload
    );
    showSnackbar(returnResponse, setValue);
    setRefreshKey((prev) => prev + 1);
    setLoading(false);
  };

  const submitCustomerNew = async (payload: any): Promise<void> => {
    setLoading(true);
    const returnResponse = await api(
      "/customer/createCustomer",
      "Post",
      getToken(),
      payload
    );
    showSnackbar(returnResponse, setValue);
    setRefreshKey((prev) => prev + 1);
    setLoading(false);
  };

  return (
    <Box sx={styles.container}>
      <ScrollContainer<Customer>
        paginateUrl="/customer/getPaginated/"
        searchUrl="/customer/getOneByName/"
        returnComponent={CustomerCard}
        setCurrentValue={changeCurrentCustomer}
        refreshKey={refreshKey}
      />
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
          <>
            <Typography>
              {addMode ? "Add new customer" : "Edit customer"}
            </Typography>
            <FormTemplate
              key={addMode ? "add-customer-form" : "signup-form"}
              loading={loading}
              size={12}
              lightForm={true}
              submit={addMode ? submitCustomerNew : submitCustomerEdit}
              formDef={customerEditForm(addMode, currentCustomer)}
            />
          </>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerPage;
