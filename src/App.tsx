import "./App.css";
import LoginPage from "./login/components/LoginPage";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import { Alert, Box, Snackbar, SnackbarCloseReason } from "@mui/material";
import { styles } from "./AppStyles";
import { createContext, useContext, useEffect, useState } from "react";
import getLocalValues from "./utility/getLocalValues";
import React from "react";
import HomePage from "./homePage/HomePage";
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

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getLocalValues();
      // Handle both string and { token: undefined } case
      setValue((prev) => ({
        ...prev,
        token: typeof token === "string" ? token : undefined,
      }));
    };
    fetchToken();
  }, [value.snackbar.message]);

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
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ value, setValue }}>
        {value.token ? (
          <HomePage />
        ) : (
          <Box sx={styles.overallTheme(theme)}>
            <LoginPage />
          </Box>
        )}

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
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
