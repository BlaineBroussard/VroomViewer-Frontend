import { Box } from "@mui/material";
import theme from "../../styles/theme";
import { loginStyles } from "./loginStyles";
import { Outlet } from "react-router-dom";

const LoginBackground = () => (
  <Box sx={loginStyles.loginContainer(theme)}>
    <Outlet />
  </Box>
);
export default LoginBackground;
