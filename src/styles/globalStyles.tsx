import { Theme } from "@mui/material";

export const styles = {
  button: (theme: Theme) => ({
    backgroundColor: theme.palette.primary.main,
    width: "100%",
    mt: 2,
  }),
  header: (theme: Theme) => ({
    backgroundColor: theme.palette.primary.main,

    minHeight: "5rem",
    height: "fit-content",
    typography: "body1",
    borderBottom: 1,
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
  container: () => ({
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    height: "100%",
  }),
  sidebar: () => ({
    border: "1px solid grey",
  }),
  mainContent: () => ({ border: "1px solid grey" }),
};
