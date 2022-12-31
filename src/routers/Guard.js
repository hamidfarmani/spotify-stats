import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

export default function Guard({ children }) {
  const { authState } = useAuthContext();

  if (authState && authState.userLoggedIn) {
    return <Navigate to={"/profile"} replace={true} />;
  }

  return children;
}
