import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  useTheme,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { loginStyles } from "../login/components/loginStyles";
import { styles } from "../styles/globalStyles";
import CircularProgress from "@mui/material/CircularProgress";

interface dropdownValues {
  id: string;
  value: string;
}

export interface FormDefinition {
  label: string;
  type: "TextField" | "Dropdown" | "Checkbox" | "ExpandedTextField";
  field: string;
  validationSchema: any;
  dropdownValues?: dropdownValues[];
  errorText: string | null;
}

interface Props {
  submit: (payload: any) => void;
  formDef: FormDefinition[];
  size: number;
  loading: boolean;
}

const FormTemplate = ({ submit, formDef, size, loading }: Props) => {
  const theme = useTheme();
  const initialFormValues = formDef.reduce((acc, element) => {
    switch (element.type) {
      case "TextField":
      case "ExpandedTextField":
        acc[element.field] = { value: "", error: false };
        break;
      case "Checkbox":
        acc[element.field] = { value: false, error: false };
        break;
      case "Dropdown":
        acc[element.field] = { value: [], error: false };
        break;
    }
    return acc;
  }, {} as Record<string, any>);

  const [formValues, setFormValues] = useState(initialFormValues);

  const onSubmit = (data: any): any => {
    const payload = Object.entries(data).map(([key, obj]) => [
      key,
      (obj as { value: string }).value,
    ]);

    submit(Object.fromEntries(payload));
  };

  const setValue = (value: any, label: string) => {
    try {
      formDef
        .find((e) => e.field === label)
        ?.validationSchema.validateSync(value);
      setFormValues((prevState) => ({
        ...prevState,
        [label]: { value, error: false },
      }));
    } catch (error) {
      setFormValues((prevState) => ({
        ...prevState,
        [label]: { value, error: true },
      }));
    }
  };

  const findErrors = () => {
    for (const key in formValues) {
      if (formValues[key].error !== false) {
        return true;
      }
    }
    return false;
  };

  return (
    <Box sx={loginStyles.form(theme)}>
      <form onSubmit={() => onSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid size={size}>
            {formDef.map((item) =>
              item.type === "TextField" ? (
                <TextField
                  label={item.label}
                  variant="outlined"
                  fullWidth
                  error={formValues[item.field]?.error! || false}
                  value={formValues[item.field]?.value}
                  helperText={
                    formValues[item.field].error ? item.errorText : " "
                  }
                  onChange={(e) => setValue(e.target.value, item.field)}
                />
              ) : item.type === "Checkbox" ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      value={formValues[item.field].value}
                      onChange={(e) => setValue(e.target.value, item.field)}
                    />
                  }
                  label={item.label}
                />
              ) : (
                "Test"
              )
            )}
          </Grid>
        </Grid>

        <Box sx={loginStyles.formSubmit}>
          {loading === true ? (
            <CircularProgress />
          ) : (
            <Button
              sx={styles.button(theme)}
              disabled={findErrors()}
              variant="contained"
              onClick={() => onSubmit(formValues)}
            >
              Submit
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default FormTemplate;
