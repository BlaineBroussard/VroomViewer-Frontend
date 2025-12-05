import { Box, Typography, useTheme } from "@mui/material";
import { loginStyles } from "./loginStyles";
import logo from "../images/logo.svg";
import { useEffect, useState } from "react";
import StyledButton from "../utility/StyledButton";
import FormTemplate from "../utility/FormTemplate";
import { useUserContext } from "../App";
import api, { getToken, showSnackbar } from "../api/api";
import { useNavigate } from "react-router-dom";
import { loginForm, signUpForm } from "../utility/formDefs/loginFormDef";

const LoginPage = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [signIn, setSignIn] = useState<Boolean>(true);
  const navigate = useNavigate();

  const { setValue } = useUserContext();

  useEffect(() => {});

  const onClick = (): void => {
    setSignIn(!signIn);
  };

  const onForgot = (): void => {
    navigate("/forgotPassword");
  };

  const onSubmitLogin = async (payload: any): Promise<void> => {
    setLoading(true);
    const returnResponse = await api("/login", "Post", getToken(), payload);
    setLoading(false);

    if (returnResponse.success && returnResponse.token) {
      setValue((prev) => ({
        ...prev,
        userInfo: {
          token: returnResponse.token,
        },
      }));

      if (payload.remember_me) {
        sessionStorage.removeItem("token");
        localStorage.removeItem("token");
        localStorage.setItem("token", returnResponse.token);
      } else {
        sessionStorage.removeItem("token");
        localStorage.removeItem("token");
        sessionStorage.setItem("token", returnResponse.token);
      }
      navigate("/home");
    }

    showSnackbar(returnResponse, setValue);
  };

  const onSubmitSignUp = async (payload: any): Promise<void> => {
    setLoading(true);
    const returnResponse = await api(
      "/login/createUser",
      "Post",
      getToken(),
      payload
    );
    setLoading(false);
    if (returnResponse.success) {
      onClick();
    }
    showSnackbar(returnResponse, setValue);
  };

  return (
    <Box sx={loginStyles.loginBox(theme)}>
      <Box>
        <Box component="img" src={logo} sx={loginStyles.imageLogo()} />
        <Typography color="text.primary" sx={{ fontSize: 32, fontWeight: 600 }}>
          {signIn ? "Sign In" : "Sign Up"}
        </Typography>
      </Box>
      <Box>
        {signIn ? (
          <FormTemplate
            key={"login-form"}
            loading={loading}
            size={12}
            submit={onSubmitLogin}
            formDef={loginForm}
            captcha
          />
        ) : (
          <FormTemplate
            key={"signup-form"}
            loading={loading}
            size={12}
            submit={onSubmitSignUp}
            formDef={signUpForm}
          />
        )}
      </Box>
      <Box>
        <Box sx={loginStyles.buttonContainer}>
          <StyledButton
            text={signIn ? "Register" : "Back to Login"}
            onclick={onClick}
          />
        </Box>
        {signIn && (
          <Box sx={loginStyles.buttonContainer}>
            <StyledButton text={"Forgot Password?"} onclick={onForgot} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LoginPage;
