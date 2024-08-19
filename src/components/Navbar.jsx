import { useContext } from "react";
import { AuthContext } from "../contexts/Auth.context";

const Navbar = () => {
  const { handleLogout } = useContext(AuthContext);

  return (
    <div>
      Navbar

    </div>
  );
};
export default Navbar;