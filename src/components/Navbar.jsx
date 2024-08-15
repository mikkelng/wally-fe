import { useContext } from "react";
import { AuthContext } from "../contexts/Auth.context";

const Navbar = () => {
  const { handleLogout } = useContext(AuthContext);

  return (
    <div>
      Navbar
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default Navbar;