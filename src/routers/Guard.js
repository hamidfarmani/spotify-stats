import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

export default function Guard({ children }) {
  const { authState } = useAuthContext();
  console.log(window.location.pathname);

  if (authState && authState.userLoggedIn) {
    return (
      <Navigate
        to={
          window.location.pathname !== "/" &&
          window.location.pathname !== "/login"
            ? window.location.pathname
            : "/profile"
        }
        replace={true}
      />
    );
  }

  return children;
}
