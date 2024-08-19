import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();
const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();
  useEffect(() => {
    authenticateUser();
  }, []);
 
  const authenticateUser = async () => {
    try {
      const tokenFromStorage = localStorage.getItem("authToken");
      const { data } = await axios.get("http://localhost:5005/auth/verify", {
        headers: { Authorization: `Bearer ${tokenFromStorage}` },
      });
      console.log("verify route successful", data);
      setUser(data);
      setIsLoading(false);
      setIsLoggedIn(true);
    } catch (error) {
      console.log("error verifying the user", error);
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false); 
    setUser(null);
    nav("/login");
  };
  return (
    <AuthContext.Provider
      value={{ user, isLoading, isLoggedIn, authenticateUser, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthWrapper };