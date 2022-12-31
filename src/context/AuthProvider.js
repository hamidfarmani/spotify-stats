import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const initialState = {
  user: null,
  userLoggedIn: false,
  profile: {},
};

export const AuthContext = createContext({
  authState: initialState,
  login: () => {},
  logout: () => {},
  profile: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "Login":
      return action.payload;
    case "Logout":
      return initialState;
    case "Profile":
      return initialState;

    default:
      throw Error("Undefined action");
  }
}

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback(({ accessToken }) => {
    dispatch({
      type: "Login",
      payload: {
        user: "",
        userLoggedIn: true,
      },
    });

    localStorage.token = accessToken;
  }, []);

  const logout = () => {
    dispatch({ type: "Logout" });
    localStorage.removeItem("token");
  };

  const profile = (profile) => {
    dispatch({
      type: "Profile",
      payload: {
        profile,
        userLoggedIn: true,
      },
    });
  };

  useEffect(() => {
    const access_token = localStorage.getItem("token");

    if (access_token) {
      dispatch({
        type: "Login",
        payload: {
          user: "",
          userLoggedIn: true,
          profile: {},
        },
      });
    }
  }, [login]);

  return (
    <AuthContext.Provider value={{ authState, login, logout, profile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
