export interface ReturnRequest {
  success: boolean;
  typeCode: number;
  body?: any;
  token?: string;
  error?: any;
}

export interface Customer {
  record_id: number;
  email: string;
  phone: number;
  name: string;
}

interface dropdownValues {
  id: string;
  value: string;
}

export interface FormDefinition {
  label: string;
  type: "TextField" | "Dropdown" | "Checkbox" | "ExpandedTextField" | "Phone";
  field: string;
  validationSchema: any;
  placeholder?: string;
  dropdownValues?: dropdownValues[];
  errorText: string | null;
}
