import { Button, useTheme } from "@mui/material";
import { styles } from "../styles/globalStyles";

interface Props {
  onclick?: () => void;
  text: string;
}

const StyledButton = ({ onclick, text }: Props) => {
  const theme = useTheme();
  return (
    <>
      <Button sx={styles.button(theme)} variant="contained" onClick={onclick}>
        {text}
      </Button>
    </>
  );
};

export default StyledButton;
