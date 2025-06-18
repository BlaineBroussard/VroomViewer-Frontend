import { createTheme } from "@mui/material";

const theme: any = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#72383D",
    },
    secondary: {
      main: "#322D29",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#6E6E6E",
    },
  },
  typography: {
    fontSize: 18,
    fontFamily: "Montserrat, Roboto, Arial, sans-serif",
  },
  shape: {
    borderRadius: 8,
  },
});

const colors = {
  brown: "#FFFFFF",
};

export default theme;
