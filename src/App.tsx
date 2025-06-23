import "./App.css";
import LoginPage from "./login/components/LoginPage";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { createContext, useContext, useState } from "react";
import React from "react";
import HomePage from "./homePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utility/ProtectedRoute";
import ForgotPassword from "./login/components/ForgotPassword";
import LoginBackground from "./login/components/LoginBackground";
import ResetPage from "./login/components/ResetPage";

export interface snackbar {
  type: "error" | "warning" | "success" | "info";
  active: boolean;
  message: string;
}
export interface storedValues {
  token: string | undefined;
  snackbar: snackbar;
}

export interface UserContextType {
  value: storedValues;
  setValue: React.Dispatch<React.SetStateAction<storedValues>>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be used within a UserContext.Provider"
    );
  }
  return context;
};

function App() {
  const [value, setValue] = useState<storedValues>({
    token: undefined,
    snackbar: {
      active: false,
      message: "",
      type: "success",
    },
  });

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setValue((prev) => ({
      ...prev,
      snackbar: {
        ...prev.snackbar,
        active: false,
        message: "",
      },
    }));
  };

  return (
    <UserContext.Provider value={{ value, setValue }}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<LoginBackground />}>
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="reset" element={<ResetPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>

        <Snackbar
          open={value.snackbar.active}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={value.snackbar.type}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {value.snackbar.message}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
