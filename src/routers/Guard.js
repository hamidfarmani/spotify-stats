import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

export default function Guard({ children }) {
  const { authState } = useAuthContext();

  if (authState && authState.user) {
    return (
      <Navigate
        to={
          window.location.pathname !== "/" &&
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/spotify-stats"
            ? window.location.pathname
            : "/profile"
        }
        replace={true}
      />
    );
  }

  return children;
}
