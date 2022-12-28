import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const initialState = {
  user: null,
  roles: null,
};

export const AuthContext = createContext({
  authState: initialState,
  login: () => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "Login":
      return action.payload;
    case "Logout":
      return initialState;
    default:
      throw Error("Undefined action");
  }
}

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback(({ access_token }) => {
    dispatch({
      type: "Login",
      payload: {
        user: "",
      },
    });

    localStorage.token = access_token;
  }, []);

  const logout = () => {
    dispatch({ type: "Logout" });
    const accecTokken = localStorage.getItem("token");

    fetch("/api/v1/user/logout", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accecTokken,
        "Content-Type": "application/json",
      },
    })
      .then((json) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });

    sessionStorage.clear();
    // removeUserInfoFromLocalStorage();
    this.props.history.push("/login");
  };

  useEffect(() => {
    dispatch({
      type: "Login",
      payload: {
        user: "",
      },
    });
  }, [login]);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
