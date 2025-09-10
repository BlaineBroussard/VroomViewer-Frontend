import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../App";
import React from "react";
import HeaderBar from "./Headerbar";
import { Box } from "@mui/material";

export default function ProtectedRoute() {
  const { setValue } = useUserContext();
  const localToken = localStorage.getItem("token");
  const sessionToken = sessionStorage.getItem("token");
  const token = localToken || sessionToken;
  React.useEffect(() => {
    setValue((prev) => ({
      ...prev,
      token: token ?? undefined,
    }));
  }, [token, setValue]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <HeaderBar />
      <Outlet />
    </>
  );
}
