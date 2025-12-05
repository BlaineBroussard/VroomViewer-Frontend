import axios, { AxiosRequestConfig } from "axios";
import { storedValues } from "../App";
import { ReturnRequest } from "../utility/types";

export const showSnackbar = (
  response: ReturnRequest,
  setValue: React.Dispatch<React.SetStateAction<storedValues>>
) => {
  const codeStart = Math.floor(response.typeCode / 100);
  const snackBarType =
    codeStart === 2 ? "success" : codeStart === 4 ? "warning" : "error";

  setValue((prev) => ({
    ...prev,
    snackbar: {
      ...prev.snackbar,
      active: true,
      message: response.error,
      type: snackBarType,
    },
  }));
};

export const getToken = () => {
  const tokenLocal = localStorage.getItem("token");
  const tokenSession = sessionStorage.getItem("token");
  if (tokenLocal) {
    return tokenLocal;
  } else if (tokenSession) {
    return tokenSession;
  } else {
    return undefined;
  }
};

const api = async (
  url: string,
  typecode: "Post" | "Put" | "Get" | "Delete",
  token?: string,
  payload?: any
): Promise<ReturnRequest> => {
  return new Promise(async (resolve) => {
    const baseUrl = process.env.REACT_APP_BACKEND;

    if (!baseUrl) {
      resolve({
        success: false,
        typeCode: 500,
        error: "Backend URL not defined",
      });
      return;
    }

    const config: AxiosRequestConfig = {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    };
    let res;
    try {
      switch (typecode) {
        case "Get":
          res = await axios.get<ReturnRequest>(`${baseUrl}${url}`, config);
          break;
        case "Post":
          res = await axios.post<ReturnRequest>(
            `${baseUrl}${url}`,
            payload,
            config
          );
          break;
        case "Put":
          res = await axios.put<ReturnRequest>(
            `${baseUrl}${url}`,
            payload,
            config
          );
          break;
        case "Delete":
          res = await axios.delete<ReturnRequest>(`${baseUrl}${url}`, config);
          break;
        default:
          throw new Error("Unsupported HTTP method");
      }

      resolve(res.data);
    } catch (error: any) {
      if (error.response.data.error === "Invalid token") {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        window.location.href = "/login";
      }
      resolve({
        success: false,
        typeCode: error?.response?.status || 500,
        error: error.response.data.error || "Unknown error occurred",
      });
    }
  });
};
export default api;
