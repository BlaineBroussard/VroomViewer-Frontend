import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { styles } from "../styles/globalStyles";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

interface Props {
  email: string;
  phone: number;
  name: string;
}
const formatPhone = (phone: string | number): string => {
  const digits = phone.toString().replace(/\D/g, ""); // remove non-numeric
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else if (digits.length === 11 && digits.startsWith("1")) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(
      7
    )}`;
  }
  return phone.toString(); // fallback
};
const CustomerCard = ({ email, phone, name }: Props) => {
  const theme = useTheme();
  return (
    <Card sx={styles.sideCard}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <PersonIcon sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" fontWeight="bold">
            {name}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />

        <Box display="flex" alignItems="center" mb={1}>
          <EmailIcon sx={{ mr: 1, color: "secondary.main" }} />
          <Typography variant="body1">{email}</Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <PhoneIcon sx={{ mr: 1, color: "success.main" }} />
          <Typography variant="body1">{formatPhone(phone)}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomerCard;
