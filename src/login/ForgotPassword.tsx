import { Box, Typography, useTheme } from "@mui/material";
import FormTemplate from "../utility/FormTemplate";
import StyledButton from "../utility/StyledButton";
import { loginStyles } from "./loginStyles";
import logo from "../images/logo.svg";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../App";
import api, { getToken, showSnackbar } from "../api/api";
import { FormDefinition } from "../utility/types";

const ForgotPassword = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setValue } = useUserContext();

  const onSubmit = async (payload: any) => {
    setLoading(true);
    const returnResponse = await api("/login/resetLink", "Post", getToken(), {
      email: payload.email,
    });

    showSnackbar(returnResponse, setValue);

    setLoading(false);
  };

  const onBack = () => {
    navigate("/login");
  };

  const resetForm: FormDefinition[] = [
    {
      label: "Enter Email to Reset",
      field: "email",
      type: "TextField",
      validationSchema: yup.string().email(),
      errorText: "Email must end in .com or .org",
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
      <Box>
        <Box sx={loginStyles.buttonContainer}>
          <StyledButton text={"Back to Login"} onclick={onBack} />
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
