import { Box, Typography, useTheme } from "@mui/material";
import FormTemplate from "../utility/FormTemplate";
import { loginStyles } from "./loginStyles";
import logo from "../images/logo.svg";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../App";
import api, { getToken, showSnackbar } from "../api/api";
import { FormDefinition } from "../utility/types";

const ResetPage = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setValue } = useUserContext();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const resetToken = queryParams.get("resetToken");
  const onSubmit = async (payload: any) => {
    setLoading(true);
    const returnResponse = await api(
      "/login/changePassword",
      "Put",
      getToken(),
      {
        email: payload.email,
        newPassword: payload.new_password,
        resetString: resetToken,
      }
    );

    setLoading(false);

    showSnackbar(returnResponse, setValue);
    if (returnResponse.success) {
      navigate("/login");
    }
  };

  const resetForm: FormDefinition[] = [
    {
      label: "Enter Email to Reset",
      field: "email",
      type: "TextField",
      validationSchema: yup.string().email(),
      errorText: "Email must end in .com or .org",
    },
    {
      label: "New Password",
      type: "TextField",
      field: "new_password",
      validationSchema: yup
        .string()
        .required("Password is required")
        .min(8, "Must be at least 8 characters")
        .matches(/[A-Z]/, "Must include an uppercase letter")
        .matches(/[0-9]/, "Must include a number"),
      errorText:
        "Password must be 8 characters, include an uppercase, lowercase",
    },
  ];
  return (
    <Box sx={loginStyles.loginBox(theme)}>
      <Box>
        <Box component="img" src={logo} sx={loginStyles.imageLogo()} />
        <Typography color="text.primary" sx={{ fontSize: 32, fontWeight: 600 }}>
          Reset Password
        </Typography>
      </Box>
      <Box>
        <FormTemplate
          key={"login-form"}
          loading={loading}
          size={12}
          submit={onSubmit}
          formDef={resetForm}
        />
      </Box>
    </Box>
  );
};

export default ResetPage;
