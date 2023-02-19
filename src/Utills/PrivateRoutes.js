import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useJwt } from "react-jwt";

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");
  const { isExpired, decodedToken } = useJwt(token);

  return isExpired ? <Navigate to={"/login"} /> : <Outlet />;
};

export default PrivateRoutes;
