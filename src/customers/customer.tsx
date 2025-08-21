import { Box, Button, Drawer } from "@mui/material";
import React from "react";
import { styles } from "../styles/globalStyles";

const CustomerPage = () => {
  const toggleDrawer = () => {};
  return (
    <Box sx={styles.container}>
      <Box sx={styles.sidebar}>Test</Box>
      <Box sx={styles.mainContent}>Test</Box>
    </Box>
  );
};

export default CustomerPage;
