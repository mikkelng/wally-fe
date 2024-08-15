import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/Auth.context";

const IsPrivate = ({ children }) => {
  //this line, asks the context for all the data that is in the fridge
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  //this checks if we are waiting for the response from the /verify route
  if (isLoading) {
    return <p>Loading...</p>;
  }
  //check if the user is not logged in successfully
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <div>{children}</div>;
};
export default IsPrivate;