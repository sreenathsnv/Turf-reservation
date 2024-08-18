import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { axiosInstance } from "../utils/CustomFetch";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [isAuthenticated,setIsAuthenticated] = useState(false)

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = "JWT " + token;
      localStorage.setItem('token', token);
      setIsAuthenticated(true)
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
      localStorage.removeItem('token');
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      isAuthenticated,
      setIsAuthenticated
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
