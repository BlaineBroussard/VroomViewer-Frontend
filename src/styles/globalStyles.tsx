import { Theme } from "@mui/material";

export const styles = {
  button: (theme: Theme) => ({
    backgroundColor: theme.palette.primary.main,
    width: "100%",
    mt: 2,
  }),
  header: (theme: Theme) => ({
    backgroundColor: theme.palette.primary.main,
    position: "fixed",
    width: "100%",
    top: 0,
    minHeight: "5rem",
    height: "80px",
    typography: "body1",
    borderBottom: 1,
    zIndex: 1000,
    borderColor: "divider",
    display: "flex",
    overflow: "none",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
  }),
  tab: () => ({
    color: "white",
    "&.Mui-selected": {
      color: "white",
    },
    zIndex: "99",
  }),
  imageLogo: () => ({
    width: "50px",
    height: "50px",
  }),
  profile: () => ({
    display: "flex",
    alignSelf: "center",
    marginLeft: "auto",
    paddingRight: "2rem",
  }),
  menuDropdown: (theme: Theme) => ({
    backgroundColor: theme.palette.secondary.main,
  }),
  search: () => ({
    margin: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  }),
  sideCard: (theme: Theme) => ({
    mb: "15px",
    mt: "15px",
    backgroundColor: "",
    maxWidth: 400,
    color: "black",
    borderRadius: 3,
    boxShadow: 4,
    p: 1,
    background: "linear-gradient(135deg, #f5f7fa 0%, #dddcdc 100%)",
    "&:hover": {
      transform: "translateY(-5px) scale(1.02)",
      boxShadow: 8,
      cursor: "pointer",
    },
    "&:active": {
      transform: "scale(0.98)", // click "press" effect
      boxShadow: 4,
    },
  }),
  cardHeader: () => ({
    color: "black",
  }),
  container: () => ({
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    paddingTop: "80px",
    height: "calc(100vh - 80px)",
  }),
  sidebar: () => ({
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #ccc",
    overflowY: "scroll",
    width: "fit-content",
    p: 2,
  }),
  mainContent: () => ({
    p: 2,
  }),
};
