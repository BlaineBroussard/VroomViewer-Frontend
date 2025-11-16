import { Theme } from "@mui/material";
import roadImage from "../images/road.jpg";
export const loginStyles = {
  loginContainer: (theme: Theme) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: `url(${roadImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    padding: theme.spacing(2),
    color: "#FFFFFF",
    textAlign: "center",
  }),
  form: (theme: Theme) => ({
    backgroundColor: theme.palette.secondary.main,
    width: "75%",
    margin: "0 auto",
    mt: 4,
    border: "none",
  }),
  lightForm: (theme: Theme) => ({
    width: "75%",
    margin: "0 auto",
    mt: 4,
    padding: "5%",
    color: "black !important",
    border: "3px solid black",
    borderRadius: "15px",
  }),
  buttonContainer: () => ({
    width: "75%",
    margin: "0 auto",
  }),
  formSubmit: () => ({
    width: "100%",
  }),
  loginBox: (theme: Theme) => ({
    maxHeight: "100vh",
    height: "45em",
    width: "25em",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
  }),
  imageLogo: () => ({
    width: "100px",
    height: "100px",
  }),
};
