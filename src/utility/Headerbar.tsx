import { Box, Button, Menu, MenuItem, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { styles } from "../../src/styles/globalStyles";
import logo from "../images/logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

const HeaderBar = () => {
  const [tabsValue, setTabsValue] = useState<string>("home");
  const location = useLocation();
  const navigate = useNavigate();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const firstSegment = pathSegments[0] || "home";

  useEffect(() => {
    setTabsValue(firstSegment);
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(`/${newValue}`);
    setTabsValue(newValue);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box sx={styles.header}>
      <Tabs
        value={tabsValue}
        onChange={handleChange}
        aria-label="lab API tabs example"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
        }}
        slotProps={{
          indicator: {
            sx: {
              backgroundColor: "#322D29",
              height: "100%",
              zIndex: "1",
              borderRadius: "15px",
            },
          },
        }}
      >
        <Tab sx={styles.tab} label="All Test Drives" value="home" />
        <Tab sx={styles.tab} label="Customers" value="customers" />
        <Tab sx={styles.tab} label="Admin" value="admin" />
        <Tab sx={styles.tab} label="My Profile" value="profile" />
      </Tabs>
      <Box sx={styles.profile}>
        <Button
          sx={{ color: "white" }}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Box component="img" src={logo} sx={styles.imageLogo()} />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          slotProps={{
            paper: {
              sx: styles.menuDropdown,
            },
          }}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default HeaderBar;
